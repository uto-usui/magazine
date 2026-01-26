import Parser from 'rss-parser'
import { chromium, type Browser } from 'playwright'
import type { Feed } from '../config/schema'

export interface FeedItem {
  title: string
  link: string
  pubDate: string | null
  author: string | null
  content: string | null
  feedName: string
  category: string
}

export class RssFetcher {
  private parser: Parser

  // Bot対策の可能性があるステータスコード
  private readonly botProtectionStatuses = [401, 403, 429]

  // ブラウザに近いヘッダー
  private readonly browserHeaders = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept:
      'application/rss+xml,application/xml,text/xml,application/atom+xml,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8',
  }

  constructor() {
    this.parser = new Parser({
      timeout: 10000,
      headers: {
        'User-Agent': 'UX-Eng-Magazine-RSS-Reader/1.0',
      },
    })
  }

  async fetchFeed(feed: Feed): Promise<FeedItem[]> {
    if (!feed.enabled) {
      return []
    }

    try {
      const parsed = await this.parser.parseURL(feed.url)
      return this.mapItems(parsed.items || [], feed)
    } catch (error) {
      const errorMessage = (error as Error).message

      // Bot対策によるブロックかどうかを判定
      if (this.isBotProtectionError(errorMessage)) {
        console.log(`🤖 Bot protection detected for ${feed.name}, trying Playwright...`)
        return await this.fetchWithPlaywright(feed)
      }

      console.error(`Failed to fetch feed ${feed.name}: ${errorMessage}`)
      return []
    }
  }

  /**
   * エラーメッセージからBot対策によるブロックかどうかを判定
   */
  private isBotProtectionError(errorMessage: string): boolean {
    for (const status of this.botProtectionStatuses) {
      if (errorMessage.includes(`Status code ${status}`) ||
          errorMessage.includes(`status code ${status}`)) {
        return true
      }
    }
    return false
  }

  /**
   * Playwrightを使ってBot対策を回避してRSSを取得
   */
  private async fetchWithPlaywright(feed: Feed): Promise<FeedItem[]> {
    let browser: Browser | null = null

    try {
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })

      const context = await browser.newContext({
        userAgent: this.browserHeaders['User-Agent'],
        locale: 'en-US',
      })

      const page = await context.newPage()

      // RSSフィードURLに直接アクセス
      const response = await page.goto(feed.url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      })

      if (!response) {
        throw new Error('No response received')
      }

      const status = response.status()
      if (status >= 400) {
        throw new Error(`HTTP ${status}`)
      }

      // XMLコンテンツを取得
      const content = await page.content()

      // HTMLラッパーを除去してXMLを抽出
      const xmlContent = this.extractXmlFromPage(content)

      await browser.close()
      browser = null

      // rss-parserでパース
      const parsed = await this.parser.parseString(xmlContent)
      console.log(`✅ Playwright successfully fetched feed: ${feed.name}`)

      return this.mapItems(parsed.items || [], feed)
    } catch (error) {
      console.error(`❌ Playwright failed for ${feed.name}: ${(error as Error).message}`)
      return []
    } finally {
      if (browser) {
        await browser.close()
      }
    }
  }

  /**
   * ページコンテンツからXMLを抽出
   * ブラウザはXMLをHTMLでラップすることがあるため
   */
  private extractXmlFromPage(content: string): string {
    // <?xml で始まる場合はそのまま返す
    if (content.trim().startsWith('<?xml')) {
      return content
    }

    // <rss または <feed タグを探す
    const rssMatch = content.match(/<rss[\s\S]*<\/rss>/i)
    if (rssMatch) {
      return '<?xml version="1.0" encoding="UTF-8"?>' + rssMatch[0]
    }

    const feedMatch = content.match(/<feed[\s\S]*<\/feed>/i)
    if (feedMatch) {
      return '<?xml version="1.0" encoding="UTF-8"?>' + feedMatch[0]
    }

    // 見つからない場合はそのまま返す（パースエラーになる可能性あり）
    return content
  }

  private mapItems(items: Parser.Item[], feed: Feed): FeedItem[] {
    return items.map((item) => ({
      title: item.title || 'Untitled',
      link: item.link || '',
      pubDate: item.pubDate || item.isoDate || null,
      author: item.creator || (item as Record<string, unknown>).author as string || null,
      content: item.content || item.contentSnippet || null,
      feedName: feed.name,
      category: feed.category,
    }))
  }

  async fetchAllFeeds(feeds: Feed[]): Promise<FeedItem[]> {
    const results = await Promise.allSettled(
      feeds.map((feed) => this.fetchFeed(feed))
    )

    return results
      .filter((result): result is PromiseFulfilledResult<FeedItem[]> =>
        result.status === 'fulfilled'
      )
      .flatMap((result) => result.value)
  }
}
