'use client'

import { motion } from 'framer-motion'
import { Trophy, Target, Star, Flame, Crown, Zap } from 'lucide-react'

const gamificationFeatures = [
  {
    icon: Trophy,
    title: 'Rankings e Leaderboards',
    description: 'Crie competição saudável com rankings semanais, mensais e all-time.',
  },
  {
    icon: Target,
    title: 'Missões Diárias',
    description: 'Tarefas personalizáveis que incentivam ações específicas na comunidade.',
  },
  {
    icon: Star,
    title: 'Sistema de Conquistas',
    description: 'Badges e troféus para marcos importantes que os usuários podem exibir.',
  },
  {
    icon: Flame,
    title: 'Streaks de Engajamento',
    description: 'Recompense usuários que mantêm atividade consistente na plataforma.',
  },
]

const leaderboardData = [
  { rank: 1, name: 'Maria S.', points: 15420, avatar: 'MS', badge: Crown },
  { rank: 2, name: 'João P.', points: 12350, avatar: 'JP', badge: null },
  { rank: 3, name: 'Ana C.', points: 11890, avatar: 'AC', badge: null },
  { rank: 4, name: 'Pedro M.', points: 9750, avatar: 'PM', badge: null },
  { rank: 5, name: 'Lucia R.', points: 8420, avatar: 'LR', badge: null },
]

export function GamificationSection() {
  return (
    <section id="gamification" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Leaderboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />

              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Ranking Semanal</h3>
                    <p className="text-sm text-muted-foreground">Top membros da comunidade</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="space-y-3">
                  {leaderboardData.map((user, index) => (
                    <motion.div
                      key={user.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 rounded-xl p-3 transition-colors ${
                        user.rank === 1 
                          ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20' 
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      {/* Rank */}
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        user.rank === 1 ? 'bg-primary text-primary-foreground' :
                        user.rank === 2 ? 'bg-muted-foreground/20 text-muted-foreground' :
                        user.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {user.rank}
                      </div>

                      {/* Avatar */}
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-white">
                          {user.avatar}
                        </div>
                        {user.badge && (
                          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500">
                            <user.badge className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">Nível {Math.floor(user.points / 1000)}</div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <div className="font-semibold text-primary">{user.points.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">pontos</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress */}
                <div className="mt-6 rounded-xl bg-muted/50 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sua posição: #23</span>
                    <span className="font-medium">4.250 pts</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Faltam 750 pontos para subir de nível!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Gamificação
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Transforme engajamento em{' '}
              <span className="gradient-text">vício saudável</span>
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Sistema completo de pontos, rankings e conquistas que mantém seus 
              usuários voltando todos os dias.
            </p>

            {/* Features */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {gamificationFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 flex gap-8">
              <div>
                <div className="flex items-center gap-1">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">+180%</span>
                </div>
                <span className="text-sm text-muted-foreground">de retenção</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Flame className="h-5 w-5 text-accent" />
                  <span className="text-2xl font-bold">3.2x</span>
                </div>
                <span className="text-sm text-muted-foreground">mais interações</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
