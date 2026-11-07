import { mkdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { coverDate, coverHtml, issueNumber } from './podcast/cover'
import { AUDIO_DIR } from './podcast/index'
import { loadScript, loadTrackedEpisodes } from './podcast/store'

const FONT_DIR = join(process.cwd(), 'assets', 'fonts')

/**
 * 台本の号のカバー画像（3000×3000 の JPEG）を podcasts/audio/ に書き出す。
 * 紙の粒感のノイズで PNG は 8MB 近くになるので JPEG にする
 */
async function main() {
  const scriptPath = process.argv[2]
  if (!scriptPath) {
    console.error('Usage: pnpm run podcast:cover <podcasts/scripts/xxx.json>')
    process.exit(1)
  }
  const script = await loadScript(scriptPath)

  const issueNo = issueNumber(script.episode, await loadTrackedEpisodes())
  if (issueNo === null) {
    console.error(`${script.episode} のニュースレターが git に入っていないので、通し番号を決められません`)
    process.exit(1)
  }

  const fonts = {
    leagueGothic: (await readFile(join(FONT_DIR, 'LeagueGothic-Regular.woff2'))).toString('base64'),
    spaceMonoBold: (await readFile(join(FONT_DIR, 'SpaceMono-Bold.woff2'))).toString('base64'),
  }
  const info = {
    date: coverDate(script.episode),
    issueNo,
    articleCount: script.segments.filter((s) => /^a\d+$/.test(s.id)).length,
  }

  await mkdir(AUDIO_DIR, { recursive: true })
  const out = join(AUDIO_DIR, `${script.episode}.jpg`)
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({ viewport: { width: 3000, height: 3000 } })
    await page.setContent(coverHtml(info, fonts), { waitUntil: 'load' })
    await page.waitForSelector('body[data-ready="1"]', { timeout: 30_000 })
    await page.screenshot({ path: out, type: 'jpeg', quality: 92 })
  } finally {
    await browser.close()
  }
  console.log(`${out.replace(process.cwd() + '/', '')}  ${JSON.stringify(info)}`)
}

main()
