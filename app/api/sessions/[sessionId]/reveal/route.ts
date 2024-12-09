import { NextResponse } from 'next/server'
import { pusherServer } from '@/lib/pusher'

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  await pusherServer.trigger(`session-${params.sessionId}`, 'results-revealed', {})
  return NextResponse.json({ success: true })
}