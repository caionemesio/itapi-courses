'use client'

import { Folder, Pencil, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  title: string
  courseCount: number
}

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (categoryId: string) => void
}

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const canDelete = category.courseCount === 0

  return (
    <Card className="flex flex-col justify-between ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Folder className="h-5 w-5 text-gray-500" />
          {category.title}
        </CardTitle>
        <CardDescription>{category.courseCount} cursos</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(category)}>
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(category.id)}
          disabled={!canDelete}
          className={cn(!canDelete && 'cursor-not-allowed opacity-50')}
        >
          <Trash className="h-4 w-4 mr-2" />
          Excluir
        </Button>
      </CardFooter>
      <div className="min-h-6">
        {!canDelete && (
          <p className="text-sm text-center text-red-500 px-6 ">
            Remova os cursos antes de excluir
          </p>
        )}
      </div>
    </Card>
  )
}
