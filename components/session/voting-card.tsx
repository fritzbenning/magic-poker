"use client"

import { Card } from '@/components/ui/card'

interface VotingCardProps {
  value: string
  isSelected: boolean
  onSelect: (value: string) => void
}

export function VotingCard({ value, isSelected, onSelect }: VotingCardProps) {
  return (
    <Card
      className={`p-8 text-center cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary' : 'hover:bg-accent'
      }`}
      onClick={() => onSelect(value)}
    >
      <span className="text-2xl font-bold">{value}</span>
    </Card>
  )
}