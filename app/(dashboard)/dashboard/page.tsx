import { auth } from '@/auth'
import { createServerClient } from '@/lib/supabase/server'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { ProofList } from '@/components/proof/ProofList'
import { UserAvatar } from '@/components/ui/avatar'

async function getStats(userId: string) {
  const supabase = createServerClient()
  const { data: proofs } = await supabase
    .from('proofs')
    .select('status, verification_score')
    .eq('user_id', userId)
    .eq('is_deleted', false)

  const total = proofs?.length || 0
  const verified = proofs?.filter((p) => p.status === 'verified').length || 0
  const scored = proofs?.filter((p) => p.verification_score !== null) || []
  const averageScore = scored.length
    ? Math.round(
        scored.reduce((sum, p) => sum + (p.verification_score || 0), 0) /
          scored.length
      )
    : 0

  return { total, verified, averageScore }
}

export default async function DashboardPage() {
  const session = await auth()
  let stats = { total: 0, verified: 0, averageScore: 0 }

  if (session?.user?.id) {
    try {
      stats = await getStats(session.user.id)
    } catch (error) {
      console.error('Dashboard stats fetch error:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <UserAvatar
          name={session?.user?.name}
          image={session?.user?.image}
          size="lg"
        />
        <div>
          <h1 className="text-3xl font-bold">
            {session?.user?.name
              ? `Welcome back, ${session.user.name}`
              : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            Track your impact and manage your proofs
          </p>
        </div>
      </div>

      <DashboardStats
        totalProofs={stats.total}
        verifiedProofs={stats.verified}
        averageScore={stats.averageScore}
      />

      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Proofs</h2>
        <ProofList />
      </div>
    </div>
  )
}
