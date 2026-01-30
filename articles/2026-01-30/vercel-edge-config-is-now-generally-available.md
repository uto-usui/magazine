---
title: "Vercel Edge Config is now generally available"
source: "https://vercel.com/blog/vercel-edge-config-is-now-generally-available"
publishedDate: "2023-04-06"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

2 min read

Apr 6, 2023

A globally distributed data store for low latency experimentation.

Configuration data is used to control everything from A/B testing and feature flags to advanced rewrites and bespoke request-blocking rules. However, traditional solutions for managing configuration data can be slow, unreliable, and difficult to scale, which can negatively impact the user experience, latency, and overall effectiveness of your website.

Today we’re announcing the general availability of [Edge Config](https://vercel.com/docs/concepts/edge-network/edge-config), a new solution for managing configuration data in the cloud designed to be ultra-fast, reliable, and scalable, which can help improve your website's performance and efficiency.

```
import { NextResponse, NextRequest } from "next/server";import { get } from "@vercel/edge-config";export async function middleware(request: NextRequest) {  if (await get("showNewDashboard")) {    return NextResponse.rewrite(new URL("/new-dashboard", request.url));  }}
```

Vercel Edge Config has a simple API to get started quickly, shown here with Edge Middleware.

Edge Config is a globally distributed, ultra-low latency data store for configuration data. It's optimized for fast, inexpensive reads and infrequent writes, making it perfect for managing experimentation and configuration data in modern web applications. Unlike traditional solutions for managing configuration data, Edge Config enables _dynamic_ data storage alongside your functions, which means that your data is actively replicated to all of Vercel's regions before it's requested. This ensures that your data will always be available instantly, no matter where your users are located.

> LaunchDarkly and Vercel’s mutual enterprise customers now have a way to deploy feature flags and experiments at the edge with zero latency. Every company is becoming a software company and this integration will further our joint mission to empower companies to ship and iterate applications at lightning speed.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2aapulSG2AcioqnUPS5rnd/c4cd30722cff383f37e1ece2aa54c7f6/image.png)
> 
> **John Kodumal,** Co-Founder and CTO at LaunchDarkly

-   **Make your experimentation near-zero latency:** Most lookups return in 0ms, and 99% will return in under 10ms. You get nearly the performance of static configuration with the convenience of updating it from your experimentation tool, from our API, or from our UI.
    
-   **Make changes without a new deployment:** Changes to Edge Config are pushed to every region within seconds, so that you can take advantage of them without needing to deploy your entire site.
    
-   **Integrate with your experimentation tool:** Automatically populate the Edge Config connected to your project with the experiment’s evaluation rules. We can then fetch our [experiments](https://vercel.com/blog/zero-cls-experiments-nextjs-edge-config) in our code easily by integrating directly with [Statsig](https://vercel.com/integrations/statsig)—meaning you make changes in the Statsig interface, and you can query the values lightning-fast from Edge Config within Edge Middleware.
    

> Combining Statsig with Next.js and Vercel Edge Config unlocks a high-performance feature management and experimentation engine in a way that was just not possible before. Our customers are using the integration to control releases and automate experimentation with near zero latency. The impact is immediate when running experiments on landing pages, UX optimizations, URL redirects, and more.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/wYL0NaCHDaSBahgaJCJUZ/cf8f8780b120af4618de6b9cc4882023/image.png)
> 
> **Vijaye Raji,** Founder and CEO at Statsig

We’re continuing to work with integration partners for dynamic personalization at the edge. [Split](https://vercel.com/templates/next.js/ab-testing-split) is currently upgrading their integration to include support for Edge Config and we are happy to announce a LaunchDarkly integration will be available at the end of April.

> The globally consistent and dynamic nature of the data storage offered by Edge config makes it the perfect fit for Split feature flags SDK to work at the edge, providing users near zero latency to serve both feature flag and experimentation use cases for Vercel users leveraging middleware logic.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/6PkXHk7uH0jyihtHJsXVG6/55377f861e17570f4717ebe3200f639c/image.png)
> 
> **Pato Echague,** Co-Founder and CTO at Split

## [Link to heading](#dynamic-routing-with-edge-middleware)Dynamic routing with Edge Middleware

Combining Vercel Edge Middleware with an ultra-low latency data store opens up numerous other options to control your routing dynamically. For example, you can add blocked IPs and user-agents in Edge Config and make changes without needing to deploy your site. In your middleware you can query the entire configuration list at once then reject those in middleware with minimal overhead.

```
import { getAll } from "@vercel/edge-config";export async function middleware(request: Request) {  const [userAgents, ipAddresses] = await getAll(["userAgents", "ipAddresses"]);  if (    userAgents.includes(request.headers.get("user-agent")) ||    ipAddresses.includes(request.ip)  ) {    return new Response("Denied", { status: 403 });  }}
```

Vercel Edge Config can be used to implement advanced security rules like geolocation blocking.

## [Link to heading](#get-started-with-edge-config)Get Started with Edge Config

Edge Config is available to every Vercel account. Hobby users can perform 50,000 reads per month. Pro and Enterprise users can perform 1,000,000 reads per month, with additional usage available for an additional charge.

You can see the number of reads and writes for your Edge Config in your account dashboard.

To get started with Vercel, deploy [an example](https://vercel.com/templates/edge-config) or check out our [documentation](https://vercel.com/docs/concepts/edge-network/edge-config).