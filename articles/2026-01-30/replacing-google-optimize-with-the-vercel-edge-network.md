---
title: "Replacing Google Optimize with the Vercel Edge Network"
source: "https://vercel.com/blog/vercel-edge-google-optimize"
publishedDate: "2023-03-30"
category: "frontend"
feedName: "Vercel"
author: "Anthony Shew"
---

3 min read

Mar 30, 2023

Power your A/B testing and personalization strategy with data and performance.

Since 2012, Google Optimize has been helping web builders experiment with their UIs to find the most effective patterns for their applications. However, Google has [announced](https://support.google.com/optimize/answer/12979939?hl=en) that Optimize will be sunset on September 30, 2023.

Vercel is ready to help you build a platform to **continue your research with higher performance, more control, and better data** by leveraging the edge.

With Vercel, you can recreate your Optimize experiments with:

-   Sub-millisecond configuration read times
    
-   No code using your Vercel dashboard
    
-   Your existing data ingestion solution
    

[

**Modernize your experimentation stack**

Start your transition today.

Let's Talk



](https://vercel.com/contact/sales)

## [Link to heading](#google-optimize-performance-opportunities)Google Optimize performance opportunities

In the past, it's been difficult to run experiments in ways that don't harm page performance.

-   **Google Optimize's scripts** must be loaded on every page where you intend to perform an experiment, adding weight to your page size and increasing load times.
    
-   [**Cumulative Layout Shift (CLS)**](https://vercel.com/docs/concepts/analytics/web-vitals#cumulative-layout-shift-cls) hurts your application's SEO and UX—but is often introduced accidentally when running UI experiments on the client side.
    
-   **Server-side latency** increases when your server has to make calls to Google Optimize to figure out which experiments are currently being ran.
    

Instead, you can introduce [Vercel Edge Config](https://vercel.com/docs/concepts/edge-network/edge-config) and [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) to your experimentation framework to build a high-performance testing engine.

## [Link to heading](#what-is-the-edge)What is the edge?

The [Vercel Edge Network](https://vercel.com/docs/concepts/edge-network/overview) sits between the internet and your Vercel deployments acting as a Content Delivery network (CDN) with the ability to execute functions as close to your user or data as possible.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5dg96p0Es3W8ico3GdsX9Y%2F74716f2d1e017c49afaff140fd09ab0c%2FInline_Graphic-Dark-V3.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4pmJf7dmp1WtiMPifUx9xh%2Fb6db83d91a1f6e46a2d4a3fd9296c44d%2FInline_Graphic-Dark-V3.png&w=1920&q=75)

This means that the building blocks of your application will always be served from the geographically closest data center in the Edge Network, ensuring that your users experience the best performance possible.

With Vercel, you have several features that you can use together to **replicate and enhance** Google Optimize's experimenting functionality: Edge Config and Edge Middleware.

## [Link to heading](#sub-millisecond-experiments-with-edge-config)Sub-millisecond experiments with Edge Config

Vercel Edge Config is a small data store for distributing your data to the Edge Network where it can be replicated to all of your globally available regions. Your experiments data becomes available **instantly** and can be fetched in less than 10ms on average, letting you iterate on your experiments faster.

Once you've [created your Edge Config](https://vercel.com/docs/concepts/analytics/web-vitals#how-the-percentages-are-calculated), you can fetch its data in [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions), [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware), and [Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions). Let's use [the Edge Config SDK](https://vercel.com/docs/concepts/edge-network/edge-config/edge-config-sdk) in an Edge Function to get the best possible performance:

middleware.ts

```
import { NextResponse } from 'next/server';import { get } from '@vercel/edge-config';export const config = { matcher: '/welcome' };export async function middleware() {    const greeting = await get('greeting');   return NextResponse.json(greeting);}
```

Edge Config SDK being used in an Edge Function.

You'll receive the JSON object that you created for your Edge Config to define experiments in your application:

```
{  // A boolean feature flag  "winterSale": true,  // An A/B test with even weight  "saleColor": {    "red": .5,    "green": .5  },  // A multi-variate, weighted experiment  "buttonColor": {    "red": .2,    "green": .3,    "blue": .5  }}
```

An Edge Config payload with a few experiments.

You can then use this payload in your experimentation logic to create a powerful platform for your testing needs.

## [Link to heading](#eliminating-cumulative-layout-shift)Eliminating Cumulative Layout Shift

Embracing the edge also lets us significantly reduce [Cumulative Layout Shift (CLS)](https://vercel.com/docs/concepts/analytics/web-vitals#cumulative-layout-shift-cls) by making sure that we serve statically rendered content at the speed of dynamic. Using primitives from Next.js and Vercel

With [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware), you can read your Edge Config to serve the correct variant of your page instantly rather than computing the variant on the client after the page's initial load. Speedway Motors cut their CLS by 50% using this strategy as shown by [Vercel Analytics](https://vercel.com/docs/concepts/analytics/web-vitals).

![Cumulative Layout Shift for Speedway Motors was reduced by 50%.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fy2jv6UbAxix5NIZZCHssA%2F3c386fb82f9fb8faa04d0b6247b40832%2FSlice_1__2_.png&w=1920&q=75)

Cumulative Layout Shift for Speedway Motors was reduced by 50%.

## [Link to heading](#track-results)Track results

To analyze how your experiment is doing, you can leverage your current data solution of choice, passing in the context of your experiment as properties of your data.

CheckoutButton.tsx

```
import { saveData } from'@your-data-provider/sdk';export const CheckoutButton = () => {   useEffect(() => {    // Track how many times button was rendered    // and which experiments were active    saveData("Checkout button impression", {      isWinterSale: true,      saleColor: "red",       buttonColor: "blue"    })  }, [])  const handleClick = () => {    // Track when a user clicks the button    // and which experiments were active      saveData("Checkout button click", {      isWinterSale: true,      saleColor: "red",       buttonColor: "blue"    })    // Your checkout logic    console.log("Check out!")  }  return (    <button onClick={() => handleClick()}>      Checkout    </button>  )}
```

In the future, we're looking forward to adding more features to track your experiments.

## [Link to heading](#experiment-faster-by-default)Experiment faster by default

We want to help you replace your experiments and **make them even better.**

By taking your experiments to the edge, the tests that you were running with Google Optimize can be incrementally migrated to improve your page performance while still collecting the valuable experimentation data that drives your business.

[

**Talk to a migration expert**

Start building a cleaner enterprise-grade stack.

Contact Sales



](https://vercel.com/contact/sales)