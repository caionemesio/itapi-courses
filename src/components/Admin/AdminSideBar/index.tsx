'use client'
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Images,
  Settings,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import Link from 'next/link'

const adminMenuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard, end: true },
  { title: 'Cursos', url: '/admin/cursos', icon: BookOpen },
  { title: 'Categorias', url: '/admin/categorias', icon: FolderOpen },
  { title: 'Carrossel', url: '/admin/banner', icon: Images },
]

export function AdminSidebar() {
  return (
    <Sidebar className={'w-64'}>
      <div className="p-4 border-b bg-blue-600 text-white">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6" />
        </div>
      </div>

      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 uppercase text-xs font-semibold"></SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="bg-blue-100 text-blue-700 font-medium border-r-2 border-blue-700"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
