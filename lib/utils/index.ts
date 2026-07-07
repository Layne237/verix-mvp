import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { compressImage, base64ToBlob, fileToBase64 } from './image'
export { formatDate, formatRelativeTime, formatTimestamp } from './date'
export { capitalize, slugify, truncate, formatCategory } from './strings'
export { APP_NAME, APP_DESCRIPTION, APP_URL, IMPACT_CATEGORIES, VERIFICATION_THRESHOLDS, PAGINATION, FILE_LIMITS } from './constants'
