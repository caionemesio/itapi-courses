'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import CourseHeader from '@/components/CourseHeader'
import { mockingCourse } from '@/mockings/mockingCourse'
import { TopicsCard } from '@/components/TopicsCard'

interface Params {
  id: string
  [key: string]: string
}
const { title, description, learnTopics, formsUrl } = mockingCourse
export default function CoursePage() {
  const params = useParams<Params>()

  const courseId = params?.id

  return (
    <>
      <CourseHeader
        title={title}
        description={description}
        formsUrl={formsUrl}
        videoUrl="https://www.youtube.com/embed/CxwjOwNgx30"
      />
      <TopicsCard learnTopics={learnTopics} />
    </>
  )
}
