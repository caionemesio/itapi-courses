import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface Props {
  learnTopics: string[]
}

export function TopicsCard({ learnTopics }: Props) {
  return (
    <Card className="mx-auto max-w-[1220px] mt-16">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          O que você vai aprender
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="mt-4 grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-6">
          {learnTopics.map((topic, index) => (
            <li key={index} className="flex items-center text-lg">
              <Check className="mr-2 h-10 w-10 text-green-500" />
              {topic}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
