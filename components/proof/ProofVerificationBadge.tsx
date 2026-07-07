import { getVerificationBadge } from '@/lib/ai/validators'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProofVerificationBadgeProps {
  score: number | null
  className?: string
}

const badgeConfig = {
  high: { label: 'Highly Verified', className: 'bg-verified-high text-black' },
  standard: { label: 'Verified', className: 'bg-verified-standard text-white' },
  partial: { label: 'Partially Verified', className: 'bg-verified-partial text-black' },
  none: { label: 'Unverified', className: 'bg-verified-none text-white' },
}

export function ProofVerificationBadge({ score, className }: ProofVerificationBadgeProps) {
  if (score === null) {
    return <Badge variant="pending">Pending Review</Badge>
  }

  const level = getVerificationBadge(score)
  const config = badgeConfig[level]

  return (
    <Badge className={cn(config.className, className)}>
      {config.label} ({score}%)
    </Badge>
  )
}
