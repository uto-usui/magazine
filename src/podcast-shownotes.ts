import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { execFile } from 'node:child_process'
import { issueNumber } from './podcast/cover'
import { AUDIO_DIR } from './podcast/index'
import { TimelineSchema } from './podcast/schema'
import { ensureShowNotes } from './podcast/shownotes'
import { loadScript, loadTrackedEpisodes } from './podcast/store'
import { postText } from './podcast/video'

/**
 * 号の Show Notes を podcasts/shownotes/<episode>.md に書き出して表示する。
 * すでにあれば（手で直したかもしれないので）そのまま表示し、--force のときだけ作り直す
 */
async function main() {
  const args = process.argv.slice(2)
  const scriptPath = args.find((a) => !a.startsWith('--'))
  if (!scriptPath) {
    console.error('Usage: pnpm run podcast:shownotes <podcasts/scripts/xxx.json> [--force]')
    process.exit(1)
  }
  const { episode } = await loadScript(scriptPath)
  const timeline = TimelineSchema.parse(JSON.parse(await readFile(join(AUDIO_DIR, `${episode}.timeline.json`), 'utf-8')))
  const { title } = postText(timeline, issueNumber(episode, await loadTrackedEpisodes()))
  const { GITHUB_TOKEN: _, ...env } = process.env
  const repoUrl = (await promisify(execFile)('gh', ['repo', 'view', '--json', 'url', '-q', '.url'], { env })).stdout.trim()

  const { path, text, created } = await ensureShowNotes({ episode, title, timeline, repoUrl, force: args.includes('--force') })
  console.log(`${path.replace(process.cwd() + '/', '')}${created ? ' を作りました' : '（作成済み。作り直すなら --force）'}\n`)
  console.log(text)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
