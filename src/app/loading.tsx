'use client'

import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
    </div>
  )
}
