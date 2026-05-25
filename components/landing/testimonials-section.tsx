'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Camila Rodrigues',
    role: 'CEO, MindFlow Academy',
    avatar: 'CR',
    content: 'A WEAZE transformou completamente nossa comunidade. O feed estilo TikTok aumentou nosso engajamento em 400%. Nossos alunos passam mais tempo interagindo do que consumindo.',
    rating: 5,
  },
  {
    name: 'Rafael Santos',
    role: 'Fundador, FitPro Brasil',
    avatar: 'RS',
    content: 'A gamificação é um divisor de águas. Nossos membros competem para subir no ranking e isso criou uma cultura de engajamento que nunca tivemos antes.',
    rating: 5,
  },
  {
    name: 'Juliana Costa',
    role: 'Diretora de Marketing, TechStart',
    avatar: 'JC',
    content: 'Migrar do Discord para a WEAZE foi a melhor decisão. Agora temos controle total sobre a experiência e nossos usuários adoram a interface moderna.',
    rating: 5,
  },
  {
    name: 'Pedro Almeida',
    role: 'Criador de Conteúdo',
    avatar: 'PA',
    content: 'Os CTAs em cada post mudaram meu jogo. Converto diretamente do feed para meus produtos. É como ter uma loja dentro da comunidade.',
    rating: 5,
  },
  {
    name: 'Marina Silva',
    role: 'Head de Comunidade, EduPro',
    avatar: 'MS',
    content: 'O suporte é excepcional e a plataforma evolui constantemente. Sempre que pedimos uma feature, ela aparece nas próximas atualizações.',
    rating: 5,
  },
  {
    name: 'Lucas Mendes',
    role: 'Empreendedor Digital',
    avatar: 'LM',
    content: 'Testei várias plataformas antes. WEAZE é a única que realmente entende o que uma comunidade de marca precisa. Vale cada centavo.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="overflow-hidden py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Depoimentos
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Marcas que já{' '}
            <span className="gradient-text">transformaram</span>{' '}
            suas comunidades
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Veja o que nossos clientes estão dizendo sobre a experiência com WEAZE.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
