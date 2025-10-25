import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "staging", "test"]).default("development"),
  PORT: z.string().default("3000"),
})

export const env = envSchema.parse(process.env)
