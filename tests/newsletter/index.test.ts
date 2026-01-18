import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { join } from 'node:path'

// Mock all dependencies
vi.mock('../../src/newsletter/converter', () => ({
  loadNewsletterMarkdown: vi.fn(),
  convertMarkdownToHtml: vi.fn(),
}))

vi.mock('../../src/newsletter/template', () => ({
  wrapWithTemplate: vi.fn(),
}))

vi.mock('../../src/newsletter/inline-css', () => ({
  inlineCss: vi.fn(),
}))

vi.mock('../../src/newsletter/sender', () => ({
  sendNewsletter: vi.fn(),
}))

vi.mock('../../src/config/recipients', () => ({
  getEnabledRecipients: vi.fn(),
}))

import {
  prepareNewsletterHtml,
  sendNewsletterFromFile,
} from '../../src/newsletter/index'
import { loadNewsletterMarkdown, convertMarkdownToHtml } from '../../src/newsletter/converter'
import { wrapWithTemplate } from '../../src/newsletter/template'
import { inlineCss } from '../../src/newsletter/inline-css'
import { sendNewsletter } from '../../src/newsletter/sender'
import { getEnabledRecipients } from '../../src/config/recipients'

describe('prepareNewsletterHtml', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should convert markdown to HTML with template and inline CSS', async () => {
    const markdown = '# Hello World'
    const htmlContent = '<h1>Hello World</h1>'
    const templateHtml = '<html><body><h1>Hello World</h1></body></html>'
    const inlinedHtml = '<html><body><h1 style="font-size:24px">Hello World</h1></body></html>'

    vi.mocked(convertMarkdownToHtml).mockResolvedValue(htmlContent)
    vi.mocked(wrapWithTemplate).mockReturnValue(templateHtml)
    vi.mocked(inlineCss).mockResolvedValue(inlinedHtml)

    const result = await prepareNewsletterHtml(markdown)

    expect(convertMarkdownToHtml).toHaveBeenCalledWith(markdown)
    expect(wrapWithTemplate).toHaveBeenCalledWith(htmlContent)
    expect(inlineCss).toHaveBeenCalledWith(templateHtml)
    expect(result).toBe(inlinedHtml)
  })

  it('should process markdown through all steps in order', async () => {
    const callOrder: string[] = []

    vi.mocked(convertMarkdownToHtml).mockImplementation(async () => {
      callOrder.push('convertMarkdownToHtml')
      return '<p>content</p>'
    })
    vi.mocked(wrapWithTemplate).mockImplementation(() => {
      callOrder.push('wrapWithTemplate')
      return '<html><p>content</p></html>'
    })
    vi.mocked(inlineCss).mockImplementation(async () => {
      callOrder.push('inlineCss')
      return '<html><p style="margin:0">content</p></html>'
    })

    await prepareNewsletterHtml('# Test')

    expect(callOrder).toEqual([
      'convertMarkdownToHtml',
      'wrapWithTemplate',
      'inlineCss',
    ])
  })
})

describe('sendNewsletterFromFile', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should load file, prepare HTML, and send to recipients', async () => {
    const filePath = '/path/to/newsletter.md'
    const markdown = '# Newsletter Content'
    const finalHtml = '<html><body>Newsletter</body></html>'
    const recipients = [
      { email: 'test@example.com', name: 'Test', enabled: true },
    ]
    const sendResult = {
      success: true,
      sentCount: 1,
      failedCount: 0,
      errors: [],
    }

    vi.mocked(loadNewsletterMarkdown).mockResolvedValue(markdown)
    vi.mocked(convertMarkdownToHtml).mockResolvedValue('<p>Newsletter Content</p>')
    vi.mocked(wrapWithTemplate).mockReturnValue('<html><p>Newsletter Content</p></html>')
    vi.mocked(inlineCss).mockResolvedValue(finalHtml)
    vi.mocked(getEnabledRecipients).mockResolvedValue(recipients)
    vi.mocked(sendNewsletter).mockResolvedValue(sendResult)

    const result = await sendNewsletterFromFile(filePath)

    expect(loadNewsletterMarkdown).toHaveBeenCalledWith(filePath)
    expect(getEnabledRecipients).toHaveBeenCalled()
    expect(sendNewsletter).toHaveBeenCalledWith(recipients, finalHtml, undefined)
    expect(result).toEqual(sendResult)
  })

  it('should pass custom subject to sendNewsletter', async () => {
    const filePath = '/path/to/newsletter.md'
    const customSubject = 'Custom Subject Line'
    const recipients = [
      { email: 'test@example.com', name: 'Test', enabled: true },
    ]

    vi.mocked(loadNewsletterMarkdown).mockResolvedValue('# Content')
    vi.mocked(convertMarkdownToHtml).mockResolvedValue('<h1>Content</h1>')
    vi.mocked(wrapWithTemplate).mockReturnValue('<html></html>')
    vi.mocked(inlineCss).mockResolvedValue('<html></html>')
    vi.mocked(getEnabledRecipients).mockResolvedValue(recipients)
    vi.mocked(sendNewsletter).mockResolvedValue({
      success: true,
      sentCount: 1,
      failedCount: 0,
      errors: [],
    })

    await sendNewsletterFromFile(filePath, customSubject)

    expect(sendNewsletter).toHaveBeenCalledWith(
      recipients,
      expect.any(String),
      customSubject
    )
  })

  it('should throw error if no enabled recipients', async () => {
    vi.mocked(loadNewsletterMarkdown).mockResolvedValue('# Content')
    vi.mocked(getEnabledRecipients).mockResolvedValue([])

    await expect(
      sendNewsletterFromFile('/path/to/file.md')
    ).rejects.toThrow('No enabled recipients')
  })

  it('should return send result with error details on failure', async () => {
    const recipients = [
      { email: 'test@example.com', name: 'Test', enabled: true },
    ]
    const failResult = {
      success: false,
      sentCount: 0,
      failedCount: 1,
      errors: [{ email: 'test@example.com', error: 'Send failed' }],
    }

    vi.mocked(loadNewsletterMarkdown).mockResolvedValue('# Content')
    vi.mocked(convertMarkdownToHtml).mockResolvedValue('<h1>Content</h1>')
    vi.mocked(wrapWithTemplate).mockReturnValue('<html></html>')
    vi.mocked(inlineCss).mockResolvedValue('<html></html>')
    vi.mocked(getEnabledRecipients).mockResolvedValue(recipients)
    vi.mocked(sendNewsletter).mockResolvedValue(failResult)

    const result = await sendNewsletterFromFile('/path/to/file.md')

    expect(result.success).toBe(false)
    expect(result.errors).toHaveLength(1)
  })
})
