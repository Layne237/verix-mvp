import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Shared shell for public routes (landing sits outside this group and
// composes Navbar/Footer itself; this covers /leaderboard and /proof/[id]).
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
