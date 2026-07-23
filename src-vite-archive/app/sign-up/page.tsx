import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import GoogleButton from '../../components/GoogleButton'
import MaterialIcon from '../../components/MaterialIcon'
import TextField from '../../components/TextField'

const TRUST_AVATARS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBgtEW5RVbBBCpaKQUMGB6LCE5wj9hNjv93nb14z--nmQvQY6BZbQLg4iKLZn9axPDOchvMfCHkiAfTgnjIFKcG6zu4f_oNjxi3zhkV1-hr1uJ2pUdRiq9WBJeYVFd7k14TIo8CYQa7F2mxkvvFUUtIEthkZMGnB89JH0W0-QNy_uLi6QB0LyfJ_ToCb0SAC6t7afa_Le09FSzcmWS8iuuiUjx3ig8mH-wH0Jv7doy0dYUluqNDHEquFBOblYaeC8LlvZqwRSf3ehH0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAZNMO8hPeLG4RtkS0gMAZKv4DCePWj_DXiihOks72hOI9FOwfeJdvAKFUps-KNoFzzHVnAWsXiaZay27mXI2ZJ6ozgdl35JyvVZl-1JuU0KgK_ae4VoaNwQyJy4siMsbOl6gvNJgzBwzl_eVs4ojiL7qRqTewEFTlodPpuqqR72gFWVwsgejkWKdk8ghL6_Z-3id8lYu6j8VwW2fb7ysqdiOjCjj29Hkm0nKfFzYWfImhMjdRTUPzHBEIroPs-FOb67JnvsiKTXa0X',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDIoDgt1bcyEPcavYtKVPXo_SqHBfg8jOl8OQuqisfHnpYQfyifNPskKSgDqg258k3EDAPb5r5KC9Y1h1GdtKk8C6hfjyRY9yoqhQtY1T5YZwNbKv9G6puVRvbi5B8703X3X_siZTH_Bl5842vPDyWpPuviTjwpiLdSfHhjlsdFL1StOeTew4HB4e7mEf7fiipmKOntQ-tZrBMfgkEUCgz4Qe3h0p6BgaE0aODu5T1gCGSqNnTYeHDLJtAQJ3zQ6RAO6YhploRKnq8C',
]

function SignUpHeader() {
  return (
    <header className="bg-surface border-outline-variant sticky top-0 z-50 border-b">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <MaterialIcon name="verified" className="text-primary" />
          <span className="text-headline-md font-headline-md font-bold text-primary">
            Verix
          </span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-6">
            <a
              href="#"
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Mission
            </a>
            <a
              href="#"
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Governance
            </a>
          </nav>
          <div className="bg-surface-container-high border-outline-variant flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border">
            <MaterialIcon name="person" className="text-on-surface-variant" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="text-on-background flex min-h-screen flex-col bg-background">
      <SignUpHeader />

      <main className="px-margin-mobile relative flex flex-grow items-center justify-center overflow-hidden py-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute right-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-primary blur-[120px]" />
          <div className="bg-secondary-container absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full blur-[100px]" />
        </div>

        <div className="gap-gutter z-10 grid w-full max-w-[1100px] grid-cols-1 items-center lg:grid-cols-2">
          <div className="hidden flex-col space-y-8 pr-12 lg:flex">
            <div className="space-y-4">
              <h1 className="text-display-lg font-display-lg tracking-tight text-primary">
                Institutional <br />
                Transparency.
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md">
                Verix is an AI-powered platform dedicated to impact
                verification, balancing high-tech precision with the grounded
                reliability of civic duty.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="border-outline-variant bg-surface-container-low hover:bg-surface-container flex items-start gap-4 rounded-xl border p-4 transition-all">
                <MaterialIcon
                  name="shield_lock"
                  className="mt-1 text-primary"
                />
                <div>
                  <h3 className="text-on-surface font-bold">
                    Verified Identity
                  </h3>
                  <p className="text-label-md font-label-md text-on-surface-variant">
                    Secure, blockchain-backed credentials for every contributor.
                  </p>
                </div>
              </div>
              <div className="border-outline-variant bg-surface-container-low hover:bg-surface-container flex items-start gap-4 rounded-xl border p-4 transition-all">
                <MaterialIcon
                  name="query_stats"
                  className="mt-1 text-secondary"
                />
                <div>
                  <h3 className="text-on-surface font-bold">Impact Metrics</h3>
                  <p className="text-label-md font-label-md text-on-surface-variant">
                    Real-time verification of environmental and social
                    milestones.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex -space-x-3 overflow-hidden">
                {TRUST_AVATARS.map((src) => (
                  <img
                    key={src}
                    className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-background"
                    alt=""
                    src={src}
                  />
                ))}
              </div>
              <p className="text-label-sm font-label-sm text-on-surface-variant mt-3">
                Trusted by 2,000+ Institutional Verifiers worldwide.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div className="bg-surface/80 border-outline-variant rounded-xl border p-8 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md md:p-10">
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">
                  Create your account
                </h2>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Join our community of impact verifiers
                </p>
              </div>

              <GoogleButton />

              <div className="relative my-8 flex items-center">
                <div className="border-outline-variant flex-grow border-t" />
                <span className="text-label-sm font-label-sm text-outline px-4 uppercase tracking-widest">
                  or
                </span>
                <div className="border-outline-variant flex-grow border-t" />
              </div>

              <form
                className="space-y-6"
                onSubmit={(event) => event.preventDefault()}
              >
                <TextField
                  id="full_name"
                  label="Full Name"
                  icon="person"
                  placeholder="Institutional Name"
                  type="text"
                />
                <TextField
                  id="email"
                  label="Email"
                  icon="mail"
                  placeholder="name@organization.gov"
                  type="email"
                />
                <TextField
                  id="password"
                  label="Password"
                  icon="lock"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-outline hover:text-on-surface-variant"
                    >
                      <MaterialIcon
                        name={showPassword ? 'visibility_off' : 'visibility'}
                        className="text-[20px]"
                      />
                    </button>
                  }
                />
                <Button type="submit" size="lg" className="w-full">
                  Create Account
                  <MaterialIcon name="arrow_forward" />
                </Button>
              </form>

              <p className="text-label-md font-label-md text-on-surface-variant mt-8 text-center">
                Already have an account?{' '}
                <Link
                  to="/sign-in"
                  className="font-bold text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>

              <div className="bg-surface-container-low border-outline-variant mt-10 flex items-start gap-3 rounded-lg border p-4">
                <MaterialIcon
                  name="info"
                  className="mt-0.5 text-[20px] text-primary"
                />
                <p className="text-label-sm font-label-sm text-on-surface-variant leading-relaxed">
                  <span className="text-on-surface font-bold">
                    Our Mission:
                  </span>{' '}
                  Verix is committed to institutional transparency. Every
                  account created strengthens the ecosystem of verified civic
                  duty and impact reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low border-outline-variant border-t">
        <div className="gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 items-center py-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <span className="text-headline-md font-headline-md mb-2 block font-bold text-primary">
              Verix
            </span>
            <p className="text-body-md font-body-md text-on-tertiary-fixed-variant">
              © 2026 Verix. Dedicated to institutional transparency and civic
              duty.
            </p>
          </div>
          <div className="gap-gutter flex justify-center md:justify-end">
            <a
              href="#"
              className="text-label-md font-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
            >
              About
            </a>
            <a
              href="#"
              className="text-label-md font-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
            >
              Submit
            </a>
            <a
              href="#"
              className="text-label-md font-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
            >
              Leaderboard
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
