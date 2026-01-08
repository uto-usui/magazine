import Parser from 'rss-parser'
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

      return (parsed.items || []).map((item) => ({
        title: item.title || 'Untitled',
        link: item.link || '',
        pubDate: item.pubDate || item.isoDate || null,
        author: item.creator || item.author || null,
        content: item.content || item.contentSnippet || null,
        feedName: feed.name,
        category: feed.category,
      }))
    } catch (error) {
      console.error(`Failed to fetch feed ${feed.name}: ${(error as Error).message}`)
      return []
    }
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
