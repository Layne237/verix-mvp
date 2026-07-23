import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: proofs, error } = await supabase
      .from('proofs')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data: proofs })
  } catch (error) {
    console.error('List proofs error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch proofs' },
      { status: 500 }
    )
  }
}
