'use client'

import { useAuth as useSupabaseAuth } from '@/contexts/AuthContext'
import { isSupabaseConfigured } from './supabase'

export { isSupabaseConfigured as isBackendReal }

export function useAuth() {
  return useSupabaseAuth()
}

export type { AppRole } from '@/contexts/AuthContext'
