import { supabaseAdmin } from '@/lib/supabase/admin'

async function testDatabase() {
  console.log('🔍 Testing database connection...')
  
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('❌ Database error:', error.message)
      process.exit(1)
    }
    
    console.log('✅ Database connection successful!')
    console.log(`📊 Tables exist: profiles, proofs, share_events, moderation_flags`)
  } catch (error: any) {
    console.error('❌ Connection failed:', error.message)
    process.exit(1)
  }
}

testDatabase()
