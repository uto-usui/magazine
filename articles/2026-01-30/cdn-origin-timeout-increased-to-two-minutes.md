---
title: "CDN origin timeout increased to two minutes"
source: "https://vercel.com/changelog/cdn-origin-timeout-increased-to-two-minutes"
publishedDate: "2025-05-08"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

1 min read

May 8, 2025

Vercel’s CDN will now wait up to 120 seconds for your backend to start sending data, up from 30 seconds. This extended proxied request timeout is now available on all plans at no additional cost.

The [proxied request timeout](https://vercel.com/docs/limits#proxied-request-timeout) defines how long our CDN allows your [external backend](https://vercel.com/docs/rewrites) to respond before canceling the request. After the initial byte is received, your backend can take longer than two minutes to complete the request, as long as it continues sending data at least once every 120 seconds.

This update improves reliability for workloads with long processing times, such as LLM generation or complex data queries, and reduces the chance of 504 gateway timeouts.

This change is effective immediately, with no action or configuration required.