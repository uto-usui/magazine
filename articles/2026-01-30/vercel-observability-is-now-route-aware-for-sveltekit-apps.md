---
title: "Vercel Observability is now route-aware for SvelteKit apps"
source: "https://vercel.com/changelog/vercel-observability-is-now-route-aware-for-sveltekit-apps"
publishedDate: "2025-04-14"
category: "frontend"
feedName: "Vercel"
author: "Tobias Lins"
---

1 min read

Apr 14, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4dQUV6JRad9nhdMgkFYXWN%2Fc73b24102a7ed00d50b558477f6aee3d%2FSvelteKit_Route_Support_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FvguNwbb89IZ099rn431Z9%2F6fa58bdba8faf80d79c8f17fcd58c79b%2FSvelteKit_Route_Support_-_Dark.png&w=1920&q=75)

SvelteKit routes with dynamic segments—like `/blog/[slug]`—are now individually recognized and surfaced by Vercel Observability. This replaces the previous behavior where all dynamic routes appeared under a single `/fn` entry.

This is available with version 5.7.0 of `@sveltejs/adapter-vercel`. Upgrade to unlock improved observability for your SvelteKit projects.

If you're using the Vercel adapter via `@sveltejs/adapter-auto`, we recommend switching to using `@sveltejs/adapter-vercel` directly.

Learn more about [Vercel Observability](https://vercel.com/docs/observability).