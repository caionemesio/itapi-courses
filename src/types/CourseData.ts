import { OfferFromDB } from '@/components/CourseOffers'

export interface CourseData {
  title: string
  description: string
  learnTopics: string[]
  courseOffers: OfferFromDB[]
  formsUrl: string
  videoUrl?: string
  imageUrl: string
}
