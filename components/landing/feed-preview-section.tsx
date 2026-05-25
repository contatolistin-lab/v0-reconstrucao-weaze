'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  ShoppingBag, 
  Calendar,
  ExternalLink,
  FileText
} from 'lucide-react'

const ctaTypes = [
  { icon: ShoppingBag, label: 'Comprar', color: 'bg-green-500' },
  { icon: Calendar, label: 'Agendar', color: 'bg-blue-500' },
  { icon: ExternalLink, label: 'Link', color: 'bg-orange-500' },
  { icon: FileText, label: 'Formulário', color: 'bg-purple-500' },
]

export function FeedPreviewSection() {
  return (
    <section id="feed" className="relative overflow-hidden py-20 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Feed Vertical
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Experiência TikTok para{' '}
              <span className="gradient-text">sua marca</span>
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Vídeos em fullscreen com scroll snap para uma experiência imersiva. 
              Cada post pode ter CTAs personalizados que convertem.
            </p>

            {/* CTA Types */}
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                TIPOS DE CTA DISPONÍVEIS
              </h3>
              <div className="flex flex-wrap gap-3">
                {ctaTypes.map((cta) => (
                  <div
                    key={cta.label}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
                  >
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full ${cta.color}`}>
                      <cta.icon className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">{cta.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features list */}
            <ul className="mt-8 space-y-3">
              {[
                'Scroll infinito com carregamento inteligente',
                'Suporte a vídeo, imagem e carrossel',
                'Algoritmo de recomendação personalizável',
                'Moderação automática com IA',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-xs"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />

              {/* Phone */}
              <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-foreground/10 bg-foreground/5 shadow-2xl">
                <div className="aspect-[9/19] bg-gradient-to-b from-primary to-accent">
                  {/* Video content simulation */}
                  <div className="relative h-full">
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      {/* User info */}
                      <div className="mb-3 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/20" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">@empreenda</span>
                            <span className="rounded bg-white/20 px-1.5 py-0.5 text-xs text-white">PRO</span>
                          </div>
                          <span className="text-xs text-white/70">há 2 horas</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-4 text-sm text-white/90 line-clamp-3">
                        5 estratégias que usamos para crescer 300% em 6 meses. 
                        A terceira vai te surpreender...
                      </p>

                      {/* CTA Button */}
                      <button className="mb-4 w-full rounded-xl bg-white py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]">
                        Agendar Mentoria Grátis
                      </button>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <button className="flex items-center gap-1.5 text-white/90">
                            <Heart className="h-5 w-5" />
                            <span className="text-xs">2.4k</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-white/90">
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-xs">148</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-white/90">
                            <Share2 className="h-5 w-5" />
                          </button>
                        </div>
                        <button className="text-white/90">
                          <Bookmark className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Right side actions */}
                    <div className="absolute right-4 bottom-40 flex flex-col items-center gap-6">
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                          <Heart className="h-6 w-6 text-white" />
                        </div>
                        <span className="mt-1 text-xs text-white">2.4k</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <span className="mt-1 text-xs text-white">148</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                          <Bookmark className="h-6 w-6 text-white" />
                        </div>
                        <span className="mt-1 text-xs text-white">Salvar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
