---
title: "Bytecode caching for Serverless Functions by default"
source: "https://vercel.com/changelog/bytecode-caching-for-serverless-functions-by-default"
publishedDate: "2024-08-21"
category: "frontend"
feedName: "Vercel"
author: "Javi Velasco"
---

1 min read

Aug 21, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6KcQ999WPGve6PK7oJuJ8U%2F86b53753155b50f09ba1bdeb3f25afdd%2FBytecode_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4F5AVpcEHGB1XMUMu0Yx0Z%2F5946e004229f4e4f390511737d4bccb5%2FBytecode_-_Dark.png&w=1920&q=75)

We recently [introduced bytecode caching](https://vercel.com/blog/introducing-bytecode-caching-for-vercel-functions)—an experimental feature built on our new Rust-based core for Vercel Functions—designed to drastically reduce start times during [increasingly rare](https://vercel.com/changelog/vercel-functions-now-have-faster-and-fewer-cold-starts) cold starts. Even when cold starts do occur, their impact is now minimal and barely noticeable.

After validating the stability and performance improvements of bytecode caching, the feature is now **stable and the default** for all [Node.js 20+ Vercel Functions](https://vercel.com/docs/functions/runtimes/node-js#using-the-node.js-runtime-with-serverless-functions).

This change **reduces global cold start times by up to 60%,** exceeding our initial benchmarks and observations. The improvement is particularly significant for functions that load a large amount of JavaScript, with smaller functions experiencing less impact.

Bytecode caching is automatically enabled for all functions running on [Node.js 20 and using CommonJS](https://vercel.com/docs/functions/runtimes/node-js#bytecode-caching) (e.g., Next.js). Additionally, we're working to extend this support to include ESM for broader compatibility. Learn more in [our blog post](https://vercel.com/blog/introducing-bytecode-caching-for-vercel-functions).