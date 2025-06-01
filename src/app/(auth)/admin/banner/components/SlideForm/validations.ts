import { z } from 'zod'

export const slideSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, { message: 'O nome da imagem é obrigatório.' })
    .max(100, { message: 'O nome não pode ter mais de 100 caracteres.' }),

  image: z
    .string()
    .url({ message: 'A URL da imagem deve ser válida.' })
    .min(1, { message: 'O link da imagem é obrigatório.' }),
})

export type SlideFormValues = z.infer<typeof slideSchema>
