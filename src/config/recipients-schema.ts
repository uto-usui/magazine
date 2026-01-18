import { z } from 'zod'

export const RecipientSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  enabled: z.boolean().default(true),
})

export const RecipientsConfigSchema = z
  .object({
    recipients: z.array(RecipientSchema).min(1),
  })
  .refine(
    (data) => {
      const emails = data.recipients.map((r) => r.email.toLowerCase())
      return new Set(emails).size === emails.length
    },
    { message: 'Recipient email addresses must be unique' }
  )

export type Recipient = z.infer<typeof RecipientSchema>
export type RecipientsConfig = z.infer<typeof RecipientsConfigSchema>
