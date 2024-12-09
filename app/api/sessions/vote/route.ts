import { pusher, sessions, Participant } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { sessionId, participantId, vote } = await request.json();

    const session = sessions.get(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Update or add participant
    const participantIndex = session.participants.findIndex(
      (p: Participant) => p.id === participantId
    );
    if (participantIndex >= 0) {
      session.participants[participantIndex].vote = vote;
    } else {
      session.participants.push({ id: participantId, vote });
    }

    // Broadcast session update
    await pusher.trigger(`session-${sessionId}`, "session-update", session);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit vote" },
      { status: 500 }
    );
  }
}
