"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit2,
  LogOut,
  Settings,
  Shield,
  Bell,
  Moon,
  ChevronRight,
  Trophy,
  Star,
  Heart,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
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
import { cn } from "@/lib/utils"

// Mock user data
const mockUser = {
  id: "1",
  name: "João Silva",
  email: "joao@email.com",
  phone: "+55 11 99999-9999",
  bio: "Apaixonado por fitness e vida saudável. Buscando sempre evoluir!",
  avatar_url: null,
  location: "São Paulo, SP",
  created_at: "2025-01-15T10:00:00Z",
  stats: {
    points: 2450,
    rank: 12,
    posts_liked: 156,
    comments: 42,
    days_active: 89,
  },
  badges: [
    { id: "1", name: "Membro VIP", icon: "star", color: "gold" },
    { id: "2", name: "Top 20", icon: "trophy", color: "purple" },
    { id: "3", name: "Engajado", icon: "heart", color: "pink" },
  ],
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  color: string
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 text-center">
      <div
        className={cn(
          "h-10 w-10 rounded-full mx-auto mb-2 flex items-center justify-center",
          color
        )}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function EditProfileDialog({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState(mockUser.name)
  const [bio, setBio] = useState(mockUser.bio)
  const [phone, setPhone] = useState(mockUser.phone)
  const [location, setLocation] = useState(mockUser.location)
  const [open, setOpen] = useState(false)

  const handleSave = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações pessoais.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-primary to-accent text-white"
          >
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SettingsItem({
  icon: Icon,
  label,
  description,
  action,
  danger,
}: {
  icon: React.ElementType
  label: string
  description?: string
  action?: React.ReactNode
  danger?: boolean
}) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left",
        danger && "text-destructive"
      )}
    >
      <div
        className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
          danger ? "bg-destructive/10" : "bg-muted"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">{label}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action || <ChevronRight className="h-5 w-5 text-muted-foreground" />}
    </button>
  )
}

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case "star":
        return <Star className="h-3 w-3" />
      case "trophy":
        return <Trophy className="h-3 w-3" />
      case "heart":
        return <Heart className="h-3 w-3" />
      default:
        return <Star className="h-3 w-3" />
    }
  }

  const getBadgeColor = (color: string) => {
    switch (color) {
      case "gold":
        return "bg-amber-500 text-white"
      case "purple":
        return "bg-purple-500 text-white"
      case "pink":
        return "bg-pink-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 pb-20 relative">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Perfil</h1>
          <EditProfileDialog>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Edit2 className="h-5 w-5" />
            </Button>
          </EditProfileDialog>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="px-6 -mt-16 relative z-10">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
              <AvatarImage src={mockUser.avatar_url || undefined} />
              <AvatarFallback className="text-3xl bg-gradient-to-br from-primary/20 to-accent/20">
                {mockUser.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <h2 className="text-xl font-bold mt-4">{mockUser.name}</h2>
          <p className="text-muted-foreground text-sm">{mockUser.email}</p>

          {/* Badges */}
          <div className="flex gap-2 mt-3">
            {mockUser.badges.map((badge) => (
              <Badge
                key={badge.id}
                className={cn("gap-1", getBadgeColor(badge.color))}
              >
                {getBadgeIcon(badge.icon)}
                {badge.name}
              </Badge>
            ))}
          </div>

          {/* Bio */}
          {mockUser.bio && (
            <p className="text-sm text-center text-muted-foreground mt-4 max-w-sm">
              {mockUser.bio}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-4 gap-3">
          <StatCard
            icon={Trophy}
            label="Pontos"
            value={mockUser.stats.points.toLocaleString()}
            color="bg-amber-500"
          />
          <StatCard
            icon={Star}
            label="Ranking"
            value={`#${mockUser.stats.rank}`}
            color="bg-purple-500"
          />
          <StatCard
            icon={Heart}
            label="Curtidas"
            value={mockUser.stats.posts_liked}
            color="bg-pink-500"
          />
          <StatCard
            icon={MessageSquare}
            label="Comentários"
            value={mockUser.stats.comments}
            color="bg-blue-500"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 mt-6">
        <h3 className="font-semibold mb-3">Informações</h3>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{mockUser.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="font-medium">{mockUser.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Localização</p>
              <p className="font-medium">{mockUser.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-6 mt-6 mb-6">
        <h3 className="font-semibold mb-3">Configurações</h3>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <SettingsItem
            icon={Bell}
            label="Notificações"
            description="Receber alertas de atividades"
            action={
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            }
          />
          <Separator />
          <SettingsItem
            icon={Moon}
            label="Modo escuro"
            description="Alterar tema da interface"
            action={
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            }
          />
          <Separator />
          <SettingsItem
            icon={Shield}
            label="Privacidade"
            description="Gerenciar dados e permissões"
          />
          <Separator />
          <SettingsItem
            icon={Settings}
            label="Conta"
            description="Alterar senha e configurações"
          />
          <Separator />
          <SettingsItem icon={LogOut} label="Sair" danger />
        </div>
      </div>
    </div>
  )
}
