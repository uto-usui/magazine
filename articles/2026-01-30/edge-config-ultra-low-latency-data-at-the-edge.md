---
title: "Edge Config: Ultra-low latency data at the edge"
source: "https://vercel.com/blog/edge-config-ultra-low-latency-data-at-the-edge"
publishedDate: "2022-11-23"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

2 min read

Nov 23, 2022

Sub-millisecond reads for experiment and feature flag configurations.

Today, we're introducing **Edge Config**: an ultra-low latency data store for configuration data.

Globally distributed on Vercel's Edge Network, this new storage system gives you near-instant reads of your configuration data from [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware), [Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), and [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions). Edge Config is already being used by customers to manage things like A/B testing and feature flag configuration data.

Edge Config is now generally available. Check out the [documentation](https://www.vercel.com/docs/concepts/edge-network/edge-config) or [deploy it on Vercel](https://vercel.com/templates?type=edge-config).

## [Link to heading](#a-unique-storage-product)A unique storage product

Edge Config allows you to distribute data to our Edge Network _**without**_ needing to perform a deployment. Instead, your data is actively replicated to all our regions **before** it’s requested. This means your data will always be available, instantly.

The Edge Config architecture acts similarly to a push-based Content Delivery Network (CDN). Pull-based CDNs load the data on the first request and keep it around until it expires, while push-based CDNs get the data before it is requested and keep it around until a new version is pushed.

While Vercel handles most aspects of our infrastructure like a pull-based CDN, Edge Config works more closely to a _push-based_ CDN. It propagates your config data to all our regions before it's requested, and keeps it in cache until a new version is published.

> Edge Config is amazing. We’ve been hoping for a product like this for a while, and now it’s here! Really excited to see how this plays out with the increased traffic we’ll be seeing over the next few weeks.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/6AGNQgTS6NVkcFyDfVk4S3/ccf9def59795f5890c938e61a170fd8e/download.png)
> 
> **John W,** Software Engineer

Your data is structured as JSON, but Edge Config is _not_ a general-purpose key/value store. Instead, it is optimized for fast, inexpensive reads and infrequent writes. Writes of configuration values may take a few seconds to propagate globally, but reads return with very low latency.

Most lookups return in **5 ms or less**, and **99% of reads will return under 15 ms.**

Edge Config is incredibly fast to read and doesn't require a redeploy to update and maintain config data, making it great for:

-   A/B testing and feature flags
    
-   Maintaining complex and dynamic redirects
    
-   Configuring and updating bespoke request blocking rules, without a redeploy
    

## [Link to heading](#tools-for-rapid-experimentation)Tools for rapid experimentation

The response to Edge Middleware has been staggering. As customers embrace it for A/B testing and feature flags, they've experienced less layout shift and less need for third-party scripts.

By also moving the config data for these experiments to the edge, you can get further performance improvement by eliminating the network requests to retrieve that data.

Speedway Motors has a strong culture of experimentation and fast iteration, but balances that with a strong dedication to end-user performance. In a banner promotion A/B test, switching to Edge Config gave them an immediate improvement in [Core Web Vitals](https://vercel.com/docs/concepts/analytics/web-vitals#core-web-vitals) and SEO.

![Cumulative Layout Shift for Speedway Motors was reduced by 50%.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fy2jv6UbAxix5NIZZCHssA%2F3c386fb82f9fb8faa04d0b6247b40832%2FSlice_1__2_.png&w=1920&q=75)

Cumulative Layout Shift for Speedway Motors was reduced by 50%.

## [Link to heading](#edge-config-api)Edge Config API

The API for Edge Config allows you to query whether a key exists quickly and to get the value of a single key or even multiple values in a single query.

```
import { get } from '@vercel/edge-config';const featureFlagEnabled = await get("featureFlagEnabled")
```

Get started with Edge Config

Just by calling `get` or `getAll`, you’ll read from your default Edge Config. You can create new Edge Configs in your account and use a connection string to connect to a different Edge Config.

```
import { createClient } from '@vercel/edge-config';const edgeConfig = createClient(process.env.FEATURE_FLAGS_CONFIG);const featureFlags = await edgeConfig.getAll(["requireSignup", "showDiscountBanner"]);
```

Example A/B test using Edge Config

As of April 2023 Edge Config is generally available—you can get started with our new [Statsig](https://vercel.com/integrations/statsig) and [HappyKit](https://vercel.com/integrations/happykit) integrations, [Edge Config SDK](https://github.com/vercel/edge-config), or by using [one of our examples](https://vercel.com/templates?type=edge-config).