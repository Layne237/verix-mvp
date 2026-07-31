import { LeaderboardSkeleton } from '@/components/ui/Skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Shown automatically by Next.js while the async LeaderboardPage server
// component fetches and ranks proofs server-side.
export default function LeaderboardLoading() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top impact contributors ranked by verified proofs
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <LeaderboardSkeleton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
