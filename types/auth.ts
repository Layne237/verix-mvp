import type { Session } from 'next-auth'

export interface AuthUser {
  id: string
  email: string
  name: string | null
  image: string | null
  role: 'user' | 'admin'
}

export interface SessionWithUser extends Session {
  user: AuthUser
}
