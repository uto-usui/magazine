---
title: "Function streaming to be framework-agnostic on Vercel"
source: "https://vercel.com/blog/vercel-functions-streaming-to-be-framework-agnostic"
publishedDate: "2024-07-04"
category: "frontend"
feedName: "Vercel"
author: "Javi Velasco"
---

2 min read

Jul 4, 2024

Streaming will soon be enabled by default for all Node.js Vercel Functions

In 2023, Vercel Functions added support for [streaming HTTP responses](https://vercel.com/blog/streaming-for-serverless-node-js-and-edge-runtimes-with-vercel-functions).

This feature has been enabled for frameworks like Next.js (App Router), SvelteKit, Remix, and more. We've been progressively rolling out streaming to more frameworks over the past two years, and we're beginning to roll out streaming for [all functions](https://vercel.com/docs/functions/runtimes/node-js) and compatible frameworks.

## [Link to heading](#what-changes-when-streaming-responses)What changes when streaming responses?

When your Vercel Functions stream responses instead of buffering, you can immediately return results to your visitors—either an API function response or a server-side template.

## [Link to heading](#responses-on-runtime-errors)Responses on runtime errors

When streaming, response headers are sent immediately with the initial stream. If there is a runtime error after the initial headers have been sent, the function closes the stream and logs an error to Vercel. For example:

api/index.js

```
import { setTimeout } from "node:timers/promises";export default async function (req, res) {  res.writeHead(200, { "Content-Type": "text/plain" });  res.write("Chunk 1\\n");  await setTimeout(1000);  throw new Error("Oh no!");}
```

An example function that writes to the response with a delay.

When buffering a response and not streaming, this function would not respond for several seconds. Since the function throws an error before completion, it would respond with a `500` error:

```
HTTP/2 500cache-control: public, max-age=0, must-revalidatecontent-type: text/plain; charset=utf-8date: Mon, 24 Jun 2024 10:26:35 GMTserver: Vercelstrict-transport-security: max-age=63072000; includeSubDomains; preloadx-robots-tag: noindexx-vercel-error: FUNCTION_INVOCATION_FAILEDx-vercel-id: cdg1::hgz6d-1719224792404-c4031128df3bcontent-length: 56A server error has occurredFUNCTION_INVOCATION_FAILED
```

An example of a 500 error response from a Vercel Function.

When streaming is enabled, the response status code and part of the body will have already been sent to the client. The stream will send the status code and part of the body before ending. For example, you would then see `Oh no!` error in the Vercel logs.

```
HTTP/2 200age: 0cache-control: public, max-age=0, must-revalidatecontent-type: text/plaindate: Mon, 24 Jun 2024 10:29:58 GMTserver: Vercelstrict-transport-security: max-age=63072000; includeSubDomains; preloadx-robots-tag: noindexx-vercel-cache: MISSx-vercel-execution-region: iad1x-vercel-id: cdg1::iad1::zclv9-1719224997952-452256b220b0Chunk 1
```

An example of a 200 response from a streamed function.

## [Link to heading](#enhanced-runtime-logs-experience)Enhanced runtime logs experience

Without streaming, Functions need to finish executing before a response can be sent to the client. Similarly, logs are only sent from the function and visible in the Vercel logs UI until after the function finishes responding.

When viewing runtime logs in the Logs tab, you would see a single line for each function invocation. The log line contains all context for that invocation up to `4KB` size limit. For example:

```
import { setTimeout } from "node:timers/promises";export default async function (req, res) {  console.log("Before setting a response");  res.writeHead(200, { "Content-Type": "text/plain" });  res.write("Chunk 1\\n");  await setTimeout(1000);  console.warn("Before writing a second chunk");  res.write("Chunk 2\\n");  await setTimeout(1000);  console.error("Before ending the response");  res.end("Done!");}
```

An example function that writes a response with a delay.

When this function is called three times in a row, we can see the following in Vercel Logs tab:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1q4fQR7k1wxfGNhZnNa5xt%2Fdfa10dc217086cba8e131b8b6456f272%2FBefore_-_Light.png&w=1920&q=75)

We see three log lines above, each appearing only _after_ the function invocation had finished. Logs for each invocation are collapsed into a single line. Now, let's explore how this changes when we enable streaming.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6qWLAJ15fPIOmiON9V56OH%2F8d9d076b2bb23cfe4ac3fb9e40477f73%2FAfter_Light.png&w=1920&q=75)

With streaming, each log statement gets its own line with a precise timestamp. Logs appear in near real-time, streaming in as they happen. You do not need to wait for the function invocation to complete to see logs.

You will notice the individual log lines do not display the status code. This is because logs are independent of the response and can occur before a status code is determined. With streaming being enabled by default, this brings consistency to the logs experience when using Vercel Functions.

These changes in frequency and format of Function logs will also affect Vercel Log Drains. If you are using Log Drains, ensure that your provider supports streaming responses and this increase frequency for logs.

## [Link to heading](#enabling-streaming-functions-today)Enabling streaming functions today

Streaming will be enabled by default for Hobby accounts starting **July 8th, 2024;** and for Pro and Enterprise accounts starting **October 1st, 2024**.

To enable streaming as the default today for all your Vercel Functions, set the `VERCEL_FORCE_NODEJS_STREAMING` environment variable in your project to `true`. Streaming will be enabled on your next deployment.