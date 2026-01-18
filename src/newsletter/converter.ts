import { readFile } from 'node:fs/promises'
import { marked } from 'marked'

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  return await marked(markdown)
}

export async function loadNewsletterMarkdown(filePath: string): Promise<string> {
  return await readFile(filePath, 'utf-8')
}
