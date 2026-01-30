---
title: "The user experience of the Frontend Cloud"
source: "https://vercel.com/blog/the-user-experience-of-the-frontend-cloud"
publishedDate: "2023-12-04"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

6 min read

Dec 4, 2023

Vercel's Edge network means robust personalization without compromising on speed.

The world's best websites load before you've finished this sentence.

Those websites can't be static, but serving performance _and_ personalization to a global user base has historically been complex.

The [primary goal of Vercel's Frontend Cloud](https://vercel.com/blog/the-foundations-of-the-frontend-cloud) is to collect industry-best practices into one easy-to-use workflow, integrating new and better solutions as they come.

In this article, we'll look at why speed and personalization matter to your business, and how the Frontend Cloud gives you abundant options for both.

[

**Speed is your bottom line.**

Discover how the Frontend Cloud delivers lightning-fast websites that boost your business.

Talk to an Expert



](https://vercel.com/contact/sales)

## [Link to heading](#why-do-you-need-speed)Why do you need speed?

There are many reasons to care about the load speed of your application, but how do you know when your speed _good enough_?

Let's break it down.

-   [Milliseconds quite literally make millions](https://www2.deloitte.com/content/dam/Deloitte/ie/Documents/Consulting/Milliseconds_Make_Millions_report.pdf), and 8% conversion rate lift is tied to every 100ms shaved off load time. Modern users don’t stare at a blank screen for long, and that tolerance is dropping more by the year.
    

![Slow load times have direct impact on user behavior.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FkwZL3skxfNFMJDgf54vTY%2Fd667f61410bb3729f8b32b03f1dd859e%2Fms_make_mils.png&w=1920&q=75)![Slow load times have direct impact on user behavior.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F33XflbMaV9FiGBBqEbb0SS%2F4d54d5988699927a0b8e9effe21f2a54%2F1920x1004-Blog_Graphic_1.png&w=1920&q=75)

Slow load times have direct impact on user behavior.

-   Google and other search providers rank pages based on relevancy, but [a large portion of that relevancy comes from speed](https://vercel.com/blog/how-core-web-vitals-affect-seo). Search engines show performant, accessible, bug-free pages at the top, to improve their own UX.
    
-   **Many of the top-ranking applications in the world** [**load in one second or less**](https://www.browserstack.com/guide/how-fast-should-a-website-load)**.** If you’re not around this speed, you’re likely not the first result. If your load time isn’t under five seconds, you may not be on the first page of results for all queries except the most specific to your brand.
    
-   Even as AI changes the search industry, it’s important to realize that AI’s ability to access information on the _current_ web largely [relies on existing search engines](https://openai.com/blog/chatgpt-plugins#browsing:~:text=Browsing%20retrieves%20content%20from%20the%20web%20using%20the%20Bing%20search%20API.%C2%A0As%20a%20result%2C%20we%20inherit%20substantial%20work%20from%20Microsoft%20on%20\(1\)%20source%20reliability%20and%20truthfulness%20of%20information%20and%20\(2\)%20%E2%80%9Csafe%2Dmode%E2%80%9D%20to%20prevent%20the%20retrieval%20of%20problematic%20content.), such as Bing and Google.
    

**In other words, if your site isn’t fast, users can only find you through paid advertising and word of mouth.** Even when users _do_ find your site, their stickiness is, in part, reliant on load times.

Adopting the Frontend Cloud, with its speed and potential to scale, uncaps your business’s potential for organic virality and [drives users to convert](https://wpostats.com/?sjid=8517968827982031122).

## [Link to heading](#why-does-dynamic-personalization-matter)Why does dynamic personalization matter?

All that discoverability, all the speed, is only half the story. Let’s face it: [65% of business comes from existing customers](https://www.nerdwallet.com/article/small-business/customer-loyalty-statistics), and the best way to ensure application stickiness is with deep personalization.

Users are loyal to brands that they feel “get them.” They recommend these experiences to friends. In a world of countless anonymous digital experiences, a personalized, customizable experience sets your app apart from your competitors.

Historically, personalization has been at odds with speed. Personalization requires dynamic-to-that-user data, which can’t be cached in a typical frontend.

Vercel's Frontend Cloud solves these challenges, making [access to fast-as-milliseconds external data](https://vercel.com/resources/edge-middleware-experiments-personalization-performance) unlimited. There’s no other solution that allows your apps to be as fast _and_ dynamic.

If you’re discoverable through performance and you _also_ delight users through personalization and good UX, your app stands apart from a crowded market.

So, the question is, how do we get there? Let's look at the Frontend Cloud's best answers.

[

**Level-up your user experience.**

Deliver deeply personalized, dynamic websites that drive customer loyalty and growth.

Talk to an Expert



](https://vercel.com/contact/sales)

## [Link to heading](#what-is-a-content-delivery-network-\(cdn\))What is a content delivery network (CDN)?

When a user from Tokyo requests data from New York City, the one-way latency is, at minimum, around 200ms. This might not sound too bad, but the problem with requests is that they stack up.

Each user interaction with the server (even within the same webpage if it needs more server data) takes at least 400ms of roundtrip to accomplish—a noticeable lag on _top_ of whatever time it takes to access data, process it, and render your data-informed code for the user.

Keep in mind that [the best websites in the world](https://www.browserstack.com/guide/how-fast-should-a-website-load) take ~1000ms to be _fully interactive_.

This is originally why Content Delivery Networks (CDNs) were invented. By placing data centers around the world and allowing businesses to cache their static web data inside them, websites could often shave seconds off their load times.

![An Edge Network sits between the internet and your deployments, acting as a CDN with the ability to execute functions as close to your user or data as possible.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1pegZuLCRJsTmhLd67IhKu%2F177a2c0850208a43834536f23ab3b5be%2FInline_Graphic-Dark-V3.png&w=1920&q=75)![An Edge Network sits between the internet and your deployments, acting as a CDN with the ability to execute functions as close to your user or data as possible.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FoboVBNBEpEgLQDO24zNOq%2F3ff3ba83cfeabaf9afbd7514d5e8c87c%2FInline_Graphic-Dark-V3.png&w=1920&q=75)

An Edge Network sits between the internet and your deployments, acting as a CDN with the ability to execute functions as close to your user or data as possible.

But the limitation is this: A typical CDN only allows the storage of static web assets. They don't help with dynamic-to-that-moment data.

If you need to serve any dynamic content that can't be cached, users will have to wait for their request to travel to the application origin server and back to their location.

## [Link to heading](#vercel's-edge-network)Vercel's Edge Network

In order to optimize application performance and reliability for your end users, Vercel's Frontend Cloud uses globally distributed servers to asynchronously compute and granularly cache the result of user requests. We call this our Edge Network.

The Edge Network's caching is both to [optimize for latency](#what-is-a-global-edge-network) and to provide consistent availability, so your application can continue to perform even if external data sources experience downtime.

User requests do not have to travel back to the origin server to be handled. Instead, the Edge Network entirely handles user requests, automatically provisioning additional infrastructure and communicating with other servers as needed.

This means that the Edge Network can automatically cache (or re-cache) the results of any dynamic user request in a static format to be quickly served to the next user.

### [Link to heading](#granular-caching:-incremental-static-regeneration)Granular caching: Incremental Static Regeneration

The Edge Network can also cache any content _piecemeal_, [as defined within your framework code](https://vercel.com/blog/the-foundations-of-the-frontend-cloud#why-fit-your-frontend-into-a-framework). We call this practice [Incremental Static Regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration).

For instance, in the [Next.js App Router](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating), caching and revalidation can happen specifically at the _component_ level. This allows you to build experiences that seamlessly merge static and dynamic content—all while keeping external data fetches on the server.

Practices like [Partial Prerendering](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model) then step in to make sure the user's Time to First Byte (TTFB) is as small as possible.

When you have the power to choose the caching behavior of each piece of your application, you can ensure users receive top-speed, cached data in far more cases than not.

Caching isn’t _all_ about UX, though. By leveraging serverless functions in your codebase without having to worry about speed or concurrency, your team gets a far better [developer experience (DX)](https://vercel.com/blog/improving-developer-workflow) as well.

![ISR allows you to generate pages on-demand instead of waiting for the entire site at build time.](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5yQy2o1VB8NmhUyT69QoeW/c786d3d3c982f7c1440b9238066c60aa/isr_light.svg)![ISR allows you to generate pages on-demand instead of waiting for the entire site at build time.](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4oTz09R6gxQxcNFn9k2nX/663174cd657c2b265e77cc19a7b11389/isr-dark.svg)

ISR allows you to generate pages on-demand instead of waiting for the entire site at build time.

Practices like ISR, [which perform their caching magic _after_ build](https://vercel.com/docs/incremental-static-regeneration), drastically cut build times in instances where you previously needed to statically generate all dynamic pages. ISR can also allow your authors to [preview and publish new content without developer intervention](https://vercel.com/customers/hydrow).

### [Link to heading](#the-lifecycle-of-a-user-request)The lifecycle of a user request

Vercel's Edge Network also caches at all levels of the user request lifecycle:

-   When a user makes a request, all levels of that request (TLS, hostname lookup, deployment fetching, and routing) look to on-site, in-memory storage for information before making a more time-consuming database call. Cache levels include per-proxy (the instance of compute spun up to aid that particular user), by region (in a data center close to where that user is accessing from), and origin (close to long-term data storage).
    
-   When a user action needs to invoke a serverless function, the Frontend Cloud infra checks yet another threefold layer of in-memory storage to see if the dynamic information needed is already available. This, at a high level, is how features like ISR work to serve users the latest static files.
    

By allowing data to be re-cached and functions to be re-invoked behind the scenes, Vercel's Frontend Cloud provides performant consistency no matter how much dynamic data your codebase needs to access.

The Frontend Cloud creates a cohesive and highly customizable caching environment for all levels of infrastructure—[from initial user request to data rendered](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure).

Users see dynamic, up-to-date, personalized data, but it’s served to them as a fastest-on-the-web static page.

## [Link to heading](#edge-functions-and-middleware)Edge Functions and Middleware

Vercel's Edge Network further differentiates itself from a typical CDN by allowing you to run dynamic server-side JavaScript as close as possible to your user with [Edge Functions](https://vercel.com/docs/functions/edge-functions), or between user request and data rendering with [Edge Middleware](https://vercel.com/docs/functions/edge-middleware).

Across multiple frameworks, such as [Next.js, SvelteKit, Astro, Nuxt, Remix, and more](https://vercel.com/docs/frameworks), Edge Functions are Serverless Functions with the `edge` option toggled on, and in addition to running at the edge, they benefit from all the same caching and streaming capabilities.

Edge Middleware can be written in a typical middleware pattern ([in Next.js, for example](https://nextjs.org/docs/app/building-your-application/routing/middleware)), but runs _before_ the cache, allowing you to change what is served to the user with [zero layout shift or noticeable artifacts](https://vercel.com/blog/zero-cls-experiments-nextjs-edge-config).

![Edge Middleware's location within the Frontend Cloud infrastructure.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5pV3Vd3FeYO2Ynk1BVtxiX%2Fbf99b7e646884255e7229b3a8b5ce76a%2Fedge-middleware-light.png&w=1920&q=75)![Edge Middleware's location within the Frontend Cloud infrastructure.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7aSNr7ss5428amGZULhEK8%2F7c9e27a2f990ab84ca1e7643b29a9407%2Fimage.png&w=1920&q=75)

Edge Middleware's location within the Frontend Cloud infrastructure.

Both Edge Functions and Middleware allow for top-speed, global personalization of your application—all without leaving your framework code.

## [Link to heading](#personalization-meets-speed)Personalization meets speed

The Frontend Cloud allows you to design user-obsessed applications that offer deeply personalized experiences without sacrificing speed for dynamic content.

With boosted search engine relevancy and user engagement, your application can convert far more users.

[

**Transform your website's potential.**

Unlock unmatched speed and personalization for your business with the Frontend Cloud.

Contact Us



](https://vercel.com/contact/sales)