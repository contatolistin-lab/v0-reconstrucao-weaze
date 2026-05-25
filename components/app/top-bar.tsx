'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Search } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { useTenant } from '@/contexts/TenantContext'

export function TopBar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { tenant } = useTenant()
  const userMeta = user?.user_metadata as Record<string, unknown> | undefined
  const userName = (userMeta?.name as string) || user?.email?.split('@')[0] || 'U'
  const userAvatar = userMeta?.avatar_url as string | undefined

  const getTitle = () => {
    if (pathname === '/app') return 'Feed'
    if (pathname === '/app/groups') return 'Grupos'
    if (pathname === '/app/messages') return 'Mensagens'
    if (pathname === '/app/profile') return 'Perfil'
    if (pathname === '/app/metrics') return 'Métricas'
    if (pathname === '/app/conversas') return 'Conversas'
    if (pathname === '/app/notifications') return 'Notificações'
    if (pathname === '/app/members') return 'Membros'
    if (pathname === '/app/requests') return 'Solicitações'
    if (pathname === '/app/ranking') return 'Ranking'
    if (pathname === '/app/create') return 'Criar Post'
    if (pathname === '/app/events') return 'Eventos'
    if (pathname === '/app/lives') return 'Lives'
    if (pathname === '/app/communities') return 'Comunidades'
    return tenant?.name || 'WEAZE'
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-black/80 px-4 backdrop-blur-lg">
      <div className="flex items-center gap-3">
        <Link href="/app" className="flex items-center gap-2">
          {tenant?.logo_url ? (
            <img
              src={tenant.logo_url}
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

      <div className="flex items-center gap-2">
        <Link
          href="/app/profile"
          className="ml-1 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-primary/50"
        >
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>
      </div>
    </header>
  )
}
