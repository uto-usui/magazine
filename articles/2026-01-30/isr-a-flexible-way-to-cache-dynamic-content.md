---
title: "ISR: A flexible way to cache dynamic content"
source: "https://vercel.com/blog/isr-a-flexible-way-to-cache-dynamic-content"
publishedDate: "2024-09-16"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

6 min read

Sep 16, 2024

Effectively using ISR across industries and frameworks.

Incremental Static Regeneration (ISR) is a caching strategy that combines the perks of multiple rendering techniques to bring users dynamic content at cached speeds.

This guide explores how ISR fits into your overall caching strategy, how it can benefit your architecture, and how to implement it effectively. We'll compare ISR to traditional caching methods and provide real-world examples to illustrate its advantages.

## [Link to heading](#benefits-of-caching)Benefits of caching

Caching is a technique in web development that involves storing and reusing previously fetched or computed data. It helps improve website performance by:

-   **Reducing server load:** By serving cached content, fewer requests reach the server, allowing it to handle more traffic.
    
-   **Saving bandwidth:** Serving cached content reduces the data transferred between servers and clients, which can also decrease costs.
    
-   **Decreasing latency:** Cached responses are typically served much faster than generating new responses, resulting in quicker page loads, more responsive applications, and better user engagement.
    
-   **Content availability:** Cached content can remain available for end users even if providers go down.
    

Effective caching is key to build fast, scalable web apps.

## [Link to heading](#isr:-a-modern-server-side-caching-strategy)ISR: A modern server-side caching strategy

ISR is a hybrid cache that combines the benefits of static site generation (SSG) and server-side rendering (SSR). It allows for:

-   **Cached speeds with live content:** Quickly serve edge-cached static content to users while updating data in the background. (This is known as "stale-while-revalidate" in HTTP caching.)
    
-   **Selective regeneration:** Update specific pages without rebuilding the entire site. This can significantly reduce build times, [especially for content-heavy sites like Sonos](https://vercel.com/blog/how-sonos-amplified-their-devex).
    
-   **On-demand invalidation:** Trigger updates for specific pages as needed, such as when new content is published.
    
-   **Guaranteed cache durability:** Your data remains cached for the duration you specify. Only you or your team can invalidate this cache—unless it goes unaccessed for 31 days.
    

ISR pairs best with [hybrid rendering frameworks](#framework-adoption), which allow you to create apps with some content prerendered (SSG) and some content served per request (SSR).

[

**Too many acronyms?**

Learn the differences between rendering strategies like SSG, SSR, CSR, ISR, and PPR—and see real-world examples of each.

Read More



](https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app)

### [Link to heading](#isr-and-modern-web-architecture)ISR and modern web architecture

Caching requires careful configuration to work properly. Vercel's implementation of ISR uses [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure), meaning there's no extra configuration outside your framework code.

Also, Vercel's ISR cache scales automatically with your traffic. Its asynchronous, serverless nature means it can be used without worrying about downtime. In fact, the cache can help _prevent_ downtime by [taking the load off your backend services](https://vercel.com/blog/the-resiliency-of-the-frontend-cloud#high-availability-by-default) to begin with. This can also reduce the costs of calling third-party APIs, such as AI providers.

**ISR can act as a full replacement for** [**HTTP caching**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) **at the edge.** Instead of thinking about how to cache your application, you can focus on which pieces of your app would benefit from caching.

### [Link to heading](#how-isr-fits-in-the-caching-stack)How ISR fits in the caching stack

Vercel enhances caching strategies with several approaches:

-   **Static Assets:** [Automatically cached on Vercel's CDN](https://vercel.com/docs/edge-network/caching), persisting across deployments if unchanged.
    
-   **ISR:** Vercel's solution for caching dynamic content not requiring real-time updates, leveraging the Edge Network for [global low latency](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud).
    
-   **Application-level:** For specific needs like storing frequently accessed data in memory (e.g., using Redis from the [Vercel Marketplace](https://vercel.com/marketplace?category=databases)).
    
-   **Client-side:** Recommended libraries like [SWR](https://swr.vercel.app/) optimize browser caching, minimizing network requests.
    

Combining these with ISR optimizes performance while maintaining up-to-date content.

[

**Ready to try ISR yourself?**

This demo of on-demand ISR in Next.js shows you the basics by revalidating displayed GitHub issues from a webhook.

Deploy Now



](https://vercel.com/templates/next.js/on-demand-incremental-static-regeneration)

### [Link to heading](#framework-adoption)Framework adoption

Several popular frameworks currently support ISR:

If you don't see ISR in your favorite framework and want it, consider creating or upvoting a GitHub issue. Framework authors can implement ISR using Vercel's [Build Output API](https://vercel.com/blog/build-your-own-web-framework).

## [Link to heading](#real-world-scenarios-where-isr-shines)Real-world scenarios where ISR shines

> We don't want to have to say to a business stakeholder, "Hey, that typo that you want fixed on the homepage? It's going to take us hours to get that out, even though everything's already approved. So, the ability to incrementally statically regenerate only certain pieces of content—particularly when you have 10,000 pages of content—is a very important driver for us when evaluating and picking out a platform.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/rNyjjMjYDb5r1hIeBZFPl/513ec05e1f0bdf17efd5a3fab4345d3b/j_j.png)
> 
> **Senior Software Engineer,** Johnson & Johnson

### [Link to heading](#ecommerce)Ecommerce

Ecommerce sites with large inventories benefit greatly from ISR. For instance, Mecum, an online retailer with millions of assets and hundreds of thousands of pages, [uses ISR to keep product information up-to-date without rebuilding the entire site](https://vercel.com/blog/managing-275-thousand-pages-and-8-million-assets-with-isr).

When product details change (e.g., price, quantity on hand), only the affected pages are regenerated and re-cached. This ensures customers always see the latest information while maintaining fast page loads.

Stripe was also able to use ISR (in combination with client-side caching and static site generation) to serve a viral Black Friday micro-site with [17 million edge requests at launch](https://vercel.com/blog/architecting-reliability-stripes-black-friday-site).

### [Link to heading](#news-websites)News websites

News sites with frequently updating content are ideal candidates for ISR. News outlets like [The Washington Post use ISR](https://vercel.com/blog/washington-post-next.js-vercel-engineering-at-the-speed-of-breaking-news) to serve breaking news quickly while efficiently managing server resources.

Hydrow [uses ISR to update its blog](https://vercel.com/blog/hydrow) every time a new article is published in their headless CMS. Users and authors always see the latest content, but the site only has to request data when a post updates.

### [Link to heading](#ai-powered-applications)AI-powered applications

Applications integrating AI can leverage ISR to optimize performance and costs. For example, a company using AI for product recommendations can cache the results of expensive AI computations with ISR.

The recommendations can be regenerated periodically or when the underlying data changes, ensuring users receive personalized content quickly without overloading the AI service or incurring unnecessary AI costs.

Leonardo.ai uses ISR to cache recent user-generated content, allowing visitors to see the latest content without waiting on a loading skeleton. This has also helped them [drop build times from ten minutes to two](https://vercel.com/blog/leonardo-ai-performantly-generates-4-5-million-images-daily-with-next-js-and-vercel).

## [Link to heading](#how-to-implement-isr)How to implement ISR

ISR uses three invalidation techniques.

### [Link to heading](#time-based-isr)Time-based ISR

Time-based ISR regenerates pages at specified intervals. Use it when:

-   On-demand regeneration would be too frequent
    
-   Data sources lack webhook support
    
-   Content changes follow a predictable pattern
    

For example, using [SvelteKit's implementation of ISR with the Vercel adapter](https://kit.svelte.dev/docs/adapter-vercel#incremental-static-regeneration), we could update a news homepage from a third-party API every 10 minutes:

src/routes/+page.server.ts

```
import { error } from "@sveltejs/kit";import type { PageServerLoad } from "./$types";export const load: PageServerLoad = async () => {  try {    const res = await fetch("<https://api.news.com/headlines>");    const headlines: any = await res.json();    return {      headlines,      // Revalidate every 10 minutes      cache: { maxage: 600 },    };  } catch (err) {    throw error(500, "Failed to fetch headlines");  }};
```

In SvelteKit, we use a `+page.server.ts` file to handle server-side data fetching. The `load` function fetches and returns data, which will be available to the page component. The `cache` option sets the revalidation interval.

Be careful when using time-based ISR at too frequent an interval (60 seconds, for example). Although ISR can provide a needed buffer in severe traffic to help you save costs, revalidating _too_ often—writing to the cache almost as often as you're reading from it—can be cost-inefficient, and you may need to rethink your strategy.

### [Link to heading](#on-demand-isr)On-demand ISR

On-demand ISR regenerates pages in response to specific events. It's preferred to time-based because it:

-   Provides the most up-to-date content
    
-   Is more efficient, regenerating only when necessary
    
-   Allows for immediate updates to changes
    

For example, using [Astro's on-demand ISR implementation](https://docs.astro.build/en/guides/integrations-guide/vercel/#isr) you can revalidate an article page when you update the corresponding content in your CMS:

First, enable ISR in your Astro `astro.config.mjs`:

astro.config.mjs

```
import { defineConfig } from "astro/config";import vercel from "@astrojs/vercel/serverless";export default defineConfig({  output: "server",  adapter: vercel({    isr: {      // Create a secret token for revalidation      bypassToken: import.meta.env.VERCEL_REVALIDATE_TOKEN,    },  }),});
```

Then, wherever your article fetch is happening:

src/pages/posts/\[slug\].astro

```
---// ... your existing code ...export const prerender = true;---{/* ... your page content ... */}
```

Now, you can trigger revalidation by sending a `GET` or `HEAD` request to the page's URL with the **`x-prerender-revalidate`** header:

```
curl -H "x-prerender-revalidate: <YOUR_BYPASS_TOKEN>" https://your-site.com/posts/my-article-slug
```

This will tell Vercel to revalidate the `/posts/my-article-slug` page, ensuring the next visitor sees the fresh content. You can trigger this request from a webhook in your CMS or any other part of your application.

### [Link to heading](#tag-based-isr)Tag-based ISR

Next.js supports [tag-based revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation-with-revalidatetag) for on-demand ISR. This allows you to invalidate multiple pages that share the same tag. Let's explore a real-world ecommerce example using a Server Component for a product page:

app/products/\[id\]/page.tsx

```
import { revalidateTag } from "next/cache";async function getProduct(id) {  // ... (fetch logic using tags: [`product-${id}`, "product-list"])}export default async function ProductPage({ params: { id } }) {  const product = await getProduct(id);  async function addToCart(formData) {    const quantityToAdd = Number(formData.get("quantity"));    if (quantityToAdd > 0 && quantityToAdd <= product.quantity) {      await updateProductQuantity(id, product.quantity - quantityToAdd);      revalidateTag(`product-${id}`);      revalidateTag("product-list");      // ... (add to cart logic)    }  }  return (    <div>      <h1>{product.name}</h1>      <p>Price: ${product.price}</p>      {product.quantity > 0 ? (        <form action={addToCart}>          <input            type="number"            name="quantity"            min="1"            max={product.quantity}            defaultValue="1"          />          <button type="submit">Add to Cart</button>        </form>      ) : (        <p>Out of Stock</p>      )}    </div>  );}// Server-side function to update quantityasync function updateProductQuantity(id, newQuantity) {  "use server";  // ... (update database logic)}
```

This approach improves efficiency by allowing you to update related product pages simultaneously. When a product's inventory is updated:

1.  The specific product page is revalidated using the `product-${id}` tag.
    
2.  All pages listing multiple products (e.g., homepage, category pages) are revalidated using the `product-list` tag.
    

This ensures that inventory changes are reflected across the site for all users.

## [Link to heading](#the-future-of-isr)The future of ISR

ISR has been around for a few years now, and we've made a lot of observations of how it could be improved.

One of the most significant features currently in development is [Partial Prerendering (PPR)](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model), which allows static and dynamic content to coexist at the component level. PPR can simplify the developer experience by reducing the number of concepts and rendering modes to consider.

While [PPR is experimental](https://nextjs.org/docs/app/api-reference/next-config-js/ppr), it's an exciting step forward in building dynamic web applications.

## [Link to heading](#takeaways)Takeaways

ISR is a powerful hybrid caching strategy that offers improved performance, reduced server load, and better scalability for modern web applications. By implementing ISR, you can serve static-like content with dynamic data freshness, enhancing user experience and SEO.

To get started with ISR on Vercel, check out our [ISR template](https://vercel.com/templates/next.js/on-demand-incremental-static-regeneration) for a hands-on experience.