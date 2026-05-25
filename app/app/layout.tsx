'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TopBar } from '@/components/app/top-bar'
import { BottomNav } from '@/components/app/bottom-nav'
import { Sidebar } from '@/components/app/sidebar'
import { UpdateBanner } from '@/components/UpdateBanner'
import { useAuth } from '@/lib/auth'
import { useTenant } from '@/contexts/TenantContext'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, isLoading, initializing } = useAuth()
  const { blocked, loading: tenantLoading } = useTenant()

  useEffect(() => {
    if (!isLoading && !initializing && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, initializing, router])

  useEffect(() => {
    if (blocked) {
      router.push('/blocked')
    }
  }, [blocked, router])

  if (isLoading || initializing || tenantLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <UpdateBanner />
      <Sidebar />
      <TopBar />
      <main className="h-screen pt-14 pb-16 sm:pb-0 sm:pl-60">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
