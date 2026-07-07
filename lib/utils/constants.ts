export const APP_NAME = 'Verix'
export const APP_DESCRIPTION = 'AI-Powered Impact Verification Platform'
export const APP_URL = 'https://verix.vercel.app'

export const IMPACT_CATEGORIES = [
  { value: 'tree_planting', label: 'Tree Planting', icon: '🌳' },
  { value: 'beach_cleanup', label: 'Beach Cleanup', icon: '🏖️' },
  { value: 'community_garden', label: 'Community Garden', icon: '🌻' },
  { value: 'renewable_energy', label: 'Renewable Energy', icon: '☀️' },
  { value: 'water_conservation', label: 'Water Conservation', icon: '💧' },
  { value: 'recycling', label: 'Recycling', icon: '♻️' },
  { value: 'wildlife_protection', label: 'Wildlife Protection', icon: '🐾' },
  { value: 'urban_greening', label: 'Urban Greening', icon: '🌿' },
  { value: 'other', label: 'Other', icon: '📋' },
] as const

export const VERIFICATION_THRESHOLDS = {
  high: 80,
  standard: 60,
  partial: 30,
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
} as const

export const FILE_LIMITS = {
  MAX_IMAGE_SIZE: 10 * 1024 * 1024,
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const
