'use client'
import { Card } from '@/components/ui/card'
import { CardReasonsType } from './types'

export default function CardReasons({
  Icon,
  title,
  description,
}: CardReasonsType) {
  return (
    <Card className="w-full max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-center items-center mb-4">
          <Icon className="w-24 h-24 text-primary-800" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-2">{title}</h2>
        <p className="text-gray-700 text-center mb-4">{description}</p>
      </div>
    </Card>
  )
}
