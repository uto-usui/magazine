---
title: "Flags SDK 3.0"
source: "https://vercel.com/changelog/flags-sdk-3-0"
publishedDate: "2025-01-16"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

Jan 16, 2025

The [Flags SDK](https://flags-sdk.dev/) is a library that gives developers tools to use feature flags in Next.js and SvelteKit applications.

The Flags SDK version 3.0 adds:

-   Pages Router support so feature flags can be used in App Router and Pages Router
    
-   New adapters architecture that allows the SDK to integrate with various data sources and feature flag providers
    
-   A new `identify` concept that allows you to establish an evaluation context for your feature flags. With this addition, you can tailor flags and experiments for individual users or groups
    

```
import { flag } from 'flags/next';export const exampleFlag = flag({  key: 'example-flag',  decide() {    return false;  },});
```

Importing and evaluating flags using the Flags SDK.

With this release, [the repository](https://github.com/vercel/flags) is now open source and under the MIT License, providing more transparency and allowing for community contributions and integrations.

Check out the [new Flags SDK documentation](https://www.flags-sdk.dev/) with updated examples to learn more.