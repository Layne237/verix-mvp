export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      proofs: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string
          before_image_url: string
          after_image_url: string
          latitude: number | null
          longitude: number | null
          location_name: string | null
          verification_score: number | null
          verification_data: Json | null
          status: 'pending' | 'verified' | 'flagged' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: string
          before_image_url: string
          after_image_url: string
          latitude?: number | null
          longitude?: number | null
          location_name?: string | null
          verification_score?: number | null
          verification_data?: Json | null
          status?: 'pending' | 'verified' | 'flagged' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string
          before_image_url?: string
          after_image_url?: string
          latitude?: number | null
          longitude?: number | null
          location_name?: string | null
          verification_score?: number | null
          verification_data?: Json | null
          status?: 'pending' | 'verified' | 'flagged' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          proof_id: string
          user_id: string
          vote: 'up' | 'down'
          created_at: string
        }
        Insert: {
          id?: string
          proof_id: string
          user_id: string
          vote: 'up' | 'down'
          created_at?: string
        }
        Update: {
          id?: string
          proof_id?: string
          user_id?: string
          vote?: 'up' | 'down'
          created_at?: string
        }
      }
      flags: {
        Row: {
          id: string
          proof_id: string
          user_id: string
          reason: string
          resolved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          proof_id: string
          user_id: string
          reason: string
          resolved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          proof_id?: string
          user_id?: string
          reason?: string
          resolved?: boolean
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
