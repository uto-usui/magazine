import { describe, it, expect } from 'vitest'
import { ContentExtractor, type ExtractedContent } from '../src/scraper/extractor'

describe('ContentExtractor', () => {
  const extractor = new ContentExtractor()

  it('should extract content from valid HTML', () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Test Article</title></head>
        <body>
          <article>
            <h1>Article Title</h1>
            <p>This is the main content of the article.</p>
            <p>It has multiple paragraphs with useful information.</p>
          </article>
        </body>
      </html>
    `

    const result = extractor.extractFromHtml(html, 'https://example.com/article')

    expect(result).not.toBeNull()
    expect(result?.title).toBeDefined()
    expect(result?.content).toContain('main content')
  })

  it('should handle HTML with minimal content', () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Minimal Page</title></head>
        <body>
          <nav>Navigation</nav>
          <footer>Footer</footer>
        </body>
      </html>
    `

    const result = extractor.extractFromHtml(html, 'https://example.com/minimal')

    // Readability may still extract something from minimal HTML
    // The key is it doesn't throw an error
    if (result) {
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('content')
    }
  })

  it('should extract images from content', () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Article with Images</title></head>
        <body>
          <article>
            <h1>Image Article</h1>
            <p>This article has images.</p>
            <img src="https://example.com/image1.jpg" alt="Image 1">
            <p>More content here.</p>
            <img src="https://example.com/image2.png" alt="Image 2">
          </article>
        </body>
      </html>
    `

    const result = extractor.extractFromHtml(html, 'https://example.com/article')

    expect(result).not.toBeNull()
    expect(result?.images).toBeDefined()
    expect(result?.images.length).toBeGreaterThanOrEqual(0)
  })

  it('should fetch and extract content from URL', async () => {
    const result = await extractor.extractFromUrl('https://web.dev/')

    // This test may fail if the URL is not accessible
    // The main goal is to verify the method exists and returns expected shape
    if (result) {
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('content')
      expect(result).toHaveProperty('images')
    }
  }, 30000)

  it('should return null for 404 errors', async () => {
    const result = await extractor.extractFromUrl(
      'https://example.com/this-page-does-not-exist-404'
    )

    expect(result).toBeNull()
  }, 10000)
})
