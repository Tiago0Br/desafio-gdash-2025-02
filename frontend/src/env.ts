import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_REGION_NAME: z.string()
})

const { success, error, data } = envSchema.safeParse(import.meta.env)

if (!success) {
  throw new Error(`Invalid environment variables: ${error.message}`)
}

export const env = data
