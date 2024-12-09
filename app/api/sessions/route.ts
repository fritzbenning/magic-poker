import { pusher, sessions, demoSession } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, name } = await request.json();
    console.log("Creating session:", { id, name });

    const newSession = {
      name,
      participants: [],
      showResults: false,
    };
    sessions.set(id, newSession);
    console.log("Sessions map:", Array.from(sessions.entries()));

    await pusher.trigger(`session-${id}`, "session-created", newSession);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  console.log("Getting session:", sessionId);
  console.log("Available sessions:", Array.from(sessions.entries()));

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  const session = sessions.get(sessionId);
  if (!session) {
    // Return demo session for static export
    return NextResponse.json(demoSession);
  }

  return NextResponse.json(session);
}
