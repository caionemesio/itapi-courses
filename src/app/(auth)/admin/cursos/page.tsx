'use client'
import CourseList from '@/components/CourseCatalog/components/CourseList'
import { Course } from '@/components/CourseCatalog/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import CourseForm from './components/CourseForm'
import { CourseFormValues } from './components/CourseForm/validations'

export default function AdminCoursesPage() {
  const mockingCourses: Course[] = [
    {
      id: '1',
      title: 'Curso de Beleza',
      description: 'Aprenda técnicas avançadas de beleza',
      image: '/assets/images/beauty/depilacao.jpeg',
    },
    {
      id: '2',
      title: 'Curso de Energia',
      description: 'Entenda os fundamentos da energia renovável',
      image: '/assets/images/beauty/depilacao.jpeg',
    },
  ]
  const [editForm, setEditForm] = useState<Course | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDelete = (courseId: string) => {
    console.log(`Curso ${courseId} excluído`)
  }
  const handleEdit = (course: Course) => {
    setEditForm(course)
    setIsDialogOpen(true)
    console.log(`Editando curso: ${course.title}`)
  }
  const handleSubmit = (data: CourseFormValues) => {
    console.log('Dados do curso enviados:', data)
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
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Cursos</h2>
          <p className="text-gray-600">Adicione, edite ou remova cursos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleCreateNew}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Curso
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editForm ? 'Editar Curso' : 'Criar novo Curso'}
              </DialogTitle>
            </DialogHeader>
            <CourseForm isEditting={editForm} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockingCourses.map((course) => (
          <CourseList
            key={course.id}
            course={course}
            isEditting
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}
