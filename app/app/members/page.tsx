"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Users,
  Shield,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Trash2,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type MemberStatus = "active" | "blocked" | "pending"
type MemberRole = "admin" | "moderator" | "member"

interface Member {
  id: string
  name: string
  email: string
  avatar: string | null
  role: MemberRole
  status: MemberStatus
  joined_at: string
}

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: null,
    role: "admin",
    status: "active",
    joined_at: "2026-01-15",
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao@email.com",
    avatar: null,
    role: "moderator",
    status: "active",
    joined_at: "2026-02-20",
  },
  {
    id: "3",
    name: "Ana Costa",
    email: "ana@email.com",
    avatar: null,
    role: "member",
    status: "active",
    joined_at: "2026-03-10",
  },
  {
    id: "4",
    name: "Pedro Lima",
    email: "pedro@email.com",
    avatar: null,
    role: "member",
    status: "blocked",
    joined_at: "2026-01-05",
  },
  {
    id: "5",
    name: "Carla Souza",
    email: "carla@email.com",
    avatar: null,
    role: "member",
    status: "pending",
    joined_at: "2026-05-24",
  },
  {
    id: "6",
    name: "Ricardo Oliveira",
    email: "ricardo@email.com",
    avatar: null,
    role: "member",
    status: "active",
    joined_at: "2026-04-01",
  },
  {
    id: "7",
    name: "Fernanda Lima",
    email: "fernanda@email.com",
    avatar: null,
    role: "member",
    status: "pending",
    joined_at: "2026-05-25",
  },
  {
    id: "8",
    name: "Lucas Almeida",
    email: "lucas@email.com",
    avatar: null,
    role: "member",
    status: "blocked",
    joined_at: "2026-02-14",
  },
]

const roleLabels: Record<MemberRole, string> = {
  admin: "Admin",
  moderator: "Moderador",
  member: "Membro",
}

const roleVariants: Record<MemberRole, "default" | "secondary" | "outline"> = {
  admin: "default",
  moderator: "secondary",
  member: "outline",
}

const statusConfig = {
  active: { label: "Ativo", icon: CheckCircle, class: "text-green-500" },
  blocked: { label: "Bloqueado", icon: XCircle, class: "text-red-500" },
  pending: { label: "Pendente", icon: Clock, class: "text-yellow-500" },
}

function MemberCard({
  member,
  onBlockToggle,
  onChangeRole,
  onRemove,
}: {
  member: Member
  onBlockToggle: (id: string) => void
  onChangeRole: (id: string, role: MemberRole) => void
  onRemove: (id: string) => void
}) {
  const StatusIcon = statusConfig[member.status].icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border border-border hover:shadow-sm transition-shadow",
        member.status === "blocked" && "opacity-60"
      )}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={member.avatar || undefined} />
        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
          {member.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{member.name}</span>
          <Badge variant={roleVariants[member.role]} className="text-xs">
            {roleLabels[member.role]}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm text-muted-foreground truncate">{member.email}</span>
          <span className={`flex items-center gap-1 text-xs ${statusConfig[member.status].class}`}>
            <StatusIcon className="h-3 w-3" />
            {statusConfig[member.status].label}
          </span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {member.status === "active" ? (
            <DropdownMenuItem onClick={() => onBlockToggle(member.id)}>
              <Ban className="h-4 w-4 mr-2" />
              Bloquear
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => onBlockToggle(member.id)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Desbloquear
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onChangeRole(member.id, "member")}>
            <Users className="h-4 w-4 mr-2" />
            Tornar membro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChangeRole(member.id, "moderator")}>
            <Shield className="h-4 w-4 mr-2" />
            Tornar moderador
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChangeRole(member.id, "admin")}>
            <Shield className="h-4 w-4 mr-2" />
            Tornar admin
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onRemove(member.id)} className="text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Remover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

export default function MembersPage() {
  const [members, setMembers] = useState(mockMembers)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "blocked" | "pending">("all")

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const counts = {
    all: members.length,
    active: members.filter((m) => m.status === "active").length,
    blocked: members.filter((m) => m.status === "blocked").length,
    pending: members.filter((m) => m.status === "pending").length,
  }

  const handleBlockToggle = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "blocked" ? "active" : "blocked" }
          : m
      )
    )
  }

  const handleChangeRole = (id: string, role: MemberRole) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)))
  }

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Membros</h1>
            <Badge className="bg-primary text-white">{counts.all}</Badge>
          </div>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Convidar
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar membros..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as "all" | "active" | "blocked" | "pending")}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos ({counts.all})</TabsTrigger>
            <TabsTrigger value="active">Ativos ({counts.active})</TabsTrigger>
            <TabsTrigger value="blocked">Bloqueados ({counts.blocked})</TabsTrigger>
            <TabsTrigger value="pending">Pendentes ({counts.pending})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Nenhum membro encontrado</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Tente uma busca diferente" : "Nenhum membro nesta categoria"}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-2">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onBlockToggle={handleBlockToggle}
                  onChangeRole={handleChangeRole}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
