import { describe, it, expect } from 'vitest'
import { FeedConfigSchema, type FeedConfig } from '../src/config/schema'

describe('FeedConfigSchema', () => {
  it('should validate a valid feed config', () => {
    const validConfig = {
      feeds: [
        {
          url: 'https://netflixtechblog.com/feed',
          name: 'Netflix Tech Blog',
          category: 'engineering',
        },
      ],
    }

    const result = FeedConfigSchema.safeParse(validConfig)
    expect(result.success).toBe(true)
  })

  it('should reject invalid URL', () => {
    const invalidConfig = {
      feeds: [
        {
          url: 'not-a-url',
          name: 'Test',
          category: 'engineering',
        },
      ],
    }

    const result = FeedConfigSchema.safeParse(invalidConfig)
    expect(result.success).toBe(false)
  })

  it('should reject empty feeds array', () => {
    const invalidConfig = {
      feeds: [],
    }

    const result = FeedConfigSchema.safeParse(invalidConfig)
    expect(result.success).toBe(false)
  })

  it('should accept optional enabled field', () => {
    const config = {
      feeds: [
        {
          url: 'https://example.com/feed',
          name: 'Test',
          category: 'engineering',
          enabled: false,
        },
      ],
    }

    const result = FeedConfigSchema.safeParse(config)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.feeds[0].enabled).toBe(false)
    }
  })
})
