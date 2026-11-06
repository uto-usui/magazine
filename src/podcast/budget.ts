import type { Ledger, PodcastConfig, Script } from './schema'

/** JST の YYYY-MM-DD。月の区切りは poller と同じく日本時間で数える */
export function jstDate(now: Date): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(now)
}

export function priceOn(config: PodcastConfig, date: string) {
  const period = [...config.pricing.periods]
    .sort((a, b) => a.from.localeCompare(b.from))
    .filter((p) => p.from <= date)
    .at(-1)
  if (!period) throw new Error(`${date} に適用できる料金がありません（config/podcast.yml の pricing）`)
  return period
}

export function costUsd(
  config: PodcastConfig,
  date: string,
  tokens: { inputTokens: number; outputTokens: number }
): number {
  const p = priceOn(config, date)
  return (tokens.inputTokens * p.inputPerM + tokens.outputTokens * p.outputPerM) / 1_000_000
}

export function scriptChars(script: Script): number {
  return script.segments.reduce(
    (sum, s) => sum + s.lines.reduce((n, l) => n + l.text.replace(/\s/g, '').length, 0),
    0
  )
}

/** 文字数から音声の長さと料金を多めに見積もる。入力トークンは1字≒1トークンで上に丸める */
export function estimate(config: PodcastConfig, date: string, chars: number) {
  const audioSec = (chars / config.speech.charsPerSecond) * config.limits.estimateMargin
  const outputTokens = Math.ceil(audioSec * config.speech.audioTokensPerSecond)
  const usd = costUsd(config, date, { inputTokens: chars, outputTokens })
  return { audioSec, outputTokens, usd }
}

export function summarizeMonth(config: PodcastConfig, ledger: Ledger, month: string) {
  const entries = ledger.entries.filter((e) => e.date.startsWith(month))
  const usd = entries.reduce((s, e) => s + e.usd, 0)
  const jpy = usd * config.budget.usdJpy
  const episodes = new Set(entries.map((e) => e.episode)).size
  const audioSec = entries.reduce((s, e) => s + e.audioSec, 0)

  return {
    month,
    usd,
    jpy,
    ratio: jpy / config.budget.monthlyJpy,
    episodes,
    audioSec,
    // 発行は不定期なので、日割りではなく1本あたりの平均から月の見込みを出す
    avgJpyPerEpisode: episodes > 0 ? jpy / episodes : null,
  }
}

export interface PreflightInput {
  config: PodcastConfig
  ledger: Ledger
  script: Script
  now: Date
}

/** 生成の前に止める理由を返す。空配列なら生成してよい */
export function preflight({ config, ledger, script, now }: PreflightInput): string[] {
  const problems: string[] = []
  const today = jstDate(now)
  const chars = scriptChars(script)

  if (chars > config.limits.maxScriptChars) {
    problems.push(
      `台本が ${chars} 字あり、上限の ${config.limits.maxScriptChars} 字を超えています（15分に収まるよう短くしてください）`
    )
  }

  const todaysOthers = new Set(
    ledger.entries.filter((e) => e.date === today && e.episode !== script.episode).map((e) => e.episode)
  )
  if (todaysOthers.size >= config.limits.maxEpisodesPerDay) {
    problems.push(
      `今日はすでに ${todaysOthers.size} 本作っています（1日の上限 ${config.limits.maxEpisodesPerDay} 本）`
    )
  }

  const month = summarizeMonth(config, ledger, today.slice(0, 7))
  const est = estimate(config, today, chars)
  const after = month.jpy + est.usd * config.budget.usdJpy
  if (after > config.budget.monthlyJpy) {
    problems.push(
      `今月の使用額 ${yen(month.jpy)} にこの回の見積もり ${yen(est.usd * config.budget.usdJpy)} を足すと、` +
        `月の予算 ${yen(config.budget.monthlyJpy)} を超えます`
    )
  }

  return problems
}

export function yen(jpy: number): string {
  return `¥${Math.round(jpy).toLocaleString('ja-JP')}`
}
