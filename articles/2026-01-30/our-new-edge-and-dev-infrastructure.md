---
title: "Our new Edge and Dev infrastructure"
source: "https://vercel.com/blog/new-edge-dev-infrastructure"
publishedDate: "2020-07-21"
category: "frontend"
feedName: "Vercel"
author: "Matheus Fernandes"
---

4 min read

Jul 21, 2020

Vercel [was born](https://vercel.com/blog/zeit-is-now-vercel) to help frontend teams succeed at scale. From the ideal developer experience on localhost, to the **best performance for your end-user via our Global Edge Network**.

Today we are introducing major end-to-end enhancements, starting with a **realtime developer workflow** (with Next.js and Vercel CLI) and finishing with **serving pages up to 6x faster**.

## [Link to heading](#our-new-dev-experience)Our new dev experience

While we've seen low-level cloud infrastructure dramatically improve in the serverless era, developer experience has consistently taken a backseat.

Features now standard for a performant and dynamic frontend, like CDN caching or serverless functions, have been practically impossible to develop locally.

These limitations inspired our investment into Next.js and the Vercel CLI dev experience.

### [Link to heading](#next.js:-designed-for-the-cloud-–-and-localhost)Next.js: designed for the cloud – and localhost

Next.js was designed to bring the entire modern development stack to your local machine, with unmatched performance.

With our new **Fast Refresh** capability, changes to complex UIs and components are reflected in a matter of milliseconds, up to **10x-20x faster** than other React frameworks.

Next.js also brings all the capabilities and optimizations of a modern edge network to localhost. For example, when you use [incremental static regeneration](https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta) or [API routes](https://nextjs.org/docs/api-routes/introduction), you never need to reach for additional tooling or be left wondering what will happen when you push and deploy.

### [Link to heading](#vercel-cli:-enhanced-local-dev-and-env-sync)Vercel CLI: enhanced local dev and env sync

While Next.js's `next dev` capability comes with built-in support for functions and other Vercel capabilities, other frameworks do not. In those situations, you can run [Vercel CLI](https://vercel.com/cli)'s `vercel dev` to replicate Vercel on localhost.

For example, if you use Gatsby or Vue.js, you can work with functions simply by creating an `api/my-function.js` file, running `vc dev` and then navigating to `http://localhost:3000/api/endpoint`.

With the new Vercel CLI 19, you can now enjoy:

-   **Faster startup**. `vc dev` invokes your framework's dev command (if any) more quickly
    
-   **Better stacktraces.** Made a mistake in a function? We now tell you _exactly where_
    
-   **Improved memory usage.** Long development sessions are now lean and stable
    
-   **Seamless env sync.** `vc dev` now automatically pulls your dev env from the cloud
    
-   **Speedy invocations.** Your Node.js functions are much faster to run locally
    

## [Link to heading](#our-new-edge-infrastructure)Our new edge infrastructure

A great developer workflow is a means to an end: creating a delightful product that users enjoy. Delivering on both with no extra work is the primary goal of the Vercel platform.

We have completely overhauled our edge infrastructure, and done so entirely without disruption to our user traffic. Vercel processes **4.5+ billion requests every week**, but now it does so much faster.

### [Link to heading](#vercel's-own-anycast-ip-range)Vercel's own Anycast IP range

Not all IPs are created equal. While the IP that identifies your computer or phone is linked to one exact location, some are special.

IPs like **8.8.8.8** (Google Public DNS) have minimal latency, no matter where in the world you use them. Now joining those ranks is Vercel's very own IP ranges.

If you've set up a domain recently with Vercel, you might have noticed we now offer you `A` and `CNAME` records (selected from a pool of optimized Anycast IPs tailored to your plan and project).

In practice, all sites and APIs served by Vercel enjoy:

-   **Faster page loads**. Up to _6x faster_– depending on location, ISP and DNS involved
    
-   **Optimal routing**. We now route at the most fundamental layer of internet infrastructure
    
-   **Apex support**. Use `A` records with confidence, no need for `ALIAS` or `ANAME` records
    
-   **Global redundancy.** We automatically re-route traffic if any of our global regions are down
    
-   **Improved interoperability**. Use Route 53, Cloudflare, CrowdStrike, etc with no loss in efficiency
    

### [Link to heading](#improved-handling-of-large-attacks-and-traffic-spikes)Improved handling of large attacks and traffic spikes

In addition to a great dev experience and optimal end-user performance, customers are drawn to Vercel to stop worrying about scaling infrastructure.

On one hand, due to increasing popularity of our service, we have upgraded our global network to automatically scale and manage large amounts of traffic, including unpredictable spikes.

On the other hand, as the number of sites we serve increases, so do the chances of malicious attacks – especially DDoS. We have made huge improvements to our technology to stop them.

## [Link to heading](#conclusion)Conclusion

If your journey begins with Next.js, Vercel has ensured your dev experience is unmatched. From realtime editing, to unique optimizations and features that replicate what's possible at the edge.

The Vercel CLI has likewise improved, with its new capability to automatically sync your team's environment and speed improvements when using other frameworks or just writing functions.

As far as the end-user is concerned, our edge is now faster, more robust and more versatile than ever before. Your pages just load faster and more reliably.

Remarkably, all the changes we outlined went live with zero interruptions – to visitors or developers. By choosing Vercel, you choose to focus on improving your product, while we take care the rest.