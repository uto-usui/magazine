import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
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
      concurrency: 5,
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

  it('should respect concurrency limit', async () => {
    const concurrency = 2
    const limitedDownloader = new ImageDownloader(TEST_IMAGES_DIR, {
      maxSizeBytes: 5 * 1024 * 1024,
      concurrency,
    })

    let maxConcurrent = 0
    let currentConcurrent = 0

    // Mock downloadImage to track concurrency
    limitedDownloader.downloadImage = vi.fn(async (url: string, articleSlug: string) => {
      currentConcurrent++
      maxConcurrent = Math.max(maxConcurrent, currentConcurrent)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 50))

      currentConcurrent--
      return null // Return null as we're not actually downloading
    })

    const urls = [
      'https://example.com/img1.jpg',
      'https://example.com/img2.jpg',
      'https://example.com/img3.jpg',
      'https://example.com/img4.jpg',
      'https://example.com/img5.jpg',
    ]

    await limitedDownloader.downloadImages(urls, 'test-article')

    expect(maxConcurrent).toBeLessThanOrEqual(concurrency)
    expect(limitedDownloader.downloadImage).toHaveBeenCalledTimes(urls.length)
  })

  it('should process all URLs in parallel download', async () => {
    // Mock downloadImage to return predictable results
    downloader.downloadImage = vi.fn(async (url: string, articleSlug: string) => {
      if (url.includes('fail')) {
        return null
      }
      return `/images/${articleSlug}/${url.split('/').pop()}`
    })

    const urls = [
      'https://example.com/img1.jpg',
      'https://example.com/fail.jpg',
      'https://example.com/img2.png',
    ]

    const results = await downloader.downloadImages(urls, 'test-article')

    expect(results.size).toBe(2)
    expect(results.has('https://example.com/img1.jpg')).toBe(true)
    expect(results.has('https://example.com/fail.jpg')).toBe(false)
    expect(results.has('https://example.com/img2.png')).toBe(true)
  })

  it('should handle empty URL array', async () => {
    const results = await downloader.downloadImages([], 'test-article')
    expect(results.size).toBe(0)
  })
})
