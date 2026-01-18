import { describe, it, expect } from 'vitest'
import { wrapWithTemplate, getDefaultStyles } from '../../src/newsletter/template'

describe('wrapWithTemplate', () => {
  it('should wrap content with HTML document structure', () => {
    const content = '<h1>Hello</h1>'
    const html = wrapWithTemplate(content)

    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<html')
    expect(html).toContain('<head>')
    expect(html).toContain('</head>')
    expect(html).toContain('<body')
    expect(html).toContain('<h1>Hello</h1>')
    expect(html).toContain('</body>')
    expect(html).toContain('</html>')
  })

  it('should include UTF-8 charset meta tag', () => {
    const content = '<p>日本語テスト</p>'
    const html = wrapWithTemplate(content)

    expect(html).toContain('<meta charset="utf-8"')
  })

  it('should include viewport meta tag for mobile', () => {
    const content = '<p>Content</p>'
    const html = wrapWithTemplate(content)

    expect(html).toContain('viewport')
  })

  it('should include default CSS styles', () => {
    const content = '<p>Content</p>'
    const html = wrapWithTemplate(content)

    expect(html).toContain('<style')
    expect(html).toContain('</style>')
  })

  it('should set readable line-height', () => {
    const content = '<p>Content</p>'
    const html = wrapWithTemplate(content)

    expect(html).toContain('line-height')
  })

  it('should have centered container with max-width', () => {
    const content = '<p>Content</p>'
    const html = wrapWithTemplate(content)

    expect(html).toContain('max-width')
    expect(html).toContain('margin')
  })

  it('should include newsletter header', () => {
    const content = '<p>Content</p>'
    const html = wrapWithTemplate(content)

    expect(html).toContain('UXエンジニアリング')
  })

  it('should include newsletter footer', () => {
    const content = '<p>Content</p>'
    const html = wrapWithTemplate(content)

    expect(html).toContain('Claude Code')
  })
})

describe('getDefaultStyles', () => {
  it('should return CSS string', () => {
    const styles = getDefaultStyles()

    expect(typeof styles).toBe('string')
    expect(styles.length).toBeGreaterThan(0)
  })

  it('should include body styles', () => {
    const styles = getDefaultStyles()

    expect(styles).toContain('body')
  })

  it('should include heading styles', () => {
    const styles = getDefaultStyles()

    expect(styles).toContain('h1')
    expect(styles).toContain('h2')
    expect(styles).toContain('h3')
  })

  it('should include link styles', () => {
    const styles = getDefaultStyles()

    expect(styles).toContain('a')
  })

  it('should include blockquote styles', () => {
    const styles = getDefaultStyles()

    expect(styles).toContain('blockquote')
  })
})
