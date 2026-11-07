import { describe, it, expect } from 'vitest'
import { episodesFromTags, needsUpload, releaseNotes, releaseTag, shouldBeLatest } from '../src/podcast/release'
import type { Timeline } from '../src/podcast/schema'

const timeline: Timeline = {
  episode: '2026-11-06-150018',
  segments: [
    { id: 'opening', title: 'オープニング', start: 0, duration: 19.08 },
    { id: 'a01', title: '古い DESIGN.md と AI', start: 19.88, duration: 77.48 },
    { id: 'a02', title: 'Tokenizer Mono', start: 98.16, duration: 80.2 },
    { id: 'ending', title: 'エンディング', start: 179.16, duration: 14.68 },
  ],
}

describe('releaseTag / episodesFromTags', () => {
  it('号の ID に podcast- を付けたタグにし、タグから号の ID に戻せる', () => {
    expect(releaseTag('2026-11-06-150018')).toBe('podcast-2026-11-06-150018')
    expect(episodesFromTags(['podcast-2026-11-05-145838', 'podcast', 'v1.0.0', 'podcast-draft'])).toEqual(['2026-11-05-145838'])
  })
})

describe('shouldBeLatest', () => {
  it('ほかのどの号よりも新しいときだけ Latest にする', () => {
    expect(shouldBeLatest('2026-11-06-150018', ['2026-11-05-145838'])).toBe(true)
    expect(shouldBeLatest('2026-11-05-145838', ['2026-11-06-150018'])).toBe(false)
    expect(shouldBeLatest('2026-11-05-145838', [])).toBe(true)
  })
})

describe('releaseNotes', () => {
  it('題・記事の話題の一覧・ニュースレターへのリンク', () => {
    expect(releaseNotes({ title: 'UXエンジニアリング・マガジン 11月6日号（No.151）', timeline, newsletterUrl: 'https://example.com/n.md' })).toBe(
      [
        'UXエンジニアリング・マガジン 11月6日号（No.151）の音声版です。',
        '',
        '話題:',
        '- 古い DESIGN.md と AI',
        '- Tokenizer Mono',
        '',
        'ニュースレター: https://example.com/n.md',
        '',
      ].join('\n')
    )
  })
})

describe('needsUpload', () => {
  const assets = [{ name: '2026-11-06-150018.mp3', size: 100 }]

  it('同じ名前で同じ大きさのものが上がっていれば上げない', () => {
    expect(needsUpload({ name: '2026-11-06-150018.mp3', size: 100 }, assets)).toBe(false)
  })

  it('ないか、大きさが違えば上げる', () => {
    expect(needsUpload({ name: '2026-11-06-150018.mp4', size: 100 }, assets)).toBe(true)
    expect(needsUpload({ name: '2026-11-06-150018.mp3', size: 101 }, assets)).toBe(true)
  })
})
