"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  Plus,
  Users,
  Check,
  ChevronRight,
  Globe,
  Lock,
  Star,
  CreditCard,
  Zap,
  MoreVertical,
  Settings,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type CommunityPlan = "free" | "pro" | "enterprise"

interface Community {
  id: string
  name: string
  slug: string
  description: string
  plan: CommunityPlan
  member_count: number
  logo_url: string | null
  is_active: boolean
}

const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Academia FitLife",
    slug: "fitlife",
    description: "Comunidade de alunos e ex-alunos da Academia FitLife",
    plan: "pro",
    member_count: 234,
    logo_url: null,
    is_active: true,
  },
  {
    id: "2",
    name: "Curso Marketing PRO",
    slug: "marketing-pro",
    description: "Alunos do curso avançado de marketing digital",
    plan: "enterprise",
    member_count: 89,
    logo_url: null,
    is_active: false,
  },
  {
    id: "3",
    name: "Comunidade Bem-Estar",
    slug: "bem-estar",
    description: "Grupo focado em saúde e bem-estar",
    plan: "free",
    member_count: 512,
    logo_url: null,
    is_active: false,
  },
]

const planConfig: Record<CommunityPlan, { label: string; icon: React.ReactNode; color: string }> = {
  free: {
    label: "Grátis",
    icon: <Zap className="h-3.5 w-3.5" />,
    color: "text-muted-foreground border-muted-foreground/30",
  },
  pro: {
    label: "Pro",
    icon: <Star className="h-3.5 w-3.5" />,
    color: "text-primary border-primary/30",
  },
  enterprise: {
    label: "Enterprise",
    icon: <Building2 className="h-3.5 w-3.5" />,
    color: "text-purple-500 border-purple-500/30",
  },
}

function CreateCommunityDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [plan, setPlan] = useState<CommunityPlan>("free")

  const handleCreate = () => {
    // Would create via API
    setOpen(false)
    setName("")
    setSlug("")
    setDescription("")
    setPlan("free")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar nova marca</DialogTitle>
          <DialogDescription>
            Crie uma nova comunidade ou marca para gerenciar
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="comm-name">Nome da marca</Label>
            <Input id="comm-name" placeholder="Ex: Minha Marca" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comm-slug">Slug</Label>
            <Input id="comm-slug" placeholder="minha-marca" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comm-desc">Descrição</Label>
            <Input id="comm-desc" placeholder="Breve descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Plano</Label>
            <Select value={plan} onValueChange={(v) => setPlan(v as CommunityPlan)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Grátis</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreate} disabled={!name.trim() || !slug.trim()} className="bg-gradient-to-r from-primary to-accent text-white">
            Criar marca
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function CommunityCard({
  community,
  isSelected,
  onSelect,
}: {
  community: Community
  isSelected: boolean
  onSelect: (id: string) => void
}) {
  const plan = planConfig[community.plan]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-card border rounded-2xl p-4 hover:shadow-md transition-all cursor-pointer",
        isSelected
          ? "border-primary ring-1 ring-primary bg-primary/5"
          : "border-border"
      )}
      onClick={() => onSelect(community.id)}
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 rounded-xl">
          <AvatarImage src={community.logo_url || undefined} />
          <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary to-accent text-white text-lg font-bold">
            {community.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate">{community.name}</h3>
            {isSelected && (
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate mt-0.5">
            /{community.slug}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
            {community.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className={cn("text-xs gap-1", plan.color)}>
              {plan.icon}
              {plan.label}
            </Badge>
            <Badge variant="secondary" className="text-xs gap-1">
              <Users className="h-3 w-3" />
              {community.member_count} membros
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {community.is_active && (
            <Badge variant="default" className="text-xs bg-green-500/10 text-green-600 border-green-500/30">
              Ativo
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState(mockCommunities)
  const [selectedId, setSelectedId] = useState<string | null>("1")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCommunities = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setCommunities((prev) =>
      prev.map((c) => ({ ...c, is_active: c.id === id }))
    )
  }

  const selected = communities.find((c) => c.id === selectedId)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Marcas</h1>
            <Badge className="bg-primary text-white">{communities.length}</Badge>
          </div>
          <CreateCommunityDialog>
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              <Plus className="h-4 w-4 mr-2" />
              Criar marca
            </Button>
          </CreateCommunityDialog>
        </div>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar marcas..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Communities List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredCommunities.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Nenhuma marca encontrada</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Tente uma busca diferente"
                : "Crie sua primeira marca para começar"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                isSelected={community.id === selectedId}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}

        {/* Selected Community Info */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <Check className="h-5 w-5 text-primary" />
              <span className="font-semibold">{selected.name} selecionada</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Você está gerenciando a marca <strong>{selected.name}</strong>.
              Todas as ações serão aplicadas a esta comunidade.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Button size="sm" variant="outline" className="text-xs">
                Ir para o dashboard
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
