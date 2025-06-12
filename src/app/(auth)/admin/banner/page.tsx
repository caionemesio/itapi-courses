'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import useSlides, { Slide, UpsertSlideData } from '@/service/useSlides'
import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import SlideForm from './components/SlideForm'
import CourseList from '@/components/CourseCatalog/components/CourseList'
import { LoadingState } from '@/components/LoadingState'

export default function AdminCarouselPage() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getSlides, upsertSlide, deleteSlide } = useSlides()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null)

  const { data: slides, isLoading } = useQuery({
    queryKey: ['slides'],
    queryFn: getSlides,
  })

  const upsertMutation = useMutation({
    mutationFn: (data: UpsertSlideData) => upsertSlide(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slides'] })
      toast({ title: 'Sucesso!', description: 'Slide salvo com sucesso.' })
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
    mutationFn: (slide: Slide) => deleteSlide(slide),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slides'] })
      toast({ title: 'Sucesso!', description: 'Slide excluído.' })
    },
    onError: (error) =>
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: error.message,
      }),
  })

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide)
    setIsDialogOpen(true)
  }

  const handleCreateNew = () => {
    setEditingSlide(null)
    setIsDialogOpen(true)
  }

  const handleDelete = (slide: Slide) => {
    if (confirm(`Tem certeza que deseja excluir o slide "${slide.title}"?`)) {
      deleteMutation.mutate(slide)
    }
  }

  if (isLoading) {
    return <LoadingState message="Carregando slides..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Slides</h2>
          <p className="text-gray-600">
            Gerencie as imagens do slide principal
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleCreateNew}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Imagem
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? 'Editar Imagem' : 'Criar nova Imagem'}
              </DialogTitle>
            </DialogHeader>
            <SlideForm
              isEditting={
                editingSlide
                  ? { ...editingSlide, image: editingSlide.imageUrl }
                  : null
              }
              onSubmit={(data) => upsertMutation.mutate(data)}
              isLoading={upsertMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides?.map((slide) => (
          <CourseList
            key={slide.id}
            course={{
              id: slide.id,
              title: slide.title,
              image: slide.imageUrl,
              slug: '',
            }}
            isEditting
            onDelete={() => handleDelete(slide)}
            onEdit={() => handleEdit(slide)}
          />
        ))}
      </div>
    </div>
  )
}
