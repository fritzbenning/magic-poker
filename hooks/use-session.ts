"use client"

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Session } from '@/lib/types'

export function useSession(sessionId: string) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [participantId] = useState(() => uuidv4())

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/sessions?sessionId=${sessionId}`)
        if (!response.ok) throw new Error('Failed to fetch session')
        const data = await response.json()
        setSession(data)
      } catch (error) {
        console.error('Error fetching session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [sessionId])

  const submitVote = async (vote: string) => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote }),
      })
      
      if (!response.ok) throw new Error('Failed to submit vote')
      
      // Update local state
      setSession((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          participants: [
            ...prev.participants.filter(p => p.id !== participantId),
            { id: participantId, name: '', vote }
          ],
        }
      })
    } catch (error) {
      console.error('Error submitting vote:', error)
    }
  }

  const revealResults = async () => {
    setSession((prev) => prev ? { ...prev, showResults: true } : prev)
  }

  const startNewRound = async () => {
    setSession((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        showResults: false,
        participants: prev.participants.map((p) => ({ ...p, vote: null })),
      }
    })
  }

  return {
    session,
    isLoading,
    submitVote,
    revealResults,
    startNewRound,
  }
}