'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import useCourses from '@/service/useCourses'
import { useToast } from '@/hooks/use-toast'

import CourseList from '@/components/CourseCatalog/components/CourseList'
import CourseForm from './components/CourseForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LoadingState } from '@/components/LoadingState'
import { Course, UpsertCourseData } from '@/types/CourseData'

export default function AdminCoursesPage() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getCourses, upsertCourse, deleteCourse } = useCourses()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  })

  const upsertMutation = useMutation({
    mutationFn: (data: UpsertCourseData) => upsertCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      toast({
        title: 'Sucesso!',
        description: 'Curso salvo com sucesso.',
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
    mutationFn: (courseId: number) => deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      toast({
        variant: 'success',
        title: 'Sucesso!',
        description: 'Curso excluído.',
      })
    },
    onError: (error) =>
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: error.message,
      }),
  })

  const handleDelete = (courseId: number) => {
    if (
      confirm(
        'Tem certeza que deseja excluir este curso? A ação é irreversível.',
      )
    ) {
      deleteMutation.mutate(courseId)
    }
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setIsDialogOpen(true)
  }

  const handleCreateNew = () => {
    setEditingCourse(null)
    setIsDialogOpen(true)
  }

  const handleSubmit = (data: UpsertCourseData) => {
    upsertMutation.mutate(data)
  }

  if (isLoading) {
    return <LoadingState message="Carregando cursos..." />
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
              onClick={handleCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? 'Editar Curso' : 'Criar Novo Curso'}
              </DialogTitle>
            </DialogHeader>
            <CourseForm
              isEditting={editingCourse}
              onSubmit={handleSubmit}
              isLoading={upsertMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <CourseList
            key={course.id}
            course={course}
            isEditting
            onDelete={() => handleDelete(course.id)}
            onEdit={() => handleEdit(course)}
          />
        ))}
      </div>
    </div>
  )
}
