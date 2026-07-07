import type { VerificationResult } from './types'

export function isValidVerificationResult(data: unknown): data is VerificationResult {
  if (!data || typeof data !== 'object') return false

  const result = data as Record<string, unknown>

  return (
    typeof result.score === 'number' &&
    result.score >= 0 &&
    result.score <= 100 &&
    ['low', 'medium', 'high'].includes(result.confidence as string) &&
    typeof result.explanation === 'string' &&
    Array.isArray(result.concerns) &&
    result.concerns.every((c: unknown) => typeof c === 'string')
  )
}

export function sanitizeVerificationScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function getVerificationBadge(score: number): 'high' | 'standard' | 'partial' | 'none' {
  if (score >= 80) return 'high'
  if (score >= 60) return 'standard'
  if (score >= 30) return 'partial'
  return 'none'
}
