"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Gift,
  CheckCircle,
  UserPlus,
  LogIn,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InviteData {
  community_name: string
  community_logo: string | null
  inviter_name: string
  community_slug: string
}

const mockInvite: Record<string, InviteData> = {
  "convite-abc123": {
    community_name: "Academia Fitness",
    community_logo: null,
    inviter_name: "Personal Ana",
    community_slug: "academia-fitness",
  },
}

export default function InvitePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const invite = mockInvite[slug]
  const isLoggedIn = false

  useEffect(() => {
    if (invite) {
      localStorage.setItem("pending_tenant", invite.community_slug)

      try {
        console.log("[Track] invite_event:", {
          invite_slug: slug,
          community: invite.community_name,
          action: "viewed",
          timestamp: new Date().toISOString(),
        })
      } catch {}
    }
  }, [invite, slug])

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Convite não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            Este convite é inválido ou já expirou.
          </p>
          <Button onClick={() => router.push("/")}>Voltar ao início</Button>
        </Card>
      </div>
    )
  }

  const handleAccept = () => {
    try {
      console.log("[Track] invite_event:", {
        invite_slug: slug,
        community: invite.community_name,
        action: "accepted",
        timestamp: new Date().toISOString(),
      })
    } catch {}

    if (isLoggedIn) {
      router.push(`/app?tenant=${invite.community_slug}`)
    } else {
      router.push(`/signup?invite=${slug}`)
    }
  }

  const handleLogin = () => {
    router.push(`/login?redirect=/invite/${slug}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Avatar className="h-16 w-16 mx-auto mb-4 ring-2 ring-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl">
                {invite.community_name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              <Gift className="h-3 w-3 mr-1" />
              Convite
            </Badge>

            <h1 className="text-2xl font-bold mb-2">
              Você foi convidado!
            </h1>
            <p className="text-muted-foreground mb-6">
              <span className="font-medium text-foreground">
                {invite.inviter_name}
              </span>{" "}
              te convidou para participar de{" "}
              <span className="font-medium text-foreground">
                {invite.community_name}
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent text-white"
              onClick={handleAccept}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isLoggedIn ? "Aceitar Convite" : "Criar conta e participar"}
            </Button>

            {!isLoggedIn && (
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleLogin}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Fazer login
              </Button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
