import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { loadFeedConfig } from './config/loader'
import { computeFeedQuality, renderReport, type ArticleRecord } from './quality/feed-quality'

const ROOT = process.cwd()

function frontmatterValue(text: string, key: string): string | null {
  const m = text.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'))
  return m ? m[1] : null
}

async function loadArticles(): Promise<ArticleRecord[]> {
  const dir = join(ROOT, 'articles')
  const days = (await readdir(dir)).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
  const records: ArticleRecord[] = []
  for (const day of days) {
    // 「停止」判定には最終取り込み日が要るので全期間を読むが、本文は先頭だけで足りる
    for (const file of (await readdir(join(dir, day))).filter((f) => f.endsWith('.md'))) {
      const head = (await readFile(join(dir, day, file), 'utf-8')).slice(0, 2000)
      const feedName = frontmatterValue(head, 'feedName')
      const source = frontmatterValue(head, 'source')
      if (!feedName || !source) continue
      records.push({ feedName, source, title: frontmatterValue(head, 'title') ?? '', fetchedOn: day })
    }
  }
  return records
}

async function collectLinks(dir: string, heading: RegExp): Promise<string[]> {
  const urls: string[] = []
  for (const file of (await readdir(dir)).filter((f) => f.endsWith('.md'))) {
    const text = await readFile(join(dir, file), 'utf-8')
    for (const line of text.split('\n')) {
      const m = line.match(heading)
      if (m) urls.push(m[1])
    }
  }
  return urls
}

async function main() {
  const windowArg = process.argv.find((a) => a.startsWith('--days='))
  const windowDays = windowArg ? Number(windowArg.split('=')[1]) : 60
  const today = new Date().toISOString().slice(0, 10)

  const config = await loadFeedConfig()
  const articles = await loadArticles()
  const highlightUrls = await collectLinks(join(ROOT, 'newsletters'), /^### \[.*\]\((https?:\/\/[^)\s]+)\)/)
  const pickupUrls = await collectLinks(join(ROOT, 'newsletters', 'pickup'), /^## \[.*\]\((https?:\/\/[^)\s]+)\)/)

  const rows = computeFeedQuality({
    feeds: config.feeds,
    articles,
    highlightUrls,
    pickupUrls,
    today,
    windowDays,
  })
  console.log(renderReport(rows, today, windowDays))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
