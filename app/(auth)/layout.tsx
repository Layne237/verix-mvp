import { ThemeToggle } from '@/components/layout/ThemeToggle'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Verix
        </Link>
        <ThemeToggle />
      </div>
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-4">{children}</div>
      </main>
    </div>
  )
}
