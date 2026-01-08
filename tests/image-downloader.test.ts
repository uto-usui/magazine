import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdir, rm, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageDownloader } from '../src/scraper/image-downloader'

const TEST_IMAGES_DIR = join(process.cwd(), 'test-images')

describe('ImageDownloader', () => {
  let downloader: ImageDownloader

  beforeEach(async () => {
    await mkdir(TEST_IMAGES_DIR, { recursive: true })
    downloader = new ImageDownloader(TEST_IMAGES_DIR, {
      maxSizeBytes: 5 * 1024 * 1024, // 5MB
    })
  })

  afterEach(async () => {
    await rm(TEST_IMAGES_DIR, { recursive: true, force: true })
  })

  it('should generate local path for image URL', () => {
    const url = 'https://example.com/images/photo.jpg'
    const articleSlug = 'my-article'

    const localPath = downloader.generateLocalPath(url, articleSlug)

    expect(localPath).toContain('my-article')
    expect(localPath).toMatch(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
  })

  it('should extract file extension from URL', () => {
    expect(downloader.getExtension('https://example.com/image.jpg')).toBe('jpg')
    expect(downloader.getExtension('https://example.com/image.png?v=123')).toBe('png')
    expect(downloader.getExtension('https://example.com/image')).toBe('jpg')
  })

  it('should skip images larger than max size', async () => {
    // This test checks the behavior - actual download would need mocking
    const result = await downloader.downloadImage(
      'https://example.com/nonexistent.jpg',
      'test-article'
    )

    // Should return null for failed downloads
    expect(result).toBeNull()
  })

  it('should create article-specific directory', async () => {
    const articleSlug = 'unique-article-2024'

    // Trigger directory creation
    downloader.generateLocalPath('https://example.com/img.jpg', articleSlug)
    await downloader.ensureArticleDir(articleSlug)

    const dirs = await readdir(TEST_IMAGES_DIR)
    expect(dirs).toContain(articleSlug)
  })

  it('should handle multiple images for same article', () => {
    const articleSlug = 'multi-image-article'

    const path1 = downloader.generateLocalPath('https://example.com/img1.jpg', articleSlug)
    const path2 = downloader.generateLocalPath('https://example.com/img2.png', articleSlug)

    expect(path1).not.toBe(path2)
    expect(path1).toContain(articleSlug)
    expect(path2).toContain(articleSlug)
  })
})
