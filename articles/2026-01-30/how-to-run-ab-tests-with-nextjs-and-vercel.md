---
title: "How to run A/B tests with Next.js and Vercel"
source: "https://vercel.com/blog/ab-testing-with-nextjs-and-vercel"
publishedDate: "2022-09-09"
category: "frontend"
feedName: "Vercel"
author: "Steven Tey"
---

4 min read

Sep 9, 2022

Running A/B tests is hard.

We all know how important it is for our business–it helps us understand how users are interacting with our products in the real world.

However, a lot of the A/B testing solutions are done on the client side, which introduces [layout shift](https://vercel.com/blog/core-web-vitals#cumulative-layout-shift) as variants are dynamically injected after the initial page load. This negatively impacts your websites performance and creates a subpar user experience.

To get the best of both worlds, we built [Edge Middleware](https://vercel.com/features/edge-functions): code that runs _before_ serving requests from the edge cache. This enables developers to perform rewrites at the edge to show different variants of the same page to different users.

Today, we'll take a look at a real-world example of how we used Edge Middleware to A/B test our new Templates page.

## [Link to heading](#redesigning-the-template-marketplace)Redesigning the Template Marketplace

Earlier this year, we kickstarted the redesign of our [Templates page](https://vercel.com/templates).

Our old Templates page had a limited scope that focused mainly on the different [frameworks](https://github.com/vercel/vercel/tree/main/examples) that were supported on Vercel:

![Old version: limited selection of templates that focused mainly on framework starters.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2OSqKq0CEIWvXWErGv6JJt%2F605ea66b9e79065c2c0dcc11fd36b987%2Flight_old.png&w=1920&q=75)![Old version: limited selection of templates that focused mainly on framework starters.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1Pn7Ae1de2nHgtzcPaf5Gv%2F1f21f235b1092939142486b9acf9ac4a%2Fdark_old.png&w=1920&q=75)

Old version: limited selection of templates that focused mainly on framework starters.

For the new version, we wanted to build a marketplace to showcase all the different types of applications that can be built on Vercel – blogs, e-commerce storefronts_,_ etc.

We also improved search to allow for partial matching of search terms and added category filters to make discovering new templates much easier:

![New version: wider selection of templates with fuzzy search & filters.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2yL9zJ1tqoWOhbMSWKwxFG%2F44ac3e7b0519f59d9040c7419dd1145f%2Flight_new.png&w=1920&q=75)![New version: wider selection of templates with fuzzy search & filters.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7wD0AMsJCmtRWJjUIehH3M%2F56e5ec17c3c7ba27b58d9403c356afd8%2Fdark_new.png&w=1920&q=75)

New version: wider selection of templates with fuzzy search & filters.

Since this was a major change of one of our most popular pages, we decided to break down the launch into multiple release phases:

1.  **Early Access**: Only 20% of visitors to `/templates` will see the new variant.
    
2.  **Public Beta**: An equal 50:50 split between the new and old variant.
    
3.  **General Availability**: Public launch–everyone gets the new variant.
    

![We used Vercel's Edge Middleware to stagger our launch into 3 phases.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4QWkcGO2aUPqAXEbzEO0ub%2Fd03c93fbdf656f83125220c860b5599b%2FCleanShot_2022-09-09_at_08.59.03.png&w=1920&q=75)![We used Vercel's Edge Middleware to stagger our launch into 3 phases.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5SfniQhthbLrUN8eplzdPz%2F550fe7c30d6b5c77475dceab40516bb6%2FCleanShot_2022-09-09_at_09.00.16.png&w=1920&q=75)

We used Vercel's Edge Middleware to stagger our launch into 3 phases.

We leveraged [Edge Middleware](https://vercel.com/blog/vercel-edge-middleware-dynamic-at-the-speed-of-static) to perform the A/B test at the edge, which allowed us to gather insightful user feedback without sacrificing performance.

## [Link to heading](#catch-all-routes-&-on-demand-revalidation)Catch-all Routes & On-demand Revalidation

Since we were using Next.js, we decided to create the new templates marketplace using the following [optional catch-all route](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes): `/templates/[[...slug]].tsx`.

This allowed us to programmatically generate new static pages when new templates are added using [On-Demand Incremental Static Regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation) and navigate between them using [shallow-routing](https://nextjs.org/docs/routing/shallow-routing).

Here are some examples:

We also generated dynamic landing pages for each filter option to capture long-tail SEO traffic:

We then moved the old templates marketplace to the `/templates-old.tsx` route.

## [Link to heading](#experimenting-at-the-edge)Experimenting at the Edge

To perform the A/B test, we created a `middleware.ts` file with the following code:

middleware.ts

```
import { type NextRequest, NextResponse } from 'next/server';// make sure the middleware only runs when// the requested url starts with `/templates`export const config = {  matcher: ['/templates(.*)'],};const THRESHOLD = 0.2; // initial threshold for the new variant (20%)const COOKIE_NAME = 'tm_var'; // name of the cookie to store the variantexport function middleware(req: NextRequest) {  // get the variant from the cookie  // if not found, randomly set a variant based on threshold  const variant =    req.cookies.get(COOKIE_NAME) || (Math.random() < THRESHOLD ? 'new' : 'old');  const url = req.nextUrl.clone();  // if it's the old variant, rewrite to the old templates marketplace  if (variant === 'old') {    url.pathname = '/templates-old';  }  const res = NextResponse.rewrite(url);  // set the variant in the cookie if not already set  if (!req.cookies.get(COOKIE_NAME)) {    res.cookies.set(COOKIE_NAME, variant);  }  return res;}
```

Middleware code to perform the A/B test at the edge.

Here's a step by step of what the middleware does:

1.  Tags each new visitor to the `/templates` page with either the `old` or `new` variant based on the current threshold (`0.2` for the first stage)
    
2.  If the user is part of the old variant, performs a rewrite to the `/templates-old.tsx` route
    
3.  Saves the user's variant in the `tm_var` cookie to ensure the user gets served the same version in subsequent visits
    

## [Link to heading](#avoiding-layout-shift-with-edge-middleware)Avoiding layout shift with Edge Middleware

As we developed the new templates page, we ran into an interesting problem–data fetching had to be done on the client side for three reasons:

1.  We were using query parameters to preserve the filter state
    
2.  The pages were generated statically
    
3.  You can't read query parameters inside `getStaticProps`
    

To avoid layout shift, we decided to use skeleton loaders to buffer the loading state before showing the templates that match the configured filters.

For instance, if you go to [vercel.com/templates?framework=svelte](https://vercel.com/templates?framework=svelte), you first receive a set of skeleton loaders while the data is fetched on the client side, and then the list of Svelte templates:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3vQrgjMt8oSyFSQGPJqrFH%2F61982c59ea229cf28c11887f5c2dbb5a%2FCleanShot_2022-08-17_at_18.51.59.gif&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1drbc8hTZU4UKvyrtez8Ly%2Fb68971bdce41a886a25a3a8f72032cc6%2FCleanShot_2022-08-17_at_18.48.52.gif&w=1920&q=75)

However, for the dynamic landing pages for each filter option (e.g. [vercel.com/templates/svelte](https://vercel.com/templates/svelte)), we wanted to avoid skeleton loaders since we already know the set of templates that match the given filter at build time.

To get the best of both worlds, we used Edge Middleware. Since Edge Middleware is [executed _before_ a request is processed on a site](https://vercel.com/docs/concepts/functions/edge-middleware#what-is-edge-middleware), we are able to detect if there are any query parameters present right when the user requests the page.

Then, if there are query parameters present, we perform a rewrite to `/templates/skeleton`, which is a special route that shows a skeleton loader.

Here's the middleware code from earlier, with the addition of this logic:

middleware.ts

```
import { type NextRequest, NextResponse } from 'next/server';// make sure the middleware only runs when// the requested url starts with `/templates`export const config = {  matcher: ['/templates(.*)'],};const THRESHOLD = 0.2; // initial threshold for the new variant (20%)const COOKIE_NAME = 'tm_var'; // name of the cookie to store the variantexport function middleware(req: NextRequest) {  // get the variant from the cookie  // if not found, randomly set a variant based on threshold  const variant =    req.cookies.get(COOKIE_NAME) || (Math.random() < THRESHOLD ? 'new' : 'old');  const url = req.nextUrl.clone();  // if it's the old variant, rewrite to the old templates marketplace  if (variant === 'old') {    url.pathname = '/templates-old';  } else {    // for the new variant, we need to perform a rewrite to /template/skeleton    // if there are query paramters in the request URL    const hasQueryParams = req.nextUrl.search.length > 0;    if (hasQueryParams) {      url.pathname = `/templates/skeleton`;    }  }  const res = NextResponse.rewrite(url);  // set the variant in the cookie if not already set  if (!req.cookies.get(COOKIE_NAME)) {    res.cookies.set(COOKIE_NAME, variant);  }  return res;}
```

Middleware code to perform an edge rewrite to avoid layout shift.

Then, on the client side, we detect when the data is finished fetching with SWR and render the final list of cards:

templates/\[\[...slug\]\].tsx

```
import useSWR from "swr"import { useRouter } from "next/router"import { Card, PlaceholderCard, CardProps } from '@/components/cards'export default function Templates({ skeleton } : { skeleton: boolean }) {  const router = useRouter()  const { data } = useSWR<CardProps[]>("/api/templates")  // if skeleton is true and the router is still loading, show a skeleton  if (!data || (skeleton && !router.isReady)) {    return (      <div>      	{[...Array(6).keys()].map((i: number) => (        	<PlaceholderCard key={i}/>        ))}      </div>		)  }  return (    <div>    	{data.map((d: CardProps, i) => (       <Card key={i} data={d} />       ))}    </div>  )}export function getStaticProps(context) {  const skeleton = context.params?.slug?.includes('skeleton')  return {    props: {      skeleton,    },  }}
```

Simplified version of the code that shows how we use SWR and middleware to conditionally render loader skeletons on the client side if there are query parameters present in the request URL.

## [Link to heading](#collecting-data-&-iterating)Collecting data & iterating

Throughout our **Early Access** and **Public Beta** phases, we collected a series of data points that helped us understand how our new Templates Marketplace was performing in the real world.

### [Link to heading](#tracking-conversion-rates-with-heap)Tracking conversion rates with Heap

We used [Heap](https://heap.io/) to track our conversion rates: how likely is a user to successfully deploy a template after seeing it on the new vs. old Templates pages.

Based on the data from Heap, we were able to make some tweaks to our implementation to increase conversion rates by 16% with the new variant.

### [Link to heading](#tracking-search-&-filter-usage-stats-with-algolia)Tracking search & filter usage Stats with Algolia

Algolia's [Search Without Results](https://www.algolia.com/doc/guides/getting-analytics/search-analytics/understand-reports/#searches-without-results) feature was also instrumental for us to understand which templates users were interested in. Based on the data, we were getting >30 searches a week for WordPress templates that yielded no results.

This prompted us to add a few WordPress templates before releasing the Templates Marketplace to **General Availability**.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F413v0gRsSkLEWO5zB2L2kZ%2F2a19f2628143572101eaaf0f3f3a7f1d%2Fog.png&w=1920&q=75)

## [Link to heading](#edge-middleware:-run-a/b-tests-without-the-tradeoffs)Edge Middleware: Run A/B tests without the tradeoffs

[Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) allowed us to streamline the release of our new Templates Marketplace by putting the new version behind a feature flag until it's fully tested and optimized.

Check out our [Templates Marketplace](https://vercel.com/templates) today to jumpstart your app development process with our pre-built solutions.