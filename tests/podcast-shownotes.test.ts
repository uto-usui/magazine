import { describe, it, expect } from 'vitest'
import type { Timeline } from '../src/podcast/schema'
import { buildShowNotes, chapterTime, newsletterArticles } from '../src/podcast/shownotes'

const newsletter = `# ニュースレター

## ハイライト

### [DESIGN.md が古いと AI は「正確に間違える」](https://zenn.dev/a)

> **出典**: Zenn designsystem | **公開日**: 2026-11-06 | **カテゴリ**: design-systems

本文

### [Tokenizer Mono](https://george.mand.is/b)

> **出典**: George Mandis | **公開日**: 2026-11-05

---

## その他の記事

- [Other](https://example.com/c) - engineering / Blog
`

const timeline: Timeline = {
  episode: '2026-11-06-150018',
  segments: [
    { id: 'opening', title: 'オープニング', start: 0, duration: 19.08 },
    { id: 'a01', title: '古い DESIGN.md と AI', start: 19.88, duration: 77.48 },
    { id: 'a02', title: 'Tokenizer Mono', start: 98.16, duration: 80.2 },
    { id: 'ending', title: 'エンディング', start: 616.36, duration: 14.68 },
  ],
}

describe('newsletterArticles', () => {
  it('「その他の記事」より前の見出しを、出典と一緒に載っている順で取り出す', () => {
    expect(newsletterArticles(newsletter)).toEqual([
      { title: 'DESIGN.md が古いと AI は「正確に間違える」', url: 'https://zenn.dev/a', source: 'Zenn designsystem' },
      { title: 'Tokenizer Mono', url: 'https://george.mand.is/b', source: 'George Mandis' },
    ])
  })
})

describe('chapterTime', () => {
  it('m:ss で、1時間を超えたら h:mm:ss', () => {
    expect(chapterTime(0)).toBe('0:00')
    expect(chapterTime(19.88)).toBe('0:19')
    expect(chapterTime(616.36)).toBe('10:16')
    expect(chapterTime(3725)).toBe('1:02:05')
  })
})

describe('buildShowNotes', () => {
  it('チャプターごとに時刻と題、記事には元記事の題・出典・URL を付ける', () => {
    const text = buildShowNotes({
      title: 'UXエンジニアリング・マガジン 11月6日号（No.151）',
      timeline,
      articles: newsletterArticles(newsletter),
      newsletterUrl: 'https://example.com/n.md',
    })
    expect(text).toBe(
      [
        'UXエンジニアリング・マガジン 11月6日号（No.151）の音声版です。',
        '',
        '0:00 オープニング',
        '0:19 古い DESIGN.md と AI',
        '  DESIGN.md が古いと AI は「正確に間違える」（Zenn designsystem）',
        '  https://zenn.dev/a',
        '1:38 Tokenizer Mono',
        '  Tokenizer Mono（George Mandis）',
        '  https://george.mand.is/b',
        '10:16 エンディング',
        '',
        'ニュースレター: https://example.com/n.md',
        '',
      ].join('\n')
    )
  })

  it('台本の url があれば、順番で対応させた記事と同じかを確かめる', () => {
    const base = { title: 't', timeline, articles: newsletterArticles(newsletter), newsletterUrl: 'u' }
    expect(() => buildShowNotes({ ...base, scriptUrls: { a01: 'https://zenn.dev/a', a02: 'https://george.mand.is/b' } })).not.toThrow()
    expect(() => buildShowNotes({ ...base, scriptUrls: { a01: 'https://george.mand.is/b' } })).toThrow('a01')
  })

  it('記事の本数がタイムラインと合わなければ、推測でつながずにエラーにする', () => {
    const one = newsletterArticles(newsletter).slice(0, 1)
    expect(() => buildShowNotes({ title: 't', timeline, articles: one, newsletterUrl: 'u' })).toThrow('数が合いません')
  })
})
