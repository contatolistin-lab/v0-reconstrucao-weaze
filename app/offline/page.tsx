"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  WifiOff,
  RefreshCw,
  CloudOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function OfflinePage() {
  const [retrying, setRetrying] = useState(false)

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => {
      window.location.reload()
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
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="mb-6"
          >
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto">
              <WifiOff className="h-10 w-10 text-muted-foreground" />
            </div>
          </motion.div>

          <h1 className="text-2xl font-bold mb-3">Você está offline</h1>

          <p className="text-muted-foreground mb-6">
            Verifique sua conexão com a internet e tente novamente.
          </p>

          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-accent/50 mb-6 text-sm text-muted-foreground">
            <CloudOff className="h-4 w-4" />
            Alguns recursos podem estar indisponíveis
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent text-white"
              onClick={handleRetry}
              disabled={retrying}
            >
              {retrying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                  </motion.div>
                  Tentando reconectar...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tentar novamente
                </>
              )}
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
