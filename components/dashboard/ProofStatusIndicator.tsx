import { cn } from '@/lib/utils'

interface ProofStatusIndicatorProps {
  status: 'pending' | 'verified' | 'flagged' | 'rejected'
  score?: number | null
}

const statusConfig = {
  pending: {
    label: 'Pending Review',
    color: 'bg-verified-partial',
    textColor: 'text-verified-partial',
  },
  verified: {
    label: 'Verified',
    color: 'bg-verified-standard',
    textColor: 'text-verified-standard',
  },
  flagged: {
    label: 'Flagged',
    color: 'bg-verified-none',
    textColor: 'text-verified-none',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-muted-foreground',
    textColor: 'text-muted-foreground',
  },
}

export function ProofStatusIndicator({
  status,
  score,
}: ProofStatusIndicatorProps) {
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
