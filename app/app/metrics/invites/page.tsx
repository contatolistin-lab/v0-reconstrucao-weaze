"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Link2,
  Plus,
  Copy,
  Check,
  Users,
  LogIn,
  Eye,
  ExternalLink,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { cn } from "@/lib/utils"

interface InviteLink {
  id: string
  code: string
  label: string
  created_at: string
  visits: number
  signups: number
  logins: number
  active: boolean
}

const mockInvites: InviteLink[] = [
  {
    id: "i1",
    code: "convite-abc123",
    label: "Convite padrão",
    created_at: "2026-05-01T10:00:00Z",
    visits: 342,
    signups: 89,
    logins: 45,
    active: true,
  },
  {
    id: "i2",
    code: "promo-fitness",
    label: "Promoção maio",
    created_at: "2026-05-10T14:30:00Z",
    visits: 187,
    signups: 52,
    logins: 28,
    active: true,
  },
  {
    id: "i3",
    code: "indicacao-ana",
    label: "Indicação Personal Ana",
    created_at: "2026-05-15T09:00:00Z",
    visits: 94,
    signups: 31,
    logins: 19,
    active: true,
  },
  {
    id: "i4",
    code: "expirado-01",
    label: "Campanha antiga",
    created_at: "2026-03-01T08:00:00Z",
    visits: 521,
    signups: 145,
    logins: 67,
    active: false,
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function InvitesPage() {
  const [invites, setInvites] = useState(mockInvites)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newLabel, setNewLabel] = useState("")

  const handleCopy = (code: string) => {
    const url = `${window.location.origin}/invite/${code}`
    navigator.clipboard.writeText(url)
    setCopiedId(code)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCreate = () => {
    if (!newLabel.trim()) return
    const newInvite: InviteLink = {
      id: `i${Date.now()}`,
      code: `convite-${Math.random().toString(36).substring(2, 8)}`,
      label: newLabel,
      created_at: new Date().toISOString(),
      visits: 0,
      signups: 0,
      logins: 0,
      active: true,
    }
    setInvites((prev) => [newInvite, ...prev])
    setNewLabel("")
    setShowCreate(false)
  }

  const totalVisits = invites.reduce((sum, i) => sum + i.visits, 0)
  const totalSignups = invites.reduce((sum, i) => sum + i.signups, 0)
  const totalLogins = invites.reduce((sum, i) => sum + i.logins, 0)

  return (
    <div className="flex flex-col h-full bg-background p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Convites</h1>
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent text-white">
                <Plus className="h-4 w-4 mr-2" />
                Criar link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo link de convite</DialogTitle>
                <DialogDescription>
                  Crie um link personalizado para convidar novos membros.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <Label htmlFor="label">Identificação</Label>
                <Input
                  id="label"
                  placeholder="Ex: Campanha junho"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreate(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!newLabel.trim()}
                  className="bg-gradient-to-r from-primary to-accent text-white"
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Criar link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Visitas</p>
              <p className="text-xl font-bold">
                {totalVisits.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-sm text-muted-foreground">Cadastros</p>
              <p className="text-xl font-bold">
                {totalSignups.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <LogIn className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-sm text-muted-foreground">Logins</p>
              <p className="text-xl font-bold">
                {totalLogins.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Invite Links List */}
        <Card>
          <div className="divide-y divide-border">
            {invites.map((invite) => (
              <motion.div
                key={invite.id}
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm">
                        {invite.label}
                      </h3>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-1.5 py-0",
                          invite.active
                            ? "border-emerald-500/30 text-emerald-600"
                            : "border-gray-500/30 text-gray-600"
                        )}
                      >
                        {invite.active ? "Ativo" : "Expirado"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mb-2">
                      /invite/{invite.code}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Criado em {formatDate(invite.created_at)}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {invite.visits} visitas
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {invite.signups} cadastros
                      </span>
                      <span className="flex items-center gap-1">
                        <LogIn className="h-3 w-3" />
                        {invite.logins} logins
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleCopy(invite.code)}
                    >
                      {copiedId === invite.code ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        window.open(
                          `/invite/${invite.code}`,
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
