'use client'

import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { Dispatch, SetStateAction } from 'react'
import CourseList from './CourseList'
import Link from 'next/link'
import { slugifyFunction } from '@/utils/slugyfyFunction'
import { CategoryFormValues } from '@/app/(auth)/admin/categorias/components/CategoryForm/validations'
import { CourseCard } from '@/types/CourseData'

interface CourseCategoriesProps {
  selectedCategory: number | null
  setSelectedCategory: Dispatch<SetStateAction<number | null>>
  courses: CourseCard[]
  categories: CategoryFormValues[]
}

export default function CourseCategories({
  selectedCategory,
  setSelectedCategory,
  courses,
  categories,
}: CourseCategoriesProps) {
  return (
    <div className="pl-2">
      <div className="hidden border-b border-gray-300 md:flex gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id!)}
            className={`bg-transparent text-lg rounded-none font-semibold shadow-none border-0 border-b-2 ${
              selectedCategory === category.id
                ? 'border-primary-800 text-primary-800'
                : 'border-transparent text-primary-600'
            }`}
            variant="outline"
            size="sm"
          >
            {category.title}
          </Button>
        ))}
      </div>

      <div className="md:hidden m-4">
        <Accordion
          type="single"
          defaultValue={String(selectedCategory)}
          collapsible
        >
          {categories.map((category) => (
            <AccordionItem
              key={category.id}
              value={String(category.id)}
              onClick={() => setSelectedCategory(category.id!)}
            >
              <AccordionTrigger className="text-lg font-semibold">
                {category.title}
              </AccordionTrigger>
              <AccordionContent>
                {selectedCategory === category.id && (
                  <Carousel className="relative overflow-hidden mt-2">
                    <CarouselContent className="flex">
                      {courses.map((course) => (
                        <CarouselItem
                          key={course.title}
                          className="flex-[0_0_auto] min-w-[250px] px-2"
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
                  </Carousel>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
