'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

function sb(table: string) {
  return (supabase as any).from(table)
}

export function useGroups(tenantId: string | undefined) {
  return useQuery<any[]>({
    queryKey: ['groups', tenantId],
    queryFn: async () => {
      if (!tenantId || !isSupabaseConfigured || !supabase) return []
      const { data } = await sb('groups')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false })
      return data || []
    },
    enabled: !!tenantId,
  })
}

export function useB2CGroups(userId: string | undefined) {
  return useQuery<any[]>({
    queryKey: ['b2c-groups', userId],
    queryFn: async () => {
      if (!userId || !isSupabaseConfigured || !supabase) return []
      
      const { data: memberships } = await sb('group_members')
        .select('group_id')
        .eq('user_id', userId)

      const membershipList = memberships || []
      if (membershipList.length === 0) return []

      const groupIds = membershipList.map((m: any) => m.group_id)
      const { data } = await sb('groups')
        .select('*')
        .in('id', groupIds)

      return data || []
    },
    enabled: !!userId,
  })
}

export function useCreateGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (group: {
      tenant_id: string
      name: string
      description: string
      type: 'private' | 'internal'
      created_by: string
    }) => {
      if (!isSupabaseConfigured || !supabase) return null

      const { data } = await sb('groups').insert(group).select().single()

      if (data) {
        await sb('group_members').insert({
          group_id: data.id,
          user_id: group.created_by,
          added_by: group.created_by,
        })
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })
}

export function useGroupMembers(groupId: string | undefined) {
  return useQuery<any[]>({
    queryKey: ['group-members', groupId],
    queryFn: async () => {
      if (!groupId || !isSupabaseConfigured || !supabase) return []
      const { data } = await sb('group_members')
        .select('*')
        .eq('group_id', groupId)
      return data || []
    },
    enabled: !!groupId,
  })
}
