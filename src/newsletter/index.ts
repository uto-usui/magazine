import { loadNewsletterMarkdown, convertMarkdownToHtml } from './converter'
import { wrapWithTemplate } from './template'
import { inlineCss } from './inline-css'
import { sendNewsletter, type SendResult } from './sender'
import { getEnabledRecipients } from '../config/recipients'

export async function prepareNewsletterHtml(markdown: string): Promise<string> {
  const htmlContent = await convertMarkdownToHtml(markdown)
  const templateHtml = wrapWithTemplate(htmlContent)
  const inlinedHtml = await inlineCss(templateHtml)
  return inlinedHtml
}

export async function sendNewsletterFromFile(
  filePath: string,
  subject?: string
): Promise<SendResult> {
  const markdown = await loadNewsletterMarkdown(filePath)
  const html = await prepareNewsletterHtml(markdown)

  const recipients = await getEnabledRecipients()
  if (recipients.length === 0) {
    throw new Error('No enabled recipients found in config/recipients.yml')
  }

  return sendNewsletter(recipients, html, subject)
}

export { type SendResult } from './sender'
