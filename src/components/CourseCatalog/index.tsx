'use client'
import { useMemo, useState } from 'react'
import CourseCategories from './components/CourseCategories'
import CourseList from './components/CourseList'
import { Course } from './types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export default function CourseCatalog() {
  const coursesByCategory: Record<number, Course[]> = useMemo(
    () => ({
      1: [
        {
          title: 'Curso de React',
          description: 'Aprenda a criar aplicações web com React',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
        {
          title: 'Curso de Vue',
          description: 'Aprenda a criar aplicações web com Vue',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
        {
          title: 'Curso de Angular',
          description: 'Aprenda a criar aplicações web com Angular',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
        {
          title: 'Curso de Andsgular',
          description: 'Aprenda a criar aplicações web com Angular',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
        {
          title: 'Curso de sdAngular',
          description: 'Aprenda a criar aplicações web com Angular',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
      ],
      2: [
        {
          title: 'Curso de Photoshop',
          description: 'Aprenda a editar imagens e criar composições',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
        {
          title: 'Curso de Illustrator',
          description: 'Aprenda a criar ilustrações e gráficos vetoriais',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
      ],
    }),
    [],
  )
  const [selectedCategory, setSelectedCategory] = useState(1)
  const courses = coursesByCategory[selectedCategory] || []

  return (
    <div className="py-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="py-6 px-4">
          <h1
            id="categorias"
            className="text-primary-800  text-2xl font-semibold md:text-5xl"
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
          coursesByCategory={coursesByCategory}
        />
      </div>

      <div className="bg-lightBackground pb-11 w-full  hidden md:block ">
        <Carousel className="relative overflow-hidden  max-w-[1440px] mx-auto px-12">
          <CarouselContent className="flex  ">
            {courses.map((course) => (
              <CarouselItem
                key={course.title}
                className="
                  flex-[0_0_auto]
                  min-w-[250px]
                  px-4
                "
              >
                <CourseList
                  title={course.title}
                  description={course.description}
                  url={course.url}
                  image={course.image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 mr-2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 ml-2" />
        </Carousel>
      </div>
    </div>
  )
}
