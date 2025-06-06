'use client'
import { Skeleton } from '@/components/ui/skeleton'

export function CoursePageSkeleton() {
  return (
    <>
      <div className="bg-primary-900 px-4 py-16">
        <div className="mx-auto max-w-[1220px] flex flex-col gap-8 md:flex-row items-center">
          <div className="flex-1">
            <Skeleton className="h-9 w-3/4 bg-gray-500/50" />
            <Skeleton className="h-6 w-full mt-4 bg-gray-500/50" />
            <Skeleton className="h-12 w-48 mt-12 bg-gray-500/50" />
          </div>
          <div className="flex-1 w-full relative aspect-video">
            <Skeleton className="h-full w-full rounded shadow-lg bg-gray-500/50" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1220px] px-4 mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="md:col-span-1">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </>
  )
}
