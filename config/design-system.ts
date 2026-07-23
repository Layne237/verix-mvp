/**
 * Verix brand design tokens, extracted from
 * verix_civic_verification_system/DESIGN.md (the Stitch-exported source of
 * truth). Tailwind and app/globals.css are the enforced implementation of
 * these values; this module exists for places that need the raw tokens
 * outside Tailwind classes (chart colors, inline styles, tier lookups).
 */
export const designSystem = {
  colors: {
    // Core roles
    primary: '#006a36', // Forest green - the "Verified" state
    secondary: '#02629e', // Ocean blue - interactive links/actions
    background: '#f8faf9',
    surface: '#ffffff',
    onSurface: '#191c1c',
    onSurfaceVariant: '#3e4a3f',
    outline: '#6e7a6e',
    outlineVariant: '#bdcabc',
    error: '#ba1a1a',

    // Surface tonal scale (flat design, no shadows - depth via layering)
    surfaceDim: '#d8dad9',
    surfaceBright: '#f8faf9',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f2f4f3',
    surfaceContainer: '#eceeed',
    surfaceContainerHigh: '#e6e9e8',
    surfaceContainerHighest: '#e1e3e2',

    // Verification tiers (Impact Score badges)
    verified: {
      high: '#FFD700', // Gold - elite/top-tier
      standard: '#27AE60', // Green
      partial: '#F1C40F', // Yellow
      none: '#E74C3C', // Red
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    // Matches DESIGN.md's named type scale exactly (px sizes as documented)
    displayLg: 'text-[48px] font-bold leading-[56px] tracking-[-0.02em]',
    headlineLg: 'text-[32px] font-semibold leading-[40px] tracking-[-0.01em]',
    headlineLgMobile: 'text-[28px] font-semibold leading-[36px]',
    headlineMd: 'text-[24px] font-semibold leading-[32px]',
    bodyLg: 'text-[18px] leading-[28px]',
    bodyMd: 'text-[16px] leading-[24px]',
    labelMd: 'text-[14px] font-semibold leading-[20px] tracking-[0.05em]',
    labelSm: 'text-[12px] font-medium leading-[16px]',
  },
  spacing: {
    container: 'max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10', // container-max, gutter
    section: 'py-12 md:py-16 lg:py-20',
    marginMobile: '16px',
    marginDesktop: '40px',
    unit: '4px',
  },
  borderRadius: {
    sm: '0.25rem',
    DEFAULT: '0.75rem', // 12px - cards, inputs, primary containers
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px', // verification badges (pill-shaped)
  },
  shadows: {
    // DESIGN.md deliberately avoids heavy drop shadows in favor of tonal
    // layers and outlines; these are for floating elements only (dropdowns,
    // dialogs, toasts) where some elevation cue is unavoidable.
    card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    dropdown: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  },
} as const

export type VerificationTier = keyof typeof designSystem.colors.verified
