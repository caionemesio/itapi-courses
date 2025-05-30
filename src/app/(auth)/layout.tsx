// app/(auth)/layout.tsx
import { ReactNode } from 'react'
// import { redirect } from 'next/navigation'
// import { getSession } from '@/lib/session'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  //   const session = await getSession()
  //   if (!session) redirect('/') // volta pra Home pública
  return <main>{children}</main>
}
