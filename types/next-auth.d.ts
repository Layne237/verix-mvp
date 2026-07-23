import type { DefaultSession } from 'next-auth'

// Auth.js v5 re-exports Session/User from @auth/core/types, so augmenting
// 'next-auth' alone doesn't reach consumers like next-auth/react's
// useSession(), which imports the type from @auth/core/types directly.
declare module '@auth/core/types' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }

  interface User {
    role?: string
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string
    role: string
  }
}
