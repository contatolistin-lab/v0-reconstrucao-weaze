"use client"

import { motion } from "framer-motion"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  CalendarCheck,
  Package,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RevenueSource {
  name: string
  value: number
  icon: React.ElementType
  color: string
}

const monthlyRevenue = [
  { month: "Jan", subscriptions: 5200, appointments: 3400, products: 1800 },
  { month: "Fev", subscriptions: 5400, appointments: 3600, products: 2100 },
  { month: "Mar", subscriptions: 5800, appointments: 3200, products: 1900 },
  { month: "Abr", subscriptions: 6100, appointments: 4100, products: 2200 },
  { month: "Mai", subscriptions: 6500, appointments: 4300, products: 2500 },
  { month: "Jun", subscriptions: 7000, appointments: 3900, products: 2300 },
  { month: "Jul", subscriptions: 6800, appointments: 4500, products: 2800 },
  { month: "Ago", subscriptions: 7200, appointments: 4800, products: 2600 },
  { month: "Set", subscriptions: 7500, appointments: 5100, products: 3000 },
  { month: "Out", subscriptions: 7800, appointments: 4900, products: 3200 },
  { month: "Nov", subscriptions: 8100, appointments: 5300, products: 3400 },
  { month: "Dez", subscriptions: 8500, appointments: 5600, products: 3800 },
]

const revenueSources: RevenueSource[] = [
  { name: "Assinaturas", value: 72300, icon: CreditCard, color: "#7c3aed" },
  { name: "Agendamentos", value: 45600, icon: CalendarCheck, color: "#f59e0b" },
  { name: "Produtos", value: 28600, icon: Package, color: "#10b981" },
]

const totalRevenue = revenueSources.reduce((sum, s) => sum + s.value, 0)

export default function RevenuePage() {
  return (
    <div className="flex flex-col h-full bg-background p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-6">Receita</h1>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold">
                {totalRevenue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <Badge
                variant="outline"
                className="mt-2 border-emerald-500/30 text-emerald-600"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                +22.7%
              </Badge>
            </CardContent>
          </Card>

          {revenueSources.map((source) => (
            <Card key={source.name}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${source.color}15` }}
                  >
                    <source.icon
                      className="h-5 w-5"
                      style={{ color: source.color }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{source.name}</p>
                <p className="text-2xl font-bold">
                  {source.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((source.value / totalRevenue) * 100).toFixed(1)}% do total
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Receita mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
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
                  <Bar
                    dataKey="subscriptions"
                    fill="#7c3aed"
                    radius={[4, 4, 0, 0]}
                    name="Assinaturas"
                  />
                  <Bar
                    dataKey="appointments"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                    name="Agendamentos"
                  />
                  <Bar
                    dataKey="products"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    name="Produtos"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Crescimento da receita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
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
                    dataKey="subscriptions"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    name="Assinaturas"
                  />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Agendamentos"
                  />
                  <Line
                    type="monotone"
                    dataKey="products"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Produtos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
