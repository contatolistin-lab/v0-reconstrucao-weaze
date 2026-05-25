"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Plus,
  Search,
  Heart,
  MessageCircle,
  ChevronRight,
  Send,
  Pin,
  MoreVertical,
  Trash2,
  Flag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Mock data
const mockTopics = [
  {
    id: "1",
    title: "Dicas para iniciantes no mundo fitness",
    content: "Compartilhem suas melhores dicas para quem está começando na academia!",
    author: { id: "1", name: "Personal Ana", avatar: null },
    created_at: "2026-05-24T10:30:00Z",
    replies_count: 23,
    likes_count: 45,
    is_pinned: true,
    last_reply_at: "2026-05-25T08:15:00Z",
  },
  {
    id: "2",
    title: "Receitas saudáveis para o dia a dia",
    content: "Vamos criar um repositório de receitas práticas e nutritivas?",
    author: { id: "2", name: "Chef Marcos", avatar: null },
    created_at: "2026-05-23T14:00:00Z",
    replies_count: 56,
    likes_count: 89,
    is_pinned: false,
    last_reply_at: "2026-05-25T09:30:00Z",
  },
  {
    id: "3",
    title: "Desafio 30 dias de transformação",
    content: "Quem topa participar do nosso desafio de 30 dias? Regras no post!",
    author: { id: "1", name: "Personal Ana", avatar: null },
    created_at: "2026-05-20T09:00:00Z",
    replies_count: 112,
    likes_count: 234,
    is_pinned: true,
    last_reply_at: "2026-05-25T10:00:00Z",
  },
  {
    id: "4",
    title: "Suplementação: mitos e verdades",
    content: "Vamos desmistificar o mundo dos suplementos alimentares.",
    author: { id: "3", name: "Dr. Carlos", avatar: null },
    created_at: "2026-05-19T16:45:00Z",
    replies_count: 34,
    likes_count: 67,
    is_pinned: false,
    last_reply_at: "2026-05-24T22:00:00Z",
  },
]

const mockReplies = [
  {
    id: "r1",
    content: "Excelente tópico! Minha dica é: comece devagar e seja consistente. Muita gente desiste porque quer resultados rápidos demais.",
    author: { id: "4", name: "João Silva", avatar: null },
    created_at: "2026-05-24T11:00:00Z",
    likes_count: 12,
  },
  {
    id: "r2",
    content: "Concordo! Outra dica importante: não compare seu progresso com o dos outros. Cada corpo é único.",
    author: { id: "5", name: "Maria Costa", avatar: null },
    created_at: "2026-05-24T11:30:00Z",
    likes_count: 8,
  },
  {
    id: "r3",
    content: "Hidratação é fundamental! Beber água antes, durante e depois do treino faz toda diferença.",
    author: { id: "6", name: "Pedro Lima", avatar: null },
    created_at: "2026-05-24T12:15:00Z",
    likes_count: 15,
  },
]

interface Topic {
  id: string
  title: string
  content: string
  author: { id: string; name: string; avatar: string | null }
  created_at: string
  replies_count: number
  likes_count: number
  is_pinned: boolean
  last_reply_at: string
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}min atrás`
  if (diffHours < 24) return `${diffHours}h atrás`
  if (diffDays < 7) return `${diffDays}d atrás`
  return date.toLocaleDateString("pt-BR")
}

function TopicCard({ topic, onSelect }: { topic: Topic; onSelect: (id: string) => void }) {
  const [liked, setLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer",
        topic.is_pinned && "border-primary/30 bg-primary/5"
      )}
      onClick={() => onSelect(topic.id)}
    >
      {topic.is_pinned && (
        <div className="flex items-center gap-1 text-primary text-xs font-medium mb-2">
          <Pin className="h-3 w-3" />
          Fixado
        </div>
      )}

      <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
        {topic.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {topic.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-accent/20">
              {topic.author.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{topic.author.name}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">
            {formatTimeAgo(topic.last_reply_at)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLiked(!liked)
            }}
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Heart className={cn("h-4 w-4", liked && "fill-primary text-primary")} />
            <span className="text-xs">{topic.likes_count + (liked ? 1 : 0)}</span>
          </button>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{topic.replies_count}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CreateTopicDialog({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [open, setOpen] = useState(false)

  const handleCreate = () => {
    setOpen(false)
    setTitle("")
    setContent("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova conversa</DialogTitle>
          <DialogDescription>
            Inicie uma discussão com a comunidade sobre qualquer assunto.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Qual é o assunto?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              placeholder="Escreva sua mensagem..."
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!title.trim() || !content.trim()}
            className="bg-gradient-to-r from-primary to-accent text-white"
          >
            Publicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TopicDetail({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const [replyContent, setReplyContent] = useState("")
  const [liked, setLiked] = useState(false)

  const handleReply = () => {
    if (!replyContent.trim()) return
    setReplyContent("")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <Button variant="ghost" onClick={onBack} className="mb-3">
          <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
          Voltar
        </Button>

        {topic.is_pinned && (
          <div className="flex items-center gap-1 text-primary text-xs font-medium mb-2">
            <Pin className="h-3 w-3" />
            Fixado
          </div>
        )}

        <h1 className="text-xl font-bold mb-2">{topic.title}</h1>
        <p className="text-muted-foreground mb-4">{topic.content}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                {topic.author.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{topic.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(topic.created_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className={cn("h-5 w-5", liked && "fill-primary text-primary")} />
              <span className="text-sm">{topic.likes_count + (liked ? 1 : 0)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="font-semibold mb-4">
          Respostas ({topic.replies_count})
        </h2>

        <div className="space-y-4">
          <AnimatePresence>
            {mockReplies.map((reply) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                      {reply.author.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{reply.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(reply.created_at)}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Flag className="h-4 w-4 mr-2" />
                            Denunciar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm mt-1">{reply.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">{reply.likes_count}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Reply Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Textarea
            placeholder="Escreva uma resposta..."
            className="min-h-[44px] max-h-32 resize-none"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleReply()
              }
            }}
          />
          <Button
            onClick={handleReply}
            disabled={!replyContent.trim()}
            className="bg-gradient-to-r from-primary to-accent text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ConversasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)

  const filteredTopics = mockTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort: pinned first, then by last_reply_at
  const sortedTopics = [...filteredTopics].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1
    if (!a.is_pinned && b.is_pinned) return 1
    return new Date(b.last_reply_at).getTime() - new Date(a.last_reply_at).getTime()
  })

  if (selectedTopicId) {
    const topic = mockTopics.find((t) => t.id === selectedTopicId)
    if (topic) {
      return <TopicDetail topic={topic} onBack={() => setSelectedTopicId(null)} />
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Conversas</h1>
          <CreateTopicDialog>
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nova conversa
            </Button>
          </CreateTopicDialog>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Topics List */}
      <div className="flex-1 overflow-y-auto p-4">
        {sortedTopics.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Nenhuma conversa encontrada</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Tente uma busca diferente"
                : "Inicie a primeira conversa da comunidade"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} onSelect={setSelectedTopicId} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
