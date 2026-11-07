import { describe, it, expect } from 'vitest'
import type { Timeline } from '../src/podcast/schema'
import { articleSegments, buildClipUrl, estimateMb, exportTimeoutMs, planProblems, validateProbe } from '../src/podcast/video'

const VIDEO = { style: 'flame', preset: 'x-landscape', bitrateMbps: 4 }

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

describe('planProblems', () => {
  it('X の上限 140 秒を超えるセグメントを挙げる', () => {
    const long = { id: 'a04', title: '長い記事', start: 0, duration: 140.5 }
    expect(planProblems([...timeline.segments.slice(1, 3), long])).toEqual([expect.stringContaining('a04')])
    expect(planProblems([{ ...long, duration: 140 }])).toEqual([])
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
  const ok = {
    streams: [
      { codec_type: 'video', codec_name: 'h264' },
      { codec_type: 'audio', codec_name: 'aac' },
    ],
    format: { duration: '77.500000', size: String(40 * 1024 * 1024) },
  }

  it('h264 + aac で長さが合っていれば問題なし', () => {
    expect(validateProbe(ok, 77.48)).toEqual([])
  })

  it('コーデックが違えば挙げる', () => {
    const vp9 = { ...ok, streams: [{ codec_type: 'video', codec_name: 'vp9' }] }
    const problems = validateProbe(vp9, 77.48)
    expect(problems).toHaveLength(2)
    expect(problems[0]).toContain('vp9')
    expect(problems[1]).toContain('aac')
  })

  it('長さが 0.2 秒より大きくずれたら挙げる', () => {
    expect(validateProbe({ ...ok, format: { ...ok.format, duration: '77.65' } }, 77.48)).toEqual([])
    expect(validateProbe({ ...ok, format: { ...ok.format, duration: '77.30' } }, 77.48)).toEqual([])
    expect(validateProbe({ ...ok, format: { ...ok.format, duration: '77.75' } }, 77.48)).toEqual([expect.stringContaining('ずれ')])
    expect(validateProbe({ ...ok, format: { ...ok.format, duration: '77.20' } }, 77.48)).toEqual([expect.stringContaining('ずれ')])
  })

  it('140 秒・512 MB を超えたら挙げる', () => {
    const long = { ...ok, format: { duration: '141', size: String(600 * 1024 * 1024) } }
    const problems = validateProbe(long, 141)
    expect(problems).toEqual([expect.stringContaining('140'), expect.stringContaining('512')])
  })

  it('長さが読めなければ挙げる', () => {
    expect(validateProbe({ streams: ok.streams, format: {} }, 10)).toEqual(['長さを読めません'])
  })
})
