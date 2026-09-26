// Obsidian リポジトリへの記事同期。
//
// 本文とソース由来の frontmatter はソース（ux-eng-magazine）を正とし、
// Obsidian 側で足した frontmatter キーと末尾の Related Articles 節は残す（合成は obsidian-sync/merge.ts）。
//   - 宛先に無い記事       → ソースをそのままコピー（新規追加）
//   - 宛先に既存の記事     → 合成し、差分があれば書き込み
//   - ソースに無い宛先記事 → 削除しない（additive）
// 全件を先に合成し、1 件でも合成できなければ何も書かずに終了コード 1 で止める。
// 書いてから止めると、workflow が途中までの変更を commit / push しかねないため。
//
// 使い方: pnpm run sync-to-obsidian <dest-articles-dir> [--dry-run]

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { mergeArticle } from './obsidian-sync/merge'

const SRC_DIR = join(process.cwd(), 'articles')
const DEST_DIR = process.argv[2]
const DRY_RUN = process.argv.includes('--dry-run')

if (!DEST_DIR) {
  console.error('Usage: pnpm run sync-to-obsidian <dest-articles-dir> [--dry-run]')
  process.exit(1)
}

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

const writes: { path: string; content: string; isNew: boolean }[] = []
const errors: string[] = []
let unchanged = 0

for (const srcPath of walk(SRC_DIR)) {
  const rel = relative(SRC_DIR, srcPath)
  const destPath = join(DEST_DIR, rel)
  const srcContent = readFileSync(srcPath, 'utf8')

  if (!existsSync(destPath)) {
    writes.push({ path: destPath, content: srcContent, isNew: true })
    continue
  }

  const destContent = readFileSync(destPath, 'utf8')
  try {
    const merged = mergeArticle(srcContent, destContent, rel)
    if (merged === destContent) unchanged++
    else writes.push({ path: destPath, content: merged, isNew: false })
  } catch (e) {
    errors.push((e as Error).message)
  }
}

if (errors.length > 0) {
  console.error(`❌ ${errors.length} 件を合成できなかったので、何も書かずに止めます`)
  for (const message of errors) console.error(`  - ${message}`)
  process.exit(1)
}

if (!DRY_RUN) {
  for (const w of writes) {
    mkdirSync(dirname(w.path), { recursive: true })
    writeFileSync(w.path, w.content, 'utf8')
  }
}

const added = writes.filter((w) => w.isNew).length
console.log(`📚 Sync to Obsidian${DRY_RUN ? '（dry-run、書き込みなし）' : ''}`)
console.log(`  新規追加: ${added}`)
console.log(`  更新: ${writes.length - added}`)
console.log(`  変更なし: ${unchanged}`)
