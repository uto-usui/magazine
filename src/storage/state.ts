import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

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

export class StateManager {
  private state: State = { ...DEFAULT_STATE }
  private readonly filePath: string

  constructor(stateDir: string) {
    this.filePath = join(stateDir, 'processed.json')
  }

  async load(): Promise<void> {
    try {
      const content = await readFile(this.filePath, 'utf-8')
      this.state = JSON.parse(content)
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
    return articleId in this.state.processedArticles
  }

  getContentHash(articleId: string): string | null {
    return this.state.processedArticles[articleId]?.contentHash ?? null
  }

  hasContentChanged(articleId: string, newHash: string): boolean {
    const existingHash = this.getContentHash(articleId)
    if (existingHash === null) return true
    return existingHash !== newHash
  }

  markAsProcessed(articleId: string, contentHash: string): void {
    this.state.processedArticles[articleId] = {
      contentHash,
      processedAt: new Date().toISOString(),
    }
  }
}
