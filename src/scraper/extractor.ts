import axios from 'axios'
import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'
import { chromium, type Browser } from 'playwright'

export interface ExtractedContent {
  title: string
  content: string
  textContent: string
  excerpt: string | null
  byline: string | null
  images: string[]
  fetchedBy?: 'playwright' | 'http'
}

export class ContentExtractor {
  private readonly timeout = 15000
  private readonly maxRetries = 3
  private readonly retryDelay = 2000
  private readonly minContentLength = 300 // 最小コンテンツ長（これより短いとフォールバック）

  // Bot対策の可能性があるステータスコード
  private readonly botProtectionStatuses = [401, 403, 429]

  // ブラウザに近いヘッダー
  private readonly headers = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  }

  extractFromHtml(html: string, url: string): ExtractedContent | null {
    const dom = new JSDOM(html, { url })
    const reader = new Readability(dom.window.document)
    const article = reader.parse()

    if (!article) {
      return null
    }

    const content = article.content ?? ''
    const textContent = article.textContent ?? ''

    // [object Object] バグの検出
    if (content.includes('[object Object]') || textContent.includes('[object Object]')) {
      console.log(`⚠️ Readability bug detected ([object Object]): ${url}`)
      return null
    }

    // コンテンツが異常に短い場合はフォールバック（メタ情報のみの可能性）
    if (textContent.length < this.minContentLength) {
      console.log(
        `⚠️ Content too short (${textContent.length} chars < ${this.minContentLength}): ${url}`
      )
      return null
    }

    const images = this.extractImages(content, url)

    return {
      title: article.title ?? '',
      content,
      textContent,
      excerpt: article.excerpt ?? null,
      byline: article.byline ?? null,
      images,
    }
  }

  async extractFromUrl(url: string): Promise<ExtractedContent | null> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await axios.get(url, {
          timeout: this.timeout,
          headers: this.headers,
          validateStatus: (status) => status < 500,
        })

        if (response.status === 404) {
          console.log(`404 Not Found: ${url}`)
          return null
        }

        // Bot対策の可能性がある場合、Playwrightでリトライ
        if (this.botProtectionStatuses.includes(response.status)) {
          console.log(`🤖 Bot protection detected (HTTP ${response.status}), trying Playwright: ${url}`)
          return await this.extractWithPlaywright(url)
        }

        if (response.status >= 400) {
          console.log(`HTTP ${response.status}: ${url}`)
          return null
        }

        const result = this.extractFromHtml(response.data, url)

        // 抽出成功
        if (result !== null) {
          return result
        }

        // Readabilityが失敗した場合、同じHTMLでリトライしても無意味
        // Playwrightでリトライ（JSレンダリングが必要な可能性）
        console.log(`🔄 Readability failed, trying Playwright: ${url}`)
        const playwrightResult = await this.extractWithPlaywright(url)
        if (playwrightResult !== null) {
          return playwrightResult
        }

        // Playwrightでも失敗した場合、リトライの価値は低いが一応試す
        if (attempt < this.maxRetries) {
          console.log(`⏳ Retry ${attempt}/${this.maxRetries} for: ${url}`)
          await this.sleep(this.retryDelay * attempt)
        }
      } catch (error) {
        lastError = error as Error

        if (attempt < this.maxRetries) {
          console.log(
            `⏳ Retry ${attempt}/${this.maxRetries} after error: ${lastError.message}`
          )
          await this.sleep(this.retryDelay * attempt)
        }
      }
    }

    if (lastError) {
      console.error(`Failed to fetch ${url} after ${this.maxRetries} retries: ${lastError.message}`)
    }
    return null
  }

  /**
   * Playwrightを使ってBot対策を回避してコンテンツを取得
   */
  private async extractWithPlaywright(url: string): Promise<ExtractedContent | null> {
    let browser: Browser | null = null

    try {
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })

      const context = await browser.newContext({
        userAgent: this.headers['User-Agent'],
        locale: 'en-US',
        viewport: { width: 1280, height: 720 },
      })

      const page = await context.newPage()

      // ページ読み込み（domcontentloadedで基本構造ができたら続行）
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      })

      // JSレンダリングを待機
      await this.sleep(3000)

      // スクロールして遅延ロードコンテンツを読み込む
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
      await this.sleep(1000)

      // HTMLを取得
      const html = await page.content()

      await browser.close()
      browser = null

      console.log(`✅ Playwright successfully fetched: ${url}`)
      const result = this.extractFromHtml(html, url)
      if (result) {
        result.fetchedBy = 'playwright'
      }
      return result
    } catch (error) {
      console.error(`❌ Playwright failed for ${url}: ${(error as Error).message}`)
      return null
    } finally {
      if (browser) {
        await browser.close()
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private extractImages(htmlContent: string, baseUrl: string): string[] {
    const dom = new JSDOM(htmlContent)
    const images = dom.window.document.querySelectorAll('img')
    const imageUrls: string[] = []

    images.forEach((img: Element) => {
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
