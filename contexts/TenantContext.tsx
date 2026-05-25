'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useAuth } from './AuthContext'

interface TenantData {
  id: string
  name: string
  slug: string
  logo_url: string | null
  bio: string | null
  city: string | null
  phone: string | null
  community_name: string | null
  community_description: string | null
  primary_color: string | null
  secondary_color: string | null
  plan: string | null
}

interface MembershipData {
  id: string
  tenant_id: string
  role: 'owner' | 'admin' | 'member'
  is_active: boolean
}

interface TenantContextType {
  tenant: TenantData | null
  tenants: TenantData[]
  memberships: MembershipData[]
  isOwner: boolean
  canManage: boolean
  blocked: boolean
  loading: boolean
  tenantEverLoaded: boolean
  selectTenant: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [tenant, setTenant] = useState<TenantData | null>(null)
  const [tenants, setTenants] = useState<TenantData[]>([])
  const [memberships, setMemberships] = useState<MembershipData[]>([])
  const [loading, setLoading] = useState(true)
  const [blocked, setBlocked] = useState(false)
  const [tenantEverLoaded, setTenantEverLoaded] = useState(false)
  const loadingRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const load = useCallback(async () => {
    if (!user || !isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }

    if (loadingRef.current) return
    loadingRef.current = true
    setLoading(true)

    timeoutRef.current = setTimeout(() => {
      setLoading(false)
      loadingRef.current = false
    }, 20000)

    try {
      const { data: membershipData } = await supabase
        .from('memberships')
        .select('*')
        .eq('user_id', user.id)

      if (!membershipData || membershipData.length === 0) {
        setTenant(null)
        setTenants([])
        setMemberships([])
        setLoading(false)
        setTenantEverLoaded(true)
        loadingRef.current = false
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        return
      }

      setMemberships(membershipData)

      const blockedMembership = membershipData.find(m => !m.is_active && m.role === 'member')
      setBlocked(!!blockedMembership)

      const tenantIds = membershipData.map(m => m.tenant_id)
      const { data: tenantData } = await supabase
        .from('tenants')
        .select('*')
        .in('id', tenantIds)

      if (tenantData) {
        setTenants(tenantData)
        
        const lastActive = localStorage.getItem('weaze:active_tenant')
        const pendingSlug = localStorage.getItem('weaze:pending_tenant_slug')
        
        let selected: TenantData | null = null
        
        if (pendingSlug) {
          selected = tenantData.find(t => t.slug === pendingSlug) || null
          localStorage.removeItem('weaze:pending_tenant_slug')
        }
        
        if (!selected && lastActive) {
          selected = tenantData.find(t => t.id === lastActive) || null
        }
        
        if (!selected) {
          const ownerTenant = membershipData.find(m => m.role === 'owner' || m.role === 'admin')
          if (ownerTenant) {
            selected = tenantData.find(t => t.id === ownerTenant.tenant_id) || tenantData[0]
          } else {
            selected = tenantData[0]
          }
        }
        
        setTenant(selected)
        if (selected) {
          localStorage.setItem('weaze:active_tenant', selected.id)
          localStorage.setItem('weaze:last_active_tenant', selected.id)
        }
      }

      setTenantEverLoaded(true)
    } catch {
      // silent
    } finally {
      setLoading(false)
      loadingRef.current = false
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [user])

  useEffect(() => {
    load()
  }, [load])

  const selectTenant = useCallback(async (id: string) => {
    const found = tenants.find(t => t.id === id)
    if (found) {
      setTenant(found)
      localStorage.setItem('weaze:active_tenant', found.id)
      localStorage.setItem('weaze:last_active_tenant', found.id)
    }
  }, [tenants])

  const refresh = useCallback(async () => {
    loadingRef.current = false
    await load()
  }, [load])

  const isOwner = memberships.some(
    m => m.tenant_id === tenant?.id && (m.role === 'owner' || m.role === 'admin')
  )
  const canManage = isOwner

  return (
    <TenantContext.Provider
      value={{
        tenant,
        tenants,
        memberships,
        isOwner,
        canManage,
        blocked,
        loading,
        tenantEverLoaded,
        selectTenant,
        refresh,
      }}
    >
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) throw new Error('useTenant must be used within TenantProvider')
  return ctx
}
