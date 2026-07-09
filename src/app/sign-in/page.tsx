import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import GoogleButton from '../../components/GoogleButton'
import MaterialIcon from '../../components/MaterialIcon'
import TextField from '../../components/TextField'

export default function SignInPage() {
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    // TODO: wire up to the real auth endpoint once the Backend APIs lead ships it.
    setTimeout(() => setSubmitting(false), 1500)
  }

  return (
    <div className="bg-surface min-h-screen flex flex-col justify-center items-center px-margin-mobile">
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <main className="w-full max-w-[440px]">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon name="verified" filled className="text-primary text-[40px]" />
            <h1 className="text-headline-lg font-headline-lg text-primary tracking-tight">Verix</h1>
          </div>
          <h2 className="text-headline-md font-headline-md text-on-tertiary-fixed-variant">Sign in to Verix</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-2">
            Institutional-grade verification for global impact.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-8 md:p-10 rounded-xl shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextField id="email" label="Email Address" type="email" icon="mail" placeholder="name@organization.gov" required />
            <TextField
              id="password"
              label="Password"
              labelRight={
                <a href="#" className="text-label-sm font-label-sm text-secondary hover:underline">
                  Forgot password?
                </a>
              }
              type="password"
              icon="lock"
              placeholder="••••••••"
              required
            />
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="w-4 h-4 text-primary border-outline rounded focus:ring-primary" />
              <label htmlFor="remember" className="ml-2 text-label-md font-label-md text-on-surface-variant">
                Remember this device for 30 days
              </label>
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <MaterialIcon name="progress_activity" className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <MaterialIcon name="arrow_forward" className="text-[18px]" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center text-label-sm font-label-sm uppercase">
              <span className="bg-surface-container-lowest px-4 text-on-surface-variant">Or continue with</span>
            </div>
          </div>

          <GoogleButton />
        </div>

        <div className="mt-8 text-center">
          <p className="text-body-md font-body-md text-on-surface-variant">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-primary font-label-md hover:underline decoration-2 underline-offset-4">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-12 flex justify-center items-center gap-6 opacity-60">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-label-sm font-label-sm text-on-surface">Systems Operational</span>
          </div>
          <div className="w-px h-4 bg-outline-variant" />
          <div className="flex items-center gap-1.5">
            <MaterialIcon name="security" className="text-[16px]" />
            <span className="text-label-sm font-label-sm text-on-surface">AES-256 Encrypted</span>
          </div>
        </div>
      </main>

      <footer className="mt-auto w-full py-8 border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile flex flex-col md:flex-row justify-between items-center gap-4 text-on-tertiary-fixed-variant">
          <div className="flex items-center gap-2">
            <MaterialIcon name="verified" filled className="text-primary text-[24px]" />
            <p className="text-label-md font-label-md">© 2026 Verix. Dedicated to institutional transparency.</p>
          </div>
          <div className="flex gap-gutter">
            <a href="#" className="text-label-md font-label-md hover:text-secondary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-label-md font-label-md hover:text-secondary transition-colors">
              Terms
            </a>
            <a href="#" className="text-label-md font-label-md hover:text-secondary transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
