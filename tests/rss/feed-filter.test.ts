import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { Feed } from '../../src/config/schema'

// Mock the environment module before importing feed-filter
vi.mock('../../src/utils/environment', () => ({
  isCI: vi.fn(),
}))

import { isFeedEnabled } from '../../src/rss/feed-filter'
import { isCI } from '../../src/utils/environment'

const mockedIsCI = vi.mocked(isCI)

describe('isFeedEnabled', () => {
  const baseFeed: Omit<Feed, 'enabled'> = {
    url: 'https://example.com/feed',
    name: 'Test Feed',
    category: 'engineering',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when enabled is true', () => {
    it('should return true regardless of environment', () => {
      const feed: Feed = { ...baseFeed, enabled: true }

      mockedIsCI.mockReturnValue(false)
      expect(isFeedEnabled(feed)).toBe(true)

      mockedIsCI.mockReturnValue(true)
      expect(isFeedEnabled(feed)).toBe(true)
    })
  })

  describe('when enabled is false', () => {
    it('should return false regardless of environment', () => {
      const feed: Feed = { ...baseFeed, enabled: false }

      mockedIsCI.mockReturnValue(false)
      expect(isFeedEnabled(feed)).toBe(false)

      mockedIsCI.mockReturnValue(true)
      expect(isFeedEnabled(feed)).toBe(false)
    })
  })

  describe('when enabled is "local"', () => {
    it('should return true in local environment (non-CI)', () => {
      const feed: Feed = { ...baseFeed, enabled: 'local' }
      mockedIsCI.mockReturnValue(false)

      expect(isFeedEnabled(feed)).toBe(true)
    })

    it('should return false in CI environment', () => {
      const feed: Feed = { ...baseFeed, enabled: 'local' }
      mockedIsCI.mockReturnValue(true)

      expect(isFeedEnabled(feed)).toBe(false)
    })
  })
})
