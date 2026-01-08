import axios from 'axios'
import { writeFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { createHash } from 'node:crypto'

interface ImageDownloaderOptions {
  maxSizeBytes: number
  concurrency: number
}

export class ImageDownloader {
  private readonly defaultOptions: ImageDownloaderOptions = {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB default
    concurrency: 5,
  }
  private options: ImageDownloaderOptions

  constructor(
    private imagesDir: string,
    options?: Partial<ImageDownloaderOptions>
  ) {
    this.options = { ...this.defaultOptions, ...options }
  }

  async downloadImage(url: string, articleSlug: string): Promise<string | null> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000,
        maxContentLength: this.options.maxSizeBytes,
        headers: {
          'User-Agent': 'UX-Eng-Magazine-Image-Downloader/1.0',
        },
      })

      const contentLength = response.headers['content-length']
      if (contentLength && parseInt(contentLength) > this.options.maxSizeBytes) {
        console.log(`Image too large, skipping: ${url}`)
        return null
      }

      const localPath = this.generateLocalPath(url, articleSlug)
      await this.ensureArticleDir(articleSlug)
      await writeFile(localPath, response.data)

      return localPath
    } catch (error) {
      console.error(`Failed to download image ${url}: ${(error as Error).message}`)
      return null
    }
  }

  async downloadImages(
    urls: string[],
    articleSlug: string
  ): Promise<Map<string, string>> {
    const results = new Map<string, string>()

    // Process images in parallel with concurrency limit
    const downloadResults = await this.runWithConcurrency(
      urls,
      async (url) => {
        const localPath = await this.downloadImage(url, articleSlug)
        return { url, localPath }
      },
      this.options.concurrency
    )

    for (const { url, localPath } of downloadResults) {
      if (localPath) {
        results.set(url, localPath)
      }
    }

    return results
  }

  private async runWithConcurrency<T, R>(
    items: T[],
    fn: (item: T) => Promise<R>,
    concurrency: number
  ): Promise<R[]> {
    const results: R[] = new Array(items.length)
    let currentIndex = 0

    const worker = async (): Promise<void> => {
      while (currentIndex < items.length) {
        const index = currentIndex++
        results[index] = await fn(items[index])
      }
    }

    const workers = Array.from(
      { length: Math.min(concurrency, items.length) },
      () => worker()
    )

    await Promise.all(workers)
    return results
  }

  generateLocalPath(url: string, articleSlug: string): string {
    const ext = this.getExtension(url)
    const hash = createHash('md5').update(url).digest('hex').slice(0, 8)
    const filename = `${hash}.${ext}`

    return join(this.imagesDir, articleSlug, filename)
  }

  getExtension(url: string): string {
    try {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      const ext = extname(pathname).slice(1).toLowerCase()

      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
      if (validExtensions.includes(ext)) {
        return ext
      }
    } catch {
      // Invalid URL
    }

    return 'jpg'
  }

  async ensureArticleDir(articleSlug: string): Promise<void> {
    const dirPath = join(this.imagesDir, articleSlug)
    await mkdir(dirPath, { recursive: true })
  }
}
