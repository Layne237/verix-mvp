import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data: leaderboard, error } = await supabase
      .from('proofs')
      .select(`
        user_id,
        profiles(display_name, avatar_url),
        verification_score
      `)
      .not('verification_score', 'is', null)
      .order('verification_score', { ascending: false })
      .limit(50)

    if (error) throw error

    const aggregated = (leaderboard || []).reduce<
      Record<string, { name: string | null; avatar: string | null; total: number; score: number }>
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

    const ranked = Object.entries(aggregated)
      .map(([userId, data]) => ({
        userId,
        ...data,
        averageScore: Math.round(data.score / data.total),
      }))
      .sort((a, b) => b.averageScore - a.averageScore)
      .map((entry, index) => ({
        rank: index + 1,
        ...entry,
      }))

    return NextResponse.json({ success: true, data: ranked })
  } catch (error) {
    console.error('Leaderboard error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
