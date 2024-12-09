import { SessionClient } from "@/components/session-client";

export default function SessionPage({ params }: { params: { id: string } }) {
  return <SessionClient sessionId={params.id} />;
}
