---
title: "Node.js 16 is being deprecated on January 31, 2025"
source: "https://vercel.com/changelog/node-js-16-deprecation"
publishedDate: "2023-11-29"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

1 min read

Nov 29, 2023

Following the Node.js 16 end of life on September 11, 2023, we are deprecating Node.js 16 for Builds and Functions on January 31, 2025.

**Will my existing deployments be affected?**

No, existing deployments with Serverless Functions **will not be affected.**

**When will I no longer be able to use Node.js 16?**

On January 31, 2025, Node.js 16 will be disabled in [project settings](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js#node.js-version). Existing projects using 16 as the version for Functions will display an error when a new deployment is created.

**How can I upgrade my Node.js version?**

You can configure your Node.js version in [project settings](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js#node.js-version) or through the `engines` field in `package.json`.

**How can I see which of my projects are affected?**

You can see which of your projects are affected by this deprecation with:

Terminal

```
npm i -g vercel@latestvercel project ls --update-required
```

View projects that require updating.