import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { DiffDetector } from '../src/rss/diff'
import { StateManager } from '../src/storage/state'
import type { FeedItem } from '../src/rss/fetcher'

const TEST_STATE_DIR = join(process.cwd(), 'test-diff-url-state')

describe('DiffDetector with URL normalization', () => {
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

  it('treats a URL with newly-added tracking params as already processed', () => {
    stateManager.markAsProcessed(
      'https://ics.media/entry/12345/',
      diffDetector.computeHash('body'),
    )

    const items: FeedItem[] = [
      {
        title: 'Same article, feed added utm_*',
        link: 'https://ics.media/entry/12345/?utm_source=atom&utm_medium=referral&utm_campaign=feed',
        pubDate: null,
        author: null,
        content: 'body',
        feedName: 'ICS MEDIA',
        category: 'frontend',
      },
    ]

    const result = diffDetector.detectChanges(items)
    expect(result.newArticles).toHaveLength(0)
    expect(result.updatedArticles).toHaveLength(0)
  })

  it('migrates legacy state keys that contain tracking params on load', async () => {
    const filePath = join(TEST_STATE_DIR, 'processed.json')
    await writeFile(
      filePath,
      JSON.stringify({
        processedArticles: {
          'https://uxwritinghub.com/post?utm_source=rss&utm_medium=rss': {
            contentHash: 'hash',
            processedAt: '2026-01-01T00:00:00.000Z',
          },
        },
        lastRun: null,
      }),
    )

    const freshState = new StateManager(TEST_STATE_DIR)
    await freshState.load()

    expect(freshState.isProcessed('https://uxwritinghub.com/post')).toBe(true)
  })
})
