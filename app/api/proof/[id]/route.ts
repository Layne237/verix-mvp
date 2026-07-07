import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()
    const { data: proof, error } = await supabase
      .from('proofs')
      .select('*, profiles(name, avatar_url)')
      .eq('id', params.id)
      .single()

    if (error || !proof) {
      return NextResponse.json({ error: 'Proof not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: proof })
  } catch (error) {
    console.error('Get proof error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch proof' },
      { status: 500 }
    )
  }
}
