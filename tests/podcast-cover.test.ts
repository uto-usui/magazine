import { describe, it, expect } from 'vitest'
import { contrast, coverDate, coverHtml, looksDifferent, paletteFor, pickPalette } from '../src/podcast/cover'

const EPISODES = Array.from({ length: 60 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 0, 1 + i * 3))
  return `${d.toISOString().slice(0, 10)}-12${String(i % 60).padStart(2, '0')}00`
})

describe('contrast', () => {
  it('WCAG のコントラスト比を返す', () => {
    expect(contrast('#000000', '#FFFFFF')).toBeCloseTo(21)
    expect(contrast('#FFFFFF', '#FFFFFF')).toBeCloseTo(1)
  })
})

describe('pickPalette', () => {
  it('同じ号なら何度作っても同じ配色になる', () => {
    expect(pickPalette('2026-11-06-150018')).toEqual(pickPalette('2026-11-06-150018'))
  })

  it('どの号でも、文字は 4.5:1、棒は 3:1、棒と円は 2:1 以上の差がある', () => {
    for (const e of EPISODES) {
      const p = pickPalette(e)
      expect(contrast(p.text, p.background)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(p.accent, p.background)).toBeGreaterThanOrEqual(3)
      expect(contrast(p.accent, p.second)).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('paletteFor', () => {
  it('続いた号どうしは、違う色に見える背景になる', () => {
    const backgrounds = EPISODES.map((e) => paletteFor(e, EPISODES).background)
    for (let i = 1; i < backgrounds.length; i++) {
      expect(looksDifferent(backgrounds[i], backgrounds[i - 1])).toBe(true)
    }
  })

  it('あとの号が増えても、それより前の号の配色は変わらない', () => {
    const before = paletteFor(EPISODES[10], EPISODES.slice(0, 11))
    expect(paletteFor(EPISODES[10], EPISODES)).toEqual(before)
  })
})

describe('coverHtml', () => {
  it('号の日付と、選んだ配色が入る', () => {
    const p = pickPalette('2026-11-06-150018')
    const html = coverHtml('2026-11-06-150018', p)
    expect(coverDate('2026-11-06-150018')).toBe('2026/11/06')
    expect(html).toContain('2026/11/06')
    expect(html).toContain(p.background)
    expect(html).toContain('音声：日本語')
  })
})
