'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import CategoryForm from './components/CategoryForm'
import { CategoryFormValues } from './components/CategoryForm/validations'
import CategoryCard from './components/CategoryCard'

interface Category {
  id: string
  title: string
  courseCount: number
}

export default function AdminCategoriesPage() {
  const mockingCategories: Category[] = [
    {
      id: 'beleza',
      title: 'Beleza',
      courseCount: 0,
    },
    {
      id: 'energia',
      title: 'Energia',
      courseCount: 3,
    },
  ]

  const [editCategory, setEditCategory] = useState<CategoryFormValues | null>(
    null,
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDelete = (categoryId: string) => {
    console.log(`Categoria ${categoryId} excluída`)
  }

  const handleEdit = (category: Category) => {
    setEditCategory(category)
    setIsDialogOpen(true)
    console.log(`Editando categoria: ${category.title}`)
  }

  const handleSubmit = (data: CategoryFormValues) => {
    if (editCategory) {
      console.log('Dados da categoria editados:', {
        id: editCategory.id,
        ...data,
      })
    } else {
      console.log('Nova categoria adicionada:', {
        id: Date.now().toString(),
        courseCount: 0,
        ...data,
      })
    }
    setEditCategory(null)
    setIsDialogOpen(false)
  }

  const handleCreateNew = () => {
    setEditCategory(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gerenciar Categorias
          </h2>
          <p className="text-gray-600">Organize seus cursos por categorias</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleCreateNew}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Categoria
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editCategory ? 'Editar Categoria' : 'Criar Nova Categoria'}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm isEditting={editCategory} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockingCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}
