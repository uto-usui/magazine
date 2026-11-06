import { readFile } from 'node:fs/promises'
import { bannedWords, checkScript, findBanned, parseHighlights } from './podcast/check'
import { loadScript } from './podcast/store'

async function main() {
  const scriptPath = process.argv[2]
  if (!scriptPath) {
    console.error('Usage: pnpm run podcast:check <podcasts/scripts/xxx.json>')
    process.exit(1)
  }
  const script = await loadScript(scriptPath)
  const articles = parseHighlights(await readFile(script.newsletter, 'utf-8'))
  const findings = checkScript(script, articles)

  const articleSegments = script.segments.filter((s) => /^a\d+$/.test(s.id)).length
  if (articleSegments !== articles.length) {
    console.log(`記事のセグメントが ${articleSegments} 本、ハイライトの記事が ${articles.length} 本で、数が合いません`)
  }

  let flagged = 0
  for (const f of findings) {
    if (f.missingTech.length === 0 && f.missingNames.length === 0) continue
    flagged++
    console.log(`\n${f.segmentId} ${f.segmentTitle}（記事: ${f.article}）`)
    if (f.missingTech.length > 0) console.log(`  技術の名前が台本にない: ${f.missingTech.join(', ')}`)
    if (f.missingNames.length > 0) console.log(`  固有名が台本にない: ${f.missingNames.join(', ')}`)
  }
  console.log(`\n${findings.length} 本中 ${flagged} 本に、3行まとめの名前で台本に出てこないものがあります`)

  // 「版」が「出版」に当たるなど、別の語の一部に当たることもあるので、直すかどうかは読んで決める
  const banned = findBanned(script, bannedWords(await readFile('ai/docs/style-guide.md', 'utf-8')))
  const byLine = new Map<string, { segmentId: string; words: string[] }>()
  for (const b of banned) {
    const cur = byLine.get(b.text) ?? { segmentId: b.segmentId, words: [] }
    cur.words.push(b.word)
    byLine.set(b.text, cur)
  }
  if (byLine.size > 0) console.log('\nスタイルガイドの禁止語:')
  for (const [text, { segmentId, words }] of byLine) console.log(`  ${segmentId}「${words.join('」「')}」: ${text}`)
}

main()
