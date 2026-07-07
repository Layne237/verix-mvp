'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Proof, ProofWithVotes } from '@/types'

export function useProofs() {
  const [proofs, setProofs] = useState<ProofWithVotes[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProofs = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/proof')
      if (!response.ok) throw new Error('Failed to fetch proofs')
      const data = await response.json()
      setProofs(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch proofs')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProofs()
  }, [fetchProofs])

  return { proofs, isLoading, error, refetch: fetchProofs }
}
