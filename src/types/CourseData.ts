import { CourseFormValues } from '@/app/(auth)/admin/cursos/components/CourseForm/validations'
import { OfferFromDB } from '@/components/CourseOffers'
interface Course {
  id: number
  title: string
  description: string
  imageUrl: string
  slug: string
  videoUrl?: string
  formsUrl?: string
  learnTopics?: string[]
  courseOffers?: OfferFromDB[]
  categoryId?: number
  categories?: {
    id: number
    title: string
  } | null
}
type CourseCard = Pick<
  Course,
  'id' | 'title' | 'description' | 'imageUrl' | 'slug'
>

interface UpsertCourseData extends CourseFormValues {
  id?: number
  imageFile?: File
}

export type { Course, CourseCard, UpsertCourseData }
