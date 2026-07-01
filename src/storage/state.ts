import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { normalizeUrl } from '../utils/url'

interface ProcessedArticle {
  contentHash: string
  processedAt: string
}

interface State {
  processedArticles: Record<string, ProcessedArticle>
  lastRun: string | null
}

const DEFAULT_STATE: State = {
  processedArticles: {},
  lastRun: null,
}

function normalizeProcessedArticles(
  articles: Record<string, ProcessedArticle>,
): Record<string, ProcessedArticle> {
  const result: Record<string, ProcessedArticle> = {}
  for (const [key, value] of Object.entries(articles)) {
    const normalizedKey = normalizeUrl(key)
    const existing = result[normalizedKey]
    if (!existing || value.processedAt > existing.processedAt) {
      result[normalizedKey] = value
    }
  }
  return result
}

export class StateManager {
  private state: State = { ...DEFAULT_STATE }
  private readonly filePath: string

  constructor(stateDir: string) {
    this.filePath = join(stateDir, 'processed.json')
  }

  async load(): Promise<void> {
    try {
      const content = await readFile(this.filePath, 'utf-8')
      const parsed: State = JSON.parse(content)
      this.state = {
        ...parsed,
        processedArticles: normalizeProcessedArticles(parsed.processedArticles),
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        this.state = { ...DEFAULT_STATE }
      } else {
        throw error
      }
    }
  }

  async save(): Promise<void> {
    this.state.lastRun = new Date().toISOString()
    const dir = join(this.filePath, '..')
    await mkdir(dir, { recursive: true })
    await writeFile(this.filePath, JSON.stringify(this.state, null, 2), 'utf-8')
  }

  getState(): State {
    return { ...this.state }
  }

  isProcessed(articleId: string): boolean {
    return normalizeUrl(articleId) in this.state.processedArticles
  }

  getContentHash(articleId: string): string | null {
    return (
      this.state.processedArticles[normalizeUrl(articleId)]?.contentHash ?? null
    )
  }

  hasContentChanged(articleId: string, newHash: string): boolean {
    const existingHash = this.getContentHash(articleId)
    if (existingHash === null) return true
    return existingHash !== newHash
  }

  markAsProcessed(articleId: string, contentHash: string): void {
    this.state.processedArticles[normalizeUrl(articleId)] = {
      contentHash,
      processedAt: new Date().toISOString(),
    }
  }
}
