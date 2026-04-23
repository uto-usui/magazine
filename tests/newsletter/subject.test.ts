import { describe, it, expect } from 'vitest'
import { resolvePickupSubject } from '../../src/newsletter/subject'

describe('resolvePickupSubject', () => {
  it('returns undefined for regular newsletter path', () => {
    expect(resolvePickupSubject('newsletters/2026-04-19-210000.md')).toBeUndefined()
  })

  it('returns ISO-week subject for pickup path', () => {
    expect(resolvePickupSubject('newsletters/pickup/2026-04-19-210000.md')).toBe(
      'UXエンジニアリング 2026 w16 まとめ'
    )
  })

  it('handles single-digit ISO week with zero padding', () => {
    expect(resolvePickupSubject('newsletters/pickup/2026-01-05-090000.md')).toBe(
      'UXエンジニアリング 2026 w02 まとめ'
    )
  })

  it('uses ISO week year (crosses year boundary)', () => {
    expect(resolvePickupSubject('newsletters/pickup/2024-12-30-090000.md')).toBe(
      'UXエンジニアリング 2025 w01 まとめ'
    )
  })

  it('normalizes backslashes in paths', () => {
    expect(resolvePickupSubject('newsletters\\pickup\\2026-04-19-210000.md')).toBe(
      'UXエンジニアリング 2026 w16 まとめ'
    )
  })
})
