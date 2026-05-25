import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase-types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const isConfigured = !!(supabaseUrl && supabaseAnonKey)

export const supabase = isConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          'x-supabase-cache-refresh': Date.now().toString(),
        },
      },
    })
  : null

export const isSupabaseConfigured = isConfigured
