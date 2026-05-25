'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export function useGroups(tenantId: string | undefined) {
  return useQuery({
    queryKey: ['groups', tenantId],
    queryFn: async () => {
      if (!tenantId || !isSupabaseConfigured || !supabase) return []
      
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    },
    enabled: !!tenantId,
  })
}

export function useB2CGroups(userId: string | undefined) {
  return useQuery({
    queryKey: ['b2c-groups', userId],
    queryFn: async () => {
      if (!userId || !isSupabaseConfigured || !supabase) return []
      
      const { data: memberships } = await supabase
        .from('group_members')
        .select('group_id')
        .eq('user_id', userId)

      if (!memberships || memberships.length === 0) return []

      const groupIds = memberships.map(m => m.group_id)
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .in('id', groupIds)

      if (error) throw error
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

      const { data, error } = await supabase
        .from('groups')
        .insert(group)
        .select()
        .single()

      if (error) throw error

      // Add creator as member
      await supabase.from('group_members').insert({
        group_id: data.id,
        user_id: group.created_by,
        added_by: group.created_by,
      })

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })
}

export function useGroupMembers(groupId: string | undefined) {
  return useQuery({
    queryKey: ['group-members', groupId],
    queryFn: async () => {
      if (!groupId || !isSupabaseConfigured || !supabase) return []
      
      const { data, error } = await supabase
        .from('group_members')
        .select('*, profiles:user_id(name, email)')
        .eq('group_id', groupId)

      if (error) throw error
      return data || []
    },
    enabled: !!groupId,
  })
}
