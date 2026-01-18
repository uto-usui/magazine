import { describe, it, expect } from 'vitest'
import {
  RecipientSchema,
  RecipientsConfigSchema,
  type Recipient,
  type RecipientsConfig,
} from '../src/config/recipients-schema'

describe('RecipientSchema', () => {
  it('should validate a valid recipient', () => {
    const validRecipient = {
      email: 'test@example.com',
      name: 'Test User',
      enabled: true,
    }
    const result = RecipientSchema.safeParse(validRecipient)
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const invalidRecipient = {
      email: 'not-an-email',
      name: 'Test User',
      enabled: true,
    }
    const result = RecipientSchema.safeParse(invalidRecipient)
    expect(result.success).toBe(false)
  })

  it('should reject empty name', () => {
    const invalidRecipient = {
      email: 'test@example.com',
      name: '',
      enabled: true,
    }
    const result = RecipientSchema.safeParse(invalidRecipient)
    expect(result.success).toBe(false)
  })

  it('should default enabled to true', () => {
    const recipientWithoutEnabled = {
      email: 'test@example.com',
      name: 'Test User',
    }
    const result = RecipientSchema.parse(recipientWithoutEnabled)
    expect(result.enabled).toBe(true)
  })
})

describe('RecipientsConfigSchema', () => {
  it('should validate a valid config', () => {
    const validConfig = {
      recipients: [
        { email: 'user1@example.com', name: 'User 1', enabled: true },
        { email: 'user2@example.com', name: 'User 2', enabled: false },
      ],
    }
    const result = RecipientsConfigSchema.safeParse(validConfig)
    expect(result.success).toBe(true)
  })

  it('should reject config with no recipients', () => {
    const invalidConfig = {
      recipients: [],
    }
    const result = RecipientsConfigSchema.safeParse(invalidConfig)
    expect(result.success).toBe(false)
  })

  it('should reject duplicate email addresses', () => {
    const duplicateConfig = {
      recipients: [
        { email: 'same@example.com', name: 'User 1', enabled: true },
        { email: 'same@example.com', name: 'User 2', enabled: true },
      ],
    }
    const result = RecipientsConfigSchema.safeParse(duplicateConfig)
    expect(result.success).toBe(false)
  })
})

describe('Type exports', () => {
  it('should export Recipient type', () => {
    const recipient: Recipient = {
      email: 'test@example.com',
      name: 'Test User',
      enabled: true,
    }
    expect(recipient.email).toBe('test@example.com')
  })

  it('should export RecipientsConfig type', () => {
    const config: RecipientsConfig = {
      recipients: [
        { email: 'test@example.com', name: 'Test User', enabled: true },
      ],
    }
    expect(config.recipients.length).toBe(1)
  })
})
