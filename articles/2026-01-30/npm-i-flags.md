---
title: "npm i flags"
source: "https://vercel.com/changelog/npm-i-flags"
publishedDate: "2025-02-20"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

Feb 20, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F536GGMuWpP9NT29OpeHNBF%2Ffff583ac791b8d9033c056de4ce50fa9%2FFlags_SDK_-_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1V5fLfdrvF34JaLnhYocTR%2F3dec39d584ec298a48202dc7f6de5631%2FFlags_SDK_-_Dark.jpg&w=1920&q=75)

The [Flags SDK](https://flags-sdk.dev/)—our open source library for using feature flags in Next.js and SvelteKit applications—is now available under the new package name `flags`.

```
import { flag } from 'flags/next';export const exampleFlag = flag({  key: 'example-flag',  decide() {    // this flag will be on for 50% of visitors    return Math.random() > 0.5;  },});
```

The new name signals our commitment to open source and the independence of the package from any specific entity or platform. Our framework-first approach of the SDK aims to simplify usage, avoid client-side flag evaluation, and improve user experience by eliminating layout shifts.

We are working on adapters with partners like Statsig, Optimizely, and LaunchDarkly to ensure a seamless integration with the Flags SDK.

Until now, each provider established their own approach to using feature flags in frameworks like Next.js, which led to duplicate efforts across the industry and drift in implementations. Going forward, the Flags SDK will help all feature flag and experimentation providers benefit from its tight integration to frameworks, while retaining their unique capabilities.

If you are using `@vercel/flags`, make sure you are updating to version 3.1.1 and switch your imports and package.json to `flags`.

Learn more in our redesigned [documentation and examples](https://flags-sdk.dev/).