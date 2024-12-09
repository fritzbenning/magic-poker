import { SessionClient } from "@/components/session-client";

// This is now a Server Component (no "use client" directive)
export default function SessionPage({ params }: { params: { id: string } }) {
  return <SessionClient sessionId={params.id} />;
}
