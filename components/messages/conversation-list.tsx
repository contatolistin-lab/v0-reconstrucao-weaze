'use client'

import { useState } from 'react'
import { Search, Edit, Check, CheckCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Conversation {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: Date
  unread: number
  online: boolean
  isGroup: boolean
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Maria Silva',
    lastMessage: 'Adorei sua última postagem! Podemos conversar sobre aquela estratégia?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unread: 2,
    online: true,
    isGroup: false,
  },
  {
    id: '2',
    name: 'Grupo de Mentoria',
    lastMessage: 'João: Alguém tem o link da última aula?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unread: 5,
    online: false,
    isGroup: true,
  },
  {
    id: '3',
    name: 'Pedro Almeida',
    lastMessage: 'Obrigado pela ajuda!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: 0,
    online: true,
    isGroup: false,
  },
  {
    id: '4',
    name: 'Ana Costa',
    lastMessage: 'Vamos marcar aquela call?',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    unread: 0,
    online: false,
    isGroup: false,
  },
  {
    id: '5',
    name: 'Suporte WEAZE',
    lastMessage: 'Sua solicitação foi resolvida.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    unread: 0,
    online: true,
    isGroup: false,
  },
]

function formatTimestamp(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }
  if (hours > 0) return `${hours}h`
  if (minutes > 0) return `${minutes}min`
  return 'agora'
}

interface ConversationListProps {
  onSelect: (id: string | undefined) => void
  selectedId?: string
}

export function ConversationList({ onSelect, selectedId }: ConversationListProps) {
  const [search, setSearch] = useState('')

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-full flex-col border-r border-border">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Mensagens</h2>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Edit className="h-4 w-4" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              'flex w-full items-center gap-3 border-b border-border p-4 text-left transition-colors hover:bg-muted/50',
              selectedId === conv.id && 'bg-muted'
            )}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              {conv.avatar ? (
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                  {conv.isGroup ? conv.name.substring(0, 2).toUpperCase() : conv.name.charAt(0)}
                </div>
              )}
              {conv.online && !conv.isGroup && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-medium">{conv.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(conv.timestamp)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="truncate text-sm text-muted-foreground">
                  {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
