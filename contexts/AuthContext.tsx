'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export type AppRole = 'admin' | 'b2b' | 'b2c' | null
export type UserRole = 'admin' | 'creator' | 'member' | 'guest'

export interface CompatUser {
  id: string
  email: string
  name: string
  username: string
  avatar?: string
  role: UserRole
  tenantId?: string
  points: number
  level: number
  badges: string[]
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  loading: boolean
  initializing: boolean
  isAuthenticated: boolean
  isLoading: boolean
  appRole: AppRole
  isB2B: boolean
  isB2C: boolean
  isAdmin: boolean
  redirectTo: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (data: { email: string; password: string; name: string; username: string }) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  logout: () => void
  clearRedirect: () => void
  refreshAppRole: () => Promise<void>
}

const mockUsers: Record<string, { password: string; user: CompatUser }> = {
  'admin@weaze.com': {
    password: 'admin123',
    user: {
      id: '1', email: 'admin@weaze.com', name: 'Admin WEAZE', username: 'admin',
      role: 'admin', points: 50000, level: 25, badges: ['founder', 'top-creator', 'verified'], createdAt: new Date('2024-01-01'),
    },
  },
  'creator@demo.com': {
    password: 'creator123',
    user: {
      id: '2', email: 'creator@demo.com', name: 'Maria Silva', username: 'mariasilva',
      role: 'creator', tenantId: 'tenant-1', points: 15420, level: 12, badges: ['early-adopter', 'content-king'], createdAt: new Date('2024-03-15'),
    },
  },
  'member@demo.com': {
    password: 'member123',
    user: {
      id: '3', email: 'member@demo.com', name: 'João Pedro', username: 'joaopedro',
      role: 'member', tenantId: 'tenant-1', points: 3250, level: 5, badges: ['newcomer'], createdAt: new Date('2024-06-01'),
    },
  },
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [initializing, setInitializing] = useState(true)
  const [appRole, setAppRole] = useState<AppRole>(null)
  const [redirectTo, setRedirectTo] = useState<string | null>(null)

  const initCalled = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const determineAppRole = useCallback(async (userId: string): Promise<AppRole> => {
    if (!isSupabaseConfigured || !supabase) return 'b2c'
    try {
      const { data: memberships } = await (supabase as any)
        .from('memberships')
        .select('role')
        .eq('user_id', userId)
      
      if (memberships && memberships.length > 0) {
        const roles = memberships.map((m: { role: string }) => m.role)
        if (roles.includes('owner') || roles.includes('admin')) return 'b2b'
      }

      const { data: userData } = await supabase.auth.getUser()
      const meta = userData?.user?.user_metadata as Record<string, unknown> | undefined
      if (meta?.account_type === 'b2b') return 'b2b'
      return 'b2c'
    } catch {
      return 'b2c'
    }
  }, [])

  const initAuth = useCallback(async () => {
    if (initCalled.current) return
    initCalled.current = true

    timeoutRef.current = setTimeout(() => {
      setLoading(false)
      setInitializing(false)
    }, 15000)

    try {
      if (!isSupabaseConfigured || !supabase) {
        setLoading(false)
        setInitializing(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser(session.user)
        const role = await determineAppRole(session.user.id)
        setAppRole(role)
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
      setInitializing(false)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [determineAppRole])

  useEffect(() => {
    initAuth()

    if (!isSupabaseConfigured || !supabase) return

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') return

      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        const role = await determineAppRole(session.user.id)
        setAppRole(role)
        setLoading(false)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setAppRole(null)
        setLoading(false)
      } else if (event === 'TOKEN_REFRESHED') {
        if (!session) {
          setUser(null)
          setAppRole(null)
          setLoading(false)
        }
      } else if (event === 'USER_UPDATED' && session?.user) {
        setUser(session.user)
      }
    })

    return () => {
      subscription.unsubscribe()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [initAuth, determineAppRole])

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { success: false, error: error.message }
      return { success: true }
    }
    // Mock fallback
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const mockUser = mockUsers[email.toLowerCase()]
    if (!mockUser || mockUser.password !== password) {
      setLoading(false)
      return { success: false, error: 'Email ou senha inválidos' }
    }
    setAppRole(mockUser.user.role === 'admin' ? 'admin' : mockUser.user.role === 'creator' ? 'b2b' : 'b2c')
    setLoading(false)
    return { success: true }
  }, [])

  const signup = useCallback(async (data: { email: string; password: string; name: string; username: string }): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { name: data.name, username: data.username, account_type: 'b2c' } },
      })
      if (error) return { success: false, error: error.message }
      return { success: true }
    }
    // Mock fallback
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    if (mockUsers[data.email.toLowerCase()]) {
      setLoading(false)
      return { success: false, error: 'Este email já está cadastrado' }
    }
    setAppRole('b2c')
    setLoading(false)
    return { success: true }
  }, [])

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut()
    }
    setUser(null)
    setAppRole(null)
  }, [])

  const logout = useCallback(() => {
    signOut()
  }, [signOut])

  const refreshAppRole = useCallback(async () => {
    if (user) {
      const role = await determineAppRole(user.id)
      setAppRole(role)
    }
  }, [user, determineAppRole])

  const clearRedirect = useCallback(() => setRedirectTo(null), [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initializing,
        isAuthenticated: !!user,
        isLoading: loading,
        login,
        signup,
        signOut,
        logout,
        appRole,
        isB2B: appRole === 'b2b' || appRole === 'admin',
        isB2C: appRole === 'b2c',
        isAdmin: appRole === 'admin',
        redirectTo,
        clearRedirect,
        refreshAppRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
