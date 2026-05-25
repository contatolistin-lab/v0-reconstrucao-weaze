"use client"

import { motion } from "framer-motion"
import {
  Eye,
  Heart,
  MousePointerClick,
  Target,
  ArrowDown,
  Users,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FunnelStep {
  name: string
  value: number
  percentage: number
  icon: React.ElementType
  color: string
}

const funnelData: FunnelStep[] = [
  {
    name: "Visualizações",
    value: 12500,
    percentage: 100,
    icon: Eye,
    color: "#7c3aed",
  },
  {
    name: "Curtidas",
    value: 6800,
    percentage: 54.4,
    icon: Heart,
    color: "#8b5cf6",
  },
  {
    name: "Cliques em CTA",
    value: 3200,
    percentage: 25.6,
    icon: MousePointerClick,
    color: "#a78bfa",
  },
  {
    name: "Conversões",
    value: 1250,
    percentage: 10,
    icon: Target,
    color: "#c4b5fd",
  },
]

const funnelChartData = funnelData.map((step) => ({
  name: step.name,
  value: step.value,
  fill: step.color,
}))

export default function FunnelPage() {
  return (
    <div className="flex flex-col h-full bg-background p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-6">Funil de Conversão</h1>

        {/* Funnel Visualization */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">
              Jornada do usuário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={funnelChartData}
                  layout="vertical"
                  barSize={48}
                >
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
                    width={120}
                  />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    <LabelList
                      dataKey="value"
                      position="right"
                      className="text-xs fill-foreground"
                      formatter={(value: number) =>
                        value.toLocaleString("pt-BR")
                      }
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {funnelData.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <step.icon
                        className="h-5 w-5"
                        style={{ color: step.color }}
                      />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: `${step.color}40`,
                        color: step.color,
                      }}
                    >
                      {step.percentage}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.name}</p>
                  <p className="text-xl font-bold mt-1">
                    {step.value.toLocaleString("pt-BR")}
                  </p>
                  {index < funnelData.length - 1 && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <ArrowDown className="h-3 w-3" />
                      <span>
                        {(
                          (funnelData[index + 1].value / step.value) *
                          100
                        ).toFixed(1)}
                        % conversão
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
