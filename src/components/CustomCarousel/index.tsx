'use client'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import Image from 'next/image'

export default function CustomCarousel() {
  const arrayImages = [
    { url: '/advice-secjuv.png', name: 'secretaria da juventude imagem' },
    { url: '/advice-secjuv.png', name: 'secretaria da juventude imagem' },
  ]

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  )
  return (
    <div className="min-h-[300px] mt-4 flex justify-center items-center  lg:max-w-5xl mx-auto overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {arrayImages.map((image, index) => (
            <CarouselItem key={index} className="min-w-[400px]">
              <div className="relative w-full h-[400px] overflow-hidden">
                <Image
                  src={image.url}
                  fill
                  alt={image.name}
                  quality={100}
                  className="object-cover object-[130px_center] w-[340px] lg:object-center transition-all duration-300"
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
