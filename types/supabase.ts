export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          name: string | null
          avatar_url: string | null
          role: string
          is_verified: boolean
          total_verified: number
          show_on_leaderboard: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          name?: string | null
          avatar_url?: string | null
          role?: string
          is_verified?: boolean
          total_verified?: number
          show_on_leaderboard?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          name?: string | null
          avatar_url?: string | null
          role?: string
          is_verified?: boolean
          total_verified?: number
          show_on_leaderboard?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      proofs: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string | null
          action_type: string | null
          location: string | null
          before_image_url: string
          after_image_url: string
          latitude: number | null
          longitude: number | null
          location_name: string | null
          verification_score: number | null
          confidence_score: number | null
          verification_data: Json | null
          ai_reasoning: string | null
          verification_reasoning: string | null
          status: string
          is_deleted: boolean
          is_anonymous: boolean
          view_count: number
          before_description: string | null
          after_description: string | null
          created_at: string
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category?: string | null
          action_type?: string | null
          location?: string | null
          before_image_url: string
          after_image_url: string
          latitude?: number | null
          longitude?: number | null
          location_name?: string | null
          verification_score?: number | null
          confidence_score?: number | null
          verification_data?: Json | null
          ai_reasoning?: string | null
          verification_reasoning?: string | null
          status?: string
          is_deleted?: boolean
          is_anonymous?: boolean
          view_count?: number
          before_description?: string | null
          after_description?: string | null
          created_at?: string
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string | null
          action_type?: string | null
          location?: string | null
          before_image_url?: string
          after_image_url?: string
          latitude?: number | null
          longitude?: number | null
          location_name?: string | null
          verification_score?: number | null
          confidence_score?: number | null
          verification_data?: Json | null
          ai_reasoning?: string | null
          verification_reasoning?: string | null
          status?: string
          is_deleted?: boolean
          is_anonymous?: boolean
          view_count?: number
          before_description?: string | null
          after_description?: string | null
          created_at?: string
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'proofs_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      share_events: {
        Row: {
          id: string
          proof_id: string
          user_id: string | null
          share_type: string
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          proof_id: string
          user_id?: string | null
          share_type: string
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          proof_id?: string
          user_id?: string | null
          share_type?: string
          ip_address?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'share_events_proof_id_fkey'
            columns: ['proof_id']
            isOneToOne: false
            referencedRelation: 'proofs'
            referencedColumns: ['id']
          },
        ]
      }
      moderation_flags: {
        Row: {
          id: string
          proof_id: string
          flagged_by: string | null
          reporter_id: string | null
          user_id: string | null
          reason: string
          status: string
          created_at: string
          resolved_at: string | null
          moderator_notes: string | null
          resolved_by: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          proof_id: string
          flagged_by?: string | null
          reporter_id?: string | null
          user_id?: string | null
          reason: string
          status?: string
          created_at?: string
          resolved_at?: string | null
          moderator_notes?: string | null
          resolved_by?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          proof_id?: string
          flagged_by?: string | null
          reporter_id?: string | null
          user_id?: string | null
          reason?: string
          status?: string
          created_at?: string
          resolved_at?: string | null
          moderator_notes?: string | null
          resolved_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'moderation_flags_proof_id_fkey'
            columns: ['proof_id']
            isOneToOne: false
            referencedRelation: 'proofs'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
