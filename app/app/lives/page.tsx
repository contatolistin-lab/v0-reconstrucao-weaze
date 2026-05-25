"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Radio,
  Plus,
  Calendar,
  Clock,
  Play,
  Square,
  Eye,
  Users,
  MoreVertical,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type LiveStatus = "live" | "scheduled" | "past"

interface LiveStream {
  id: string
  title: string
  description: string
  url: string
  status: LiveStatus
  scheduled_date: string | null
  scheduled_time: string | null
  started_at: string | null
  ended_at: string | null
  viewers: number
  max_viewers: number
}

const mockLives: LiveStream[] = [
  {
    id: "1",
    title: "Live Semanal - Dicas de Marketing",
    description: "Toda semana dicas exclusivas para sua estratégia digital.",
    url: "https://youtube.com/watch?v=abc123",
    status: "live",
    scheduled_date: null,
    scheduled_time: null,
    started_at: "2026-05-25T10:00:00Z",
    ended_at: null,
    viewers: 234,
    max_viewers: 0,
  },
  {
    id: "2",
    title: "Lançamento do Novo Curso",
    description: "Apresentação oficial do curso completo de vendas.",
    url: "https://youtube.com/watch?v=def456",
    status: "scheduled",
    scheduled_date: "2026-06-01",
    scheduled_time: "19:00",
    started_at: null,
    ended_at: null,
    viewers: 0,
    max_viewers: 0,
  },
  {
    id: "3",
    title: "Entrevista com Convidado Especial",
    description: "Bate-papo com profissionais referência no mercado.",
    url: "https://youtube.com/watch?v=ghi789",
    status: "scheduled",
    scheduled_date: "2026-06-10",
    scheduled_time: "20:30",
    started_at: null,
    ended_at: null,
    viewers: 0,
    max_viewers: 0,
  },
  {
    id: "4",
    title: "Live de Encerramento do Mês",
    description: "Revisão dos resultados e novidades para o próximo mês.",
    url: "https://youtube.com/watch?v=jkl012",
    status: "past",
    scheduled_date: "2026-05-20",
    scheduled_time: "19:00",
    started_at: "2026-05-20T19:00:00Z",
    ended_at: "2026-05-20T20:30:00Z",
    viewers: 156,
    max_viewers: 200,
  },
  {
    id: "5",
    title: "Workshop ao Vivo: SEO",
    description: "Aprenda técnicas de SEO para rankear melhor no Google.",
    url: "https://youtube.com/watch?v=mno345",
    status: "past",
    scheduled_date: "2026-05-15",
    scheduled_time: "15:00",
    started_at: "2026-05-15T15:00:00Z",
    ended_at: "2026-05-15T16:45:00Z",
    viewers: 89,
    max_viewers: 150,
  },
]

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T12:00:00")
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
}

function LiveCard({
  live,
  onStart,
  onEnd,
}: {
  live: LiveStream
  onStart: (id: string) => void
  onEnd: (id: string) => void
}) {
  const isLive = live.status === "live"
  const isScheduled = live.status === "scheduled"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-card border rounded-2xl p-4 hover:shadow-md transition-shadow",
        isLive ? "border-red-500/50 bg-red-500/5" : "border-border"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0",
          isLive ? "bg-red-500/20" : "bg-muted"
        )}>
          <Radio className={cn("h-6 w-6", isLive ? "text-red-500" : "text-muted-foreground")} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold truncate">{live.title}</h3>
            {isLive && (
              <Badge className="bg-red-500 text-white gap-1 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-white" />
                AO VIVO
              </Badge>
            )}
            {isScheduled && (
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                Agendada
              </Badge>
            )}
            {live.status === "past" && (
              <Badge variant="secondary">Encerrada</Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {live.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {isLive && (
              <span className="flex items-center gap-1 text-red-500 font-medium">
                <Eye className="h-3.5 w-3.5" />
                {live.viewers} assistindo
              </span>
            )}
            {isScheduled && live.scheduled_date && (
              <>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(live.scheduled_date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {live.scheduled_time}
                </span>
              </>
            )}
            {live.status === "past" && (
              <>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {live.viewers} espectadores
                </span>
                {live.ended_at && (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    Concluída
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isLive && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onEnd(live.id)}
            >
              <Square className="h-4 w-4 mr-1" />
              Encerrar
            </Button>
          )}
          {isScheduled && (
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent text-white"
              onClick={() => onStart(live.id)}
            >
              <Play className="h-4 w-4 mr-1" />
              Iniciar
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  )
}

function CreateLiveDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")

  const handleCreate = () => {
    // Would create via API
    setOpen(false)
    setTitle("")
    setDescription("")
    setUrl("")
    setScheduledDate("")
    setScheduledTime("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agendar live</DialogTitle>
          <DialogDescription>
            Configure sua transmissão ao vivo
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="live-title">Título</Label>
            <Input id="live-title" placeholder="Título da live" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="live-desc">Descrição</Label>
            <Textarea id="live-desc" placeholder="Descreva sua live..." rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="live-url">URL da transmissão</Label>
            <Input id="live-url" placeholder="https://youtube.com/watch?v=..." value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="live-date">Data</Label>
              <Input id="live-date" type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="live-time">Horário</Label>
              <Input id="live-time" type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreate} disabled={!title.trim() || !url.trim()} className="bg-gradient-to-r from-primary to-accent text-white">
            Agendar live
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function LivesPage() {
  const [lives, setLives] = useState(mockLives)
  const [filter, setFilter] = useState<"all" | "live" | "scheduled" | "past">("all")

  const currentLive = lives.find((l) => l.status === "live")
  const filteredLives = filter === "all" ? lives : lives.filter((l) => l.status === filter)

  const handleStart = (id: string) => {
    setLives((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: "live" as LiveStatus, started_at: new Date().toISOString() }
          : l
      )
    )
  }

  const handleEnd = (id: string) => {
    setLives((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: "past" as LiveStatus, ended_at: new Date().toISOString() }
          : l
      )
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Lives</h1>
            {currentLive && (
              <Badge className="bg-red-500 text-white gap-1 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-white" />
                AO VIVO
              </Badge>
            )}
          </div>
          <CreateLiveDialog>
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              <Plus className="h-4 w-4 mr-2" />
              Agendar live
            </Button>
          </CreateLiveDialog>
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "live" | "scheduled" | "past")}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="live" className="gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Ao vivo
            </TabsTrigger>
            <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
            <TabsTrigger value="past">Encerradas</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Lives List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredLives.length === 0 ? (
          <div className="text-center py-12">
            <Radio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Nenhuma live encontrada</h3>
            <p className="text-muted-foreground">
              {filter === "live"
                ? "Nenhuma transmissão ao vivo no momento"
                : "Agende sua primeira live"}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {filteredLives.map((live) => (
                <LiveCard
                  key={live.id}
                  live={live}
                  onStart={handleStart}
                  onEnd={handleEnd}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
