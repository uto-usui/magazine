---
title: "Faster builds for monorepos"
source: "https://vercel.com/changelog/faster-build-times-for-monorepos"
publishedDate: "2022-04-29"
category: "frontend"
feedName: "Vercel"
author: "Ethan Arrowood"
---

1 min read

Apr 29, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3VTAruF5gxN5UA7wu81kRt%2Ff5428ff7aa06b66bd4d8d75fe974e329%2Ffaster-builds-for-monorepos-update-22-04-29-LIGHT.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F54U4Adzn9sFlblS2Yf7wkq%2Fdaa5eb10b488e851ecd2f9feb91cb9de%2Ffaster-builds-for-monorepos-update.png&w=1920&q=75)

New and existing monorepos deployed to Vercel will experience faster builds.

Vercel now automatically caches `node_modules` recursively when installing dependencies during the build process. `ENABLE_ROOT_PATH_BUILD_CACHE=1` will be set as a default environment variable on all new and existing monorepo projects. For large monorepos, this can decrease build times by minutes.

[Check out the docs](https://vercel.com/docs/concepts/git/monorepos#step-4:-set-environment-variables) as well.