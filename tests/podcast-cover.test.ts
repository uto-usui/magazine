import { describe, it, expect } from 'vitest'
import { coverDate, coverHtml, issueNumber } from '../src/podcast/cover'

const FONTS = { leagueGothic: 'AAAA', spaceMonoBold: 'BBBB' }

describe('coverDate', () => {
  it('エピソード ID を表示用の日付にする', () => {
    expect(coverDate('2026-11-06-150018')).toBe('2026.11.06')
  })
})

describe('issueNumber', () => {
  const tracked = ['2026-11-05-145838', '2026-01-08-211933', '2026-11-06-150018']

  it('古い順に数えて何号目かを返す', () => {
    expect(issueNumber('2026-01-08-211933', tracked)).toBe(1)
    expect(issueNumber('2026-11-06-150018', tracked)).toBe(3)
  })

  it('git に入っていない号は null', () => {
    expect(issueNumber('2026-09-09-230930', tracked)).toBeNull()
  })
})

describe('coverHtml', () => {
  it('号の情報と、埋め込んだ書体が入る', () => {
    const html = coverHtml({ date: '2026.11.06', issueNo: 151, articleCount: 9 }, FONTS)
    expect(html).toContain('NO. 151')
    expect(html).toContain('2026.11.06')
    expect(html).toContain('9 ARTICLES')
    expect(html).toContain('JAPANESE AUDIO')
    expect(html).toContain('base64,AAAA')
  })

  it('1本だけの号は単数形にする', () => {
    expect(coverHtml({ date: '2026.11.06', issueNo: 1, articleCount: 1 }, FONTS)).toContain('1 ARTICLE<')
  })
})
