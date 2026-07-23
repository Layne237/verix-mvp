'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/useToast'

interface ProofShareButtonsProps {
  proofId: string
  title: string
}

export function ProofShareButtons({ proofId, title }: ProofShareButtonsProps) {
  const toast = useToast()

  // Computed lazily inside handlers (not at render time) since this
  // component is server-rendered first, and `window` isn't defined there.
  function getUrl() {
    return `${window.location.origin}/proof/${proofId}`
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl())
      toast.success('Link copied to clipboard!')
    } catch {
      toast.error('Failed to copy link')
    }
  }

  async function shareOnTwitter() {
    const text = encodeURIComponent(`Check out this impact proof: ${title}`)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(getUrl())}`,
      '_blank'
    )
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={copyLink}>
        Copy Link
      </Button>
      <Button variant="outline" size="sm" onClick={shareOnTwitter}>
        Share on X
      </Button>
    </div>
  )
}
