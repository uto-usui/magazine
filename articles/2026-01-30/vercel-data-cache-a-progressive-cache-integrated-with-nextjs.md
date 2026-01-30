---
title: "Vercel Data Cache: A progressive cache, integrated with Next.js"
source: "https://vercel.com/blog/vercel-cache-api-nextjs-cache"
publishedDate: "2023-02-23"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

6 min read

Feb 23, 2023

Framework-defined, global caching infrastructure with zero configuration.

Before today, developers had to choose between either fully static or fully dynamic pages.

With [Next.js 13.2](https://nextjs.org/13-2), we’re excited to announce the **Next.js Cache (beta)** and the brand-new **Vercel Data Cache (beta)**. This enables caching only _part_ of your page as static data, while fully dynamically rendering the rest of your application, including accessing real-time and personalized data.

**Vercel Data Cache**

-   Designed for usage with any frontend or fullstack framework
    
-   Native integration into the [Next.js Cache](#how-the-next.js-cache-works) with 13.2 and the App Router
    
-   Granular cache invalidation by tag
    
-   Shared backend cache between static and dynamic rendering
    

We’ve taken everything you love about Incremental Static Regeneration (ISR) – fast builds and even faster page loads – and made it granular at the data fetching level.

[Try Next.js 13.2](https://nextjs.org/13-2) or continue reading to learn about how the Next.js Cache and Vercel Data Cache were created to evolve ISR.

## [Link to heading](#what-is-incremental-static-regeneration-\(isr\))What is Incremental Static Regeneration (ISR)?

We released [Incremental Static Regeneration (ISR)](https://vercel.com/docs/concepts/incremental-static-regeneration/overview) in 2020 in [Next.js](https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta) and as part of the Vercel platform to help developers scale their static workloads to [millions of pages](https://vercel.com/customers/super-serves-thousands-of-domains-on-one-project-with-next-js-and-vercel).

ISR allows you to create or update content _without_ redeploying your site. This enables better performance, improved security, and faster build times for developers:

-   **Better Performance:** Static pages can be consistently fast by caching generated pages in every region on Vercel's [Edge Network](https://vercel.com/docs/concepts/edge-network/overview) and persisting files into durable storage
    
-   **Faster Builds:** Pages can defer generation on request or through an API instead of during the build, helping keep build times fast as your application grows
    

With SvelteKit, Nuxt, and Gatsby now supporting ISR, it’s easier than ever to speed up previously static-only workloads and start moving towards a dynamic-first model. However, we knew there were opportunities to improve the foundations of ISR we laid out three years ago.

## [Link to heading](#the-good,-the-bad,-and-the-ugly-of-isr)The good, the bad, and the ugly of ISR

When we released ISR, the feedback from developers was clear: they _loved_ the speed boost that ISR provided, both in page performance and faster builds.

The native integration with Next.js made it easy to opt into using ISR on a per-route basis, using `getStaticProps` to define a `revalidate` time in seconds, and using `getStaticPaths` to defer the generation of new pages on demand.

pages/products/\[id\].js

```
export async function getStaticProps() {  let product = await getProduct()  return {    props: { product },    // Next.js will attempt to re-generate the page:    // - When a request comes in    // - At most once every 10 seconds    revalidate: 10, // In seconds  }}// Generates `/products/1` and `/products/2`export async function getStaticPaths() {  // The developer has full flexibility to control  // what pages are generated during the build or on-demand  // For example, you could only generate the top products  // const topProducts = await getTopProducts()  return {    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],    fallback: 'blocking', // generate new product pages on-demand  }}
```

Using ISR inside of the Next.js pages directory.

However, developers wanted further flexibility. How could you programmatically invalidate a specific route that had been previously statically generated?

With Next.js 12.1, and the corresponding [global Edge infrastructure](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure) on Vercel, we released [on-demand ISR](https://on-demand-isr.vercel.app/). This allowed developers to easily update their content [globally in 300ms](https://vercel.com/changelog/faster-and-more-reliable-global-propagation).

pages/products/\[id\].js

```
export async function getStaticProps() {  let product = await getProduct()  return {    props: { product },    // `revalidate` is no longer needed, content is only updated    // when programmatically invalidated through the API    // revalidate: 10  }}
```

Using revalidate is not necessary when programmatically updating content.

pages/api/revalidate.js

```
export default async function handler(req, res) {  // ...  await res.revalidate('/products/1');  // ...}
```

An API Route that uses On-Demand ISR.

This was a major improvement, but still left room for further iteration.

-   What if I wanted to invalidate just a specific component instead of the entire route?
    
-   What if I wanted to re-use the cache across deployments?
    
-   What if I wanted to change how the cache was keyed?
    
-   What if parts of my page required dynamic code like user personalization?
    

Developers wanted _dynamic_ at the speed of static.

## [Link to heading](#the-new-app-router,-designed-for-incremental-adoption)The new App Router, designed for incremental adoption

With [Next.js 13](https://nextjs.org/blog/next-13), we released the foundation for the [App Router](https://beta.nextjs.org/docs) – a new routing, rendering, and data-fetching engine for Next.js – built on the latest React innovations. The best part? The App Router is designed for incremental adoption, meaning you can update to Next.js 13 and continue using `pages` without any major changes.

In the past six months since Next.js 13 has been released, we’ve been working hard to build new primitives on top of the App Router foundations. One of these major improvements is around how developers fetch, cache, and invalidate data.

## [Link to heading](#improved-data-fetching-with-react-server-components)Improved data fetching with React Server Components

We started by deeply integrating the Next.js App Router with React features like [Server Components](https://beta.nextjs.org/docs/rendering/server-and-client-components), [Suspense](https://beta.nextjs.org/docs/data-fetching/streaming-and-suspense), and [Transitions](https://beta.reactjs.org/reference/react/useTransition).

Rather than using Next-specific APIs like `getStaticProps` or `getServerSideProps`, you can now use familiar `async` / `await` to fetch data inside pages, layouts, or any Server Component.

app/page.jsx

```
export default async function Page() {  let notes = await db.query('select * from notes');  return (    <ul>      {notes.map((note) => (        <li key={note.id}>{note.body}</li>      ))}    </ul>  );}
```

With React Server Components, you can fetch data directly inside of your components.

[This](https://twitter.com/dan_abramov/status/1341217154566402050) allows you to use the Web `fetch` API to easily retrieve data in the `app` directory, as any `Promise` can be used to retrieve data:

app/page.js

```
export default async function Page() {  const [staticData, dynamicData, revalidatedData] = await Promise.all([    // Cached until manually invalidated    fetch(`https://...`),    // Refetched on every request    fetch(`https://...`, { cache: 'no-store' }),    // Cached with a lifetime of 10 seconds    fetch(`https://...`, { next: { revalidate: 10 } }),  ]);  return <div>...</div>;}
```

The data fetching API inside of the App Router has been simplified.

By default, `fetch` will automatically fetch and [cache data](https://beta.nextjs.org/docs/data-fetching/caching). Similar to the Service Worker API, which extends the Fetch API by intercepting and handling network requests, the Next.js Cache extends the `fetch` options object to allow each request to provide its own [caching and revalidating](https://beta.nextjs.org/docs/data-fetching/caching).

This new server-first programming model and React architecture mean that data fetching can be colocated with any Server Component. This enabled us to build the next generation of ISR: a [progressive, durable cache](#how-the-next.js-cache-works) that’s granular at the data fetching level.

## [Link to heading](#the-next-generation-of-isr:-next.js-cache)The Next Generation of ISR: Next.js Cache

With the foundation of React Server Components and colocated data fetching in the Next.js App Router, you can now encapsulate static or dynamic data alongside the components that consume them.

This is the next generation of Incremental Static Regeneration (ISR) and caching in Next.js.

app/page.tsx

```
async function Tweet({ id }) {  // Tweets are static unless programmatically revalidated  let tweet = await fetch(`https://.../${id}`).then(res => res.json());  return (    <div>      <p>{tweet.author}</p>    </div>  );}async function Categories() {  // Fetch the latest categories at most every 60 seconds  let trendingCategories = await fetch('https://...', {    next: { revalidate: 60 },  }.then(res => res.json());  return (    <ul>      {trendingCategories.map((category) => (        <li key={category.id}>{category.name}</li>      ))}    </ul>  );}
```

You can revalidate a single fetch at most every 60 seconds.

## [Link to heading](#how-the-next.js-cache-works)How the Next.js Cache Works

Next.js on Vercel gives you [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure). You write application code, like component-level data fetching with `fetch`, and we scaffold globally distributed infrastructure for you with no additional effort.

Regardless of where you are deploying, sensitive data that Next.js can infer (such as `Authorization` headers) are _not_ cached by default. However, any request can still opt into caching and override these defaults. We recommend adding the appropriate headers to sensitive requests to ensure data is never accidentally cached.

### [Link to heading](#next.js-cache-with-the-vercel-data-cache)Next.js Cache with the Vercel Data Cache

The new Next.js Cache makes changing code independent from changing data. This can drastically speed up the redeployment of static pages since the page generation can use the existing cache.

For pages that are _entirely static_, ISR works the same way as today:

-   Generated pages are cached in every Vercel region. In the case of a cache `MISS`, it looks up the value in a single, global bucket. This means ISR has “cache shielding” built-in automatically, which helps improve the cache `HIT` ratio, making your application faster for visitors everywhere in the world.
    
-   Generated pages are also persisted in durable storage, enabling [instant rollbacks](https://vercel.com/docs/concepts/deployments/instant-rollback) without losing your previously cached entries.
    
-   When content is updated, the Vercel Cache API is called and all regions globally are brought up to date with the newest content within 300ms.
    

For pages that have more _granular_ data fetching, mixing static and dynamic, the Next.js Cache on Vercel (using the Vercel Data Cache) uses a more granular, ephemeral cache close to the visitor. A revalidation will cause entries in each region to be marked stale. The subsequent fetch will use the stale entry and trigger a background fetch to the origin to set the updated value in the cache.

### [Link to heading](#self-hosted-next.js)Self-Hosted Next.js

The Next.js Cache also works fully self-hosted. When self-hosting, an LRU cache is used, which defaults to 50 MB (which can be increased). All entries in the cache are automatically written to disk by default. This filesystem cache can be shared between nodes if they have the same cache key, similar to [how ISR works today](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#self-hosting-isr).

For developers looking to further customize and modify the core of the Next.js Cache, they can modify underlying cache keys and change how and where cache entries are persisted, including disabling persistence entirely.

## [Link to heading](#revalidating-components-with-cache-tags)Revalidating components with cache tags

With Next.js 13.2, the core of the Next.js Cache has been released and is ready for experimentation today (in beta).

Next up, we plan to implement programmatic updates to specific [paths](https://nextjs.org/docs/app/api-reference/functions/revalidatePath) or [cache tags](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).

```
revalidatePath(`/posts/[slug]`);revalidateTag(`post-${id}`);
```

An upcoming API for allowing revalidation of content by tag.

Cache tags can be added to specific `fetch` requests, enabling you to have more granular revalidation of content (potentially across multiple different paths).

```
fetch(url, { next: { tags: [...] } });
```

Cache tags can be added to the fetch request.

## [Link to heading](#getting-started-with-the-next.js-cache)Getting started with the Next.js Cache

The future is dynamic at the speed of static. While the Next.js Cache is available in beta today with 13.2, we are actively working on further improvements revalidating by cache tag and more generalized usage of the Vercel Data Cache.

As we move towards stability for the Next.js Cache and general availability for the Vercel Data Cache, you will be able to pay for expanded storage and larger cache sizes on Vercel. The max item size for the Vercel Data Cache is 1 MB during the beta period.

The Next.js Cache is opt-in and only used when static and dynamic workloads are used on the same route. Otherwise, the current page-level ISR continues the work the same as today.

Learn more about [Next.js 13.2](https://nextjs.org/13-2) or [deploy your first Next.js application today](https://vercel.com/templates/next.js).