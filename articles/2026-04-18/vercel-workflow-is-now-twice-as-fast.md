---
title: "Vercel Workflow is now twice as fast"
source: "https://vercel.com/changelog/vercel-workflow-is-now-twice-as-fast"
publishedDate: "2026-03-03"
category: "frontend"
feedName: "Vercel"
author: "John Lindquist"
---

1 min read

Mar 3, 2026

Server-side performance for Vercel Workflow, the fully managed platform built on top of the open-source Workflow Development Kit (WDK), is now twice as fast, delivering a 54% median improvement across the board.

Over the last two weeks, the median API response time has been reduced from 37ms to 17ms, with queue latency, Time to First Byte (TTFB), and per-step overhead all reduced.

Workflows that coordinate multiple steps benefit the most, as lower overhead compounds across each step in a run.

```
npx workflow@latest
```

To get these and future speedups, update to the latest version of the Workflow DevKit (`workflow@4.1.0-beta.60` or newer) or view the [documentation](https://vercel.com/docs).