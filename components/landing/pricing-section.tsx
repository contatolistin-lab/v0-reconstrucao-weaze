'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Starter',
    description: 'Para quem está começando a construir sua comunidade.',
    price: { monthly: 97, annual: 77 },
    features: [
      'Até 500 membros',
      'Feed de conteúdo',
      'Grupos ilimitados',
      'Chat em tempo real',
      'Customização básica',
      'Suporte por email',
    ],
    cta: 'Começar Agora',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Para marcas que querem maximizar o engajamento.',
    price: { monthly: 297, annual: 237 },
    features: [
      'Até 5.000 membros',
      'Tudo do Starter',
      'Gamificação completa',
      'Eventos e agenda',
      'Domínio personalizado',
      'API de integração',
      'Suporte prioritário',
    ],
    cta: 'Escolher Professional',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Para grandes marcas com necessidades específicas.',
    price: { monthly: null, annual: null },
    features: [
      'Membros ilimitados',
      'Tudo do Professional',
      'App mobile dedicado',
      'SLA garantido',
      'Gerente de sucesso',
      'Customização total',
      'Onboarding dedicado',
    ],
    cta: 'Falar com Vendas',
    popular: false,
  },
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Preços
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Escolha o plano ideal para{' '}
            <span className="gradient-text">sua comunidade</span>
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Comece grátis por 14 dias. Sem cartão de crédito.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={cn('text-sm', !isAnnual && 'text-foreground font-medium', isAnnual && 'text-muted-foreground')}>
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                'relative h-7 w-12 rounded-full transition-colors',
                isAnnual ? 'bg-primary' : 'bg-muted'
              )}
              aria-label={isAnnual ? 'Mudar para plano mensal' : 'Mudar para plano anual'}
            >
              <div
                className={cn(
                  'absolute top-1 h-5 w-5 rounded-full bg-white transition-transform',
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
            <span className={cn('text-sm', isAnnual && 'text-foreground font-medium', !isAnnual && 'text-muted-foreground')}>
              Anual
              <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                -20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'relative flex flex-col rounded-2xl border p-8',
                plan.popular
                  ? 'border-primary/50 bg-gradient-to-b from-primary/5 to-transparent shadow-lg shadow-primary/10'
                  : 'border-border bg-card'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                {plan.price.monthly ? (
                  <>
                    <span className="text-4xl font-bold">
                      R${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                    {isAnnual && (
                      <div className="mt-1 text-sm text-muted-foreground">
                        Cobrado anualmente
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-4xl font-bold">Sob consulta</span>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={plan.popular ? 'default' : 'outline'}
                className={cn(
                  'w-full',
                  plan.popular && 'gradient-bg text-white hover:opacity-90'
                )}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
