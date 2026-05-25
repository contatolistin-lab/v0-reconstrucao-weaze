"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Users,
  LogIn,
  ArrowRight,
  Lock,
  Clock,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Post {
  id: string
  title: string
  author: string
  comments: number
  date: string
}

interface Tenant {
  id: string
  slug: string
  name: string
  description: string
  logo_url: string | null
  member_count: number
  is_private: boolean
  recent_posts: Post[]
}

const mockTenants: Record<string, Tenant> = {
  "academia-fitness": {
    id: "t1",
    slug: "academia-fitness",
    name: "Academia Fitness",
    description:
      "Comunidade exclusiva para alunos da Academia Fitness. Acompanhe treinos, nutrição e evolua com a gente!",
    logo_url: null,
    member_count: 342,
    is_private: true,
    recent_posts: [
      {
        id: "p1",
        title: "Dicas para maximizar seus resultados",
        author: "Personal Ana",
        comments: 23,
        date: "2026-05-24",
      },
      {
        id: "p2",
        title: "Novos equipamentos chegando!",
        author: "Admin",
        comments: 12,
        date: "2026-05-23",
      },
      {
        id: "p3",
        title: "Desafio do verão 2026",
        author: "Personal Ana",
        comments: 45,
        date: "2026-05-22",
      },
    ],
  },
  "weaze-oficial": {
    id: "t2",
    slug: "weaze-oficial",
    name: "Weaze Oficial",
    description:
      "Comunidade oficial Weaze. Novidades, feedback e suporte.",
    logo_url: null,
    member_count: 1520,
    is_private: false,
    recent_posts: [
      {
        id: "p1",
        title: "Atualização de maio",
        author: "Time Weaze",
        comments: 34,
        date: "2026-05-25",
      },
    ],
  },
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function CommunityPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const tenant = mockTenants[slug]

  useEffect(() => {
    if (tenant) {
      localStorage.setItem("pending_tenant", tenant.slug)
    }
  }, [tenant])

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Comunidade não encontrada</h1>
          <p className="text-muted-foreground mb-6">
            O link que você acessou não existe ou foi removido.
          </p>
          <Button onClick={() => router.push("/")}>Voltar ao início</Button>
        </Card>
      </div>
    )
  }

  const isLoggedIn = false
  const isMember = false

  if (isLoggedIn && isMember) {
    router.push(`/app?tenant=${tenant.slug}`)
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Card className="p-6 md:p-8 mb-6 text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-white">
                {tenant.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-2xl font-bold mb-2">{tenant.name}</h1>
            <p className="text-muted-foreground mb-4">{tenant.description}</p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{tenant.member_count} membros</span>
              </div>
              {tenant.is_private && (
                <Badge variant="outline" className="gap-1">
                  <Lock className="h-3 w-3" />
                  Privada
                </Badge>
              )}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-white"
              onClick={() => {
                localStorage.setItem("pending_tenant", tenant.slug)
                if (isLoggedIn) {
                  router.push(`/app?tenant=${tenant.slug}`)
                } else {
                  router.push("/login")
                }
              }}
            >
              {tenant.is_private ? (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Solicitar Acesso
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </Card>

          {/* Recent Posts Preview */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Publicações recentes
            </h2>
            <div className="space-y-3">
              {tenant.recent_posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{post.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-4">
                    <MessageSquare className="h-3 w-3" />
                    {post.comments}
                  </div>
                </motion.div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-muted-foreground"
              onClick={() => {
                localStorage.setItem("pending_tenant", tenant.slug)
                router.push("/login")
              }}
            >
              Ver todas as publicações
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
