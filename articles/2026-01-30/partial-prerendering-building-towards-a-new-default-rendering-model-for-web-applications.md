---
title: "Partial prerendering: Building towards a new default rendering model for web applications"
source: "https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model"
publishedDate: "2023-11-09"
category: "frontend"
feedName: "Vercel"
author: "Sebastian Markbåge"
---

3 min read

Nov 9, 2023

A look at Partial Prerendering with Next.js 14 on Vercel.

At this year’s [Next.js Conf](https://www.youtube.com/watch?v=gfU1iZnjRZM), we discussed the developer and user experience challenges of global delivery of dynamic web applications. How can we fetch data without expensive waterfalls and also deliver content directly from the edge?

The answer to all of these current challenges: Partial Prerendering (PPR).

PPR combines ultra-quick static edge delivery with fully dynamic capabilities and we believe it has the potential to become the default rendering model for web applications, bringing together the best of static site generation and dynamic delivery.

Today, you can [try an experimental preview of PPR](#try-ppr-on-vercel-today) with Next.js 14 on Vercel [or visit our demo](https://www.partialprerendering.com/) for a first impression of PPR.

## [Link to heading](#understanding-the-trade-offs-eliminated)Understanding the trade-offs eliminated

PPR brings together the best aspects of popular rendering modes enabling both fast edge delivery and dynamic data access from core data centers.

![This table shows the features of common rendering strategies compared to the features of PPR, which eliminates trade-offs experienced in other methods. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2tgZ9Elt1qerK15SyTTXJ4%2F67a26fd63c92956178a1a25005f82403%2FGraphic_1_-_Light.png&w=1920&q=75)![This table shows the features of common rendering strategies compared to the features of PPR, which eliminates trade-offs experienced in other methods. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5VDyzuymkOUuQVo1ECuayK%2F051b687701d68d1590068323eeb0be30%2FGraphic_1_-_Dark.png&w=1920&q=75)

This table shows the features of common rendering strategies compared to the features of PPR, which eliminates trade-offs experienced in other methods.

## [Link to heading](#one-battle-tested-programming-model)One battle-tested programming model

With Partial Prerendering in Next.js, rendering happens in a single React render tree. Static optimization is on-by-default and covers all components until the app accesses incoming request information like headers or cookies, which is a clear signal that dynamic rendering is needed. Next.js then changes the smallest possible section of the page to be dynamic while keeping static optimization for everything else.

You may be thinking: “We did this in the 90s with [server-side includes](https://en.wikipedia.org/wiki/Server_Side_Includes)”. That is true, but in that world static and dynamic were separated into completely different technology worlds and we didn’t have incremental updates of static content.

Consider the following ecommerce page:

```
export default function Page() {  return (    <main>      <header>        <h1>My Store</h1>        <Suspense fallback={<CartSkeleton />}>          <ShoppingCart />        </Suspense>      </header>      <Banner />      <Suspense fallback={<ProductListSkeleton />}>        <Recommendations />      </Suspense>      <NewProducts />    </main>  );}
```

With PPR enabled, this page generates a static shell based on your `<Suspense />` boundaries. The `fallback` provided to React Suspense is prerendered.

Suspense fallbacks in the shell are then replaced with dynamic components, like reading cookies to determine the cart, or showing a banner based on the user.

## [Link to heading](#under-the-hood-of-ppr)Under the hood of PPR

When you build your application, Next.js will prerender a static _shell_ for each page of your application, leaving _holes_ for the dynamic content.

When a user visits a page, the fast static shell is served from the end-user’s nearest [Vercel Region](https://vercel.com/docs/edge-network/overview), allowing the user to start consuming the page, and the client and server to work in parallel. The client can start parsing scripts, stylesheets, fonts, and static markup while the server renders dynamic chunks using [React’s new streaming architecture](https://vercel.com/blog/understanding-react-server-components).

PPR offers a unified model that blends the reliability and speed of [Incremental Static Regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration) and the dynamic capabilities of [Server-Side Rendering (SSR)](https://vercel.com/docs/frameworks/nextjs#server-side-rendering-ssr). In fact, this is exactly how PPR is implemented. Because PPR takes advantage of React <Suspense> boundary, _you_ decide whether the boundary is static or dynamic.

-   The static shell retains the ability to be updated via Incremental Static Regeneration (ISR).
    
-   If you use features that require dynamic rendering, such as accessing cookies, Next.js automatically switches to dynamic rendering up to the closest Suspense boundary.
    

## [Link to heading](#not-just-for-app-shells)Not just for app shells

PPR can be leveraged for any app along the static/dynamic spectrum. Whether you have a dashboard containing mostly dynamic content and a relatively barebones shell around it, or a page that contains mostly static content with dynamic elements throughout.

For example, in our [product detail page example](https://www.partialprerendering.com/) almost all content is part of the static prerender. Only the customer reviews section, shopping cart count, the personalized delivery time based on user zip code, and the below-the-fold recommendations stream in via dynamic streaming.

This wireframe of a typical product detail page shows elements that are typically static in purple and elements that are often dynamic in blue. With PPR the vast majority of content for such a page can get delivered instantly from the edge.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5r33oKikQKnzTplANlbF20%2F9bf635b0a904840838d863241d5829a2%2Fthinking-in-server-components__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F19oHbnORNyZdAYAxuzQHbP%2F4e7196649e205805d8ef419da4e25d6d%2Fthinking-in-server-components.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5r33oKikQKnzTplANlbF20%2F9bf635b0a904840838d863241d5829a2%2Fthinking-in-server-components__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F19oHbnORNyZdAYAxuzQHbP%2F4e7196649e205805d8ef419da4e25d6d%2Fthinking-in-server-components.png&w=1920&q=75)

Additionally, because PPR is based on ISR, you can take advantage of the same on-demand, time-based, and tag-based revalidation for the static shell [that is available to ISR today](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data).

## [Link to heading](#open-to-all-frameworks)Open to all frameworks

The [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) primitive that Partial Prerendering leverages when used on Vercel can be natively adopted by any frontend framework through [Vercel’s Build Output API](https://vercel.com/docs/build-output-api/v3). Framework authors can get in touch with us to talk about how to integrate PPR into their framework.

## [Link to heading](#try-ppr-on-vercel-today)Try PPR on Vercel today

You can try Partial Prerendering with the latest Next.js 14 Canary using the app directory on Vercel today.

```
npm install next@canary
```

Add the following configuration to your `next.config.js` file or check out the [template](https://vercel.com/templates/next.js/partial-prerendering-nextjs) to get started.

next.config.js

```
experimental: {  ppr: true,},
```

Please note that PPR is truly an experimental technology that is **not yet recommended for production use**. You may run into some developer experience issues, especially on larger code bases, and known issues such that client-side navigations do not yet perform a streaming render (coming soon).

Partial Prerendering is a major step in web application delivery. We’re excited to see what the community builds on it, and we will continue to iterate on the best developer experience and best user experience for modern websites and web applications.