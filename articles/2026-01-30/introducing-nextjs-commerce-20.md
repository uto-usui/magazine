---
title: "Introducing Next.js Commerce 2.0"
source: "https://vercel.com/blog/introducing-next-js-commerce-2-0"
publishedDate: "2023-08-07"
category: "frontend"
feedName: "Vercel"
author: "Michael Novotny"
---

6 min read

Aug 7, 2023

Today, we’re excited to introduce Next.js Commerce 2.0.

-   **App Router Ready:** Using React Server Components, Server Actions, built-in layouts, metadata, and all the new patterns from the recently released App Router.
    
-   **Dynamic Storefront:** A dynamic storefront at the speed of static. Customize content without sacrificing performance.
    
-   **Simplified Architecture:** Next.js Commerce is now a single provider per repository, resulting in less code and fewer abstractions for your application.
    

Our new ecommerce accelerator template showcases the best patterns for building composable commerce applications, including support for BigCommerce, Medusa, Saleor, Shopify, and Swell.

[View the demo](https://demo.vercel.store/) or [deploy your own version](https://vercel.com/templates/next.js/nextjs-commerce) today.

## [Link to heading](#why-is-building-an-ecommerce-site-difficult)Why is building an ecommerce site difficult?

When Google announced that [page experience would be a ranking factor in search results](https://developers.google.com/search/blog/2020/05/evaluating-page-experience) and Amazon found that just [100 milliseconds of extra load time cost them 1% in sales](https://www.forbes.com/sites/steveolenski/2016/11/10/why-brands-are-fighting-over-milliseconds/?sh=6d1165864ad3), it put a lot of pressure on ecommerce sites to raise the bar or suffer the consequences.

However, according to the Web Almanac, [ecommerce sites still struggle to achieve good performance](https://almanac.httparchive.org/en/2021/ecommerce#lighthouse).

![Web Almanac's 2021 Median Lighthouse scores for e-commerce sites on mobile](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1N0mL08ZxhWQQt2UvdXZqq%2Fb69a3d885336ed1c1ccc5c849335b4f6%2Fmedian-lighthouse-scores-light.jpg&w=1920&q=75)![Web Almanac's 2021 Median Lighthouse scores for e-commerce sites on mobile](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5vfgZAbE84tLDzA9VUBUeA%2F4f759f6a342d8f95c80b299445471e67%2Fmedian-lighthouse-scores-dark.jpg&w=1920&q=75)

Web Almanac's 2021 Median Lighthouse scores for e-commerce sites on mobile

Commerce sites are more complex than they seem on the surface. What is it about ecommerce that contributes to these metrics?

-   **They make lots of page requests.** The 50th percentile of all ecommerce sites had 101 requests on the homepage on mobile. That seems like a lot, but think of _all_ the product and sale information that appears on most home pages.
    
-   **They are asset heavy.** Video and Images are the first and second most requested resource type as well as the first and second largest contributor to page weight. Once again, think of all the product and sale imagery you see on the homepage alone.
    
-   **They focus on personalization.** This includes recommended products based on your shopping history and habits or location, items in your cart, user information, and more.
    

Many commerce platforms come with pre-built templates to help you get started quickly, but they often lack the rigor needed to scale and perform at a high level.

For example, Shopify’s store themes only require a [minimum average Lighthouse performance score of 60](https://shopify.dev/docs/themes/store/requirements#5-lighthouse-performance-and-accessibility) across the theme's product, collection, and home page, for both desktop and mobile.

[

**Sanity Toolkit for Next.js**

Achieve next-level ecommerce speed with Sanity's enhanced Next.js toolkit—tailored to developers and designed for optimal user experiences.

Learn more



](https://www.sanity.io/blog/sanity-nextjs-enhancements)

Large retailers such as Under Armour, Walmart, Target, Nike, and more trust their ecommerce experience to Next.js to help them achieve better results. Let’s look at how.

## [Link to heading](#next.js-commerce-v1)Next.js Commerce v1

The first version of [Next.js Commerce](https://nextjs.org/commerce) was announced during [Next.js Conf 2020](https://nextjs.org/2020/conf) and alongside [Next.js 10](https://nextjs.org/blog/next-10#nextjs-commerce). Newer Next.js features at the time, like `next/image` with its automatic image optimization and static and dynamic rendering on a per-page basis, provided the ingredients to create a better ecommerce experience.

Paired with the industry shift from monoliths to headless ecommerce, we were able raise the bar for ecommerce sites. Next.js Commerce embodied a best-in-class, highly performant, highly optimized commerce experience including excellent web core vitals, SEO optimizations, Incremental Static Regeneration, link prefetching, and more.

This version of Next.js Commerce was as tremendous step forward, but there was still room for improvement for highly dynamic ecommerce sites.

## [Link to heading](#next.js-commerce-2.0—dynamic-storefronts-at-the-speed-of-static)Next.js Commerce 2.0—dynamic storefronts at the speed of static

There are many dynamic elements in commerce to consider such as a user’s cart, search results, products being purchased and affecting availability, product recommendations, and more.

Even with advancements in Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR), creating an ecommerce site was still a difficult task.

In order to be the most effective, we need something more granular to control the static and dynamic parts of our application. This is where Next.js and the introduction of the App Router gives you access to a deeper level of control, allowing you to create storefronts that feel static, but are completely dynamic.

## [Link to heading](#performance-results)Performance results

By leveraging the Next.js App Router's latest features and Vercel’s Frontend Cloud, [Next.js Commerce 2.0 is able to achieve incredible performance](https://pagespeed.web.dev/analysis/https-demo-vercel-store/26y7enx4ag), demonstrating _dynamic at the speed of static_.

When we shared an early preview, a few remarked that the performance of the site felt static. We had to clarify this is a dynamic, server-rendered storefront that performs at the level of a statically cached page. This is possible due to the [new caching architecture](https://nextjs.org/docs/app/building-your-application/caching) in Next.js App Router and the [Vercel Data Cache](https://vercel.com/docs/infrastructure/data-cache).

To compliment this new release, we also did a minor redesign to give the theme a fresh, modern look.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6RWgAVUNSV53QlfMilndOF%2F851ce4a4a1630aa43d553e8995cc0970%2Fdesign-light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F692COcVU9KjIrx9rLsiOZi%2Fb0fd734ee1b9846c846f89ca791a1ed5%2Fdesign-dark.jpg&w=1920&q=75)

Let's walkthrough some Next.js features that made this possible.

### [Link to heading](#layouts-and-pages)Layouts and pages

App Router introduces a new file name routing convention, which includes [layouts and pages](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts). This allows you to create and share site wide layouts and components, like headers and footers, but specifically for ecommerce, this allows you to create a cart that is accessible from anywhere on the site. The overall experience is much snappier. This was possible before, but is now more easier to achieve.

### [Link to heading](#react-server-components,-streaming,-and-suspense)React Server Components, Streaming, and Suspense

[React Server Components (RSCs)](https://nextjs.org/docs/getting-started/react-essentials#server-components) allow us to do as much work on the server as possible, including dynamic API calls, before returning a fully rendered UI. This means a leaner client-side JavaScript bundle size and fewer client-side requests. This also means no layout shift, no loading spinners, and a faster time to interactive.

Paired with [Streaming with Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming), we can prioritize and return portions of the UI as they are ready instead of waiting for the entire page to be ready. This gives users content faster. Your site is no longer as slow as your slowest backend. Portions of the site below the fold can be streamed in later, while users see more immediate content above the fold.

-   The layout, page, header, and search sort filters are all rendered on the server available on initial page load.
    
-   The cart, search categories, products, and footer use Suspense independently load when each piece ready.
    

### [Link to heading](#data-fetching-and-caching)Data fetching and caching

The biggest mental model shift in the App Router is to stop thinking which _pages_ should be static or dynamic and starting thinking about what _data_ is static or dynamic. Moving the static and dynamic decisions to data fetching gives you more control over when and where to serve static or dynamic content.

Using the new data [fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching) and [caching](https://nextjs.org/docs/app/building-your-application/caching) paradigms, revalidation (also known as Incremental Static Regeneration) moves to individual fetching too.

We're using [Shopify's Storefront API](https://shopify.dev/docs/api/storefront), which utilizes GraphQL. GraphQL expects that all requests are `POST` requests. We mimic Next.js built-in functionality of caching all calls by default, except for mutations.

lib/shopify/index.ts

```
const domain = `https://${process.env.SHOPIFY_STORE_DOMAIN!}`;const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;export async function shopifyFetch({  cache = 'force-cache',  headers,  query,  tags,  variables}) {  const result = await fetch(endpoint, {    method: 'POST',    headers: {      'Content-Type': 'application/json',      'X-Shopify-Storefront-Access-Token': key,      ...headers    },    body: JSON.stringify({      ...(query && { query }),      ...(variables && { variables })    }),    cache,    ...(tags && { next: { tags } })  });  const body = await result.json();  if (body.errors) {    throw body.errors[0];  }  return {    status: result.status,    body  };}
```

Shopify fetch wrapper

Since all data is cached by default, we need a way to trigger revalidation of data when needed. Let's use products as an example.

When we update a product description, inventory, etc. in Shopify, we want the site to reflect that change. We also don't want the site make unnecessary calls for this data if it's not changing. So we can cache by default, but add a revalidation tag.

lib/shopify/index.ts

```
import { getProductQuery } from './queries/product';const res = await shopifyFetch({  query: getProductQuery,  tags: ['products'],  variables: {    handle: 'acme-t-shirt'  }});
```

Get a Shopify product specifying a revalidation tag

Now we can subscribe to [Shopify webhooks](https://shopify.dev/docs/api/admin-rest/2023-07/resources/webhook) to be notified when product data changes and we can revalidate the product data using [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).

app/api/revalidate/route.ts

```
import { revalidateTag } from 'next/cache';import { NextRequest, NextResponse } from 'next/server';export async function POST(req) {  const productWebhooks = ['products/create', 'products/delete', 'products/update'];  const topic = headers().get('x-shopify-topic') || 'unknown';  const isProductUpdate = productWebhooks.includes(topic);  if (!isProductUpdate) {    // We don't need to revalidate anything for any other topics.    return NextResponse.json({ status: 200 });  }  if (isProductUpdate) {    revalidateTag('products');  }  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });}
```

Revalidate products and collections using Shopify webhooks

### [Link to heading](#server-actions)Server Actions

With [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations), we can colocate server-side data mutations with the UI that is invoking them, eliminating the need to create API routes used only by your application and reducing client-side JavaScript making the bundle size smaller.

components/cart/add-to-cart.tsx

```
'use client';import { addItem } from 'components/cart/actions';import { useRouter } from 'next/navigation';import { useTransition } from 'react';export function AddToCart({selectedVariantId}) {  const router = useRouter();  const [isPending, startTransition] = useTransition();  return (    <button      aria-label="Add item to cart"      disabled={isPending}      onClick={() => {        startTransition(async () => {          const error = await addItem(selectedVariantId);          if (error) {            alert(error);            return;          }          router.refresh();        });      }}    >      'Add To Cart'    </button>  );}
```

Next.js Commerce add to cart button

components/cart/actions.ts

```
'use server';import { addToCart, createCart, getCart } from 'lib/shopify';import { cookies } from 'next/headers';export const addItem = async (variantId) => {  let cartId = cookies().get('cartId')?.value;  let cart;  if (cartId) {    cart = await getCart(cartId);  }  if (!cartId || !cart) {    cart = await createCart();    cartId = cart.id;    cookies().set('cartId', cartId);  }  if (!variantId) {    return new Error('Missing variantId');  }  try {    await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);  } catch (e) {    return new Error('Error adding item', { cause: e });  }};
```

Next.js Commerce add to cart button Server Action

## [Link to heading](#repository-strategy)Repository strategy

The previous architecture of Next.js Commerce `v1` was a multi-vendor, interoperable solution, including integrations with ten e-commerce providers. For `v2`, we removed roughly 145,000 lines of code making the project more straightforward, maintainable, and easier to understand while also highlighting the latest features of the Next.js App Router.

Providers are able to fork the Next.js Commerce repository add support for their platform. We’re delighted that our partners [BigCommerce](https://github.com/bigcommerce/nextjs-commerce), [Medusa](https://github.com/medusajs/vercel-commerce), [Saleor](https://github.com/saleor/nextjs-commerce), and [Swell](https://github.com/swellstores/verswell-commerce) have embraced this new vision and already have [templates and demos](https://github.com/vercel/commerce#providers) using Next.js Commerce 2.0 ready to go. If you want to add support for your platform, follow the [instructions](https://github.com/vercel/commerce#providers) and open a pull request to add yours to the list.

To get started with your own ecommerce store, you can deploy your own version of Next.js Commerce 2.0 + Shopify by [visiting the template page](https://vercel.com/templates/next.js/nextjs-commerce) and using our one click to deploy button.