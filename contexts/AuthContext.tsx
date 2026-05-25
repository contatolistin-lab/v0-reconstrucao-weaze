'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export type AppRole = 'admin' | 'b2b' | 'b2c' | null

interface AuthContextType {
  user: User | null
  loading: boolean
  initializing: boolean
  appRole: AppRole
  isB2B: boolean
  isB2C: boolean
  isAdmin: boolean
  redirectTo: string | null
  signOut: () => Promise<void>
  clearRedirect: () => void
  refreshAppRole: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [initializing, setInitializing] = useState(true)
  const [appRole, setAppRole] = useState<AppRole>(null)
  const [redirectTo, setRedirectTo] = useState<string | null>(null)

  const initCalled = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const determineAppRole = useCallback(async (userId: string) => {
    if (!isSupabaseConfigured || !supabase) return 'b2c' as AppRole
    try {
      const { data: memberships } = await supabase
        .from('memberships')
        .select('role')
        .eq('user_id', userId)
      
      if (memberships && memberships.length > 0) {
        const roles = memberships.map(m => m.role)
        if (roles.includes('owner') || roles.includes('admin')) return 'b2b' as AppRole
      }

      const { data: { user_metadata } } = await supabase.auth.getUser()
      if (user_metadata?.account_type === 'b2b') return 'b2b' as AppRole
      return 'b2c' as AppRole
    } catch {
      return 'b2c' as AppRole
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
        setLoading(false)
        setInitializing(false)
      } else {
        setUser(null)
        setAppRole(null)
        setLoading(false)
        setInitializing(false)
      }
    } catch {
      setUser(null)
      setAppRole(null)
      setLoading(false)
      setInitializing(false)
    } finally {
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

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut()
    }
    setUser(null)
    setAppRole(null)
    router.push('/login')
  }, [router])

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
        appRole,
        isB2B: appRole === 'b2b' || appRole === 'admin',
        isB2C: appRole === 'b2c',
        isAdmin: appRole === 'admin',
        redirectTo,
        signOut,
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
