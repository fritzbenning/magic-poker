"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, Loader2, RefreshCw } from "lucide-react";
import { VotingGrid } from "@/components/session/voting-grid";
import { ResultsDisplay } from "@/components/session/results-display";
import { useSession } from "@/hooks/use-session";
import { ThemeToggle } from "@/components/theme-toggle";

export function SessionClient({ sessionId }: { sessionId: string }) {
  const { session, isLoading, submitVote, revealResults, startNewRound } =
    useSession(sessionId);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleVote = async (value: string) => {
    setSelectedCard(value);
    await submitVote(value);
    toast.success("Vote submitted!");
  };

  const handleReveal = async () => {
    await revealResults();
    toast.success("Results revealed!");
  };

  const handleNewRound = async () => {
    await startNewRound();
    setSelectedCard(null);
    toast.success("New round started!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Session not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{session.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {session.participants.length} participants
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleReveal}
              disabled={session.showResults}
            >
              <Eye className="mr-2 h-4 w-4" />
              Reveal Cards
            </Button>
            <Button
              variant="outline"
              onClick={handleNewRound}
              disabled={!session.showResults}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              New Round
            </Button>
          </div>
        </div>

        <VotingGrid selectedCard={selectedCard} onVote={handleVote} />

        {session.showResults && (
          <ResultsDisplay participants={session.participants} />
        )}
      </div>
    </div>
  );
}