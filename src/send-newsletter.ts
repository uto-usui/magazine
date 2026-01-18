import { sendNewsletterFromFile } from './newsletter/index'

async function main() {
  const filePath = process.argv[2]

  if (!filePath) {
    console.error('Usage: pnpm tsx src/send-newsletter.ts <newsletter-file-path>')
    console.error('Example: pnpm tsx src/send-newsletter.ts newsletters/2026-01-18-120000.md')
    process.exit(1)
  }

  console.log(`Sending newsletter from: ${filePath}`)

  try {
    const result = await sendNewsletterFromFile(filePath)

    console.log('\n--- Send Result ---')
    console.log(`Success: ${result.success}`)
    console.log(`Sent: ${result.sentCount}`)
    console.log(`Failed: ${result.failedCount}`)

    if (result.errors.length > 0) {
      console.log('\nErrors:')
      for (const error of result.errors) {
        console.log(`  - ${error.email}: ${error.error}`)
      }
    }

    process.exit(result.success ? 0 : 1)
  } catch (error) {
    console.error('Failed to send newsletter:', error)
    process.exit(1)
  }
}

main()
