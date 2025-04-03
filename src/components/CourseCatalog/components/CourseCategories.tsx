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

import type { Course, CourseCategories } from '../types'
import { Dispatch, SetStateAction } from 'react'
import CourseList from './CourseList'

interface CourseCategoriesProps {
  selectedCategory: number
  setSelectedCategory: Dispatch<SetStateAction<number>>
  coursesByCategory: Record<number, Course[]>
}

export default function CourseCategories({
  selectedCategory,
  setSelectedCategory,
  coursesByCategory,
}: CourseCategoriesProps) {
  const courseCategories: CourseCategories[] = [
    { id: 1, name: 'Beleza' },
    { id: 2, name: 'Energia' },
  ]

  return (
    <div className="pl-2">
      <div className="hidden border-b border-gray-300 md:flex gap-4">
        {courseCategories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`bg-transparent text-lg rounded-none font-semibold shadow-none border-0 border-b-2 ${
              selectedCategory === category.id
                ? 'border-primary-800 text-primary-800'
                : 'border-transparent text-primary-600'
            }`}
            variant="outline"
            size="sm"
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="md:hidden m-4">
        <Accordion type="single" defaultValue="1" collapsible>
          {courseCategories.map((category) => {
            const courses = coursesByCategory[category.id] || []

            return (
              <AccordionItem key={category.id} value={String(category.id)}>
                <AccordionTrigger className="text-lg font-semibold">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  <Carousel className="relative overflow-hidden mt-2">
                    <CarouselContent className="flex">
                      {courses.map((course) => (
                        <CarouselItem
                          key={course.title}
                          className="flex-[0_0_auto] min-w-[250px] px-2"
                        >
                          <CourseList
                            title={course.title}
                            description={course.description}
                            image={course.image}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
