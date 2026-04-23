import TurndownService from 'turndown'
import { format, isValid, parseISO } from 'date-fns'
import type { FeedItem } from '../rss/fetcher'
import type { ExtractedContent } from './extractor'

export class MarkdownConverter {
  private static readonly SECRET_PATTERNS: Array<{ pattern: RegExp, replacement: string }> = [
    {
      // Slack bot/user/app tokens frequently appear in security-related articles and trigger push protection.
      pattern: /\bxox(?:a|b|o|p|r|s)-[A-Za-z0-9-]{10,}\b/g,
      replacement: '[REDACTED_SLACK_TOKEN]',
    },
    {
      pattern: /\bgh(?:p|o|s|u|r)\\?_[A-Za-z0-9]{20,}\b/g,
      replacement: '[REDACTED_GITHUB_TOKEN]',
    },
    {
      pattern: /\bgithub\\?_pat\\?_[A-Za-z0-9_\\]{20,}\b/g,
      replacement: '[REDACTED_GITHUB_TOKEN]',
    },
    {
      pattern: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g,
      replacement: '[REDACTED_AWS_ACCESS_KEY_ID]',
    },
    {
      pattern: /\bnpm\\?_[A-Za-z0-9]{20,}\b/g,
      replacement: '[REDACTED_NPM_TOKEN]',
    },
    {
      pattern: /\bsk-(?:proj-|live-|test-)?[A-Za-z0-9_-]{20,}\b/g,
      replacement: '[REDACTED_API_KEY]',
    },
  ]

  private turndown: TurndownService

  constructor() {
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
    })
  }

  htmlToMarkdown(html: string): string {
    return this.sanitizeMarkdown(this.turndown.turndown(html))
  }

  generateFrontmatter(
    feedItem: FeedItem,
    options?: { fetchedBy?: 'playwright' | 'http' }
  ): string {
    const lines: string[] = ['---']

    lines.push(`title: "${this.escapeYamlString(feedItem.title)}"`)
    lines.push(`source: "${feedItem.link}"`)

    if (feedItem.pubDate) {
      let date = parseISO(feedItem.pubDate)
      if (!isValid(date)) {
        date = new Date(feedItem.pubDate)
      }
      if (isValid(date)) {
        lines.push(`publishedDate: "${format(date, 'yyyy-MM-dd')}"`)
      } else {
        lines.push(`publishedDate: "${feedItem.pubDate}"`)
      }
    }

    lines.push(`category: "${feedItem.category}"`)
    lines.push(`feedName: "${this.escapeYamlString(feedItem.feedName)}"`)

    if (feedItem.author) {
      lines.push(`author: "${this.escapeYamlString(feedItem.author)}"`)
    }

    if (options?.fetchedBy) {
      lines.push(`fetchedBy: "${options.fetchedBy}"`)
    }

    lines.push('---')

    return lines.join('\n')
  }

  createArticle(feedItem: FeedItem, content: ExtractedContent): string {
    const frontmatter = this.generateFrontmatter(feedItem, {
      fetchedBy: content.fetchedBy,
    })
    const markdown = this.htmlToMarkdown(content.content)

    return `${frontmatter}\n\n${markdown}`
  }

  createArticleFromRssContent(feedItem: FeedItem): string {
    const frontmatter = this.generateFrontmatter(feedItem)
    let content = ''

    if (feedItem.content) {
      content = this.htmlToMarkdown(feedItem.content)
    }

    const notice = `> **Note:** Full content could not be retrieved. [Read the original article](${feedItem.link})`

    return `${frontmatter}\n\n${notice}\n\n${content}`
  }

  sanitizeMarkdown(markdown: string): string {
    return MarkdownConverter.SECRET_PATTERNS.reduce(
      (sanitized, { pattern, replacement }) => sanitized.replace(pattern, replacement),
      markdown
    )
  }

  private escapeYamlString(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  }
}
