/**
 * Dev-only escape hatch for previewing auth-gated pages before a real
 * Supabase project exists. Set NEXT_PUBLIC_MOCK_AUTH=true in .env.local.
 * Never enable this in a deployed environment - it fakes a logged-in
 * session entirely client-side, with no real backend behind it.
 */
export const isMockAuthEnabled = process.env.NEXT_PUBLIC_MOCK_AUTH === 'true'

export const MOCK_USER = {
  id: 'mock-user-id',
  name: 'Test User',
  email: 'test@verix.dev',
  image: null as string | null,
  role: 'user',
}
