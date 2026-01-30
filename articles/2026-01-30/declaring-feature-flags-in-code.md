---
title: "Declaring feature flags in code"
source: "https://vercel.com/changelog/declaring-feature-flags-in-code"
publishedDate: "2024-05-23"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

May 23, 2024

We’re introducing a new approach for working with feature flags. This approach allows declaring feature flags in code and calling them as functions. Flags implemented using this pattern can automatically respect overrides set by the Vercel Toolbar, and integrate with our Developer Experience Platform features like Web Analytics and Runtime Logs.

```
import { unstable_flag as flag } from "@vercel/flags/next"const showSummerSale = flag({  key: "summer-sale",  decide: async () => false})
```

Declaring a feature flag

The pattern avoids common pitfalls of client-side feature flag and experimentation usage, such as flashing the wrong experiment, loading spinners, layout shift, and jank. It works with any feature flag provider and even custom setups.

```
export const showSummerSale = flag<boolean>({     key: 'summer-sale',      async decide() {           return getLaunchDarklyClient().variation(this.key, false);      },});
```

Using a feature flag

The pattern further allows for optionally precomputing certain feature flags in Middleware. Middleware can then route visitors to statically generated pages tailored to their specific combination of feature flags and experiments.

This even works when multiple flags are present on the page, which typically suffers from combinatory explosion. Precomputing is great for experimentation on marketing pages as it allows keeping them completely static with ultra-low TTFB, no layout shift, and no flashing of the wrong experiment.

We have implemented this new feature flags design pattern for Next.js in `@vercel/flags/next`, and we are releasing an implementation for SvelteKit soon.

[Check out our documentation](https://vercel.com/docs/workflow-collaboration/feature-flags/flags-pattern-nextjs) to learn more.