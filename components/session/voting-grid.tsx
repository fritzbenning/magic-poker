"use client"

import { FIBONACCI_VALUES } from '@/lib/constants'
import { VotingCard } from './voting-card'

interface VotingGridProps {
  selectedCard: string | null
  onVote: (value: string) => void
}

export function VotingGrid({ selectedCard, onVote }: VotingGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {FIBONACCI_VALUES.map((value) => (
        <VotingCard
          key={value}
          value={value}
          isSelected={selectedCard === value}
          onSelect={onVote}
        />
      ))}
    </div>
  )
}