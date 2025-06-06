interface CourseCategories {
  id: number
  name: string
  courseCount?: number
}
interface Course {
  id: string
  title: string
  description?: string
  image: string
  slug?: string
}

export type { CourseCategories, Course }
