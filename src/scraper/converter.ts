import TurndownService from 'turndown'
import { format, parseISO } from 'date-fns'
import type { FeedItem } from '../rss/fetcher'
import type { ExtractedContent } from './extractor'

export class MarkdownConverter {
  private turndown: TurndownService

  constructor() {
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
    })
  }

  htmlToMarkdown(html: string): string {
    return this.turndown.turndown(html)
  }

  generateFrontmatter(feedItem: FeedItem): string {
    const lines: string[] = ['---']

    lines.push(`title: "${this.escapeYamlString(feedItem.title)}"`)
    lines.push(`source: "${feedItem.link}"`)

    if (feedItem.pubDate) {
      try {
        const date = parseISO(feedItem.pubDate)
        lines.push(`publishedDate: "${format(date, 'yyyy-MM-dd')}"`)
      } catch {
        lines.push(`publishedDate: "${feedItem.pubDate}"`)
      }
    }

    lines.push(`category: "${feedItem.category}"`)
    lines.push(`feedName: "${this.escapeYamlString(feedItem.feedName)}"`)

    if (feedItem.author) {
      lines.push(`author: "${this.escapeYamlString(feedItem.author)}"`)
    }

    lines.push('---')

    return lines.join('\n')
  }

  createArticle(feedItem: FeedItem, content: ExtractedContent): string {
    const frontmatter = this.generateFrontmatter(feedItem)
    const markdown = this.htmlToMarkdown(content.content)

    return `${frontmatter}\n\n${markdown}`
  }

  private escapeYamlString(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  }
}
