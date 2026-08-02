'use client'

import { useRouter } from 'next/navigation'
import { useProofs } from '@/hooks/useProofs'
import { ProofCard } from './ProofCard'
import { ProofCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/shared/EmptyState'

export function ProofList() {
  const router = useRouter()
  const { proofs, isLoading, error, refetch } = useProofs()

  function handleDeleted() {
    refetch()
    // DashboardStats is server-rendered from the same data, so refresh the
    // route too or the stats cards would keep showing the deleted proof.
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProofCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return <EmptyState title="Error" description={error} />
  }

  if (proofs.length === 0) {
    return (
      <EmptyState
        title="No proofs yet"
        description="Be the first to submit your impact proof!"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {proofs.map((proof) => (
        <ProofCard key={proof.id} proof={proof} onDeleted={handleDeleted} />
      ))}
    </div>
  )
}
