export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', authRequired: true },
  { label: 'Submit Proof', href: '/submit', authRequired: true },
  { label: 'Leaderboard', href: '/leaderboard', authRequired: false },
] as const

export const AUTH_ROUTES = ['/login', '/register'] as const
export const PROTECTED_ROUTES = ['/dashboard', '/submit', '/admin'] as const
export const PUBLIC_ROUTES = ['/', '/leaderboard', '/proof'] as const
