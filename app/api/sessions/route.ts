import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import type { Session } from '@/lib/types'

// In-memory store for demo purposes
const sessions = new Map<string, Session>()

// Initialize demo session
const demoSession: Session = {
  id: 'demo',
  name: 'Demo Session',
  participants: [],
  showResults: false,
}
sessions.set('demo', demoSession)

export async function POST(request: Request) {
  const { name } = await request.json()
  const sessionId = uuidv4()
  
  const session: Session = {
    id: sessionId,
    name,
    participants: [],
    showResults: false,
  }
  
  sessions.set(sessionId, session)
  
  return NextResponse.json({ sessionId })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
  }
  
  const session = sessions.get(sessionId)
  if (!session) {
    // Return demo session for static export
    return NextResponse.json(demoSession)
  }
  
  return NextResponse.json(session)
}