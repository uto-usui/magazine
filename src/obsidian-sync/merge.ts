// ソース記事と Obsidian 側の既存記事を合成する。
//
// 本文とソース由来の frontmatter キー（SOURCE_KEYS）はソースを正とし、
// それ以外の frontmatter キー（tags / summary / insights など）と
// 末尾の Related Articles 節は Obsidian 側を正として残す。
// 残すものを決め打ちすると、足したキーが同期のたびに消える（summary が 4,871 件消えた）。

/** ソースが書く frontmatter キー。ソースで増えたらここに足す（足さないと同期が止まる） */
export const SOURCE_KEYS = new Set([
  'title',
  'source',
  'publishedDate',
  'category',
  'feedName',
  'author',
  'fetchedBy',
])

interface Block {
  key: string
  text: string // キーの行から次のキーの直前まで（複数行の値を含む）
}

interface Parsed {
  blocks: Block[]
  body: string
}

const KEY_LINE = /^([A-Za-z_][\w-]*):/

function parse(content: string, label: string): Parsed {
  if (!content.startsWith('---\n')) throw new Error(`${label}: frontmatter がない`)
  let end = content.indexOf('\n---\n', 3)
  let bodyStart = end + 5
  if (end === -1 && content.endsWith('\n---')) {
    end = content.length - 4
    bodyStart = content.length
  }
  if (end === -1) throw new Error(`${label}: frontmatter が閉じていない`)

  const lines = content.slice(4, end).split('\n')
  const blocks: Block[] = []
  for (const line of lines) {
    const m = KEY_LINE.exec(line)
    if (m) blocks.push({ key: m[1], text: line })
    else if (blocks.length > 0) blocks[blocks.length - 1].text += `\n${line}`
    else throw new Error(`${label}: frontmatter の先頭がキーの行ではない`)
  }
  return { blocks, body: content.slice(bodyStart) }
}

const RELATED_HEADING = /^## Related Articles.*$/gm
// Obsidian 側の節は wikilink か enrich-articles の小見出しか ignite の目印で始まる。
// ソース本文にも「## Related Articles」はあるが（3 件）、行頭の `- [[` は出てこない
const VAULT_SECTION_LINE = /^(\s*[-*] \[\[|### (By Tag|By Author|My Notes)\b|<!-- ignite:auto:start)/

/** Obsidian 側で足した末尾の節の開始位置（直前の `---` 区切りを含む）。無ければ -1 */
export function findVaultTail(body: string): number {
  for (const m of body.matchAll(RELATED_HEADING)) {
    const following = body
      .slice(m.index + m[0].length)
      .split('\n')
      .filter((l) => l.trim() !== '')
      .slice(0, 3)
    if (!following.some((l) => VAULT_SECTION_LINE.test(l))) continue

    const sep = /\n---[ \t]*\n\s*$/.exec(body.slice(0, m.index))
    return sep ? sep.index + 1 : m.index
  }
  return -1
}

export function mergeArticle(src: string, dest: string, label = ''): string {
  const s = parse(src, `${label} (source)`)
  const d = parse(dest, `${label} (obsidian)`)

  const unknown = s.blocks.filter((b) => !SOURCE_KEYS.has(b.key)).map((b) => b.key)
  if (unknown.length > 0) {
    throw new Error(`${label}: SOURCE_KEYS に無いキーがソースにある: ${unknown.join(', ')}`)
  }
  if (findVaultTail(s.body) !== -1) {
    throw new Error(`${label}: ソース本文に Obsidian 側の Related Articles 節と同じ形がある`)
  }

  // Obsidian 側のキーの並びを保ち、ソースのキーだけ値を入れ替える
  const srcByKey = new Map(s.blocks.map((b) => [b.key, b]))
  const out: Block[] = []
  const emitted = new Set<string>()
  let afterLastSource = 0
  for (const b of d.blocks) {
    if (!SOURCE_KEYS.has(b.key)) {
      out.push(b)
      continue
    }
    const next = srcByKey.get(b.key)
    if (next && !emitted.has(b.key)) {
      out.push(next)
      emitted.add(b.key)
      afterLastSource = out.length
    }
  }
  out.splice(afterLastSource, 0, ...s.blocks.filter((b) => !emitted.has(b.key)))

  const tailStart = findVaultTail(d.body)
  const tail = tailStart === -1 ? '' : d.body.slice(tailStart)
  const body = tail ? `${s.body.replace(/\s+$/, '')}\n\n${tail}` : s.body
  const merged = `---\n${out.map((b) => b.text).join('\n')}\n---\n${body}`

  // Obsidian 側で足したものが 1 つでも欠けたら書かせない
  const kept = new Set(parse(merged, `${label} (merged)`).blocks.map((b) => b.text))
  const lost = d.blocks.filter((b) => !SOURCE_KEYS.has(b.key) && !kept.has(b.text))
  if (lost.length > 0) {
    throw new Error(`${label}: 合成で消えるキー: ${lost.map((b) => b.key).join(', ')}`)
  }
  if (tail && !merged.endsWith(tail)) {
    throw new Error(`${label}: 合成で末尾の Related Articles 節が変わる`)
  }
  return merged
}
