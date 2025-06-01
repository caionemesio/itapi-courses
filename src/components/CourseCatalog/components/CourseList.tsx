'use client'
import * as React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { Course } from '../types'

interface CourseListProps {
  course: Course
  isEditting?: boolean
  onEdit?: (course: Course) => void
  onDelete?: (courseId: string) => void
}

export default function CourseList({
  course,
  isEditting = false,
  onDelete,
  onEdit,
}: CourseListProps) {
  const { title, description, image } = course

  return (
    <Card className="w-[350px] min-h-72">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-md"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="">{description}</CardDescription>
        )}
      </CardHeader>
      {isEditting && (
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit?.(course)}
              className="flex-1"
            >
              <Edit className="h-3 w-3 mr-1" />
              Editar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete?.(course.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
