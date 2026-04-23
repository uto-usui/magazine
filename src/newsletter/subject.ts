import { getISOWeek, getISOWeekYear } from 'date-fns'

export function resolvePickupSubject(filePath: string): string | undefined {
  const normalized = filePath.replace(/\\/g, '/')
  if (!normalized.includes('/pickup/')) return undefined

  const base = normalized.split('/').pop() ?? ''
  const match = base.match(/^(\d{4})-(\d{2})-(\d{2})/)
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date()

  const year = getISOWeekYear(date)
  const week = String(getISOWeek(date)).padStart(2, '0')
  return `UXエンジニアリング ${year} w${week} まとめ`
}
