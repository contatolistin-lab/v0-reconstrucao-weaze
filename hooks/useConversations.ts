'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export function useConversationsList(tenantId: string | undefined) {
  return useQuery({
    queryKey: ['conversations', tenantId],
    queryFn: async () => {
      if (!tenantId || !isSupabaseConfigured || !supabase) return []
      
      const { data: threads, error } = await supabase
        .from('message_threads')
        .select('*, messages:thread_id(*)')
        .eq('tenant_id', tenantId)
        .order('last_message_at', { ascending: false })

      if (error) throw error
      return threads || []
    },
    enabled: !!tenantId,
  })
}

export function useConversationMessages(conversationId: string | undefined) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId || !isSupabaseConfigured || !supabase) return []
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('thread_id', conversationId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true })

      if (error) throw error
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

      const { data, error } = await supabase
        .from('messages')
        .insert({
          thread_id: threadId,
          sender_id: senderId,
          content,
        })
        .select()
        .single()

      if (error) throw error
      
      await supabase
        .from('message_threads')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', threadId)

      return data
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.threadId] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })
}
