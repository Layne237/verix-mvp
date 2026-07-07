import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './client'

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit',
})

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '60 s'),
  analytics: true,
  prefix: '@upstash/ratelimit/api',
})

export async function checkRateLimit(identifier: string) {
  const { success, limit, remaining, reset } = await rateLimit.limit(identifier)
  return { success, limit, remaining, reset }
}
