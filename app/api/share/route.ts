import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { proofId, platform } = await req.json()

    const { data: proof } = await supabase
      .from('proofs')
      .select('id, title')
      .eq('id', proofId)
      .single()

    if (!proof) {
      return NextResponse.json({ error: 'Proof not found' }, { status: 404 })
    }

    const shareUrl = `${process.env.NEXTAUTH_URL}/proof/${proof.id}`
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(proof.title)

    let redirectUrl: string
    switch (platform) {
      case 'twitter':
        redirectUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        break
      case 'facebook':
        redirectUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'linkedin':
        redirectUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      default:
        return NextResponse.json({ success: true, data: { url: shareUrl } })
    }

    return NextResponse.json({ success: true, data: { url: redirectUrl } })
  } catch (error) {
    console.error('Share error:', error)
    return NextResponse.json(
      { error: 'Failed to generate share link' },
      { status: 500 }
    )
  }
}
