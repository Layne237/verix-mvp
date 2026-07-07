import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { count: totalProofs } = await supabase
      .from('proofs')
      .select('*', { count: 'exact', head: true })

    const { count: verifiedProofs } = await supabase
      .from('proofs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'verified')

    const { count: flaggedProofs } = await supabase
      .from('proofs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'flagged')

    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    const { data: avgScore } = await supabase
      .from('proofs')
      .select('verification_score')
      .not('verification_score', 'is', null)

    const averageScore = avgScore && avgScore.length > 0
      ? Math.round(
          avgScore.reduce((acc, p) => acc + (p.verification_score || 0), 0) /
            avgScore.length
        )
      : 0

    return NextResponse.json({
      success: true,
      data: {
        totalProofs,
        verifiedProofs,
        flaggedProofs,
        totalUsers,
        averageScore,
      },
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
