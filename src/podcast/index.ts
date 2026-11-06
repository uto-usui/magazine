import { createHash } from 'node:crypto'
import { access, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { buildEpisodeMp3, durationSec, joinWavChunks } from './audio'
import { costUsd, estimate, jstDate, preflight, scriptChars, summarizeMonth, yen } from './budget'
import type { PodcastConfig, Script } from './schema'
import { appendLedger, loadLedger } from './store'
import { synthesizeSegment, TtsHttpError } from './tts'

export const AUDIO_DIR = join(process.cwd(), 'podcasts', 'audio')

const RETRY_DELAYS_MS = [5_000, 20_000]

export interface GenerateOptions {
  config: PodcastConfig
  script: Script
  apiKey: string
  force?: boolean
  dryRun?: boolean
  now?: () => Date
  log?: (msg: string) => void
}

export type GenerateResult =
  | { status: 'skipped'; mp3: string }
  | { status: 'refused'; problems: string[] }
  | { status: 'dry-run'; problems: string[] }
  | { status: 'done'; mp3: string; audioSec: number; usd: number }

export async function generateEpisode(opts: GenerateOptions): Promise<GenerateResult> {
  const { config, script, apiKey } = opts
  const now = opts.now ?? (() => new Date())
  const log = opts.log ?? console.log
  const mp3 = join(AUDIO_DIR, `${script.episode}.mp3`)

  if (!opts.force && (await exists(mp3))) {
    log(`すでにあるのでスキップします: ${relative(mp3)}`)
    return { status: 'skipped', mp3 }
  }

  const today = jstDate(now())
  const chars = scriptChars(script)
  const est = estimate(config, today, chars)
  const before = summarizeMonth(config, await loadLedger(), today.slice(0, 7))
  log(
    `台本 ${chars}字 / 見積もり ${(est.audioSec / 60).toFixed(1)}分・最大 ${yen(est.usd * config.budget.usdJpy)}` +
      ` / 今月 ${yen(before.jpy)} / 予算 ${yen(config.budget.monthlyJpy)}`
  )

  const problems = preflight({ config, ledger: await loadLedger(), script, now: now() })
  if (opts.dryRun) {
    for (const p of problems) log(`NG: ${p}`)
    return { status: 'dry-run', problems }
  }
  if (problems.length > 0) return { status: 'refused', problems }

  const workDir = join(AUDIO_DIR, script.episode)
  await mkdir(workDir, { recursive: true })

  const segmentWavs: string[] = []
  let spentUsd = 0
  for (const [i, segment] of script.segments.entries()) {
    const hash = createHash('sha256').update(JSON.stringify(segment.lines)).digest('hex').slice(0, 8)
    const wav = join(workDir, `${String(i).padStart(2, '0')}-${segment.id}-${hash}.wav`)
    segmentWavs.push(wav)
    // 前回の途中まで作ったセグメントは使い回す。再実行で二重に払わないため
    if (await exists(wav)) {
      log(`  [${i + 1}/${script.segments.length}] ${segment.title}（作成済み）`)
      continue
    }

    // セグメントごとに予算を見直す。見積もりより長く話されたときも途中で止まれるように
    const date = jstDate(now())
    const segChars = segment.lines.reduce((n, l) => n + l.text.length, 0)
    const segEst = estimate(config, date, segChars)
    const month = summarizeMonth(config, await loadLedger(), date.slice(0, 7))
    if (month.jpy + segEst.usd * config.budget.usdJpy > config.budget.monthlyJpy) {
      return {
        status: 'refused',
        problems: [`${segment.title} の途中で月の予算 ${yen(config.budget.monthlyJpy)} に届くため止めました（今月 ${yen(month.jpy)}）`],
      }
    }

    const result = await withRetry(() => synthesizeSegment(config, segment, apiKey), log)
    await joinWavChunks(result.wavChunks, workDir, wav)
    const audioSec = await durationSec(wav)
    // usage が返らなかったときは、音声の長さから出力トークンを計算して記録する
    const tokens = {
      inputTokens: result.inputTokens || segChars,
      outputTokens: result.outputTokens || Math.ceil(audioSec * config.speech.audioTokensPerSecond),
    }
    const usd = costUsd(config, date, tokens)
    spentUsd += usd
    await appendLedger({
      at: now().toISOString(),
      date,
      episode: script.episode,
      segment: segment.id,
      model: config.model,
      ...tokens,
      audioSec: Math.round(audioSec * 10) / 10,
      usd,
    })
    log(`  [${i + 1}/${script.segments.length}] ${segment.title} ${audioSec.toFixed(0)}秒 ${yen(usd * config.budget.usdJpy)}`)
  }

  await buildEpisodeMp3(segmentWavs, workDir, mp3)
  await writeTimeline(script, segmentWavs, join(AUDIO_DIR, `${script.episode}.timeline.json`))
  const audioSec = await durationSec(mp3)
  return { status: 'done', mp3, audioSec, usd: spentUsd }
}

/** MP4 にするときに使う、セグメントごとの開始位置と長さ（MP3 と同じ間隔で計算） */
async function writeTimeline(script: Script, wavs: string[], path: string, gapSec = 0.8) {
  let start = 0
  const segments = []
  for (const [i, seg] of script.segments.entries()) {
    const duration = await durationSec(wavs[i])
    segments.push({ id: seg.id, title: seg.title, start: round(start), duration: round(duration) })
    start += duration + gapSec
  }
  await writeFile(path, JSON.stringify({ episode: script.episode, segments }, null, 2) + '\n')
}

async function withRetry<T>(fn: () => Promise<T>, log: (m: string) => void): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn()
    } catch (error) {
      const delay = RETRY_DELAYS_MS[attempt]
      if (!(error instanceof TtsHttpError && error.retryable) || delay === undefined) throw error
      log(`  ${error.status} が返ったので ${delay / 1000} 秒後にやり直します`)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
}

async function exists(path: string) {
  return access(path).then(
    () => true,
    () => false
  )
}

function relative(path: string) {
  return path.replace(process.cwd() + '/', '')
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
