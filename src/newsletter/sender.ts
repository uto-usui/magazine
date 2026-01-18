import { Resend } from 'resend'
import { config as dotenvConfig } from 'dotenv'
import type { Recipient } from '../config/recipients-schema'

dotenvConfig()

const FROM_EMAIL = 'onboarding@resend.dev'
const REPLY_TO_EMAIL = 'nattyanoranged@gmail.com'
const DEFAULT_SUBJECT = 'UXエンジニアリング ニュースレター'

export interface EmailConfig {
  from: string
  to: string
  subject: string
  html: string
  reply_to: string
}

export interface SendResult {
  success: boolean
  sentCount: number
  failedCount: number
  errors: Array<{ email: string; error: string }>
}

export function createEmailConfig(
  recipient: Recipient,
  html: string,
  subject?: string
): EmailConfig {
  return {
    from: FROM_EMAIL,
    to: recipient.email,
    subject: subject ?? DEFAULT_SUBJECT,
    html,
    reply_to: REPLY_TO_EMAIL,
  }
}

export async function sendNewsletter(
  recipients: Recipient[],
  html: string,
  subject?: string
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }

  const resend = new Resend(apiKey)
  const result: SendResult = {
    success: true,
    sentCount: 0,
    failedCount: 0,
    errors: [],
  }

  for (const recipient of recipients) {
    const config = createEmailConfig(recipient, html, subject)
    try {
      await resend.emails.send({
        from: config.from,
        to: config.to,
        subject: config.subject,
        html: config.html,
        replyTo: config.reply_to,
      })
      result.sentCount++
      console.log(`Email sent successfully to: ${recipient.email}`)
    } catch (error) {
      result.failedCount++
      result.errors.push({
        email: recipient.email,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      console.error(`Failed to send email to ${recipient.email}:`, error)
    }
  }

  result.success = result.failedCount === 0
  return result
}
