---
title: "Guide to fast websites with Next.js: Tips for maximizing server speeds and minimizing client burden"
source: "https://vercel.com/blog/guide-to-fast-websites-with-next-js-tips-for-maximizing-server-speeds"
publishedDate: "2023-11-29"
category: "frontend"
feedName: "Vercel"
author: "Seif Ghezala"
---

8 min read

Nov 29, 2023

Tinloof Co-founder Seif Ghezala gives insights into how his team measures website speed with best practices to make faster websites.

[Tinloof](https://tinloof.com/) is an agency obsessed with delivering fast websites such as jewelry brand [Jennifer Fisher](https://jenniferfisher.com/), which went from a Shopify theme to a modern [Next.js](https://nextjs.org/) website that instantly loads with 80% less JavaScript.

When evaluating the speed of a website, they look at key metrics in a typical user journey:

1.  **Server response time:** How long it takes for the user to get any feedback once landed on the page.
    
2.  **Page render time:** How long it takes for a page to become fully visible and interactive.
    
3.  **User interaction time:** How long it takes the user to make key interactions on the page such as navigating between pages or adding an item to the cart.
    

This article covers tips to measure and make each part of the user journey as fast as it gets.

## [Link to heading](#the-basics-of-site-speed:-measuring-data-correctly)**The basics of site speed: Measuring data correctly**

The key to making your site fast and keeping it fast—for any user on any device—is data.  
Speed is more than just a way to gauge user experience, it's crucial for getting the top spot on any search platform and winning organic page views.

To ensure they're measuring the right data correctly, tools like [Google PageSpeed Insights](https://pagespeed.web.dev/) and [Vercel Speed Insights](https://vercel.com/docs/speed-insights) are able to provide objective metrics. These tools can be used to diagnose page performance issues, providing insights into aspects like loading times, interactivity, and visual stability.

It's also equally important to test the user journey under various network conditions.

Combining objective tools with a hands-on approach provides a comprehensive view of a website experience, ensuring it’s optimised for all users.

[

**Vercel Speed Insights**

Learn how to get a detailed view of your website's performance metrics to help facilitate informed decisions on optimization.

Get Started



](https://vercel.com/docs/speed-insights)

## [Link to heading](#how-to-speed-up-server-response:-make-use-of-next.js’-rendering-toolbox)How to speed up server response: Make use of Next.js’ rendering toolbox

Once key performance metrics are evaluated, the team is able to pinpoint where and how to make improvements in things like server response.

### [Link to heading](#when-possible:-pre-render-the-entire-page)When possible: Pre-render the entire page

Pre-rendering the page at build-time ensures it is served from a CDN instead of your origin server, resulting in the fastest server response possible. This is done automatically by Next.js if you don’t use the `edge` runtime and the page doesn’t rely on cookies, headers, or search parameters.

### [Link to heading](#else:-partial-prerender-)Else: Partial Prerender

Pre-rendering an entire page might not be always possible.  

With [Partial Prerendering](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model) (PPR) in Next.js, it's possible to pre-render a shell of the page that is served from a CDN while streaming the dynamic bits at the same time.

Partial Prerendering is currently [an experimental feature](https://twitter.com/leeerob/status/1723039087391543654) that allows you to render a route with a static loading shell, while keeping some parts dynamic. In other words, you can isolate the dynamic parts of a page instead of a whole route.

### [Link to heading](#final-resort:-render-a-loading-shell-while-waiting-for-the-final-response)Final resort: Render a loading shell while waiting for the final response

When a page is rendered at request time, it’s better to immediately show the user a UI hint that indicates a page is loading, rather than unresponsive links.

It’s best to make the loading UI resemble as much as possible the final one.

In Next.js, there are two places where you can render the loading UI:

-   In a [loading.tsx](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) file inside the page route folder.
    

-   Inside the fallback prop of the [Suspense boundary](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense) that wraps async component making requests inside the page.
    

### [Link to heading](#cache-fetch-requests-for-fast-server-responses-when-using-loading-spinners)Cache fetch requests for fast server responses when using loading spinners

Loading shells are not an excuse for slow server responses. Most server responses can be cached instead of making the user wait for them on every page visit.  
Although this is the default behaviour of `fetch` requests in Next.js, you can still control the freshness of this data:

-   By revalidating the server response every x number seconds.
    

app/page.tsx

```
export default function Home() {  // The CMS data is guaranteed to be fresh every 2 minutes  const cmsData = await fetch(`https://...`, { next: { revalidate: 120 } });  return <h1>{cmsData.title}</h1>}
```

-   Or by revalidating the server response when a certain event happens. Here’s an example where a CMS response is revalidated whenever a new CMS page gets published.
    

app/page.tsx

```
export default function Home() { // The CMS data is cached until the tag is revalidated  const cmsData = await fetch(`https://...`, { next: { tags: ['landing-page']);  return <h1>{cmsData.title}</h1>}
```

app/api/revalidate/route.ts

```
import { revalidateTag } from 'next/cache';import { NextRequest, NextResponse } from 'next/server';export async function POST(req: NextRequest): Promise<NextResponse> {  const secret = req.nextUrl.searchParams.get('secret');  const tag = req.nextUrl.searchParams.get('landing-page');  if(!tag || !isValid(secret)) {		return NextResponse.json({ status: 400});  }  return revalidate(tag);} 
```

The [Next.js guide on caching and revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating) and the [App Router explainer video](https://www.youtube.com/watch?v=gSSsZReIFRk&t=577s&ab_channel=Vercel) are perfect to help understand these concepts.

## [Link to heading](#how-to-speed-up-the-page-render:-minimize-client-burden)How to speed up the page render: Minimize client burden

**Short answer:** Make the browser do the least amount of work to render the page.

Once the browser receives a response from the server, it still has to paint the entire page and make it ready for user interactions (e.g. button clicks).

While parsing the HTML and rendering, the browser is also downloading resources such as CSS, JavaScript, font, or image files.

The following tips help make page render fast by making the browser do as little work as possible.

### [Link to heading](#reduce-the-javascript-bundle-size-and-minimize-the-impact-of-hydration)Reduce the JavaScript bundle size and minimize the impact of hydration

The JavaScript shipped with React websites usually consists of React, Next.js, the application code including the JSX of every single React component, and third-party dependencies.

Once the page HTML is rendered and the JavaScript is downloaded, React goes through a process called “[hydration](https://chat.openai.com/share/4bf8f74b-1681-40c6-aae3-dc1ae00013db)” where it attaches event listeners and state to the components of the page.

Just by using [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) you already get a speed bump because:

1.  Their JavaScript (including application code, JSX, and third-party dependencies) is not shipped to the browser.
    
2.  React skips their hydration.
    

When a component requires interactivity (e.g. state, event listeners), a `use client` directive can be used to convert it to a client component which in addition of being rendered in the server, also has its JavaScript shipped to the browser and is hydrated by React.

## [Link to heading](#reduce-the-impact-of-client-components-on-page-speed)Reduce the impact of client components on page speed

### [Link to heading](#only-use-client-components-when-necessary)Only use client components when necessary

URLs can be used to store a component state without having to make it a client component that relies on React’s state.

It requires less code to manage the state, turns state buttons to links that work even without JavaScript, and makes it possible to persist the state on page refresh or when sharing the URL.

### [Link to heading](#place-client-components-in-the-leaves-of-the-page-tree)Place client components in the leaves of the page tree

To minimize the JavaScript footprint of imported child components, it’s a good practice to place client components the furthest possible at the bottom of the components tree.

### [Link to heading](#be-mindful-of-third-party-dependencies’-bundle-sizes)Be mindful of third-party dependencies’ bundle sizes

Any client component dependency is more JavaScript for the browser to download, parse, and execute.

Tools such as [pkg-size](https://pkg-size.dev/) can be used to determine the size impact of NPM packages based on what’s imported from them and help decide between alternatives.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6sMaZzAOyFXBuBH3oxwi75%2F3d272a94b6d53a8d2a2c859f090b1056%2FUntitled__2_.png&w=1920&q=75)

### [Link to heading](#lazy-load-client-components-when-possible)Lazy-load client components when possible

Even when a client component is necessarily heavy, it’s still possible to only download its JavaScript once it’s rendered.

For example, [the stockists page on Jennifer Fisher](https://jenniferfisher.com/pages/stockists) uses `mapbox-gl`, an extremely heavy package, to display interactive maps.

Since `mapbox-gl` is only used to display maps, its wrapper client component is lazy-loaded so the package bundle is only downloaded when the component is rendered.

You can lazy-load a client component either via `next/dynamic` or a combination of `React.lazy` and `Suspense` , more details can be found on [Next.js guide on the topic](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading).

### [Link to heading](#efficiently-load-third-party-scripts)Efficiently load third-party scripts

Some third-party dependencies like Google Tag Manager are injected via script tags instead of imports in client components.

[@next/third-parties](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries) can be used to reduce their impact on page render speed and if dependency is not supported, [next/script](https://nextjs.org/docs/app/api-reference/components/script) is also a great option.

## [Link to heading](#how-to-load-fonts-more-efficiently)How to load fonts more efficiently

Some web fonts are unnecessarily heavy because they include characters not even needed by the website.

In the case of Jennifer Fisher, Tinloof was able to trim out more than 50% of font files using tools such as [transfonter](https://transfonter.org/).

[next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) makes it possible to load local and Google Fonts while providing the following optimizations:

1.  Only load fonts on pages where they are used.
    
2.  [Preload](https://web.dev/articles/codelab-preload-web-fonts) fonts to make them available early on when rendering.
    
3.  Use display strategies such as [swap](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) to avoid blocking text rendering by using a fallback font.
    

## [Link to heading](#how-to-load-images-more-efficiently)How to load images more efficiently

**Short answer:** use [next/image](https://nextjs.org/docs/app/building-your-application/optimizing/images) when you can.

The `next/image` component provides so many optimizations for local or remote images.

A detailed guide is available on [Next.js docs](https://nextjs.org/docs/app/building-your-application/optimizing/images) so I’ll only highlight some of them:

1.  Images are automatically served in modern efficient formats such as AVIF or WebP that preserve quality and dramatically reduce the download size.
    
2.  Images are only loaded when visible in the viewport and a `lazy` boolean prop is available
    
    [to do the opposite for critical images](https://web.dev/articles/lcp-lazy-loading).
    
3.  A `preload` prop is available to make the browser load critical images ASAP.
    
4.  Images are automatically served in different sizes based on the viewport and props such as `sizes` or `loader` are available to customise the behaviour.
    
5.  Local images can automatically show a placeholder while loading and you can provide a
    
    `blurDataURL` to achieve the same with remote images.
    

The `next/image` component is just a very handy utility and is not required to achieve the benefits above:

1.  Images can still be served in modern formats by using CDNs that can convert them on the fly.
    
2.  Lazy-loading images is a native browser attribute that can be used by default.
    
3.  Images can be preloaded using a preload link
    
    `<link rel="preload" as="image" href="..." />` in the document’s `head` or using `ReactDOM.preload.`
    
4.  When loading images from a different domain, it’s a good practice to use
    
    [preconnect links](https://web.dev/articles/preconnect-and-dns-prefetch) to inform the browser to establish a connection with the image provider domain early-on.
    

## [Link to heading](#how-to-load-videos-more-efficiently)How to load videos more efficiently

Solutions such as [Mux](https://www.mux.com/blog/multi-cdn-support-in-mux-video-for-improved-performance-and-reliability), [Cloudinary](https://cloudinary.com/), or CDNs such as [Fastly](https://www.fastly.com/products/streaming-media/video-on-demand) can be used to help optimise video delivery by serving videos as close as possible to users.

A poster image is a must-have for any video and you can either manually set it or easily extract the first frame of the video to be the poster image when using any video CDN.

The best part is that you can use the same image optimizations tips discussed earlier to render the poster image efficiently.

Here’s an example Mux video component that utilises these optimizations and it’s only rendered on the server:

```
import { preload } from "react-dom";import { unstable_getImgProps as getImgProps } from "next/image";type Props = {  playbackId: string;  loading: "lazy" | "eager";  resolution: "SD" | "HD";};export default function MuxVideo({ playBackId, loading, loading }: Props) {  const mp4Url = `https://stream.mux.com/${playbackId}/${    resolution === "SD" ? "medium" : "high"  }.mp4`;  const webmUrl = `https://stream.mux.com/${playbackId}/${    resolution === "SD" ? "medium" : "high"  }.webm`;  // Use `getImgProps` to convert the video poster image to WebP  const {    props: { src: poster },  } = getImgProps({    src: `https://image.mux.com/${playbackId}/thumbnail.webp?fit_mode=smartcrop&time=0`,    alt: "",    fill: true,  });  // Preload the poster when applicable  if (loading === "eager") {    preload(poster, {      as: "image",      fetchPriority: "high",    });  }  return (    <video      autoPlay      playsInline      loop      controls={false}      muted      preload="none"    >      <source src={mp4Url} type="video/mp4" />      <source src={webmUrl} type="video/webm" />    </video>  );}
```

For videos that are not required to load immediately, you lazy-load them without causing any layout shift:

```
'use client';import Image from 'next/image';import { useEffect, useState } from 'react';import useInView from '~/hooks/useInView';import Video, { VideoProps } from './Video';export default function LazyLoadedVideo(props: VideoProps) {  const { ref, inView } = useInView({ triggerOnce: true });  return (    <>      {!inView ? (        <Image          ref={ref as React.RefObject<HTMLImageElement>}          alt={'Video poster'}          src={props.poster ?? ''}          className={props.className}          style={props.style}          loading={'lazy'}          layout="fill"        />      ) : (        <Video {...props} />      )}    </>  );}
```

## [Link to heading](#how-to-reduce-the-html-document-size)How to reduce the HTML document size

The HTML document is a critical resource the browser has to download and parse.

### [Link to heading](#use-virtualization)**Use virtualization**

Components such as carousels/sliders, tables, and lists are also usual culprits.

You can use libraries such [TanStack Virtual](https://tanstack.com/virtual/v3) to only render items when they are visible in the viewport while avoiding any layout shifts.

## [Link to heading](#how-to-speed-up-user-interactions)How to speed up user interactions

**Short answer:** Provide feedback to the user as early as possible.

Some user interactions such as URL state navigations when filtering or adding an item to the cart rely on server responses, which are not always immediate, causing slow interactions or leaving the user puzzled on whether something went wrong.

Optimistic UI techniques can be used to make such interactions snappy and provide immediate feedback to users.

The idea is to use JavaScript to show the predicted result to the user without waiting the server to return a response.

It can be achieved either through normal React state management or using [React’s useOptimistic hook](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations#optimistic-updates).

## [Link to heading](#the-importance-of-a-performant-website)The importance of a performant website

Fast websites are more pleasant to use, more engaging to users, and it’s no surprise they directly impact success metrics such as conversion rate and search engine indexation.

Although the tips above are focused on Next.js, the concepts behind them can be used to make any website faster.

[

**Want to talk to an expert?**

Brainstorm with our team about your unique use case of Next.js.

Send us a message



](https://vercel.com/contact/sales)