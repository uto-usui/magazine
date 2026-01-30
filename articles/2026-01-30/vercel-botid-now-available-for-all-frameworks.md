---
title: "Vercel BotID now  available for all frameworks"
source: "https://vercel.com/changelog/botid-now-available-for-all-frameworks"
publishedDate: "2025-07-22"
category: "frontend"
feedName: "Vercel"
author: "Elliott Johnson"
---

1 min read

Jul 22, 2025

You can now use Vercel BotID to protect your most sensitive endpoints in any JavaScript framework, like SvelteKit and Nuxt.

BotID is our [advanced bot protection](https://vercel.com/blog/introducing-botid) for high-value endpoints like registration, checkout, and AI interactions. Since launch, it has already protected nearly a million API requests.

Installing or upgrading to `botid@1.4.3` adds support for universal JavaScript environments with the new `initBotId({ protect: ... })` function.

Here's an example of `initBotId` used to set up BotID in SvelteKit:

src/hooks.client.ts

```
import { initBotId } from 'botid/client/core';export function init() {  initBotId({    protect: [      {        path: '/api/user',        method: 'POST',      },    ],  });}
```

Initializing BotID in a SvelteKit project

We recommend using `initBotId()` in `instrumentation-client.ts` for better performance in **Next.js v15.3+**. Earlier versions can continue using the React `<BotIdClient>` component approach.

Check out the [updated documentation](https://vercel.com/docs/botid) for setup instructions across all supported frameworks.