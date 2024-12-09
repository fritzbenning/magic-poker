"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

export function CreateSession() {
  const router = useRouter()
  const [sessionName, setSessionName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateSession = async () => {
    if (!sessionName.trim()) {
      toast.error('Please enter a session name')
      return
    }

    setIsLoading(true)
    try {
      const sessionId = uuidv4()
      // In a real app, you would create the session in your backend here
      router.push(`/session/${sessionId}`)
      toast.success('Session created successfully!')
    } catch (error) {
      toast.error('Failed to create session')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-name">Session Name</Label>
            <Input
              id="session-name"
              placeholder="Enter session name..."
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            onClick={handleCreateSession}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Session'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}