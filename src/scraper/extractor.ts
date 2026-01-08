import axios from 'axios'
import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'

export interface ExtractedContent {
  title: string
  content: string
  textContent: string
  excerpt: string | null
  byline: string | null
  images: string[]
}

export class ContentExtractor {
  private readonly timeout = 10000
  private readonly userAgent = 'UX-Eng-Magazine-Scraper/1.0'

  extractFromHtml(html: string, url: string): ExtractedContent | null {
    const dom = new JSDOM(html, { url })
    const reader = new Readability(dom.window.document)
    const article = reader.parse()

    if (!article) {
      return null
    }

    const images = this.extractImages(article.content, url)

    return {
      title: article.title,
      content: article.content,
      textContent: article.textContent,
      excerpt: article.excerpt,
      byline: article.byline,
      images,
    }
  }

  async extractFromUrl(url: string): Promise<ExtractedContent | null> {
    try {
      const response = await axios.get(url, {
        timeout: this.timeout,
        headers: {
          'User-Agent': this.userAgent,
        },
        validateStatus: (status) => status < 500,
      })

      if (response.status === 404) {
        console.log(`404 Not Found: ${url}`)
        return null
      }

      if (response.status >= 400) {
        console.log(`HTTP ${response.status}: ${url}`)
        return null
      }

      return this.extractFromHtml(response.data, url)
    } catch (error) {
      console.error(`Failed to fetch ${url}: ${(error as Error).message}`)
      return null
    }
  }

  private extractImages(htmlContent: string, baseUrl: string): string[] {
    const dom = new JSDOM(htmlContent)
    const images = dom.window.document.querySelectorAll('img')
    const imageUrls: string[] = []

    images.forEach((img) => {
      const src = img.getAttribute('src')
      if (src) {
        try {
          const absoluteUrl = new URL(src, baseUrl).href
          imageUrls.push(absoluteUrl)
        } catch {
          // Invalid URL, skip
        }
      }
    })

    return imageUrls
  }
}
