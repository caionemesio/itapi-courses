import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Offer {
  icon: React.ReactNode
  description: string
}

interface Props {
  offers: Offer[]
}

export function CourseOffers({ offers }: Props) {
  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-xl md:text-2xl font-semibold text-slate-800">
          O curso inclui
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="mt-4 grid grid-cols-1 gap-y-3 md:grid-cols-1">
          {offers.map((offer, index) => (
            <li
              key={index}
              className="flex items-center text-slate-600 text-base"
            >
              <span className="mr-2">{offer.icon}</span>
              {offer.description}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
