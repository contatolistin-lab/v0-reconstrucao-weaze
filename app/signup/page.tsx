'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth'

const passwordRequirements = [
  { key: 'length', label: 'Mínimo 8 caracteres', check: (p: string) => p.length >= 8 },
  { key: 'uppercase', label: 'Uma letra maiúscula', check: (p: string) => /[A-Z]/.test(p) },
  { key: 'number', label: 'Um número', check: (p: string) => /\d/.test(p) },
]

export default function SignupPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.username) {
        setError('Preencha todos os campos')
        return
      }
      setError('')
      setStep(2)
      return
    }

    // Step 2 - actual signup
    setError('')

    // Validate password
    const passwordValid = passwordRequirements.every((req) => req.check(formData.password))
    if (!passwordValid) {
      setError('A senha não atende aos requisitos')
      return
    }

    const result = await signup(formData)
    
    if (result.success) {
      router.push('/app')
    } else {
      setError(result.error || 'Erro ao criar conta')
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:bg-gradient-to-br lg:from-primary lg:to-accent lg:p-12">
        <div className="mx-auto max-w-md text-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">
              Crie sua comunidade em minutos
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Junte-se a milhares de criadores que já estão transformando 
              seguidores em comunidades engajadas.
            </p>

            {/* Benefits */}
            <ul className="mt-8 space-y-4">
              {[
                '14 dias grátis para testar',
                'Sem necessidade de cartão de crédito',
                'Setup em menos de 5 minutos',
                'Suporte humanizado incluso',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-sm">
          {/* Back link */}
          <button
            onClick={() => (step === 2 ? setStep(1) : router.push('/'))}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === 2 ? 'Voltar' : 'Voltar para o site'}
          </button>

          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-bg">
              <span className="text-xl font-bold text-white">W</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">WEAZE</span>
          </Link>

          {/* Progress */}
          <div className="mb-8 flex gap-2">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold tracking-tight">
              {step === 1 ? 'Crie sua conta' : 'Defina sua senha'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {step === 1
                ? 'Comece sua jornada com a WEAZE.'
                : 'Escolha uma senha segura para sua conta.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                >
                  {error}
                </motion.div>
              )}

              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome completo
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">
                      Nome de usuário
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        @
                      </span>
                      <Input
                        id="username"
                        type="text"
                        placeholder="seuusername"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''),
                          })
                        }
                        required
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Apenas letras minúsculas, números e underline
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Senha
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Crie uma senha forte"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        autoComplete="new-password"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Password requirements */}
                    <div className="mt-3 space-y-2">
                      {passwordRequirements.map((req) => {
                        const isValid = req.check(formData.password)
                        return (
                          <div
                            key={req.key}
                            className={`flex items-center gap-2 text-xs ${
                              isValid ? 'text-green-600' : 'text-muted-foreground'
                            }`}
                          >
                            <div
                              className={`flex h-4 w-4 items-center justify-center rounded-full ${
                                isValid ? 'bg-green-100' : 'bg-muted'
                              }`}
                            >
                              {isValid && <Check className="h-3 w-3" />}
                            </div>
                            {req.label}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="gradient-bg w-full text-white hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : step === 1 ? (
                  'Continuar'
                ) : (
                  'Criar conta'
                )}
              </Button>

              {step === 2 && (
                <p className="text-center text-xs text-muted-foreground">
                  Ao criar uma conta, você concorda com nossos{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                  .
                </p>
              )}
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Fazer login
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
