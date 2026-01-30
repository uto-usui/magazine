---
title: "Deploy Hono backends with zero configuration"
source: "https://vercel.com/changelog/deploy-hono-backends-with-zero-configuration"
publishedDate: "2025-08-01"
category: "frontend"
feedName: "Vercel"
author: "Jeff See"
---

1 min read

Aug 1, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5HDFxvwCHKQMwTmE5pVDD2%2F93f7c9c9e825d999eaf01e1f98b66855%2FGeist_OG_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F154VXPRaEREhReprW3kXja%2F57f0d57f421834387a2397ea85411a8c%2FGeist_OG_Changelog_Dark.png&w=1920&q=75)

Vercel now natively supports [Hono](https://hono.dev/), a fast, lightweight backend framework built on web standards, with zero-configuration.

index.ts

```
import { Hono } from 'hono'const app = new Hono()app.get('/', (c) => {  return c.text("Hello Hono!"))})export default app
```

A "Hello world" Hono backend on Vercel

With the code above, use [Vercel CLI](https://vercel.com/docs/cli) to develop and deploy your Hono application:

Terminal

```
# Develop the application locallyvc dev# Create a deploymentvc deploy
```

Using Vercel CLI to develop and deploy a Hono appliation

With this improved integration, Vercel's framework-defined infrastructure now recognizes and deeply understands Hono applications, ensuring they benefit from optimizations made from builds, deployments, and application delivery.

Now, new Hono applications deployed to Vercel benefit from [Fluid compute](https://vercel.com/docs/fluid-compute), with Active CPU pricing, automatic cold start optimizations, background processing, and much more.

[Deploy Hono on Vercel](https://vercel.com/new/clone?demo-description=Deploying%20an%20API%20on%20Vercel%20with%20Hono.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2FCYbcj30ZJhtGhg8JnR2Jm%2Fc2d3920a1878f356401b50593c1bc647%2FGeist_OG_Light.avif&demo-title=Hono%20on%20Vercel&demo-url=https%3A%2F%2Fhono.vercel.dev&from=templates&project-name=Hono%20on%20Vercel&repository-name=hono-on-vercel&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fexamples%2Ftree%2Fmain%2Fframework-boilerplates%2Fhono&skippable-integrations=1) or [visit Hono's Vercel documentation](https://vercel.com/docs/frameworks/backend/hono).