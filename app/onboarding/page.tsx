"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Rocket,
  ArrowRight,
  ArrowLeft,
  Check,
  SkipForward,
  Sparkles,
  Image,
  Palette,
  MessageSquare,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface OnboardingData {
  name: string
  slug: string
  logo_url: string
  primary_color: string
  secondary_color: string
  welcome_title: string
  welcome_content: string
}

const steps = [
  { id: "welcome", title: "Boas-vindas", icon: Rocket },
  { id: "brand", title: "Marca", icon: Image },
  { id: "customize", title: "Personalizar", icon: Palette },
  { id: "content", title: "Conteúdo", icon: MessageSquare },
  { id: "done", title: "Concluído", icon: CheckCircle2 },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    name: "",
    slug: "",
    logo_url: "",
    primary_color: "#7c3aed",
    secondary_color: "#f59e0b",
    welcome_title: "Bem-vindo à nossa comunidade!",
    welcome_content:
      "Estamos muito felizes em ter você aqui. Este é o lugar ideal para compartilhar experiências, tirar dúvidas e evoluir junto com a gente!",
  })

  const update = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }))
  }

  const next = () => {
    if (step < steps.length - 1) {
      setDirection(1)
      setStep((s) => s + 1)
    }
  }

  const prev = () => {
    if (step > 0) {
      setDirection(-1)
      setStep((s) => s - 1)
    }
  }

  const skip = () => {
    router.push("/app")
  }

  const finish = () => {
    localStorage.setItem("onboarding_complete", "true")
    router.push("/app")
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return true
      case 1:
        return data.name.trim().length > 0 && data.slug.trim().length > 0
      case 2:
        return true
      case 3:
        return data.welcome_title.trim().length > 0
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                    i < step
                      ? "bg-primary text-white"
                      : i === step
                        ? "bg-primary/20 text-primary ring-2 ring-primary/40"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {i < step ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <s.icon className="h-4 w-4" />
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-8 mx-1 transition-colors duration-300",
                      i < step ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Passo {step + 1} de {steps.length}
          </p>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Card className="p-6 md:p-8">
              {step === 0 && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                      <Rocket className="h-10 w-10 text-white" />
                    </div>
                  </motion.div>
                  <h1 className="text-2xl font-bold mb-2">
                    Crie sua comunidade
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    Em poucos passos você terá sua comunidade no Weaze pronta
                    para receber membros.
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { icon: Image, label: "Sua marca" },
                      { icon: Palette, label: "Cores" },
                      { icon: MessageSquare, label: "Conteúdo" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-accent/50"
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold mb-1">Informações da marca</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Defina o nome e identificador da sua comunidade.
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome da comunidade</Label>
                      <Input
                        id="name"
                        placeholder="Ex: Academia Fitness"
                        value={data.name}
                        onChange={(e) => update({ name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug (URL)</Label>
                      <Input
                        id="slug"
                        placeholder="academia-fitness"
                        value={data.slug}
                        onChange={(e) =>
                          update({
                            slug: e.target.value
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^a-z0-9-]/g, ""),
                          })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        weaze.com/c/{data.slug || "sua-comunidade"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logo">URL da logo (opcional)</Label>
                      <Input
                        id="logo"
                        placeholder="https://..."
                        value={data.logo_url}
                        onChange={(e) => update({ logo_url: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-1">Personalize</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Escolha as cores da sua comunidade.
                  </p>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Cor primária</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={data.primary_color}
                          onChange={(e) =>
                            update({ primary_color: e.target.value })
                          }
                          className="h-10 w-10 rounded-md border border-border cursor-pointer"
                        />
                        <span className="text-sm text-muted-foreground">
                          {data.primary_color}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Cor secundária</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={data.secondary_color}
                          onChange={(e) =>
                            update({ secondary_color: e.target.value })
                          }
                          className="h-10 w-10 rounded-md border border-border cursor-pointer"
                        />
                        <span className="text-sm text-muted-foreground">
                          {data.secondary_color}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <p className="text-sm text-muted-foreground mb-2">
                        Prévia
                      </p>
                      <div
                        className="h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{
                          background: `linear-gradient(to right, ${data.primary_color}, ${data.secondary_color})`,
                        }}
                      >
                        {data.name || "Sua Comunidade"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold mb-1">Primeiro conteúdo</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Crie uma postagem de boas-vindas para seus futuros membros.
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="welcome_title">Título</Label>
                      <Input
                        id="welcome_title"
                        placeholder="Bem-vindo à nossa comunidade!"
                        value={data.welcome_title}
                        onChange={(e) =>
                          update({ welcome_title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="welcome_content">Mensagem</Label>
                      <Textarea
                        id="welcome_content"
                        placeholder="Escreva sua mensagem de boas-vindas..."
                        rows={5}
                        value={data.welcome_content}
                        onChange={(e) =>
                          update({ welcome_content: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>
                  </motion.div>
                  <h1 className="text-2xl font-bold mb-2">
                    Tudo pronto! 🎉
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    Sua comunidade está configurada. Vamos começar!
                  </p>
                  <div className="space-y-2 mb-6">
                    {[
                      { label: "Comunidade", value: data.name },
                      { label: "Slug", value: data.slug },
                      { label: "Post de boas-vindas", value: data.welcome_title },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-3 rounded-xl bg-accent/50 text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <div>
                  {step > 0 ? (
                    <Button variant="ghost" onClick={prev}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Voltar
                    </Button>
                  ) : (
                    <Button variant="ghost" onClick={skip}>
                      <SkipForward className="h-4 w-4 mr-2" />
                      Pular
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {step < steps.length - 1 ? (
                    <Button
                      onClick={next}
                      disabled={!canProceed()}
                      className="bg-gradient-to-r from-primary to-accent text-white"
                    >
                      Próximo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={finish}
                      className="bg-gradient-to-r from-primary to-accent text-white"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Começar!
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
