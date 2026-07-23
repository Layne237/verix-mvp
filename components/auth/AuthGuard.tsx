'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { isMockAuthEnabled } from '@/lib/mock-auth'

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (isMockAuthEnabled) return
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    if (requireAdmin && session?.user?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [status, session, router, requireAdmin])

  // Dev-only: preview auth-gated pages with no real backend behind them.
  if (isMockAuthEnabled) {
    return <>{children}</>
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
