import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@/components/CourseCatalog/types'
import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload } from 'lucide-react'
import { CourseFormValues, courseSchema } from './validations'

interface CourseFormProps {
  isEditting: Course | null
  onSubmit: (data: CourseFormValues) => void
}

export default function CourseForm({ isEditting, onSubmit }: CourseFormProps) {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: isEditting?.title ?? '',
      description: isEditting?.description ?? '',
      image: isEditting?.image ?? '',
    },
  })

  function handleFormSubmit(data: CourseFormValues) {
    onSubmit(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
        action="#"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título do curso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
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
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl className="flex-1">
                <Input
                  iconLeft={<Upload className="text-gray-500" />}
                  className="w-full"
                  placeholder="https://example.com/image.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditting ? 'Atualizar Curso' : 'Criar Curso'}
        </Button>
      </form>
    </Form>
  )
}
