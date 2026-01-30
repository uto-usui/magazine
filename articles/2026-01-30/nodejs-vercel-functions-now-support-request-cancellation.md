---
title: "Node.js Vercel Functions now support request cancellation"
source: "https://vercel.com/changelog/node-js-vercel-functions-now-support-request-cancellation"
publishedDate: "2025-04-23"
category: "frontend"
feedName: "Vercel"
author: "Craig Andrews"
---

1 min read

Apr 23, 2025

Request cancellation is now supported at the route level; you have to manually enable it in `vercel.json`. [Read more .](https://vercel.com/changelog/node-js-vercel-functions-now-support-per-path-request-cancellation)

[Vercel Functions using Node.js](https://vercel.com/docs/functions/runtimes/node-js) can now detect when a request is cancelled and stop execution before completion. This includes actions like navigating away, closing a tab, or hitting stop on an AI chat to terminate compute processing early.

This reduces unnecessary compute, token generation, and sending data the user never see.

You can listen for cancellation using `Request.signal.aborted` or the [`abort`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) event:

```
export const GET = async (req: Request) => {  const abortController = new AbortController();  req.signal.addEventListener("abort", () => {    console.log("request aborted");    abortController.abort();  });  const res = await fetch("https://my-backend-service.example.com", {    headers: {      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,    },    signal: abortController.signal,  });  return new Response(res.body, {    status: res.status,    headers: res.headers,  });};
```

If you're using the [AI SDK](https://sdk.vercel.ai/docs/advanced/stopping-streams#ai-sdk-core), forward the `abortSignal` to your stream:

```
import { openai } from '@ai-sdk/openai';import { streamText } from 'ai';export async function POST(req: Request) {  const { prompt } = await req.json();  const result = streamText({    model: openai('gpt-4-turbo'),    prompt,    // forward the abort signal    abortSignal: req.signal,  });  return result.toTextStreamResponse();}
```

Learn more about [cancelling Function requests](https://vercel.com/docs/functions/functions-api-reference#cancel-requests).