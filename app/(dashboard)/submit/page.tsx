import { AuthGuard } from '@/components/auth/AuthGuard'
import { ProofSubmissionForm } from '@/components/proof/ProofSubmissionForm'

export default function SubmitPage() {
  return (
    <AuthGuard>
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Submit Impact Proof</h1>
          <p className="text-muted-foreground">
            Upload before and after photos to document your impact
          </p>
        </div>
        <ProofSubmissionForm />
      </div>
    </AuthGuard>
  )
}
