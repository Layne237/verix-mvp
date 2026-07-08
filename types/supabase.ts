export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin' | 'moderator'
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          is_verified?: boolean
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
          action_type: string
          before_image_url: string
          after_image_url: string
          latitude: number | null
          longitude: number | null
          location_name: string | null
          verification_score: number | null
          verification_data: Json | null
          verification_reasoning: string | null
          status: string
          is_deleted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          action_type: string
          before_image_url: string
          after_image_url: string
          latitude?: number | null
          longitude?: number | null
          location_name?: string | null
          verification_score?: number | null
          verification_data?: Json | null
          verification_reasoning?: string | null
          status?: string
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          action_type?: string
          before_image_url?: string
          after_image_url?: string
          latitude?: number | null
          longitude?: number | null
          location_name?: string | null
          verification_score?: number | null
          verification_data?: Json | null
          verification_reasoning?: string | null
          status?: string
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proofs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      share_events: {
        Row: {
          id: string
          proof_id: string
          user_id: string
          share_type: string
          created_at: string
        }
        Insert: {
          id?: string
          proof_id: string
          user_id: string
          share_type: string
          created_at?: string
        }
        Update: {
          id?: string
          proof_id?: string
          user_id?: string
          share_type?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "share_events_proof_id_fkey"
            columns: ["proof_id"]
            isOneToOne: false
            referencedRelation: "proofs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "share_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "flags_proof_id_fkey"
            columns: ["proof_id"]
            isOneToOne: false
            referencedRelation: "proofs"
            referencedColumns: ["id"]
          }
        ]
      }
      moderation_flags: {
        Row: {
          id: string
          proof_id: string
          flagged_by: string
          reason: string
          status: string
          resolved_by: string | null
          resolved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          proof_id: string
          flagged_by: string
          reason: string
          status?: string
          resolved_by?: string | null
          resolved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          proof_id?: string
          flagged_by?: string
          reason?: string
          status?: string
          resolved_by?: string | null
          resolved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderation_flags_proof_id_fkey"
            columns: ["proof_id"]
            isOneToOne: false
            referencedRelation: "proofs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_flags_flagged_by_fkey"
            columns: ["flagged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
