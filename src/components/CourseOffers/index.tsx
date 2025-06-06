'use client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { Award, Users, BookOpen, Headphones } from 'lucide-react'

const iconMap = {
  Award: <Award className="h-5 w-5 text-primary-500" />,
  Users: <Users className="h-5 w-5 text-primary-500" />,
  BookOpen: <BookOpen className="h-5 w-5 text-primary-500" />,
  Headphones: <Headphones className="h-5 w-5 text-primary-500" />,
}

export interface OfferFromDB {
  iconName: keyof typeof iconMap | string
  description: string
}

interface Props {
  offers: OfferFromDB[]
}

export function CourseOffers({ offers }: Props) {
  if (!offers || offers.length === 0) {
    return null
  }

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-xl md:text-2xl font-semibold text-slate-800">
          O curso inclui
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="mt-4 grid grid-cols-1 gap-y-3 md:grid-cols-1">
          {offers.map((offer) => (
            <li
              key={offer.description}
              className="flex items-center text-slate-600 text-base"
            >
              <span className="mr-3">
                {offer.iconName in iconMap ? (
                  iconMap[offer.iconName as keyof typeof iconMap]
                ) : (
                  <Users className="h-5 w-5 text-primary-500" />
                )}
              </span>
              {offer.description}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
