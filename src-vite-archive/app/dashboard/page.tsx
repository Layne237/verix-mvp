import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Header from '../../components/Header'
import MaterialIcon from '../../components/MaterialIcon'
import StatusPill from '../../components/StatusPill'

const USER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAvXMwPMmPM0pHjZuNI-kVWNjyplSQM42o0Ci6hGE2w4A3SQGYE6A9RrtTFalI6eVneDQnrZzd8AATYbmKgZ2zAHTSXqRtw4LPdfxx79XBrsmNzD4sR50S10vT0Ywo_O_hkT-WOH-k-VygWCUAuur0YAls49pfoSmNgW6PqQ2TKU1V11fbtKLNNUZyNQV9C4GflPPkxy3dZlXAiLp5NmKQO59lDBTvxMcgJOMezFP6mF_L1CxhWanI03e6WBK2evEbMMqtr0ffgKP5g'

type ProofStatus = 'verified' | 'pending' | 'flagged'

type Proof = {
  id: string
  title: string
  image: string
  status: ProofStatus
  confidence: number
  timeAgo: string
}

const INITIAL_PROOFS: Proof[] = [
  {
    id: 'central-park-river-cleanup',
    title: 'Central Park River Cleanup',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Pk4bMYQ1zBrrk-IxyB0xOQmqkkcbkSQc9WH_Mf8R9JsD3gFy0yjcVnaWUYLFrmfHohqt8xkkCNAO512MnyEMS7SGKOap7aSX7fO_YivhcnVhqw4iSyJyD8uLl35F8VRIpVp_6h35KgNAhyQC405osFagTKPuXlIgaupA_tDOu61LU06QH_mpCBrtvsgL2F1hLDe8Evm6tD1PGIHXZAbJlYnF3cSWU8r23nX2VEk3msfb7Q1kbGea9sfZrOrx1Y-IVnBw3neHh_da',
    status: 'verified',
    confidence: 96,
    timeAgo: '2 days ago',
  },
  {
    id: 'urban-reforestation-project',
    title: 'Urban Reforestation Project',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0LlLj7_Dlt2iiTFVd8qA9SHQTY56O_rQz0aq09WJNmFQpRU-607C-dQXbMrCUs3WijEV8EcKbSelhamhLgJFoTrh8_in7Ji111GO6EK2gMflMKK6Zxtvhxf9PiPFM_8WMrDIe9cq3fZawOJ3hlCm4poOB982J5ByzOysivHtNESE6oZ_TatgnoMYmMtCxP9TvGi8yutasiRoxXOefUmvwWY0FGnydoptlVnlFBjSCEL37MWsZnvcTRJCLOTNv5HkT586pRLajNyWz',
    status: 'pending',
    confidence: 72,
    timeAgo: '5 days ago',
  },
  {
    id: 'downtown-recycling-drive',
    title: 'Downtown Recycling Drive',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8OEwJCC1bilxbx1fzxV9b4vKPUL856WpAZJtypLQVTtr1ZYeMj_jm7kGX0Can-ypZY6-mAKEPtgzdIgdCKaDz-lrnopckyByc9reyIrP00B15_-IdmtUK6IoZLcV743o2TN_E3f6kqBuCBIxP8-CLUs_S047z8ovzgkapmpg3uOTkX8xv1qK28CyuYKq-3CcyBOYMgalvdDowPPrpwBR33pEim1nZU0KT2h5qsAULR0rQvWlyf9LZFK-bPHIikfFqYtBa6q2lRGRY',
    status: 'flagged',
    confidence: 41,
    timeAgo: '1 week ago',
  },
]

function ProofCard({
  proof,
  onDelete,
}: {
  proof: Proof
  onDelete: (id: string) => void
}) {
  return (
    <div className="border-outline-variant proof-card-shadow group overflow-hidden rounded-xl border bg-white">
      <div className="flex gap-4 p-4">
        <div className="bg-surface-container-high border-outline-variant h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
          <img
            className="h-full w-full object-cover"
            alt={proof.title}
            src={proof.image}
          />
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <div>
            <h3 className="text-label-md font-label-md text-on-surface line-clamp-1">
              {proof.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <StatusPill status={proof.status} />
              <span className="bg-surface-container text-on-surface-variant border-outline-variant inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold">
                {proof.confidence}% Confidence
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-label-sm text-on-surface-variant">
              {proof.timeAgo}
            </span>
            <div className="flex gap-2">
              <Link
                to={`/proof/${proof.id}`}
                className="text-label-sm flex items-center gap-1 font-bold text-secondary hover:underline"
              >
                <MaterialIcon name="visibility" className="text-[16px]" />
                View Page
              </Link>
              <button
                type="button"
                onClick={() => onDelete(proof.id)}
                className="text-error text-label-sm flex items-center gap-1 font-bold hover:underline"
              >
                <MaterialIcon name="delete" className="text-[16px]" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [proofs, setProofs] = useState<Proof[]>(INITIAL_PROOFS)

  function handleDelete(id: string) {
    setProofs((prev) => prev.filter((proof) => proof.id !== id))
  }

  const avgConfidence = proofs.length
    ? Math.round(
        proofs.reduce((sum, proof) => sum + proof.confidence, 0) / proofs.length
      )
    : 0

  return (
    <div className="text-on-surface font-body-md flex min-h-screen flex-col bg-background">
      <Header avatarUrl={USER_AVATAR} showNav={false} />

      <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex-grow py-8">
        <div className="mb-8">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface">
            My Impact Portfolio
          </h1>
          <p className="text-body-md text-on-surface-variant mt-2">
            Verified tracking of your civic and environmental contributions.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low border-outline-variant flex flex-col items-center rounded-xl border p-5 text-center">
            <span className="text-label-sm text-on-surface-variant mb-1">
              Total Verified
            </span>
            <span className="text-display-lg font-display-lg leading-none text-primary">
              {proofs.length}
            </span>
          </div>
          <div className="bg-surface-container-low border-outline-variant flex flex-col items-center rounded-xl border p-5 text-center">
            <span className="text-label-sm text-on-surface-variant mb-1">
              Avg. Confidence
            </span>
            <span className="text-display-lg font-display-lg leading-none text-secondary">
              {avgConfidence}%
            </span>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-headline-md font-headline-md text-on-surface">
            Submissions
          </h2>
          <Button to="/submit-proof" className="!px-4 !py-2">
            <MaterialIcon name="add" className="text-[18px]" />
            Submit Proof
          </Button>
        </div>

        {proofs.length > 0 ? (
          <div className="space-y-4">
            {proofs.map((proof) => (
              <ProofCard key={proof.id} proof={proof} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="bg-surface-container border-outline-variant mb-6 flex h-20 w-20 items-center justify-center rounded-full border">
              <MaterialIcon
                name="upload_file"
                className="text-outline text-4xl"
              />
            </div>
            <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
              No impact proof yet?
            </h3>
            <p className="text-body-md text-on-surface-variant mx-auto mb-8 max-w-sm">
              Start by submitting your first cleanup or action to build your
              verified portfolio!
            </p>
            <Button to="/submit-proof" size="lg">
              Submit Your First Proof
            </Button>
          </div>
        )}
      </main>

      <footer className="bg-surface-container-low border-outline-variant mt-auto w-full border-t">
        <div className="gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 py-8 md:grid-cols-2">
          <div>
            <p className="text-headline-md font-headline-md mb-2 font-bold text-primary">
              Verix
            </p>
            <p className="text-body-md text-on-tertiary-fixed-variant max-w-sm">
              Dedicated to institutional transparency and civic duty.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4 md:items-end">
            <div className="flex gap-6">
              <a
                href="#"
                className="text-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
              >
                About
              </a>
              <Link
                to="/submit-proof"
                className="text-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
              >
                Submit
              </Link>
              <Link
                to="/leaderboard"
                className="text-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
              >
                Leaderboard
              </Link>
            </div>
            <p className="text-label-sm text-on-tertiary-fixed-variant">
              © 2026 Verix.
            </p>
          </div>
        </div>
      </footer>

      <Link
        to="/submit-proof"
        className="text-on-primary fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-lg transition-transform active:scale-90 md:hidden"
      >
        <MaterialIcon name="add" className="text-2xl" />
      </Link>
    </div>
  )
}
