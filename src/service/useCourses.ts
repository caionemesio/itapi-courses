import { CategoryFormValues } from '@/app/(auth)/admin/categorias/components/CategoryForm/validations'
import { Course, CourseCard, UpsertCourseData } from '@/types/CourseData'
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
  async function getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('id, title')
    if (error) {
      console.error('Erro ao buscar categorias:', error)
      throw new Error('Não foi possível carregar as categorias.')
    }
    return data
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
  async function getCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*, categories(id, title)')

    if (error) {
      console.error('Erro ao buscar cursos:', error)
      throw new Error('Não foi possível carregar os cursos.')
    }
    const formattedData: Course[] = data.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      slug: course.slug,
      imageUrl: course.image_url,
      videoUrl: course.video_url,
      formsUrl: course.forms_url,
      learnTopics: course.learn_topics,
      courseOffers: course.course_offers,
      categoryId: course.category_id,
      categories: course.categories
        ? {
            id: course.categories.id,
            title: course.categories.title,
          }
        : null,
    }))
    return formattedData
  }

  async function upsertCourse(courseData: UpsertCourseData): Promise<Course> {
    let finalImageUrl = courseData.imageUrl || ''

    if (courseData.image instanceof File) {
      console.log('Detectado um novo arquivo de imagem. Iniciando upload...')
      const file = courseData.image
      const filePath = `public/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('course-images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Erro detalhado do Supabase Storage:', uploadError)
        throw new Error('Falha ao fazer upload da imagem.')
      }

      const { data: urlData } = supabase.storage
        .from('course-images')
        .getPublicUrl(filePath)
      finalImageUrl = urlData.publicUrl
    }

    const courseToSave = {
      id: courseData.id,
      title: courseData.title,
      slug: courseData.slug,
      description: courseData.description,
      category_id: courseData.categoryId,
      image_url: finalImageUrl,
      video_url: courseData.videoUrl,
      forms_url: courseData.formsUrl,
      learn_topics: courseData.learnTopics ?? [],
      course_offers: courseData.courseOffers ?? null,
    }

    const { data: savedData, error } = await supabase
      .from('courses')
      .upsert(courseToSave)
      .select('*, categories(id, title)')
      .single()

    if (error) {
      throw new Error(error.message)
    }

    // CONVERSÃO NO RETORNO: snake_case -> camelCase
    return {
      id: savedData.id,
      title: savedData.title,
      description: savedData.description,
      slug: savedData.slug,
      imageUrl: savedData.image_url,
      videoUrl: savedData.video_url,
      formsUrl: savedData.forms_url,
      learnTopics: savedData.learn_topics,
      courseOffers: savedData.course_offers,
      categoryId: savedData.category_id,
      categories: savedData.categories,
    }
  }
  async function deleteCourse(courseId: number) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .match({ id: courseId })
    if (error) {
      console.error('Erro ao deletar curso:', error)
      throw new Error('Não foi possível deletar o curso.')
    }
  }

  async function getCoursesByCategory(
    categoryId: number,
  ): Promise<CourseCard[]> {
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
      imageUrl: course.image_url,
      slug: course.slug,
    }))
  }

  async function getCourseBySlug(courseSlug: string): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', courseSlug)
      .single()

    if (error) {
      console.error('Erro ao buscar o curso:', error)
      return null
    }
    const formattedData: Course = {
      title: data.title,
      description: data.description,
      imageUrl: data.image_url,
      videoUrl: data.video_url,
      formsUrl: data.forms_url,
      learnTopics: data.learn_topics,
      courseOffers: data.course_offers,
      slug: data.slug,
      id: data.id,
      categoryId: data.category_id,
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
    getCategories,
    upsertCategory,
    deleteCategory,
    getCourses,
    upsertCourse,
    deleteCourse,
    getCoursesByCategory,
    getCourseBySlug,
    searchCourses,
  }
}
