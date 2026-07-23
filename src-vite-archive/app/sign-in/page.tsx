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
    <div className="bg-surface px-margin-mobile flex min-h-screen flex-col items-center justify-center">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-5%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <main className="w-full max-w-[440px]">
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-4 flex items-center gap-2">
            <MaterialIcon
              name="verified"
              filled
              className="text-[40px] text-primary"
            />
            <h1 className="text-headline-lg font-headline-lg tracking-tight text-primary">
              Verix
            </h1>
          </div>
          <h2 className="text-headline-md font-headline-md text-on-tertiary-fixed-variant">
            Sign in to Verix
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-2">
            Institutional-grade verification for global impact.
          </p>
        </div>

        <div className="bg-surface-container-lowest border-outline-variant rounded-xl border p-8 shadow-sm md:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Email Address"
              type="email"
              icon="mail"
              placeholder="name@organization.gov"
              required
            />
            <TextField
              id="password"
              label="Password"
              labelRight={
                <a
                  href="#"
                  className="text-label-sm font-label-sm text-secondary hover:underline"
                >
                  Forgot password?
                </a>
              }
              type="password"
              icon="lock"
              placeholder="••••••••"
              required
            />
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="border-outline h-4 w-4 rounded text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="text-label-md font-label-md text-on-surface-variant ml-2"
              >
                Remember this device for 30 days
              </label>
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <MaterialIcon
                    name="progress_activity"
                    className="animate-spin"
                  />
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
              <div className="border-outline-variant w-full border-t" />
            </div>
            <div className="text-label-sm font-label-sm relative flex justify-center uppercase">
              <span className="bg-surface-container-lowest text-on-surface-variant px-4">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleButton />
        </div>

        <div className="mt-8 text-center">
          <p className="text-body-md font-body-md text-on-surface-variant">
            Don't have an account?{' '}
            <Link
              to="/sign-up"
              className="font-label-md text-primary decoration-2 underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 opacity-60">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-label-sm font-label-sm text-on-surface">
              Systems Operational
            </span>
          </div>
          <div className="bg-outline-variant h-4 w-px" />
          <div className="flex items-center gap-1.5">
            <MaterialIcon name="security" className="text-[16px]" />
            <span className="text-label-sm font-label-sm text-on-surface">
              AES-256 Encrypted
            </span>
          </div>
        </div>
      </main>

      <footer className="border-outline-variant mt-auto w-full border-t py-8">
        <div className="max-w-container-max px-margin-mobile text-on-tertiary-fixed-variant mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <MaterialIcon
              name="verified"
              filled
              className="text-[24px] text-primary"
            />
            <p className="text-label-md font-label-md">
              © 2026 Verix. Dedicated to institutional transparency.
            </p>
          </div>
          <div className="gap-gutter flex">
            <a
              href="#"
              className="text-label-md font-label-md transition-colors hover:text-secondary"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-label-md font-label-md transition-colors hover:text-secondary"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-label-md font-label-md transition-colors hover:text-secondary"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
