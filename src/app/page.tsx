'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Home() {
  const router = useRouter()

  const handleClick = (courseId: number) => {
    console.log('clicked')
    router.push(`/cursos/${courseId}`)
  }

  return (
    <Button onClick={() => handleClick(3)} className="bg-red-500">
      Click me
    </Button>
  )
}
