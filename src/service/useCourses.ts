import { Course, CourseCategories } from '@/components/CourseCatalog/types'
import { CourseData } from '@/types/CourseData'
import { createClient } from '@/utils/supabase/client'

export default function useCourses() {
  async function getCategoriesWithCourseCount() {
    const supabase = createClient()
    const { data, error } = await supabase.from('categories').select(`
      id,
      title,
      slug,
      courses ( count )
    `)

    if (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }

    const formattedData: CourseCategories[] = data.map((category) => ({
      id: category.id,
      name: category.title,
      courseCount: category.courses[0] ? category.courses[0].count : 0,
    }))

    return formattedData
  }
  async function getCoursesByCategory(categoryId: number): Promise<Course[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('courses')
      .select('id, title, description, image_url, slug')
      .eq('category_id', categoryId)

    if (error) {
      console.error('Erro ao buscar cursos:', error)
      return []
    }
    return data.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image_url,
      slug: course.slug,
    }))
  }

  async function getCourseBySlug(
    courseSlug: string,
  ): Promise<CourseData | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', courseSlug)
      .single()

    if (error) {
      console.error('Erro ao buscar o curso:', error)
      return null
    }
    const formattedData: CourseData = {
      title: data.title,
      description: data.description,
      imageUrl: data.image_url,
      videoUrl: data.video_url,
      formsUrl: data.forms_url,
      learnTopics: data.learn_topics,
      courseOffers: data.course_offers,
    }

    return formattedData
  }
  async function searchCourses(
    searchTerm: string,
  ): Promise<{ slug: string; title: string }[]> {
    const supabase = createClient()
    if (!searchTerm) return []

    const { data, error } = await supabase
      .rpc('search_courses', { search_term: searchTerm })
      .limit(5)

    if (error) {
      console.error('Erro ao buscar cursos:', error)
      return []
    }

    return data
  }
  return {
    getCategoriesWithCourseCount,
    getCoursesByCategory,
    getCourseBySlug,
    searchCourses,
  }
}
