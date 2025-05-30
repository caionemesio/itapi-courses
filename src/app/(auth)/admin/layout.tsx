import { AdminSidebar } from '@/components/Admin/AdminSideBar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-white flex items-center px-6 shadow-sm">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-xl font-semibold text-gray-800">
              Painel Administrativo - ItapiCursos
            </h1>
          </header>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
