import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { DiffDetector } from '../src/rss/diff'
import { StateManager } from '../src/storage/state'
import type { FeedItem } from '../src/rss/fetcher'

const TEST_STATE_DIR = join(process.cwd(), 'test-diff-state')

describe('DiffDetector', () => {
  let stateManager: StateManager
  let diffDetector: DiffDetector

  beforeEach(async () => {
    await mkdir(TEST_STATE_DIR, { recursive: true })
    stateManager = new StateManager(TEST_STATE_DIR)
    await stateManager.load()
    diffDetector = new DiffDetector(stateManager)
  })

  afterEach(async () => {
    await rm(TEST_STATE_DIR, { recursive: true, force: true })
  })

  it('should detect new articles', () => {
    const items: FeedItem[] = [
      {
        title: 'New Article',
        link: 'https://example.com/article-1',
        pubDate: '2024-01-01',
        author: 'Author',
        content: 'Content',
        feedName: 'Test Feed',
        category: 'test',
      },
    ]

    const result = diffDetector.detectChanges(items)

    expect(result.newArticles).toHaveLength(1)
    expect(result.updatedArticles).toHaveLength(0)
  })

  it('should detect updated articles when content changes', () => {
    const articleId = 'https://example.com/article-1'
    stateManager.markAsProcessed(articleId, 'old-hash')

    const items: FeedItem[] = [
      {
        title: 'Updated Article',
        link: articleId,
        pubDate: '2024-01-02',
        author: 'Author',
        content: 'New Content - different from before',
        feedName: 'Test Feed',
        category: 'test',
      },
    ]

    const result = diffDetector.detectChanges(items)

    expect(result.newArticles).toHaveLength(0)
    expect(result.updatedArticles).toHaveLength(1)
  })

  it('should skip unchanged articles', () => {
    const articleId = 'https://example.com/article-1'
    const content = 'Same Content'
    const hash = diffDetector.computeHash(content)
    stateManager.markAsProcessed(articleId, hash)

    const items: FeedItem[] = [
      {
        title: 'Same Article',
        link: articleId,
        pubDate: '2024-01-01',
        author: 'Author',
        content: content,
        feedName: 'Test Feed',
        category: 'test',
      },
    ]

    const result = diffDetector.detectChanges(items)

    expect(result.newArticles).toHaveLength(0)
    expect(result.updatedArticles).toHaveLength(0)
  })

  it('should compute consistent hashes', () => {
    const content = 'Test Content'
    const hash1 = diffDetector.computeHash(content)
    const hash2 = diffDetector.computeHash(content)

    expect(hash1).toBe(hash2)
  })

  describe('maxAgeDays', () => {
    const now = new Date('2026-11-02T00:00:00Z')
    const item = (link: string, pubDate: string | null): FeedItem => ({
      title: link,
      link,
      pubDate,
      author: null,
      content: 'Content',
      feedName: 'Test Feed',
      category: 'test',
    })

    it('should skip unprocessed articles older than maxAgeDays', () => {
      const result = diffDetector.detectChanges(
        [item('https://example.com/new', '2026-10-20'), item('https://example.com/old', '2026-09-01')],
        { maxAgeDays: 30, now }
      )

      expect(result.newArticles.map((a) => a.link)).toEqual(['https://example.com/new'])
      expect(result.tooOldArticles.map((a) => a.link)).toEqual(['https://example.com/old'])
    })

    it('should keep articles whose pubDate is missing or unparsable', () => {
      const result = diffDetector.detectChanges(
        [item('https://example.com/none', null), item('https://example.com/bad', 'Invalid Date')],
        { maxAgeDays: 30, now }
      )

      expect(result.newArticles).toHaveLength(2)
      expect(result.tooOldArticles).toHaveLength(0)
    })

    it('should not filter by age when maxAgeDays is not given', () => {
      const result = diffDetector.detectChanges([item('https://example.com/old', '2020-01-01')])

      expect(result.newArticles).toHaveLength(1)
    })
  })
})
