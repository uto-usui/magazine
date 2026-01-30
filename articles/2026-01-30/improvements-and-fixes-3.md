---
title: "Improvements and fixes"
source: "https://vercel.com/changelog/november-2022"
publishedDate: "2022-11-14"
category: "frontend"
feedName: "Vercel"
author: "Christopher Skillicorn"
---

1 min read

Nov 14, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4YHG2hHdsLAiKI3YBIPySB%2F4336bad487699e5dd4e034af5c8d54f3%2Fpapercuts-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5Q6iTwx2CBd0pFrD9vzZWK%2Fe537e396e236e5daa54a31ff7056a77d%2Fpapercuts-dark.png&w=1920&q=75)

With your feedback, we've shipped dozens of bug fixes and small feature requests to improve your product experience.

-   **Vercel CLI:** [**28.5.0**](https://github.com/vercel/vercel/releases/tag/vercel%4028.5.0) was released with improved `vc build` monorepo support.
    
-   **Build without cache via env:** It's now possible to force a build through Git that skips the build cache by setting the `VERCEL_FORCE_NO_BUILD_CACHE` [environment variable](https://vercel.com/docs/concepts/deployments/troubleshoot-a-build#managing-build-cache) in your project settings.
    
-   **Environment variables:** Each deployment on Vercel can now support up to 1000 environment variables instead of only 100.
    
-   **Vercel dashboard UI:** The primary and secondary navigation bars are now full width so that each page UI has the option to maintain a max-width or take advantage of the whole viewport.
    
-   **Vercel menu component:** The menu dropdown in your dashboard is now slightly more compact on desktop with an improved animation, which increases contrast and gives you higher information density.
    
-   **Improved code in Vercel docs:** Code blocks now include file location as a header.
    
-   **Improved visuals in Vercel docs:** We now support dynamic dark and light mode screenshots.