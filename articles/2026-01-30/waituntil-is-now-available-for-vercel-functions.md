---
title: "waitUntil is now available for Vercel Functions"
source: "https://vercel.com/changelog/waituntil-is-now-available-for-vercel-functions"
publishedDate: "2024-05-10"
category: "frontend"
feedName: "Vercel"
author: "Kiko Beats"
---

1 min read

May 10, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Olfta5i5zKJjzNPUlEYsi%2Fc57de06611c22e66531a3ea69e055477%2FmaxDuration_-_Light__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FRlnIxxeoIptVKDZgLSYBC%2F337a3b9c45f9dbbf11e04b4cf263a67c%2FmaxDuration_-_Dark__2_.png&w=1920&q=75)

You can now use [waitUntil](https://vercel.com/docs/functions/functions-api-reference#waituntil) by importing `@vercel/functions` in your Vercel Functions, regardless of the framework or runtime you use.

The `waitUntil()` method enqueues an asynchronous task to be performed during the lifecycle of the request. It doesn't block the response, but should complete before shutting down the function.

It's used to run anything that can be done after the response is sent, such as logging, sending analytics, or updating a cache, without blocking the response from being sent.

The package is supported in Next.js (including Server Actions), Vercel CLI, and other frameworks, and can be used with the [Node.js and Edge runtimes](https://vercel.com/docs/functions/runtimes).

Learn more in the [documentation](https://vercel.com/docs/functions/functions-api-reference#waituntil).