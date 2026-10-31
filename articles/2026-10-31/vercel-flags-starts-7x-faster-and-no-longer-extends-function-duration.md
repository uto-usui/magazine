---
title: "Vercel Flags starts 7x faster and no longer extends function duration"
source: "https://vercel.com/changelog/vercel-flags-starts-7x-faster-and-no-longer-extends-function-duration"
publishedDate: "2026-10-29"
category: "frontend"
feedName: "Vercel"
author: "Luis Meyer"
---

On Vercel, the [Vercel Flags](https://vercel.com/docs/flags/vercel-flags) SDK now initializes faster on cold starts, and usage reporting no longer keeps functions running after the response.

### [Copy link to heading](#faster-cold-starts)Faster cold starts

Two changes speed up SDK initialization on cold starts:

-   The SDK loads and parses the flags datafile bundled with your deployment as soon as the client is created, so it’s ready before your code evaluates its first flag.
    
-   Every function invocation now includes the current datafile revision, so the SDK can check whether the bundled datafile is up to date without a network request.
    

In internal testing, eliminating the network wait reduced p75 cold-start SDK initialization time from over 70 ms to 10 ms, roughly 7x faster.

After initialization, flag reads are effectively instant. Across cold and warm invocations, p99 flag-read latency is under 1 ms.

### [Copy link to heading](#usage-reporting-no-longer-extends-function-duration)Usage reporting no longer extends function duration

The SDK previously used [`waitUntil`](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#waituntil) for usage reporting, keeping functions running after the response was sent. It now passes usage events to the Vercel runtime, so reporting no longer adds to function duration.

Update `@flags-sdk/vercel` to version 1.5.3 or later and redeploy your application:

```
pnpm add @flags-sdk/vercel@latest
```

Learn more in the [Flags SDK documentation](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk).