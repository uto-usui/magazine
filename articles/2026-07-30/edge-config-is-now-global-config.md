---
title: "Edge Config is now Global Config"
source: "https://vercel.com/changelog/edge-config-is-now-global-config"
publishedDate: "2026-07-29"
category: "frontend"
feedName: "Vercel"
author: "Andy Schneider"
---

Edge Config is now [Global Config](https://vercel.com/docs/global-config). This rename better reflects that it is a globally replicated data store with ~1ms reads in every region, built for the configuration that applications read at runtime, such as feature flags, redirects, and experimentation settings.

Global Config stores can now hold up to 1 MB on every plan, and Pro and Enterprise teams can create unlimited stores with more writes per day. The rename also ships with a new server-side SDK, `@vercel/global-config`, and a new environment variable.

## [Copy link to heading](#what-changed)What changed

-   **Name:** Global Config is the new name for Edge Config. The store itself is unchanged.
    
-   **Package:** `@vercel/global-config` replaces `@vercel/edge-config` as a drop-in replacement.
    
-   **Environment variable:** Connecting a Global Config store to a project creates a `GLOBAL_CONFIG` environment variable instead of `EDGE_CONFIG`.
    
-   **Limits:** Raised on every plan. Pricing is unchanged.
    

## [Copy link to heading](#what-you-need-to-do)What you need to do

-   **Existing projects: no action required.** Deployments, connected stores, and the `EDGE_CONFIG` environment variable continue to work.
    
-   **Upgrading proactively is safe.** The new SDK reads `GLOBAL_CONFIG` by default and falls back to `EDGE_CONFIG`, so it works with stores connected before and after the rename. You can switch packages today without touching your stores.
    
-   **Creating stores and pushing new config values work without upgrading.** Neither depends on which SDK version your project uses.
    
-   **Upgrade before connecting new stores to a project.** Connecting a store now creates a `GLOBAL_CONFIG` environment variable, and the legacy SDK only reads `EDGE_CONFIG` by default. A project still on `@vercel/edge-config` cannot read a newly connected store.
    

To upgrade, install the new package and update imports:

```
pnpm add @vercel/global-config
```

Installing the drop-in replacement package

```
- import { get } from '@vercel/edge-config'+ import { get } from '@vercel/global-config'
```

Updating imports to the new package

## [Copy link to heading](#new-limits)New limits

**Limit**

**Hobby**

**Pro**

**Enterprise**

Stores

1 (unchanged)

Unlimited (was 3)

Unlimited (was 10)

Writes

250/month (unchanged)

100/hour (was 480/day)

100/hour (was 480/day)

Store size

1 MB (was 8 KB)

1 MB (was 64 KB)

1 MB (was 512 KB)

Pricing is unchanged at $3 per 1,000,000 reads and $1 per 100 writes.

See the [Global Config migration guide](https://vercel.com/docs/global-config/migration-guide) for custom setups and the full list of changes.