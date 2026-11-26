import { describe, expect, it } from 'vitest'
import { musicTags, pendingFlags } from '../src/podcast/music'

describe('musicTags', () => {
  it('年入りの日付と通し番号を曲名に、通し番号をトラック番号に入れる', () => {
    expect(musicTags('2026-11-24-181124', 12, 'https://github.com/o/r/releases/tag/podcast-2026-11-24-181124')).toEqual({
      title: '2026.11.24 No.12',
      artist: 'UXエンジニアリング・マガジン',
      album_artist: 'UXエンジニアリング・マガジン',
      album: 'UXエンジニアリング・マガジン',
      genre: 'Podcast',
      date: '2026-11-24',
      track: '12',
      comment: 'https://github.com/o/r/releases/tag/podcast-2026-11-24-181124',
    })
  })

  it('通し番号が決まらなければ曲名は日付だけにし、トラック番号も入れない', () => {
    const tags = musicTags('2026-11-05-145838', null)
    expect(tags.title).toBe('2026.11.05')
    expect(tags).not.toHaveProperty('track')
    expect(tags).not.toHaveProperty('comment')
  })
})

describe('pendingFlags', () => {
  it('フラグを付けていない号だけを返す', () => {
    expect(
      pendingFlags({
        a: { title: 'x', added: '2026-11-26', flagged: null },
        b: { title: 'y', added: '2026-11-26', flagged: '2026-11-26' },
      })
    ).toEqual(['a'])
  })
})
