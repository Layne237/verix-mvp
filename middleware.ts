import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import { isMockAuthEnabled } from '@/lib/mock-auth'

/**
 * A separate, minimal NextAuth instance for middleware - deliberately NOT
 * the full config from lib/auth/config.ts. That config's Credentials
 * provider imports @supabase/supabase-js at module scope, which would get
 * bundled into this file's Edge runtime and can break there. Verifying an
 * existing session JWT only needs the shared secret, not the providers
 * (those only run in the Node.js /api/auth route), so an empty provider
 * list is enough here and keeps this file Edge-safe.
 */
const { auth } = NextAuth({
  pages: { signIn: '/login' },
  providers: [],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  // See the matching comment in lib/auth/config.ts - this project's
  // NEXTAUTH_URL naming doesn't satisfy Auth.js's auto-trust detection.
  trustHost: true,
})

const PROTECTED_PREFIXES = ['/dashboard', '/submit', '/settings']
const AUTH_PAGES = ['/login', '/register']

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

export default auth((req) => {
  // Dev-only: mirrors AuthGuard's mock-auth bypass so previewing pages
  // locally with no real backend isn't blocked at the network layer too.
  if (isMockAuthEnabled) {
    return NextResponse.next()
  }

  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  if (matchesPrefix(pathname, PROTECTED_PREFIXES) && !isAuthenticated) {
    const loginUrl = new URL('/login', req.nextUrl)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (AUTH_PAGES.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
}
