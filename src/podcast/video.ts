import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { Browser } from 'playwright'
import type { PodcastConfig, Timeline, TimelineSegment } from './schema'

const run = promisify(execFile)

/** X の通常アカウントで投稿できる動画の上限 */
export const X_MAX_SEC = 140
export const X_MAX_BYTES = 512 * 1024 * 1024
/** 書き出した MP4 の長さと、タイムラインの長さのずれの許容 */
export const DURATION_TOLERANCE_SEC = 0.2

export type VideoConfig = PodcastConfig['video']

export function buildClipUrl(appUrl: string, video: Omit<VideoConfig, 'appUrl'>, segment: Pick<TimelineSegment, 'start' | 'duration'>): string {
  const url = new URL(appUrl)
  url.searchParams.set('style', video.style)
  url.searchParams.set('preset', video.preset)
  url.searchParams.set('start', String(segment.start))
  url.searchParams.set('len', String(segment.duration))
  url.searchParams.set('bitrate', String(video.bitrateMbps))
  return url.toString()
}

/** 記事のセグメント（a01, a02, ...）だけを取り出す。only を渡したらその id に絞る */
export function articleSegments(timeline: Timeline, only?: string[]): TimelineSegment[] {
  const articles = timeline.segments.filter((s) => /^a\d+$/.test(s.id))
  if (!only || only.length === 0) return articles
  const unknown = only.filter((id) => !articles.some((s) => s.id === id))
  if (unknown.length > 0) {
    throw new Error(`タイムラインに記事のセグメント ${unknown.join(', ')} がありません（あるのは ${articles.map((s) => s.id).join(', ')}）`)
  }
  return articles.filter((s) => only.includes(s.id))
}

/** エンコード前に分かる問題（X に上げられない長さ） */
export function planProblems(segments: TimelineSegment[]): string[] {
  return segments
    .filter((s) => s.duration > X_MAX_SEC)
    .map((s) => `${s.id} ${s.title} は ${s.duration.toFixed(1)} 秒で、X の上限 ${X_MAX_SEC} 秒を超えます`)
}

/** 映像のビットレートだけで出した大きさの目安（MB） */
export function estimateMb(durationSec: number, bitrateMbps: number): number {
  return (durationSec * bitrateMbps) / 8
}

/** 書き出し完了を待つ時間。短いクリップでも 2 分は待ち、長いものは実時間の 4 倍まで待つ */
export function exportTimeoutMs(durationSec: number): number {
  return Math.max(120_000, Math.ceil(durationSec * 4_000))
}

export interface ProbeResult {
  streams?: Array<{ codec_type?: string; codec_name?: string }>
  format?: { duration?: string; size?: string }
}

export function validateProbe(probe: ProbeResult, expectedSec: number): string[] {
  const problems: string[] = []
  const streams = probe.streams ?? []
  const video = streams.find((s) => s.codec_type === 'video')
  const audio = streams.find((s) => s.codec_type === 'audio')
  if (video?.codec_name !== 'h264') problems.push(`映像が h264 ではありません（${video?.codec_name ?? 'なし'}）`)
  if (audio?.codec_name !== 'aac') problems.push(`音声が aac ではありません（${audio?.codec_name ?? 'なし'}）`)

  const duration = Number(probe.format?.duration)
  if (!Number.isFinite(duration)) {
    problems.push('長さを読めません')
  } else {
    if (Math.abs(duration - expectedSec) > DURATION_TOLERANCE_SEC) {
      problems.push(`長さが ${duration.toFixed(2)} 秒で、タイムラインの ${expectedSec.toFixed(2)} 秒と ${DURATION_TOLERANCE_SEC} 秒より大きくずれています`)
    }
    if (duration > X_MAX_SEC) problems.push(`長さが ${duration.toFixed(1)} 秒で、X の上限 ${X_MAX_SEC} 秒を超えます`)
  }

  const size = Number(probe.format?.size)
  if (Number.isFinite(size) && size > X_MAX_BYTES) problems.push(`大きさが ${(size / 1024 / 1024).toFixed(0)} MB で、X の上限 512 MB を超えます`)
  return problems
}

export async function probe(path: string): Promise<ProbeResult> {
  const { stdout } = await run('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', path])
  return JSON.parse(stdout) as ProbeResult
}

const STATE = '[data-export-state]'
const stateIs = (...states: string[]) => states.map((s) => `[data-export-state="${s}"]`).join(', ')

/** talk-lab でクリップを1本書き出し、ダウンロードした MP4 を outPath に保存する */
export async function renderClip(opts: {
  browser: Browser
  url: string
  mp3: string
  durationSec: number
  outPath: string
  log?: (msg: string) => void
}) {
  const log = opts.log ?? (() => {})
  const context = await opts.browser.newContext({ acceptDownloads: true })
  const page = await context.newPage()
  const pageErrors: string[] = []
  page.on('pageerror', (e) => pageErrors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') pageErrors.push(m.text())
  })

  const failIfError = async () => {
    const state = page.locator(STATE)
    if ((await state.getAttribute('data-export-state')) !== 'error') return
    // エラー文の場所は約束に入っていないので、それらしい要素から拾い、なければページの文を短く切って出す
    const note = page.locator('[data-export-error], [role=alert], .note--error').first()
    const text = ((await note.count()) > 0 ? await note.innerText() : (await state.innerText()).slice(-300)).trim()
    throw new Error(`talk-lab がエラーになりました: ${text || '（エラー文なし）'}${pageErrors.length ? `\n${pageErrors.join('\n')}` : ''}`)
  }

  try {
    await page.goto(opts.url, { waitUntil: 'networkidle' })
    // React の島が描画し終わる前に入れたファイルは拾われないことがあるので、状態が idle から動くまで入れ直す
    const input = page.locator('input[type=file][accept^="audio"]')
    await input.waitFor({ state: 'attached', timeout: 30_000 })
    await page.locator(STATE).waitFor({ state: 'attached', timeout: 30_000 })
    for (let attempt = 0; ; attempt++) {
      await input.setInputFiles(opts.mp3)
      const moved = await page
        .waitForSelector(stateIs('analyzing', 'ready', 'error'), { state: 'attached', timeout: 5_000 })
        .then(() => true, () => false)
      if (moved) break
      if (attempt >= 2) throw new Error('MP3 を入れても talk-lab が読み込みを始めません')
    }

    await page.waitForSelector(stateIs('ready', 'error'), { state: 'attached', timeout: 120_000 })
    await failIfError()

    log('    書き出し中…')
    await page.click('[data-action=export]')
    await page.waitForSelector(stateIs('done', 'error'), { state: 'attached', timeout: exportTimeoutMs(opts.durationSec) })
    await failIfError()

    const download = page.waitForEvent('download', { timeout: 60_000 })
    await page.click('[data-action=save]')
    await (await download).saveAs(opts.outPath)
  } finally {
    await context.close()
  }
}
