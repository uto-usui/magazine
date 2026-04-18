---
title: "Streamdown 2.5 is now available"
source: "https://vercel.com/changelog/streamdown-2-5"
publishedDate: "2026-03-16"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

2 min read

Mar 16, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6dgaMl2ncIYQ3UbGpCusyG%2F5b6dc51053268509cb0d84610d1f9968%2Fstreamdown.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4cCHlHqMZZA7cKWrufoZ71%2F465e9cea4b58b5815f1ce65e731d33ea%2Fstreamdown_dark.png&w=1920&q=75)

Streamdown is a React component library that makes rendering streaming markdown content easy and beautiful. Built for AI-powered applications, it handles the unique challenges that arise when markdown is tokenized and streamed in real time.

v2.5 adds inline KaTeX support, staggered streaming animations, and a round of fixes for code blocks, CSV exports, and better Tailwind v3 compatibility.

**Streaming parser improvements**

The new `inlineKatex` option auto-completes `$formula` to `$formula$` during streaming, avoiding ambiguity with currency symbols, and the option defaults to `false`. Block KaTeX completion is also fixed when streaming produces a partial closing `$`.

Separately, single `~` between word characters (e.g. `20~25°C`) is now escaped to prevent false strikethrough rendering, controlled via a new `singleTilde` option that is enabled by default.

**Staggered streaming animations**

Streaming word and character animations now cascade sequentially rather than animating all at once. The timing is configurable via a new `stagger` option (default 40ms). Set `stagger: 0` to restore the previous behavior.

**Code blocks**

Custom renderers now receive the raw metastring from the code fence via a new optional `meta` prop, and the `lineNumbers` prop lets you disable line numbers.

Long lines now scroll horizontally instead of being clipped, completed blocks no longer re-render when new streaming content arrives, and unknown or truncated language identifiers fall back to plain text highlighting instead of throwing an error.

**Bug fixes**

`save()` now prepends a UTF-8 BOM for `text/csv` content, so Excel on Windows correctly detects encoding. Tailwind v4-only `*:last:` / `*:first:` syntax is replaced with arbitrary variant equivalents, fixing caret rendering in Tailwind CSS v3.

Read the [documentation](https://streamdown.ai/docs) to get started.