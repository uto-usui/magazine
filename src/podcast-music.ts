import { execFile } from 'node:child_process'
import { access, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { promisify } from 'node:util'
import { issueNumber } from './podcast/cover'
import { AUDIO_DIR } from './podcast/index'
import { MUSIC_ADD_DIR, SET_FLAGS, SHOW_NAME, musicTags, pendingFlags, type MusicRecord } from './podcast/music'
import { releaseTag } from './podcast/release'
import { loadScript, loadTrackedEpisodes } from './podcast/store'

const run = promisify(execFile)
const RECORD_PATH = join(AUDIO_DIR, 'music.json')
const WAIT_SEC = 90

/**
 * 号の MP3 にタグとカバー画像を付けて、ミュージックの「自動的に追加」フォルダに置く。
 * 取り込まれたら「再生位置を記憶」「シャッフル時にスキップ」を付ける。置いた号は 2 回置かない（--force で置き直す）
 */
async function main() {
  const args = process.argv.slice(2)
  const all = args.includes('--all')
  const force = args.includes('--force')
  const scripts = args.filter((a) => !a.startsWith('--'))
  if (!all && scripts.length === 0) {
    console.error('Usage: pnpm run podcast:music <podcasts/scripts/xxx.json>... | --all [--force]')
    process.exit(1)
  }
  try {
    await access(MUSIC_ADD_DIR)
  } catch {
    console.error(`${MUSIC_ADD_DIR} がないので入れません`)
    process.exit(1)
  }

  const episodes = all
    ? (await readdir(AUDIO_DIR)).map((f) => f.match(/^(\d{4}-\d{2}-\d{2}-\d{6})\.mp3$/)?.[1]).filter((e): e is string => Boolean(e)).sort()
    : await Promise.all(scripts.map(async (s) => (await loadScript(s)).episode))
  const tracked = await loadTrackedEpisodes()
  const repoUrl = await githubUrl()
  const record = await loadRecord()

  for (const episode of episodes) {
    if (record[episode] && !force) {
      console.log(`${episode}  入れ済み（${record[episode].added.slice(0, 10)}）`)
      continue
    }
    const mp3 = join(AUDIO_DIR, `${episode}.mp3`)
    if (!(await exists(mp3))) {
      console.log(`${episode}  MP3 がないので飛ばす`)
      continue
    }
    const tags = musicTags(episode, issueNumber(episode, tracked), repoUrl && `${repoUrl}/releases/tag/${releaseTag(episode)}`)
    await place(mp3, join(AUDIO_DIR, `${episode}.jpg`), `${tags.album} ${episode}.mp3`, tags)
    record[episode] = { title: tags.title, added: new Date().toISOString(), flagged: null }
    await saveRecord(record)
    console.log(`${episode}  ${tags.title} をミュージックに渡した`)
  }

  await flag(record)
}

/** タグとカバーを付けた複製を、追加フォルダと同じボリュームで書き終えてから移す（書きかけを取り込ませない） */
async function place(mp3: string, cover: string, name: string, tags: Record<string, string>) {
  const tmp = join(dirname(MUSIC_ADD_DIR), `.${name}.podcast.part`)
  const hasCover = await exists(cover)
  const input = hasCover ? ['-i', mp3, '-i', cover, '-map', '0:a', '-map', '1:v', '-disposition:v', 'attached_pic'] : ['-i', mp3, '-map', '0:a']
  const meta = Object.entries(tags).flatMap(([k, v]) => ['-metadata', `${k}=${v}`])
  try {
    // ID3v2.3 はミュージックが確実に読む版。音声は写すだけで、エンコードし直さない
    await run('ffmpeg', ['-y', '-loglevel', 'error', ...input, '-c', 'copy', ...meta, '-id3v2_version', '3', '-f', 'mp3', tmp])
    await rename(tmp, join(MUSIC_ADD_DIR, name))
  } finally {
    await rm(tmp, { force: true })
  }
}

/**
 * 取り込みはミュージックが起動しているときに後から起きるので、しばらく待ちながら付ける。
 * 起動していなければ何もしない（次に実行したときに付ける）
 */
async function flag(record: MusicRecord) {
  const deadline = Date.now() + WAIT_SEC * 1000
  while (pendingFlags(record).length > 0) {
    if ((await run('pgrep', ['-xq', 'Music']).then(() => true, () => false)) === false) {
      console.log('ミュージックが起動していないので、フラグは次に実行したときに付けます')
      return
    }
    const pending = pendingFlags(record)
    const { stdout } = await run('osascript', ['-e', SET_FLAGS, ...pending.flatMap((e) => [record[e].title, SHOW_NAME])])
    const now = new Date().toISOString()
    for (const i of stdout.trim().split(',').filter(Boolean)) {
      const episode = pending[Number(i) - 1]
      record[episode].flagged = now
      console.log(`${episode}  「再生位置を記憶」「シャッフル時にスキップ」を付けた`)
    }
    await saveRecord(record)
    if (pendingFlags(record).length === 0) return
    if (Date.now() > deadline) {
      console.log(`まだ取り込まれていない号があります（${pendingFlags(record).join(', ')}）。次に実行したときに付けます`)
      return
    }
    await new Promise((r) => setTimeout(r, 5000))
  }
}

async function githubUrl(): Promise<string | undefined> {
  // gh は GITHUB_TOKEN をログイン中のアカウントより優先するので外す
  const { GITHUB_TOKEN: _, ...env } = process.env
  return run('gh', ['repo', 'view', '--json', 'url', '-q', '.url'], { env }).then(
    (r) => r.stdout.trim() || undefined,
    () => undefined
  )
}

async function loadRecord(): Promise<MusicRecord> {
  try {
    return JSON.parse(await readFile(RECORD_PATH, 'utf-8'))
  } catch {
    return {}
  }
}

async function saveRecord(record: MusicRecord) {
  await writeFile(RECORD_PATH, JSON.stringify(record, null, 2) + '\n')
}

async function exists(path: string) {
  return access(path).then(() => true, () => false)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
