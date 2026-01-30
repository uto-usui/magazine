---
title: "Dynamically extend timeout of an active Sandbox"
source: "https://vercel.com/changelog/dynamically-extend-timeout-of-an-active-sandbox"
publishedDate: "2025-10-21"
category: "frontend"
feedName: "Vercel"
author: "Laurens Duijvesteijn"
---

1 min read

Oct 21, 2025

You can now extend the duration of a running Vercel Sandbox using the new `extendTimeout` method.

This lets long-running sandboxes stay active beyond their initial timeout, making it easier to support workflows like chained agentic tasks or multi-step code generation that take longer than expected.

```
const sandbox = await Sandbox.create({  // 15 minute timeout  timeout: 15 * 60 * 1000,});// Extend by 10 minutesawait sandbox.extendTimeout(10 * 60 * 1000);
```

You can extend the timeout multiple times until the [maximum runtime for your plan](https://vercel.com/docs/vercel-sandbox/pricing#maximum-runtime-duration) is reached.

Pro and Enterprise plans support up to 5 hours, with the Hobby plan supporting up to 45 minutes.

[Get started with Sandbox now](https://vercel.com/docs/vercel-sandbox#getting-started) and [learn more in the docs](https://vercel.com/docs/vercel-sandbox/pricing).