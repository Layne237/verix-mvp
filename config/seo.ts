import type { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: {
    default: 'Verix - AI-Powered Impact Verification',
    template: '%s | Verix',
  },
  description:
    'Verify your impact. Share your proof. An AI-powered platform for documenting and verifying positive social and environmental actions.',
  keywords: [
    'impact',
    'verification',
    'AI',
    'environment',
    'social impact',
    'proof',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Verix',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}
