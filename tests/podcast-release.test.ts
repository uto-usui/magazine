import { describe, it, expect } from 'vitest'
import { episodesFromTags, needsUpload, releaseTag, shouldBeLatest, xPost } from '../src/podcast/release'

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

describe('needsUpload', () => {
  const assets = [{ name: '2026-11-06-150018.mp3', digest: 'sha256:aaa' }]

  it('同じ名前で同じ中身のものが上がっていれば上げない', () => {
    expect(needsUpload({ name: '2026-11-06-150018.mp3', sha256: 'aaa' }, assets)).toBe(false)
  })

  it('ないか、中身が違えば（大きさが同じでも）上げる', () => {
    expect(needsUpload({ name: '2026-11-06-150018.mp4', sha256: 'aaa' }, assets)).toBe(true)
    expect(needsUpload({ name: '2026-11-06-150018.mp3', sha256: 'bbb' }, assets)).toBe(true)
  })

  it('GitHub がハッシュを返さないファイルは上げ直す', () => {
    expect(needsUpload({ name: '2026-11-06-150018.mp3', sha256: 'aaa' }, [{ name: '2026-11-06-150018.mp3', digest: null }])).toBe(true)
  })
})

describe('xPost', () => {
  it('Show Notes の末尾に Release へのリンクを足す', () => {
    expect(xPost('題の音声版です。\n\n0:00 オープニング\n\nニュースレター: https://example.com/n.md\n', 'https://example.com/r')).toBe(
      '題の音声版です。\n\n0:00 オープニング\n\nニュースレター: https://example.com/n.md\n音声（MP3）と動画（MP4）: https://example.com/r\n'
    )
  })
})
