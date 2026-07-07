import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center py-24 text-center md:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Verify Your{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Impact
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            An AI-powered platform for documenting and verifying positive
            social and environmental actions. Share your proof with the world.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" size="lg">
                View Leaderboard
              </Button>
            </Link>
          </div>
        </section>

        <section className="border-t">
          <div className="container py-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">📸</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Document</h3>
                <p className="text-sm text-muted-foreground">
                  Upload before and after photos of your impact actions
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Verify</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered analysis authenticates your impact claims
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Share</h3>
                <p className="text-sm text-muted-foreground">
                  Share verified proofs and climb the leaderboard
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
