import * as React from 'react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

interface CourseListProps {
  title: string
  description: string
  url: string
  image: string
}

export default function CourseList({
  title,
  description,
  url,
  image,
}: CourseListProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
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
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  )
}
