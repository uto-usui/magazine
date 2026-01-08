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

    const filePath = await writer.writeArticle(content, title, date)

    expect(filePath).toContain('2024-01-15')
    expect(filePath).toContain('my-test-article.md')

    const savedContent = await readFile(filePath, 'utf-8')
    expect(savedContent).toBe(content)
  })

  it('should sanitize title for filename', async () => {
    const content = 'Test content'
    const date = new Date('2024-01-15')
    const title = 'Article: With "Special" Characters!'

    const filePath = await writer.writeArticle(content, title, date)

    expect(filePath).toContain('article-with-special-characters.md')
  })

  it('should create date directory if not exists', async () => {
    const content = 'Test content'
    const date = new Date('2024-02-20')
    const title = 'New Article'

    await writer.writeArticle(content, title, date)

    const dirs = await readdir(TEST_ARTICLES_DIR)
    expect(dirs).toContain('2024-02-20')
  })

  it('should handle duplicate titles by appending number', async () => {
    const date = new Date('2024-01-15')
    const title = 'Duplicate Title'

    await writer.writeArticle('Content 1', title, date)
    const secondPath = await writer.writeArticle('Content 2', title, date)

    expect(secondPath).toContain('duplicate-title-1.md')
  })

  it('should generate sanitized slug', () => {
    expect(writer.sanitizeTitle('Hello World')).toBe('hello-world')
    expect(writer.sanitizeTitle('Test 123')).toBe('test-123')
    expect(writer.sanitizeTitle('Special: Characters!')).toBe('special-characters')
    expect(writer.sanitizeTitle('Multiple   Spaces')).toBe('multiple-spaces')
  })
})
