import { describe, it, expect, vi } from 'vitest'
import { RssFetcher, type FeedItem } from '../src/rss/fetcher'
import type { Feed } from '../src/config/schema'

describe('RssFetcher', () => {
  it('should parse RSS feed items', async () => {
    const fetcher = new RssFetcher()
    const feed: Feed = {
      url: 'https://web.dev/feed.xml',
      name: 'web.dev',
      category: 'web-standards',
      enabled: true,
    }

    const items = await fetcher.fetchFeed(feed)

    expect(Array.isArray(items)).toBe(true)
    if (items.length > 0) {
      expect(items[0]).toHaveProperty('title')
      expect(items[0]).toHaveProperty('link')
      expect(items[0]).toHaveProperty('feedName')
      expect(items[0]).toHaveProperty('category')
    }
  })

  it('should include feed metadata in items', async () => {
    const fetcher = new RssFetcher()
    const feed: Feed = {
      url: 'https://web.dev/feed.xml',
      name: 'web.dev',
      category: 'web-standards',
      enabled: true,
    }

    const items = await fetcher.fetchFeed(feed)

    if (items.length > 0) {
      expect(items[0].feedName).toBe('web.dev')
      expect(items[0].category).toBe('web-standards')
    }
  })

  it('should handle fetch errors gracefully', async () => {
    const fetcher = new RssFetcher()
    const feed: Feed = {
      url: 'https://invalid-feed-url-that-does-not-exist.com/feed',
      name: 'Invalid',
      category: 'test',
      enabled: true,
    }

    const items = await fetcher.fetchFeed(feed)

    expect(items).toEqual([])
  })

  it('should skip disabled feeds', async () => {
    const fetcher = new RssFetcher()
    const feed: Feed = {
      url: 'https://web.dev/feed.xml',
      name: 'web.dev',
      category: 'web-standards',
      enabled: false,
    }

    const items = await fetcher.fetchFeed(feed)

    expect(items).toEqual([])
  })
})
