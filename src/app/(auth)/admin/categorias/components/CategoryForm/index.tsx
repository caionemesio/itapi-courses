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
import { CategoryFormValues, categorySchema } from './validations'

interface CategoryFormProps {
  isEditting: CategoryFormValues | null
  onSubmit: (data: CategoryFormValues) => void
}

export default function CategoryForm({
  isEditting,
  onSubmit,
}: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: isEditting?.title ?? '',
    },
  })

  function handleFormSubmit(data: CategoryFormValues) {
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
                <Input placeholder="Digite o título da categoria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditting ? 'Atualizar' : 'Criar'}
        </Button>
      </form>
    </Form>
  )
}
