import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { coverHtml, paletteFor } from './podcast/cover'
import { AUDIO_DIR } from './podcast/index'
import { loadScript } from './podcast/store'

/** 台本の号のカバー画像（3000×3000 の JPEG）を podcasts/audio/ に書き出す。紙の粒感のノイズで PNG は 8MB 近くになるので JPEG にする */
async function main() {
  const scriptPath = process.argv[2]
  if (!scriptPath) {
    console.error('Usage: pnpm run podcast:cover <podcasts/scripts/xxx.json>')
    process.exit(1)
  }
  const { episode } = await loadScript(scriptPath)
  await mkdir(AUDIO_DIR, { recursive: true })
  const out = join(AUDIO_DIR, `${episode}.jpg`)

  const episodes = (await readdir('newsletters'))
    .filter((f) => /^\d{4}-\d{2}-\d{2}-\d{6}\.md$/.test(f))
    .map((f) => f.replace(/\.md$/, ''))
  const palette = paletteFor(episode, episodes)

  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({ viewport: { width: 3000, height: 3000 } })
    await page.setContent(coverHtml(episode, palette), { waitUntil: 'load' })
    await page.screenshot({ path: out, type: 'jpeg', quality: 92 })
  } finally {
    await browser.close()
  }
  console.log(`${out.replace(process.cwd() + '/', '')}  ${JSON.stringify(palette)}`)
}

main()
