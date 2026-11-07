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

/**
 * 同じ名前で同じ中身のファイルがもう上がっていれば、上げ直さない（MP4 は 1 本 300MB を超える）。
 * 中身は GitHub が返す sha256 で比べる。大きさが同じでも、作り直した MP3 は上げ直す
 */
export function needsUpload(
  local: { name: string; sha256: string },
  assets: Array<{ name: string; digest?: string | null }>
): boolean {
  return !assets.some((a) => a.name === local.name && a.digest === `sha256:${local.sha256}`)
}

/** X に投稿する文。Show Notes の末尾に、MP3 と MP4 を置いた Release へのリンクを足す */
export function xPost(showNotes: string, releaseUrl: string): string {
  return `${showNotes.trimEnd()}\n音声（MP3）と動画（MP4）: ${releaseUrl}\n`
}
