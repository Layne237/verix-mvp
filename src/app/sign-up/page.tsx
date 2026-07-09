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
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16">
        <div className="flex items-center gap-2">
          <MaterialIcon name="verified" className="text-primary" />
          <span className="text-headline-md font-headline-md font-bold text-primary">Verix</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <a href="#" className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-colors">
              Mission
            </a>
            <a href="#" className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-colors">
              Governance
            </a>
          </nav>
          <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
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
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <SignUpHeader />

      <main className="flex-grow flex items-center justify-center py-12 px-margin-mobile relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary-container blur-[100px]" />
        </div>

        <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center z-10">
          <div className="hidden lg:flex flex-col space-y-8 pr-12">
            <div className="space-y-4">
              <h1 className="text-display-lg font-display-lg text-primary tracking-tight">
                Institutional <br />
                Transparency.
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md">
                Verix is an AI-powered platform dedicated to impact verification, balancing high-tech precision with
                the grounded reliability of civic duty.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-outline-variant bg-surface-container-low transition-all hover:bg-surface-container">
                <MaterialIcon name="shield_lock" className="text-primary mt-1" />
                <div>
                  <h3 className="font-bold text-on-surface">Verified Identity</h3>
                  <p className="text-label-md font-label-md text-on-surface-variant">
                    Secure, blockchain-backed credentials for every contributor.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-outline-variant bg-surface-container-low transition-all hover:bg-surface-container">
                <MaterialIcon name="query_stats" className="text-secondary mt-1" />
                <div>
                  <h3 className="font-bold text-on-surface">Impact Metrics</h3>
                  <p className="text-label-md font-label-md text-on-surface-variant">
                    Real-time verification of environmental and social milestones.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex -space-x-3 overflow-hidden">
                {TRUST_AVATARS.map((src) => (
                  <img key={src} className="inline-block h-10 w-10 rounded-full ring-2 ring-background object-cover" alt="" src={src} />
                ))}
              </div>
              <p className="mt-3 text-label-sm font-label-sm text-on-surface-variant">
                Trusted by 2,000+ Institutional Verifiers worldwide.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant rounded-xl p-8 md:p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="text-center md:text-left mb-8">
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">Create your account</h2>
                <p className="text-body-md font-body-md text-on-surface-variant">Join our community of impact verifiers</p>
              </div>

              <GoogleButton />

              <div className="relative my-8 flex items-center">
                <div className="flex-grow border-t border-outline-variant" />
                <span className="px-4 text-label-sm font-label-sm text-outline uppercase tracking-widest">or</span>
                <div className="flex-grow border-t border-outline-variant" />
              </div>

              <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <TextField id="full_name" label="Full Name" icon="person" placeholder="Institutional Name" type="text" />
                <TextField id="email" label="Email" icon="mail" placeholder="name@organization.gov" type="email" />
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
                      <MaterialIcon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
                    </button>
                  }
                />
                <Button type="submit" size="lg" className="w-full">
                  Create Account
                  <MaterialIcon name="arrow_forward" />
                </Button>
              </form>

              <p className="mt-8 text-center text-label-md font-label-md text-on-surface-variant">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-primary font-bold hover:underline">
                  Sign in
                </Link>
              </p>

              <div className="mt-10 p-4 bg-surface-container-low rounded-lg border border-outline-variant flex items-start gap-3">
                <MaterialIcon name="info" className="text-primary text-[20px] mt-0.5" />
                <p className="text-label-sm font-label-sm text-on-surface-variant leading-relaxed">
                  <span className="font-bold text-on-surface">Our Mission:</span> Verix is committed to institutional
                  transparency. Every account created strengthens the ecosystem of verified civic duty and impact
                  reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter py-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto items-center">
          <div className="text-center md:text-left">
            <span className="text-headline-md font-headline-md font-bold text-primary block mb-2">Verix</span>
            <p className="text-body-md font-body-md text-on-tertiary-fixed-variant">
              © 2026 Verix. Dedicated to institutional transparency and civic duty.
            </p>
          </div>
          <div className="flex justify-center md:justify-end gap-gutter">
            <a href="#" className="text-label-md font-label-md text-on-tertiary-fixed-variant hover:text-secondary transition-colors">
              About
            </a>
            <a href="#" className="text-label-md font-label-md text-on-tertiary-fixed-variant hover:text-secondary transition-colors">
              Submit
            </a>
            <a href="#" className="text-label-md font-label-md text-on-tertiary-fixed-variant hover:text-secondary transition-colors">
              Leaderboard
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
