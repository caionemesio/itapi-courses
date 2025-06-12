import { CategoryFormValues } from '@/app/(auth)/admin/categorias/components/CategoryForm/validations'
import { Course } from '@/components/CourseCatalog/types'
import { CourseData } from '@/types/CourseData'
import { createSupabaseBrowserClient } from '@/utils/supabase/client'

export type UpsertCategoryData = {
  id?: number
  title: string
  slug: string
}

export default function useCourses() {
  const supabase = createSupabaseBrowserClient()
  async function getCategoriesWithCourseCount() {
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

    const formattedData: CategoryFormValues[] = data.map((category) => ({
      id: category.id,
      title: category.title,
      slug: category.slug,
      courseCount: category.courses[0] ? category.courses[0].count : 0,
    }))

    return formattedData
  }

  async function upsertCategory(categoryData: UpsertCategoryData) {
    const objectToUpsert = {
      id: categoryData.id,
      title: categoryData.title,
      slug: categoryData.slug,
    }

    const { data, error } = await supabase
      .from('categories')
      .upsert(objectToUpsert)
      .select()
      .single()

    if (error) {
      console.error('Erro ao salvar categoria:', error)
      throw new Error('Não foi possível salvar a categoria.')
    }
    return data
  }

  async function deleteCategory(categoryId: number): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .match({ id: categoryId })

    if (error) {
      console.error('Erro ao deletar categoria:', error)
      throw new Error('Não foi possível deletar a categoria.')
    }
  }
  async function getCoursesByCategory(categoryId: number): Promise<Course[]> {
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
    upsertCategory,
    deleteCategory,
    getCoursesByCategory,
    getCourseBySlug,
    searchCourses,
  }
}
