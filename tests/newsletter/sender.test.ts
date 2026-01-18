import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  sendNewsletter,
  createEmailConfig,
  type SendResult,
} from '../../src/newsletter/sender'
import type { Recipient } from '../../src/config/recipients-schema'

// Mock resend
const mockSendFn = vi.fn()

vi.mock('resend', () => {
  return {
    Resend: class MockResend {
      emails = {
        send: mockSendFn,
      }
    },
  }
})

// Mock dotenv
vi.mock('dotenv', () => ({
  config: vi.fn(),
}))

describe('createEmailConfig', () => {
  it('should create email configuration', () => {
    const recipient: Recipient = {
      email: 'test@example.com',
      name: 'Test User',
      enabled: true,
    }
    const html = '<h1>Newsletter</h1>'
    const subject = 'Test Subject'

    const config = createEmailConfig(recipient, html, subject)

    expect(config.from).toBe('onboarding@resend.dev')
    expect(config.to).toBe('test@example.com')
    expect(config.subject).toBe('Test Subject')
    expect(config.html).toBe('<h1>Newsletter</h1>')
  })

  it('should include reply-to header', () => {
    const recipient: Recipient = {
      email: 'test@example.com',
      name: 'Test User',
      enabled: true,
    }

    const config = createEmailConfig(recipient, '<p>Content</p>', 'Subject')

    expect(config.reply_to).toBe('nattyanoranged@gmail.com')
  })

  it('should use default subject if not provided', () => {
    const recipient: Recipient = {
      email: 'test@example.com',
      name: 'Test User',
      enabled: true,
    }

    const config = createEmailConfig(recipient, '<p>Content</p>')

    expect(config.subject).toContain('UXエンジニアリング')
  })
})

describe('sendNewsletter', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    process.env.RESEND_API_KEY = 'test_api_key'
  })

  afterEach(() => {
    vi.restoreAllMocks()
    delete process.env.RESEND_API_KEY
  })

  it('should send email successfully', async () => {
    mockSendFn.mockResolvedValue({ id: 'email-123' })

    const recipients: Recipient[] = [
      { email: 'test@example.com', name: 'Test User', enabled: true },
    ]
    const html = '<h1>Newsletter</h1>'

    const result = await sendNewsletter(recipients, html)

    expect(result.success).toBe(true)
    expect(result.sentCount).toBe(1)
    expect(result.failedCount).toBe(0)
  })

  it('should handle send failure', async () => {
    mockSendFn.mockRejectedValue(new Error('Send failed'))

    const recipients: Recipient[] = [
      { email: 'test@example.com', name: 'Test User', enabled: true },
    ]
    const html = '<h1>Newsletter</h1>'

    const result = await sendNewsletter(recipients, html)

    expect(result.success).toBe(false)
    expect(result.sentCount).toBe(0)
    expect(result.failedCount).toBe(1)
  })

  it('should send to multiple recipients', async () => {
    mockSendFn.mockResolvedValue({ id: 'email-123' })

    const recipients: Recipient[] = [
      { email: 'user1@example.com', name: 'User 1', enabled: true },
      { email: 'user2@example.com', name: 'User 2', enabled: true },
    ]
    const html = '<h1>Newsletter</h1>'

    const result = await sendNewsletter(recipients, html)

    expect(result.success).toBe(true)
    expect(result.sentCount).toBe(2)
    expect(mockSendFn).toHaveBeenCalledTimes(2)
  })

  it('should return error details on partial failure', async () => {
    mockSendFn
      .mockResolvedValueOnce({ id: 'email-123' })
      .mockRejectedValueOnce(new Error('Send failed'))

    const recipients: Recipient[] = [
      { email: 'user1@example.com', name: 'User 1', enabled: true },
      { email: 'user2@example.com', name: 'User 2', enabled: true },
    ]
    const html = '<h1>Newsletter</h1>'

    const result = await sendNewsletter(recipients, html)

    expect(result.success).toBe(false)
    expect(result.sentCount).toBe(1)
    expect(result.failedCount).toBe(1)
    expect(result.errors).toHaveLength(1)
  })

  it('should throw error if API key is not set', async () => {
    delete process.env.RESEND_API_KEY

    const recipients: Recipient[] = [
      { email: 'test@example.com', name: 'Test', enabled: true },
    ]

    await expect(sendNewsletter(recipients, '<p>test</p>')).rejects.toThrow(
      'RESEND_API_KEY'
    )
  })
})
