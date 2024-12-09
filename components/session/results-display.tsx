"use client"

import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Participant {
  id: string
  name: string
  vote: string | null
}

interface ResultsDisplayProps {
  participants: Participant[]
}

export function ResultsDisplay({ participants }: ResultsDisplayProps) {
  const votes = participants
    .map(p => p.vote)
    .filter((vote): vote is string => vote !== null)
  
  const average = votes.length > 0
    ? votes
      .filter(v => v !== '?')
      .map(v => Number(v))
      .reduce((a, b) => a + b, 0) / votes.filter(v => v !== '?').length
    : 0

  return (
    <div className="mt-8 space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Average</p>
            <p className="text-2xl font-bold">{average.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Participants</p>
            <p className="text-2xl font-bold">{participants.length}</p>
          </div>
        </div>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participant</TableHead>
              <TableHead className="text-right">Vote</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.name || `Participant ${participant.id.slice(0, 4)}`}</TableCell>
                <TableCell className="text-right font-medium">
                  {participant.vote || '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}