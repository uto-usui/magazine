# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RSS Reader tool that fetches articles from 21 UX/Engineering blogs, converts them to Markdown, and saves locally. Runs daily via GitHub Actions.

## Commands

```bash
# Install dependencies
pnpm install

# Build TypeScript
pnpm run build

# Type check (no emit)
pnpm run type-check

# Run tests
pnpm test

# Run single test file
pnpm test src/rss/parser.test.ts

# Fetch RSS articles (planned)
pnpm run fetch-rss
```

## Architecture

```
src/
├── config/         # YAML config loader (feeds.yml, categories.yml)
├── rss/            # RSS fetch & parse (rss-parser), diff detection
├── scraper/        # Content extraction (@mozilla/readability),
│                   # HTML→Markdown (turndown), image download
├── storage/        # File writer (articles/YYYY-MM-DD/*.md),
│                   # state manager (state/processed.json)
└── utils/          # Logger, helpers
```

## Data Flow

1. Load config from `config/feeds.yml` (21 RSS URLs)
2. Fetch RSS feeds → extract new/updated articles
3. Scrape full article content with Readability
4. Convert to Markdown with Frontmatter
5. Save to `articles/YYYY-MM-DD/<title>.md`
6. Update `state/processed.json` for deduplication

## Key Libraries

- **rss-parser**: RSS/Atom feed parsing
- **@mozilla/readability + jsdom**: Article content extraction
- **turndown**: HTML to Markdown conversion
- **zod**: Config schema validation
- **js-yaml**: YAML config parsing

## Article Format

```markdown
---
title: Article Title
source: Feed Name
publishedDate: 2026-01-08
category: Engineering
author: Author Name
---

Content in Markdown
```

## Notes

- 404 errors: Skip article
- Partial content: Include URL for manual access
- Images: Download to `images/` when possible
- Duplicates: Keep newer version, update if diff exists
