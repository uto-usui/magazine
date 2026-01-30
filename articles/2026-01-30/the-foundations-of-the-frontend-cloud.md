---
title: "The foundations of the Frontend Cloud"
source: "https://vercel.com/blog/the-foundations-of-the-frontend-cloud"
publishedDate: "2023-11-21"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

7 min read

Nov 21, 2023

Part 1 of the developer's guide to a future-proofed stack.

Core web app decisions tend to center the backend, due to its complexity and impact over huge swaths of the business.

However, frontends have grown far more important and complex in their own right. When not prioritized, the intricate infrastructure around them can quickly spin out of control, dragging teams into untold amounts of tech debt.

As [decoupled architecture](#why-decouple-the-frontend-from-the-backend...) becomes more common, developers are turning to the Frontend Cloud to automate away the behind-the-scenes hassles of creating and growing dynamic websites.

Instead of [managing infrastructure](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure) as a separate step of the development process, the Frontend Cloud provisions global infrastructure _for you_, [based on your existing application code](https://vercel.com/blog/framework-defined-infrastructure).

This approach to web development [massively increases developer velocity](https://vercel.com/blog/iterating-from-design-to-deploy), allowing your team to experiment safely and meet shifting market demands. Teams of all sizes can effortlessly scale global apps while maintaining the highest possible bars for performance, personalization, and security.

**You can think of the backend cloud as your cost center and the Frontend Cloud as your profit center.**

In this blog series, we'll break down why moving to the Frontend Cloud is the **last business infrastructure transformation you’d ever need to make**. We'll dig into the Frontend Cloud by way of:

-   Foundational concepts like framework-defined infrastructure (FdI) and serverless architecture (this article)
    
-   User experience (UX) wins through performant and personalized applications delivered at the edge
    
-   Faster and more sustainable iteration through a complete Developer Experience (DX) platform
    
-   Reliability and security to power even the largest applications
    

[

**Hoping for a higher-level overview?**

The Frontend Cloud advantage redefines web development for the modern enterprise.

Learn More



](https://vercel.com/resources/the-frontend-cloud-advantage)

## [Link to heading](#what-is-a-modern-frontend)What is a modern frontend?

In the context of the Frontend Cloud, _Frontend_ is far more than what you see on your screen. **_Frontend_** **encompasses all components of a system that communicate directly with external** **_clients_** **to that system, whether those clients are user-facing interfaces or machine-to-machine interactions.**

This means that frontends include services such as:

-   An application’s user interface, whether that application is for end users or internal only
    
-   Any part of an app that runs on a user's device
    
-   API services that respond to external clients
    
-   User-facing reverse-proxies such as CDNs or ingress firewalls
    
-   Servers that respond to end users to perform tasks such as server-side rendering or asset distribution
    
-   Services such as [image optimization](https://vercel.com/docs/image-optimization) which are technically backend to the above but are specialized for frontend concerns
    

There are [more granular ways to distinguish between frontends and backends](https://www.industrialempathy.com/posts/frontend-backend/), but as you can see, frontends encapsulate far more infrastructure than ever before.

When we talk about the Frontend Cloud, we’re referring to the frameworks, workflows, and infrastructure that let you build and scale the web’s most demanding frontend workloads.

This isn't about reinventing the wheel. Instead, it's about collecting decades of best practices to give you the smartest possible defaults for your frontend infrastructure.

Taking advantage of this, however, first requires breaking your frontend free from the (often constraining) requirements of backend systems.

## [Link to heading](#why-decouple-the-frontend-from-the-backend...)Why decouple the frontend from the backend...

Monolithic architecture—where backend logic and application rendering are handled in one large codebase—has long been a go-to for software devs. Monoliths are easy to set up since they can be written in a single language, but they begin to fracture when faced with rapid scaling, due to:

-   Unforeseen ripple effects with _any_ code change, regardless of where in the stack it lies.
    
-   Longer testing cycles and slower growth.
    
-   Tangled dependencies where teams block each others' work.
    
-   The breadth of surface area developers are required to understand.
    

![Headless architecture allows teams to work more independently of each other, which means faster iteration.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4cVjv6MR2ur9WjhkRvEBhf%2Fca052d1a2a37d96d91d4e6cdf732154c%2F1920x1004-Blog_Graphic_2_lightmode_2x.png&w=1920&q=75)![Headless architecture allows teams to work more independently of each other, which means faster iteration.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1dj2g9Wh77zKvUZwYbz00K%2F8e63b72cf5cd9241a9ccbcc5fbe5939a%2F1920x1004-Blog_Graphic_2_2x.png&w=1920&q=75)

Headless architecture allows teams to work more independently of each other, which means faster iteration.

**Frontends need to scale and iterate much faster than backends**, and freeing up their ability to grow from your application’s backend offers many benefits:

-   Your frontend performance, reliability, and scale can all be independent of your backend code.
    
-   Your frontend and backend teams can work independently of one another, and [with the proper frontend architecture](https://vercel.com/blog/how-to-scale-a-large-codebase), frontend teams can also work separately from each other.
    
-   Your frontend code can be written in one of many frontend-optimized languages, which have vast communities of tools and plugins—as well as a larger pool of qualified developers to hire.
    
-   Onboarding is faster: frontend devs only need to know the frontend language and they don’t need to understand the backend architecture.
    
-   The points of entry to your backend, where your secure customer data resides, can be highly controlled and accessible by APIs that must play by the rules of your backend.
    
-   Faster frontend iteration means better developer _and_ user experiences. Releases have fewer change-sets and bugs are easier to address.
    

[

**Why are innovators going headless?**

Learn why headless architecture is a great fit for nimble organizations that want flexibility and speed, as well as a future-proofed technology stack.

Read More



](https://vercel.com/resources/why-innovators-are-going-headless)

### [Link to heading](#...and-how-to-connect-them-again)...and how to connect them again

As far as the connection between backend and frontend goes, this can be handled with a middleware API layer—almost like a socket converter for your backend. Your frontend and backend engineers can continue to work in the ways they know, and the team managing the API layer can make sure frontend and backend connect.

However, once your frontend is decoupled from the backend, you have the opportunity to move it into a frontend framework, which allows you to write backend-connecting APIs or [otherwise access backend data](https://vercel.com/blog/understanding-react-server-components#improved-data-fetching-with-next.js) directly from your frontend code.

## [Link to heading](#why-fit-your-frontend-into-a-framework)Why fit your frontend into a framework?

After decoupling your frontend, you’ll find yourself still with thousands of options for how to build out your architecture.

A framework, like [Next.js](https://nextjs.org/), [Nuxt](https://nuxt.com/), or [SvelteKit](https://kit.svelte.dev/), offers sensible defaults for your underlying code (in this case written in React, Vue, and Svelte respectively).

The most popular frameworks are _open-source_ and _continually updated_ by the communities surrounding them. When you use a framework, you get the latest and best optimizations from the tech community available to you to use.

If words like “latest optimizations” immediately send you into panic about updating your codebase all the time, we understand. That’s why the best frontend clouds also support legacy versions of your favorite frameworks, until your whole team is ready to upgrade.

The [framework you choose](https://vercel.com/docs/frameworks) ideally has this mix: open-source with large and stable backing.

Frameworks help you build faster, onboard faster, and provide rules that others can be familiar with before ever joining your company. **The more standardized your codebase, the easier it is to onboard new and existing talent to build it.**

Frameworks also come with their own ecosystems of third-party plugins (usually open-source) that work natively within the code. Conforming to standard practices benefits you in the sheer number of good tools you can choose from.

That’s all only one part of the framework story, though. The other is this: frameworks give a _predictable build output_. In other words, no matter how different your, for example, SvelteKit project might be from another SvelteKit project, both will build into code that has identical patterns.

This is crucial for the Vercel Frontend Cloud’s true differentiator from other solutions: automatic infra.

## [Link to heading](#what-is-automatically-provisioned-infrastructure)What is automatically provisioned infrastructure?

If your frontend framework can provide a predictable and standardized output, that means the infrastructure that handles deploying your frontend can _also_ be standardized. In frontend-cloud terminology, we refer to this practice as [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) [(FdI)](https://vercel.com/blog/framework-defined-infrastructure).

![Flowchart showing the process from user code to automatically inferred infrastructure.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5TaYti4MjfS8nl8N0yzZYY%2F8ee8f4cabc825ec96d5fa57564dd7d33%2FInline-graphic-light-framework.png&w=1920&q=75)![Flowchart showing the process from user code to automatically inferred infrastructure.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F48QBZdO3A87sdKxOBobtYd%2Fd386fda64bd9f233216fc9f663ed1ac0%2FInline-graphic-dark-framework.png&w=1920&q=75)

Flowchart showing the process from user code to automatically inferred infrastructure.

In FdI, every time you build within your [framework of choice](https://vercel.com/docs/frameworks#list-of-supported-frameworks), the Frontend Cloud _automatically provides_ _all needed frontend infrastructure_ to successfully deliver your application to the world.

This automated, managed infrastructure differentiates the Frontend Cloud from more traditional hosting services. Since infrastructure is built _according to_ the output of your code, it performs as efficiently as possible.

Every [service the Frontend Cloud provides](https://vercel.com/docs/all-products) is therefore _native_ to your framework, and you can access its features simply by writing framework code.

If you can do it in your chosen framework, there’s automatic infra for it.

## [Link to heading](#what-is-serverless-architecture)What is serverless architecture?

FdI is powered by serverless architecture. Let's break down how.

_Serverless_ refers to a method of building and operating apps where developers don’t have to manage their own servers. Instead, devs focus on writing and deploying code, while cloud providers handle the allocation of resources based on that code—like servers, databases, and other in-memory storage—needed to run apps at _any_ given scale.

**Serverless only provisions server resources when users are actively making requests**_**.**_ Times of no traffic cost nothing, and times of high traffic get automatically managed without your intervention.

Compare that to developers using serverful architecture, who have to update and maintain each container they deploy, including its system settings and dependencies. Scaling containers often requires using some kind of orchestration platform like Kubernetes, while serverless scaling is a fully automatic affair.

So, how does it work?

Instead of servers sitting separately from the application, waiting to get used, serverless code is executed as needed in response to events such as HTTP requests, changes in database state, or user activity.

This means that [serverless functions](https://vercel.com/docs/functions/serverless-functions) are:

-   **Stateless:** They don’t store context between runs, though they _can_ retrieve persistent data from external sources.
    
-   **Isolated:** Every function is defined independently to perform its intended task.
    
-   **Event-driven:** They’re _only_ triggered when called. This means there is _no_ concept of a server being over- or under-provisioned.
    

### [Link to heading](#why-is-the-frontend-cloud-serverless)Why is the Frontend Cloud serverless?

When you run a serverless, [decoupled frontend](#why-decouple-the-frontend-from-the-backend) that doesn't need to store its own persistent data, that frontend is far more predictable and easier to unit test.

Functionality doesn't have hard-to-trace side effects or mutations over time—each run of a serverless function is executed from that function's initial state.

This is why serverless can scale down to zero when unused. It's also how the management of serverless functions—their deployment, execution, scaling, and termination—can be automatically orchestrated in response to external events.

In the context of FdI, the Frontend Cloud provisions specific, immutable infrastructure for each run of a serverless function.

Because the function is self-encapsulated, the infrastructure knows exactly what needs to happen for that function to succeed, and you can code within your framework without worrying about _any_ infrastructure.

This makes serverless faster to develop, easier to manage, and better for developer and user experience alike.

> Frontend developers have always understood the power of the server for better end-user experiences and SEO, but so often a globally distributed edge network has been prohibitive for everyone but the largest companies. Now, with innovations like serverless data and React Server Components, we’re seeing the industry shift back to what made the web great to begin with: faster, more personalized experiences.​​​​‌‍​‍​‍‌‍
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg)
> 
> **Guillermo Rauch,** Vercel CEO

[In the next article](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud), we'll explore how the Frontend Cloud dramatically lifts user experience and allows for performant personalization at a global scale—by bringing all infrastructure into a cohesive and secure environment, complete with a robust caching architecture.