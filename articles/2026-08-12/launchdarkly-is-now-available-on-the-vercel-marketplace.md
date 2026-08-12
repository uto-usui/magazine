---
title: "LaunchDarkly is now available on the Vercel Marketplace"
source: "https://vercel.com/changelog/launchdarkly-is-now-available-on-the-vercel-marketplace"
publishedDate: "2026-08-11"
category: "frontend"
feedName: "Vercel"
author: "Marc Brakken"
---

[LaunchDarkly](https://vercel.com/marketplace/launchdarkly) is now available on the [Vercel Marketplace](https://vercel.com/marketplace), allowing you to quickly get started with feature flags without additional setup. You can:

-   Sync flags into [Global Config](https://vercel.com/docs/global-config) and evaluate them locally
    
-   Target releases by user, attribute, or segment
    
-   Run experiments with metrics, and roll back with a kill switch
    
-   View and override flags from the Vercel Toolbar with the [Flags Explorer](https://vercel.com/docs/flags/flags-explorer)
    

To get started, run `vercel install launchdarkly`, add the `@flags-sdk/launchdarkly` adapter, and declare a flag with the [Flags SDK](https://flags-sdk.dev/):

flags.ts

```
import { flag } from "flags/next";import { ldAdapter, type LDContext } from "@flags-sdk/launchdarkly";export const exampleFlag = flag<boolean, LDContext>({  key: "example-flag",  identify: () => ({ key: "user-123" }),  adapter: ldAdapter.variation(),});
```

Feature flag declared with the LaunchDarkly adapter

Using a coding agent? Hand it this prompt:

Add [LaunchDarkly](https://vercel.com/marketplace/launchdarkly) from the Vercel Marketplace, or read the [adapter docs](https://flags-sdk.dev/providers/launchdarkly).