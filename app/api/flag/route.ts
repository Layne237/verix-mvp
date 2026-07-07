import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/redis/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { success } = await checkRateLimit(session.user.id)
    if (!success) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    const { proofId, reason } = await req.json()

    const { data: existingFlag } = await supabase
      .from('flags')
      .select('id')
      .eq('proof_id', proofId)
      .eq('user_id', session.user.id)
      .single()

    if (existingFlag) {
      return NextResponse.json(
        { error: 'You have already flagged this proof' },
        { status: 409 }
      )
    }

    const { error: flagError } = await supabase.from('flags').insert({
      proof_id: proofId,
      user_id: session.user.id,
      reason,
    })

    if (flagError) throw flagError

    await supabase
      .from('proofs')
      .update({ status: 'flagged' })
      .eq('id', proofId)

    return NextResponse.json(
      { success: true, message: 'Proof flagged for review' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Flag error:', error)
    return NextResponse.json(
      { error: 'Failed to flag proof' },
      { status: 500 }
    )
  }
}
