import type { Database } from '@/lib/supabase/types'

export type Proof = Database['public']['Tables']['proofs']['Row']
export type ProofInsert = Database['public']['Tables']['proofs']['Insert']
export type ProofUpdate = Database['public']['Tables']['proofs']['Update']

export interface ProofSubmission {
  title: string
  description?: string
  category: string
  beforeImage: File
  afterImage: File
  latitude?: number
  longitude?: number
  locationName?: string
}

export interface ProofWithVotes extends Proof {
  votes: { up: number; down: number }
  userVote?: 'up' | 'down'
  user?: {
    name: string | null
    avatar_url: string | null
  }
}
