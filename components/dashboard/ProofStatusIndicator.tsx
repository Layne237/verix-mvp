import { cn } from '@/lib/utils'

interface ProofStatusIndicatorProps {
  status: 'pending' | 'verified' | 'flagged' | 'rejected'
  score?: number | null
}

const statusConfig = {
  pending: { label: 'Pending Review', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
  verified: { label: 'Verified', color: 'bg-green-500', textColor: 'text-green-500' },
  flagged: { label: 'Flagged', color: 'bg-red-500', textColor: 'text-red-500' },
  rejected: { label: 'Rejected', color: 'bg-gray-500', textColor: 'text-gray-500' },
}

export function ProofStatusIndicator({ status, score }: ProofStatusIndicatorProps) {
  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-2">
      <div className={cn('h-2 w-2 rounded-full', config.color)} />
      <span className={cn('text-sm font-medium', config.textColor)}>
        {config.label}
        {score !== null && score !== undefined && ` (${score}%)`}
      </span>
    </div>
  )
}
