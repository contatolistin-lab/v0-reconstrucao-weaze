"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Plus,
  Lock,
  Globe,
  Search,
  MoreVertical,
  UserPlus,
  Settings,
  Trash2,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Mock data
const mockGroups = [
  {
    id: "1",
    name: "VIP Members",
    description: "Membros com acesso exclusivo a conteúdos premium",
    is_private: true,
    member_count: 45,
    image_url: null,
  },
  {
    id: "2",
    name: "Comunidade Geral",
    description: "Espaço aberto para todos os membros interagirem",
    is_private: false,
    member_count: 234,
    image_url: null,
  },
  {
    id: "3",
    name: "Equipe Interna",
    description: "Grupo exclusivo para colaboradores",
    is_private: true,
    member_count: 12,
    image_url: null,
  },
  {
    id: "4",
    name: "Alunos 2026",
    description: "Turma de formandos 2026",
    is_private: true,
    member_count: 89,
    image_url: null,
  },
]

interface Group {
  id: string
  name: string
  description: string
  is_private: boolean
  member_count: number
  image_url: string | null
}

function GroupCard({ group, onSelect }: { group: Group; onSelect: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(group.id)}
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 rounded-xl">
          <AvatarImage src={group.image_url || undefined} />
          <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary to-accent text-white text-lg font-bold">
            {group.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate">{group.name}</h3>
            {group.is_private ? (
              <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            ) : (
              <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {group.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {group.member_count} membros
            </Badge>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar membros
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir grupo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  )
}

function CreateGroupDialog({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)
  const [open, setOpen] = useState(false)

  const handleCreate = () => {
    // Would create group via API
    setOpen(false)
    setName("")
    setDescription("")
    setIsPrivate(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar novo grupo</DialogTitle>
          <DialogDescription>
            Crie um grupo para segmentar seus membros e compartilhar conteúdo exclusivo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do grupo</Label>
            <Input
              id="name"
              placeholder="Ex: VIP Members"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o propósito do grupo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Grupo privado</Label>
              <p className="text-sm text-muted-foreground">
                Apenas membros convidados podem participar
              </p>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="bg-gradient-to-r from-primary to-accent text-white"
          >
            Criar grupo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)

  const filteredGroups = mockGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (selectedGroupId) {
    const group = mockGroups.find((g) => g.id === selectedGroupId)
    return <GroupDetail group={group!} onBack={() => setSelectedGroupId(null)} />
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Grupos</h1>
          <CreateGroupDialog>
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              <Plus className="h-4 w-4 mr-2" />
              Criar grupo
            </Button>
          </CreateGroupDialog>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar grupos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Nenhum grupo encontrado</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Tente uma busca diferente"
                : "Crie seu primeiro grupo para começar"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} onSelect={setSelectedGroupId} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Group Detail Component
function GroupDetail({ group, onBack }: { group: Group; onBack: () => void }) {
  const mockMembers = [
    { id: "1", name: "Maria Silva", avatar: null, role: "admin" },
    { id: "2", name: "João Santos", avatar: null, role: "member" },
    { id: "3", name: "Ana Costa", avatar: null, role: "member" },
    { id: "4", name: "Pedro Lima", avatar: null, role: "member" },
    { id: "5", name: "Carla Souza", avatar: null, role: "member" },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
          Voltar
        </Button>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-xl">
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary to-accent text-white text-xl font-bold">
              {group.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{group.name}</h1>
              {group.is_private ? (
                <Lock className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Globe className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <p className="text-muted-foreground">{group.description}</p>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">
            Membros ({group.member_count})
          </h2>
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        <div className="space-y-2">
          {mockMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                  {member.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {member.role === "admin" ? "Administrador" : "Membro"}
                </p>
              </div>
              {member.role === "admin" && (
                <Badge variant="secondary">Admin</Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
