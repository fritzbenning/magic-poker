import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import type { Session } from '@/lib/types'

const sessions = new Map<string, Session>()

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  const { vote } = await request.json()
  const participantId = uuidv4()

  // For static export, simulate successful vote
  return NextResponse.json({
    success: true,
    participantId,
    vote,
  })
}