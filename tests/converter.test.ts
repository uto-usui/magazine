import { describe, it, expect } from 'vitest'
import { MarkdownConverter } from '../src/scraper/converter'
import type { FeedItem } from '../src/rss/fetcher'
import type { ExtractedContent } from '../src/scraper/extractor'

describe('MarkdownConverter', () => {
  const converter = new MarkdownConverter()

  it('should convert HTML to Markdown', () => {
    const html = '<h1>Title</h1><p>Paragraph content.</p>'
    const markdown = converter.htmlToMarkdown(html)

    expect(markdown).toContain('Title')
    expect(markdown).toContain('Paragraph content.')
  })

  it('should preserve links in markdown', () => {
    const html = '<p>Check out <a href="https://example.com">this link</a>.</p>'
    const markdown = converter.htmlToMarkdown(html)

    expect(markdown).toContain('[this link](https://example.com)')
  })

  it('should generate frontmatter', () => {
    const feedItem: FeedItem = {
      title: 'Test Article',
      link: 'https://example.com/article',
      pubDate: '2024-01-15T10:00:00Z',
      author: 'John Doe',
      content: null,
      feedName: 'Test Feed',
      category: 'engineering',
    }

    const frontmatter = converter.generateFrontmatter(feedItem)

    expect(frontmatter).toContain('title: "Test Article"')
    expect(frontmatter).toContain('source: "https://example.com/article"')
    expect(frontmatter).toContain('category: "engineering"')
    expect(frontmatter).toContain('author: "John Doe"')
  })

  it('should create full article with frontmatter and content', () => {
    const feedItem: FeedItem = {
      title: 'Full Article',
      link: 'https://example.com/full',
      pubDate: '2024-01-15',
      author: 'Jane Doe',
      content: null,
      feedName: 'Test Feed',
      category: 'css',
    }

    const extractedContent: ExtractedContent = {
      title: 'Full Article',
      content: '<p>This is the article content.</p>',
      textContent: 'This is the article content.',
      excerpt: 'A brief excerpt',
      byline: 'Jane Doe',
      images: [],
    }

    const fullArticle = converter.createArticle(feedItem, extractedContent)

    expect(fullArticle).toContain('---')
    expect(fullArticle).toContain('title: "Full Article"')
    expect(fullArticle).toContain('This is the article content.')
  })

  it('should escape special characters in frontmatter', () => {
    const feedItem: FeedItem = {
      title: 'Article with "quotes" and: colons',
      link: 'https://example.com/special',
      pubDate: '2024-01-15',
      author: null,
      content: null,
      feedName: 'Test Feed',
      category: 'test',
    }

    const frontmatter = converter.generateFrontmatter(feedItem)

    expect(frontmatter).toContain('title: "Article with \\"quotes\\" and: colons"')
  })
})
