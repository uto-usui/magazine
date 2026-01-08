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

export const CategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  color: z.string().optional(),
})

export const CategoryConfigSchema = z
  .object({
    categories: z.array(CategorySchema).min(1),
  })
  .refine(
    (data) => {
      const ids = data.categories.map((c) => c.id)
      return new Set(ids).size === ids.length
    },
    { message: 'Category IDs must be unique' }
  )

export type Category = z.infer<typeof CategorySchema>
export type CategoryConfig = z.infer<typeof CategoryConfigSchema>
