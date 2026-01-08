import { describe, it, expect } from 'vitest'
import { loadFeedConfig, loadCategoryConfig } from '../src/config/loader'

describe('loadFeedConfig', () => {
  it('should load and validate feeds.yml', async () => {
    const config = await loadFeedConfig()

    expect(config.feeds).toBeDefined()
    expect(config.feeds.length).toBeGreaterThan(0)
    expect(config.feeds[0]).toHaveProperty('url')
    expect(config.feeds[0]).toHaveProperty('name')
    expect(config.feeds[0]).toHaveProperty('category')
  })

  it('should have valid URLs in all feeds', async () => {
    const config = await loadFeedConfig()

    for (const feed of config.feeds) {
      expect(() => new URL(feed.url)).not.toThrow()
    }
  })
})

describe('loadCategoryConfig', () => {
  it('should load and validate categories.yml', async () => {
    const config = await loadCategoryConfig()

    expect(config.categories).toBeDefined()
    expect(config.categories.length).toBeGreaterThan(0)
    expect(config.categories[0]).toHaveProperty('id')
    expect(config.categories[0]).toHaveProperty('name')
  })

  it('should have unique category IDs', async () => {
    const config = await loadCategoryConfig()
    const ids = config.categories.map((c) => c.id)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(ids.length)
  })
})
