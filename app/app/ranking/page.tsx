"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Award,
  Crown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface RankedUser {
  id: string
  name: string
  avatar: string | null
  points: number
  badge: string | null
  is_current_user: boolean
}

const monthlyRanking: RankedUser[] = [
  { id: "1", name: "Maria Silva", avatar: null, points: 2840, badge: "🔥 Streak 30 dias", is_current_user: false },
  { id: "2", name: "João Santos", avatar: null, points: 2150, badge: "💬 Top comentarista", is_current_user: false },
  { id: "3", name: "Ana Costa", avatar: null, points: 1890, badge: "📸 Mais posts", is_current_user: false },
  { id: "4", name: "Pedro Lima", avatar: null, points: 1520, badge: null, is_current_user: false },
  { id: "5", name: "Carla Souza", avatar: null, points: 1340, badge: "❤️ Mais curtidas", is_current_user: false },
  { id: "6", name: "Ricardo Oliveira", avatar: null, points: 1120, badge: null, is_current_user: false },
  { id: "7", name: "Fernanda Lima", avatar: null, points: 980, badge: null, is_current_user: false },
  { id: "8", name: "Lucas Almeida", avatar: null, points: 850, badge: null, is_current_user: true },
  { id: "9", name: "Patrícia Rocha", avatar: null, points: 720, badge: null, is_current_user: false },
  { id: "10", name: "Gustavo Nunes", avatar: null, points: 610, badge: null, is_current_user: false },
]

const yearlyRanking: RankedUser[] = [
  { id: "1", name: "João Santos", avatar: null, points: 12450, badge: "🏆 Campeão anual", is_current_user: false },
  { id: "2", name: "Maria Silva", avatar: null, points: 11200, badge: "🥈 Vice-campeã", is_current_user: false },
  { id: "3", name: "Ana Costa", avatar: null, points: 9870, badge: "🥉 Terceiro lugar", is_current_user: false },
  { id: "4", name: "Pedro Lima", avatar: null, points: 8230, badge: null, is_current_user: false },
  { id: "5", name: "Carla Souza", avatar: null, points: 7650, badge: "💪 Mais engajada", is_current_user: false },
  { id: "6", name: "Ricardo Oliveira", avatar: null, points: 6900, badge: null, is_current_user: false },
  { id: "7", name: "Fernanda Lima", avatar: null, points: 5840, badge: null, is_current_user: false },
  { id: "8", name: "Lucas Almeida", avatar: null, points: 4900, badge: null, is_current_user: true },
  { id: "9", name: "Patrícia Rocha", avatar: null, points: 4100, badge: null, is_current_user: false },
  { id: "10", name: "Gustavo Nunes", avatar: null, points: 3500, badge: null, is_current_user: false },
]

const podiumColors = [
  "from-yellow-400 to-yellow-600",
  "from-gray-300 to-gray-500",
  "from-amber-600 to-amber-800",
]

const podiumIcons = [Crown, Medal, Medal]

function Podium({ top3 }: { top3: RankedUser[] }) {
  // Reorder: 2nd, 1st, 3rd for visual layout
  const reordered = [top3[1], top3[0], top3[2]]

  return (
    <div className="flex items-end justify-center gap-3 mb-8 pt-4">
      {reordered.map((user, idx) => {
        const actualIndex = idx === 0 ? 1 : idx === 1 ? 0 : 2
        const Icon = podiumIcons[actualIndex]
        const height = actualIndex === 0 ? "h-40" : actualIndex === 1 ? "h-48" : "h-32"

        return (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: actualIndex * 0.1 }}
            className={cn(
              "flex flex-col items-center gap-2",
              actualIndex === 1 && "z-10"
            )}
          >
            <div className="flex flex-col items-center">
              <Icon className={cn(
                "h-6 w-6 mb-1",
                actualIndex === 0 ? "text-yellow-500" : actualIndex === 1 ? "text-gray-400" : "text-amber-700"
              )} />
              <Avatar className={cn(
                "h-12 w-12 ring-2",
                actualIndex === 0 ? "ring-yellow-400" : actualIndex === 1 ? "ring-gray-300" : "ring-amber-600"
              )}>
                <AvatarImage src={user.avatar || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div
              className={cn(
                "w-24 rounded-t-2xl flex flex-col items-center justify-end pb-3 pt-4 bg-gradient-to-t text-white",
                podiumColors[actualIndex],
                height
              )}
            >
              <span className="font-bold text-lg">{user.points.toLocaleString()}</span>
              <span className="text-xs opacity-80">pts</span>
              <span className="text-xs font-medium mt-1 truncate max-w-[80px]">
                {user.name.split(" ")[0]}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function RankingList({ users }: { users: RankedUser[] }) {
  const top3 = users.slice(0, 3)
  const rest = users.slice(3)

  return (
    <div>
      <Podium top3={top3} />

      <div className="space-y-1">
        {rest.map((user, index) => {
          const rank = index + 4
          const isCurrent = user.is_current_user

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-colors",
                isCurrent
                  ? "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30"
                  : "hover:bg-muted/50"
              )}
            >
              <span className={cn(
                "w-8 text-center font-bold text-lg",
                isCurrent ? "text-primary" : "text-muted-foreground"
              )}>
                #{rank}
              </span>
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-xs">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-medium truncate",
                    isCurrent && "text-primary"
                  )}>
                    {user.name}
                    {isCurrent && " (você)"}
                  </span>
                  {user.badge && (
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                      {user.badge}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                <Star className="h-3.5 w-3.5 text-yellow-500" />
                {user.points.toLocaleString()}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function RankingPage() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly")
  const ranking = period === "monthly" ? monthlyRanking : yearlyRanking

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h1 className="text-2xl font-bold">Ranking</h1>
        </div>

        <Tabs value={period} onValueChange={(v) => setPeriod(v as "monthly" | "yearly")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">
              <TrendingUp className="h-4 w-4 mr-2" />
              Mensal
            </TabsTrigger>
            <TabsTrigger value="yearly">
              <Award className="h-4 w-4 mr-2" />
              Anual
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Ranking Content */}
      <div className="flex-1 p-4">
        <RankingList users={ranking} />
      </div>
    </div>
  )
}
