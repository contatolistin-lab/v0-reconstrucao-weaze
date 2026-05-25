// Mock authentication context - replace with Supabase when connected
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'admin' | 'creator' | 'member' | 'guest'

export interface User {
  id: string
  email: string
  name: string
  username: string
  avatar?: string
  role: UserRole
  tenantId?: string
  points: number
  level: number
  badges: string[]
  createdAt: Date
}

export interface Tenant {
  id: string
  name: string
  slug: string
  logo?: string
  primaryColor: string
  secondaryColor: string
  plan: 'starter' | 'professional' | 'enterprise'
  ownerId: string
}

interface AuthState {
  user: User | null
  tenant: Tenant | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  setTenant: (tenant: Tenant | null) => void
  updateUser: (data: Partial<User>) => void
}

interface SignupData {
  email: string
  password: string
  name: string
  username: string
}

// Mock users for demo
const mockUsers: Record<string, { user: User; password: string }> = {
  'admin@weaze.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@weaze.com',
      name: 'Admin WEAZE',
      username: 'admin',
      role: 'admin',
      points: 50000,
      level: 25,
      badges: ['founder', 'top-creator', 'verified'],
      createdAt: new Date('2024-01-01'),
    },
  },
  'creator@demo.com': {
    password: 'creator123',
    user: {
      id: '2',
      email: 'creator@demo.com',
      name: 'Maria Silva',
      username: 'mariasilva',
      role: 'creator',
      tenantId: 'tenant-1',
      points: 15420,
      level: 12,
      badges: ['early-adopter', 'content-king'],
      createdAt: new Date('2024-03-15'),
    },
  },
  'member@demo.com': {
    password: 'member123',
    user: {
      id: '3',
      email: 'member@demo.com',
      name: 'João Pedro',
      username: 'joaopedro',
      role: 'member',
      tenantId: 'tenant-1',
      points: 3250,
      level: 5,
      badges: ['newcomer'],
      createdAt: new Date('2024-06-01'),
    },
  },
}

// Mock tenant
const mockTenant: Tenant = {
  id: 'tenant-1',
  name: 'MindFlow Academy',
  slug: 'mindflow',
  primaryColor: '#8b5cf6',
  secondaryColor: '#ec4899',
  plan: 'professional',
  ownerId: '2',
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tenant: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))
        
        const mockUser = mockUsers[email.toLowerCase()]
        
        if (!mockUser || mockUser.password !== password) {
          set({ isLoading: false })
          return { success: false, error: 'Email ou senha inválidos' }
        }

        set({
          user: mockUser.user,
          tenant: mockUser.user.tenantId ? mockTenant : null,
          isAuthenticated: true,
          isLoading: false,
        })

        return { success: true }
      },

      signup: async (data: SignupData) => {
        set({ isLoading: true })
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if email already exists
        if (mockUsers[data.email.toLowerCase()]) {
          set({ isLoading: false })
          return { success: false, error: 'Este email já está cadastrado' }
        }

        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          username: data.username,
          role: 'member',
          points: 0,
          level: 1,
          badges: ['newcomer'],
          createdAt: new Date(),
        }

        // In a real app, this would be saved to the database
        mockUsers[data.email.toLowerCase()] = {
          password: data.password,
          user: newUser,
        }

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        })

        return { success: true }
      },

      logout: () => {
        set({
          user: null,
          tenant: null,
          isAuthenticated: false,
        })
      },

      setTenant: (tenant) => {
        set({ tenant })
      },

      updateUser: (data) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...data } })
        }
      },
    }),
    {
      name: 'weaze-auth',
      partialize: (state) => ({
        user: state.user,
        tenant: state.tenant,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
