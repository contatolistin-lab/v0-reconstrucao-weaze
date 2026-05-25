"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Users,
  FileText,
  Activity,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calendar,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MetricCard {
  title: string
  value: string
  change: number
  icon: React.ElementType
  href: string
}

interface ActivityItem {
  id: string
  user: string
  action: string
  target: string
  time: string
}

const metrics: MetricCard[] = [
  {
    title: "Total de Membros",
    value: "1.234",
    change: 12.5,
    icon: Users,
    href: "/app/metrics/users",
  },
  {
    title: "Total de Posts",
    value: "456",
    change: 8.2,
    icon: FileText,
    href: "/app/metrics/content",
  },
  {
    title: "Interações",
    value: "8.942",
    change: -3.1,
    icon: Activity,
    href: "/app/metrics/funnel",
  },
  {
    title: "Receita",
    value: "R$ 23.456",
    change: 22.7,
    icon: DollarSign,
    href: "/app/metrics/revenue",
  },
]

const weeklyActivity = [
  { day: "Seg", posts: 12, members: 5 },
  { day: "Ter", posts: 19, members: 8 },
  { day: "Qua", posts: 25, members: 12 },
  { day: "Qui", posts: 18, members: 7 },
  { day: "Sex", posts: 22, members: 10 },
  { day: "Sáb", posts: 15, members: 4 },
  { day: "Dom", posts: 10, members: 3 },
]

const recentActivity: ActivityItem[] = [
  {
    id: "a1",
    user: "Maria Costa",
    action: "criou um novo post",
    target: "Dicas de treino",
    time: "5min atrás",
  },
  {
    id: "a2",
    user: "João Silva",
    action: "comentou em",
    target: "Receitas saudáveis",
    time: "12min atrás",
  },
  {
    id: "a3",
    user: "Ana Personal",
    action: "adicionou",
    target: "3 novos membros",
    time: "30min atrás",
  },
  {
    id: "a4",
    user: "Carlos Lima",
    action: "completou",
    target: "o desafio 30 dias",
    time: "1h atrás",
  },
  {
    id: "a5",
    user: "Paula Santos",
    action: "fez upgrade para",
    target: "Plano Premium",
    time: "2h atrás",
  },
]

export default function MetricsPage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("7d")

  return (
    <div className="flex flex-col h-full bg-background p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Métricas</h1>
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            Últimos {period === "7d" ? "7" : period === "30d" ? "30" : "90"}{" "}
            dias
          </Badge>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <Link key={metric.title} href={metric.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <metric.icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          metric.change >= 0
                            ? "border-emerald-500/30 text-emerald-600"
                            : "border-destructive/30 text-destructive"
                        )}
                      >
                        {metric.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(metric.change)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Activity Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">
                Atividade semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="day"
                      className="text-xs text-muted-foreground"
                    />
                    <YAxis className="text-xs text-muted-foreground" />
                    <Tooltip />
                    <Bar
                      dataKey="posts"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      name="Posts"
                    />
                    <Bar
                      dataKey="members"
                      fill="hsl(var(--accent))"
                      radius={[4, 4, 0, 0]}
                      name="Membros"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Atividade recente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 hover:bg-accent/50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-primary">
                        {item.user.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{item.user}</span>{" "}
                        {item.action}{" "}
                        <span className="font-medium">{item.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
