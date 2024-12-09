import PusherServer from "pusher";

export const sessions = new Map();
export const demoSession = {
  name: "Demo Session",
  participants: [],
  showResults: false,
};

export const pusher = new PusherServer({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});
