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
import useCourses, { UpsertCategoryData } from '@/service/useCourses'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LoadingState } from '@/components/LoadingState'
import { useToast } from '@/hooks/use-toast'

export default function AdminCategoriesPage() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [editCategory, setEditCategory] = useState<CategoryFormValues | null>(
    null,
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { getCategoriesWithCourseCount, upsertCategory, deleteCategory } =
    useCourses()

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesWithCourseCount,
  })

  const upsertMutation = useMutation({
    mutationFn: (data: UpsertCategoryData) => upsertCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast({
        title: 'Sucesso!',
        description: 'Categoria salva com sucesso.',
        variant: 'success',
      })
      setIsDialogOpen(false)
    },
    onError: (error) =>
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: error.message,
      }),
  })

  const deleteMutation = useMutation({
    mutationFn: (categoryId: number) => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast({
        title: 'Sucesso!',
        description: 'Categoria excluída.',
        variant: 'success',
      })
    },
    onError: (error) =>
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: error.message,
      }),
  })

  const handleDelete = (category: CategoryFormValues) => {
    if (
      confirm(`Tem certeza que deseja excluir a categoria "${category.title}"?`)
    ) {
      deleteMutation.mutate(category.id!)
    }
  }

  const handleEdit = (category: CategoryFormValues) => {
    setEditCategory(category)
    setIsDialogOpen(true)
    console.log(`Editando categoria: ${category.title}`)
  }

  const handleSubmit = (data: CategoryFormValues) => {
    const id = editCategory ? editCategory.id : undefined
    upsertMutation.mutate({
      id,
      title: data.title,
      slug: data.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, ''),
    })
    setEditCategory(null)
    setIsDialogOpen(false)
  }

  const handleCreateNew = () => {
    setEditCategory(null)
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return <LoadingState message="Carregando categorias..." />
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
        {categories &&
          categories.map((category) => (
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
