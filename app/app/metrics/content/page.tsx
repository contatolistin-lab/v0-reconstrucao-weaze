"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Search,
  Trash2,
  Eye,
  Heart,
  MessageCircle,
  ArrowUpDown,
  Plus,
  MoreVertical,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Post {
  id: string
  title: string
  content: string
  author: { id: string; name: string }
  created_at: string
  views: number
  likes: number
  comments: number
  status: "published" | "draft" | "archived"
}

const mockPosts: Post[] = [
  {
    id: "p1",
    title: "Dicas para iniciantes no mundo fitness",
    content:
      "Compartilhem suas melhores dicas para quem está começando na academia!",
    author: { id: "1", name: "Personal Ana" },
    created_at: "2026-05-24T10:30:00Z",
    views: 1234,
    likes: 89,
    comments: 23,
    status: "published",
  },
  {
    id: "p2",
    title: "Receitas saudáveis para o dia a dia",
    content: "Vamos criar um repositório de receitas práticas e nutritivas?",
    author: { id: "2", name: "Chef Marcos" },
    created_at: "2026-05-23T14:00:00Z",
    views: 2341,
    likes: 156,
    comments: 56,
    status: "published",
  },
  {
    id: "p3",
    title: "Desafio 30 dias de transformação",
    content: "Quem topa participar do nosso desafio de 30 dias?",
    author: { id: "1", name: "Personal Ana" },
    created_at: "2026-05-20T09:00:00Z",
    views: 3456,
    likes: 234,
    comments: 112,
    status: "published",
  },
  {
    id: "p4",
    title: "Suplementação: mitos e verdades",
    content: "Vamos desmistificar o mundo dos suplementos alimentares.",
    author: { id: "3", name: "Dr. Carlos" },
    created_at: "2026-05-19T16:45:00Z",
    views: 876,
    likes: 67,
    comments: 34,
    status: "draft",
  },
  {
    id: "p5",
    title: "Guia de alongamentos pós-treino",
    content: "Alongamentos essenciais para fazer depois do treino.",
    author: { id: "4", name: "Fisio Paula" },
    created_at: "2026-05-18T11:00:00Z",
    views: 543,
    likes: 45,
    comments: 12,
    status: "archived",
  },
]

type SortKey = "views" | "likes" | "comments" | "created_at"
type SortDir = "asc" | "desc"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState(mockPosts)
  const [sortKey, setSortKey] = useState<SortKey>("created_at")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [previewPost, setPreviewPost] = useState<Post | null>(null)

  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === "string") {
        return sortDir === "desc"
          ? new Date(bVal).getTime() - new Date(aVal).getTime()
          : new Date(aVal).getTime() - new Date(bVal).getTime()
      }
      return sortDir === "desc"
        ? (bVal as number) - (aVal as number)
        : (aVal as number) - (bVal as number)
    })

  const handleDelete = () => {
    if (deleteId) {
      setPosts((prev) => prev.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    }
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const totalViews = posts.reduce((sum, p) => sum + p.views, 0)
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0)
  const totalComments = posts.reduce((sum, p) => sum + p.comments, 0)

  return (
    <div className="flex flex-col h-full bg-background p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Conteúdo</h1>
          <Button className="bg-gradient-to-r from-primary to-accent text-white">
            <Plus className="h-4 w-4 mr-2" />
            Novo post
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Visualizações</p>
              <p className="text-xl font-bold">{totalViews.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Curtidas</p>
              <p className="text-xl font-bold">{totalLikes.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Comentários</p>
              <p className="text-xl font-bold">
                {totalComments.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar posts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Posts List */}
        <Card>
          <div className="divide-y divide-border">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <div className="col-span-4">Post</div>
              <div
                className="col-span-2 text-center cursor-pointer hover:text-foreground flex items-center justify-center gap-1"
                onClick={() => toggleSort("views")}
              >
                Visualizações
                <ArrowUpDown className="h-3 w-3" />
              </div>
              <div
                className="col-span-2 text-center cursor-pointer hover:text-foreground flex items-center justify-center gap-1"
                onClick={() => toggleSort("likes")}
              >
                Curtidas
                <ArrowUpDown className="h-3 w-3" />
              </div>
              <div
                className="col-span-2 text-center cursor-pointer hover:text-foreground flex items-center justify-center gap-1"
                onClick={() => toggleSort("comments")}
              >
                Comentários
                <ArrowUpDown className="h-3 w-3" />
              </div>
              <div className="col-span-2 text-right">Ações</div>
            </div>

            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="md:col-span-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-xs">
                          {post.author.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p
                          className="font-medium text-sm line-clamp-1 cursor-pointer hover:text-primary"
                          onClick={() => setPreviewPost(post)}
                        >
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {post.author.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] px-1.5 py-0",
                              post.status === "published" &&
                                "border-emerald-500/30 text-emerald-600",
                              post.status === "draft" &&
                                "border-amber-500/30 text-amber-600",
                              post.status === "archived" &&
                                "border-gray-500/30 text-gray-600"
                            )}
                          >
                            {post.status === "published"
                              ? "Publicado"
                              : post.status === "draft"
                                ? "Rascunho"
                                : "Arquivado"}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:hidden items-center gap-3 text-xs text-muted-foreground ml-11">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {post.comments}
                    </span>
                  </div>

                  <div className="hidden md:flex md:col-span-2 items-center justify-center text-sm">
                    {post.views.toLocaleString()}
                  </div>
                  <div className="hidden md:flex md:col-span-2 items-center justify-center text-sm">
                    {post.likes.toLocaleString()}
                  </div>
                  <div className="hidden md:flex md:col-span-2 items-center justify-center text-sm">
                    {post.comments.toLocaleString()}
                  </div>

                  <div className="flex items-center justify-end md:col-span-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setPreviewPost(post)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteId(post.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-1">Nenhum post encontrado</h3>
              <p className="text-sm text-muted-foreground">
                Tente ajustar sua busca
              </p>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir post</DialogTitle>
            <DialogDescription>
              Tem certeza? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewPost} onOpenChange={() => setPreviewPost(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{previewPost?.title}</DialogTitle>
            <DialogDescription>
              Por {previewPost?.author.name} •{" "}
              {previewPost && formatDate(previewPost.created_at)}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {previewPost?.content}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {previewPost?.views} visualizações
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {previewPost?.likes} curtidas
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {previewPost?.comments} comentários
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
