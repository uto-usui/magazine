import { describe, it, expect } from 'vitest'
import { CategoryConfigSchema, type CategoryConfig } from '../src/config/schema'

describe('CategoryConfigSchema', () => {
  it('should validate a valid category config', () => {
    const validConfig = {
      categories: [
        {
          id: 'engineering',
          name: 'Engineering',
          description: 'Tech company engineering blogs',
        },
      ],
    }

    const result = CategoryConfigSchema.safeParse(validConfig)
    expect(result.success).toBe(true)
  })

  it('should reject empty categories array', () => {
    const invalidConfig = {
      categories: [],
    }

    const result = CategoryConfigSchema.safeParse(invalidConfig)
    expect(result.success).toBe(false)
  })

  it('should reject duplicate category ids', () => {
    const invalidConfig = {
      categories: [
        { id: 'engineering', name: 'Engineering' },
        { id: 'engineering', name: 'Engineering Duplicate' },
      ],
    }

    const result = CategoryConfigSchema.safeParse(invalidConfig)
    expect(result.success).toBe(false)
  })

  it('should accept optional description and color', () => {
    const config = {
      categories: [
        {
          id: 'css',
          name: 'CSS',
          color: '#264de4',
        },
      ],
    }

    const result = CategoryConfigSchema.safeParse(config)
    expect(result.success).toBe(true)
  })
})
