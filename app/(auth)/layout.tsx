import Link from 'next/link'
import { AuthGuard } from '@/components/auth/AuthGuard'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // requireAuth={false}: an already-signed-in user landing on /login or
    // /register gets redirected to /dashboard instead of seeing the form.
    <AuthGuard requireAuth={false}>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50/50 to-white dark:from-background dark:to-background">
        <div className="flex justify-center p-6">
          <Link href="/" className="text-xl font-bold text-primary">
            Verix
          </Link>
        </div>
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md px-4">{children}</div>
        </main>
      </div>
    </AuthGuard>
  )
}
