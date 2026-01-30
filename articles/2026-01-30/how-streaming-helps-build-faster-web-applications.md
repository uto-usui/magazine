---
title: "How streaming helps build faster web applications"
source: "https://vercel.com/blog/how-streaming-helps-build-faster-web-applications"
publishedDate: "2024-01-31"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

3 min read

Jan 31, 2024

Learn how the Next.js App Router helps you take advantage of streaming UI.

Streaming is the key to **fast** and **dynamic** web applications.

When [streaming](https://vercel.com/blog/an-introduction-to-streaming-on-the-web), you can progressively send UI from server to client, without needing to wait until all of your data has been loaded. This helps your customers see content immediately, like your main call to action to add an item to the cart.

Let's learn how streaming helps build fast web applications and a great product experience.

## [Link to heading](#how-streaming-helps-improve-performance)How streaming helps improve performance

The largest sites on the web, like Amazon and Google, utilize streaming to improve both performance (defined by [Core Web Vitals](https://vercel.com/blog/how-core-web-vitals-affect-seo)) _and_ [conversion rates](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud#why-do-you-need-speed).

Streaming can prevent slow data sources from blocking the display of initial UI to your customers, with the added benefit of parallelizing work for loading other critical assets like JavaScript, stylesheets, and fonts.

### [Link to heading](#colocating-compute-next-to-your-data-origin)Colocating compute next to your data origin

As your application grows, so does network traffic between your clients (possibly in distant regions) and your database (likely in one region). We can’t beat the speed of light, so we need compute to run close to our data. That’s usually one region, _maybe_ 2-3, depending on your data sovereignty and security requirements.

For example, your Vercel Function can [stream responses](https://vercel.com/docs/functions/streaming) from `us-east` close to your data, and prevent many network roundtrips from origin and Vercel region.

To further optimize your [Time To First Byte (TTFB)](https://web.dev/ttfb/), Next.js is building [Partial Prerendering](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model) to generate a static shell of your route ahead of time and deploy it to every Vercel region. Partial Prerendering enables consistent, fast initial loading, paired with being able to stream dynamic data from your [Vercel Functions](https://vercel.com/docs/functions/streaming) at the same time.

## [Link to heading](#using-streaming-with-the-next.js-app-router)Using streaming with the Next.js App Router

The Next.js App Router, with React Suspense, makes it easy to stream UI components. Next.js supports both out-of-order streaming (default) and in-order streaming defined by your Suspense boundaries.

Unlike conventional streaming that follows a sequential order, out-of-order streaming enhances user experience by rendering parts of a UI, while continuing to load other elements, reducing the perceived load time.

Streaming pairs with the React component model. Each component can be considered a chunk. Components that have higher priority (e.g. product information) or that don't rely on data can be sent first (e.g. layout), and React can start hydration earlier. Components that have lower priority (e.g. reviews, related products) can be sent in the same server request after their data has been fetched.

Learn more about [streaming and React Suspense in Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming). Optionally, learn more about a new technique that takes advantage of streaming called [Partial Prerendering](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model).

## [Link to heading](#using-streaming-with-ai-applications-and-llms)Using streaming with AI applications and LLMs

The next generation of web apps built on [AI](https://vercel.com/ai) are also [using streaming](https://sdk.vercel.ai/docs/concepts/streaming).

Large Language Models (LLMs) are extremely powerful. However, when generating long outputs, they can be very slow compared to the latency you're likely used to. If you try to build a traditional blocking UI, your users might easily find themselves staring at loading spinners for 5, 10, even up to 40s waiting for the entire LLM response to be generated. This can lead to a poor user experience, especially in conversational applications like chatbots.

Streaming UIs can help mitigate this issue by displaying parts of the response as they become available. This is easily enabled through the combination of Next.js and the [AI SDK](https://sdk.vercel.ai/docs).

## [Link to heading](#start-streaming)Start streaming

Want to build your next product with the power of streaming? Get started with the [Next.js App Router](https://vercel.com/templates/next.js/nextjs-boilerplate) and learn more about [streaming in Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming).