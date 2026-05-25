"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Clock,
  XCircle,
  Mail,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function WaitingPage() {
  const router = useRouter()
  const [cancelling, setCancelling] = useState(false)

  const handleCancel = () => {
    setCancelling(true)
    setTimeout(() => {
      setCancelling(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center">
          {/* Animated Hourglass */}
          <motion.div
            animate={{
              rotate: [0, -10, 0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="mb-6"
          >
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
              <Clock className="h-10 w-10 text-primary" />
            </div>
          </motion.div>

          <h1 className="text-2xl font-bold mb-3">
            Sua solicitação está sendo analisada
          </h1>

          <p className="text-muted-foreground mb-6">
            Você receberá uma notificação quando for aprovado. Esse processo
            pode levar alguns dias.
          </p>

          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-accent/50 mb-6 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            Fique de olho no seu e-mail e notificações
          </div>

          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                    </motion.div>
                    Cancelando...
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancelar solicitação
                  </>
                )}
              </Button>
            </motion.div>

            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
