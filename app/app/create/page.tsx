"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Video,
  Image,
  Type,
  Hash,
  Link,
  MessageSquare,
  Target,
  Plus,
  Trash2,
  ShoppingCart,
  CalendarClock,
  Quote,
  ClipboardCheck,
  Info,
  Radio,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type PostType = "video" | "image" | "text"
type CtaType = "buy" | "schedule" | "quote" | "register" | "info" | "live"

interface CtaField {
  id: string
  type: CtaType
  label: string
  price?: string
  url?: string
  service_name?: string
  duration?: string
  date?: string
}

const ctaTypeIcons: Record<CtaType, React.ReactNode> = {
  buy: <ShoppingCart className="h-4 w-4" />,
  schedule: <CalendarClock className="h-4 w-4" />,
  quote: <Quote className="h-4 w-4" />,
  register: <ClipboardCheck className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
  live: <Radio className="h-4 w-4" />,
}

const ctaTypeLabels: Record<CtaType, string> = {
  buy: "Compra",
  schedule: "Agendamento",
  quote: "Cotação",
  register: "Cadastro",
  info: "Informação",
  live: "Ao vivo",
}

function CtaForm({ cta, onChange, onRemove }: { cta: CtaField; onChange: (updated: CtaField) => void; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-3 p-4 border border-border rounded-xl bg-muted/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            {ctaTypeIcons[cta.type]}
            {ctaTypeLabels[cta.type]}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`cta-label-${cta.id}`}>Texto do botão</Label>
        <Input
          id={`cta-label-${cta.id}`}
          placeholder="Ex: Comprar agora"
          value={cta.label}
          onChange={(e) => onChange({ ...cta, label: e.target.value })}
        />
      </div>

      {cta.type === "buy" && (
        <>
          <div className="space-y-2">
            <Label htmlFor={`cta-price-${cta.id}`}>Preço</Label>
            <Input
              id={`cta-price-${cta.id}`}
              placeholder="R$ 49,90"
              value={cta.price}
              onChange={(e) => onChange({ ...cta, price: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`cta-url-${cta.id}`}>URL do produto</Label>
            <Input
              id={`cta-url-${cta.id}`}
              placeholder="https://..."
              value={cta.url}
              onChange={(e) => onChange({ ...cta, url: e.target.value })}
            />
          </div>
        </>
      )}

      {cta.type === "schedule" && (
        <>
          <div className="space-y-2">
            <Label htmlFor={`cta-service-${cta.id}`}>Nome do serviço</Label>
            <Input
              id={`cta-service-${cta.id}`}
              placeholder="Ex: Consultoria"
              value={cta.service_name}
              onChange={(e) => onChange({ ...cta, service_name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`cta-duration-${cta.id}`}>Duração</Label>
              <Input
                id={`cta-duration-${cta.id}`}
                placeholder="Ex: 60min"
                value={cta.duration}
                onChange={(e) => onChange({ ...cta, duration: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`cta-date-${cta.id}`}>Data</Label>
              <Input
                id={`cta-date-${cta.id}`}
                type="date"
                value={cta.date}
                onChange={(e) => onChange({ ...cta, date: e.target.value })}
              />
            </div>
          </div>
        </>
      )}

      {(cta.type === "quote" || cta.type === "register" || cta.type === "info") && (
        <div className="space-y-2">
          <Label htmlFor={`cta-url-${cta.id}`}>URL de destino</Label>
          <Input
            id={`cta-url-${cta.id}`}
            placeholder="https://..."
            value={cta.url}
            onChange={(e) => onChange({ ...cta, url: e.target.value })}
          />
        </div>
      )}

      {cta.type === "live" && (
        <div className="space-y-2">
          <Label htmlFor={`cta-url-${cta.id}`}>URL da live</Label>
          <Input
            id={`cta-url-${cta.id}`}
            placeholder="https://..."
            value={cta.url}
            onChange={(e) => onChange({ ...cta, url: e.target.value })}
          />
        </div>
      )}
    </motion.div>
  )
}

export default function CreatePostPage() {
  const [postType, setPostType] = useState<PostType>("text")
  const [mediaUrl, setMediaUrl] = useState("")
  const [description, setDescription] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [discussionEnabled, setDiscussionEnabled] = useState(true)
  const [interactionPrompt, setInteractionPrompt] = useState("")
  const [ctas, setCtas] = useState<CtaField[]>([])
  const [newCtaType, setNewCtaType] = useState<CtaType>("buy")

  const handleAddCta = () => {
    const newCta: CtaField = {
      id: crypto.randomUUID(),
      type: newCtaType,
      label: "",
    }
    setCtas((prev) => [...prev, newCta])
  }

  const handleCtaChange = (id: string, updated: CtaField) => {
    setCtas((prev) => prev.map((c) => (c.id === id ? updated : c)))
  }

  const handleRemoveCta = (id: string) => {
    setCtas((prev) => prev.filter((c) => c.id !== id))
  }

  const handleSubmit = () => {
    // Would submit via API
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      <div className="p-4 border-b border-border bg-card">
        <h1 className="text-2xl font-bold">Criar publicação</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Crie conteúdo para engajar sua comunidade
        </p>
      </div>

      <div className="flex-1 p-4 max-w-2xl mx-auto w-full space-y-6">
        {/* Post Type Selection */}
        <div className="space-y-2">
          <Label>Tipo de publicação</Label>
          <Tabs value={postType} onValueChange={(v) => setPostType(v as PostType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="video">
                <Video className="h-4 w-4 mr-2" />
                Vídeo
              </TabsTrigger>
              <TabsTrigger value="image">
                <Image className="h-4 w-4 mr-2" />
                Imagem
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="h-4 w-4 mr-2" />
                Texto
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="mt-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-url">URL do vídeo</Label>
                    <Input
                      id="video-url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="image" className="mt-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-url">URL da imagem</Label>
                    <Input
                      id="image-url"
                      placeholder="https://..."
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="text" className="mt-4">
              <Card>
                <CardContent className="pt-4 text-sm text-muted-foreground">
                  Publique conteúdo em texto para sua comunidade.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Escreva sua mensagem..."
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Hashtags */}
        <div className="space-y-2">
          <Label htmlFor="hashtags">
            <Hash className="h-4 w-4 inline mr-1" />
            Hashtags
          </Label>
          <Input
            id="hashtags"
            placeholder="Ex: marketing, vendas, dicas (separados por vírgula)"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
        </div>

        {/* Discussion Toggle */}
        <div className="flex items-center justify-between p-4 border border-border rounded-xl">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <Label>Ativar discussão</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Permite que membros comentem nesta publicação
            </p>
          </div>
          <Switch checked={discussionEnabled} onCheckedChange={setDiscussionEnabled} />
        </div>

        {/* Interaction Prompt */}
        <div className="space-y-2">
          <Label htmlFor="prompt">
            <Target className="h-4 w-4 inline mr-1" />
            Prompt de interação
          </Label>
          <Input
            id="prompt"
            placeholder="Ex: O que você achou? Comente abaixo!"
            value={interactionPrompt}
            onChange={(e) => setInteractionPrompt(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Uma pergunta ou chamada para incentivar engajamento
          </p>
        </div>

        {/* CTA Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Call to Action</Label>
            <div className="flex items-center gap-2">
              <Select value={newCtaType} onValueChange={(v) => setNewCtaType(v as CtaType)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ctaTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      <span className="flex items-center gap-2">
                        {ctaTypeIcons[value as CtaType]}
                        {label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleAddCta}>
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </div>

          {ctas.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4 border border-dashed border-border rounded-xl">
              Nenhum CTA adicionado. Adicione botões de ação à sua publicação.
            </p>
          ) : (
            <div className="space-y-3">
              {ctas.map((cta) => (
                <CtaForm
                  key={cta.id}
                  cta={cta}
                  onChange={(updated) => handleCtaChange(cta.id, updated)}
                  onRemove={() => handleRemoveCta(cta.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-border">
          <Button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className="w-full bg-gradient-to-r from-primary to-accent text-white h-12 text-base"
          >
            Publicar
          </Button>
        </div>
      </div>
    </div>
  )
}
