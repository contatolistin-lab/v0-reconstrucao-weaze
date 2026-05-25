"use client"

import { motion } from "framer-motion"
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  TrendingUp,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface UserStat {
  label: string
  value: string
  icon: React.ElementType
  color: string
}

const userGrowth = [
  { month: "Jan", new_users: 45, active_users: 320 },
  { month: "Fev", new_users: 52, active_users: 345 },
  { month: "Mar", new_users: 48, active_users: 360 },
  { month: "Abr", new_users: 63, active_users: 390 },
  { month: "Mai", new_users: 58, active_users: 410 },
  { month: "Jun", new_users: 71, active_users: 440 },
  { month: "Jul", new_users: 65, active_users: 465 },
  { month: "Ago", new_users: 82, active_users: 500 },
  { month: "Set", new_users: 78, active_users: 530 },
  { month: "Out", new_users: 91, active_users: 570 },
  { month: "Nov", new_users: 85, active_users: 600 },
  { month: "Dez", new_users: 95, active_users: 640 },
]

const userDistribution = [
  { name: "Ativos", value: 640, fill: "#7c3aed" },
  { name: "Inativos", value: 280, fill: "#d1d5db" },
  { name: "Novos (este mês)", value: 95, fill: "#10b981" },
]

const stats: UserStat[] = [
  {
    label: "Total de Usuários",
    value: "1.234",
    icon: Users,
    color: "#7c3aed",
  },
  {
    label: "Usuários Ativos",
    value: "640",
    icon: UserCheck,
    color: "#10b981",
  },
  {
    label: "Inativos",
    value: "280",
    icon: UserX,
    color: "#ef4444",
  },
  {
    label: "Novos (este mês)",
    value: "95",
    icon: UserPlus,
    color: "#f59e0b",
  },
]

export default function UsersPage() {
  return (
    <div className="flex flex-col h-full bg-background p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-6">Usuários</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <stat.icon
                        className="h-5 w-5"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-600"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{Math.floor(Math.random() * 20 + 5)}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Crescimento de usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowth}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="month"
                      className="text-xs text-muted-foreground"
                    />
                    <YAxis className="text-xs text-muted-foreground" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="new_users"
                      stroke="#7c3aed"
                      strokeWidth={2}
                      name="Novos usuários"
                    />
                    <Line
                      type="monotone"
                      dataKey="active_users"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Usuários ativos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Distribuição de usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userDistribution} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      className="text-xs text-muted-foreground"
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      className="text-xs text-muted-foreground"
                      width={140}
                    />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Users this Year */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Novos usuários por mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowth}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="month"
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis className="text-xs text-muted-foreground" />
                  <Tooltip />
                  <Bar
                    dataKey="new_users"
                    fill="#7c3aed"
                    radius={[4, 4, 0, 0]}
                    name="Novos usuários"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
