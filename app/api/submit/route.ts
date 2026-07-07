import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { analyzeImages } from '@/lib/ai/gemini'
import { fileToBase64, compressImage } from '@/lib/utils/image'
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

    const formData = await req.formData()
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const beforeFile = formData.get('beforeImage') as File
    const afterFile = formData.get('afterImage') as File
    const description = formData.get('description') as string | null
    const latitude = formData.get('latitude') as string | null
    const longitude = formData.get('longitude') as string | null
    const locationName = formData.get('locationName') as string | null

    const beforeBase64 = await fileToBase64(beforeFile)
    const afterBase64 = await fileToBase64(afterFile)

    const compressedBefore = await compressImage(beforeBase64)
    const compressedAfter = await compressImage(afterBase64)

    const verificationResult = await analyzeImages(beforeBase64, afterBase64)

    const { data: proof, error } = await supabase
      .from('proofs')
      .insert({
        user_id: session.user.id,
        title,
        description,
        category,
        before_image_url: compressedBefore,
        after_image_url: compressedAfter,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        location_name: locationName,
        verification_score: verificationResult.score,
        verification_data: verificationResult,
        status: verificationResult.score >= 30 ? 'verified' : 'pending',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data: proof }, { status: 201 })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json(
      { error: 'Failed to submit proof' },
      { status: 500 }
    )
  }
}
