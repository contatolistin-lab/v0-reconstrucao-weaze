'use client'

import { useEffect } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/contexts/QueryProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { TenantProvider } from '@/contexts/TenantContext'
import { UpdateBanner } from '@/components/UpdateBanner'

function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.top !== window.self) return // skip iframe

    if ('serviceWorker' in navigator) {
      let checkInterval: NodeJS.Timeout

      navigator.serviceWorker.register('/sw.js').then((reg) => {
        checkInterval = setInterval(() => {
          reg.update()
        }, 60 * 60 * 1000) // check every hour

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                window.dispatchEvent(new CustomEvent('sw-update-ready'))
              }
            })
          }
        })
      }).catch(() => {
        // SW registration failed, noop
      })

      return () => {
        if (checkInterval) clearInterval(checkInterval)
      }
    }
  }, [])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <TooltipProvider>
        <ServiceWorkerRegister />
        <UpdateBanner />
        <AuthProvider>
          <TenantProvider>
            {children}
          </TenantProvider>
        </AuthProvider>
        <Toaster />
        <SonnerToaster />
      </TooltipProvider>
    </QueryProvider>
  )
}
