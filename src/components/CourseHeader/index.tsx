import { CourseHeaderProps } from './types'
import { Button } from '@/components/ui/button'

export default function CourseHeader({
  title,
  description,
  formsUrl,
  videoUrl,
}: CourseHeaderProps) {
  return (
    <div className="bg-primary-900 px-4 py-16">
      <div className="mx-auto max-w-[1220px] flex flex-col gap-8 md:flex-row items-center">
        <div className="flex-1 ml-4 xl:ml-0">
          <h1 className="text-3xl font-semibold text-white">{title}</h1>
          <p className="mt-4 text-lg text-white">{description}</p>
          <Button
            variant="default"
            size="lg"
            asChild
            className="
                      mt-12
                      px-8
                      py-5
                      text-lg
                      font-semibold
                      transition-colors
                      hover:brightness-110
                      hover:shadow-md
                    "
          >
            <a href={formsUrl}>Inscreva-se Agora</a>
          </Button>
        </div>

        {videoUrl && (
          <div className="flex-1 relative aspect-video">
            <iframe
              src={videoUrl}
              allowFullScreen
              className="absolute top-0 left-0 h-full w-full rounded shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  )
}
