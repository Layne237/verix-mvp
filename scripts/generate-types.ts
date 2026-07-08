import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID

if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_PROJECT_ID not set in .env.local')
  process.exit(1)
}

console.log('🔄 Generating Supabase types...')

try {
  const output = execSync(
    `npx supabase gen types typescript --project-id ${projectId}`,
    { encoding: 'utf-8' }
  )
  
  const typesDir = path.join(process.cwd(), 'types')
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true })
  }
  
  const outputPath = path.join(typesDir, 'supabase.ts')
  fs.writeFileSync(outputPath, output)
  
  console.log('✅ Database types generated successfully!')
  console.log(`📁 File created: ${outputPath}`)
} catch (error: any) {
  console.error('❌ Failed to generate types:', error.message)
  console.error('⚠️  Using local type definitions. Run with network access to fetch live schema.')
  process.exit(0)
}
