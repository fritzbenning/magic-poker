"use client";

import { useState, useEffect } from "react";
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

interface Participant {
  id: string;
  name: string;
  vote: string | null;
}

interface Session {
  name: string;
  participants: Participant[];
  showResults: boolean;
}

export function useSession(sessionId: string) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to session updates
    const channel = pusher.subscribe(`session-${sessionId}`);

    channel.bind("session-update", (data: Session) => {
      setSession(data);
    });

    // Initial session fetch
    fetch(`/api/sessions?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
        setIsLoading(false);
      });

    return () => {
      pusher.unsubscribe(`session-${sessionId}`);
    };
  }, [sessionId]);

  const submitVote = async (vote: string) => {
    const participantId =
      localStorage.getItem(`participant-${sessionId}`) || crypto.randomUUID();
    localStorage.setItem(`participant-${sessionId}`, participantId);

    await fetch(`/api/sessions/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        participantId,
        vote,
      }),
    });
  };

  return { session, isLoading, submitVote };
}
