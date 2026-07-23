import { NextResponse } from 'next/server'
import { getLeaderboard } from '@/lib/leaderboard'

export async function GET() {
  try {
    const ranked = await getLeaderboard(50)
    return NextResponse.json({ success: true, data: ranked })
  } catch (error) {
    console.error('Leaderboard error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
