/**
 * The Supabase project's own hostname is derived from the env var rather
 * than hardcoded, so image remote patterns stay correct across
 * dev/staging/prod without editing this file per environment.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseHostname = supabaseUrl
  ? new URL(supabaseUrl).hostname
  : '*.supabase.co'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseHostname,
        pathname: '/storage/v1/object/public/**',
      },
      {
        // Google OAuth profile photos (session.user.image).
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Not currently used anywhere in this app (proof submission goes
    // through app/api/submit, a regular Route Handler, not a Server
    // Action) - kept for forward compatibility, with the body limit
    // matching proofSubmissionSchema's existing 10MB image cap.
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
