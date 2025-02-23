// components/Header.tsx
import Link from 'next/link'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

export function Header() {
  return (
    <header className="w-full p-4 flex gap-4  items-center justify-between bg-white shadow-md border-b border-gray-300 sm:gap-0">
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

      <div className="flex-1 flex justify-normal  md:justify-center">
        <Input
          className="bg-slate-50 p-2 rounded-md md:min-h-11 md:text-xl"
          type="text"
          iconRight={<SearchIcon className="h-5 w-5 text-muted-foreground" />}
          placeholder="O que você quer aprender?"
          containerClassName="w-2/3 max-sm:w-full"
        />
      </div>

      <Button className="bg-transparent text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
        <Link href="/cursos">Explore nossos cursos</Link>
      </Button>
    </header>
  )
}
