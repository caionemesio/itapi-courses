interface CourseCategories {
  id: number
  name: string
}
interface Course {
  id: string
  title: string
  description?: string
  image: string
}

export type { CourseCategories, Course }
