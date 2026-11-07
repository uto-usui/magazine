import { describe, it, expect } from 'vitest'
import type { Timeline } from '../src/podcast/schema'
import { articleSegments, buildClipUrl, clipAction, estimateMb, exportTimeoutMs, fullSegment, planProblems, postText, selectTargets, validateProbe } from '../src/podcast/video'

const VIDEO = { style: 'flame', preset: 'x-landscape', bitrateMbps: 4 }
// 通常アカウントの上限。テストでは境界を見やすい小さい値を使う
const LIMITS = { maxDurationSec: 140, maxSizeMb: 512 }

const timeline: Timeline = {
  episode: '2026-11-06-150018',
  segments: [
    { id: 'opening', title: 'オープニング', start: 0, duration: 19.08 },
    { id: 'a01', title: '古い DESIGN.md と AI', start: 19.88, duration: 77.48 },
    { id: 'a02', title: 'AI チャットのアクセシビリティ', start: 98.16, duration: 80.2 },
    { id: 'a03', title: 'AI エージェントの止めどころ', start: 179.16, duration: 68.72 },
    { id: 'ending', title: 'エンディング', start: 248.68, duration: 14.68 },
  ],
}

describe('buildClipUrl', () => {
  it('スタイル・プリセット・開始位置・長さ・ビットレートをクエリにする', () => {
    const url = new URL(buildClipUrl('https://example.com/talk-lab', VIDEO, { start: 19.88, duration: 77.48 }))
    expect(url.origin + url.pathname).toBe('https://example.com/talk-lab')
    expect(Object.fromEntries(url.searchParams)).toEqual({
      style: 'flame',
      preset: 'x-landscape',
      start: '19.88',
      len: '77.48',
      bitrate: '4',
    })
  })

  it('appUrl にクエリがあっても残し、同じキーは上書きする', () => {
    const url = new URL(buildClipUrl('http://127.0.0.1:4323/talk-lab?debug=1&style=old', VIDEO, { start: 0, duration: 10 }))
    expect(url.searchParams.get('debug')).toBe('1')
    expect(url.searchParams.getAll('style')).toEqual(['flame'])
  })
})

describe('articleSegments', () => {
  it('オープニングとエンディングを除いた記事のセグメントだけを返す', () => {
    expect(articleSegments(timeline).map((s) => s.id)).toEqual(['a01', 'a02', 'a03'])
  })

  it('only で絞れる', () => {
    expect(articleSegments(timeline, ['a03', 'a01']).map((s) => s.id)).toEqual(['a01', 'a03'])
  })

  it('タイムラインにない id はエラーにする', () => {
    expect(() => articleSegments(timeline, ['a09'])).toThrow('a09')
    expect(() => articleSegments(timeline, ['opening'])).toThrow('opening')
  })
})

describe('fullSegment / selectTargets', () => {
  it('全編は 0 秒からタイムラインの最後の終わりまで', () => {
    expect(fullSegment(timeline)).toEqual({ id: 'full', title: '全編', start: 0, duration: 248.68 + 14.68 })
  })

  it('既定は全編の1本だけ', () => {
    expect(selectTargets(timeline, {}).map((s) => s.id)).toEqual(['full'])
  })

  it('clips なら全編と記事ごと', () => {
    expect(selectTargets(timeline, { clips: true }).map((s) => s.id)).toEqual(['full', 'a01', 'a02', 'a03'])
  })

  it('only で full や記事を選べる', () => {
    expect(selectTargets(timeline, { only: ['a02'] }).map((s) => s.id)).toEqual(['a02'])
    expect(selectTargets(timeline, { only: ['full', 'a01'] }).map((s) => s.id)).toEqual(['full', 'a01'])
    expect(() => selectTargets(timeline, { only: ['a09'] })).toThrow('a09')
  })

  it('only が full だけなら記事のクリップは作らない（重ねて書いても1本）', () => {
    expect(selectTargets(timeline, { only: ['full'] }).map((s) => s.id)).toEqual(['full'])
    expect(selectTargets(timeline, { only: ['full', 'full'] }).map((s) => s.id)).toEqual(['full'])
  })

  it('記事のない号で clips を付けても全編は作る', () => {
    const noArticles = { ...timeline, segments: timeline.segments.filter((s) => !/^a\d+$/.test(s.id)) }
    expect(selectTargets(noArticles, { clips: true }).map((s) => s.id)).toEqual(['full'])
  })

  it('セグメントのないタイムラインはエラーにする', () => {
    expect(() => fullSegment({ ...timeline, segments: [] })).toThrow('全編の長さ')
  })
})

describe('planProblems', () => {
  it('上限の秒数を超えるセグメントを挙げる', () => {
    const long = { id: 'a04', title: '長い記事', start: 0, duration: 140.5 }
    expect(planProblems([...timeline.segments.slice(1, 3), long], LIMITS)).toEqual([expect.stringContaining('a04')])
    expect(planProblems([{ ...long, duration: 140 }], LIMITS)).toEqual([])
  })

  it('Premium の上限なら全編も通る', () => {
    expect(planProblems([{ id: 'full', title: '全編', start: 0, duration: 631.04 }], { maxDurationSec: 7200, maxSizeMb: 8192 })).toEqual([])
  })
})

describe('estimateMb', () => {
  it('ビットレートと長さから MB を出す', () => {
    expect(estimateMb(80, 4)).toBe(40)
  })
})

describe('exportTimeoutMs', () => {
  it('短いものでも 2 分は待ち、長いものは長さの 4 倍待つ', () => {
    expect(exportTimeoutMs(10)).toBe(120_000)
    expect(exportTimeoutMs(77.48)).toBe(309_920)
  })
})

describe('validateProbe', () => {
  // 実際に talk-lab で書き出した a05（タイムラインでは 53.48 秒）の ffprobe の値
  const ok = {
    streams: [
      { codec_type: 'video', codec_name: 'h264', duration: '53.466667' },
      { codec_type: 'audio', codec_name: 'aac', duration: '53.546667' },
    ],
    format: { duration: '53.546667', size: '27666965' },
  }
  const withDurations = (video: string, audio: string) => ({
    ...ok,
    streams: [
      { ...ok.streams[0], duration: video },
      { ...ok.streams[1], duration: audio },
    ],
  })

  it('実際の書き出し（AAC が 0.07 秒ほど長い）は問題なし', () => {
    expect(validateProbe(ok, 53.48, LIMITS)).toEqual([])
  })

  it('コーデックが違えば挙げる', () => {
    const vp9 = { ...ok, streams: [{ codec_type: 'video', codec_name: 'vp9', duration: '53.48' }] }
    const problems = validateProbe(vp9, 53.48, LIMITS)
    expect(problems).toHaveLength(2)
    expect(problems[0]).toContain('vp9')
    expect(problems[1]).toContain('aac')
  })

  it('映像と音声の長さを、それぞれタイムラインと比べる', () => {
    expect(validateProbe(withDurations('53.65', '53.30'), 53.48, LIMITS)).toEqual([])
    expect(validateProbe(withDurations('53.75', '53.48'), 53.48, LIMITS)).toEqual([expect.stringContaining('映像の長さ')])
    expect(validateProbe(withDurations('53.48', '53.20'), 53.48, LIMITS)).toEqual([expect.stringContaining('音声の長さ')])
  })

  it('映像だけ途中で切れていれば、全体の長さが合っていても挙げる', () => {
    expect(validateProbe(withDurations('1.0', '77.5'), 77.48, LIMITS)).toEqual([expect.stringContaining('映像の長さが 1.00 秒')])
  })

  it('上限の秒数・MB を超えたら挙げる', () => {
    const long = { ...withDurations('141', '141'), format: { duration: '141', size: String(600 * 1024 * 1024) } }
    expect(validateProbe(long, 141, LIMITS)).toEqual([expect.stringContaining('140'), expect.stringContaining('512')])
  })

  it('ストリームの長さが読めなければ挙げる', () => {
    expect(validateProbe(withDurations('N/A', '53.5'), 53.48, LIMITS)).toEqual(['映像の長さを読めません'])
  })
})

describe('clipAction', () => {
  const sourcesMtimeMs = [1_000, 2_000]
  const fresh = { mtimeMs: 3_000, problems: [] }

  it('MP3 とタイムラインより新しく、条件を満たす MP4 は使い回す', () => {
    expect(clipAction({ forced: false, clip: fresh, sourcesMtimeMs })).toBe('reuse')
  })

  it('MP4 がなければ作る', () => {
    expect(clipAction({ forced: false, clip: null, sourcesMtimeMs })).toBe('missing')
  })

  it('MP3 かタイムラインのほうが新しければ作り直す', () => {
    expect(clipAction({ forced: false, clip: fresh, sourcesMtimeMs: [4_000, 2_000] })).toBe('stale')
    expect(clipAction({ forced: false, clip: fresh, sourcesMtimeMs: [1_000, 3_000] })).toBe('stale')
  })

  it('条件を満たさない MP4 は作り直す', () => {
    expect(clipAction({ forced: false, clip: { mtimeMs: 3_000, problems: ['x'] }, sourcesMtimeMs })).toBe('invalid')
  })

  it('--force や --only で指定したものは、新しくても作り直す', () => {
    expect(clipAction({ forced: true, clip: fresh, sourcesMtimeMs })).toBe('forced')
  })
})

describe('postText', () => {
  it('番組名・何月何日号・通し番号と、記事の題の一覧', () => {
    expect(postText(timeline, 151)).toEqual({
      title: 'UXエンジニアリング・マガジン 11月6日号（No.151）',
      topics: '古い DESIGN.md と AI ／ AI チャットのアクセシビリティ ／ AI エージェントの止めどころ',
    })
  })

  it('通し番号が決まらなければ付けない', () => {
    expect(postText(timeline, null).title).toBe('UXエンジニアリング・マガジン 11月6日号')
  })
})
