import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const TEST_EMAIL = 'test@verix.dev'
const TEST_PASSWORD = 'Test1234!'
const TEST_NAME = 'Test User'

async function createTestUser() {
  // Imported after dotenv.config() runs, since lib/supabase/admin.ts reads
  // process.env at module-load time.
  const { supabaseAdmin } = await import('../lib/supabase/admin')

  console.log(`Creating test user: ${TEST_EMAIL}`)

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: TEST_NAME },
  })

  if (error) {
    if (error.message.toLowerCase().includes('already been registered')) {
      console.log('✅ Test user already exists - you can sign in with it.')
      printCredentials()
      return
    }
    console.error('❌ Failed to create user:', error.message)
    process.exit(1)
  }

  if (!data.user) {
    console.error('❌ createUser returned no user')
    process.exit(1)
  }

  const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
    id: data.user.id,
    email: TEST_EMAIL,
    name: TEST_NAME,
    display_name: TEST_NAME,
  })

  if (profileError) {
    console.error(
      '❌ User created but profile insert failed:',
      profileError.message
    )
    process.exit(1)
  }

  console.log('✅ Test user created.')
  printCredentials()
}

function printCredentials() {
  console.log('')
  console.log('   Email:    ' + TEST_EMAIL)
  console.log('   Password: ' + TEST_PASSWORD)
  console.log('')
  console.log('Sign in at http://localhost:3000/login')
}

createTestUser().catch((error) => {
  console.error(
    '❌ Unexpected error:',
    error instanceof Error ? error.message : error
  )
  process.exit(1)
})
