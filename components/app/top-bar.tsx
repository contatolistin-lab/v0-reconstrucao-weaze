'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Search, Plus } from 'lucide-react'
import { useAuth } from '@/lib/auth'

export function TopBar() {
  const pathname = usePathname()
  const { user, tenant } = useAuth()

  // Determine page title based on path
  const getTitle = () => {
    if (pathname === '/app') return 'Feed'
    if (pathname === '/app/groups') return 'Grupos'
    if (pathname === '/app/messages') return 'Mensagens'
    if (pathname === '/app/profile') return 'Perfil'
    if (pathname === '/app/explore') return 'Explorar'
    return tenant?.name || 'WEAZE'
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-black/80 px-4 backdrop-blur-lg">
      {/* Left: Logo or Title */}
      <div className="flex items-center gap-3">
        <Link href="/app" className="flex items-center gap-2">
          {tenant?.logo ? (
            <img
              src={tenant.logo}
              alt={tenant.name}
              className="h-8 w-8 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <span className="text-sm font-bold text-white">W</span>
            </div>
          )}
          <span className="text-lg font-semibold text-white">{getTitle()}</span>
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Buscar"
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Notificações"
        >
          <div className="relative">
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              3
            </span>
          </div>
        </button>

        {/* User avatar */}
        <Link
          href="/app/profile"
          className="ml-1 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-primary/50"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
              {user?.name.charAt(0) || 'U'}
            </div>
          )}
        </Link>
      </div>
    </header>
  )
}
