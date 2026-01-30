---
title: "Flags SDK 3.2"
source: "https://vercel.com/changelog/flags-sdk-3-2"
publishedDate: "2025-03-31"
category: "frontend"
feedName: "Vercel"
author: "Simon Holthausen"
---

1 min read

Mar 31, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fc0UsoMP9ss0noJpYSikeD%2F9afdae6861714608b2a05463436b16b9%2FFlags___SvelteKit_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Kba9ODBIA6Yz3yc4lR3mQ%2F56e3d60d10dc1b23b29611ddd51370b4%2FFlags___SvelteKit_-_Dark__1_.png&w=1920&q=75)

The [Flags SDK](https://flags-sdk.dev/) 3.2 release adds support for [precomputed feature flags](https://flags-sdk.dev/frameworks/sveltekit/precompute) in [SvelteKit](https://svelte.dev/docs/kit), making it easier to experiment on marketing pages while keeping them fast and avoiding layout shift.

![Edge Middleware decides which variant of a page to show](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fe5aEZgqekBL6MCor1RHyq%2Fca1be7feecc0eac57ec70ba5c886b2c4%2Flight.png&w=1920&q=75)![Edge Middleware decides which variant of a page to show](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2L6jByjuAOlim5fs6vQmZJ%2Fabd450c964033bac45d617720c8d7f70%2Fdark.png&w=1920&q=75)

Edge Middleware decides which variant of a page to show

Precomputed flags evaluate in Edge Middleware to decide which variant of a page to show. This keeps pages static, resulting in low global latency as static variants can be served through the Edge Network.

Precompute handles the combinatory explosion when using multiple feature flags statically. Generate different variants of a page at build time, rely on [Incremental Static Regeneration](https://vercel.com/docs/incremental-static-regeneration) to only build a specific combinations on demand, and more.

We also improved the [Flags SDK documentation](https://flags-sdk.dev/docs) by splitting it across different frameworks and explicitly listing all providers that have adapters for the Flags SDK.

Learn more about the [Flags SDK with SvelteKit](https://flags-sdk.dev/frameworks/sveltekit) and the [precompute pattern](https://flags-sdk.dev/principles/precompute).