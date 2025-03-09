'use client'
import * as React from 'react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { slugifyFunction } from '@/utils/slugyfyFunction'

interface CourseListProps {
  title: string
  description: string
  url: string
  image: string
}

export default function CourseList({
  title,
  description,
  image,
}: CourseListProps) {
  const slug = slugifyFunction(title)

  return (
    <Link href={`/cursos/${slug}`} target="_blank" rel="noopener noreferrer">
      <Card className="w-[350px] min-h-72">
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-t-md"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
