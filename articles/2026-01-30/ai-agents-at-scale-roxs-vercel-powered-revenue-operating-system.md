---
title: "AI agents at scale: Rox’s Vercel-powered revenue operating system"
source: "https://vercel.com/blog/ai-agents-at-scale-roxs-vercel-powered-revenue-operating-system"
publishedDate: "2025-09-16"
category: "frontend"
feedName: "Vercel"
author: "Jerry Zhou"
---

3 min read

Sep 16, 2025

[Rox](https://www.rox.com/) is building the next-generation revenue operating system. By deploying intelligent AI agents that can research, prospect, and engage on behalf of sellers, Rox helps enterprises manage and grow revenue faster.

From day one, Rox has built their applications on Vercel. With Vercel's infrastructure powering their web applications, Rox ships faster, scales globally, and delivers consistently fast experiences to every customer.

## [Link to heading](#executing-faster-with-vercel)**Executing faster with Vercel**

For Rox, speed is the advantage. The team ships new features every week and needed infrastructure that wouldn’t slow them down. Vercel lets them focus on building, while reliably serving their Next.js apps at scale.

Global performance was another critical factor. With customers in the Middle East, Europe, and beyond, Rox required infrastructure that could deliver consistently fast experiences across regions. Vercel’s [edge network and CDN](https://vercel.com/docs/cdn) provided that reach without extra setup.

Just as important as the speed was the developer experience. From configuration to debugging, Vercel’s developer experience tools allowed Rox’s engineers to spend less time on infrastructure and more time building. Features like image optimization, serverless caching, and [preview environments](https://vercel.com/docs/deployments/environments) gave the team confidence to move quickly and ship with minimal overhead. 

Frontend deployments now take only 3-5 minutes (fast enough to push updates right before a customer demo), and post-build hooks make it easy to run end-to-end tests on preview environments with minimal setup.

> Vercel has a very solid reputation in the tech ecosystem. All of the highest velocity engineering teams are using it to host their web applications.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/qbrA6qbEcVtxJePUkzMJ0/882bb3e0629f671d747f9d22d938d77f/Jerry_Headshot.png)
> 
> **Jerry Zhou,** Software Engineer at Rox

## [Link to heading](#scaling-ai-workflows-with-serverless-functions)**Scaling AI workflows with serverless functions**

A core capability of Rox’s Revenue OS is instantaneous research across thousands of prospects. Rox spins up hundreds to thousands of AI agents that analyze companies in real time.

This creates a technical challenge: most browsers are constrained to executing 100 concurrent calls with HTTP/2.

![The old way of managing requests: scaled linearly to the number of entities and and requests would often stall. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Bl9Yp022DjrsqGplZNGTA%2Fa1a83b08834762d5a56c9592a0d0c1a2%2FRox_-_old_request_-_light.png&w=1920&q=75)![The old way of managing requests: scaled linearly to the number of entities and and requests would often stall. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3PLXcNPXakPXr1wax8Rx3m%2F2afe719223868496c735981c65d9ae18%2FRox_-_old_request_-_dark.png&w=1920&q=75)

The old way of managing requests: scaled linearly to the number of entities and and requests would often stall.

To avoid stalled requests, Rox uses [Vercel Serverless Functions](https://vercel.com/docs/functions) to batch these calls and stream results back to the client.

The result is a faster, more consistent experience. Whether it’s a team in Dubai or an enterprise in London, Rox users receive research results in seconds, powered by Vercel’s global network and caching.

![Now: Batching requests with Vercel Serverless](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7mYG1D95kuRdan9I8gzJWm%2Fa19ba71fc36d1c88f2f8bd212c73cff9%2FRox_-_batching_request_-_dark-1.png&w=1920&q=75)![Now: Batching requests with Vercel Serverless](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5WvbSB9hZJnnk7xyoH7eH6%2Fa732c26f28d7ab5194cfb9ec51baa8e1%2FRox_-_batching_request_-_dark.png&w=1920&q=75)

Now: Batching requests with Vercel Serverless

## [Link to heading](#conversational-ai-with-the-vercel-ai-sdk)**Conversational AI with the Vercel AI SDK**

Rox also uses the [Vercel AI SDK](https://ai-sdk.dev/) to power Rox Command, Rox’s new chat-driven interface that lets users ask questions and take actions - such as pulling up a summary of all interactions with a prospect or generating a draft for an outreach email.

AI SDK makes it simple to stream responses from large language models, enabling Rox to deliver responsive, conversational AI experiences directly in the browser.

With Preview Deployments with comments, Rox could rapidly review new features in production-like environments. This accelerated their product feedback cycles and made it possible to ship Rox Command in weeks rather than months.

![Rox's Command tool helps perform deep research and take revenue-driving actions, built with the AI SDK.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4t54TmfQPDXzyam903vnMg%2Fc135a7322d62f1792c906549696f6d0f%2FScreenshot_2025-09-15_at_3.43.04%C3%A2__PM.png&w=1920&q=75)![Rox's Command tool helps perform deep research and take revenue-driving actions, built with the AI SDK.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F01k5KuyAPNAZnUKIDFKY9%2F730a9ded48c5b1273671a33481125fe3%2FScreenshot_2025-09-14_at_10.34.58%C3%A2__PM.png&w=1920&q=75)

Rox's Command tool helps perform deep research and take revenue-driving actions, built with the AI SDK.

By building on Vercel, Rox has improved its pace of innovation while ensuring global performance and reliability:

-   3-5 minute deploys, enabling hotfixes and features to go live even right before customer demos
    
-   2.5x reduction in P95 load speed
    
-   Rox Command feature shipped in weeks, not months, thanks to Preview Deployments and daily reviews that accelerated iteration.
    
-   Seamless multiregion performance, supporting users from Europe to the Middle East
    

For Rox, speed isn’t just a developer convenience, it’s a competitive edge. Their team is rapidly transforming how go-to-market organizations work with AI agents, and we’re thrilled to support their journey.

[

**Ship production-grade AI applications faster with Vercel**

Talk to our team to learn more about building AI-powered applications at your organization.

Contact Us



](https://vercel.com/contact/sales)