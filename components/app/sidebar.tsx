'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Users, 
  MessageCircle, 
  Calendar, 
  Trophy, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  BarChart3,
  PlusSquare,
  UserPlus,
  Building,
  User,
  Video,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth'
import { useTenant } from '@/contexts/TenantContext'
import { useState } from 'react'

const mainNavItems = [
  { href: '/app', icon: Home, label: 'Feed' },
  { href: '/app/create', icon: PlusSquare, label: 'Criar Post' },
  { href: '/app/conversas', icon: MessageCircle, label: 'Conversas' },
  { href: '/app/groups', icon: Users, label: 'Grupos' },
  { href: '/app/messages', icon: MessageCircle, label: 'Mensagens' },
  { href: '/app/notifications', icon: Bell, label: 'Notificações' },
  { href: '/app/events', icon: Calendar, label: 'Eventos' },
  { href: '/app/lives', icon: Video, label: 'Lives' },
  { href: '/app/ranking', icon: Trophy, label: 'Ranking' },
  { href: '/app/metrics', icon: BarChart3, label: 'Métricas' },
  { href: '/app/members', icon: Users, label: 'Membros' },
  { href: '/app/requests', icon: UserPlus, label: 'Solicitações' },
  { href: '/app/communities', icon: Building, label: 'Comunidades' },
]

const bottomNavItems = [
  { href: '/app/profile', icon: User, label: 'Perfil' },
  { href: '/app/settings', icon: Settings, label: 'Configurações' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { tenant } = useTenant()
  const [collapsed, setCollapsed] = useState(false)
  const userMeta = user?.user_metadata as Record<string, unknown> | undefined
  const userName = (userMeta?.name as string) || user?.email?.split('@')[0] || 'Usuário'
  const userAvatar = userMeta?.avatar_url as string | undefined
  const userUsername = userMeta?.username as string | undefined

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-30 hidden h-full flex-col border-r border-border bg-card transition-all duration-300 sm:flex',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href="/app" className="flex items-center gap-2">
            {tenant?.logo_url ? (
              <img
                src={tenant.logo_url}
                alt={tenant.name}
                className="h-8 w-8 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
                <span className="text-sm font-bold text-white">W</span>
              </div>
            )}
            <span className="text-lg font-semibold">{tenant?.name || 'WEAZE'}</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
            collapsed && 'mx-auto'
          )}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-2">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-2">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && item.label}
            </Link>
          )
        })}

        {/* User section */}
        <div
          className={cn(
            'mt-2 flex items-center gap-3 rounded-lg p-2',
            collapsed && 'justify-center'
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                {userName.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{userName}</p>
              {userUsername && (
                <p className="truncate text-xs text-muted-foreground">
                  @{userUsername}
                </p>
              )}
            </div>
          )}
          {!collapsed && (
            <button
              onClick={logout}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
