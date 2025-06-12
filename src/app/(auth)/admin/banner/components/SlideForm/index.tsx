'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import Image from 'next/image'
import { SlideFormValues, slideSchema } from './validations'

interface SlideFormProps {
  isEditting: { id: string; title: string; image: string } | null
  onSubmit: (data: SlideFormValues) => void
  isLoading?: boolean
}

export default function SlideForm({
  isEditting,
  onSubmit,
  isLoading,
}: SlideFormProps) {
  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      id: isEditting?.id ?? undefined,
      title: isEditting?.title ?? '',
      image: isEditting?.image ?? '',
    },
  })

  const imageValue = form.watch('image')
  const [preview, setPreview] = React.useState<string | null>(
    isEditting?.image ?? null,
  )

  React.useEffect(() => {
    if (imageValue instanceof File) {
      const objectUrl = URL.createObjectURL(imageValue)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else if (typeof imageValue === 'string') {
      setPreview(imageValue)
    }
  }, [imageValue])

  function handleFormSubmit(data: SlideFormValues) {
    const finalData = {
      ...data,
      imageFile: data.image instanceof File ? data.image : undefined,
    }
    delete finalData.image

    onSubmit(finalData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Cursos de Beleza" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem do Slide</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Preview</FormLabel>
          <div className="border border-input rounded-md flex items-center justify-center h-40 overflow-hidden bg-gray-50 relative">
            {preview ? (
              <Image
                src={preview}
                alt="Preview da Imagem"
                fill
                style={{ objectFit: 'contain' }}
                sizes="33vw"
              />
            ) : (
              <span className="text-gray-500">Nenhuma imagem selecionada</span>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Salvando...' : isEditting ? 'Atualizar' : 'Criar'}
        </Button>
      </form>
    </Form>
  )
}
