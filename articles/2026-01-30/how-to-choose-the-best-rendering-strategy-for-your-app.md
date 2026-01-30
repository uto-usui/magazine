---
title: "How to choose the best rendering strategy for your app"
source: "https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app"
publishedDate: "2024-07-23"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

10 min read

Jul 23, 2024

Optimizing performance in the way you deliver code.

Web rendering has evolved from simple server-rendered HTML pages to highly interactive and dynamic applications, and there are more ways than ever to present your app to users.

Static Site Generation (SSG), Server-Side Rendering (SSR), Client-Side Rendering (CSR), Incremental Static Regeneration (ISR), and experimental Partial Prerendering (PPR) have all been developed to optimize performance, SEO, and user experience in various situations.

Here, we'll explore the use cases and tradeoffs of each rendering strategy and peek into the future of content delivery.

**Article contents:**

-   [What is a rendering strategy?](#what-is-a-rendering-strategy)
    
-   [Defining each rendering strategy](#defining-each-rendering-strategy)
    
-   [When to use each rendering strategy](#when-to-use-each-rendering-strategy)
    
-   [Rendering with Next.js](#rendering-with-next.js)
    
-   [Real-world product rendering strategies](#real-world-product-rendering-strategies)
    

## [Link to heading](#what-is-a-rendering-strategy)What is a rendering strategy?

The term _rendering_ may seem like jargon, but at its core, it’s just a way to solve the web's fundamental challenge: **How do we turn** _**code**_ **into** _**content**_ **users can see and interact with in their browsers?**

If it helps, think of rendering strategies like different ways to serve a meal. You could:

-   Pre-cook everything (static rendering)
    
-   Refire cold plates (incremental static revalidation)
    
-   Cook dishes as orders come in (server-side rendering)
    
-   Give customers ingredients to prepare themselves (client-side rendering)
    

Each approach has its place, depending on the type of meal and the dining experience you want to create. And the best restaurants use a _combination_ of approaches to ensure timeliness, freshness, and allowing for customer preference.

Different rendering strategies work for different apps. Combining them together helps you balance factors like speed, data freshness, and interactivity. Understanding these strategies isn't about memorizing technical terms—it's about choosing the right tools at the right time to create the best possible user (and developer) experience.

## [Link to heading](#defining-each-rendering-strategy)Defining each rendering strategy

Let’s explore each rendering method in detail, focusing on its ideal use cases, benefits, and implementation considerations.

### [Link to heading](#what-is-static-site-generation-\(ssg\))What is Static Site Generation (SSG)?

SSG prerenders pages at build time, resulting in static HTML files that can be cached at the edge and served quickly and efficiently.

**Ideal use cases:**

-   Any page with content that changes very infrequently
    
-   Site layouts
    
-   Performance-critical marketing pages
    
-   Documentation or other sites that quickly rebuild
    

**Benefits:**

-   Fastest possible page loads
    
-   Excellent SEO performance
    
-   Reduced server load
    
-   Lowest infrastructure costs
    

**Implementation considerations:**

-   Increased build times for sites with a large number of pages
    
-   Content updates require a new build and deployment
    
-   Can be combined with client-side data fetching for dynamic elements, but this is slower than server-side fetching since each data request initiates a new roundtrip to the server
    

**Best practices:**

-   Consider ISR for frequently changing content or long build times
    

### [Link to heading](#what-is-incremental-static-regeneration-\(isr\))What is Incremental Static Regeneration (ISR)?

ISR allows you to update specific pages after you’ve built your site, meaning you don't have to rebuild to get new cached data. This combines the benefits of static generation with the ability to scale to millions of pages.

**Ideal use cases:**

-   When builds with SSG are too long
    
-   Ecommerce product pages
    
-   New websites
    
-   Large-scale content sites
    

**Benefits:**

-   Maintains the fast page loads of SSG
    
-   Allows for on-demand content updates without full rebuilds
    
-   Scales to large numbers of pages efficiently
    
-   Can be more cost-effective than SSR in some cases
    

**Implementation considerations:**

**Best practices:**

-   Favor on-demand over time-based revalidation—there’s almost always a _reason_ to change content that’s not a timer
    
-   Use static loading skeletons (React Suspense) for instances where the user misses the cache
    

[

**See ISR in action.**

Learn how to instantly update cached content on demand—without redeploying.

See Demo



](https://vercel.com/templates/next.js/on-demand-incremental-static-regeneration)

### [Link to heading](#what-is-server-side-rendering-\(ssr\))What is Server-Side Rendering (SSR)?

SSR generates the full HTML for a page on each request, allowing for real-time data and personalized content.

**Ideal use cases:**

-   When you are already revalidating ISR on the majority of user requests (i.e., you almost always need fresh data)
    
-   Highly personalized dashboard pages
    
-   Social media feeds
    
-   Real-time data visualizations
    

**Benefits:**

-   Always serves fresh, up-to-date content
    
-   Better for SEO and data load time than client-side fetches
    

**Implementation considerations:**

-   Slower load than SSG or ISR
    
-   [Time to First Byte (TTFB)](https://vercel.com/resources/how-vercel-improves-your-websites-search-engine-ranking#network-response-time-to-first-byte-\(ttfb\)) can be lacking
    
-   Consumes more server resources
    

**Best practices:**

-   Implement efficient caching strategies (e.g. Vercel KV) for frequently accessed data
    
-   Use streaming SSR to improve perceived performance (this is the default behavior with the Next.js App Router)
    
-   [Use React Suspense](https://vercel.com/blog/improving-interaction-to-next-paint-with-react-18-and-suspense) to render static pieces of your application while the client waits for server data
    
-   Optimize database queries and API calls to reduce render times
    

[

**See React Server Components in action.**

The Next.js App Router allows you to opt into better rendering patterns with streaming by default. This template can show you how.

View Demo



](https://vercel.com/templates/next.js/app-directory)

### [Link to heading](#what-is-client-side-rendering-\(csr\))What is Client-Side Rendering (CSR)?

CSR relies on JavaScript to render content in the browser (on the user’s device), offering high interactivity and responsiveness but with trade-offs in initial load time.

Importantly, CSR is not mutually exclusive with any other rendering strategy. Rather, it can be used on top of them to augment existing functionality.

**Ideal use cases:**

-   User interactions with elements on the page that require immediate feedback, where JavaScript can provide a faster response than waiting for a server roundtrip in SSR.
    
-   Admin dashboards with real-time data, such as the graphs in Vercel Analytics
    
-   Ongoing background tasks after initial load, such as an app like [Notion](https://www.notion.so/) which syncs content back to the server as the user writes
    

**Benefits:**

-   Highly interactive user experiences
    
-   Seamless transitions between application states
    
-   Real-time interactions with external data
    

**Implementation considerations:**

-   Initial load can be slower due to the JavaScript bundle needing to download before fetch can start
    
-   Optimizing Core Web Vitals can be challenging
    
-   Requires careful state management on the client
    

**Best practices:**

-   Lean on [Next.js code splitting](https://nextjs.org/learn/dashboard-app/navigating-between-pages#automatic-code-splitting-and-prefetching) to reduce initial bundle size
    
-   User server-side rendering for the initial load, then hydrate for interactivity (this can help with [Largest Contentful Paint](https://vercel.com/resources/how-vercel-improves-your-websites-search-engine-ranking))
    

### [Link to heading](#what-is-partial-prerendering-\(ppr\))What is Partial Prerendering (PPR)?

While still experimental, PPR aims to automatically optimize rendering strategies, potentially simplifying development decisions.

It does this by prerendering any static part of your page and then streaming in the dynamic content based on React Suspense boundaries.

You get all the benefits of static and dynamic in a single page.

**Ideal use cases:**

PPR is an enhancement on top of the other rendering strategies. Although it's still in development, we're hopeful that it will be something you'll want to toggle on by default for any Next.js application.

**Benefits:**

-   Instant page load (like SSG)
    
-   Seamlessly stream dynamic content in the order that makes sense (augmenting SSR)
    
-   Improved performance with reduced development overhead
    

**Current considerations:**

-   Still in research and development
    
-   May require code refactoring to opt in
    

**Preparation strategies:**

-   Begin drawing better Suspense boundaries in your application, fully distinguishing between static and dynamic content
    

[

**See Partial Prerendering in action.**

Partial Prerendering combines ultra-quick static edge delivery with fully dynamic capabilities, and we believe it will become the default rendering model for web applications.

View Demo



](https://vercel.com/templates/next.js/partial-prerendering-nextjs)

## [Link to heading](#when-to-use-each-rendering-strategy)When to use each rendering strategy

When deciding on a rendering strategy, consider the following factors.

-   **How often does this content change?** SSG is good for static content, ISR is great for periodically changing content, and SSR or CSR is best for real-time data. Lean on SSG and ISR as much as possible, and only introduce SSR when you need fresh to that moment data. (Note that these days, CSR is almost exclusively for responsive interactions—_not_ fetching external data.)
    
-   **Is the page critical for search engine visibility?** Even though Google can render client-side JavaScript, [your Core Web Vitals are still a major factor in determining your ranking](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://vercel.com/blog/how-core-web-vitals-affect-seo&ved=2ahUKEwjHpdq0-4-HAxXs8LsIHUesACoQFnoECBMQAQ&usg=AOvVaw3m3_s1uz4qA3I6HBxcH9Fx). Healthy CWVs are much easier to achieve on static- and server-rendered pages than on pages with client-side fetches to external data.
    
-   **How much user interaction is expected?** If your page is mostly static with minimal interaction, lean on SSG or ISR plus a little client-side JS. Otherwise, you may need SSR (with client-side hydration).
    
-   **What are the load time requirements?** For the fastest possible initial load, use SSG or infrequently-invalidated ISR. To balance fresh data and speed, use ISR or SSR (for up-to-date data). CSR can get you real-time data, but it often costs initial load.
    
-   **Does the content vary by user?** If you need personalized content, you'll likely use SSR or CSR. ISR can work in cases where you can cache personalized content, such as web app settings. SSG will not allow for personalization.
    

You can break down the key characteristics of each strategy a bit like this:

Feature

SSG

ISR

SSR

CSR\*\*

Build Time

Long

Varies

Short

Short

Time to First Byte

Fastest

Fastest\*

Slowest

Medium

Largest Contentful Paint

Fastest

Fastest\*

Medium

Slowest

Data Freshness

Static

Periodic/On-demand

Real-time

Real-time

Server Time / Compute

Lowest

Low

High

Lowest

Client-side Performance

Excellent

Excellent

Good

Varies

Interactivity

Limited\*\*\*

Limited\*\*\*

Full

Full

\* The first request after revalidation is equal to SSR speeds. All other requests equal SSG speeds.

\*\* Enhancement on top of other rendering strategies.

\*\*\* Can be enhanced with client-side JavaScript.

## [Link to heading](#rendering-with-next.js)Rendering with Next.js

As your web application grows and you want to mix and match rendering strategies, you'll need a flexible, powerful framework to handle all of them.

Next.js allows developers to leverage different rendering methods within a single application, as appropriate, on a per-page basis.

Key benefits of Next.js include:

-   **Performance optimization**: Built-in optimizations for images, fonts, scripts, code-splitting, data fetching, and more.
    
-   **Scalability**: Easily scales from small projects to large, complex applications.
    
-   **Consistent component architecture:** Use self-contained modules with all required reusable data anywhere. Unlike other frameworks, data isn't limited to page-level fetching.
    
-   **Future-ready**: Continuous updates to support emerging web standards and technologies. This includes the recent innovations behind PPR (experimental).
    

Most importantly, Next.js allows you to **choose your rendering strategy on a per-page basis**, giving you the most performant frontends on the web.

## [Link to heading](#real-world-product-rendering-strategies)Real-world product rendering strategies

Understanding rendering strategies in theory is one thing, but the true value lies in applying them effectively in real-world scenarios.

Let's explore how different industries can leverage component-level rendering methods with Next.js to create optimized, high-performance web applications.

### [Link to heading](#ecommerce)Ecommerce

Ecommerce platforms require a delicate balance between performance, SEO, and dynamic content. Here's how different rendering strategies can be applied:

**Static Site Generation (SSG):**

-   Homepage layout and static content
    
-   Category page templates
    
-   Static parts of product pages (descriptions, specifications)
    

**Incremental Static Regeneration (ISR):**

-   Product listings with periodic updates
    
-   Product pages with semi-frequent changes (price, stock status)
    
-   User reviews and ratings (regenerated periodically)
    

**Server-Side Rendering (SSR):**

-   Search results pages
    
-   Personalized product recommendations
    
-   Real-time inventory checks during checkout
    

**Client-Side Rendering (CSR):**

-   Shopping cart functionality
    
-   Product image galleries and zooming
    
-   Add-to-cart and wishlist interactions
    

**Implementation Example:** A product page could use SSR and cache the server response, ISR for price and inventory information (revalidated as those pieces of information change on the backend), dynamic SSR for personalized recommendations, and CSR for the add-to-cart functionality and image gallery. Soon, a product page’s layout and page could be statically rendered with PPR.

[

**Ecommerce for the rest of us.**

If you need to see it in action, or just want to reference best practices, check out our up-to-date Next.js commerce template.

Deploy Now



](https://vercel.com/templates/next.js/nextjs-commerce)

### [Link to heading](#web-application)Web application

Data-heavy applications, such as analytics providers, require static performance and real-time interactivity. Here's an approach:

**Static Site Generation (SSG):**

-   Marketing pages and documentation
    
-   Dashboard templates and layouts
    
-   Static help content and FAQs
    

**Incremental Static Regeneration (ISR):**

-   Periodic reports and summaries (daily/weekly updates)
    
-   User account settings pages
    
-   Billing and subscription information pages
    

**Server-Side Rendering (SSR):**

-   Real-time data visualizations
    
-   Custom report generation
    
-   User authentication flows
    

**Client-Side Rendering (CSR):**

-   Interactive data exploration tools
    
-   Real-time data filtering and sorting
    
-   Dashboard customization interfaces
    

**Implementation Example:** A dashboard could use SSR and cache the server response for the overall layout, ISR for summary widgets updated daily (or when the user clicks refresh), dynamic SSR for real-time data feeds, and CSR for interactive data exploration tools. This is similar to how Vercel's dashboard works, for instance.

### [Link to heading](#full-stack-ai-application)Full-stack AI Application

AI applications often require a balance between static content and dynamic, computationally intensive features:

**Static Site Generation (SSG):**

-   Landing pages and marketing content
    
-   Documentation and tutorials
    
-   Pre-computed model outputs for common queries
    

**Incremental Static Regeneration (ISR):**

-   Frequently asked questions with AI-generated answers
    
-   Galleries of AI-generated content (refreshed periodically)
    
-   User-submitted content showcases
    

**Server-Side Rendering (SSR):**

-   Personalized AI model responses streamed to the user
    
-   User-specific dashboards and settings
    

**Client-Side Rendering (CSR):**

-   Interactive AI model parameter adjustments
    
-   Real-time input processing (e.g., text, image uploads)
    
-   Progressive display of AI-generated content
    

**Implementation Example:** An AI image generation app could use SSG and experimental PPR for the main interface, ISR for galleries of popular generations, SSR for personalized results and settings, and CSR for the real-time image generation interface.

[

**Our flagship AI app.**

We built v0 from the ground up with the Next.js App Router to take advantage of the best possible rendering patterns.

Visit v0



](https://v0.dev/)

### [Link to heading](#optimizing-for-the-future-with-partial-prerendering-\(ppr\))Optimizing for the future with Partial Prerendering (PPR)

While PPR is still in development, it's worth considering how it might simplify these architectures in the future:

-   **Ecommerce:** PPR could automatically optimize product pages, prerendering critical content while leaving dynamic elements like add-to-cart buttons for client-side rendering.
    
-   **Dashboards:** Components could be partially prerendered, with placeholders for real-time data filled in on the client.
    
-   **AI:** PPR might prerender the application shell and common AI outputs while leaving room for personalized, dynamically generated content.
    

To prepare for PPR:

1.  Adopt React Server Components where possible.
    
2.  Structure your application with clear separation between static and dynamic content.
    
3.  Use Suspense boundaries to define loading states for dynamic content.
    

## [Link to heading](#choosing-the-right-rendering-strategies-for-your-application)Choosing the right rendering strategies for your application

The evolution of web rendering reflects the changing demands of modern web applications. From traditional server-side rendering to cutting-edge techniques, each strategy offers unique benefits for performance, user experience, and developer productivity.

### [Link to heading](#key-takeaways)Key Takeaways

1.  **Combine strategies**: The most effective applications often combine rendering methods to optimize different components.
    
2.  **Performance matters**: The right rendering strategy significantly impacts user engagement and business outcomes.
    
3.  **Flexibility is key**: Frameworks like Next.js allow for tailored solutions within a single application.
    
4.  **Stay future-ready**: Build flexible architectures that can adapt to emerging technologies like Partial Prerendering.
    
5.  **Let data guide you**: Use real-world performance metrics to inform your decisions.
    

### [Link to heading](#moving-forward)Moving forward

As you develop your rendering strategy:

1.  Assess your specific needs and start with the simplest effective solution.
    
2.  Continuously measure performance and iterate based on data.
    
3.  Invest in your team's knowledge of modern rendering techniques.
    
4.  Stay informed about emerging trends in web development.
    

Remember, the goal is to create the best possible user experience while maintaining developer productivity and business agility. By thoughtfully applying these strategies, you'll be well-equipped to deliver exceptional, future-ready web applications.

[Get started with Next.js](https://vercel.com/new) in just a few clicks, or [talk to our experts](https://vercel.com/contact/sales) about migrating your large codebase Next.js on Vercel, to give your users the best possible web experience.