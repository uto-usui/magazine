import { describe, it, expect } from 'vitest'
import { inlineCss } from '../../src/newsletter/inline-css'

describe('inlineCss', () => {
  it('should inline style tags into HTML elements', async () => {
    const html = `
      <html>
        <head>
          <style>p { color: red; }</style>
        </head>
        <body>
          <p>Hello</p>
        </body>
      </html>
    `
    const result = await inlineCss(html)

    expect(result).toContain('style="')
    expect(result).toContain('color')
  })

  it('should handle multiple CSS rules', async () => {
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial; }
            p { margin: 10px; }
            a { color: blue; }
          </style>
        </head>
        <body>
          <p>Paragraph</p>
          <a href="#">Link</a>
        </body>
      </html>
    `
    const result = await inlineCss(html)

    expect(result).toContain('font-family')
    expect(result).toContain('margin')
    expect(result).toContain('color')
  })

  it('should preserve HTML structure', async () => {
    const html = `
      <html>
        <head>
          <style>p { color: red; }</style>
        </head>
        <body>
          <div class="container">
            <p>Content</p>
          </div>
        </body>
      </html>
    `
    const result = await inlineCss(html)

    expect(result).toContain('<html')
    expect(result).toContain('<body')
    expect(result).toContain('</html>')
    expect(result).toContain('class="container"')
  })

  it('should handle HTML without style tags', async () => {
    const html = `
      <html>
        <body>
          <p>No styles</p>
        </body>
      </html>
    `
    const result = await inlineCss(html)

    expect(result).toContain('<p')
    expect(result).toContain('No styles')
  })

  it('should handle complex selectors', async () => {
    const html = `
      <html>
        <head>
          <style>
            .header h1 { font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Title</h1>
          </div>
        </body>
      </html>
    `
    const result = await inlineCss(html)

    expect(result).toContain('font-size')
  })
})
