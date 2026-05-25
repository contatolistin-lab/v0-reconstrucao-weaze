'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Novo: Feed com IA integrada</span>
            </motion.div>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Crie comunidades{' '}
              <span className="gradient-text">engajadas</span>{' '}
              para sua marca
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
              Plataforma white-label completa com feed estilo TikTok, gamificação, 
              grupos e eventos. Tudo com a identidade visual da sua marca.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-8 lg:justify-start">
              {[
                { value: '+300%', label: 'de engajamento' },
                { value: '50k+', label: 'usuários ativos' },
                { value: '4.9', label: 'avaliação média' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" className="gradient-bg text-white hover:opacity-90" asChild>
                <Link href="/signup">
                  Começar Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <Link href="#demo">
                  <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Ver Demonstração
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl" />
              
              {/* Phone frame */}
              <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-foreground/10 bg-background shadow-2xl">
                {/* Screen */}
                <div className="aspect-[9/19] bg-gradient-to-b from-primary/5 to-accent/5">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 py-3">
                    <span className="text-xs font-medium">9:41</span>
                    <div className="flex gap-1">
                      <div className="h-1.5 w-4 rounded-full bg-foreground/40" />
                      <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                      <div className="h-1.5 w-3 rounded-full bg-foreground/40" />
                    </div>
                  </div>

                  {/* Feed preview */}
                  <div className="space-y-3 p-4">
                    {/* Video card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent aspect-[4/5]">
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <div className="flex items-end justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-white/20" />
                              <span className="text-sm font-medium text-white">@marca</span>
                            </div>
                            <p className="text-xs text-white/80 line-clamp-2">
                              Descubra como transformar seu negócio...
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex flex-col items-center">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                <div className="h-5 w-5 rounded-sm bg-white" />
                              </div>
                              <span className="mt-1 text-xs text-white">2.4k</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                <div className="h-4 w-4 rounded-full border-2 border-white" />
                              </div>
                              <span className="mt-1 text-xs text-white">148</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="rounded-xl bg-accent p-3 text-center">
                      <span className="text-sm font-medium text-accent-foreground">
                        Agendar Consultoria
                      </span>
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
