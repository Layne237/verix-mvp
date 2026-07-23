import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { signInSchema } from '@/lib/validation/schemas'
import { supabaseAdmin } from '@/lib/supabase/admin'

/**
 * Credentials auth delegates password verification to Supabase Auth itself
 * (via the anon client's signInWithPassword) rather than storing/hashing
 * passwords again in NextAuth - Supabase already owns the user/password store.
 */
const supabaseAnon = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { data, error } = await supabaseAnon.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        })

        if (error || !data.user) return null

        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('name, display_name, role')
          .eq('id', data.user.id)
          .single()

        return {
          id: data.user.id,
          email: data.user.email,
          name: profile?.display_name || profile?.name || data.user.email,
          role: profile?.role || 'user',
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.id || !user.email) return false

      // Ensure a profiles row exists for OAuth sign-ins too (Credentials
      // users already have one from /api/auth/register).
      await supabaseAdmin.from('profiles').upsert(
        {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          display_name: user.name ?? null,
        },
        { onConflict: 'id', ignoreDuplicates: true }
      )

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.role = (user as { role?: string }).role || 'user'
      } else if (token.id && !token.role) {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('role')
          .eq('id', token.id)
          .single()
        token.role = profile?.role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}
