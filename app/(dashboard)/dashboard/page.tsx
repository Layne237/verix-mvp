import { AuthGuard } from '@/components/auth/AuthGuard'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { ProofList } from '@/components/proof/ProofList'

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your impact and manage your proofs
          </p>
        </div>

        <DashboardStats
          totalProofs={0}
          verifiedProofs={0}
          averageScore={0}
          rank={1}
        />

        <div>
          <h2 className="mb-4 text-xl font-semibold">Recent Proofs</h2>
          <ProofList />
        </div>
      </div>
    </AuthGuard>
  )
}
