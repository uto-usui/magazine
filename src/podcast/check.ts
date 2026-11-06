import type { Script } from './schema'

export interface Article {
  title: string
  /** 3行まとめの本文 */
  summary: string
}

export interface SegmentFinding {
  segmentId: string
  segmentTitle: string
  article: string
  /** 3行まとめでコード表記（`...`）されている技術の名前のうち、台本に出てこないもの */
  missingTech: string[]
  /** 3行まとめに出てくる英字の固有名のうち、台本に出てこないもの */
  missingNames: string[]
}

/** ニュースレターの「ハイライト」から、記事のタイトルと3行まとめを順に取り出す */
export function parseHighlights(markdown: string): Article[] {
  const body = markdown.split(/^## その他の記事/m)[0]
  return body
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const title = block.split('\n')[0].replace(/^\[(.*)\]\(.*\)\s*$/, '$1').trim()
      const summary = (block.split('**3行まとめ**')[1] ?? '').split('**詳細解説**')[0].trim()
      return { title, summary }
    })
}

/**
 * コード表記を、台本に出てくるはずの英単語の並びにする。
 * 引数（`(An + B)` など）と記号は読まないので外し、カラーコードは名前ではないので除く
 */
export function techTokens(code: string): string[] {
  if (code.trim().startsWith('#')) return []
  const head = code.replace(/\(.*$/s, '')
  return (head.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((t) => t.length >= 2)
}

// 3行まとめによく出るが、台本で言わなくても記事の中身は伝わる語
const COMMON_WORDS = new Set(['ai', 'ui', 'ux', 'css', 'html', 'api', 'pr', 'db', 'poc', 'the', 'and', 'of'])

function nameTokens(summary: string): string[] {
  const withoutCode = summary.replace(/`[^`]*`/g, ' ')
  const words = withoutCode.match(/[A-Za-z][A-Za-z0-9.+-]*[A-Za-z0-9]/g) ?? []
  // 小文字だけの語（beta, manifest など）は固有名ではないことが多いので、大文字か数字を含む語だけ見る
  return [...new Set(words)].filter((w) => /[A-Z0-9]/.test(w) && !COMMON_WORDS.has(w.toLowerCase()))
}

function latinWords(text: string): Set<string> {
  return new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? [])
}

/**
 * スタイルガイドの「絶対に使わない表現」の表から、使ってはいけない語を取り出す。
 * 「多用」が問題の語は1回使うだけなら構わないので除く
 */
export function bannedWords(styleGuide: string): string[] {
  const section = styleGuide.split('### 絶対に使わない表現')[1]?.split(/^### /m)[0] ?? ''
  return section
    .split('\n')
    .filter((row) => row.startsWith('| 「'))
    .map((row) => row.split('|')[1])
    .filter((cell) => !cell.includes('多用'))
    .flatMap((cell) => [...cell.matchAll(/「([^」]+)」/g)].map((m) => m[1].replace(/^〜/, '')))
}

export function findBanned(script: Script, words: string[]): { segmentId: string; word: string; text: string }[] {
  return script.segments.flatMap((s) =>
    s.lines.flatMap((l) => words.filter((w) => l.text.includes(w)).map((word) => ({ segmentId: s.id, word, text: l.text })))
  )
}

/** 記事セグメント（a01, a02, ...）を順にハイライトの記事と対応させ、台本に出てこない名前を挙げる */
export function checkScript(script: Script, articles: Article[]): SegmentFinding[] {
  const segments = script.segments.filter((s) => /^a\d+$/.test(s.id))
  return segments.map((segment, i) => {
    const article = articles[i]
    const text = segment.lines.map((l) => l.text).join('\n')
    const words = latinWords(text)
    if (!article) {
      return { segmentId: segment.id, segmentTitle: segment.title, article: '（対応する記事なし）', missingTech: [], missingNames: [] }
    }

    const codes = [...new Set([...article.summary.matchAll(/`([^`]+)`/g)].map((m) => m[1]))]
    const missingTech = codes.filter((code) => {
      const tokens = techTokens(code)
      return tokens.length > 0 && !tokens.every((t) => words.has(t))
    })
    const missingNames = nameTokens(article.summary).filter((name) => {
      const tokens = name.toLowerCase().match(/[a-z0-9]+/g) ?? []
      return !tokens.every((t) => words.has(t))
    })

    return { segmentId: segment.id, segmentTitle: segment.title, article: article.title, missingTech, missingNames }
  })
}
