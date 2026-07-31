'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl" role="img" aria-label="Warning">
        ⚠️
      </span>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
        Something Went Wrong
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={() => reset()}>
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" size="lg">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
