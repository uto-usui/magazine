import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Timeline } from './schema'
import { articleSegments } from './video'

export interface NewsletterArticle {
  title: string
  url: string
  source: string | null
}

/**
 * ニュースレターの詳細掲載の記事（「その他の記事」より前の ### 見出し）を、載っている順に取り出す。
 * 台本は詳細掲載の記事を同じ順に 1 本ずつ読むので、この順番が a01, a02, ... に対応する
 */
export function newsletterArticles(markdown: string): NewsletterArticle[] {
  const detailed = markdown.split(/^## その他の記事/m)[0] ?? ''
  const articles: NewsletterArticle[] = []
  for (const line of detailed.split('\n')) {
    const heading = line.match(/^### \[(.+)\]\((\S+)\)\s*$/)
    if (heading) {
      articles.push({ title: heading[1]!, url: heading[2]!, source: null })
      continue
    }
    const source = line.match(/^> \*\*出典\*\*: (.+?) \|/)
    const last = articles[articles.length - 1]
    if (source && last && last.source === null) last.source = source[1]!.trim()
  }
  return articles
}

/** チャプターの時刻。YouTube の説明欄でもチャプターとして読まれる m:ss（1時間を超えたら h:mm:ss） */
export function chapterTime(sec: number): string {
  const s = Math.floor(sec)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const ss = String(s % 60).padStart(2, '0')
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`
}

/**
 * 号の Show Notes（Markdown）。チャプターの時刻・話題・元記事のリンクと、ニュースレターへのリンク。
 * 記事の本数がタイムラインと合わないときは、どれがどれか分からないので推測でつながずにエラーにする
 */
export function buildShowNotes(opts: { title: string; timeline: Timeline; articles: NewsletterArticle[]; newsletterUrl: string }): string {
  const segments = articleSegments(opts.timeline)
  if (segments.length !== opts.articles.length) {
    throw new Error(`タイムラインの記事は ${segments.length} 本、ニュースレターの詳細掲載の記事は ${opts.articles.length} 本で、数が合いません`)
  }
  const lines = [`${opts.title}の音声版です。`, '']
  for (const s of opts.timeline.segments) {
    lines.push(`${chapterTime(s.start)} ${s.title}`)
    const i = segments.indexOf(s)
    if (i === -1) continue
    const a = opts.articles[i]!
    lines.push(`  ${a.title}${a.source ? `（${a.source}）` : ''}`, `  ${a.url}`)
  }
  lines.push('', `ニュースレター: ${opts.newsletterUrl}`, '')
  return lines.join('\n')
}

export const SHOWNOTES_DIR = join(process.cwd(), 'podcasts', 'shownotes')

/**
 * podcasts/shownotes/<episode>.md を返す。なければ作る。手で直したものを消さないよう、
 * すでにあるファイルは force のときだけ作り直す
 */
export async function ensureShowNotes(opts: {
  episode: string
  title: string
  timeline: Timeline
  repoUrl: string
  force?: boolean
}): Promise<{ path: string; text: string; created: boolean }> {
  const path = join(SHOWNOTES_DIR, `${opts.episode}.md`)
  if (!opts.force) {
    const existing = await readFile(path, 'utf-8').catch(() => null)
    if (existing !== null) return { path, text: existing, created: false }
  }
  const markdown = await readFile(join(process.cwd(), 'newsletters', `${opts.episode}.md`), 'utf-8')
  const text = buildShowNotes({
    title: opts.title,
    timeline: opts.timeline,
    articles: newsletterArticles(markdown),
    newsletterUrl: `${opts.repoUrl}/blob/master/newsletters/${opts.episode}.md`,
  })
  await mkdir(SHOWNOTES_DIR, { recursive: true })
  await writeFile(path, text)
  return { path, text, created: true }
}
