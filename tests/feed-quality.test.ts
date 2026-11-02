import { describe, it, expect } from 'vitest'
import { computeFeedQuality, normalizeForMatch, type ArticleRecord } from '../src/quality/feed-quality'

const article = (feedName: string, n: number, fetchedOn: string, title = `Post ${n}`): ArticleRecord => ({
  feedName,
  source: `https://${feedName.toLowerCase()}.example.com/posts/${n}/`,
  title,
  fetchedOn,
})

const base = { today: '2026-11-02', windowDays: 60, highlightUrls: [], pickupUrls: [] }

describe('computeFeedQuality', () => {
  it('counts an article in both highlight and pickup only once in the rate', () => {
    const [row] = computeFeedQuality({
      ...base,
      feeds: [{ name: 'A', enabled: true }],
      articles: [article('A', 1, '2026-10-01'), article('A', 2, '2026-10-01')],
      highlightUrls: ['https://a.example.com/posts/1'],
      pickupUrls: ['https://a.example.com/posts/1/'],
    })

    expect(row.highlights).toBe(1)
    expect(row.pickups).toBe(1)
    expect(row.rate).toBe(0.5)
  })

  it('flags a feed with many articles and no selections as a removal candidate', () => {
    const articles = Array.from({ length: 8 }, (_, i) => article('Noisy', i, '2026-10-15'))
    articles.push(article('Noisy', 99, '2026-08-01'))

    const [row] = computeFeedQuality({ ...base, feeds: [{ name: 'Noisy', enabled: true }], articles })

    expect(row.status).toBe('remove-candidate')
  })

  it('treats feeds without articles or added recently as watching', () => {
    const rows = computeFeedQuality({
      ...base,
      feeds: [
        { name: 'New', enabled: true },
        { name: 'Recent', enabled: true },
      ],
      articles: Array.from({ length: 10 }, (_, i) => article('Recent', i, '2026-10-20')),
    })

    expect(rows.map((r) => r.status)).toEqual(['watching', 'watching'])
  })

  it('marks feeds with no articles for 90+ days as stalled and skips disabled feeds', () => {
    const rows = computeFeedQuality({
      ...base,
      feeds: [
        { name: 'Old', enabled: true },
        { name: 'Off', enabled: false },
      ],
      articles: [article('Old', 1, '2026-07-01')],
    })

    expect(rows).toHaveLength(1)
    expect(rows[0].status).toBe('stalled')
  })

  it('detects Japanese feeds from titles', () => {
    const [row] = computeFeedQuality({
      ...base,
      feeds: [{ name: 'Ja', enabled: true }],
      articles: [article('Ja', 1, '2026-10-01', 'デザインシステムの運用'), article('Ja', 2, '2026-10-01', 'React Compiler 導入')],
    })

    expect(row.japanese).toBe(true)
  })
})

describe('normalizeForMatch', () => {
  it('ignores protocol, trailing slash, case and hash', () => {
    expect(normalizeForMatch('https://Example.com/a/#top')).toBe(normalizeForMatch('http://example.com/a'))
  })
})
