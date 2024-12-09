export interface Participant {
  id: string
  name: string
  vote: string | null
}

export interface Session {
  id: string
  name: string
  participants: Participant[]
  showResults: boolean
}