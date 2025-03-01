'use client'
import CourseCatalog from '@/components/CourseCatalog'
import CustomCarousel from '@/components/CustomCarousel'
import ReasonsToTakeTheCourse from '@/components/ReasonsToTakeTheCourse'

export default function Home() {
  return (
    <>
      <CustomCarousel />
      <CourseCatalog />
      <ReasonsToTakeTheCourse />
    </>
  )
}
