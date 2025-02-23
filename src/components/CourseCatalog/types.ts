interface CourseCategories {
  id: number
  name: string
}
interface Course {
  title: string
  description: string
  url: string
  image: string
}

export type { CourseCategories, Course }
