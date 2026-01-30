---
title: "Tag-based cache invalidation now available for all responses"
source: "https://vercel.com/changelog/tag-based-cache-invalidation-now-available-for-all-responses"
publishedDate: "2026-01-28"
category: "frontend"
feedName: "Vercel"
author: "Luba Kravchenko"
---

1 min read

Jan 28, 2026

Vercel's CDN now supports tag-based cache invalidation, giving you granular control over cached content across all frameworks and backends.

Responses can now be tagged using the `Vercel-Cache-Tag` header with a comma-separated list of tags as a new cache organization mechanism to group related content and invalidate it together, rather than just purging your entire cache when content changes.

This complements existing headers that cache responses on Vercel's CDN, like `Cache-Control`, `CDN-Cache-Control`, and `Vercel-CDN-Cache-Control` and exposes the same underlying technology that powers Next.js Incremental Static Regeneration (ISR) to any framework or backend.

We recommend Next.js applications continue using [Incremental Static Regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration#differences-between-isr-and-cache-control-headers) for built-in cache tagging and invalidation without managing cache headers manually.

## [Link to heading](#how-it-works)How it works

After a response has a cache tag, you can invalidate it through [dashboard settings](https://vercel.com/docs/cdn-cache/purge#manually-purging-vercel-cdn-cache), the [Vercel CLI](https://vercel.com/docs/cli/cache), the [Function API](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#invalidatebytag), or the [REST API](https://vercel.com/docs/rest-api/reference/endpoints/edge-cache).

Vercel's CDN reads `Vercel-Cache-Tag` and strips it before sending the response to the client. If you apply cache tags via [rewrites](https://vercel.com/docs/rewrites) from a parent to a child [project](https://vercel.com/docs/projects), and both projects belong to the same [team](https://vercel.com/docs/accounts), cached responses on the parent project also include the corresponding tags from the child project.

This is available starting today on all plans at no additional cost. Read the [cache invalidation documentation](https://vercel.com/docs/cdn-cache/purge) to learn more.