import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]
const MAX_IMAGE_WIDTH = 920

const checkImageDimensions = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!file?.type.startsWith('image/')) {
      resolve(true)
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const image = new Image()
      if (typeof e.target?.result === 'string') {
        image.src = e.target.result
      } else {
        resolve(false)
        return
      }

      image.onload = () => {
        resolve(image.width <= MAX_IMAGE_WIDTH)
      }
      image.onerror = () => resolve(false)
    }
    reader.onerror = () => resolve(false)
  })
}

export const slideSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, { message: 'O título deve ter no mínimo 3 caracteres.' })
    .max(100, { message: 'O título não pode ter mais de 100 caracteres.' }),

  image: z
    .any()
    .refine(
      (value) => {
        if (typeof value === 'string') return value.length > 0
        if (value instanceof File) return true
        return false
      },
      { message: 'A imagem é obrigatória.' },
    )
    .refine((value) => {
      if (value instanceof File) {
        return value.size <= MAX_FILE_SIZE
      }
      return true
    }, `O tamanho máximo da imagem é 5MB.`)
    .refine((value) => {
      if (value instanceof File) {
        return ACCEPTED_IMAGE_TYPES.includes(value.type)
      }
      return true
    }, 'Formatos aceitos: .jpg, .jpeg, .png e .webp.')
    .refine(
      async (value) => {
        if (value instanceof File) {
          return await checkImageDimensions(value)
        }
        return true
      },
      {
        message: `A largura da imagem não pode exceder ${MAX_IMAGE_WIDTH}px.`,
      },
    ),
})

export type SlideFormValues = z.infer<typeof slideSchema>
