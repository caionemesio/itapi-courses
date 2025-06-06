'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import useCourses from '@/service/useCourses'

import CourseHeader from '@/components/CourseHeader'
import { TopicsCard } from '@/components/TopicsCard'
import { CourseOffers } from '@/components/CourseOffers'
import { CoursePageSkeleton } from './components/CoursePageSkeleton'
import { NotFoundState } from './components/NotFoundState'

export default function CoursePage() {
  const params = useParams<{ id: string }>()
  const courseSlug = params?.id

  const { getCourseBySlug } = useCourses()

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseSlug],
    queryFn: () => getCourseBySlug(courseSlug!),
    enabled: !!courseSlug,
  })

  if (!isClient || isLoading) {
    return <CoursePageSkeleton />
  }

  if (!course) {
    return <NotFoundState message="Curso não encontrado" />
  }

  return (
    <div className="min-h-90vh">
      <CourseHeader
        title={course.title}
        description={course.description}
        formsUrl={course.formsUrl}
        videoUrl={course.videoUrl}
      />

      <div className="mx-auto max-w-[1220px] px-4 mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <TopicsCard learnTopics={course.learnTopics || []} />
        </div>
        <div className="md:col-span-1">
          <CourseOffers offers={course.courseOffers || []} />
        </div>
      </div>
    </div>
  )
}
