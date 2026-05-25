"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ShieldOff,
  Mail,
  ArrowLeft,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const supportContact = {
  email: "suporte@weaze.com",
  whatsapp: "+5511999999999",
}

export default function BlockedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="mb-6"
          >
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <ShieldOff className="h-10 w-10 text-destructive" />
            </div>
          </motion.div>

          <h1 className="text-2xl font-bold mb-3">Acesso bloqueado</h1>

          <p className="text-muted-foreground mb-6">
            Entre em contato com o administrador da comunidade para mais
            informações.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{supportContact.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50 text-sm">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {supportContact.whatsapp}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Button>
        </Card>
      </motion.div>
    </div>
  )
}
