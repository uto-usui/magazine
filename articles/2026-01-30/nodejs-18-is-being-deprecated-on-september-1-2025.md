---
title: "Node.js 18 is being deprecated on September 1, 2025"
source: "https://vercel.com/changelog/node-js-18-is-being-deprecated"
publishedDate: "2025-01-16"
category: "frontend"
feedName: "Vercel"
author: "Ali Smesseim"
---

1 min read

Jan 16, 2025

Following the Node.js 18 end of life on April 30, 2025, we are deprecating Node.js 18 for Builds and Functions on September 1, 2025.

**Will my existing deployments be affected?**

No, existing deployments with Serverless Functions **will not be affected.**

**When will I no longer be able to use Node.js 18?**

On September 1, 2025, Node.js 18 will be disabled in [project settings](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js#node.js-version). Existing projects using 18 as the version for Functions will display an error when a new deployment is created.

**How can I upgrade my Node.js version?**

You can configure your Node.js version in [project settings](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js#node.js-version) or through the `engines` field in `package.json`.

**How can I see which of my projects are affected?**

You can see which of your projects are affected by this deprecation with:

Terminal

```
npm i -g vercel@latestvercel project ls --update-required
```

View projects that require updating.