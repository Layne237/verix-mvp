import { createServerClient } from '@/lib/supabase/server'
import { LeaderboardTable } from '@/components/dashboard/LeaderboardTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function LeaderboardPage() {
  const supabase = createServerClient()
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .limit(50)

  const entries = (profiles || []).map((profile, index) => ({
    rank: index + 1,
    user: {
      name: profile.display_name,
      avatar_url: profile.avatar_url,
    },
    totalProofs: 0,
    verifiedProofs: 0,
    averageScore: 0,
  }))

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
            <LeaderboardTable entries={entries} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
