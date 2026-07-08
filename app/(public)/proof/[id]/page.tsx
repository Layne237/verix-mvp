import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProofVerificationBadge } from '@/components/proof/ProofVerificationBadge'
import { ProofShareButtons } from '@/components/proof/ProofShareButtons'
import { formatDate } from '@/lib/utils'
import { formatCategory } from '@/lib/utils/strings'
import type { Metadata } from 'next'

interface ProofPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: ProofPageProps): Promise<Metadata> {
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
    .single()

  if (!proof) notFound()

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

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Before</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={proof.before_image_url}
                  alt="Before"
                  fill
                  className="rounded-b-lg object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">After</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={proof.after_image_url}
                  alt="After"
                  fill
                  className="rounded-b-lg object-cover"
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

        {proof.verification_data && (
          <Card>
            <CardHeader>
              <CardTitle>Verification Details</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-md bg-muted p-4 text-sm">
                {JSON.stringify(proof.verification_data, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <ProofShareButtons proofId={proof.id} title={proof.title} />
      </div>
    </div>
  )
}
