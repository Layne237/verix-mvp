import Link from 'next/link'
import { Camera, ShieldCheck, Globe2 } from 'lucide-react'
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
            Verify Your <span className="text-primary">Impact</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            An AI-powered platform for documenting and verifying positive social
            and environmental actions. Share your proof with the world.
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
            <h2 className="mb-12 text-center text-3xl font-bold">
              How Verix Works
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">1. Document</h3>
                <p className="text-sm text-muted-foreground">
                  Upload before and after photos of your impact action.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">2. Verify</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes your photos and generates a confidence score.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Globe2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">3. Share</h3>
                <p className="text-sm text-muted-foreground">
                  Get a verified proof page to share with the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Ready to Make Your Impact Count?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join the community of changemakers verifying their impact.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="mt-8 bg-white text-primary hover:bg-white/90"
              >
                Start Now &mdash; It&apos;s Free
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
