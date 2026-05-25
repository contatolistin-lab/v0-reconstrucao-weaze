export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          username: string
          avatar_url: string | null
          phone: string | null
          city: string | null
          state: string | null
          country: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          username: string
          avatar_url?: string | null
          phone?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          username?: string
          avatar_url?: string | null
          phone?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tenants: {
        Row: {
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
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          bio?: string | null
          city?: string | null
          phone?: string | null
          community_name?: string | null
          community_description?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          plan?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          bio?: string | null
          city?: string | null
          phone?: string | null
          community_name?: string | null
          community_description?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          plan?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      memberships: {
        Row: {
          id: string
          user_id: string
          tenant_id: string
          role: 'owner' | 'admin' | 'member'
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tenant_id: string
          role: 'owner' | 'admin' | 'member'
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tenant_id?: string
          role?: 'owner' | 'admin' | 'member'
          is_active?: boolean
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          tenant_id: string
          author_id: string
          type: 'video' | 'image' | 'text'
          media_url: string | null
          thumbnail_url: string | null
          description: string | null
          hashtags: string[] | null
          discussion_enabled: boolean
          interaction_prompt: string | null
          is_pinned: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          author_id: string
          type: 'video' | 'image' | 'text'
          media_url?: string | null
          thumbnail_url?: string | null
          description?: string | null
          hashtags?: string[] | null
          discussion_enabled?: boolean
          interaction_prompt?: string | null
          is_pinned?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          author_id?: string
          type?: 'video' | 'image' | 'text'
          media_url?: string | null
          thumbnail_url?: string | null
          description?: string | null
          hashtags?: string[] | null
          discussion_enabled?: boolean
          interaction_prompt?: string | null
          is_pinned?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      post_cta: {
        Row: {
          id: string
          post_id: string
          tenant_id: string
          type: 'buy' | 'schedule' | 'quote' | 'register' | 'info' | 'live'
          label: string
          config_json: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          tenant_id: string
          type: 'buy' | 'schedule' | 'quote' | 'register' | 'info' | 'live'
          label: string
          config_json?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          tenant_id?: string
          type?: 'buy' | 'schedule' | 'quote' | 'register' | 'info' | 'live'
          label?: string
          config_json?: Json | null
          created_at?: string
        }
      }
      interactions: {
        Row: {
          id: string
          post_id: string
          user_id: string
          action_type: 'view' | 'like' | 'comment' | 'click_cta' | 'conversion'
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          action_type: 'view' | 'like' | 'comment' | 'click_cta' | 'conversion'
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          action_type?: 'view' | 'like' | 'comment' | 'click_cta' | 'conversion'
          metadata?: Json | null
          created_at?: string
        }
      }
      lives: {
        Row: {
          id: string
          tenant_id: string
          title: string
          description: string | null
          external_url: string | null
          is_live: boolean
          scheduled_at: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          title: string
          description?: string | null
          external_url?: string | null
          is_live?: boolean
          scheduled_at?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          title?: string
          description?: string | null
          external_url?: string | null
          is_live?: boolean
          scheduled_at?: string | null
          created_by?: string
          created_at?: string
        }
      }
      message_threads: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          last_message_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id: string
          last_message_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          user_id?: string
          last_message_at?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          thread_id: string
          sender_id: string
          content: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          thread_id: string
          sender_id: string
          content: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          thread_id?: string
          sender_id?: string
          content?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      topics: {
        Row: {
          id: string
          tenant_id: string
          title: string
          created_by: string
          related_post_id: string | null
          is_pinned: boolean
          is_locked: boolean
          last_activity_at: string
          replies_count: number
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          title: string
          created_by: string
          related_post_id?: string | null
          is_pinned?: boolean
          is_locked?: boolean
          last_activity_at?: string
          replies_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          title?: string
          created_by?: string
          related_post_id?: string | null
          is_pinned?: boolean
          is_locked?: boolean
          last_activity_at?: string
          replies_count?: number
          created_at?: string
        }
      }
      topic_messages: {
        Row: {
          id: string
          topic_id: string
          user_id: string
          content: string
          parent_id: string | null
          edited_at: string | null
          deleted_at: string | null
          is_pinned: boolean
          pinned_at: string | null
          pinned_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          topic_id: string
          user_id: string
          content: string
          parent_id?: string | null
          edited_at?: string | null
          deleted_at?: string | null
          is_pinned?: boolean
          pinned_at?: string | null
          pinned_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          topic_id?: string
          user_id?: string
          content?: string
          parent_id?: string | null
          edited_at?: string | null
          deleted_at?: string | null
          is_pinned?: boolean
          pinned_at?: string | null
          pinned_by?: string | null
          created_at?: string
        }
      }
      groups: {
        Row: {
          id: string
          tenant_id: string
          name: string
          description: string | null
          type: 'private' | 'internal'
          image_url: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          description?: string | null
          type: 'private' | 'internal'
          image_url?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          description?: string | null
          type?: 'private' | 'internal'
          image_url?: string | null
          created_by?: string
          created_at?: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          added_by: string
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          added_by: string
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          added_by?: string
          created_at?: string
        }
      }
      group_posts: {
        Row: {
          id: string
          group_id: string
          author_id: string
          title: string
          content: string
          is_pinned: boolean
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          author_id: string
          title: string
          content: string
          is_pinned?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          author_id?: string
          title?: string
          content?: string
          is_pinned?: boolean
          created_at?: string
        }
      }
      group_replies: {
        Row: {
          id: string
          post_id: string
          author_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_id?: string
          content?: string
          created_at?: string
        }
      }
      group_system_messages: {
        Row: {
          id: string
          group_id: string
          message_type: string
          user_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          message_type: string
          user_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          message_type?: string
          user_name?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          type: string
          title: string
          body: string | null
          data: Json | null
          actor_id: string | null
          reference_id: string | null
          priority: string | null
          content: string | null
          link: string | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id: string
          type: string
          title: string
          body?: string | null
          data?: Json | null
          actor_id?: string | null
          reference_id?: string | null
          priority?: string | null
          content?: string | null
          link?: string | null
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          user_id?: string
          type?: string
          title?: string
          body?: string | null
          data?: Json | null
          actor_id?: string | null
          reference_id?: string | null
          priority?: string | null
          content?: string | null
          link?: string | null
          read?: boolean
          created_at?: string
        }
      }
      community_requests: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          user_id?: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string
          post_id: string
          tenant_id: string
          user_id: string
          name: string
          email: string
          phone: string | null
          answers: Json | null
          status: string
          event_name: string | null
          event_date: string | null
          event_time: string | null
          location: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          post_id: string
          tenant_id: string
          user_id: string
          name: string
          email: string
          phone?: string | null
          answers?: Json | null
          status?: string
          event_name?: string | null
          event_date?: string | null
          event_time?: string | null
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          post_id?: string
          tenant_id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string | null
          answers?: Json | null
          status?: string
          event_name?: string | null
          event_date?: string | null
          event_time?: string | null
          location?: string | null
          created_at?: string
        }
      }
      appointment_cta: {
        Row: {
          id: string
          post_id: string
          tenant_id: string
          service_name: string
          duration_minutes: number
          service_date: string | null
          available_times: Json | null
          notes: string | null
          max_bookings: number | null
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          tenant_id: string
          service_name: string
          duration_minutes: number
          service_date?: string | null
          available_times?: Json | null
          notes?: string | null
          max_bookings?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          tenant_id?: string
          service_name?: string
          duration_minutes?: number
          service_date?: string | null
          available_times?: Json | null
          notes?: string | null
          max_bookings?: number | null
          created_at?: string
        }
      }
      appointment_requests: {
        Row: {
          id: string
          appointment_id: string
          post_id: string
          tenant_id: string
          user_id: string
          selected_time: string | null
          message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          appointment_id: string
          post_id: string
          tenant_id: string
          user_id: string
          selected_time?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          appointment_id?: string
          post_id?: string
          tenant_id?: string
          user_id?: string
          selected_time?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
      }
      budget_requests: {
        Row: {
          id: string
          tenant_id: string
          post_id: string
          user_id: string
          name: string
          email: string
          phone: string | null
          message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          post_id: string
          user_id: string
          name: string
          email: string
          phone?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          post_id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
      }
      user_engagement_points: {
        Row: {
          id: string
          user_id: string
          tenant_id: string
          total_points: number
          monthly_points: number
          yearly_points: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tenant_id: string
          total_points?: number
          monthly_points?: number
          yearly_points?: number
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tenant_id?: string
          total_points?: number
          monthly_points?: number
          yearly_points?: number
          updated_at?: string
        }
      }
      engagement_logs: {
        Row: {
          id: string
          user_id: string
          tenant_id: string
          action_type: string
          points: number
          reference_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tenant_id: string
          action_type: string
          points: number
          reference_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tenant_id?: string
          action_type?: string
          points?: number
          reference_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      tenant_rewards: {
        Row: {
          id: string
          tenant_id: string
          title: string
          description: string | null
          award_type: string
          award_value: string | null
          min_position: number | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          title: string
          description?: string | null
          award_type?: string
          award_value?: string | null
          min_position?: number | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          title?: string
          description?: string | null
          award_type?: string
          award_value?: string | null
          min_position?: number | null
          is_active?: boolean
          created_at?: string
        }
      }
      invite_link_events: {
        Row: {
          id: string
          tenant_id: string
          event_type: 'visit' | 'signup' | 'login'
          ref: string | null
          campaign: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          event_type: 'visit' | 'signup' | 'login'
          ref?: string | null
          campaign?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          event_type?: 'visit' | 'signup' | 'login'
          ref?: string | null
          campaign?: string | null
          created_at?: string
        }
      }
      onboarding_state: {
        Row: {
          id: string
          user_id: string
          tenant_id: string | null
          step: number
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tenant_id?: string | null
          step?: number
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tenant_id?: string | null
          step?: number
          completed?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      tenant_stats: {
        Row: {
          tenant_id: string
          total_members: number
          total_posts: number
          total_interactions: number
        }
      }
    }
    Functions: {
      award_engagement_points: {
        Args: {
          p_user_id: string
          p_tenant_id: string
          p_action_type: string
          p_points: number
          p_reference_id?: string
        }
        Returns: void
      }
      get_monthly_ranking: {
        Args: {
          p_tenant_id: string
        }
        Returns: Array<{
          user_id: string
          name: string
          avatar_url: string | null
          points: number
          rank: number
        }>
      }
      get_yearly_ranking: {
        Args: {
          p_tenant_id: string
        }
        Returns: Array<{
          user_id: string
          name: string
          avatar_url: string | null
          points: number
          rank: number
        }>
      }
    }
  }
}
