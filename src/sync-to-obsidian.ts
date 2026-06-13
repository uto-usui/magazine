// Obsidian リポジトリへの記事同期（enrichment 保護版）。
//
// 旧実装は `rsync -av --delete` で Articles/ を丸ごとミラーしていたため、
// Obsidian 側で付与した enrichment（frontmatter の tags ブロック /
// 末尾の "## Related Articles" セクション）を毎回上書き削除していた。
//
// このスクリプトは「本文はソース（ux-eng-magazine）を権威、
// enrichment は宛先（Obsidian）を権威」としてマージする:
//   - 宛先に無い記事       → ソースをそのままコピー（新規追加）
//   - 宛先に既存の記事     → ソース本文 + 宛先 enrichment を合成し、差分があれば書き込み
//   - ソースに無い宛先記事 → 削除しない（additive。手動 enrichment を守る）
//
// 使い方: node --import tsx src/sync-to-obsidian.ts <dest-articles-dir>

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'

const SRC_DIR = join(process.cwd(), 'articles')
const DEST_DIR = process.argv[2]

if (!DEST_DIR) {
  console.error('Usage: node --import tsx src/sync-to-obsidian.ts <dest-articles-dir>')
  process.exit(1)
}

// --- 再帰的に .md を列挙 ---
function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

// --- enrichment パース（文字列ベースでフォーマットを厳密に保持） ---

interface Frontmatter {
  fm: string // 開き/閉じ --- を除いた内部（末尾改行込み）
  body: string // 閉じ --- の後
}

function splitFrontmatter(content: string): Frontmatter | null {
  if (!content.startsWith('---\n')) return null
  const end = content.indexOf('\n---\n', 4)
  if (end === -1) return null
  return { fm: content.slice(4, end + 1), body: content.slice(end + 5) }
}

function hasTags(content: string): boolean {
  const parts = splitFrontmatter(content)
  if (!parts) return false
  return /^tags:\s*$/m.test(parts.fm) || /^tags:\s*\[/m.test(parts.fm)
}

function extractTagsBlock(content: string): string | null {
  const parts = splitFrontmatter(content)
  if (!parts) return null
  const lines = parts.fm.split('\n')
  const out: string[] = []
  let inTags = false
  for (const line of lines) {
    if (/^tags:\s*$/.test(line)) {
      inTags = true
      out.push(line)
      continue
    }
    if (inTags) {
      if (/^\s+-\s/.test(line)) out.push(line)
      else break
    }
  }
  return out.length > 1 ? out.join('\n') : null
}

function hasRelated(content: string): boolean {
  return content.includes('## Related Articles')
}

// 最初の "## Related Articles" セクションのみ抽出（重複混入を防ぐ）
function extractRelatedSection(content: string): string | null {
  const first = content.indexOf('## Related Articles')
  if (first === -1) return null
  const second = content.indexOf('## Related Articles', first + 1)
  let section = second === -1 ? content.slice(first) : content.slice(first, second)
  // 2 つ目の直前にある --- 区切りを巻き込まないよう除去
  return section.replace(/\n+---\s*$/, '').replace(/\s+$/, '')
}

function insertTags(content: string, tagsBlock: string): string {
  const parts = splitFrontmatter(content)
  if (!parts) return content
  const fmLines = parts.fm.replace(/\n$/, '').split('\n')
  const srcIdx = fmLines.findIndex((l) => /^source:\s/.test(l))
  const insertAt = srcIdx === -1 ? fmLines.length : srcIdx + 1
  fmLines.splice(insertAt, 0, tagsBlock)
  return `---\n${fmLines.join('\n')}\n---\n${parts.body}`
}

function appendRelated(content: string, relatedSection: string): string {
  return `${content.replace(/\s+$/, '')}\n\n---\n\n${relatedSection}\n`
}

// ソース本文 + 宛先 enrichment を合成
function merge(srcContent: string, destContent: string): string {
  let result = srcContent
  if (!hasTags(result)) {
    const tags = extractTagsBlock(destContent)
    if (tags) result = insertTags(result, tags)
  }
  if (!hasRelated(result)) {
    const related = extractRelatedSection(destContent)
    if (related) result = appendRelated(result, related)
  }
  return result
}

// --- 同期 ---
let added = 0
let updated = 0
let preserved = 0
let unchanged = 0

for (const srcPath of walk(SRC_DIR)) {
  const rel = relative(SRC_DIR, srcPath)
  const destPath = join(DEST_DIR, rel)
  const srcContent = readFileSync(srcPath, 'utf8')

  if (!existsSync(destPath)) {
    mkdirSync(dirname(destPath), { recursive: true })
    writeFileSync(destPath, srcContent, 'utf8')
    added++
    continue
  }

  const destContent = readFileSync(destPath, 'utf8')
  const merged = merge(srcContent, destContent)

  if (merged === destContent) {
    unchanged++
  } else {
    writeFileSync(destPath, merged, 'utf8')
    if (hasTags(destContent) || hasRelated(destContent)) preserved++
    updated++
  }
}

console.log('📚 Sync to Obsidian (enrichment-preserving)')
console.log(`  新規追加: ${added}`)
console.log(`  更新: ${updated}（うち enrichment 保持: ${preserved}）`)
console.log(`  変更なし: ${unchanged}`)
