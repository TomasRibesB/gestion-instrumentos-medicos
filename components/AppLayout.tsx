"use client"

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  
  // Don't show layout on login page
  const isLoginPage = pathname === '/login'

  if (isLoginPage) {
    return <main className="min-h-screen bg-background">{children}</main>
  }

  // Optional: Loading state while checking auth
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Cargando...</div>
  }

  return (
    <div className="flex min-h-screen flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
        <Header />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
