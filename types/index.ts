import { Database as SupabaseDatabase } from './supabase'

export type Database = SupabaseDatabase

// ── Profile Types ────────────────────────────────────────────────
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

// ── Proof Types ──────────────────────────────────────────────────
export type Proof = Database['public']['Tables']['proofs']['Row']
export type ProofInsert = Database['public']['Tables']['proofs']['Insert']
export type ProofUpdate = Database['public']['Tables']['proofs']['Update']

export type ProofStatus = 'pending' | 'processing' | 'verified' | 'partially_verified' | 'not_verified' | 'deleted'
export type ProofActionType = 'litter_cleanup' | 'tree_planting' | 'recycling' | 'volunteering' | 'other'

// ── Share Event Types ────────────────────────────────────────────
export type ShareEvent = Database['public']['Tables']['share_events']['Row']
export type ShareEventInsert = Database['public']['Tables']['share_events']['Insert']
export type ShareType = 'twitter' | 'whatsapp' | 'copy' | 'facebook' | 'linkedin'

// ── Moderation Flag Types ────────────────────────────────────────
export type ModerationFlag = Database['public']['Tables']['moderation_flags']['Row']
export type ModerationFlagInsert = Database['public']['Tables']['moderation_flags']['Insert']
export type ModerationStatus = 'pending' | 'resolved' | 'dismissed'

// ── Verification Result ──────────────────────────────────────────
export interface VerificationResult {
  confidence_score: number
  reasoning: string
  action_type: ProofActionType
  before_description: string
  after_description: string
  flags: string[]
}

// ── API Response Types ──────────────────────────────────────────
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  status: number
}

export interface LeaderboardEntry {
  id: string
  display_name: string | null
  avatar_url: string | null
  total_verified: number
  rank: number
}

export interface ProofWithProfile extends Proof {
  profiles: {
    display_name: string | null
    avatar_url: string | null
  }
}

export interface ProofWithVotes extends Proof {
  votes: { up: number; down: number }
  userVote?: 'up' | 'down'
  user?: {
    name: string | null
    avatar_url: string | null
  }
}

export interface ProofSubmission {
  title: string
  description?: string
  action_type: string
  beforeImage: File
  afterImage: File
  latitude?: number
  longitude?: number
  locationName?: string
}
