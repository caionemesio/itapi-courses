'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import CourseHeader from '@/components/CourseHeader'
import { mockingCourse } from '@/mockings/mockingCourse'
import { TopicsCard } from '@/components/TopicsCard'
import { CourseOffers } from '@/components/CourseOffers'

interface Params {
  id: string
  [key: string]: string
}

export default function CoursePage() {
  const params = useParams<Params>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const courseId = params?.id

  const { title, description, learnTopics, formsUrl, courseOffers } =
    mockingCourse

  return (
    <>
      <CourseHeader
        title={title}
        description={description}
        formsUrl={formsUrl}
        videoUrl="https://www.youtube.com/embed/CxwjOwNgx30"
      />

      <div className="mx-auto max-w-[1220px] px-4 mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <TopicsCard learnTopics={learnTopics} />
        </div>
        <div className="md:col-span-1">
          <CourseOffers offers={courseOffers} />
        </div>
      </div>
    </>
  )
}
