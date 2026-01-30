---
title: "Streaming for Serverless Node.js and Edge Runtimes with Vercel Functions"
source: "https://vercel.com/blog/streaming-for-serverless-node-js-and-edge-runtimes-with-vercel-functions"
publishedDate: "2023-03-28"
category: "frontend"
feedName: "Vercel"
author: "Lydia Hallie"
---

3 min read

Mar 28, 2023

Vercel recently became the first serverless computing provider to offer stable support for HTTP response streaming in both Node.js (Lambda) and Edge runtimes. This capability helps developers architect high-performance web applications with a focus on speed, scalability, and efficient resource usage.

Let’s take a look at how Vercel enables streaming for serverless Node.js environments, and how this capability can significantly boost your web app's performance and user experience.

## [Link to heading](#http-streaming)HTTP Streaming

HTTP Streaming is a data transfer technique that allows for the incremental delivery of smaller data chunks rather than as one large payload, resulting in faster response times, an enhanced user experience, and efficient handling of large amounts of data.

A traditional HTTP response typically requires the payload to be generated on the server in its entirety, after which it is sent to the client in a single response. While this approach is generally sufficient for smaller payloads, it can be less than ideal for larger or dynamically generated data as it can lead to a higher response latency, longer loading times and a poor user experience.

![Network and main thread activity for a non-streaming HTTP request](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3WG2kRqFiJe08mJGA0h15M%2Ff3e2f40d27a924f231428331b8a03330%2FGroup_513691__1_.png&w=1920&q=75)

Network and main thread activity for a non-streaming HTTP request

HTTP streaming enables the server to incrementally send response data in smaller chunks to the client while generating the complete response. Browsers are capable of processing and rendering the streamed chunks immediately, which significantly reduces response latency and leads to a much faster Time To First Byte ([TTFB](https://developer.mozilla.org/en-US/docs/Glossary/Time_to_first_byte)) and First Contentful Paint ([FCP](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint)).

![Network and main thread activity for a streaming HTTP request](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F28583C3Y040zDOrJ2aWPJN%2Fcb2c1387da3d55c65e1e5aa9f82280ef%2FGroup_513686.png&w=1920&q=75)

Network and main thread activity for a streaming HTTP request

Streaming offers significant benefits to web apps, including:

-   **Improving performance**
    
    by reducing TTFB and enabling faster page loads. Sending responses incrementally in smaller chunks ensures that slower services don't block the page load. The incremental processing of chunks on the main thread allows the browser to handle user input and other tasks more efficiently, leading to an overall smoother experience and better responsiveness.
    
-   **Efficiently handling large, dynamic payloads**
    
    as data can be sent without having to wait for the entire payload to be generated. This eliminates AWS Lambda response size limitations and boosts rendering performance.
    
-   **Improving scalability**
    
    by cutting down on overall memory usage, as it's no longer necessary to buffer the entire response in memory before sending it down to the client.
    

Vercel's serverless architecture is largely powered by AWS Lambda, which, at the time of writing, does not provide native support for HTTP streaming.

Despite this limitation, the Vercel engineering team has developed a custom solution that enables HTTP streaming in Vercel Serverless Functions.

## [Link to heading](#streaming-on-vercel)Streaming on Vercel

When a request is made to a Vercel Serverless Function with streaming enabled, the request is first routed through an **Edge Location** that forwards it to a **Serverless Function Invocation Service**. The request gets inspected by this service and modified to include streaming-specific payload attributes, including as a callback URL. The invocation service forwards the modified request to AWS Lambda.

Within AWS Lambda, the response stream gets generated. Due to the lack of native support for returning streaming responses, Vercel uses special bridge code inside the Lambda function to implement streaming support. This bridge is responsible for establishing a secure socket connection to the request’s callback URL which is then used to transfer the response stream to the invocation service.

![Request flows through Edge Location to Vercel’s Serverless Function Invocation Service. This forwards the request to the Lambda with the callback URL, which the bridge uses to establish a secure socket connection. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6ZP0YJ35HpdoZTijeqzChK%2F5af123141d8602527d6d1e740bf3aabc%2FGroup_513690__1_.png&w=1920&q=75)

Request flows through Edge Location to Vercel’s Serverless Function Invocation Service. This forwards the request to the Lambda with the callback URL, which the bridge uses to establish a secure socket connection.

A receiver within the invocation service reads and processes the incoming data from the socket. The invocation service forwards the request back to the client as the response to the original HTTP request, which can start processing the data once the first chunk has been received and incrementally process and render the data as it streams in.

As the first platform to support this capability on AWS Lambda, streaming on Vercel enhances the performance applications hosted on Vercel even further by enabling developers to build web applications with a focus on speed, scalability, and efficient resource usage.

Experience the benefits of Streaming on Vercel today with [Next.js Route Handlers](https://vercel.com/templates/next.js/app-directory), [React Server Components](https://vercel.com/templates/next.js/app-directory), [Remix Streaming SSR](https://vercel.com/templates/remix), or [SvelteKit](https://vercel.com/templates/svelte/sveltekit-edge-functions).