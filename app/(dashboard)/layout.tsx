import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AuthGuard } from '@/components/auth/AuthGuard'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Guards every page in this route group (dashboard, submit, ...) in one
    // place, rather than each page wrapping itself individually.
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </AuthGuard>
  )
}
