import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from '@/components/session-provider'
import { ToastProvider } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { isMockAuthEnabled } from '@/lib/mock-auth'
import { defaultMetadata } from '@/config/seo'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

// defaultMetadata already covers title/description/keywords/Open Graph/
// Twitter card/robots - just layer the favicon on top here.
export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {isMockAuthEnabled && (
              <div className="bg-verified-partial px-4 py-1.5 text-center text-xs font-semibold text-black">
                Mock auth mode &mdash; no real backend connected. Do not enable
                in production.
              </div>
            )}
            {children}
            <ToastProvider />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
