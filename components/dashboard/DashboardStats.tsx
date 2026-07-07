import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardStatsProps {
  totalProofs: number
  verifiedProofs: number
  averageScore: number
  rank?: number
}

export function DashboardStats({
  totalProofs,
  verifiedProofs,
  averageScore,
  rank,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Proofs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProofs}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verified</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{verifiedProofs}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {averageScore > 0 ? `${averageScore}%` : 'N/A'}
          </div>
        </CardContent>
      </Card>

      {rank && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{rank}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
