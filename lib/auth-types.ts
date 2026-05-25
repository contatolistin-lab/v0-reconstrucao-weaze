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
