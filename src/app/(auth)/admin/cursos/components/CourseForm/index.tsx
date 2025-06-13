'use client'
import * as React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { PlusCircle, Trash2 } from 'lucide-react'

import useCourses from '@/service/useCourses'
import { Course } from '@/types/CourseData'
import { CourseFormValues, courseSchema } from './validations'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { slugifyFunction } from '@/utils/slugyfyFunction'

const offerIcons = [
  { value: 'Award', label: 'Certificado' },
  { value: 'Users', label: 'Comunidade' },
  { value: 'BookOpen', label: 'Aulas' },
  { value: 'Headphones', label: 'Suporte' },
]

interface CourseFormProps {
  isEditting: Course | null
  onSubmit: (data: CourseFormValues) => void
  isLoading?: boolean
}

export default function CourseForm({
  isEditting,
  onSubmit,
  isLoading,
}: CourseFormProps) {
  const { getCategories } = useCourses()

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      id: isEditting?.id,
      title: isEditting?.title ?? '',
      slug: isEditting?.slug ?? '',
      description: isEditting?.description ?? '',
      categoryId: isEditting?.categoryId,
      imageUrl: isEditting?.imageUrl ?? '',
      videoUrl: isEditting?.videoUrl ?? '',
      formsUrl: isEditting?.formsUrl ?? '',
      learnTopics: isEditting?.learnTopics ?? [],
      courseOffers: isEditting?.courseOffers ?? [],
    },
  })

  const {
    fields: topicFields,
    append: appendTopic,
    remove: removeTopic,
  } = useFieldArray({
    control: form.control,
    name: 'learnTopics',
  })

  const {
    fields: offerFields,
    append: appendOffer,
    remove: removeOffer,
  } = useFieldArray({
    control: form.control,
    name: 'courseOffers',
  })

  const imageValue = form.watch('image')
  const existingImageUrl = form.watch('imageUrl')
  const titleValue = form.watch('title')

  React.useEffect(() => {
    const generatedSlug = slugifyFunction(titleValue)
    form.setValue('slug', generatedSlug, { shouldValidate: true })
  }, [titleValue, form.setValue, form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-h-[80vh] overflow-y-auto pr-4"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título do curso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    {isLoadingCategories ? (
                      'Carregando...'
                    ) : (
                      <SelectValue placeholder="Selecione uma categoria" />
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva o curso" {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          control={form.control}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>
                Imagem de Capa
                {isEditting ? '(Subir nova para substituir)' : ''}
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(existingImageUrl || imageValue) && (
          <div className="border rounded-md p-2">
            <Image
              src={
                imageValue ? URL.createObjectURL(imageValue) : existingImageUrl!
              }
              alt="Preview"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
        )}
        <FormField
          name="videoUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Vídeo</FormLabel>
              <FormControl>
                <Input placeholder="https://youtube.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="formsUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Formulário</FormLabel>
              <FormControl>
                <Input placeholder="https://forms.google.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- NOVO CAMPO DINÂMICO PARA TÓPICOS DE APRENDIZADO --- */}
        <div className="space-y-3 rounded-md border p-4">
          <div className="flex justify-between items-center">
            <FormLabel>Tópicos de Aprendizado</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendTopic('')}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Tópico
            </Button>
          </div>
          {topicFields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`learnTopics.${index}`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Input {...field} placeholder={`Tópico #${index + 1}`} />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTopic(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="space-y-3 rounded-md border p-4">
          <div className="flex justify-between items-center">
            <FormLabel>Ofertas do Curso</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendOffer({ iconName: '', description: '' })}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Oferta
            </Button>
          </div>

          {offerFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-start gap-2 p-2 border rounded-md"
            >
              <div className="flex-grow space-y-2">
                <FormField
                  control={form.control}
                  name={`courseOffers.${index}.iconName`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um ícone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {offerIcons.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                              {icon.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`courseOffers.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Descrição da oferta (Ex: Acesso vitalício)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOffer(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? 'Salvando...'
            : isEditting
              ? 'Atualizar Curso'
              : 'Criar Curso'}
        </Button>
      </form>
    </Form>
  )
}
