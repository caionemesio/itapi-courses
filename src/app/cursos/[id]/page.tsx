'use client'

import React from 'react'
import { useParams } from 'next/navigation'

interface Params {
  id: string
  [key: string]: string
}

export default function CoursePage() {
  const params = useParams<Params>()

  const courseId = params?.id

  return <div>O ID do curso é: {courseId}</div>
}
