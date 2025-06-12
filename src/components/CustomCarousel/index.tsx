'use client'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useSlides from '@/service/useSlides'
import { Skeleton } from '@/components/ui/skeleton'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export default function CustomCarousel() {
  const { getSlides } = useSlides()

  const { data: slides, isLoading } = useQuery({
    queryKey: ['slides'],
    queryFn: getSlides,
  })

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  )

  if (isLoading) {
    return (
      <div className="min-h-[300px] mt-4 flex justify-center items-center lg:max-w-5xl mx-auto overflow-hidden">
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <div className="min-h-[300px] mt-4 flex justify-center items-center lg:max-w-5xl mx-auto overflow-hidden">
      <Carousel
        className="w-full max-w-[920px]"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides?.map((slide) => (
            <CarouselItem key={slide.id} className="basis-full">
              <div className="relative w-full h-[400px] overflow-hidden">
                <Image
                  src={slide.imageUrl}
                  fill
                  alt={slide.title}
                  quality={100}
                  className="object-cover w-full h-full object-left"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
