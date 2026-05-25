'use client'

import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Users, 
  Calendar, 
  MessageCircle, 
  Trophy, 
  Palette,
  Zap,
  Shield
} from 'lucide-react'

const features = [
  {
    icon: Smartphone,
    title: 'Feed Estilo TikTok',
    description: 'Vídeos verticais em fullscreen com scroll infinito. Seus usuários vão passar horas engajados.',
  },
  {
    icon: Trophy,
    title: 'Gamificação Completa',
    description: 'Pontos, rankings, conquistas e missões. Transforme interações em uma experiência viciante.',
  },
  {
    icon: Users,
    title: 'Grupos e Comunidades',
    description: 'Crie espaços exclusivos para diferentes segmentos do seu público com moderação inteligente.',
  },
  {
    icon: Calendar,
    title: 'Eventos e Agendamentos',
    description: 'Lives, workshops e consultorias integradas. Venda ingressos e gerencie participantes.',
  },
  {
    icon: MessageCircle,
    title: 'Mensagens em Tempo Real',
    description: 'Chat privado e em grupo com suporte a mídia, áudio e reações. Conexão instantânea.',
  },
  {
    icon: Palette,
    title: '100% White-Label',
    description: 'Cores, logo, domínio personalizado. Seus usuários nunca saberão que não foi você quem construiu.',
  },
  {
    icon: Zap,
    title: 'CTAs Inteligentes',
    description: 'Botões de ação em cada conteúdo: links, vendas, agendamentos, formulários e mais.',
  },
  {
    icon: Shield,
    title: 'Administração Completa',
    description: 'Painel poderoso para gerenciar usuários, conteúdo, métricas e monetização.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Recursos
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Tudo que você precisa em{' '}
              <span className="gradient-text">uma plataforma</span>
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Construímos cada funcionalidade pensando em maximizar o engajamento 
              e facilitar a monetização da sua comunidade.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
