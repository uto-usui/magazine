---
title: "Evolving Vercel Functions"
source: "https://vercel.com/blog/evolving-vercel-functions"
publishedDate: "2024-02-14"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

4 min read

Feb 14, 2024

Faster, modern, and more scalable

We’ve been building a new foundation for compute, built on top of Vercel’s Managed Infrastructure, for the past year.

Today, we’d like to share our first major iteration of Vercel Functions:

-   [**Increased Concurrency:**](#increased-concurrency) Now up to 100,000 concurrent invocations
    
-   [**Web Standard APIs:**](#web-standard-api-signature) New Function signature using Web `Request` and `Response`
    
-   [**Zero-Config Streaming:**](#zero-config-function-streaming) Stream responses with the full power of Node.js
    
-   [**Long Running Functions:**](#long-running-functions) Up to 5 minutes on Pro and 15 minutes on Enterprise
    
-   [**Faster Cold Starts:**](#faster-cold-starts) Both runtime and framework improvements
    
-   [**Automatic Regional Failover:**](#automatic-regional-failover) Increased resiliency for Enterprise teams
    

Get started with Vercel Functions today or continue reading to learn more about how we’ve improved the foundations of our compute platform.

## [Link to heading](#increased-concurrency)Increased Concurrency

Vercel Functions now have improved [automatic concurrency scaling](https://vercel.com/docs/functions/serverless-functions/runtimes#automatic-concurrency-scaling), with up to 30,000 functions running simultaneously for Pro and 100,000 for Enterprise with the option for extended concurrency.

This ensures your project can automatically scale even during the highest bursts of traffic. We’ve designed these improvements with our customers who experience irregular traffic patterns, like [news](https://vercel.com/customers/washington-post-next.js-vercel-engineering-at-the-speed-of-breaking-news) and [ecommerce](https://vercel.com/customers) sites.

These concurrency improvements are the default for Hobby and Pro, and Enterprise can have even higher concurrency. These improvements are available today with zero changes in your application code.

## [Link to heading](#web-standard-api-signature)Web Standard API Signature

When we first released Vercel Functions, the Node.js [request](https://nodejs.org/api/http.html#class-httpincomingmessage)/[response](https://nodejs.org/api/http.html#class-httpserverresponse) objects were the standard signature for creating API endpoints. This Express-like syntax inspired both the [Next.js Pages Router](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) as well as standalone functions on Vercel.

api/hello.js

```
export default function handler(request, response) {  res.status(200).json({ message: 'Hello Vercel!' });}
```

The Node.js inspired signature for Vercel Functions

With the release of Node.js 18 and improvements to the Web platform, Node.js now supports the Web standard `Request` and `Response` APIs. To simplify Vercel Functions, we now support a unified function interface that accepts a `Request` and produces a `Response`:

api/hello.ts

```
export async function GET(request: Request) {  const res = await fetch('https://api.vercel.app/blog', { ... } )  const data = await res.json()  return Response.json({ data })}export async function POST(request: Request) {  // Can also define other HTTP methods like PUT, PATCH, DELETE, HEAD, and OPTIONS}
```

Vercel Functions now support a unified, isomorphic signature

This API interface is similar to Next.js Route Handlers. You can read cookies, headers, and other information from the incoming request using Web APIs. The Web API signature enables you to use MDN, ChatGPT, or other Large Language Models (LLMs) to easily create APIs based on a common standard.

api/hello.ts

```
export async function GET(request: Request) {  // Read headers  const token = await getToken(request.headers);  // Set cookies  return new Response('Hello Vercel!', {    status: 200,    headers: { 'Set-Cookie': `token=${token.value}` },  });}
```

Learn the Web standard APIs and reuse your knowledge across frameworks

The existing APIs for Serverless and Edge Functions are still supported and **do not require changes**. To start using the new signature:

## [Link to heading](#zero-config-function-streaming)Zero-Config Function Streaming

[Earlier this year](https://vercel.com/blog/streaming-for-serverless-node-js-and-edge-runtimes-with-vercel-functions), we launched support for HTTP response streaming for Vercel Functions.

Support for streaming responses has enabled [building chat interfaces on top of LLMs](https://sdk.vercel.ai/docs), [improving initial page load performance](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model) by [deferring slower or non-critical until after the first paint](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming), and much more.

![Comparison between a non-streaming and streaming HTTP response ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FNsyhwYpQewiSNpPLBLF1b%2F8a443223fa5b48c18e9e58a3dcd93c01%2FBlog_Graphics.png&w=1920&q=75)![Comparison between a non-streaming and streaming HTTP response ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fl44Sp8MrrZJTWHCb6Kt0y%2F112bf17e865021de4c8a3bf85714587b%2FBlog_Graphics.png&w=1920&q=75)

Comparison between a non-streaming and streaming HTTP response

Vercel Functions support streaming for both Node.js and Edge runtimes with zero additional configuration. This includes the new Web API signature.

Learn more about [streaming on the web](https://vercel.com/blog/an-introduction-to-streaming-on-the-web), view our [streaming documentation](https://vercel.com/docs/functions/streaming), or explore [templates for streaming](https://vercel.com/templates/next.js/partial-prerendering-nextjs) with frameworks like Next.js, SvelteKit, Remix, and more.

## [Link to heading](#long-running-functions)Long Running Functions

Pro customers can now run Vercel Functions for **up to 5 minutes**.

api/hello.ts

```
export const maxDuration = 300; // 5 minutesexport async function GET(request: Request) {  // ...}
```

You can run functions for up to five minutes on Pro

We recently also improved the [default function duration](https://vercel.com/changelog/serverless-functions-can-now-run-up-to-5-minutes) to prevent unintentional usage, as well as launched [new spend management controls](https://vercel.com/changelog/spend-management-now-available-for-pro-users) to receive SMS notifications or trigger webhooks when you pass a given spend amount on your function usage.

Further, with the launch of [Vercel Cron Jobs](https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available), you can run any task on a schedule which calls your Vercel Function.

Learn more about [configuring the maximum duration](https://vercel.com/docs/functions/configuring-functions/duration) for Vercel Functions.

## [Link to heading](#faster-cold-starts)Faster Cold Starts

Vercel Functions now have faster cold boots, with improvements to our Managed Infrastructure for all frameworks and open-source optimizations for Next.js.

The Next.js App Router bundles server code used for APIs and dynamic pages together. We’ve improved the heuristics for smart bundling of external dependencies and the server runtime, as well as reducing the total size of the server runtime.

When comparing Next.js 13 versus the latest Next.js 14 changes, we’ve seen **twice as fast** **cold boot times** as well as smaller function bundles.

Further, Runtime Logs on Vercel now show detailed [request metrics](https://vercel.com/changelog/metrics-for-outgoing-requests) giving you visibility into how long individual `fetch` requests take. This is often the source of a slow to respond function, and not necessarily the function startup time.

For Next.js users, [upgrade to the latest version](https://nextjs.org/docs/app/building-your-application/upgrading). If you are using the App Router, there is no configuration required. For the Pages Router, you’ll need to use the `experimental.bundlePagesExternal` flag.

## [Link to heading](#automatic-regional-failover)Automatic Regional Failover

Vercel's [Edge Network](https://vercel.com/docs/edge-network/overview) is resilient to regional outages by automatically rerouting traffic for static assets. We are enhancing this further with support for Vercel Functions.

Vercel Functions with the Node.js runtime can now automatically failover to a new region in the instance of regional downtime. Failover regions are also supported through [Vercel Secure Compute](https://vercel.com/docs/security/secure-compute), which allows you to create private connections between your databases and other private infrastructure.

[Learn more about this feature](https://vercel.com/docs/functions/configuring-functions/region#automatic-failover) or about how [Vercel helps improve your resiliency](https://vercel.com/blog/effortless-high-availability-for-dynamic-frontends).

## [Link to heading](#increased-logging-limits)Increased Logging Limits

Serverless Functions now support increased log lengths, enabling better observability into your application when investigating function logs. Previously, there was a 4KB log limit per function invocation, which could lead to truncated logs when debugging. With this change, it’s now easier to debug errors that include large stack traces.

![Quickly identify the root cause of persistent errors and customer issues with Logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3n28awVposDk7VIJT4Ht5J%2F931c69f5146569c11de3a06913db3166%2Flogs-light.png&w=1920&q=75)![Quickly identify the root cause of persistent errors and customer issues with Logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1XrlIDOjR0ineS36kEaZBv%2F1179b66f6cb3e1bbeb3d022918d708be%2Flogs-dark.png&w=1920&q=75)

Quickly identify the root cause of persistent errors and customer issues with Logs.

Learn more about [Runtime Logs](https://vercel.com/docs/observability/runtime-logs) on Vercel.

## [Link to heading](#conclusion)Conclusion

We're continuing to evolve our compute products at Vercel. This is the first of many more improvements planned to help you have low latency, instantly scalable, cost effective compute through Vercel Functions.