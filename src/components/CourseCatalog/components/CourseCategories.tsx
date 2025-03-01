'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import type { CourseCategories } from '../types'
import { Dispatch, SetStateAction } from 'react'

interface CourseCategoriesProps {
  selectedCategory: number
  setSelectedCategory: Dispatch<SetStateAction<number>>
}

export default function CourseCategories({
  selectedCategory,
  setSelectedCategory,
}: CourseCategoriesProps) {
  const courseCategories: CourseCategories[] = [
    { id: 1, name: 'Desenvolvimento' },
    { id: 2, name: 'Design' },
  ]

  return (
    <div className="pl-2">
      <div className="hidden border-b border-gray-300  md:flex gap-4 ">
        {courseCategories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`bg-transparent text-lg rounded-none font-semibold shadow-none border-0 border-b-2 ${
              selectedCategory === category.id
                ? 'border-primary-800 text-primary-800'
                : 'border-transparent text-primary-600'
            } `}
            variant="outline"
            size="sm"
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Selecione a área
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {courseCategories.map((category) => (
              <DropdownMenuItem key={category.id}>
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
