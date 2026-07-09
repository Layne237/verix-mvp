import { useParams } from 'react-router-dom'

export default function PublicProofPage() {
  const { proofId } = useParams()

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface text-on-surface">
      <h1 className="text-headline-lg font-semibold text-primary">
        Verix — Public Proof Page {proofId ? `(#${proofId})` : ''}
      </h1>
    </main>
  )
}
