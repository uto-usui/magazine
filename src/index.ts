import { join } from 'node:path'
import { loadFeedConfig } from './config/loader'
import { RssFetcher } from './rss/fetcher'
import { DiffDetector } from './rss/diff'
import { ContentExtractor } from './scraper/extractor'
import { MarkdownConverter } from './scraper/converter'
import { ImageDownloader } from './scraper/image-downloader'
import { ArticleWriter } from './storage/writer'
import { StateManager } from './storage/state'

const ROOT_DIR = process.cwd()
const ARTICLES_DIR = join(ROOT_DIR, 'articles')
const IMAGES_DIR = join(ROOT_DIR, 'images')
const STATE_DIR = join(ROOT_DIR, 'state')

async function main() {
  const fetchDate = new Date() // Use script execution timestamp for directory
  console.log('🚀 Starting RSS feed fetch...')

  // Load configuration
  const config = await loadFeedConfig()
  console.log(`📋 Loaded ${config.feeds.length} feeds`)

  // Initialize components
  const stateManager = new StateManager(STATE_DIR)
  await stateManager.load()

  const rssFetcher = new RssFetcher()
  const diffDetector = new DiffDetector(stateManager)
  const contentExtractor = new ContentExtractor()
  const markdownConverter = new MarkdownConverter()
  const imageDownloader = new ImageDownloader(IMAGES_DIR)
  const articleWriter = new ArticleWriter(ARTICLES_DIR)

  // Fetch all feeds
  console.log('📡 Fetching RSS feeds...')
  const allItems = await rssFetcher.fetchAllFeeds(config.feeds)
  console.log(`📰 Found ${allItems.length} total articles`)

  // Detect new and updated articles
  const { newArticles, updatedArticles } = diffDetector.detectChanges(allItems)
  console.log(`✨ New articles: ${newArticles.length}`)
  console.log(`⏭️ Skipped (already processed): ${updatedArticles.length}`)

  // Skip updated articles - only process new articles to reduce execution time
  const articlesToProcess = [...newArticles]

  if (articlesToProcess.length === 0) {
    console.log('✅ No new articles to process')
    await stateManager.save()
    return
  }

  // Process each article
  let successCount = 0
  let errorCount = 0

  for (const item of articlesToProcess) {
    try {
      console.log(`📥 Processing: ${item.title}`)

      // Extract content from URL
      const extracted = await contentExtractor.extractFromUrl(item.link)

      let article: string
      if (!extracted) {
        // Use RSS content as fallback
        if (item.content) {
          console.log(`⚠️ Using RSS content as fallback for: ${item.link}`)
          article = markdownConverter.createArticleFromRssContent(item)
        } else {
          console.log(`⚠️ Could not extract content and no RSS content available: ${item.link}`)
          errorCount++
          continue
        }
      } else {
        // Download images
        if (extracted.images.length > 0) {
          const slug = articleWriter.sanitizeTitle(item.title)
          await imageDownloader.downloadImages(extracted.images, slug)
        }

        // Convert to Markdown
        article = markdownConverter.createArticle(item, extracted)
      }

      // Write article (use fetchDate for directory, publishedDate is in frontmatter)
      const filePath = await articleWriter.writeArticle(
        article,
        item.title,
        fetchDate
      )
      console.log(`✅ Saved: ${filePath}`)

      // Mark as processed
      diffDetector.markAsProcessed(item)
      successCount++
    } catch (error) {
      console.error(`❌ Error processing ${item.title}: ${(error as Error).message}`)
      errorCount++
    }
  }

  // Save state
  await stateManager.save()

  console.log('\n📊 Summary:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log('🏁 Done!')
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
