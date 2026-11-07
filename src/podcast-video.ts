import { execFile } from 'node:child_process'
import { access, mkdir, readFile, rename, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { chromium } from 'playwright'
import { AUDIO_DIR } from './podcast/index'
import { TimelineSchema } from './podcast/schema'
import { issueNumber } from './podcast/cover'
import { loadPodcastConfig, loadScript, loadTrackedEpisodes } from './podcast/store'
import { buildClipUrl, clipAction, estimateMb, planProblems, postText, probe, renderClip, selectTargets, validateProbe } from './podcast/video'

const VIDEO_DIR = join(process.cwd(), 'podcasts', 'video')

/**
 * 号の MP3 から、X に投稿する MP4 を podcasts/video/<episode>/ に書き出す。既定は全編の full.mp4 で、
 * --clips で記事ごとの a01.mp4 なども作る。
 * エンコードは reel の talk-lab がブラウザ内で行うので、ここでは MP3 を渡して結果を受け取るだけ
 */
async function main() {
  const args = process.argv.slice(2)
  const scriptPath = args.find((a, i) => !a.startsWith('--') && !['--app', '--only'].includes(args[i - 1]))
  if (!scriptPath) {
    console.error('Usage: pnpm run podcast:video <podcasts/scripts/xxx.json> [--clips] [--only full,a01] [--app <url>] [--force] [--dry-run]')
    process.exit(1)
  }
  const option = (name: string) => {
    const i = args.indexOf(name)
    return i === -1 ? undefined : args[i + 1]
  }
  const dryRun = args.includes('--dry-run')
  const only = option('--only')?.split(',').map((s) => s.trim()).filter(Boolean)

  const config = await loadPodcastConfig()
  const appUrl = option('--app') ?? config.video.appUrl
  const { episode } = await loadScript(scriptPath)

  const timelinePath = join(AUDIO_DIR, `${episode}.timeline.json`)
  if (!(await exists(timelinePath))) {
    console.error(`${rel(timelinePath)} がありません。タイムラインは pnpm run podcast で MP3 を作ったときにだけ書き出されます`)
    process.exit(1)
  }
  const timeline = TimelineSchema.parse(JSON.parse(await readFile(timelinePath, 'utf-8')))
  const clips = args.includes('--clips')
  const segments = selectTargets(timeline, { only, clips })
  if (clips && !only && segments.length === 1) {
    console.warn(`${rel(timelinePath)} に記事のセグメント（a01, a02, ...）がないので、全編だけ作ります`)
  }

  for (const s of segments) {
    const mb = estimateMb(s.duration, config.video.bitrateMbps)
    console.log(`${s.id}  開始 ${s.start.toFixed(2)}s  長さ ${s.duration.toFixed(2)}s  約${mb.toFixed(1)}MB  ${s.title}`)
  }
  const problems = planProblems(segments, config.video)
  for (const p of problems) console.error(`NG: ${p}`)
  if (problems.length > 0) process.exit(1)
  if (dryRun) {
    console.log(`${segments.length} 本 / ${appUrl} / ${config.video.bitrateMbps}Mbps`)
    return
  }

  const mp3 = join(AUDIO_DIR, `${episode}.mp3`)
  if (!(await exists(mp3))) {
    console.log(`${rel(mp3)} がないので Release から取ってきます`)
    // gh は GITHUB_TOKEN を gh auth login のアカウントより優先する。シェルの gh 関数と同じく外して、ログイン中のアカウントで取る
    const { GITHUB_TOKEN: _, ...env } = process.env
    await promisify(execFile)('gh', ['release', 'download', 'podcast', '-p', `${episode}.mp3`, '-D', AUDIO_DIR], { env })
  }

  const sourcesMtimeMs = [(await stat(mp3)).mtimeMs, (await stat(timelinePath)).mtimeMs]
  const force = args.includes('--force')

  const outDir = join(VIDEO_DIR, episode)
  await mkdir(outDir, { recursive: true })
  // 既定の headless shell は H.264 のハードウェアエンコーダを作れず talk-lab が止まる。バンドル版のフル Chromium なら作れる
  const browser = await chromium.launch({ channel: 'chromium' })
  const results: string[] = []
  try {
    for (const [i, s] of segments.entries()) {
      const out = join(outDir, `${s.id}.mp4`)
      const head = `[${i + 1}/${segments.length}] ${s.id} ${s.title}`
      // --only で名前を挙げたものは、作り直したくて指定しているので必ず作る
      const forced = force || (only?.includes(s.id) ?? false)
      const clip = !forced && (await exists(out)) ? { mtimeMs: (await stat(out)).mtimeMs, problems: await probe(out).then((p) => validateProbe(p, s.duration, config.video), () => ['ffprobe で読めません']) } : null
      const action = clipAction({ forced, clip, sourcesMtimeMs })
      if (action === 'reuse') {
        console.log(`${head}（作成済み）`)
        results.push(await summary(out))
        continue
      }
      const why = { forced: '作り直し', stale: 'MP3 かタイムラインのほうが新しいので作り直し', invalid: '前の MP4 が条件を満たさないので作り直し', missing: '' }[action]
      console.log(why ? `${head}（${why}）` : head)
      const part = join(outDir, `${s.id}.part.mp4`)
      await renderClip({
        browser,
        url: buildClipUrl(appUrl, config.video, s),
        mp3,
        durationSec: s.duration,
        outPath: part,
        log: console.log,
      })
      const bad = validateProbe(await probe(part), s.duration, config.video)
      if (bad.length > 0) throw new Error(`${rel(part)} が X の条件を満たしません:\n  ${bad.join('\n  ')}`)
      await rename(part, out)
      results.push(await summary(out))
    }
  } finally {
    await browser.close()
  }
  console.log(`\n${results.join('\n')}`)

  const post = postText(timeline, issueNumber(episode, await loadTrackedEpisodes()))
  console.log(`\n投稿用:\n${post.title}\n${post.topics}`)
}

async function summary(path: string) {
  const p = await probe(path)
  const codecs = (p.streams ?? []).map((s) => s.codec_name).join('+')
  const mb = Number(p.format?.size) / 1024 / 1024
  return `${rel(path)}  ${Number(p.format?.duration).toFixed(2)}s  ${mb.toFixed(1)}MB  ${codecs}`
}

async function exists(path: string) {
  return access(path).then(
    () => true,
    () => false
  )
}

function rel(path: string) {
  return path.replace(process.cwd() + '/', '')
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
