import 'dotenv/config'
import { jstDate, summarizeMonth, yen } from './podcast/budget'
import { generateEpisode } from './podcast/index'
import { notify } from './podcast/notify'
import { loadLedger, loadPodcastConfig, loadScript } from './podcast/store'

async function main() {
  const args = process.argv.slice(2)
  const scriptPath = args.find((a) => !a.startsWith('--'))
  if (!scriptPath) {
    console.error('Usage: pnpm run podcast <podcasts/scripts/xxx.json> [--dry-run] [--force]')
    process.exit(1)
  }
  const dryRun = args.includes('--dry-run')
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey && !dryRun) {
    console.error('GEMINI_API_KEY が設定されていません')
    process.exit(1)
  }

  const config = await loadPodcastConfig()
  const script = await loadScript(scriptPath)
  const result = await generateEpisode({ config, script, apiKey: apiKey ?? '', dryRun, force: args.includes('--force') })

  const today = jstDate(new Date())
  const month = summarizeMonth(config, await loadLedger(), today.slice(0, 7))
  const monthLine = `今月 ${yen(month.jpy)} / ${yen(config.budget.monthlyJpy)}（${Math.round(month.ratio * 100)}%）`

  switch (result.status) {
    case 'refused':
      for (const p of result.problems) console.error(`止めました: ${p}`)
      await notify('Podcast ⛔', `${script.episode}: ${result.problems[0]}`)
      process.exit(1)
    case 'dry-run':
      console.log(monthLine)
      process.exit(result.problems.length > 0 ? 1 : 0)
    case 'skipped':
      process.exit(0)
    case 'done': {
      const line = `${(result.audioSec / 60).toFixed(1)}分 ${yen(result.usd * config.budget.usdJpy)} / ${monthLine}`
      console.log(`\n${result.mp3.replace(process.cwd() + '/', '')}\n${line}`)
      const warn = month.ratio >= config.budget.warnRatio
      await notify(warn ? `Podcast ⚠️ 予算の${Math.round(config.budget.warnRatio * 100)}%超え` : 'Podcast 🎧', `${script.episode} ${line}`)
    }
  }
}

main().catch(async (error) => {
  console.error(error)
  await notify('Podcast ❌', String(error).slice(0, 200))
  process.exit(1)
})
