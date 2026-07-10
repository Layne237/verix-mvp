import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

async function testDatabase() {
  console.log('🔍 Testing database connection...')

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('❌ Missing Supabase credentials in .env.local')
    process.exit(1)
  }

  try {
    const response = await fetch(`${url}/rest/v1/profiles?limit=1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`)
    }

    const data = await response.json()

    // Test all expected tables exist
    const tables = ['profiles', 'proofs', 'share_events', 'moderation_flags']
    const results: string[] = []

    for (const table of tables) {
      const res = await fetch(`${url}/rest/v1/${table}?limit=1`, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      })
      results.push(`${table}: ${res.ok ? '✅' : '❌'}`)
    }

    console.log('✅ Database connection successful!')
    console.log('📊 Tables:')
    results.forEach((r) => console.log(`   ${r}`))
    console.log(`📈 Total rows across all tables: ${data.length} (in profiles)`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('❌ Connection failed:', message)
    process.exit(1)
  }
}

testDatabase()
