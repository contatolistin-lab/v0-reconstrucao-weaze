'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth'

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'audio'
  status: 'sent' | 'delivered' | 'read'
}

interface ChatViewProps {
  conversationId: string
  onBack?: () => void
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    content: 'Oi! Vi sua última postagem sobre estratégias de crescimento.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    type: 'text',
    status: 'read',
  },
  {
    id: '2',
    senderId: '2',
    content: 'Adorei a parte sobre gamificação! Como você implementou isso?',
    timestamp: new Date(Date.now() - 28 * 60 * 1000),
    type: 'text',
    status: 'read',
  },
  {
    id: '3',
    senderId: '1',
    content: 'Obrigado! A gamificação foi um game changer pra gente.',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    type: 'text',
    status: 'read',
  },
  {
    id: '4',
    senderId: '1',
    content: 'Usamos pontos por interação, badges de conquista e rankings semanais.',
    timestamp: new Date(Date.now() - 24 * 60 * 1000),
    type: 'text',
    status: 'read',
  },
  {
    id: '5',
    senderId: '2',
    content: 'Muito interessante! Você notou aumento na retenção?',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    type: 'text',
    status: 'read',
  },
  {
    id: '6',
    senderId: '1',
    content: 'Sim! Aumentamos 180% na retenção mensal.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    type: 'text',
    status: 'read',
  },
  {
    id: '7',
    senderId: '2',
    content: 'Adorei sua última postagem! Podemos conversar sobre aquela estratégia?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'text',
    status: 'delivered',
  },
]

const conversationData = {
  '1': {
    name: 'Maria Silva',
    online: true,
  },
  '2': {
    name: 'Grupo de Mentoria',
    online: false,
  },
}

export function ChatView({ conversationId, onBack }: ChatViewProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const conversation = conversationData[conversationId as keyof typeof conversationData] || {
    name: 'Conversa',
    online: false,
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '1',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      status: 'sent',
    }

    setMessages([...messages, message])
    setNewMessage('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
            {conversation.name.charAt(0)}
          </div>
          {conversation.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{conversation.name}</h3>
          <p className="text-xs text-muted-foreground">
            {conversation.online ? 'Online' : 'Offline'}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Phone className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Video className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((message) => {
            const isOwn = message.senderId === (user?.id || '1')

            return (
              <div
                key={message.id}
                className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2',
                    isOwn
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted rounded-bl-md'
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <div
                    className={cn(
                      'mt-1 flex items-center justify-end gap-1 text-[10px]',
                      isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              placeholder="Digite uma mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <Button
            onClick={handleSend}
            size="icon"
            className="gradient-bg shrink-0 text-white"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
