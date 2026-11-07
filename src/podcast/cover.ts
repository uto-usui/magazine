/**
 * 号ごとのカバー画像。活版ポスターのように、生成りの紙に黒1色で番組名を組み、
 * 罫線と等幅の小さな文字で号の情報を添える。飾りは入れず、文字だけで成立させる。
 */

export interface CoverInfo {
  /** 2026.11.06 */
  date: string
  /** 通し番号（何号目か） */
  issueNo: number
  /** 紹介した記事の本数 */
  articleCount: number
}

export interface CoverFonts {
  /** woff2 を base64 にしたもの。setContent したページからは file:// を読めないため埋め込む */
  leagueGothic: string
  spaceMonoBold: string
}

/** エピソード ID（2026-11-06-150018）から表示用の日付（2026.11.06） */
export function coverDate(episode: string): string {
  return episode.slice(0, 10).replaceAll('-', '.')
}

/** git で管理しているニュースレターのうち、何号目か。見つからなければ null */
export function issueNumber(episode: string, trackedEpisodes: string[]): number | null {
  const index = [...trackedEpisodes].sort().indexOf(episode)
  return index === -1 ? null : index + 1
}

const NAME = ['UX', 'ENGINEERING', 'MAGAZINE']

// 行ごとに枠の幅いっぱいに広げる（木活字のポスターの組み方）。
// UX だけは幅いっぱいにすると巨大になるので、ENGINEERING の行と同じ大きさにそろえる
const FIT_SCRIPT = `
(async () => {
  await document.fonts.ready
  const lines = [...document.querySelectorAll('.fit')]
  for (const el of lines) {
    el.style.fontSize = '100px'
    el.style.fontSize = (100 * el.parentElement.clientWidth / el.scrollWidth) + 'px'
  }
  lines[0].style.fontSize = lines[1].style.fontSize
  document.body.dataset.ready = '1'
})()`

export function coverHtml(info: CoverInfo, fonts: CoverFonts): string {
  const ink = '#1D1C1A'
  const paper = '#ECE7DA'
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"League Gothic";src:url(data:font/woff2;base64,${fonts.leagueGothic}) format("woff2")}
@font-face{font-family:"Space Mono";font-weight:700;src:url(data:font/woff2;base64,${fonts.spaceMonoBold}) format("woff2")}
html,body{margin:0}
body{width:3000px;height:3000px;box-sizing:border-box;padding:200px 220px;background:${paper};color:${ink};
  display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
.meta{font-family:"Space Mono",monospace;font-size:64px;font-weight:700;letter-spacing:.06em;display:flex;justify-content:space-between;
  border-top:14px solid currentColor;border-bottom:4px solid currentColor;padding:28px 0}
.meta.bottom{border-top:4px solid currentColor;border-bottom:14px solid currentColor}
.name{font-family:"League Gothic",sans-serif;filter:url(#press)}
.line{display:block;width:100%;line-height:.82;white-space:nowrap;margin:24px 0}
.fit{display:inline-block}
.grain{position:absolute;inset:0;opacity:.13;mix-blend-mode:multiply;pointer-events:none}
</style></head><body>
<svg width="0" height="0" style="position:absolute">
  <filter id="press"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
</svg>
<svg class="grain" width="3000" height="3000"><rect width="100%" height="100%" filter="url(#grain)"/></svg>
<div class="meta"><span>NO. ${info.issueNo}</span><span>${info.date}</span></div>
<div class="name">${NAME.map((w) => `<span class="line"><span class="fit">${w}</span></span>`).join('')}</div>
<div class="meta bottom"><span>JAPANESE AUDIO</span><span>${info.articleCount} ${info.articleCount === 1 ? 'ARTICLE' : 'ARTICLES'}</span></div>
<script>${FIT_SCRIPT}</script>
</body></html>`
}
