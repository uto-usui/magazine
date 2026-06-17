---
title: "Vercel Sandbox can now run for up to 24 hours"
source: "https://vercel.com/changelog/vercel-sandbox-can-now-run-for-up-to-24-hours"
publishedDate: "2026-06-16"
category: "frontend"
feedName: "Vercel"
author: "Rob Herley"
---

Vercel Sandboxes can run uninterrupted sessions for up to 24 hours (up from 5 hours). This new max duration unlocks workloads that require longer runtimes, such as large-scale data processing, end-to-end testing pipelines, and long-lived agentic workflows.

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({  // 24 hours timeout    timeout: 24 * 60 * 60 * 1000,});
```

Pair with [persistent sandboxes](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes) to maintain durable state across extended runs.

The 24 hour max duration is available on all Pro and Enterprise plans. Learn more about limits in the [documentation](https://vercel.com/docs/sandbox/pricing).