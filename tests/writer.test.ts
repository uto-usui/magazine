import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdir, rm, readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { ArticleWriter } from '../src/storage/writer'

const TEST_ARTICLES_DIR = join(process.cwd(), 'test-articles')

describe('ArticleWriter', () => {
  let writer: ArticleWriter

  beforeEach(async () => {
    await mkdir(TEST_ARTICLES_DIR, { recursive: true })
    writer = new ArticleWriter(TEST_ARTICLES_DIR)
  })

  afterEach(async () => {
    await rm(TEST_ARTICLES_DIR, { recursive: true, force: true })
  })

  it('should write article to correct path', async () => {
    const content = '---\ntitle: "Test"\n---\n\nContent here'
    const date = new Date('2024-01-15')
    const title = 'My Test Article'
    const sourceUrl = 'https://example.com/my-test-article'

    const filePath = await writer.writeArticle(content, title, date, sourceUrl)

    expect(filePath).toContain('2024-01-15')
    expect(filePath).toContain('my-test-article.md')

    const savedContent = await readFile(filePath, 'utf-8')
    expect(savedContent).toBe(content)
  })

  it('should sanitize title for filename', async () => {
    const content = 'Test content'
    const date = new Date('2024-01-15')
    const title = 'Article: With "Special" Characters!'
    const sourceUrl = 'https://example.com/article'

    const filePath = await writer.writeArticle(content, title, date, sourceUrl)

    expect(filePath).toContain('article-with-special-characters.md')
  })

  it('should create date directory if not exists', async () => {
    const content = 'Test content'
    const date = new Date('2024-02-20')
    const title = 'New Article'
    const sourceUrl = 'https://example.com/new-article'

    await writer.writeArticle(content, title, date, sourceUrl)

    const dirs = await readdir(TEST_ARTICLES_DIR)
    expect(dirs).toContain('2024-02-20')
  })

  it('should handle duplicate titles by appending number', async () => {
    const date = new Date('2024-01-15')
    const title = 'Duplicate Title'
    const sourceUrl = 'https://example.com/duplicate'

    await writer.writeArticle('Content 1', title, date, sourceUrl)
    const secondPath = await writer.writeArticle('Content 2', title, date, sourceUrl)

    expect(secondPath).toContain('duplicate-title-1.md')
  })

  it('should use URL-based slug for Japanese titles', async () => {
    const content = 'Test content'
    const date = new Date('2024-01-15')
    const title = '若手フロントエンドエンジニアのためのバックエンド入門'
    const sourceUrl = 'https://ics.media/entry/251002/'

    const filePath = await writer.writeArticle(content, title, date, sourceUrl)

    // Japanese title produces empty slug, so falls back to URL-based
    expect(filePath).toContain('ics-media-entry-251002.md')
  })

  it('should use URL-based slug when sanitizeTitle produces only numbers', async () => {
    const content = 'Test content'
    const date = new Date('2024-01-15')
    const title = 'メルカリ『お問い合わせ対応システム』開発の1ヶ月'
    const sourceUrl = 'https://engineering.mercari.com/blog/entry/20251007-553f1424b6/'

    const filePath = await writer.writeArticle(content, title, date, sourceUrl)

    // Title produces "1" which is just numbers, so falls back to URL-based
    expect(filePath).toContain('mercari-blog-entry-20251007-553f1424b6.md')
  })

  it('should generate sanitized slug', () => {
    expect(writer.sanitizeTitle('Hello World')).toBe('hello-world')
    expect(writer.sanitizeTitle('Test 123')).toBe('test-123')
    expect(writer.sanitizeTitle('Special: Characters!')).toBe('special-characters')
    expect(writer.sanitizeTitle('Multiple   Spaces')).toBe('multiple-spaces')
  })
})
