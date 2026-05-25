"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Calendar,
  ShoppingBag,
  CheckCircle,
  Trash2,
  MoreVertical,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type NotificationType = "like" | "comment" | "follow" | "schedule" | "purchase" | "approval"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  created_at: string
  read: boolean
  actor?: { name: string; avatar: string | null }
  link?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    title: "Novo curtida",
    message: "Maria Silva curtiu seu post 'Dicas de treino'",
    created_at: "2026-05-25T10:30:00Z",
    read: false,
    actor: { name: "Maria Silva", avatar: null },
  },
  {
    id: "2",
    type: "comment",
    title: "Novo comentário",
    message: "João Santos comentou: 'Muito bom o conteúdo!'",
    created_at: "2026-05-25T09:15:00Z",
    read: false,
    actor: { name: "João Santos", avatar: null },
  },
  {
    id: "3",
    type: "follow",
    title: "Novo membro",
    message: "Ana Costa solicitou acesso à sua comunidade",
    created_at: "2026-05-25T08:00:00Z",
    read: false,
    actor: { name: "Ana Costa", avatar: null },
  },
  {
    id: "4",
    type: "schedule",
    title: "Agendamento confirmado",
    message: "Pedro Lima confirmou agendamento para 26/05 às 14h",
    created_at: "2026-05-24T16:45:00Z",
    read: true,
    actor: { name: "Pedro Lima", avatar: null },
  },
  {
    id: "5",
    type: "purchase",
    title: "Nova venda",
    message: "Carla Souza comprou 'Plano Premium'",
    created_at: "2026-05-24T14:20:00Z",
    read: true,
    actor: { name: "Carla Souza", avatar: null },
  },
  {
    id: "6",
    type: "approval",
    title: "Solicitação aprovada",
    message: "Sua solicitação para 'Academia FitLife' foi aprovada",
    created_at: "2026-05-24T10:00:00Z",
    read: true,
  },
  {
    id: "7",
    type: "like",
    title: "Novo curtida",
    message: "Ricardo Oliveira curtiu seu post 'Receitas saudáveis'",
    created_at: "2026-05-23T18:30:00Z",
    read: true,
    actor: { name: "Ricardo Oliveira", avatar: null },
  },
]

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}min`
  if (diffHours < 24) return `${diffHours}h`
  if (diffDays < 7) return `${diffDays}d`
  return date.toLocaleDateString("pt-BR")
}

function getNotificationIcon(type: NotificationType) {
  const iconClass = "h-5 w-5"
  switch (type) {
    case "like":
      return <Heart className={cn(iconClass, "text-pink-500")} />
    case "comment":
      return <MessageCircle className={cn(iconClass, "text-blue-500")} />
    case "follow":
      return <UserPlus className={cn(iconClass, "text-green-500")} />
    case "schedule":
      return <Calendar className={cn(iconClass, "text-orange-500")} />
    case "purchase":
      return <ShoppingBag className={cn(iconClass, "text-purple-500")} />
    case "approval":
      return <CheckCircle className={cn(iconClass, "text-emerald-500")} />
    default:
      return <Bell className={iconClass} />
  }
}

function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
}: {
  notification: Notification
  onMarkRead: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        "flex items-start gap-3 p-4 border-b border-border hover:bg-muted/50 transition-colors",
        !notification.read && "bg-primary/5"
      )}
    >
      {notification.actor ? (
        <Avatar className="h-10 w-10">
          <AvatarImage src={notification.actor.avatar || undefined} />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
            {notification.actor.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          {getNotificationIcon(notification.type)}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={cn("text-sm", !notification.read && "font-semibold")}>
            {notification.message}
          </p>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {formatTimeAgo(notification.created_at)}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!notification.read && (
            <DropdownMenuItem onClick={() => onMarkRead(notification.id)}>
              <Check className="h-4 w-4 mr-2" />
              Marcar como lida
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => onDelete(notification.id)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const unreadCount = notifications.filter((n) => !n.read).length
  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Notificações</h1>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-white">{unreadCount}</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
              <Check className="h-4 w-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "unread")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="unread">
              Não lidas {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              {filter === "unread"
                ? "Nenhuma notificação não lida"
                : "Nenhuma notificação"}
            </h3>
            <p className="text-muted-foreground">
              {filter === "unread"
                ? "Você está em dia com todas as notificações"
                : "Quando houver novidades, elas aparecerão aqui"}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={handleMarkRead}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
