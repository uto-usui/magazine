---
title: "PostHog joins the Vercel Marketplace"
source: "https://vercel.com/changelog/posthog-joins-the-vercel-marketplace"
publishedDate: "2026-02-10"
category: "frontend"
feedName: "Vercel"
author: "Marketplace Team"
---

1 min read

Feb 10, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3BgaBfPu8ES9lXXCnYrxKF%2F0dee638331339e9f8332e13fa7802d5c%2FPostHog-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2EYlN3ymLif35T2hetiLOE%2F2db6387499677eea664b799926a1b4dc%2FPostHog-dark.png&w=1920&q=75)

[PostHog](https://vercel.com/marketplace/posthog) is now available in the [Vercel Marketplace](https://vercel.com/marketplace) as a feature flags, experimentation and Analytics provider.

With this integration, you can now:

-   Declare flags in code using [Flags SDK](https://flags-sdk.dev/) and the [@flags-sdk/posthog](https://flags-sdk.dev/providers/posthog) adapter
    
-   Toggle features in real time for specific users or cohorts
    
-   Roll out changes gradually using percentage-based rollouts
    
-   Run A/B tests to validate impact before a full release
    

This integration helps teams building on Vercel ship with more confidence. You can test in production, reduce release risk, and make data-driven decisions based on real user behavior, all within your existing Vercel workflows.

Create a `flags.ts` file with an identify function and a flag check:

flags.ts

```
import { postHogAdapter } from '@flags-sdk/posthog'import { flag, dedupe } from 'flags/next'import type { Identify } from 'flags'export const identify = dedupe(async () => ({  distinctId: 'user_distinct_id'  // replace with real user ID})) satisfies Identify<{ distinctId: string }>export const myFlag = flag({  key: 'my-flag',  adapter: postHogAdapter.isFeatureEnabled(),  identify,})
```

Create a flags.ts file with a simple identify function and a function to check your flag

Check out the [Posthog template](https://vercel.com/templates/edge-middleware/posthog-with-flags-sdk-and-next-js) to learn more about this integration.