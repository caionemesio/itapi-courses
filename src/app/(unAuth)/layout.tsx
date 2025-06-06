// app/unAuth/layout.tsx
import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'

export default function UnAuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  )
}
