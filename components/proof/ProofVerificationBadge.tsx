import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
} from 'lucide-react'
import { getVerificationBadge } from '@/lib/ai/validators'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProofVerificationBadgeProps {
  score: number | null
  className?: string
}

const badgeConfig = {
  high: {
    label: 'Highly Verified',
    className: 'bg-verified-high text-black',
    icon: Shield,
  },
  standard: {
    label: 'Verified',
    className: 'bg-verified-standard text-white',
    icon: CheckCircle2,
  },
  partial: {
    label: 'Partially Verified',
    className: 'bg-verified-partial text-black',
    icon: AlertTriangle,
  },
  none: {
    label: 'Unverified',
    className: 'bg-verified-none text-white',
    icon: XCircle,
  },
}

export function ProofVerificationBadge({
  score,
  className,
}: ProofVerificationBadgeProps) {
  if (score === null) {
    return (
      <Badge variant="pending" className={cn('gap-1', className)}>
        <Clock className="h-3.5 w-3.5" />
        Pending Review
      </Badge>
    )
  }

  const level = getVerificationBadge(score)
  const { label, className: tierClassName, icon: Icon } = badgeConfig[level]

  return (
    <Badge className={cn('gap-1', tierClassName, className)}>
      <Icon className="h-3.5 w-3.5" />
      {label} ({score}%)
    </Badge>
  )
}
