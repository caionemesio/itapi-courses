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
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { SlideFormValues, slideSchema } from './validations'

interface SlideFormProps {
  isEditting: SlideFormValues | null
  onSubmit: (data: SlideFormValues) => void
}

export default function SlideForm({ isEditting, onSubmit }: SlideFormProps) {
  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      title: isEditting?.title ?? '',
      image: isEditting?.image ?? '',
    },
  })

  const imageUrl = form.watch('image')

  function handleFormSubmit(data: SlideFormValues) {
    onSubmit(data)
    form.reset()
  }

  const isValidHttpUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
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
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="secretaria da juventude imagem"
                  {...field}
                />
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
                  placeholder="/imagem-slide.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Preview</FormLabel>
          <div className="border border-input rounded-md flex items-center justify-center h-40 overflow-hidden bg-gray-50 relative">
            {imageUrl && isValidHttpUrl(imageUrl) ? (
              <Image
                src={imageUrl}
                alt="Preview da Imagem"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={
                  imageUrl.startsWith('/') ||
                  imageUrl.startsWith('http://localhost')
                }
              />
            ) : (
              <span className="text-gray-500">
                {imageUrl
                  ? 'URL da imagem inválida ou local'
                  : 'Nenhuma imagem para preview'}
              </span>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full">
          {isEditting ? 'Atualizar' : 'Criar'}
        </Button>
      </form>
    </Form>
  )
}
