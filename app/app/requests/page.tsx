"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  UserPlus,
  Check,
  X,
  Mail,
  Calendar,
  Clock,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface JoinRequest {
  id: string
  name: string
  email: string
  avatar: string | null
  requested_at: string
  message?: string
}

const mockRequests: JoinRequest[] = [
  {
    id: "1",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    avatar: null,
    requested_at: "2026-05-25T10:30:00Z",
    message: "Olá! Gostaria de participar da comunidade para aprender mais sobre marketing digital.",
  },
  {
    id: "2",
    name: "Pedro Lima",
    email: "pedro.lima@email.com",
    avatar: null,
    requested_at: "2026-05-24T14:20:00Z",
  },
  {
    id: "3",
    name: "Carla Souza",
    email: "carla.souza@email.com",
    avatar: null,
    requested_at: "2026-05-24T09:15:00Z",
    message: "Sou profissional da área e quero contribuir com a comunidade.",
  },
  {
    id: "4",
    name: "Ricardo Oliveira",
    email: "ricardo.oliveira@email.com",
    avatar: null,
    requested_at: "2026-05-23T18:30:00Z",
  },
  {
    id: "5",
    name: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    avatar: null,
    requested_at: "2026-05-23T11:00:00Z",
    message: "Indicada por um amigo, muito animada para participar!",
  },
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function RequestCard({
  request,
  onApprove,
  onReject,
}: {
  request: JoinRequest
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={request.avatar || undefined} />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
            {request.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{request.name}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            <span>{request.email}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Solicitado em {formatDate(request.requested_at)}</span>
          </div>

          {request.message && (
            <p className="mt-3 text-sm text-foreground bg-muted/50 rounded-xl p-3 italic">
              &ldquo;{request.message}&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={() => onReject(request.id)}
        >
          <X className="h-4 w-4 mr-2" />
          Rejeitar
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
          onClick={() => onApprove(request.id)}
        >
          <Check className="h-4 w-4 mr-2" />
          Aprovar
        </Button>
      </div>
    </motion.div>
  )
}

export default function RequestsPage() {
  const [requests, setRequests] = useState(mockRequests)

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  const handleReject = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Solicitações</h1>
          {requests.length > 0 && (
            <Badge className="bg-primary text-white">{requests.length}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Aprove ou rejeite solicitações de entrada na comunidade
        </p>
      </div>

      {/* Requests List */}
      <div className="flex-1 overflow-y-auto p-4">
        {requests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6">
              <UserPlus className="h-10 w-10 text-primary/60" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Nenhuma solicitação pendente</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Todas as solicitações de entrada foram processadas. Quando novos membros solicitarem acesso, eles aparecerão aqui.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-green-500" />
              Tudo em dia!
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
