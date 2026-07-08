import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true })
    
    if (error) throw error
    
    return NextResponse.json({
      status: '✅ Connected',
      message: 'Supabase connection successful!',
      timestamp: new Date().toISOString(),
      database: process.env.NEXT_PUBLIC_SUPABASE_URL?.split('.')[0].replace('https://', '')
    })
  } catch (error: any) {
    return NextResponse.json({
      status: '❌ Failed',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
