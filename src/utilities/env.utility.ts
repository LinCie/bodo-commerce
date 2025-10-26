import { z } from "zod"

const envSchema = z.object({
  FRONTEND_URL: z.url().default("localhost:3000"),
  NODE_ENV: z.enum(["development", "production", "staging", "test"]).default("development"),
  PORT: z.string().default("3000"),
})

export const env = envSchema.parse(process.env)
