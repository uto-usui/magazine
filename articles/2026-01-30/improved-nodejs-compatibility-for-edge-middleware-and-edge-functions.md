---
title: "Improved Node.js compatibility for Edge Middleware and Edge Functions"
source: "https://vercel.com/changelog/improved-node-js-compatibility-for-edge-middleware-and-edge-functions"
publishedDate: "2023-04-03"
category: "frontend"
feedName: "Vercel"
author: "Javi Velasco"
---

2 min read

Apr 3, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1fssRJ5joW6jp0EaXRCZfK%2F19756fc61a2eb4aa0783b705e0c387b6%2FNode.js.png&w=1920&q=75)

Vercel [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) and [Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions/quickstart) now support more Node.js modules. You may want to make use of these modules directly, but many of these low-level [APIs](https://vercel.com/docs/concepts/functions/edge-functions/edge-runtime) are pieces of core functionality that other modules depend on. Adding support for these APIs expands the compatibility of existing npm packages.

```
export default function (request: Request) {  const url = new URL(request.url);  const message = url.searchParams.get("message") ?? '';  return Response.json({    decoded: Buffer.from(message, "base64").toString(),    message,  });}export const config = {  runtime: "edge",};
```

Edge Function using Buffer global

The following APIs are now supported:

-   **AsyncLocalStorage:** Support for maintaining data for an invocation between different asynchronous execution contexts, which allows you to pass state to the context even when the function is hot and module context is preserved.
    
-   **EventEmitter:** A flexible API to build event-driven systems that serves as a core building block for communication between libraries that control I/O and listeners that process data when events occur.
    
-   **Buffer:** The most common way of handling binary data in Node.js, available globally or importable from `buffer`.
    
-   **assert:** A set of assertion functions to validate invariants and logical rules that are very useful to explicitly test assumptions in your code path that need to run in Edge Functions.
    
-   **util.promisify** and **util.callbackify:** A helper function to convert a callback-style function signature into one that returns a `Promise`, and a helper function to convert a function that returns a `Promise` into one that accepts a callback.
    
-   **util.types:** A set of functions to validate that objects are of a given type.  
    

You can take advantage of these additional APIs in Edge Middleware and Edge Functions with your next deployment. To deploy Edge Functions on Vercel you can get started with [any framework](https://vercel.com/docs/concepts/functions/edge-functions/quickstart) or one of our [templates](https://vercel.com/templates/edge-functions).