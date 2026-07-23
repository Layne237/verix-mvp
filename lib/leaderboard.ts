import { createServerClient } from '@/lib/supabase/server'

export interface LeaderboardRankEntry {
  rank: number
  userId: string
  name: string | null
  avatar: string | null
  total: number
  score: number
  averageScore: number
}

/**
 * Ranks users by their average proof verification_score. Shared by
 * app/api/leaderboard (for client-side consumers) and the leaderboard page
 * (server-rendered) so both agree on the same ranking logic.
 */
export async function getLeaderboard(
  limit = 50
): Promise<LeaderboardRankEntry[]> {
  const supabase = createServerClient()
  const { data: proofs, error } = await supabase
    .from('proofs')
    .select('user_id, profiles(display_name, avatar_url), verification_score')
    .not('verification_score', 'is', null)
    .order('verification_score', { ascending: false })
    .limit(500)

  if (error) throw error

  const aggregated = (proofs || []).reduce<
    Record<
      string,
      {
        name: string | null
        avatar: string | null
        total: number
        score: number
      }
    >
  >((acc, entry) => {
    const userId = entry.user_id
    if (!acc[userId]) {
      acc[userId] = {
        name: entry.profiles?.display_name || null,
        avatar: entry.profiles?.avatar_url || null,
        total: 0,
        score: 0,
      }
    }
    acc[userId].total++
    acc[userId].score += entry.verification_score || 0
    return acc
  }, {})

  return Object.entries(aggregated)
    .map(([userId, data]) => ({
      userId,
      ...data,
      averageScore: Math.round(data.score / data.total),
    }))
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, limit)
    .map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }))
}
