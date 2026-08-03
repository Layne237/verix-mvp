import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

/**
 * Plain anon-key client with no cookie/session handling - for reads that
 * are genuinely public (RLS already allows anon SELECT, e.g. "viewable by
 * everyone" on proofs/profiles). Deliberately NOT createServerClient from
 * lib/supabase/server.ts: that one calls next/headers' cookies(), which
 * forces every route/page that uses it into fully dynamic rendering even
 * when the query itself doesn't need a session - defeating page-level
 * `revalidate` caching for otherwise-public data like the leaderboard.
 */
export function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
