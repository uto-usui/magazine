import { homedir } from 'node:os'
import { join } from 'node:path'

/** ここに置いた音声をミュージック（Music.app）が取り込み、アーティスト・アルバムのフォルダへ移す */
export const MUSIC_ADD_DIR =
  process.env.PODCAST_MUSIC_ADD ?? join(homedir(), 'Music/Music/Media.localized/Automatically Add to Music.localized')

export const SHOW_NAME = 'UXエンジニアリング・マガジン'

/**
 * ミュージックに入れるときの ID3 タグ。アルバムを番組 1 つにまとめ、トラック番号に通し番号を入れて号の順に並べる。
 * 曲名は桁が固定の日付から始め、「曲」一覧を名前順にしても年をまたいで号の順に並ぶようにする
 */
export function musicTags(episode: string, issueNo: number | null, releaseUrl?: string): Record<string, string> {
  const date = episode.slice(0, 10).replaceAll('-', '.')
  return {
    title: issueNo === null ? date : `${date} No.${issueNo}`,
    artist: SHOW_NAME,
    album_artist: SHOW_NAME,
    album: SHOW_NAME,
    genre: 'Podcast',
    date: episode.slice(0, 10),
    ...(issueNo === null ? {} : { track: String(issueNo) }),
    ...(releaseUrl ? { comment: releaseUrl } : {}),
  }
}

/** 手元の記録。同じ号を 2 回置くとミュージックに 2 曲できるので、置いた号を覚えておく */
export interface MusicRecord {
  [episode: string]: { title: string; added: string; flagged: string | null }
}

/** 置いたがまだフラグを付けていない号 */
export function pendingFlags(record: MusicRecord): string[] {
  return Object.keys(record).filter((e) => record[e].flagged === null)
}

/**
 * 取り込まれた曲に「再生位置を記憶」と「シャッフル時にスキップ」を付ける。引数は曲名とアルバムの組を並べたもの。
 * 1 曲に決まったものだけ書き換え、付けられた組の番号（1 始まり）をカンマ区切りで返す
 */
export const SET_FLAGS = `on run argv
  set done to {}
  tell application "Music"
    repeat with i from 1 to (count argv) by 2
      set ts to (every track of library playlist 1 whose name is (item i of argv) and album is (item (i + 1) of argv))
      if (count ts) is 1 then
        set t to item 1 of ts
        try
          set bookmarkable of t to true
          set shufflable of t to false
          set end of done to ((i + 1) div 2) as text
        end try
      end if
    end repeat
  end tell
  set AppleScript's text item delimiters to ","
  return done as text
end run`
