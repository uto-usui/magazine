---
title: "Node.js 20 is being deprecated on October 1, 2026"
source: "https://vercel.com/changelog/node-js-20-is-being-deprecated"
publishedDate: "2026-07-14"
category: "frontend"
feedName: "Vercel"
author: "Ali Smesseim"
---

Following the Node.js 20 end of life on April 30, 2026, we are deprecating Node.js 20 for Builds and Functions on October 1, 2026.

**How can I see which of my projects are affected?**

You can see which of your projects are affected by this deprecation with:

Terminal

```
npm i -g vercel@latestvercel project ls --update-required
```

Listing your projects that still target a deprecated Node.js version.

**Will my existing deployments be affected?**

No, existing deployments with Serverless Functions **will not be affected.** Invocations to already-deployed functions will continue to work normally. Only new deployments will be affected.

**When will I no longer be able to use Node.js 20?**

On October 1, 2026, Node.js 20 will be disabled in [Project Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment&title=Go+to+Build+Settings). Existing projects using 20 as the version for Functions will display an error when a new deployment is created.

**How can I upgrade my Node.js version?**

You can configure your Node.js version in [Project Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment&title=Go+to+Build+Settings) or through the `engines` field in `package.json`.

You can also hand the upgrade to your coding agent:

```
Upgrade this Vercel project from Node.js 20 to 24. Set the engines field in package.json to { "node": "24.x" }, which overrides the Project Settings version on the next deployment. Update any Node 20 pins in .nvmrc, .node-version, or CI configs. Switch the local runtime to Node 24, reinstall dependencies, run the build and tests, and fix any breaking changes. After deploying, confirm the version by logging process.version.
```

Hand off to your coding agent to handle upgrading your project for you.

**What if I can't upgrade before October 1?**

If you can't complete the upgrade in time without disrupting your app, deploy it as a [container image](https://vercel.com/docs/functions/container-images) instead. Add a `Dockerfile.vercel` at your project root and the image is built and deployed on every commit:

Dockerfile.vercel

```
FROM node:20-alpineWORKDIR /appCOPY . .RUN npm ci# your server must listen on $PORTCMD ["node", "server.js"]
```

Pinning Node.js 20 as the base image. The Node.js version in Project Settings does not apply to containers, so the deprecation does not block these deployments.

We still recommend upgrading when you can. With a container, you manage the Node.js version and its security updates yourself.

Upgrade before October 1, 2026. Learn more about [supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).