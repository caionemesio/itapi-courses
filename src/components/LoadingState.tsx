import { Loader2 } from 'lucide-react'

export function LoadingState({
  message = 'Carregando...',
}: {
  message?: string
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] text-slate-500">
      <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
      <p className="mt-4 text-lg">{message}</p>
    </div>
  )
}
