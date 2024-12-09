import { CreateSession } from '@/components/create-session'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Planning Poker
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Streamline your agile planning sessions with our modern, real-time planning poker tool.
            No registration required.
          </p>
          <div className="mt-10">
            <CreateSession />
          </div>
        </div>
      </div>
    </main>
  )
}