import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

async function migrate() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const sqlPath = path.join(__dirname, 'seed.sql')
  const sql = fs.readFileSync(sqlPath, 'utf-8')

  console.log('Running database migration...')

  const { error } = await supabase.rpc('exec_sql', { sql })

  if (error) {
    console.error('Migration failed:', error.message)
    process.exit(1)
  }

  console.log('Migration completed successfully')
}

migrate().catch(console.error)
