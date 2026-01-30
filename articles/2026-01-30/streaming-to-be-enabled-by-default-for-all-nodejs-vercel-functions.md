---
title: "Streaming to be enabled by default for all Node.js Vercel Functions"
source: "https://vercel.com/changelog/vercel-functions-to-enable-streaming-by-default"
publishedDate: "2024-07-04"
category: "frontend"
feedName: "Vercel"
author: "Javi Velasco"
---

1 min read

Jul 4, 2024

[Streaming](https://vercel.com/docs/functions/streaming-functions) will soon be enabled by default for all [Node.js Vercel Functions](https://vercel.com/docs/functions/runtimes/node-js#using-the-node.js-runtime-with-serverless-functions).

This change will be effective for Hobby accounts starting **July 8th, 2024;** and for Pro and Enterprise accounts starting **October 1st, 2024**.

To enable streaming as the default immediately for all your Vercel Functions, set the `VERCEL_FORCE_NODEJS_STREAMING` environment variable in your project to `true`. Streaming will be enabled on your next deployment.

Streaming responses from functions will change the [format and frequency of your runtime logs](https://vercel.com/docs/functions/streaming-functions#runtime-logs). If you are using Log Drains, you should ensure that your ingestion pipeline can handle the new format and increased frequency.

Check out this [blog post](https://vercel.com/blog/vercel-functions-streaming-to-be-framework-agnostic) and our [streaming documentation](https://vercel.com/docs/functions/streaming-functions) for more details.