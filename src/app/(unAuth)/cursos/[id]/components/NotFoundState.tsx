'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function NotFoundState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[85vh] text-center">
      <h2 className="text-2xl font-semibold text-slate-700">{message}</h2>
      <p className="text-slate-500 mt-2">
        O link que você seguiu pode estar quebrado ou o curso pode ter sido
        removido.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Voltar para todos os cursos</Link>
      </Button>
    </div>
  )
}
