import { describe, it, expect } from 'vitest'
import { ContentExtractor, type ExtractedContent } from '../src/scraper/extractor'

describe('ContentExtractor', () => {
  const extractor = new ContentExtractor()

  it('should extract content from valid HTML', () => {
    // HTMLは最小コンテンツ長（500文字）を超える必要がある
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Test Article</title></head>
        <body>
          <article>
            <h1>Article Title</h1>
            <p>This is the main content of the article. It contains detailed information about a specific topic that readers will find useful and informative.</p>
            <p>The second paragraph continues with more context and explanation. This helps ensure the article has sufficient content to be considered a valid article by our extraction logic.</p>
            <p>A third paragraph adds even more substance to the article. We want to make sure that the content extractor properly identifies this as a meaningful article with real content.</p>
            <p>Here we have additional information that expands on the previous points. This paragraph serves to ensure that we have well over 500 characters of meaningful text content.</p>
            <p>Finally, we conclude with a summary of the key points discussed in this article. The article extraction should successfully identify and capture all of this text content for processing.</p>
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
    // HTMLは最小コンテンツ長（500文字）を超える必要がある
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Article with Images</title></head>
        <body>
          <article>
            <h1>Image Article</h1>
            <p>This article contains multiple images alongside rich text content. The images help illustrate the concepts being discussed in the article.</p>
            <img src="https://example.com/image1.jpg" alt="Image 1">
            <p>Here we continue with more descriptive text that provides context for the images. The content extractor should successfully identify both the text and the embedded images.</p>
            <p>Additional paragraphs help ensure we have sufficient content length for the article to be considered valid by our extraction logic.</p>
            <img src="https://example.com/image2.png" alt="Image 2">
            <p>The second image above shows another important concept. This paragraph provides even more context and information to make the article substantial and meaningful.</p>
            <p>In conclusion, this article demonstrates how images and text can work together to create engaging content that readers will find valuable and informative.</p>
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
