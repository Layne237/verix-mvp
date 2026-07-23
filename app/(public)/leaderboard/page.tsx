import { getLeaderboard, type LeaderboardRankEntry } from '@/lib/leaderboard'
import { LeaderboardTable } from '@/components/dashboard/LeaderboardTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function mapEntries(ranked: LeaderboardRankEntry[]) {
  return ranked.map((entry) => ({
    rank: entry.rank,
    user: {
      name: entry.name,
      avatar_url: entry.avatar,
    },
    totalProofs: entry.total,
    verifiedProofs: entry.total,
    averageScore: entry.averageScore,
  }))
}

export default async function LeaderboardPage() {
  let entries: ReturnType<typeof mapEntries> = []
  let loadError = false

  try {
    const ranked = await getLeaderboard(50)
    entries = mapEntries(ranked)
  } catch (error) {
    console.error('Leaderboard fetch error:', error)
    loadError = true
  }

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
            {loadError ? (
              <p className="py-8 text-center text-muted-foreground">
                Couldn&apos;t load the leaderboard right now. Please try again
                shortly.
              </p>
            ) : entries.length > 0 ? (
              <LeaderboardTable entries={entries} />
            ) : (
              <p className="py-8 text-center text-muted-foreground">
                No verified proofs yet. Be the first to make the leaderboard!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
