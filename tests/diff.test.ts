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
})
