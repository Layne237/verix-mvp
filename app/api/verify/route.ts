import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { analyzeImages } from '@/lib/ai/gemini'
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

    const { proofId } = await req.json()

    const { data: proof, error: fetchError } = await supabase
      .from('proofs')
      .select('*')
      .eq('id', proofId)
      .single()

    if (fetchError || !proof) {
      return NextResponse.json({ error: 'Proof not found' }, { status: 404 })
    }

    const beforeBase64 = proof.before_image_url
    const afterBase64 = proof.after_image_url

    const verificationResult = await analyzeImages(beforeBase64, afterBase64)

    const { error: updateError } = await supabase
      .from('proofs')
      .update({
        verification_score: verificationResult.score,
        verification_data: verificationResult,
        status: verificationResult.score >= 30 ? 'verified' : 'pending',
      })
      .eq('id', proofId)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      data: verificationResult,
    })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { error: 'Failed to verify proof' },
      { status: 500 }
    )
  }
}
