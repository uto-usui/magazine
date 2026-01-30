---
title: "Vercel Edge Middleware: Dynamic at the speed of static"
source: "https://vercel.com/blog/vercel-edge-middleware-dynamic-at-the-speed-of-static"
publishedDate: "2022-06-28"
category: "frontend"
feedName: "Vercel"
author: "Greta Workman"
---

4 min read

Jun 28, 2022

High-performance compute for routing, experimentation, and more.

Since we announced Middleware last October, we’ve seen 80% month-over-month growth and over 30 billion requests routed through Edge Middleware on Vercel during public beta. Customers like Vox Media, Hackernoon, Datastax, and HashiCorp are using Edge Middleware to have complete control over routing requests in their Next.js applications.

With the release of [Next.js 12.2](https://nextjs.org/blog/next-12-2), Vercel Edge Middleware for Next.js is now generally available (GA) for all customers. Edge Middleware is also available for _all_ frameworks—now available in public beta along with a suite of other edge-first tools.

## [Link to heading](#what-is-vercel-edge-middleware)**What is Vercel Edge Middleware?**

Edge Middleware helps developers escape lengthy configuration files to instead define routing rules like rewrites, redirects, and headers with code. When deployed to Vercel, Edge Middleware is automatically configured as a special set of Edge Functions.

Edge Middleware runs _before_ serving requests from the Edge Cache, giving it the ability to quickly route and rewrite requests to return pre-rendered pages. Some tasks that previously required a trip to the core data center or bulky client-side code can now be done at the edge, configured entirely by custom code.

## [Link to heading](#why-edge-middleware)Why Edge Middleware?

While in beta, over 100,000 developers used Edge Middleware on Vercel, including almost half of our Enterprise customers. It’s clear that dynamic Edge Middleware at the speed of static is changing how we build for the Web.  

> We've been using Edge Middleware to drive experiments and personalization on our marketing surfaces. We keep our ability to customize our content workflows while keeping the performance that Next.js on Vercel gives us.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3mbOQceQyAWpPczvFDKBFS/6a53ab010fb75f2a594cda97bd4c42c1/T02AAEL0P-U02M6NV7P0D-b399f0b06341-512.jpeg)
> 
> **Jon Eide Johnsen,** Growth Manager at Sanity.io

### [Link to heading](#experiment-at-the-edge)Experiment **at the edge**

Customers like **SumUp** and **Sanity** use Edge Middleware to personalize content at the edge through custom experimentation—even for otherwise-static content.

Based on the incoming request, Edge Middleware is able to connect to tools like LaunchDarkly, ConfigCat, Koala, Optimizely, Split, and more to run A/B tests for the current visitor. If the visitor is part of the split test, they’ll be routed to one of the possible variants from the edge server.

SumUp can bucket their users on the server side and rewrite the URL as necessary to show the appropriate page to each user immediately. Rather than needing to load heavy client-side libraries for personalization or deal with layout shift from validating whether the visitor was part of the current experiment or not, personalization at the edge helps you achieve great performance, and a great user experience.

Check out [this Middleware A/B test example](https://github.com/vercel/examples/tree/main/edge-functions/ab-testing-simple) to get started.

> With Edge Middleware, we can show the control or experiment version of a page immediately instead of using third-party scripts. This results in better performance and removes the likelihood of flickering/layout shifts.”
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/6qrBUDhtNDTBIsnnJ623BE/1e5458960a512e0071c81b40d7cdefbf/1628260108075.jpeg)
> 
> **Jillian Anderson Slate,** Software Engineer at SumUp

### [Link to heading](#localize-at-the-edge)**Localize at the edge**

When it comes to localizing content at the edge for their globally distributed customer base, **HashiCorp** is excited about the possibilities of Edge Middleware. The Edge Middleware API contains a geolocation object, pre-populated with the visitor's country, region, and city based on their IP address. This information can then be used to conditionally show or restrict content based on your company's regulatory requirements.

Rather than needing to integrate and pay for an additional service to geolocate requests, Vercel includes this functionality for all customers.

Check out this [Middleware localization example](https://github.com/vercel/examples/tree/main/edge-functions/i18n) to get started.

> The API for Middleware is pretty intuitive, it allows developers to build features without worrying too much about framework-specific details since it conforms to the same standard that browsers use for requests and responses.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3OVlHeVvO5fmC19OLVSeXq/9d7458a627a9a7207b9a58450082c468/EF1GCKJNM-U02KD0ZLQQM-20664329f239-512.jpeg)
> 
> **Dylan Staley,** Software Engineer at HashiCorp

### [Link to heading](#authenticate-at-the-edge)**Authenticate at the edge**

With Vercel Edge Middleware, authentication at the edge is fast and reliable. When a visitor makes a request to an application, Edge Middleware validates the incoming request to check if the visitor has access to view the content. If they don’t, Edge Middleware routes visitors to a page explaining that they’re not authorized, _even_ for CDN-cached content.

Rather than having to wait to authorize on the client-side or authorize on the origin server, requests can be validated close to the customer at their nearest edge in the Vercel Edge Network.

Get started with this [Middleware authentication example](https://github.com/vercel/examples/tree/main/edge-functions/basic-auth-password).

## [Link to heading](#agility-for-all-frameworks)Agility for all frameworks

We're working to bring more capabilities to the edge, to give developers the ability to choose what's best for their application, without having to factor in tradeoffs in latency and performance.

### [Link to heading](#edge-api-routes)Edge API Routes

Often, moving API routes to the edge will drastically reduce latency and improve performance. With Edge Functions on Vercel, we're giving you the power to choose which runtime is the right one to use for your application _directly_ within your code.

```
import { NextRequest } from 'next/server';export default (req: NextRequest) => {  return Response.json({    name: `Hello, from ${req.url} I'm now an Edge Function!`,  });};export const config = {  runtime: 'experimental-edge',};
```

Build API Routes at the edge, with the new Edge Runtime

Together with traditional Serverless Functions and static caching, Vercel is working to bring granular control over your end-user experience without leaving your code.

### [Link to heading](#edge-for-all-frameworks)**Edge for all frameworks**

We believe in the power of edge-first capabilities, and tools built with the edge in mind. We’re working with framework authors to give them tools to access the Vercel primitives, and build edge functionality into any framework.

With this release, we’re also bringing Edge Middleware and Edge Functions to the Vercel CLI, which allows you to build edge capabilities into your deployment no matter what framework you’re building with. Add a `middleware.js` or `.ts` file to your project, run `vercel dev`, and start building for the edge today.

```
export default function middleware(request) {  // Construct the url  const url = new URL(request.url);  // Only run the middleware on the home route  if (url.pathname === '/') {    // Store the country where will be redirecting    let country = request.headers.get('x-vercel-ip-country').toLowerCase();    // Update url pathname    url.pathname = `/${country}.html`;    // Return a new redirect response    return Response.redirect(url);  }}
```

Edge Middleware can be added to any application, using any framework

We’re helping framework authors build dedicated support for the edge with tools to let them build native edge functionality for their users. Frameworks like Svelte, Nuxt, and Astro have already begun implementing support for Edge Middleware and Edge Functions.

## [Link to heading](#how-to-get-started)**How to get started**

For customers who have started using Edge Middleware while it was in beta, we’ve created an [upgrade guide](https://nextjs.org/docs/messages/middleware-upgrade-guide) to help migrate to the new API for Next.js 12.2. For users new to Edge Middleware, [check out our quickstart guides](https://vercel.com/docs/concepts/functions/edge-middleware/quickstart).

Every Vercel account has 1 million monthly Middleware invocations included for _free_; Pro and Enterprise teams can [pay for additional usage](https://vercel.com/pricing). While still in beta, Edge Functions will be free to use.

Whether you’re using Vercel Edge Middleware to authenticate, personalize, or localize at the edge, now you can provide tailor-made experiences at the speed of static. You have the power to serve the exact end-user experience you envisioned, every time.