"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Bell,
  Shield,
  Eye,
  Moon,
  Sun,
  Trash2,
  Save,
  Smartphone,
  Mail,
  Key,
  Globe,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  delay?: number
}

function SettingsSection({ title, icon, children, delay = 0 }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </motion.div>
  )
}

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="space-y-0.5">
        <Label className="text-sm font-medium">{label}</Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const [name, setName] = useState("Lucas Almeida")
  const [email, setEmail] = useState("lucas@email.com")
  const [bio, setBio] = useState("Criador de conteúdo digital")
  const [phone, setPhone] = useState("(11) 99999-8888")

  const [pushEnabled, setPushEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [newMemberAlerts, setNewMemberAlerts] = useState(true)
  const [commentAlerts, setCommentAlerts] = useState(true)

  const [twoFactor, setTwoFactor] = useState(false)
  const [profilePublic, setProfilePublic] = useState(true)
  const [showEmail, setShowEmail] = useState(false)

  const [theme, setTheme] = useState<"light" | "dark">("light")

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      <div className="p-4 border-b border-border bg-card">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie suas preferências e segurança
        </p>
      </div>

      <div className="flex-1 p-4 max-w-2xl mx-auto w-full space-y-4">
        {/* Profile */}
        <SettingsSection title="Perfil" icon={<User className="h-5 w-5" />} delay={0}>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg">
                LA
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Alterar foto</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="pt-2">
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              <Save className="h-4 w-4 mr-2" />
              Salvar perfil
            </Button>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notificações" icon={<Bell className="h-5 w-5" />} delay={0.05}>
          <SettingsRow label="Notificações push" description="Receba alertas no navegador">
            <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="Notificações por email" description="Receba resumos por email">
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="Notificações SMS" description="Receba alertas via SMS">
            <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="Novos membros" description="Alertas de novas solicitações">
            <Switch checked={newMemberAlerts} onCheckedChange={setNewMemberAlerts} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="Comentários" description="Alertas de novos comentários">
            <Switch checked={commentAlerts} onCheckedChange={setCommentAlerts} />
          </SettingsRow>
        </SettingsSection>

        {/* Account */}
        <SettingsSection title="Conta" icon={<Shield className="h-5 w-5" />} delay={0.1}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Separator />
          <SettingsRow label="Autenticação em dois fatores" description="Adicione uma camada extra de segurança">
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </SettingsRow>
          <Separator />
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-muted-foreground" />
            <Button variant="outline" size="sm" className="ml-auto">
              Alterar senha
            </Button>
          </div>
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection title="Privacidade" icon={<Eye className="h-5 w-5" />} delay={0.15}>
          <SettingsRow label="Perfil público" description="Qualquer pessoa pode ver seu perfil">
            <Switch checked={profilePublic} onCheckedChange={setProfilePublic} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="Exibir email" description="Mostrar email no perfil público">
            <Switch checked={showEmail} onCheckedChange={setShowEmail} />
          </SettingsRow>
        </SettingsSection>

        {/* Theme */}
        <SettingsSection title="Aparência" icon={<Globe className="h-5 w-5" />} delay={0.2}>
          <SettingsRow
            label="Tema"
            description="Alternar entre tema claro e escuro"
          >
            <div className="flex items-center gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4 mr-1" />
                Claro
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4 mr-1" />
                Escuro
              </Button>
            </div>
          </SettingsRow>
        </SettingsSection>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive text-lg">
                <AlertTriangle className="h-5 w-5" />
                Zona de perigo
              </CardTitle>
              <CardDescription>
                Ações irreversíveis. Tenha cuidado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir conta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Excluir conta</DialogTitle>
                    <DialogDescription>
                      Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                      Digite <strong>EXCLUIR</strong> para confirmar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Input
                      placeholder="Digite EXCLUIR para confirmar"
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={deleteConfirm !== "EXCLUIR"}
                    >
                      Confirmar exclusão
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>

        <div className="h-8" />
      </div>
    </div>
  )
}
