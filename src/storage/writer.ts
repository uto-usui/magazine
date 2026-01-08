import { writeFile, mkdir, access } from 'node:fs/promises'
import { join } from 'node:path'
import { format } from 'date-fns'

export class ArticleWriter {
  constructor(private articlesDir: string) {}

  async writeArticle(content: string, title: string, date: Date): Promise<string> {
    const dateDir = format(date, 'yyyy-MM-dd')
    const dirPath = join(this.articlesDir, dateDir)
    await mkdir(dirPath, { recursive: true })

    const slug = this.sanitizeTitle(title)
    let filePath = join(dirPath, `${slug}.md`)
    let counter = 0

    while (await this.fileExists(filePath)) {
      counter++
      filePath = join(dirPath, `${slug}-${counter}.md`)
    }

    await writeFile(filePath, content, 'utf-8')
    return filePath
  }

  sanitizeTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 100)
  }

  private async fileExists(path: string): Promise<boolean> {
    try {
      await access(path)
      return true
    } catch {
      return false
    }
  }
}
