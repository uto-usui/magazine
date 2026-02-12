---
title: "Vercel Flags is now in public beta"
source: "https://vercel.com/changelog/vercel-flags-is-now-in-public-beta"
publishedDate: "2026-02-11"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

Feb 11, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5abn6xeJnDvYGvzGSGtfeN%2F7ab6764f314dd2c16bd4e816efa2d60e%2FTop_Changelog.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F306z9q3uf1vlIDBWSA2mHF%2F6b2bde3e4b2f661e0de08e174062a0da%2FTop_Changelog-1.png&w=1920&q=75)

[Vercel Flags](https://vercel.com/docs/flags/vercel-flags) is a feature flag provider built into the Vercel platform. It lets you create and manage feature flags with targeting rules, user segments, and environment controls directly in the Vercel Dashboard.

The Flags SDK provides a framework-native way to define and use these flags within Next.js and SvelteKit applications, integrating directly with your existing codebase:

flags.ts

```
import { vercelAdapter } from "@flags-sdk/vercel"import { flag } from 'flags/next'; export const showNewFeature = flag({      key: 'show-new-feature',      decide: () => false,      description: 'Show the new dashboard redesign',    adapter: vercelAdapter()});
```

And you can use them within your pages like:

app/page.tsx

```
import { showNewFeature } from '~/flags'; export default async function Page() {      const isEnabled = await showNewFeature();    return isEnabled ? <NewDashboard /> : <OldDashboard />;}
```

For teams using other frameworks or custom backends, the Vercel Flags adapter supports the [OpenFeature](https://vercel.com/docs/flags/vercel-flags/sdks/openfeature) standard, allowing you to combine feature flags across various systems and maintain consistency in your flag management approach:

app.ts

```
import { OpenFeature } from '@openfeature/server-sdk';import { VercelProvider } from '@vercel/flags-core/openfeature';// Set up the provider and clientawait OpenFeature.setProviderAndWait(new VercelProvider());const client = OpenFeature.getClient();// Evaluate flagsconst enabled = await client.getBooleanValue('show-new-feature');
```

Vercel Flags is priced at $30 per 1 million [flag requests](https://vercel.com/docs/flags/vercel-flags/limits-and-pricing#flag-requests) ($0.00003 per event), where a flag request is any request to your application that reads the underlying flags configuration. A single request evaluating multiple feature flags of the same source project still counts as one flag request.

Vercel Flags is now in beta and available to teams on all plans.

[Learn more about Vercel Flags](https://vercel.com/docs/flags/vercel-flags) to get started with feature flag management.