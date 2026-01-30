---
title: "Node.js v20 LTS is now available in beta"
source: "https://vercel.com/changelog/nodejs-20"
publishedDate: "2023-11-16"
category: "frontend"
feedName: "Vercel"
author: "Ethan Arrowood"
---

1 min read

Nov 16, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4ZxRTtvhppvKVS2YpS3vnl%2Fdf119454280db80d6ff25b0fd0c8aa0a%2Fnode20.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2lsfin89nFFlJCSdxraxqJ%2Fbac3d3fe3436086ece6676d13d1775e1%2FChangelog_Node.png&w=1920&q=75)

As of today, Node.js version 20 can be used as the runtime for [Builds](https://vercel.com/docs/deployments/builds) and [Serverless Functions](https://vercel.com/docs/functions/serverless-functions). Select `20.x` in the Node.js Version section on the General page in the Project Settings. **The default version remains Node.js 18**.

Node.js 20 introduces several [new features](https://nodejs.org/en/blog/announcements/v20-release-announce/) including:

-   New experimental permission model
    
-   Synchronous `import.meta.resolve`
    
-   Stable test runner
    
-   Performance updates to V8 JavaScript Engine and Ada (URL Parser)
    

Node.js 20 is faster and introduces new core APIs eliminating the need for some third-party libraries in your project. Support for Node.js 20 on Vercel is currently in beta.

The exact version used by Vercel is [20.5.1](https://github.com/nodejs/node/releases/tag/v20.5.1) and will automatically update minor and patch releases. Therefore, only the major version (`20.x`) is guaranteed.

[Read the documentation](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js) for more.