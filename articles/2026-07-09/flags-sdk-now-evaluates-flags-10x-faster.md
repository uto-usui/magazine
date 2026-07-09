---
title: "Flags SDK now evaluates flags 10x faster"
source: "https://vercel.com/changelog/flags-sdk-now-evaluates-flags-10x-faster"
publishedDate: "2026-07-08"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

[Flags SDK](https://flags-sdk.dev/) and [Vercel Flags](https://vercel.com/docs/flags/vercel-flags) now evaluate multiple feature flags in bulk around 10x faster.

Flag evaluation time improved by reducing microtask queue overhead and creating fewer promises. The improvement scales with the number of flags.

Use `await evaluate([flagA, flagB])` instead of `Promise.all([flagA(), flagB()])` to benefit from these optimizations:

app/page.tsx

```
import { evaluate } from 'flags/next';import { flagA, flagB } from '../flags';const [valueA, valueB] = await evaluate([flagA, flagB]);
```

Evaluate multiple flags in bulk using array destructuring.

You can also pass an object to evaluate flags with named keys

app/page.tsx

```
import { evaluate } from 'flags/next';import { flagA, flagB } from '../flags';const { a, b } = await evaluate({ a: flagA, b: flagB });
```

Evaluate multiple flags in bulk using object destructuring.

`precompute()` automatically benefits from these improvements as well.

Upgrade `flags` and `@flags-sdk/vercel` to the latest versions to get started. Learn more in the [documentation](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk).