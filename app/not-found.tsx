import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-primary sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Page Not Found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button size="lg">Go Home</Button>
        </Link>
        <Link href="/leaderboard">
          <Button variant="outline" size="lg">
            Browse Leaderboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
