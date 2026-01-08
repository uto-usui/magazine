import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { StateManager } from '../src/storage/state'

const TEST_STATE_DIR = join(process.cwd(), 'test-state')

describe('StateManager', () => {
  let stateManager: StateManager

  beforeEach(async () => {
    await mkdir(TEST_STATE_DIR, { recursive: true })
    stateManager = new StateManager(TEST_STATE_DIR)
  })

  afterEach(async () => {
    await rm(TEST_STATE_DIR, { recursive: true, force: true })
  })

  it('should initialize with empty state if file does not exist', async () => {
    await stateManager.load()
    const state = stateManager.getState()

    expect(state.processedArticles).toEqual({})
    expect(state.lastRun).toBeNull()
  })

  it('should mark an article as processed', async () => {
    await stateManager.load()

    const articleId = 'https://example.com/article-1'
    const contentHash = 'abc123'

    stateManager.markAsProcessed(articleId, contentHash)

    expect(stateManager.isProcessed(articleId)).toBe(true)
    expect(stateManager.getContentHash(articleId)).toBe(contentHash)
  })

  it('should detect content changes via hash', async () => {
    await stateManager.load()

    const articleId = 'https://example.com/article-1'
    stateManager.markAsProcessed(articleId, 'hash1')

    expect(stateManager.hasContentChanged(articleId, 'hash1')).toBe(false)
    expect(stateManager.hasContentChanged(articleId, 'hash2')).toBe(true)
  })

  it('should persist state to file', async () => {
    await stateManager.load()

    stateManager.markAsProcessed('article-1', 'hash1')
    await stateManager.save()

    const newManager = new StateManager(TEST_STATE_DIR)
    await newManager.load()

    expect(newManager.isProcessed('article-1')).toBe(true)
    expect(newManager.getContentHash('article-1')).toBe('hash1')
  })

  it('should update lastRun timestamp on save', async () => {
    await stateManager.load()
    await stateManager.save()

    const state = stateManager.getState()
    expect(state.lastRun).not.toBeNull()
  })
})
