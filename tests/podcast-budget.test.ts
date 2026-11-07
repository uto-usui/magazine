import { describe, it, expect } from 'vitest'
import { costUsd, estimate, jstDate, preflight, priceOn, summarizeMonth } from '../src/podcast/budget'
import { PodcastConfigSchema, type Ledger, type LedgerEntry, type Script } from '../src/podcast/schema'
import { loadPodcastConfig } from '../src/podcast/store'

const config = PodcastConfigSchema.parse({
  model: 'tts-model',
  speakers: {
    A: { name: 'Aoi', voice: 'Kore' },
    B: { name: 'Ren', voice: 'Puck' },
  },
  budget: { monthlyJpy: 1000, usdJpy: 160, warnRatio: 0.8 },
  limits: { maxScriptChars: 5500, maxEpisodesPerDay: 2, estimateMargin: 1.3 },
  speech: { charsPerSecond: 6.1, audioTokensPerSecond: 25 },
  pricing: {
    model: 'tts-model',
    periods: [
      { from: '2026-01-01', inputPerM: 0.5, outputPerM: 6 },
      { from: '2027-01-01', inputPerM: 1, outputPerM: 12 },
    ],
  },
  video: { appUrl: 'https://example.com/talk-lab', style: 'flame', preset: 'x-landscape', bitrateMbps: 4, maxDurationSec: 7200, maxSizeMb: 8192 },
})

function scriptOf(chars: number, episode = '2026-11-06-150018'): Script {
  return {
    episode,
    newsletter: `newsletters/${episode}.md`,
    segments: [{ id: 'opening', title: 'オープニング', lines: [{ speaker: 'A', text: 'あ'.repeat(chars) }] }],
  }
}

function entry(partial: Partial<LedgerEntry>): LedgerEntry {
  return {
    at: '2026-11-06T06:00:00.000Z',
    date: '2026-11-06',
    episode: '2026-11-06-150018',
    segment: 'opening',
    model: 'tts-model',
    inputTokens: 0,
    outputTokens: 0,
    audioSec: 60,
    usd: 0,
    ...partial,
  }
}

const NOV_6_NOON_JST = new Date('2026-11-06T03:00:00Z')

describe('jstDate', () => {
  it('UTC の前日夜でも日本時間の日付を返す', () => {
    expect(jstDate(new Date('2026-11-30T15:30:00Z'))).toBe('2026-12-01')
  })
})

describe('priceOn / costUsd', () => {
  it('2026-12-31 までは旧料金、2027-01-01 からは新料金を使う', () => {
    expect(priceOn(config, '2026-12-31').outputPerM).toBe(6)
    expect(priceOn(config, '2027-01-01').outputPerM).toBe(12)
  })

  it('15分の音声（22,500 出力トークン）は 2026年中 $0.135、2027年から $0.27', () => {
    const tokens = { inputTokens: 0, outputTokens: 22_500 }
    expect(costUsd(config, '2026-11-06', tokens)).toBeCloseTo(0.135)
    expect(costUsd(config, '2027-01-15', tokens)).toBeCloseTo(0.27)
  })

  it('料金表より前の日付ではエラーにする', () => {
    expect(() => priceOn(config, '2025-12-31')).toThrow()
  })
})

describe('estimate', () => {
  it('上限の 5,500 字でも 1 本の見積もりは ¥100 を超えない（2027年料金）', () => {
    const est = estimate(config, '2027-01-15', 5500)
    expect(est.usd * config.budget.usdJpy).toBeLessThan(100)
  })
})

describe('summarizeMonth', () => {
  const ledger: Ledger = {
    entries: [
      entry({ date: '2026-10-31', usd: 1 }),
      entry({ date: '2026-11-01', usd: 0.5, episode: 'a' }),
      entry({ date: '2026-11-06', usd: 0.25, episode: 'b' }),
      entry({ date: '2026-11-06', usd: 0.25, episode: 'b', segment: 's2' }),
    ],
  }

  it('月が変わったら前月分を数えない', () => {
    const s = summarizeMonth(config, ledger, '2026-11')
    expect(s.usd).toBeCloseTo(1)
    expect(s.jpy).toBeCloseTo(160)
    expect(s.episodes).toBe(2)
  })

  it('1本あたりの平均額を、セグメントではなく回の数で割って出す', () => {
    expect(summarizeMonth(config, ledger, '2026-11').avgJpyPerEpisode).toBeCloseTo(80)
  })

  it('その月にまだ1本もなければ平均は出さない', () => {
    expect(summarizeMonth(config, ledger, '2026-12').avgJpyPerEpisode).toBeNull()
  })
})

describe('preflight', () => {
  it('ふつうの台本なら止めない', () => {
    expect(preflight({ config, ledger: { entries: [] }, script: scriptOf(5000), now: NOV_6_NOON_JST })).toEqual([])
  })

  it('台本が上限の字数を超えたら止める', () => {
    const problems = preflight({ config, ledger: { entries: [] }, script: scriptOf(5501), now: NOV_6_NOON_JST })
    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('5501')
  })

  it('同じ日にほかの回を上限まで作っていたら止める', () => {
    const ledger = { entries: [entry({ episode: 'x' }), entry({ episode: 'y' })] }
    expect(preflight({ config, ledger, script: scriptOf(100), now: NOV_6_NOON_JST })).toHaveLength(1)
  })

  it('同じ回の作り直し（途中から再開）は1日の本数に数えない', () => {
    const ledger = { entries: [entry({ episode: 'x' }), entry({ episode: '2026-11-06-150018' })] }
    expect(preflight({ config, ledger, script: scriptOf(100), now: NOV_6_NOON_JST })).toEqual([])
  })

  it('今月の使用額と見積もりの合計が予算を超えるなら止める', () => {
    const ledger = { entries: [entry({ date: '2026-11-01', episode: 'x', usd: 990 / 160 })] }
    const problems = preflight({ config, ledger, script: scriptOf(5000), now: NOV_6_NOON_JST })
    expect(problems.some((p) => p.includes('予算'))).toBe(true)
  })
})

describe('config/podcast.yml', () => {
  it('読み込めて、モデルと料金表のモデルがそろっている', async () => {
    const real = await loadPodcastConfig()
    expect(real.pricing.model).toBe(real.model)
  })

  it('モデルと料金表のモデルが違うとエラーにする', () => {
    expect(() =>
      PodcastConfigSchema.parse({ ...config, pricing: { ...config.pricing, model: 'other-model' } })
    ).toThrow()
  })
})
