import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ProofVerificationBadge } from './ProofVerificationBadge'
import { formatRelativeTime } from '@/lib/utils/date'
import { formatCategory } from '@/lib/utils/strings'
import type { Proof } from '@/types'

interface ProofCardProps {
  proof: Proof
}

export function ProofCard({ proof }: ProofCardProps) {
  return (
    <Link href={`/proof/${proof.id}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative grid grid-cols-2">
          <div className="relative h-48">
            {/* before/after_image_url are base64 data URIs (see lib/utils/image.ts),
                not remote/relative paths, so next/image's optimizer can't handle them. */}
            <img
              src={proof.before_image_url}
              alt="Before"
              className="h-full w-full object-cover"
            />
            <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
              Before
            </span>
          </div>
          <div className="relative h-48">
            <img
              src={proof.after_image_url}
              alt="After"
              className="h-full w-full object-cover"
            />
            <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
              After
            </span>
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold leading-tight">{proof.title}</h3>
            <ProofVerificationBadge score={proof.verification_score} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-xs text-muted-foreground">
            {formatCategory(proof.action_type)} &middot;{' '}
            {formatRelativeTime(proof.created_at)}
          </p>
          {proof.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {proof.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
