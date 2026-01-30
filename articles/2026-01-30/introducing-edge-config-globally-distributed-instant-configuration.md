---
title: "Introducing Edge Config: Globally distributed, instant configuration"
source: "https://vercel.com/blog/edge-config-public-beta"
publishedDate: "2022-12-15"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

2 min read

Dec 15, 2022

Last month we announced the limited availability of [Vercel Edge Config](https://www.vercel.com/docs/concepts/edge-network/edge-config), an ultra-low latency data store for near-instant reads of configuration data.

Edge Config is now generally available, alongside integrations with [Statsig](https://vercel.com/integrations/statsig) and [HappyKit](https://vercel.com/integrations/happykit) for A/B testing and Feature Flags.

## [Link to heading](#why-edge-config)Why Edge Config

Edge Config is a distributed data store optimized for near-instant reads. By pushing data to every region, before any requests are made, you're able to read that data from a Vercel Function or Edge Middleware immediately upon request.

Because data is pushed to every Vercel region at write time, we've seen most lookups return in **5 ms or less**, and **99% of reads will return under 15 ms.**

This speed and global distribution make Edge Config great for:

-   A/B testing
    
-   Feature flags
    
-   Maintaining complex and dynamic redirects
    
-   Configuring and updating bespoke request blocking rules, without a redeploy
    

### [Link to heading](#edge-config-for-experimentation)Edge Config for Experimentation

Paired with tools like [Statsig](https://vercel.com/integrations/statsig), [HappyKit](https://vercel.com/integrations/happykit), [Split](https://www.split.io/), and other experimentation partners, Edge Config can drastically improve performance and load experience. By integrating these tools with Edge Config, their data gets pushed to the edge when it's changed. When a user visits your site, no extra network requests are needed to retrieve the config data. What's more, since the data is globally distributed, latency for the initial read is reduced.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/xl8ThBYsF4m8tIerll9bK/9eabbb71b33a9df58a76678f4f3b28b5/Group_10734__2_.png)

“Edge Config is an awesome tool for our development process. It enables us to continuously work and deploy our application without worrying about latencies or hosting our own solution.”

Alongside the beta release of Edge Config, we're introducing new integrations with both Statsig and Happykit.

[Statsig](https://vercel.com/integrations/statsig) is an experimentation and feature management platform helping businesses use data to move faster and build better products. Vercel users can now leverage Statsig's server SDK at the edge to grab configurations and bucket users into feature experiences.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4Qid0V7h5oykBb4IoLLCSZ/144ab1874ccc9f3d949384b262cf66d7/1_2ePKSmlKGde9t6m7HvSeFg.png)

"Edge Config allows Statsig users to read updated feature flag and experiment configs at the Edge. With this release we’re able to push config updates to the Edge, where our users can read up-to-date configs with ultra-low latency, reducing serverless cold-start times and a greatly improved end-user experience."

[HappyKit](https://vercel.com/integrations/happykit) is a powerful feature flagging service for your Next.js applications that’s trusted by hundreds of projects to serve over a billion feature flags since its creation. HappyKit works directly with Vercel Edge Config — this allows you to update feature flags easily, without performing a redeploy. And you can evaluate feature flags immediately, usually in only a few milliseconds.

We're actively working with our partners in the space to build further first-party integrations.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1ximAeTd3S13Ug0jLkSmrB/beb0391e7041806f9089e7df278338f7/split.png)

Split Software

"Edge Config provides our customers with an easy way to get _significantly_ improved performance for feature flag delivery, and thus application start-up. Developers can use this to help move them towards more modern feature delivery and measurement practices. I'm incredibly excited for what's to come in the space."

## [Link to heading](#get-started)Get Started

You can get started today with an integration, [Edge Config SDK](https://github.com/vercel/edge-config), or by using [one of our examples](https://vercel.com/templates?type=edge-config).

```
import { get } from '@vercel/edge-config';const featureFlagEnabled = await get("featureFlagEnabled")
```

Get started with Edge Config

Edge Config is now generally available. Check out the [documentation](https://www.vercel.com/docs/concepts/edge-network/edge-config) or [deploy it on Vercel](https://vercel.com/templates?type=edge-config).

We’re excited to hear what you think, and how you’re using Edge Config. Give us feedback in the [Vercel Community](https://community.vercel.com/).