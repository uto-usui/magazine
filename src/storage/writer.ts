import { writeFile, mkdir, access } from 'node:fs/promises'
import { join } from 'node:path'
import { format } from 'date-fns'

export class ArticleWriter {
  constructor(private articlesDir: string) {}

  async writeArticle(content: string, title: string, date: Date, sourceUrl: string): Promise<string> {
    const dateDir = format(date, 'yyyy-MM-dd')
    const dirPath = join(this.articlesDir, dateDir)
    await mkdir(dirPath, { recursive: true })

    const slug = this.generateSlug(title, sourceUrl)
    let filePath = join(dirPath, `${slug}.md`)
    let counter = 0

    while (await this.fileExists(filePath)) {
      counter++
      filePath = join(dirPath, `${slug}-${counter}.md`)
    }

    await writeFile(filePath, content, 'utf-8')
    return filePath
  }

  /**
   * Generate a slug from title, falling back to URL if title produces invalid result.
   * This preserves existing English article filenames while fixing Japanese titles.
   */
  generateSlug(title: string, sourceUrl: string): string {
    const titleSlug = this.sanitizeTitle(title)

    // If title slug is valid (not empty, not just numbers), use it
    if (titleSlug && !/^\d+$/.test(titleSlug)) {
      return titleSlug
    }

    // Otherwise, fall back to URL-based slug
    return this.generateSlugFromUrl(sourceUrl)
  }

  /**
   * Generate a slug from the article's source URL.
   * Example: https://ics.media/entry/251002/ → ics-media-entry-251002
   * Example: https://engineering.mercari.com/blog/entry/20251007-553f1424b6/ → mercari-blog-entry-20251007-553f1424b6
   */
  generateSlugFromUrl(url: string): string {
    try {
      const parsed = new URL(url)

      // Extract domain name: remove www. and split by dots
      const hostParts = parsed.hostname
        .replace(/^www\./, '')
        .split('.')

      // Take first 1-2 meaningful parts of domain
      // e.g., 'ics.media' → 'ics-media', 'engineering.mercari.com' → 'mercari'
      let domain: string
      if (hostParts.length >= 3) {
        // Subdomain case: use second-to-last part (e.g., 'mercari' from 'engineering.mercari.com')
        domain = hostParts[hostParts.length - 2]
      } else if (hostParts.length === 2) {
        // Simple domain: use both parts (e.g., 'ics-media' from 'ics.media')
        domain = hostParts.join('-')
      } else {
        domain = hostParts[0]
      }

      // Extract path segments (filter empty ones)
      const pathSegments = parsed.pathname
        .split('/')
        .filter(segment => segment.length > 0)
        .slice(-3) // Take last 3 segments to keep it reasonable

      // Combine domain and path
      const combined = [domain, ...pathSegments].join('-')

      // Sanitize: only allow alphanumeric, hyphens
      return combined
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 100)
    } catch {
      // Fallback: use hash of URL if parsing fails
      return `article-${this.simpleHash(url)}`
    }
  }

  private simpleHash(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36)
  }

  /**
   * Sanitize title for use as filename slug.
   * Works well for English titles but may produce empty/invalid results for Japanese.
   */
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
