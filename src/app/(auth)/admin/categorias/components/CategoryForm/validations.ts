import * as z from 'zod'

export const categorySchema = z.object({
  title: z.string().min(1, 'O título é obrigatório.'),
  id: z.string().optional(),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
