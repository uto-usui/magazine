import type { Timeline } from './schema'
import { articleSegments } from './video'

/** 号ごとの Release のタグ。スラッシュで区切るとダウンロードの URL が読みにくくなるのでハイフンにする */
export const TAG_PREFIX = 'podcast-'

export function releaseTag(episode: string): string {
  return `${TAG_PREFIX}${episode}`
}

/** タグの一覧から号の ID を取り出す。号の形をしていないタグは無視する */
export function episodesFromTags(tags: string[]): string[] {
  return tags
    .filter((t) => t.startsWith(TAG_PREFIX))
    .map((t) => t.slice(TAG_PREFIX.length))
    .filter((e) => /^\d{4}-\d{2}-\d{2}-\d{6}$/.test(e))
}

/**
 * この号を Latest にするか。gh は指定しないと作った日時で決めるので、古い号を後から作り直すと
 * その号が Latest になってしまう。ほかのどの号よりも新しいときだけ Latest にする
 */
export function shouldBeLatest(episode: string, existingEpisodes: string[]): boolean {
  return existingEpisodes.every((e) => e <= episode)
}

export function releaseNotes(opts: { title: string; timeline: Timeline; newsletterUrl: string }): string {
  const topics = articleSegments(opts.timeline).map((s) => `- ${s.title}`)
  return [`${opts.title}の音声版です。`, '', '話題:', ...topics, '', `ニュースレター: ${opts.newsletterUrl}`, ''].join('\n')
}

/** 同じ名前で同じ大きさのファイルがもう上がっていれば、上げ直さない（MP4 は 1 本 300MB を超える） */
export function needsUpload(local: { name: string; size: number }, assets: Array<{ name: string; size: number }>): boolean {
  return !assets.some((a) => a.name === local.name && a.size === local.size)
}
