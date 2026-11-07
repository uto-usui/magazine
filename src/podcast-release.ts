import { execFile } from 'node:child_process'
import { access, link, mkdtemp, readFile, rm, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { issueNumber } from './podcast/cover'
import { AUDIO_DIR } from './podcast/index'
import { episodesFromTags, needsUpload, releaseTag, shouldBeLatest } from './podcast/release'
import { TimelineSchema } from './podcast/schema'
import { ensureShowNotes } from './podcast/shownotes'
import { loadPodcastConfig, loadScript, loadTrackedEpisodes } from './podcast/store'
import { fullSegment, postText, probe, validateProbe } from './podcast/video'

const run = promisify(execFile)
const VIDEO_DIR = join(process.cwd(), 'podcasts', 'video')

// gh は GITHUB_TOKEN を gh auth login のアカウントより優先する。シェルの gh 関数と同じく外して、ログイン中のアカウントで操作する
const { GITHUB_TOKEN: _, ...ghEnv } = process.env
const gh = (args: string[]) => run('gh', args, { env: ghEnv, maxBuffer: 16 * 1024 * 1024 })

/**
 * 号ごとの GitHub Release（タグ podcast-<episode>）を作り、MP3 と全編の MP4 を置く。本文は Show Notes。
 * もう Release があれば題と本文をそろえ、変わったファイルだけ上げ直すので、何度実行してもよい
 */
async function main() {
  const args = process.argv.slice(2)
  const scriptPath = args.find((a) => !a.startsWith('--'))
  if (!scriptPath) {
    console.error('Usage: pnpm run podcast:release <podcasts/scripts/xxx.json> [--no-video] [--dry-run]')
    process.exit(1)
  }
  const dryRun = args.includes('--dry-run')
  const withVideo = !args.includes('--no-video')

  const config = await loadPodcastConfig()
  const { episode } = await loadScript(scriptPath)
  const tag = releaseTag(episode)

  const timelinePath = join(AUDIO_DIR, `${episode}.timeline.json`)
  if (!(await exists(timelinePath))) fail(`${rel(timelinePath)} がありません。題と本文の話題はタイムラインから作ります`)
  const timeline = TimelineSchema.parse(JSON.parse(await readFile(timelinePath, 'utf-8')))

  const mp3 = join(AUDIO_DIR, `${episode}.mp3`)
  if (!(await exists(mp3))) fail(`${rel(mp3)} がありません`)
  const files = [{ path: mp3, name: `${episode}.mp3` }]
  if (withVideo) {
    const mp4 = join(VIDEO_DIR, episode, 'full.mp4')
    if (!(await exists(mp4))) fail(`${rel(mp4)} がありません。先に pnpm run podcast:video を実行するか、MP3 だけなら --no-video を付けてください`)
    const problems = validateProbe(await probe(mp4), fullSegment(timeline).duration, config.video)
    if (problems.length > 0) fail(`${rel(mp4)} が条件を満たしません:\n  ${problems.join('\n  ')}`)
    files.push({ path: mp4, name: `${episode}.mp4` })
  }

  const issueNo = issueNumber(episode, await loadTrackedEpisodes())
  const { title } = postText(timeline, issueNo)
  const repoUrl = (await gh(['repo', 'view', '--json', 'url', '-q', '.url'])).stdout.trim()
  // Release の本文は Show Notes のファイル。手で直したものもそのまま使う
  const shownotes = await ensureShowNotes({ episode, title, timeline, repoUrl })
  if (shownotes.created) console.log(`${rel(shownotes.path)} を作りました`)
  const notes = shownotes.text

  const tags = JSON.parse((await gh(['release', 'list', '--limit', '1000', '--json', 'tagName'])).stdout) as Array<{ tagName: string }>
  const exists_ = tags.some((t) => t.tagName === tag)
  const others = episodesFromTags(tags.map((t) => t.tagName)).filter((e) => e !== episode)

  let assets: Array<{ name: string; size: number }> = []
  let target = ''
  if (exists_) {
    assets = (JSON.parse((await gh(['release', 'view', tag, '--json', 'assets'])).stdout) as { assets: typeof assets }).assets
  } else {
    // タグは、その号の台本が入ったコミットに付ける。GitHub にまだないコミットにはタグを付けられないので、
    // 台本が push されていなければ GitHub の master の先頭に付ける
    await run('git', ['fetch', '--quiet', 'origin'])
    target = (await run('git', ['log', '-1', '--format=%H', 'origin/master', '--', `podcasts/scripts/${episode}.json`])).stdout.trim()
    if (!target) {
      target = (await run('git', ['rev-parse', 'origin/master'])).stdout.trim()
      console.log(`podcasts/scripts/${episode}.json がまだ GitHub にないので、タグは master の先頭に付けます`)
    }
  }
  const latest = shouldBeLatest(episode, others)
  const uploads = await Promise.all(
    files.map(async (f) => {
      const file = { ...f, size: (await stat(f.path)).size }
      return { ...file, upload: needsUpload(file, assets) }
    })
  )

  console.log(`${tag}  ${title}${exists_ ? '（作成済み）' : `  タグの位置 ${target.slice(0, 8)}`}${!exists_ && latest ? '  Latest' : ''}`)
  for (const f of uploads) console.log(`  ${f.name}  ${(f.size / 1024 / 1024).toFixed(1)}MB  ${f.upload ? '上げる' : '同じものが上がっている'}`)
  if (dryRun) return

  if (exists_) {
    await gh(['release', 'edit', tag, '--title', title, '--notes', notes])
  } else {
    await gh(['release', 'create', tag, '--target', target, '--title', title, '--notes', notes, `--latest=${latest}`])
  }

  for (const f of uploads.filter((u) => u.upload)) {
    // 全編の MP4 は手元では full.mp4 なので、号の ID の名前で上げるためにハードリンクを作る（300MB を写さない）
    const dir = await mkdtemp(join(VIDEO_DIR, '.upload-'))
    try {
      const named = join(dir, f.name)
      await link(f.path, named)
      console.log(`${f.name} を上げています…`)
      await gh(['release', 'upload', tag, named, '--clobber'])
    } finally {
      await rm(dir, { recursive: true, force: true })
    }
  }
  console.log(`${repoUrl}/releases/tag/${tag}`)
}

function fail(message: string): never {
  console.error(message)
  process.exit(1)
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
