'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

function sb(table: string) {
  return (supabase as any).from(table)
}

export function useConversationsList(tenantId: string | undefined) {
  return useQuery<any[]>({
    queryKey: ['conversations', tenantId],
    queryFn: async () => {
      if (!tenantId || !isSupabaseConfigured || !supabase) return []
      const { data } = await sb('message_threads')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('last_message_at', { ascending: false })
      return data || []
    },
    enabled: !!tenantId,
  })
}

export function useConversationMessages(conversationId: string | undefined) {
  return useQuery<any[]>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId || !isSupabaseConfigured || !supabase) return []
      const { data } = await sb('messages')
        .select('*')
        .eq('thread_id', conversationId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true })
      return data || []
    },
    enabled: !!conversationId,
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      threadId,
      senderId,
      content,
    }: {
      threadId: string
      senderId: string
      content: string
    }) => {
      if (!isSupabaseConfigured || !supabase) return null

      const { data } = await sb('messages')
        .insert({ thread_id: threadId, sender_id: senderId, content })
        .select()
        .single()

      if (data) {
        await sb('message_threads')
          .update({ last_message_at: new Date().toISOString() })
          .eq('id', threadId)
      }

      return data
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.threadId] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })
}
