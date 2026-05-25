"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Plus,
  Users,
  Clock,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
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
import { cn } from "@/lib/utils"

type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string | null
  registrations: number
  max_registrations: number | null
  status: EventStatus
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Workshop de Marketing Digital",
    description: "Aprenda estratégias avançadas de marketing digital para alavancar seu negócio.",
    date: "2026-06-15",
    time: "19:00",
    location: "Online",
    registrations: 45,
    max_registrations: 100,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Live de Lançamento",
    description: "Lançamento oficial da nova plataforma com convidados especiais.",
    date: "2026-06-10",
    time: "20:00",
    location: "YouTube",
    registrations: 128,
    max_registrations: null,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Encontro Presencial 2026",
    description: "Encontro anual da comunidade com networking e palestras.",
    date: "2026-05-25",
    time: "09:00",
    location: "São Paulo, SP",
    registrations: 78,
    max_registrations: 80,
    status: "ongoing",
  },
  {
    id: "4",
    title: "Webinar: Tendências 2026",
    description: "Palestra sobre as principais tendências do mercado para o próximo ano.",
    date: "2026-05-20",
    time: "15:00",
    location: "Zoom",
    registrations: 92,
    max_registrations: 200,
    status: "completed",
  },
  {
    id: "5",
    title: "Curso Intensivo de Vendas",
    description: "Curso de 3 dias sobre técnicas avançadas de vendas.",
    date: "2026-05-10",
    time: "08:00",
    location: "Auditório Principal",
    registrations: 35,
    max_registrations: 50,
    status: "cancelled",
  },
]

const statusConfig: Record<EventStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  upcoming: { label: "Agendado", variant: "outline" },
  ongoing: { label: "Acontecendo", variant: "default" },
  completed: { label: "Concluído", variant: "secondary" },
  cancelled: { label: "Cancelado", variant: "destructive" },
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T12:00:00")
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
}

function EventCard({ event }: { event: Event }) {
  const status = statusConfig[event.status]
  const registrationPercent = event.max_registrations
    ? Math.round((event.registrations / event.max_registrations) * 100)
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <Badge variant={status.variant}>{status.label}</Badge>
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

      <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {event.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(event.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {event.time}
        </span>
        {event.location && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {event.location}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {event.registrations}
            {event.max_registrations && ` / ${event.max_registrations}`}
          </span>
          {registrationPercent !== null && (
            <span className="text-xs text-muted-foreground">
              ({registrationPercent}%)
            </span>
          )}
        </div>
        {event.status === "upcoming" && (
          <Button size="sm" variant="outline" className="text-xs">
            Ver inscrições
          </Button>
        )}
      </div>
    </motion.div>
  )
}

function CreateEventDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [maxRegistrations, setMaxRegistrations] = useState("")

  const handleCreate = () => {
    // Would create via API
    setOpen(false)
    setTitle("")
    setDescription("")
    setDate("")
    setTime("")
    setLocation("")
    setMaxRegistrations("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar evento</DialogTitle>
          <DialogDescription>
            Crie um evento para sua comunidade
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">Título</Label>
            <Input id="event-title" placeholder="Nome do evento" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-desc">Descrição</Label>
            <Textarea id="event-desc" placeholder="Descreva o evento..." rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="event-date">Data</Label>
              <Input id="event-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-time">Horário</Label>
              <Input id="event-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-location">Local</Label>
            <Input id="event-location" placeholder="Online ou endereço" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-max">Vagas máximas (opcional)</Label>
            <Input id="event-max" type="number" placeholder="Sem limite" value={maxRegistrations} onChange={(e) => setMaxRegistrations(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreate} disabled={!title.trim() || !date} className="bg-gradient-to-r from-primary to-accent text-white">
            Criar evento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function EventsPage() {
  const [events] = useState(mockEvents)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Eventos</h1>
          <CreateEventDialog>
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              <Plus className="h-4 w-4 mr-2" />
              Criar evento
            </Button>
          </CreateEventDialog>
        </div>
        <p className="text-sm text-muted-foreground">
          Gerencie os eventos da sua comunidade
        </p>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-4">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Nenhum evento</h3>
            <p className="text-muted-foreground">
              Crie seu primeiro evento para começar
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
