import { z } from 'zod'

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Título deve ter ao menos 3 caracteres.' }),
  description: z
    .string()
    .min(10, { message: 'Descrição deve ter ao menos 10 caracteres.' }),
  image: z.string().url({ message: 'Informe uma URL válida para a imagem.' }),
})

type CourseFormValues = z.infer<typeof courseSchema>
export type { CourseFormValues }
