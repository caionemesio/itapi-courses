import { z } from 'zod'

const offerSchema = z.object({
  iconName: z.string().min(1, { message: 'O ícone é obrigatório.' }),
  description: z
    .string()
    .min(3, { message: 'A descrição da oferta é obrigatória.' }),
})

export const courseSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(3, { message: 'O título deve ter no mínimo 3 caracteres.' }),
  slug: z.string().optional(),
  description: z
    .string()
    .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' }),
  categoryId: z.coerce
    .number({ invalid_type_error: 'Selecione uma categoria.' })
    .min(1, { message: 'Selecione uma categoria.' }),
  image: z.any().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z
    .string()
    .url({ message: 'Informe uma URL de vídeo válida.' })
    .optional()
    .or(z.literal('')),
  formsUrl: z
    .string()
    .url({ message: 'Informe uma URL de formulário válida.' })
    .optional()
    .or(z.literal('')),

  learnTopics: z
    .array(z.string().min(1, { message: 'O tópico não pode ser vazio.' }))
    .optional(),

  courseOffers: z.array(offerSchema).optional(),
})

export type CourseFormValues = z.infer<typeof courseSchema>
