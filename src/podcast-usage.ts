import { jstDate, summarizeMonth, yen } from './podcast/budget'
import { loadLedger, loadPodcastConfig } from './podcast/store'

async function main() {
  const config = await loadPodcastConfig()
  const ledger = await loadLedger()
  const today = jstDate(new Date())
  const month = process.argv[2] ?? today.slice(0, 7)
  const s = summarizeMonth(config, ledger, month)

  console.log(`${month}  ${config.model}`)
  console.log(
    `使用額 ${yen(s.jpy)} / 予算 ${yen(config.budget.monthlyJpy)}（${Math.round(s.ratio * 100)}%）  $${s.usd.toFixed(3)}`
  )
  if (s.avgJpyPerEpisode !== null) {
    const a = s.avgJpyPerEpisode
    console.log(`1本平均 ${yen(a)}。月15本なら ${yen(a * 15)}、毎日なら ${yen(a * 30)}`)
  }
  // 作り直したセグメントも数えるので、MP3 の長さの合計より長くなることがある
  console.log(`${s.episodes}本 / 生成した音声 ${(s.audioSec / 60).toFixed(1)}分`)

  const byEpisode = new Map<string, { usd: number; sec: number }>()
  for (const e of ledger.entries.filter((e) => e.date.startsWith(month))) {
    const cur = byEpisode.get(e.episode) ?? { usd: 0, sec: 0 }
    byEpisode.set(e.episode, { usd: cur.usd + e.usd, sec: cur.sec + e.audioSec })
  }
  for (const [episode, v] of byEpisode) {
    console.log(`  ${episode}  ${(v.sec / 60).toFixed(1)}分  ${yen(v.usd * config.budget.usdJpy)}`)
  }
  if (s.ratio >= config.budget.warnRatio) console.log(`⚠️ 予算の${Math.round(config.budget.warnRatio * 100)}%を超えています`)
}

main()
