'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export function UpdateBanner() {
  const [updateReady, setUpdateReady] = useState(false)

  useEffect(() => {
    const handler = () => setUpdateReady(true)
    window.addEventListener('sw-update-ready', handler)
    return () => window.removeEventListener('sw-update-ready', handler)
  }, [])

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.controller?.postMessage('skipWaiting')
    }
    window.location.reload()
  }

  if (!updateReady) return null

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-primary px-4 py-2 text-primary-foreground">
      <span className="text-sm font-medium">Nova versão disponível</span>
      <Button
        size="sm"
        variant="secondary"
        onClick={handleUpdate}
        className="gap-1 text-xs"
      >
        <RefreshCw className="h-3 w-3" />
        Atualizar
      </Button>
    </div>
  )
}
