'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import useCourses from '@/service/useCourses'
import { useToast } from '@/hooks/use-toast'

import CourseCategories from './components/CourseCategories'
import CourseList from './components/CourseList'
import { LoadingState } from '@/components/LoadingState'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CourseCardSkeleton } from './components/CourseCardsSkeleton'

export default function CourseCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<number>(1)
  const { getCategoriesWithCourseCount, getCoursesByCategory } = useCourses()
  const { toast } = useToast()

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesWithCourseCount,
  })

  const {
    data: courses,
    isLoading: isCoursesLoading,
    error: coursesError,
  } = useQuery({
    queryKey: ['courses', selectedCategory],
    queryFn: () => getCoursesByCategory(selectedCategory),
    enabled: !!selectedCategory,
  })

  useEffect(() => {
    if (categoriesError) {
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar categorias',
        description:
          'Não foi possível buscar as categorias. Tente novamente mais tarde.',
      })
    }
  }, [categoriesError, toast])

  useEffect(() => {
    if (coursesError) {
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar cursos',
        description:
          'Não foi possível buscar os cursos desta categoria. Tente novamente mais tarde.',
      })
    }
  }, [coursesError, toast])

  if (isCategoriesLoading) {
    return <LoadingState message="Preparando o catálogo de cursos..." />
  }

  if (categories && categories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-72 p-10 text-gray-500">
        Nenhuma categoria encontrada.
      </div>
    )
  }

  if (categoriesError || !categories) {
    return null
  }

  return (
    <div className="py-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="py-6 px-4">
          <h1
            id="categorias"
            className="text-primary-800 text-2xl font-semibold md:text-5xl"
          >
            Formação Municipal
          </h1>
          <p className="text-gray-500 text-lg md:text-xl mt-4">
            Cursos e capacitações para transformar sua carreira e te preparar
            para o mercado de trabalho
          </p>
        </div>

        <CourseCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          courses={courses || []}
          categories={categories}
        />
      </div>

      <div className="bg-lightBackground pb-11 w-full hidden md:block">
        <Carousel className="relative overflow-hidden max-w-[1440px] mx-auto px-12">
          <CarouselContent className="flex min-h-72 items-start">
            {isCoursesLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="flex-[0_0_auto] min-w-[250px] px-4"
                >
                  <CourseCardSkeleton />
                </CarouselItem>
              ))
            ) : courses && courses.length > 0 ? (
              courses.map((course) => (
                <CarouselItem
                  key={course.id}
                  className="flex-[0_0_auto] min-w-[250px] px-4"
                >
                  <Link
                    href={`/cursos/${course.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CourseList course={course} />
                  </Link>
                </CarouselItem>
              ))
            ) : (
              <div className="w-full text-center p-10 text-gray-500">
                Nenhum curso encontrado para esta categoria.
              </div>
            )}
          </CarouselContent>

          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 mr-2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 ml-2" />
        </Carousel>
      </div>
    </div>
  )
}
