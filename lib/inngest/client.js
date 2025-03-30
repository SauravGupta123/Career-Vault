import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "career-vault", // Unique app ID
  name: "Career Vault",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
