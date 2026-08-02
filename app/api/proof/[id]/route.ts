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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Soft delete, matching how /api/proof (list) and the public proof page
    // already filter is_deleted - and only the owner may delete their proof.
    const { data, error } = await supabase
      .from('proofs')
      .update({ is_deleted: true })
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .select()
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Proof not found or you do not have permission to delete it' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete proof error:', error)
    return NextResponse.json(
      { error: 'Failed to delete proof' },
      { status: 500 }
    )
  }
}
