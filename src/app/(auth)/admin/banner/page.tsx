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

import SlideForm from './components/SlideForm'
import { SlideFormValues } from './components/SlideForm/validations'
import CourseList from '@/components/CourseCatalog/components/CourseList'

export default function AdminCarouselPage() {
  const mockingSlides = [
    {
      id: 'slide1',
      title: 'Secretaria da Juventude',
      image: '/imagem-slide.jpg',
    },
    {
      id: 'slide2',
      title: 'Aviso da Secjuv',
      image: '/advice-secjuv.png',
    },
  ]

  const [editForm, setEditForm] = useState<SlideFormValues | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDelete = (slideId: string) => {
    console.log(`Slide ${slideId} excluído`)
  }

  const handleEdit = (slide: SlideFormValues) => {
    setEditForm(slide)
    setIsDialogOpen(true)
    console.log(`Editando slide: ${slide.title}`)
  }

  const handleSubmit = (data: SlideFormValues) => {
    console.log('Dados do slide enviados:', data)
    setEditForm(null)
    setIsDialogOpen(false)
  }

  const handleCreateNew = () => {
    setEditForm(null)
    setIsDialogOpen(true)
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
                {editForm ? 'Editar Imagem' : 'Criar nova Imagem'}
              </DialogTitle>
            </DialogHeader>
            <SlideForm isEditting={editForm} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockingSlides.map((slide) => (
          <CourseList
            key={slide.id}
            course={slide}
            isEditting
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}
