---
title: "Vercel Flags is now generally available"
source: "https://vercel.com/changelog/vercel-flags-ga"
publishedDate: "2026-04-16"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

Apr 16, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F43jMcVHPkPF3Az5YAIWYe9%2Ff252d72f8b35cf9368cd8c2e86737e43%2Fflags-ga-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FtCLWbTWQqrUTQLuauPA7G%2Ffb10709ed51561c3d670af0e9c0da50c%2Fflags-ga-dark.png&w=1920&q=75)

[Vercel Flags](https://vercel.com/docs/flags/vercel-flags) is now generally available.

Vercel Flags is a feature flag provider built into the Vercel platform. Create and manage feature flags with targeting rules, user segments, and environment controls directly in the Vercel Dashboard.

The [Flags SDK](https://vercel.com/docs/flags/flags-sdk-reference) provides a framework-native way to define and use these flags within Next.js and SvelteKit applications, integrating directly with your existing codebase:

flags.ts

```
import { vercelAdapter } from "@flags-sdk/vercel"import { flag } from "flags/next"export const showNewFeature = flag({  key: "show-new-feature",  adapter: vercelAdapter()})
```

Once you define a flag, you can use them within your application in a few lines of code:

app/page.tsx

```
import { showNewFeature } from "~/flags"export default async function Page() {    const isEnabled = await showNewFeature()  return isEnabled ? <NewDashboard /> : <OldDashboard />}
```

For teams using other frameworks or custom backends, the Vercel Flags adapter supports the [OpenFeature](https://vercel.com/docs/flags/vercel-flags/sdks/openfeature) standard, allowing you to plug Vercel Flags into their provider agnostic SDK.

[Try it out](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fflags%2Factive) or learn more about [Vercel Flags](https://vercel.com/docs/flags/vercel-flags).