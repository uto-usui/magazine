---
title: "Yarn 2+ dependency caching now supported"
source: "https://vercel.com/changelog/yarn-2-dependency-caching-now-supported"
publishedDate: "2025-03-31"
category: "frontend"
feedName: "Vercel"
author: "Austin Merrick"
---

1 min read

Mar 31, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6iz8zxbHC6RxqE8WnaM2gJ%2Fd92cce20f7c108251387055bc0ad17ad%2FVercel_Yarn_Light_from_Geist_OG__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F754QUCzQMzq4SD3TojgP4a%2F086888babf259244184136f58866cb0d%2FVercel_Yarn_Dark_from_Geist_OG__2_.png&w=1920&q=75)

Vercel now caches dependencies for projects using Yarn 2 and newer, reducing install times and improving build performance. Previously, caching was only supported for npm, pnpm, Bun, and Yarn 1.

To disable caching, set the environment variable `VERCEL_FORCE_NO_BUILD_CACHE` with a value of `1` in your project settings.

If you're using Yarn 4, [enable Corepack](https://vercel.com/docs/builds/configure-a-build#corepack), as [recommended by Yarn](https://yarnpkg.com/corepack).

Visit [the Build Cache documentation](https://vercel.com/docs/deployments/troubleshoot-a-build#understanding-build-cache) to learn more.