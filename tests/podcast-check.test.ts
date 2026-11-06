import { describe, it, expect } from 'vitest'
import { bannedWords, checkScript, findBanned, parseHighlights, techTokens } from '../src/podcast/check'
import type { Script } from '../src/podcast/schema'

const NEWSLETTER = `# ニュースレター

## ハイライト

### [Re-Implementing :nth-child() With Modern CSS](https://example.com/a)

> **出典**: Example | **公開日**: 2026-11-05 | **カテゴリ**: css

**3行まとめ**
- \`:nth-child(An + B)\` を \`sibling-index()\` と \`if()\` で作り直します
- 色は \`#18181b\` にそろえます
- Bramus さんの記事で、manifest も使います

**詳細解説**

本文に \`text-box\` も出てきます。

---

### [Second](https://example.com/b)

**3行まとめ**
- 何もない記事です

## その他の記事

- [Other](https://example.com/c)
`

function scriptWith(text: string): Script {
  return {
    episode: '2026-11-05-145838',
    newsletter: 'newsletters/2026-11-05-145838.md',
    segments: [
      { id: 'opening', title: 'オープニング', lines: [{ speaker: 'A', text: 'おはようございます。' }] },
      { id: 'a01', title: '番号指定', lines: [{ speaker: 'A', text }] },
      { id: 'a02', title: '二本目', lines: [{ speaker: 'A', text: '二本目です。' }] },
    ],
  }
}

describe('parseHighlights', () => {
  it('ハイライトの記事だけを、タイトルと3行まとめに分けて取り出す', () => {
    const articles = parseHighlights(NEWSLETTER)
    expect(articles.map((a) => a.title)).toEqual(['Re-Implementing :nth-child() With Modern CSS', 'Second'])
    expect(articles[0].summary).toContain('sibling-index()')
    expect(articles[0].summary).not.toContain('text-box')
  })
})

describe('techTokens', () => {
  it('引数と記号を外して、読む単語だけにする', () => {
    expect(techTokens(':nth-child(An + B)')).toEqual(['nth', 'child'])
    expect(techTokens('text-wrap: pretty')).toEqual(['text', 'wrap', 'pretty'])
    expect(techTokens('if()')).toEqual(['if'])
  })

  it('カラーコードは名前ではないので見ない', () => {
    expect(techTokens('#18181b')).toEqual([])
  })
})

describe('checkScript', () => {
  const articles = parseHighlights(NEWSLETTER)

  it('名前をぼかした台本では、技術の名前と固有名を挙げる', () => {
    const [first] = checkScript(scriptWith('新しい CSS の関数で、何番目かの指定を作り直します。'), articles)
    expect(first.missingTech).toEqual([':nth-child(An + B)', 'sibling-index()', 'if()'])
    expect(first.missingNames).toEqual(['Bramus'])
  })

  it('記号を外して名前を言っていれば挙げない', () => {
    const [first] = checkScript(
      scriptWith('Bramus さんが、nth-child を sibling-index 関数と if 関数で作り直します。'),
      articles
    )
    expect(first.missingTech).toEqual([])
    expect(first.missingNames).toEqual([])
  })
})

describe('bannedWords / findBanned', () => {
  const GUIDE = `## 5. NGワード・禁止表現

### 絶対に使わない表現

| NGワード | 理由 | 代替表現 |
|----------|------|----------|
| 「革命的」「画期的」 | 大げさ | 「新しいアプローチ」 |
| 「いわゆる」の多用 | 冗長 | 必要なときのみ使用 |
| 「〜すべき」 | 押しつけがましい | 「〜するとよい」 |
| 「版」（「新しい版」「ベータ版」など） | 硬い | 「バージョン」 |

### 避けなければいけない表現

| 「〜することができます」 | 冗長 | 「〜できます」 |
`

  it('「絶対に使わない表現」の表から、多用が問題の語を除いて取り出す', () => {
    expect(bannedWords(GUIDE)).toEqual(['革命的', '画期的', 'すべき', '版', '新しい版', 'ベータ版'])
  })

  it('台本の中の禁止語を、セグメントと行ごとに挙げる', () => {
    const found = findBanned(scriptWith('Safari のベータ版に入りました。'), bannedWords(GUIDE))
    expect(found.map((f) => [f.segmentId, f.word])).toEqual([
      ['a01', '版'],
      ['a01', 'ベータ版'],
    ])
  })
})
