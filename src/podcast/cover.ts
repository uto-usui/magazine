/**
 * 号ごとのカバー画像。リソグラフ印刷のインクに近い色から配色を選び、
 * ブルックリンのポスターのような、刷り重ねと版ずれのある見た目にする。
 * 配色は号の ID から決まるので、作り直しても同じになる。
 */

// リソグラフのインクの色（各社の色見本の近似値）
export const INKS: Record<string, string> = {
  black: '#1B1B1B',
  paper: '#F7F5EE',
  blue: '#0078BF',
  mediumBlue: '#3255A4',
  federalBlue: '#3D5588',
  aqua: '#5EC8E5',
  mint: '#82D8D5',
  teal: '#00838A',
  green: '#00A95C',
  hunterGreen: '#407060',
  yellow: '#FFE800',
  sunflower: '#FFB511',
  orange: '#FF6C2F',
  red: '#FF665E',
  brightRed: '#F15060',
  fluorescentPink: '#FF48B0',
  burgundy: '#914E72',
  purple: '#765BA7',
  flatGold: '#BB8B41',
}

export interface CoverPalette {
  background: string
  text: string
  /** 波形の棒 */
  accent: string
  /** 刷り重ねの円・網点・版ずれ */
  second: string
}

const TEXT_MIN_CONTRAST = 4.5
const ACCENT_MIN_CONTRAST = 3
const SECOND_MIN_CONTRAST = 1.6
// 棒は円や網点の上にも乗るので、その色とも見分けられるようにする
const ACCENT_SECOND_MIN_CONTRAST = 2

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function hue(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b)
  const d = max - Math.min(r, g, b)
  if (d === 0) return 0
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return (h * 60 + 360) % 360
}

/** 前の号の背景と並べて、違う色に見えるか（色合いか明るさのどちらかがはっきり違う） */
export function looksDifferent(a: string, b: string): boolean {
  const dh = Math.abs(hue(a) - hue(b))
  return Math.min(dh, 360 - dh) >= 45 || contrast(a, b) >= 1.6
}

/** WCAG のコントラスト比 */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** 文字列から決まる疑似乱数（mulberry32） */
export function seededRandom(seed: string): () => number {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  let a = h >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rand: () => number, items: T[]): T {
  return items[Math.floor(rand() * items.length)]
}

/**
 * コントラストの条件を満たす組み合わせの中から、号ごとに1つ選ぶ。
 * 続けて見たときに同じに見えないよう、前の号の背景色は避ける
 */
export function pickPalette(seed: string, avoidBackground?: string): CoverPalette {
  const rand = seededRandom(seed)
  const colors = Object.values(INKS)
  const backgrounds = colors.filter((c) => !avoidBackground || looksDifferent(c, avoidBackground))
  for (let attempt = 0; attempt < 500; attempt++) {
    const background = pick(rand, backgrounds)
    const texts = colors.filter((c) => contrast(c, background) >= TEXT_MIN_CONTRAST)
    const accents = colors.filter((c) => c !== background && contrast(c, background) >= ACCENT_MIN_CONTRAST)
    if (texts.length === 0 || accents.length === 0) continue
    const text = pick(rand, texts)
    const accent = pick(rand, accents.filter((c) => c !== text).length ? accents.filter((c) => c !== text) : accents)
    const seconds = colors.filter(
      (c) =>
        ![background, text, accent].includes(c) &&
        contrast(c, background) >= SECOND_MIN_CONTRAST &&
        contrast(c, accent) >= ACCENT_SECOND_MIN_CONTRAST
    )
    if (seconds.length === 0) continue
    return { background, text, accent, second: pick(rand, seconds) }
  }
  return { background: INKS.paper, text: INKS.black, accent: INKS.blue, second: INKS.fluorescentPink }
}

/** エピソード ID（2026-11-06-150018）から表示用の日付（2026/11/06） */
export function coverDate(episode: string): string {
  return episode.slice(0, 10).replaceAll('-', '/')
}

/**
 * 号を古い順にたどって配色を決める。前の号と同じ背景色を避けるので、
 * 前の号が実際に使った配色を知るには、最初の号から順に決めていく必要がある
 */
export function paletteFor(episode: string, allEpisodes: string[]): CoverPalette {
  const ordered = [...new Set([...allEpisodes, episode])].sort()
  let previous: CoverPalette | undefined
  for (const e of ordered) {
    const palette = pickPalette(e, previous?.background)
    if (e === episode) return palette
    previous = palette
  }
  return pickPalette(episode)
}

export function coverHtml(episode: string, p: CoverPalette = pickPalette(episode)): string {
  const rand = seededRandom(`${episode}:shape`)
  const bars = Array.from({ length: 40 }, (_, i) => {
    const h = 80 + (Math.sin(i / 2.7 + rand() * 0.6) * 0.5 + 0.5) * 300 + rand() * 140
    return `<i style="height:${Math.round(h)}px"></i>`
  }).join('')
  // 円の位置と大きさだけ号ごとに少し変える。文字のコントラストを背景色だけで保つため、
  // 円の上端は「音声：日本語」より下（y=2000 より下）に置く
  const circleSize = 1300 + Math.round(rand() * 500)
  const circleTop = 2000 + Math.round(rand() * 250)
  const circleRight = -400 + Math.round(rand() * 500)
  const circleBottom = 3000 - circleTop - circleSize

  return `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0}
body{width:3000px;height:3000px;box-sizing:border-box;padding:220px;background:${p.background};color:${p.text};
  font-family:"Avenir Next Condensed","Helvetica Neue",sans-serif;display:flex;flex-direction:column;justify-content:space-between;
  position:relative;overflow:hidden}
.circle{position:absolute;width:${circleSize}px;height:${circleSize}px;right:${circleRight}px;bottom:${circleBottom}px;
  border-radius:50%;background:${p.second}}
.dots{position:absolute;left:0;bottom:0;width:1300px;height:900px;
  background-image:radial-gradient(${p.second} 34%,transparent 36%);background-size:56px 56px}
.grain{position:absolute;inset:0;opacity:.16;mix-blend-mode:multiply}
.top,.head,.bars{position:relative}
.date{font-size:120px;font-weight:700;letter-spacing:.02em;font-variant-numeric:tabular-nums}
.head{display:flex;flex-direction:column;gap:70px;margin-top:-80px}
.title{font-weight:800;font-size:460px;line-height:.84;letter-spacing:-.005em;text-transform:uppercase;margin-left:-16px;white-space:nowrap}
.sub{font-family:"Hiragino Sans",sans-serif;font-size:130px;font-weight:700}
.bars{height:600px;display:flex;align-items:center;gap:26px}
.bars i{flex:1;display:block;background:${p.accent};border-radius:999px}
.bars.ghost{position:absolute;left:236px;right:204px;bottom:204px}
.bars.ghost i{background:${p.second}}
</style></head><body>
<div class="circle"></div>
<div class="dots"></div>
<svg class="grain" width="3000" height="3000"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div class="top date">${coverDate(episode)}</div>
<div class="head"><div class="title">UX<br>Engineering<br>Magazine</div><div class="sub">音声：日本語</div></div>
<div class="bars ghost">${bars}</div>
<div class="bars">${bars}</div>
</body></html>`
}
