import { createSupabaseBrowserClient } from '@/utils/supabase/client'

export type Slide = {
  id: string
  title: string
  imageUrl: string
  filePath: string
}

export type UpsertSlideData = {
  id?: string
  title: string
  imageFile?: File
}

export default function useSlides() {
  const supabase = createSupabaseBrowserClient()

  async function getSlides(): Promise<Slide[]> {
    const { data, error } = await supabase.from('slides').select('*')
    if (error) throw new Error(error.message)

    const formattedData: Slide[] = data.map((slide) => ({
      id: slide.id,
      title: slide.title,
      imageUrl: slide.image_url,
      filePath: slide.file_path,
    }))
    return formattedData
  }

  async function upsertSlide(slideData: UpsertSlideData) {
    let imageUrl = ''
    let filePath = ''

    if (slideData.imageFile) {
      filePath = `public/${crypto.randomUUID()}`

      const { error: uploadError } = await supabase.storage
        .from('carousel-images')
        .upload(filePath, slideData.imageFile)

      if (uploadError) throw new Error(uploadError.message)

      const { data: urlData } = supabase.storage
        .from('carousel-images')
        .getPublicUrl(filePath)

      imageUrl = urlData.publicUrl
    }

    const slideToUpsert = {
      id: slideData.id,
      title: slideData.title,
      ...(imageUrl && { image_url: imageUrl, file_path: filePath }),
    }

    const { data, error } = await supabase
      .from('slides')
      .upsert(slideToUpsert)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async function deleteSlide(slide: Slide) {
    const { error: storageError } = await supabase.storage
      .from('carousel-images')
      .remove([slide.filePath])

    if (storageError) throw new Error(storageError.message)

    const { error: dbError } = await supabase
      .from('slides')
      .delete()
      .eq('id', slide.id)

    if (dbError) throw new Error(dbError.message)
  }

  return { getSlides, upsertSlide, deleteSlide }
}
