import { cn } from '@/lib/utils'

/**
 * Base pulse placeholder. Uses the theme's `muted` token rather than a flat
 * gray so it stays legible in dark mode too.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

/** Mirrors ProofCard's layout: image, title, subtitle, action row. */
export function ProofCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9 shrink-0" />
        </div>
      </div>
    </div>
  )
}

/** 5 rows: rank/medal, avatar, name, score - matches LeaderboardTable's columns. */
export function LeaderboardSkeleton() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-40 flex-1" />
          <Skeleton className="ml-auto h-6 w-12" />
        </div>
      ))}
    </div>
  )
}

/** Stats row (3 cards) + a 6-card proof grid, matching the real dashboard layout. */
export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-lg border p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      <div>
        <Skeleton className="mb-4 h-6 w-40" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProofCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
