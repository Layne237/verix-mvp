import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProofVerificationBadge } from '@/components/proof/ProofVerificationBadge'
import { ProofShareButtons } from '@/components/proof/ProofShareButtons'
import { formatDate } from '@/lib/utils/date'
import { formatCategory } from '@/lib/utils/strings'
import type { Metadata } from 'next'

interface ProofPageProps {
  params: { id: string }
}

export async function generateMetadata({
  params,
}: ProofPageProps): Promise<Metadata> {
  const supabase = createServerClient()
  const { data: proof } = await supabase
    .from('proofs')
    .select('title')
    .eq('id', params.id)
    .single()

  if (!proof) return { title: 'Proof Not Found' }

  return {
    title: proof.title,
    description: `View verified impact proof: ${proof.title}`,
  }
}

export default async function ProofPage({ params }: ProofPageProps) {
  const supabase = createServerClient()
  const { data: proof } = await supabase
    .from('proofs')
    .select('*')
    .eq('id', params.id)
    .eq('is_deleted', false)
    .single()

  if (!proof) notFound()

  const reasoning = proof.ai_reasoning || proof.verification_reasoning

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{proof.title}</h1>
            <p className="mt-2 text-muted-foreground">
              {formatCategory(proof.action_type)} &middot;{' '}
              {formatDate(proof.created_at)}
            </p>
          </div>
          <ProofVerificationBadge score={proof.verification_score} />
        </div>

        {/* before/after_image_url are base64 data URIs (see lib/utils/image.ts),
            not remote/relative paths, so next/image's optimizer can't handle them. */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Before</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video">
                <img
                  src={proof.before_image_url}
                  alt="Before"
                  className="h-full w-full rounded-b-lg object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">After</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video">
                <img
                  src={proof.after_image_url}
                  alt="After"
                  className="h-full w-full rounded-b-lg object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {proof.description && (
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{proof.description}</p>
            </CardContent>
          </Card>
        )}

        {reasoning && (
          <Card>
            <CardHeader>
              <CardTitle>AI Verification Reasoning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {reasoning}
              </p>
            </CardContent>
          </Card>
        )}

        <ProofShareButtons proofId={proof.id} title={proof.title} />
      </div>
    </div>
  )
}
