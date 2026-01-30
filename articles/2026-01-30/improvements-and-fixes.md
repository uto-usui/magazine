---
title: "Improvements and fixes"
source: "https://vercel.com/changelog/improvements-and-fixes"
publishedDate: "2023-06-22"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

1 min read

Jun 22, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4YHG2hHdsLAiKI3YBIPySB%2F4336bad487699e5dd4e034af5c8d54f3%2Fpapercuts-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5Q6iTwx2CBd0pFrD9vzZWK%2Fe537e396e236e5daa54a31ff7056a77d%2Fpapercuts-dark.png&w=1920&q=75)

-   **Draft Mode:** Users on any plan can now enable [Draft Mode](https://vercel.com/docs/frameworks/nextjs#draft-mode) from the Vercel toolbar. When you do so, the toolbar color changes to purple to indicate you are viewing draft content.
    
-   **Skew Protection**: You can now implement [Skew Protection](https://vercel.com/docs/concepts/deployments/skew-protection) to eliminate version skew between web clients and servers on Next.js version 13.4.7 or newer. The Skew Protection platform primitive is available to all frameworks.
    
-   **Storage transfers:** When Hobby users upgrade to Pro, their [stores](https://vercel.com/docs/storage) will be transferred to the new team.
    
-   **Configured Ignored Build Step script:** When rebuilding or promoting a deployment in a project with a [Ignored Build Step script](https://vercel.com/docs/concepts/projects/overview#ignored-build-step) now you can explicitly skip the ignore build step script, forcing the build to happen.
    
-   **System environment variables:** `VERCEL_BRANCH_URL` with the generated Git branch URL has been added to the system env vars to access a deployment’s [Git branch alias](https://vercel.com/docs/concepts/deployments/generated-urls#url-with-git-branch) from within their code.
    
-   **Faster deployment times:** Projects with Edge Functions are now faster to deploy by: 2 seconds on average, 9 seconds in slow cases, and up a 20 second improvement in the slowest case.
    
-   **Git metadata**: You can now see Git metadata for deployments when there are unstaged changes.
    
-   **Vercel CLI:** [v30.2.3](https://github.com/vercel/vercel/releases/tag/vercel%4030.2.3) was published with updates to dependencies for Node and Remix.