'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, PlusSquare, MessageCircle, User, BarChart3, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth'

const b2bNavItems = [
  { href: '/app', icon: Home, label: 'Feed' },
  { href: '/app/groups', icon: Users, label: 'Grupos' },
  { href: '/app/create', icon: PlusSquare, label: 'Criar', special: true },
  { href: '/app/messages', icon: MessageCircle, label: 'Chat' },
  { href: '/app/metrics', icon: BarChart3, label: 'Métricas' },
]

const b2cNavItems = [
  { href: '/app', icon: Home, label: 'Feed' },
  { href: '/app/conversas', icon: MessageCircle, label: 'Fórum' },
  { href: '/app/groups', icon: Users, label: 'Grupos' },
  { href: '/app/notifications', icon: Bell, label: 'Novidades' },
  { href: '/app/profile', icon: User, label: 'Perfil' },
]

export function BottomNav() {
  const pathname = usePathname()
  const { isB2B } = useAuth()
  const navItems = isB2B ? b2bNavItems : b2cNavItems

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/90 backdrop-blur-lg sm:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          if (item.special) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 transition-colors',
                isActive ? 'text-white' : 'text-white/50'
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
