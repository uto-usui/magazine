export interface ArticleRecord {
  feedName: string
  source: string
  title: string
  /** articles/YYYY-MM-DD の日付（取り込んだ日） */
  fetchedOn: string
}

export interface FeedQualityInput {
  feeds: { name: string; enabled: boolean | 'local' }[]
  articles: ArticleRecord[]
  /** ニュースレターのハイライトに載った記事 URL */
  highlightUrls: string[]
  /** ピックアップに載った記事 URL */
  pickupUrls: string[]
  today: string
  windowDays: number
}

export type FeedStatus = 'ok' | 'remove-candidate' | 'watching' | 'stalled'

export interface FeedQualityRow {
  name: string
  ingested: number
  highlights: number
  pickups: number
  /** ハイライトかピックアップのどちらかに載った本数 */
  selected: number
  /** selected / 取り込み数。取り込みが 0 なら null */
  rate: number | null
  japanese: boolean
  firstFetchedOn: string | null
  lastFetchedOn: string | null
  status: FeedStatus
}

// 判定に使うしきい値。取り込みが少ないうちは選ばれなくても偶然の範囲なので判定しない
export const MIN_ARTICLES_TO_JUDGE = 8
export const WATCH_DAYS = 30
export const STALLED_DAYS = 90

const JAPANESE = /[぀-ヿ一-鿿]/

export function normalizeForMatch(url: string): string {
  try {
    const u = new URL(url)
    u.hash = ''
    return `${u.host}${u.pathname.replace(/\/+$/, '')}${u.search}`.toLowerCase()
  } catch {
    return url.trim().replace(/\/+$/, '').toLowerCase()
  }
}

function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000)
}

export function computeFeedQuality(input: FeedQualityInput): FeedQualityRow[] {
  const highlights = new Set(input.highlightUrls.map(normalizeForMatch))
  const pickups = new Set(input.pickupUrls.map(normalizeForMatch))
  const windowStart = new Date(Date.parse(input.today) - input.windowDays * 86_400_000)
    .toISOString()
    .slice(0, 10)

  return input.feeds
    .filter((feed) => feed.enabled !== false)
    .map((feed) => {
      const all = input.articles.filter((a) => a.feedName === feed.name)
      const recent = all.filter((a) => a.fetchedOn >= windowStart)
      const dates = all.map((a) => a.fetchedOn).sort()
      const isHighlight = (a: ArticleRecord) => highlights.has(normalizeForMatch(a.source))
      const isPickup = (a: ArticleRecord) => pickups.has(normalizeForMatch(a.source))
      const h = recent.filter(isHighlight).length
      const p = recent.filter(isPickup).length
      // 両方に載った記事を 2 回数えないよう、採用率は「どちらかに載った本数」で出す
      const selected = recent.filter((a) => isHighlight(a) || isPickup(a)).length
      const japanese = recent.length > 0 && recent.filter((a) => JAPANESE.test(a.title)).length * 2 >= recent.length
      const first = dates[0] ?? null
      const last = dates.at(-1) ?? null

      let status: FeedStatus = 'ok'
      if (!first || !last || daysBetween(first, input.today) < WATCH_DAYS) {
        status = 'watching'
      } else if (daysBetween(last, input.today) > STALLED_DAYS) {
        status = 'stalled'
      } else if (recent.length >= MIN_ARTICLES_TO_JUDGE && selected === 0) {
        status = 'remove-candidate'
      }

      return {
        name: feed.name,
        ingested: recent.length,
        highlights: h,
        pickups: p,
        selected,
        rate: recent.length === 0 ? null : selected / recent.length,
        japanese,
        firstFetchedOn: first,
        lastFetchedOn: last,
        status,
      }
    })
}

const STATUS_LABEL: Record<FeedStatus, string> = {
  ok: '',
  'remove-candidate': '外す候補',
  watching: '観察中',
  stalled: '停止',
}

function pct(rate: number | null): string {
  return rate === null ? '-' : `${Math.round(rate * 100)}%`
}

export function renderReport(rows: FeedQualityRow[], today: string, windowDays: number): string {
  const sorted = [...rows].sort((a, b) => (a.rate ?? -1) - (b.rate ?? -1) || b.ingested - a.ingested)
  const byStatus = (s: FeedStatus) => sorted.filter((r) => r.status === s)
  const sum = (rs: FeedQualityRow[], k: 'ingested' | 'selected') => rs.reduce((n, r) => n + r[k], 0)
  const langLine = (label: string, rs: FeedQualityRow[]) => {
    const ing = sum(rs, 'ingested')
    const sel = sum(rs, 'selected')
    return `| ${label} | ${rs.length} | ${ing} | ${sel} | ${pct(ing ? sel / ing : null)} |`
  }

  const lines = [
    `# フィード品質レポート（${today}、直近 ${windowDays} 日）`,
    '',
    '採用率 = ニュースレターのハイライトかピックアップに載った本数 ÷ 取り込んだ本数。',
    `取り込みが ${MIN_ARTICLES_TO_JUDGE} 本以上で 1 本も選ばれていないフィードを「外す候補」にしています。`,
    `まだ取り込みがないか、初めて取り込んでから ${WATCH_DAYS} 日未満のものは「観察中」、${STALLED_DAYS} 日以上取り込みがないものは「停止」です。`,
    '1 号のハイライトは 15 本なので、取り込みの半分ほどは選ばれるのが普通です。ピックアップのほうが選ぶ基準は厳しめです。',
    '選定の基準は ai/docs/selection-rubric.md です。点数ごとの記録は newsletters/scores/ にあります。',
    '',
  ]

  for (const s of ['remove-candidate', 'stalled', 'watching'] as const) {
    const rs = byStatus(s)
    lines.push(`## ${STATUS_LABEL[s]}（${rs.length}）`, '')
    if (rs.length === 0) lines.push('なし', '')
    else lines.push(...rs.map((r) => `- ${r.name}（取り込み ${r.ingested}、最終 ${r.lastFetchedOn ?? 'なし'}）`), '')
  }

  lines.push(
    '## 言語別',
    '',
    '| 言語 | フィード数 | 取り込み | 採用 | 採用率 |',
    '|---|---|---|---|---|',
    langLine('日本語', rows.filter((r) => r.japanese)),
    langLine('英語ほか', rows.filter((r) => !r.japanese && r.ingested > 0)),
    '',
    '## 全フィード',
    '',
    '| フィード | 取り込み | ハイライト | ピックアップ | 採用率 | 日本語 | 最終取り込み | 判定 |',
    '|---|---|---|---|---|---|---|---|',
    ...sorted.map(
      (r) =>
        `| ${r.name} | ${r.ingested} | ${r.highlights} | ${r.pickups} | ${pct(r.rate)} | ${r.japanese ? '○' : ''} | ${r.lastFetchedOn ?? '-'} | ${STATUS_LABEL[r.status]} |`
    ),
    ''
  )
  return lines.join('\n')
}
