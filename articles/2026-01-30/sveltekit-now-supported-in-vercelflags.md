---
title: "SvelteKit now supported in @vercel/flags"
source: "https://vercel.com/changelog/sveltekit-now-supported-in-vercel-flags"
publishedDate: "2024-07-03"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

Jul 3, 2024

Vercel is extending its [newly introduced](https://vercel.com/changelog/declaring-feature-flags-in-code) approach to working with feature flags to SvelteKit, with the v2.6.0 release of `@vercel/flags`.

With `@vercel/flags/sveltekit` you can now implement feature flags in your SvelteKit application code and call them within functions. Using this pattern automatically respects overrides set by the Vercel Toolbar, and [integrates with our Developer Experience Platform](https://vercel.com/docs/workflow-collaboration/feature-flags/integrate-vercel-platform) features like Web Analytics and Runtime Logs.

```
import { flag } from '@vercel/flags/sveltekit'export const showDashboard = flag<boolean>({  key: 'dashboard',  async decide () {    // your feature flag logic    return true  }})
```

Learn more about Vercel feature flags with SvelteKit [in our documentation](https://vercel.com/docs/workflow-collaboration/feature-flags/flags-pattern-sveltekit) and deploy your own [SvelteKit app with feature flags here](https://vercel.com/templates/svelte/toolbar-feature-flags-sveltekit).