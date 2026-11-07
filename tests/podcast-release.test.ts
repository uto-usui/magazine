import { describe, it, expect } from 'vitest'
import { episodesFromTags, needsUpload, releaseTag, shouldBeLatest } from '../src/podcast/release'

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
  const assets = [{ name: '2026-11-06-150018.mp3', size: 100 }]

  it('同じ名前で同じ大きさのものが上がっていれば上げない', () => {
    expect(needsUpload({ name: '2026-11-06-150018.mp3', size: 100 }, assets)).toBe(false)
  })

  it('ないか、大きさが違えば上げる', () => {
    expect(needsUpload({ name: '2026-11-06-150018.mp4', size: 100 }, assets)).toBe(true)
    expect(needsUpload({ name: '2026-11-06-150018.mp3', size: 101 }, assets)).toBe(true)
  })
})
