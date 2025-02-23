"use client"
import { deflate } from "zlib"

import { useRouter } from 'next/navigation'
import Autoplay from "embla-carousel-autoplay"
import React from 'react'


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import Image from 'next/image'


export default function CustomCarousel () {

    const arrayImages = [
        {url:"/studant.png",name:"estudante"},{url:"/secjuv.png", name:"/secjuv.png"}

      ]
      
      const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      ) 
      return (
        <div className="  bg-lightBackground m-6" >
            <div className="h-96 flex justify-center items-center max-w-6xl mx-auto">
            <Carousel
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                {arrayImages.map((image, index) => (
                    <CarouselItem key={index}>
                    <div className='flex justify-center items-center bg-slate-500'>
                        <Image 
                        src={image.url} 
                        width={600} 
                        height={400} 
                        alt={image.name} 
                        className='w-full h-96'
                        />
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            </div>
        </div>
      )
    }
