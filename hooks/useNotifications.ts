'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

function sb(table: string) {
  return (supabase as any).from(table)
}

export function useNotifications(userId: string | undefined) {
  return useQuery<any[]>({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      if (!userId || !isSupabaseConfigured || !supabase) return []
      const { data } = await sb('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)
      return data || []
    },
    enabled: !!userId,
  })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      if (!isSupabaseConfigured || !supabase) return
      await sb('notifications').update({ read: true }).eq('id', id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useDeleteNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      if (!isSupabaseConfigured || !supabase) return
      await sb('notifications').delete().eq('id', id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}
