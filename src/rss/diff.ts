import { createHash } from 'node:crypto'
import type { StateManager } from '../storage/state'
import type { FeedItem } from './fetcher'

export interface DiffResult {
  newArticles: FeedItem[]
  updatedArticles: FeedItem[]
}

export class DiffDetector {
  constructor(private stateManager: StateManager) {}

  computeHash(content: string): string {
    return createHash('sha256').update(content).digest('hex')
  }

  detectChanges(items: FeedItem[]): DiffResult {
    const newArticles: FeedItem[] = []
    const updatedArticles: FeedItem[] = []

    for (const item of items) {
      const articleId = item.link
      const contentHash = this.computeHash(item.content || item.title)

      if (!this.stateManager.isProcessed(articleId)) {
        newArticles.push(item)
      } else if (this.stateManager.hasContentChanged(articleId, contentHash)) {
        updatedArticles.push(item)
      }
    }

    return { newArticles, updatedArticles }
  }

  markAsProcessed(item: FeedItem): void {
    const contentHash = this.computeHash(item.content || item.title)
    this.stateManager.markAsProcessed(item.link, contentHash)
  }
}
