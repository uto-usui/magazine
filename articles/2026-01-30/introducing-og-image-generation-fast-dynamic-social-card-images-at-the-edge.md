---
title: "Introducing OG Image Generation: Fast, dynamic social card images at the Edge"
source: "https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images"
publishedDate: "2022-10-10"
category: "frontend"
feedName: "Vercel"
author: "Shu Ding"
---

3 min read

Oct 10, 2022

Create attention-grabbing, eye-catching OpenGraph imagery with code.

We’re excited to announce **Vercel OG Image Generation** – a new library for generating dynamic social card images. This approach is **5x faster** than existing solutions by using Vercel Edge Functions, WebAssembly, and a brand new core library for converting HTML/CSS into SVGs.

[Try it out in seconds.](https://og-playground.vercel.app/)

## [Link to heading](#dynamic-with-limits)Dynamic with limits

The engagement rate of Tweets that embed a card is [40% higher](https://www.agorapulse.com/social-media-lab/link-tweet-with-an-image-vs-tweet-with-twitter-cards-does-it-really-matter/). While creating and sharing static social images isn’t difficult, handling **dynamic images** that need to be computed and generated instantly has had limits.

We released [og-image.vercel.app](https://og-image.vercel.app/) four years ago to enable developers to dynamically generate [open graph](https://ogp.me/) (OG) images by taking a screenshot of an HTML page inside of a Serverless Function. It’s since been used by thousands of developers to handle their social images. While functional, this approach came with some downsides:

-   **Difficult:** This solution required launching Chromium in a Serverless Function and taking a screenshot of the given HTML page with Puppeteer. Setting up these tools was hard to implement and often led to errors.
    
-   **Slow:** Because Chromium needs to be compressed to fit inside a Serverless Function and then decompressed on a cold boot, it’s very slow (~4 seconds on average). This can result in _slow or broken social card images_.
    
-   **Expensive:** Spinning up an entire browser just to take a screenshot was not efficient. This led to large Function sizes, which could be expensive and waste compute.
    
-   **Large:** Chromium has continued to grow in the past four years. Today, it's
    
    [too large to fit in a Serverless Function](https://github.com/vercel/og-image/issues/148).
    

## [Link to heading](#dynamic-without-limits)Dynamic without limits

We’ve created a brand new open-source library `@vercel/og` to generate dynamic social card images. Vercel OG is:

-   **Easy:** No headless browser is needed. Using Vercel OG, you can define your images using HTML and CSS and automatically generate dynamic images from the generated SVGs.
    
-   **Affordable:** Vercel Edge Functions are ~160x cheaper than running Chromium in a Serverless Function. Further, generated images can be cached and stored at the Edge.
    
-   **Fast:** Vercel OG (500KB) is 100x more lightweight than Chromium + Puppeteer (50MB), which allows functions to start _almost instantly_. This helps ensure images are never too slow to generate and are always recognized by tools like the Open Graph Debugger.
    

Our results from usage on [vercel.com/docs](http://vercel.com/docs) show Vercel OG is **5x faster** in P99 TTFB (4.96s → 0.99s) and **5.3x faster** in P90 (4s → 0.75s) than our previous version. Further, the code is colocated with the rest of the application for easier maintenance and updates.

Vercel OG also supports the following features:

-   Support for basic CSS layout, styling, and typography
    
-   Support for use in any framework or frontend application
    
-   Support for downloading font and emoji subsets from Google Fonts and other CDNs
    

## [Link to heading](#dynamic-social-images-at-the-edge)Dynamic social images at the Edge

Vercel OG converts HTML and CSS into images.

The core engine, [Satori](https://github.com/vercel/satori), can be used in modern browsers, Node.js, and Web Workers. Building on top of the core engine, Vercel OG is able to be used inside Edge environments through WebAssembly to easily create social card images.

By leveraging the React component abstraction, social cards can be co-located with the rest of your frontend codebase. For example, inside a Next.js application:

pages/api/og.jsx

```
import { ImageResponse } from '@vercel/og'export const config = {  runtime: 'experimental-edge',}export default function () {  return new ImageResponse(    (      <div        style={{          display: 'flex',          fontSize: 128,          background: 'white',          width: '100%',          height: '100%',        }}      >        Hello, World!      </div>    )  )}
```

A Next.js Edge API Route to create a dynamic social card image.

Vercel OG automatically adds the correct Cache-Control headers to ensure the image is cached at the Edge after it’s been generated.

```
'content-type': 'image/png''cache-control': 'public, immutable, no-transform, max-age=31536000'
```

Caching headers from a generated Vercel OG image.

[View more examples](https://vercel.com/docs/functions/edge-functions/og-image-generation/og-image-examples) or [read the API documentation](https://vercel.com/docs/functions/edge-functions/og-image-generation/og-image-api).

> Our social card generation previously used a compressed Chromium release to fit inside the 50mb Serverless Function limit. Due to the size of Chromium, images could take up to 5 seconds to generate, making sharing links feel slow. With Vercel OG, images render almost immediately.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4nj1ehph2X5cYTIOrpFuSX/ba7c5b4c5a8fcf430c7a875310bceb60/T034MNZLR-U034MNZLT-a4b8828f4187-512.png)
> 
> **Ben Schwarz**

## [Link to heading](#tailwind-css-support)Tailwind CSS Support

Vercel OG also includes support for using Tailwind CSS with the `tw` prop.

```
<div tw="flex h-full items-center bg-white justify-center">  <div tw="bg-gray-50 flex">    <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">      <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">        <span>Ready to dive in?</span>        <span tw="text-indigo-600">Start your free trial today.</span>      </h2>      <div tw="mt-8 flex md:mt-0">        <div tw="flex rounded-md shadow">          <a href="#" tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">Get started</a>        </div>        <div tw="ml-3 flex rounded-md shadow">          <a href="#" tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">Learn more</a>        </div>      </div>    </div>  </div></div>
```

An example Vercel OG image, modified from the Tailwind UI marketing section.

![The example OG image using Tailwind CSS with Vercel OG.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7j0Q5RVNMD9EIyMbPZ4nhp%2F121a7a84c63f54da746ffd572516a040%2FCleanShot_2022-10-03_at_20.54.17_2x.jpg&w=1920&q=75)

The example OG image using Tailwind CSS with Vercel OG.

View this example in the [Vercel OG Playground](https://og-playground.vercel.app/?share=xVRNb9swDP0rgoahl6h2v4bOSLtDNwwDtsu2oy9yRNtq9WFIch0jyH8fJc-tEwTDbj0kJvlo8j1S1o5urABa0CwjP6yQtQRBKu7x3xrShtD5IssCl2qQRvTyfGN1hr_OGjDBZ5q7JwjSNJmHTZDW-GwTOJud0pRmLeRzaQjxYVRwt9tFm5AWZNOGgpxd5Pn7s9UUHKQI7VFMSN8pPmK0VrCdo9H-LN3UBrGNVb02M8qVbMy3ANpHCImCm6HH3gdZjw8Wgyb2P4QrvnlqnO2NeLDKOsSHVgaY4P2-NPfRiJJIGO5KWjWscXxkN3miVNKELzNiOGEMORItimQ7O5CB1b1SpBvZxSXptuw6othMezaRmsmyCsIAYEjHbl86YI_28lSLANvArraKeF0k-xrtGvWyyipBgkOJuDAW4gKm7CThY55PnoI6LNpgI99xc_8TuBhJsLiRZyDSfFpnKX6UN1FKhfDEyMayD3mO5X4F7gIZbe9I7QCQh-RI1go-nh9VWmft5avzMkkd2G2SGeeETqy6aH448bRDEEwL4lsu7HCQjOmctA5qTH9X0sV7J-f_113UrKwTGJkeDGdqUIHDNIIn4lV3XOtN3PDVNNr4ZU270CBkr6doOmLI7ysE_EpwTCDWGV9qy1DcSa1aYek3F5wE_J_WgzPxHbgzRFsH_9K79F7t2ZqfdEVtly4dWuxouklocZvnKzpdNbS4jo6Aqm9oUXPlYUVB20f5e-ziDYifWPSwTiT9RVcgaBFcD_v9Hw).

## [Link to heading](#dynamic-ticket-images-for-next.js-conf)Dynamic ticket images for Next.js Conf

We were able to put Vercel OG Image to the test at [Next.js Conf](https://nextjs.org/conf) by creating dynamic ticket images for every attendee.

For over 100,000 tickets, we’ve seen images generated **on average in 800ms**. That sub-second response includes loading two custom fonts, two external requests to fetch the GitHub avatar and ticket background images, as well as two embedded SVG images.

Since we have the power of CSS, it’s easy to handle wrapping names that could break the layout, as well as supporting special characters outside of the font glyph range.

![With Vercel OG, you can use the power of CSS to wrap layouts, as well as dynamically fetch and subset fonts from CDNs on the fly.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5s8cGi4FKAStM914drOvdz%2F8f2ccaba45dd326c6009a9d7e7cbca5b%2FCards__1_.png&w=1920&q=75)

With Vercel OG, you can use the power of CSS to wrap layouts, as well as dynamically fetch and subset fonts from CDNs on the fly.

## [Link to heading](#try-vercel-og-image-generation)Try Vercel OG Image Generation

Vercel OG Image Generation using Vercel Edge Functions is available today in public beta.