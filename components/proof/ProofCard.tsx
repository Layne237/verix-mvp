'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ProofVerificationBadge } from './ProofVerificationBadge'
import { formatRelativeTime } from '@/lib/utils/date'
import { formatCategory } from '@/lib/utils/strings'
import { useToast } from '@/hooks/useToast'
import type { Proof } from '@/types'

interface ProofCardProps {
  proof: Proof
  /** Called after a successful delete so the parent list can refetch/update. */
  onDeleted?: () => void
}

export function ProofCard({ proof, onDeleted }: ProofCardProps) {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch(`/api/proof/${proof.id}`, { method: 'DELETE' })
      const body = await res.json()

      if (!res.ok) throw new Error(body.error || 'Failed to delete proof')

      toast.success('Proof deleted')
      setOpen(false)
      onDeleted?.()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete proof'
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="relative h-full">
      {/* The delete control lives outside the <Link> below - a <button>
          nested inside an <a> is invalid HTML and fights the link's own
          click handling. */}
      <div className="absolute right-2 top-2 z-10">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8 rounded-full opacity-90"
              aria-label="Delete proof"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete this proof?</DialogTitle>
              <DialogDescription>
                &ldquo;{proof.title}&rdquo; will be removed from your dashboard
                and the public leaderboard. This cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Link href={`/proof/${proof.id}`} className="block h-full">
        <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
          <div className="relative grid grid-cols-2">
            {/* before/after_image_url are base64 data URIs (see
                lib/utils/image.ts), not remote/relative paths, so
                next/image's optimizer can't handle them. */}
            <div className="relative h-48">
              <img
                src={proof.before_image_url}
                alt="Before"
                loading="lazy"
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
                loading="lazy"
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
    </div>
  )
}
