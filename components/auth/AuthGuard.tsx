'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { isMockAuthEnabled } from '@/lib/mock-auth'

interface AuthGuardProps {
  children: React.ReactNode
  /**
   * true (default): gate access, redirecting unauthenticated visitors away
   *   - used on dashboard/submit style pages.
   * false: the opposite direction, redirecting already-authenticated users
   *   away instead - used on login/register so a signed-in user can't sit
   *   on the auth forms.
   */
  requireAuth?: boolean
  /** Overrides the default redirect target for whichever direction applies. */
  redirectTo?: string
  requireAdmin?: boolean
}

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo,
  requireAdmin = false,
}: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  useEffect(() => {
    if (isMockAuthEnabled || isLoading) return

    if (requireAuth) {
      if (!isAuthenticated) {
        // Preserve the page the user was trying to reach so login can
        // send them back after a successful sign-in.
        const target = redirectTo || '/login'
        const callbackUrl = encodeURIComponent(pathname)
        router.push(`${target}?callbackUrl=${callbackUrl}`)
        return
      }
      if (requireAdmin && session?.user?.role !== 'admin') {
        router.push(redirectTo || '/dashboard')
      }
    } else if (isAuthenticated) {
      // e.g. an already-signed-in user landing on /login or /register.
      router.push(redirectTo || '/dashboard')
    }
  }, [
    isLoading,
    isAuthenticated,
    requireAuth,
    requireAdmin,
    session,
    redirectTo,
    pathname,
    router,
  ])

  // Dev-only: preview auth-gated pages with no real backend behind them.
  if (isMockAuthEnabled) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) return null
  if (requireAuth && requireAdmin && session?.user?.role !== 'admin')
    return null
  if (!requireAuth && isAuthenticated) return null

  return <>{children}</>
}
