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
import Link from 'next/link'
import { slugifyFunction } from '@/utils/slugyfyFunction'

export default function CourseCatalog() {
  const coursesByCategory: Record<number, Course[]> = useMemo(
    () => ({
      1: [
        {
          id: 'curso-1',
          title: 'Unhas em Gel',
          description:
            'Técnicas avançadas para unhas impecáveis, resistentes e duradouras.',
          image: '/assets/images/beauty/unha-gel.jpeg',
        },
        {
          id: 'curso-2',
          title: 'Design de Sobrancelhas',
          description: 'Aprenda a modelar sobrancelhas para realçar o olhar.',
          image: '/assets/images/beauty/sobrancelha.jpeg',
        },
        {
          id: 'curso-3',
          title: 'Depilação Essencial',
          description: 'Métodos práticos para uma pele lisa e bem cuidada.',
          image: '/assets/images/beauty/depilacao.jpeg',
        },
      ],
      2: [
        {
          id: 'curso-4',
          title: 'Energia Fotovoltaica',
          description:
            'Descubra como gerar energia sustentável com painéis solares.',
          image: '/assets/images/energy/curso-solar.jpg',
        },
        {
          id: 'curso-5',
          title: 'NR-10: Segurança em Eletricidade',
          description:
            'Normas essenciais para trabalhar com instalações elétricas.',
          image: '/assets/images/energy/nr-10.jpg',
        },
        {
          id: 'curso-6',
          title: 'NR-35: Trabalho em Altura',
          description:
            'Medidas de segurança para atividades realizadas acima do solo.',
          image: '/assets/images/energy/nr-35.jpg',
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
                <Link
                  href={`/cursos/${slugifyFunction(course.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CourseList course={course} />
                </Link>
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
