import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import GoldBadge from '../../components/GoldBadge'
import Header from '../../components/Header'
import MaterialIcon from '../../components/MaterialIcon'
import SubmitProofFab from '../../components/SubmitProofFab'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const HOW_IT_WORKS_STEPS = [
  {
    icon: 'upload_file',
    title: '1. Submit',
    body: 'Upload geotagged photos and metadata of your environmental or social action directly through our portal.',
  },
  {
    icon: 'neurology',
    title: '2. AI Verifies',
    body: 'Our Gemini-powered analysis engine cross-references visual data, location, and timestamps to validate the claim.',
  },
  {
    icon: 'public',
    title: '3. Share',
    body: 'Receive a permanent, public proof page and verification badge to share with your community and partners.',
  },
]

const TOP_CONTRIBUTORS = [
  {
    rank: 1,
    name: 'Elena Rodriguez',
    actions: 34,
    points: 1240,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxiwQ09mJIjNJODOLLafrtoT9Xkkc_a-UpDJDkWivRXqnpPolekbWXJB3SYSMDU1a84Ajtk7Xm-Z1rimjI06c0AZE0IC_qIjhuWKC3d5wdoylao0hPeKA520gxgn8yp9uIKymvucSooFPDz-B_IiYkIrDRw7wnewiJ6cmMMEdKyrJ2BDIETu1CD9zzWsEwTqUstTdJnc_BwcSc_2lyEqAx78gqbcF2FeQVNEg26LM9D3v6ROYMRfqfWjYIDzUXHSYyNTNKv2mYyncF',
  },
  {
    rank: 2,
    name: 'Marcus Chen',
    actions: 28,
    points: 980,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhQiWaXXDzf9GPeN-6BUjML-AqIpXco5EW8H7DGyJcwgRr6hSNzgHmeizBXrBZYDU9PzLmUCfIelCGbDKj4mo_lpakwTqjYI9r69PT0y-qbDxjGggeESaqUf25anBs3kulrdAm1bwjF674wXcUy0m402gnMHgL_YUSR2sQZOA2713_O6ts1UPfrBo9Z5QMysGIuUGT3fng2EAC1RAOLcF-0fmtf5Ns7FwP5V1olXSb5t52XStP8wx2LRuFHVE1x1JK9RiBdH-Tkig-',
  },
  {
    rank: 3,
    name: 'Sarah Jenkins',
    actions: 21,
    points: 850,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrcKr6t11X85DtEWULKSoGsHsv88abSslzMb6NMlkmn47MHcVQPWs8umlqcy8p_etwvWhnm3jnc7I1oskf0UqV7q0qah4oJRYR-i9l6gutH7hgnbOpXllz-omvZJ6dtALnQKiJDra19Ki_0M3n_peJO4Tv428JDLHfvJ7EsfvqmNwuAQ8uQRi4suNjjE7S2EbUisSynfswc5Flo5cMmKqs8A-V7-ovWd4y8oaDvM9YsIVUlR9mvbtxM-WDLyqmg64U2rIkhE5FGrqI',
  },
]

function Hero() {
  const reveal = useScrollReveal<HTMLDivElement>()

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max relative mx-auto overflow-hidden pb-20 pt-12 text-center md:pb-32 md:pt-24 md:text-left">
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-24 top-1/2 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      <div
        ref={reveal.ref}
        className={`gap-gutter relative z-10 grid grid-cols-1 items-center md:grid-cols-2 ${reveal.className}`}
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-display-lg font-display-lg text-on-surface leading-tight tracking-tight">
            Verify your impact. <br />
            <span className="text-primary">Share your proof.</span>
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg">
            The AI-powered platform for verifiable social and environmental
            action. Using advanced Gemini analysis to ensure every claim is
            backed by objective data.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Button to="/submit-proof">
              Submit Proof
              <MaterialIcon name="arrow_forward" className="text-[20px]" />
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                document
                  .getElementById('how-it-works')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              How it works
            </Button>
          </div>
        </div>

        <div className="relative mt-12 md:mt-0">
          <div className="border-outline-variant relative z-20 rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-surface-container-low flex h-10 w-10 items-center justify-center rounded-lg">
                  <MaterialIcon name="eco" className="text-primary" />
                </div>
                <div>
                  <h3 className="text-label-md font-label-md text-on-surface">
                    Beach Cleanup
                  </h3>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">
                    Lagos Main Beach
                  </p>
                </div>
              </div>
              <GoldBadge label="92% Verified" />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Before
                </span>
                <div className="border-outline-variant aspect-square overflow-hidden rounded-lg border">
                  <img
                    className="h-full w-full object-cover"
                    alt="Littered coastal area before cleanup"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy0PWtZQc1BqkA_ZtiUc7kRHx31uZQPym7BGLzdWozV-aeAoEXz33wLKv8iWK5-a3GXYDtAT9fTIh_EySKA9Uy2bsZW2UgqrJJlIo-wgTq4tq24MtabI4jw-UKF0Mn46qh1YaNqsIcLiQl21xZzkLIHCVp1KJ8WR8udL9faZF3Nshcd6QA6c05ifOr5EFqurAEjsYyM0oygGWkE6iRSclR_6or1xhHt6ZlUstXAeKQGULm3iPJA5vo3s3TAQReuIoqsoyklUEPuZRo"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  After
                </span>
                <div className="border-outline-variant aspect-square overflow-hidden rounded-lg border">
                  <img
                    className="h-full w-full object-cover"
                    alt="Clean beach after cleanup"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKOJyfzWrFNwuHyYO3WZrv7w9SvksDwtP1Np5t-tvAwo-u5uE_XOZ2Gj3fqy1_KnwwQ0Z1ioFiFQ-6EDfWq65V831zOmojsBBJezxR7Uc9qq5vDM9SJk0CklpyMBxb7iD8VFbe0x8ad_DbIVmcSZBXEO_FYHAyh6c0I-ZN3ggN9pQ9b4hC4xdRYAir3fqREPUk_P7G-zpj3tRPKxeG4xW6uMg3bfZzEcwrE-yIubz7Gw8LBoiqBW5LJoQ26d2Dtj97zM73xhio38Fo"
                  />
                </div>
              </div>
            </div>

            <div className="border-outline-variant flex items-center justify-between border-t pt-4">
              <div className="flex -space-x-2">
                <div className="bg-surface-container-high h-8 w-8 rounded-full border-2 border-white" />
                <div className="bg-surface-container-high h-8 w-8 rounded-full border-2 border-white" />
                <div className="bg-surface-container-high text-on-surface-variant flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold">
                  +4
                </div>
              </div>
              <span className="text-label-sm font-label-sm font-bold text-primary">
                12.5kg Plastic Removed
              </span>
            </div>
          </div>
          <div className="bg-surface-container-low border-outline-variant absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-xl border" />
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const reveal = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="how-it-works"
      className="bg-surface-container-low px-margin-mobile md:px-margin-desktop py-20"
    >
      <div
        ref={reveal.ref}
        className={`max-w-container-max mx-auto ${reveal.className}`}
      >
        <div className="mb-16 text-center">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-4">
            How it works
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mx-auto max-w-xl">
            Our rigorous verification process ensures that every impact claim is
            authentic, building a foundation of institutional trust.
          </p>
        </div>
        <div className="gap-gutter grid grid-cols-1 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.title}
              className="border-outline-variant group rounded-xl border bg-white p-8 transition-all hover:border-primary/30"
            >
              <div className="group-hover:text-on-primary mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                <MaterialIcon name={step.icon} />
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
                {step.title}
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LeaderboardTeaser() {
  const reveal = useScrollReveal<HTMLDivElement>()

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-20">
      <div ref={reveal.ref} className={reveal.className}>
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-4">
              Top Contributors
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Recognizing those leading the way in verifiable global impact.
            </p>
          </div>
          <Link
            to="/leaderboard"
            className="text-label-md font-label-md flex items-center gap-1 text-secondary hover:underline"
          >
            View Full Leaderboard
            <MaterialIcon name="open_in_new" className="text-[18px]" />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {TOP_CONTRIBUTORS.map((contributor) => (
            <div
              key={contributor.rank}
              className="border-outline-variant hover:bg-surface-container-low flex items-center gap-4 rounded-xl border bg-white p-4 transition-colors"
            >
              <span
                className={`text-headline-md font-headline-md w-8 ${contributor.rank === 1 ? 'text-primary' : 'text-on-surface-variant'}`}
              >
                {String(contributor.rank).padStart(2, '0')}
              </span>
              <div className="border-outline-variant h-12 w-12 overflow-hidden rounded-full border">
                <img
                  className="h-full w-full object-cover"
                  alt={contributor.name}
                  src={contributor.avatar}
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-label-md font-label-md text-on-surface">
                  {contributor.name}
                </h4>
                <p className="text-label-sm font-label-sm text-on-surface-variant">
                  {contributor.actions} Verified Actions
                </p>
              </div>
              <div className="text-right">
                <div className="text-label-md font-label-md text-primary">
                  {contributor.points.toLocaleString()} pts
                </div>
                <div className="text-label-sm font-label-sm text-on-surface-variant">
                  Global Rank #{contributor.rank}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  const reveal = useScrollReveal<HTMLDivElement>()

  return (
    <section className="px-margin-mobile md:px-margin-desktop text-on-primary bg-primary py-20">
      <div
        ref={reveal.ref}
        className={`max-w-container-max mx-auto text-center ${reveal.className}`}
      >
        <h2 className="text-display-lg font-display-lg mb-6 leading-tight">
          Ready to prove your impact?
        </h2>
        <p className="text-body-lg font-body-lg text-primary-fixed mx-auto mb-10 max-w-2xl">
          Join thousands of individuals and organizations who are using Verix to
          build a world of radical transparency.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="onPrimary" size="lg" to="/sign-up">
            Get Started Free
          </Button>
          <Button variant="onPrimaryOutline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <>
      <Header position="fixed" />
      <main className="pt-16">
        <Hero />
        <HowItWorks />
        <LeaderboardTeaser />
        <FinalCta />
      </main>
      <Footer />
      <SubmitProofFab />
    </>
  )
}
