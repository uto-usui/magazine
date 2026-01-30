---
title: "Vercel Sandbox maximum duration extended to 5 hours"
source: "https://vercel.com/changelog/vercel-sandbox-maximum-duration-extended-to-5-hours"
publishedDate: "2025-09-10"
category: "frontend"
feedName: "Vercel"
author: "Laurens Duijvesteijn"
---

1 min read

Sep 10, 2025

[Pro and Enterprise teams](https://vercel.com/docs/plans) can now run Vercel Sandboxes for up to 5 hours (up from 45 minutes).

This new max duration unlocks workloads that require longer runtimes, such as large-scale data processing, end-to-end testing pipelines, and long-lived agentic workflows.

```
const sandbox = await Sandbox.create({  // 5 hours timeout    timeout: 5 * 60 * 60 * 1000,});
```

[Get started with Sandbox](https://vercel.com/docs/vercel-sandbox#getting-started) now and learn more in the [docs](https://vercel.com/docs/vercel-sandbox).