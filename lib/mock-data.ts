export type CTAType = 'link' | 'product' | 'schedule' | 'form' | 'contact' | 'download'

export interface CTA {
  id: string
  type: CTAType
  label: string
  url?: string
  productId?: string
  price?: number
  formId?: string
}

export interface PostAuthor {
  id: string
  name: string
  username: string
  avatar?: string
  verified: boolean
  role: 'admin' | 'creator' | 'member'
}

export interface Post {
  id: string
  type: 'video' | 'image' | 'carousel'
  author: PostAuthor
  content: {
    mediaUrl: string
    thumbnail?: string
    description: string
    hashtags: string[]
  }
  cta?: CTA
  stats: {
    likes: number
    comments: number
    shares: number
    saves: number
    views: number
  }
  liked: boolean
  saved: boolean
  createdAt: Date
}

// Mock data for the feed
export const mockPosts: Post[] = [
  {
    id: '1',
    type: 'video',
    author: {
      id: '2',
      name: 'Maria Silva',
      username: 'mariasilva',
      verified: true,
      role: 'creator',
    },
    content: {
      mediaUrl: '/videos/demo-1.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=700&fit=crop',
      description: '5 estratégias que usamos para crescer 300% em 6 meses. A terceira vai te surpreender! Arraste para cima para saber mais.',
      hashtags: ['empreendedorismo', 'crescimento', 'negocios'],
    },
    cta: {
      id: 'cta-1',
      type: 'schedule',
      label: 'Agendar Mentoria Grátis',
      url: '/schedule/mentoria',
    },
    stats: {
      likes: 2420,
      comments: 148,
      shares: 89,
      saves: 312,
      views: 15000,
    },
    liked: false,
    saved: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    type: 'video',
    author: {
      id: '3',
      name: 'João Pedro',
      username: 'joaopedro',
      verified: false,
      role: 'member',
    },
    content: {
      mediaUrl: '/videos/demo-2.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=700&fit=crop',
      description: 'Aprendi isso na comunidade e minha vida mudou. Obrigado a todos que compartilham conhecimento aqui!',
      hashtags: ['comunidade', 'aprendizado', 'gratidao'],
    },
    stats: {
      likes: 856,
      comments: 42,
      shares: 23,
      saves: 67,
      views: 5200,
    },
    liked: true,
    saved: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'image',
    author: {
      id: '1',
      name: 'Admin WEAZE',
      username: 'admin',
      verified: true,
      role: 'admin',
    },
    content: {
      mediaUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=700&fit=crop',
      description: 'Novidade: Lançamos o sistema de rankings! Agora você pode competir com outros membros e ganhar badges exclusivos.',
      hashtags: ['novidade', 'gamificacao', 'ranking'],
    },
    cta: {
      id: 'cta-3',
      type: 'link',
      label: 'Ver Ranking',
      url: '/ranking',
    },
    stats: {
      likes: 1580,
      comments: 89,
      shares: 156,
      saves: 234,
      views: 12000,
    },
    liked: false,
    saved: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    type: 'video',
    author: {
      id: '4',
      name: 'Ana Costa',
      username: 'anacosta',
      verified: true,
      role: 'creator',
    },
    content: {
      mediaUrl: '/videos/demo-3.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=700&fit=crop',
      description: 'Workshop exclusivo: Como criar conteúdo que engaja e converte. Vagas limitadas!',
      hashtags: ['workshop', 'conteudo', 'marketing'],
    },
    cta: {
      id: 'cta-4',
      type: 'product',
      label: 'Garantir Vaga - R$97',
      url: '/products/workshop',
      price: 97,
    },
    stats: {
      likes: 3210,
      comments: 267,
      shares: 189,
      saves: 456,
      views: 28000,
    },
    liked: false,
    saved: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    type: 'image',
    author: {
      id: '5',
      name: 'Pedro Mendes',
      username: 'pedromendes',
      verified: false,
      role: 'member',
    },
    content: {
      mediaUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=700&fit=crop',
      description: 'Resultado do mês: consegui minha primeira venda online seguindo as dicas da comunidade! Muito obrigado a todos!',
      hashtags: ['resultado', 'vendas', 'sucesso'],
    },
    stats: {
      likes: 1890,
      comments: 134,
      shares: 45,
      saves: 78,
      views: 9800,
    },
    liked: true,
    saved: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
]

// Helper to format numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// Helper to format time ago
export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d`
  if (hours > 0) return `${hours}h`
  if (minutes > 0) return `${minutes}min`
  return 'agora'
}
