import z from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  MONGO_PORT: z.string(),
  MONGO_HOST: z.string(),
  GENAI_API_KEY: z.string(),
  DEFAULT_USER_EMAIL: z.string().optional(),
  DEFAULT_USER_PASSWORD: z.string().optional(),
  WORKER_API_TOKEN: z.string(),
  STAR_WARS_API_URL: z.url()
})

export type Env = z.infer<typeof envSchema>
