---
title: "How we run Vercel's CDN in front of Discourse"
source: "https://vercel.com/blog/how-we-run-vercels-cdn-in-front-of-discourse"
publishedDate: "2026-03-10"
category: "frontend"
feedName: "Vercel"
author: "Jacob Paris"
---

3 min read

Mar 10, 2026

Vercel's CDN can front any application, not just those deployed natively on the platform, and it's simple to set up. This allows you to add firewall protection, DDoS mitigation, and observability to platforms like Discourse or WordPress without migrating them completely.

The [Vercel Community](https://community.vercel.com/) is an example of this architecture. It is a Discourse application hosted elsewhere, but we proxy it ourselves via Vercel's CDN, which both protects the app and gives us access to useful features in Vercel's website stack:

-   [Web Analytics](https://vercel.com/docs/analytics) gives us anonymized, cookie-free demographic and referrer data, so we can see where users are coming from and what they're looking for.
    
-   [Firewall](https://vercel.com/docs/vercel-firewall) gives us DDoS protection and has automatically prevented several attacks in the last year.
    
-   [Bot Management](https://vercel.com/docs/bot-management) lets us block malicious scrapers while allowing trusted crawlers to index the forum and allow community posts to show up in ChatGPT searches.
    

Some parts of the community platform, like [Vercel Community live sessions](https://community.vercel.com/live), run directly on Vercel with Next.js. We use [Vercel Microfrontends](https://vercel.com/docs/microfrontends) to mount a Next.js app on the same domain as the Discourse app, for three reasons:

-   To create new pages that would be impractical to implement as CMS plugins.
    
-   To overwrite existing Discourse pages that we can't fully customize.
    
-   To keep users authenticated through [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel)
    

When the new pages are ready to launch, we add the path to our microfrontends configuration and users are rerouted seamlessly on the next deploy.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1zBP3SU7uMGZ0mc0fE53d0%2F029afde2a8529e77226f56fcee4858e6%2Fimage__8_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3hNfbi6e29Fmo7vXH0cjau%2Fdb0a89a7c74e36f5e29d715ec99cdf8d%2Fimage__9_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5pBAFiTRjf4WG5kkuQC9WG%2Fdbb732400a8fa009cca21e59d3afbc52%2Fimage__10_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3W3o8HcRRsFM5Zoijxdx3w%2F1206239b4deeaa37e7560401cb0e54ca%2Fimage__11_.png&w=1920&q=75)

## [Link to heading](#vercel-as-a-cdn)Vercel as a CDN

To set up Vercel as a CDN proxy like this, you need two domains:

1.  **Inner host:** The origin server where the site is actually hosted. This might look like `your-site.discourse.com`
    
2.  **Outer host:** The Vercel project domain that users interact with, such as `community.vercel.com`
    

Ensure that all links on the site and its canonical URLs use the outer domain.

Once those are in place, create a new project on Vercel that deploys to the outer host. You can then use [`vercel.ts` (formerly vercel.json)](https://vercel.com/changelog/vercel-ts) to rewrite traffic to the inner domain.

vercel.ts

```
import { type VercelConfig, routes, deploymentEnv } from '@vercel/config/v1'export const config: VercelConfig = {  rewrites: [    routes.rewrite('/(.*)', deploymentEnv('INNER_HOST'), {      requestHeaders: {        'x-proxy-secret': deploymentEnv('PROXY_HEADER')      }    }),  ],}
```

The inner host reads the x-proxy-secret header to validate traffic, ensuring that nothing can accesses the inner host directly.

## [Link to heading](#running-multiple-apps-on-a-single-domain-with-microfrontends)Running multiple apps on a single domain with microfrontends

To extend the community forum beyond the limits of Discourse, we configured with the outer host domain using a [vertical microfrontend approach](https://vercel.com/kb/guide/incremental-migrations-with-microfrontends).

Vercel's microfrontends allow you to mount different Vercel projects to different route paths. We added a `microfrontends.json` file that directs traffic for specific routes to separate Vercel projects.

Additional pages can be added incrementally, route by route. We also added the `.well-known/workflow` route to use [Workflow Development Kit](https://useworkflow.dev/) for event creation and video processing.

microfrontends.json

```
{  "$schema": "https://openapi.vercel.sh/microfrontends.json",  "applications": {    "community-proxy": {      "development": {        "fallback": "community.vercel.com"      }    },    "community-nextjs": {      "routing": [        {          "paths": [            "/.well-known/workflow/:path*",            "/live/:path*"          ]        }      ]    }  }}
```

While you could accomplish some of this by using negative matching in the proxy regex to avoid proxying certain routes, splitting the projects provides better isolation. This approach allows for independent environment variables and organization permissions, locking down the project that talks to the third-party host.

## [Link to heading](#a-modern-cdn-without-a-massive-migration)A modern CDN without a massive migration

At this point, you have Vercel's CDN standing between your users and your origin server. All traffic flows through Vercel's global network, giving you enterprise-grade security without touching your existing application.

You get even more flexibility when you combine this with microfrontends. You now have a path to modernize your application incrementally. Instead of a "big bang" refactor, you can create a Next.js application and turn on specific routes one by one, while your core application continues to run on Discourse, WordPress, or whatever platform it is built on.

This architecture unlocks a pragmatic path forward: secure your existing investment with Vercel's CDN today, then layer modern features on top tomorrow, all without the risk of a full platform migration.

Learn more by reading the [Vercel microfrontends documentation](https://vercel.com/docs/microfrontends) or see it in action at [community.vercel.com/live](https://community.vercel.com/live).