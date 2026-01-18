import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { convertMarkdownToHtml, loadNewsletterMarkdown } from '../../src/newsletter/converter'

// Mock fs/promises
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
}))

import { readFile } from 'node:fs/promises'
const mockReadFile = vi.mocked(readFile)

describe('convertMarkdownToHtml', () => {
  it('should convert simple markdown to HTML', async () => {
    const markdown = '# Hello World\n\nThis is a paragraph.'
    const html = await convertMarkdownToHtml(markdown)

    expect(html).toContain('<h1>Hello World</h1>')
    expect(html).toContain('<p>This is a paragraph.</p>')
  })

  it('should convert links to HTML', async () => {
    const markdown = '[Link](https://example.com)'
    const html = await convertMarkdownToHtml(markdown)

    expect(html).toContain('<a href="https://example.com">Link</a>')
  })

  it('should convert bold text to HTML', async () => {
    const markdown = '**Bold text**'
    const html = await convertMarkdownToHtml(markdown)

    expect(html).toContain('<strong>Bold text</strong>')
  })

  it('should convert italic text to HTML', async () => {
    const markdown = '*Italic text*'
    const html = await convertMarkdownToHtml(markdown)

    expect(html).toContain('<em>Italic text</em>')
  })

  it('should convert lists to HTML', async () => {
    const markdown = '- Item 1\n- Item 2\n- Item 3'
    const html = await convertMarkdownToHtml(markdown)

    expect(html).toContain('<ul>')
    expect(html).toContain('<li>Item 1</li>')
    expect(html).toContain('<li>Item 2</li>')
    expect(html).toContain('<li>Item 3</li>')
    expect(html).toContain('</ul>')
  })

  it('should convert blockquotes to HTML', async () => {
    const markdown = '> This is a quote'
    const html = await convertMarkdownToHtml(markdown)

    expect(html).toContain('<blockquote>')
    expect(html).toContain('This is a quote')
    expect(html).toContain('</blockquote>')
  })

  it('should handle horizontal rules', async () => {
    const markdown = '---'
    const html = await convertMarkdownToHtml(markdown)

    expect(html).toContain('<hr')
  })
})

describe('loadNewsletterMarkdown', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should load markdown file from path', async () => {
    const markdownContent = '# Test Newsletter\n\nContent here.'
    mockReadFile.mockResolvedValue(markdownContent)

    const result = await loadNewsletterMarkdown('/path/to/newsletter.md')

    expect(result).toBe(markdownContent)
    expect(mockReadFile).toHaveBeenCalledWith('/path/to/newsletter.md', 'utf-8')
  })

  it('should throw error when file not found', async () => {
    mockReadFile.mockRejectedValue(new Error('File not found'))

    await expect(loadNewsletterMarkdown('/invalid/path.md')).rejects.toThrow('File not found')
  })
})
