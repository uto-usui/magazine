import { z } from 'zod'

export const FeedSchema = z.object({
  url: z.string().url(),
  name: z.string().min(1),
  category: z.string().min(1),
  enabled: z.boolean().default(true),
})

export const FeedConfigSchema = z.object({
  feeds: z.array(FeedSchema).min(1),
})

export type Feed = z.infer<typeof FeedSchema>
export type FeedConfig = z.infer<typeof FeedConfigSchema>
