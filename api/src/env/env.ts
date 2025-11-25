import z from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  MONGO_PORT: z.string(),
  MONGO_HOST: z.string()
})

export type Env = z.infer<typeof envSchema>
