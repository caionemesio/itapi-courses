'use client'
import Link from 'next/link'
import { Input } from '../ui/input'
import { SearchIcon, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import useCourses from '@/service/useCourses'
import { useQuery } from '@tanstack/react-query'

export function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  const { searchCourses } = useCourses()

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['searchCourses', debouncedSearchTerm],
    queryFn: () => searchCourses(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 2,
  })

  useEffect(() => {
    setHasMounted(true)
    const updateIsMobile = () => setIsMobile(window.innerWidth < 640)
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <header className="w-full p-4 flex gap-4 items-center justify-between bg-white shadow-md border-b border-gray-300 sm:gap-0">
      <div className="hidden md:flex">
        <Link href="/">
          <Image
            src="/itapi-logo.png"
            width={108}
            height={32}
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>
      </div>

      <div className="relative flex-1 flex justify-normal md:justify-center">
        <Input
          className="bg-slate-50 p-2 rounded-md md:min-h-11 md:text-xl"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          iconRight={
            searchTerm ? (
              <X
                className="h-5 w-5 text-muted-foreground cursor-pointer"
                onClick={() => setSearchTerm('')}
              />
            ) : (
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            )
          }
          placeholder={isMobile ? '' : 'O que você quer aprender?'}
          containerClassName="w-2/3 max-sm:w-full"
        />

        {debouncedSearchTerm.length > 2 && (
          <div className="absolute top-full mt-2 w-2/3 max-sm:w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10">
            {isLoading && <p className="p-4 text-gray-500">Buscando...</p>}

            {!isLoading && searchResults && searchResults.length > 0 && (
              <ul>
                {searchResults.map((course) => (
                  <li key={course.slug}>
                    <Link
                      href={`/cursos/${course.slug}`}
                      className="block p-4 hover:bg-gray-100 transition-colors"
                      onClick={() => setSearchTerm('')}
                    >
                      {course.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {!isLoading && searchResults?.length === 0 && (
              <p className="p-4 text-gray-500">Nenhum curso encontrado.</p>
            )}
          </div>
        )}
      </div>

      <Button className="bg-transparent text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
        <Link href="/#categorias">Explore nossos cursos</Link>
      </Button>
    </header>
  )
}
