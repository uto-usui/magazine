import { createHash } from 'node:crypto'
import type { StateManager } from '../storage/state'
import type { FeedItem } from './fetcher'

export interface DiffResult {
  newArticles: FeedItem[]
  updatedArticles: FeedItem[]
  /** 未処理だが公開日が maxAgeDays より古いため取り込まない記事 */
  tooOldArticles: FeedItem[]
}

export interface DetectOptions {
  /** 指定すると、公開日がこの日数より古い未処理記事を newArticles に入れない */
  maxAgeDays?: number
  now?: Date
}

export class DiffDetector {
  constructor(private stateManager: StateManager) {}

  computeHash(content: string): string {
    return createHash('sha256').update(content).digest('hex')
  }

  detectChanges(items: FeedItem[], options: DetectOptions = {}): DiffResult {
    const newArticles: FeedItem[] = []
    const updatedArticles: FeedItem[] = []
    const tooOldArticles: FeedItem[] = []
    const cutoff =
      options.maxAgeDays === undefined
        ? null
        : (options.now ?? new Date()).getTime() - options.maxAgeDays * 24 * 60 * 60 * 1000

    for (const item of items) {
      const articleId = item.link
      const contentHash = this.computeHash(item.content || item.title)

      if (!this.stateManager.isProcessed(articleId)) {
        // 追加・再有効化したフィードの過去記事が一度に流れ込まないようにする。日付が読めない記事は通す
        const published = item.pubDate ? new Date(item.pubDate).getTime() : Number.NaN
        if (cutoff !== null && !Number.isNaN(published) && published < cutoff) {
          tooOldArticles.push(item)
        } else {
          newArticles.push(item)
        }
      } else if (this.stateManager.hasContentChanged(articleId, contentHash)) {
        updatedArticles.push(item)
      }
    }

    return { newArticles, updatedArticles, tooOldArticles }
  }

  markAsProcessed(item: FeedItem): void {
    const contentHash = this.computeHash(item.content || item.title)
    this.stateManager.markAsProcessed(item.link, contentHash)
  }
}
