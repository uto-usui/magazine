---
title: "Fluid: How we built serverless servers"
source: "https://vercel.com/blog/fluid-how-we-built-serverless-servers"
publishedDate: "2025-07-28"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

7 min read

Jul 28, 2025

A few months ago, we announced [Fluid compute](https://vercel.com/blog/introducing-fluid-compute), an approach to serverless computing that uses resources more efficiently, minimizes cold starts, and significantly reduces costs. More recently at [Vercel Ship 2025](https://vercel.com/blog/vercel-ship-2025-recap), we introduced [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) for even more cost-effective compute on Vercel.

Fluid compute with Active CPU pricing powers over 45 billion weekly requests, saving customers up to 95% and never charging CPU rates for idle time.

Behind the scenes, it took over two years to build the required infrastructure to make this possible.

## [Link to heading](#it-all-started-with-a-simple-idea)It all started with a simple idea

In 2020, the React team started working on [React Server Components (RSC)](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components). RSCs allow requests rendered server-side to stream back parts of the UI as they become available. The [Next.js](https://nextjs.org/) team strongly believed in this model and began building the [App Router](https://nextjs.org/blog/next-13) on top of RSCs to enable streaming capabilities.

Vercel Functions run on AWS Lambda, which at the time, didn’t allow streaming responses ([it does now](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-response-streaming/), with some limitations). We had to find a way to support HTTP streaming. That work became the foundation for what would later power Fluid compute.

## [Link to heading](#building-a-new-transport)Building a new transport

AWS Lambda has a simple execution model. You send it a request (input), it runs, and then returns a response (output). After that, the function instance pauses and waits for another request to come in. If no other requests come in within a certain time frame, the function instance shuts down automatically.

Under the hood, those inputs and outputs are simple string blobs inside which we used to encode the HTTP request and response, respectively. We wondered, how could we return a proper chunk-by-chunk streamed response, instead of a single blob?

The answer was to introduce a new secure transport outside of Lambda's simple event-response model, that securely connects each instance back to our infrastructure. In other words, we create a tunnel between Vercel and AWS Lambda functions. We built a secure TCP-based protocol, with different packet types transmitted from Lambda to our infrastructure. For example, to return an HTTP response, we would send one `ResponseStarted`, one or multiple `ResponseBody` packets, and one final `ResponseEnd` packet.

Now, instead of just a single blob, the Vercel Function Router can receive these packets through the tunnel, reconstruct a normal HTTP response, and stream it back to the client chunk-by-chunk.

To handle this communication securely and across runtimes, we built a [Rust-based core](https://vercel.com/blog/vercel-functions-are-now-faster-and-powered-by-rust) that serves as the glue between our infrastructure and the user code. It communicates via HTTP to the language process (Node.js or Python), and via our TCP-based protocol to the Vercel Function Router. Each response chunk from the language process gets transformed into its respective packet type and sent back to our infrastructure.

Extending this protocol outside of simple HTTP response packets allowed us to quickly ship features like [`waitUntil`](https://vercel.com/changelog/waituntil-is-now-available-for-vercel-functions), [request metrics](https://vercel.com/changelog/metrics-for-outgoing-requests), [session tracing](https://vercel.com/changelog/session-tracing-now-available), [larger logs](https://vercel.com/changelog/updated-logging-limits-for-vercel-functions), and more. Each of those feature is simply a new packet type in our protocol.

## [Link to heading](#a-revelation-leading-to-new-possibilities)A revelation leading to new possibilities

While building this, we had a thought. This transport allows us to send back any kind of information from a Lambda to our infrastructure, but what if we also send data from our infrastructure to a Lambda? For example, what if we could send an additional HTTP request for a Lambda to process?

This was a great idea, but it ended up being more challenging to implement correctly (and safely) than we initially expected. Let’s walk through what made this idea so attractive.

AWS Lambda has a strict invocation scaling model:

-   Each function invocation (an HTTP request for us) is always handled by one instance
    
-   One instance always handles one invocation at a time
    
-   You pay for each of those functions, regardless of what they're doing
    

As soon as you introduce any I/O (like querying a database, calling an API or an LLM), the function instance is idle most of the time, but you traditionally still have to pay for the full wall time. This became particularly problematic with LLMs taking longer to reason and reply, and for high-traffic sites where most of the function instances are idle.

Reusing an already opened tunnel to send more traffic to idle function instances would allow us to avoid wasting resources, reduce cold starts, and ultimately reduce costs for I/O-bound workloads with any requests concurrency higher than one. With the same resources, we can fit more work while improving performance, and break free from the one-invocation-per-instance model.

## [Link to heading](#the-work-\(and-challenges\)-began)The work (and challenges) began

In order to send more traffic to a given function, we first have to know which functions are currently running, and where they're running.

Each of the 19 Vercel regions has many different replicas of the Vercel Proxy and Vercel Function Router running, and a given Vercel Function could be invoked by any of those pods.

This means the larger the region, the more Vercel Function Router pods we have running, and the fewer chances we have of a request coming into a Vercel Function Router pod that has at least one already running request to the same function. To put it differently, at least one already opened TCP connection to the same function that we could reuse to send more work.

Our solution was to build a new service called `compute-resolver`, which serves as a DNS-like resolver for Vercel Proxy pods to resolve to a Vercel Function Router pod. It keeps track of where previous requests were routed for a given function ID in order to increase the chances of reusing an already opened TCP connection to send more traffic to a function. It also takes care of not hot-spotting Vercel Function Router pods, which would be catastrophic if a customer gets a sudden spike in traffic on a route.

This service handles >100K RPS at peak and resolves in sub-millisecond at p99.99. On average, more than 99% of requests get routed to a Vercel Function Router pod that may already have a request on the same function ID running, significantly improving the effectiveness of Fluid compute.

## [Link to heading](#keeping-functions-healthy)Keeping functions healthy

There was one remaining challenge: we also cannot blindly send more traffic to a function instance. It has a fixed amount of vCPUs and RAM, so throwing it too many requests would exhaust its resources and result in increased TTFB, latency, or worse, out of memory (OOMs) errors and crashes. We had to build a system that would know, at any point in time, if a given function instance can currently accept more traffic, which is a hard question to answer. For example:

-   What’s the current CPU and memory usage? Is the CPU throttled?
    
-   Does the instance have enough lifetime remaining to handle more requests?
    
-   Are we close to the file descriptor limit?
    
-   Did any previous requests error or time out?
    

The requirements are similar to a typical Kubernetes deployment: you want to use resources efficiently and handle bursty workloads, all without downgrading performance. However, not all workloads are equivalent: some will happily use 99% of available memory on purpose, some will slow down during bursts of event loop latency, and you eventually end up manually tweaking your `HorizontalPodAutoscaler` (HPA) configuration for each workload. In comparison, our system adapts automatically to each instance's load profile several times per second, gathering various metrics to maintain an optimal resource-utilization to performance ratio.

Most of these heuristics are implemented in our Rust-based core, which wraps every Vercel Function and continuously sends back metrics in-band to Vercel Function Router. This allows Vercel Function Router pods to be as optimistic as possible, backing off from sending more traffic to a function instance when one of the metrics crosses a specific threshold.

However, we cannot always trust the metrics state inside Vercel Function Router, which could be incorrect in the case of network latency spikes or other race conditions. To address this, the Rust-based core also maintains its own local metrics and can `nack` any additional request, signaling that it cannot currently handle more traffic. When the Vercel Function Router receives a `nack`, it updates its internal state for that instance, pauses further traffic to it until new healthy metrics are received, and then either forwards the request to another available instance or spins up a new one.

For a given request, a Vercel Function Router pod may have many in-flight function instances to choose from, and it will select the one with the most available resources and the fewest concurrent requests. We found this to be far more effective than a classic round-robin algorithm, as not all requests (even if hitting the same route) have the same impact on CPU and memory.

None of these heuristics are specific to Node.js, and are instead designed to be completely language agnostic. Fluid compute also supports Python, with more languages coming soon.

## [Link to heading](#enabling-an-even-more-efficient-pricing-model)Enabling an even more efficient pricing model

Fluid compute made many workloads significantly cheaper and more efficient, but there was still room to improve. If you had very little to no requests concurrency, your bill wouldn't change at all as we're not able to process those requests together, in the same instance. Additionally, with the continuous increase in long-running but mostly-idle AI workloads like the Model Context Protocol (MCP), it could still be more expensive than what we wanted to run compute on Vercel.

Thanks to this revamped architecture, we were able to introduce [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) for Fluid compute to fill this gap. You're now only paying for the actual resources that you use:

-   The active CPU time used by each function instance, measured in milliseconds
    
-   And the provisioned memory used by each function instance, measured in GB-hrs
    

This brings an additional 90%+ savings for heavily I/O-bound workloads, on top of previous Fluid compute savings. This enables Vercel to be the ideal platform to ship any kind of application, from frontends to backends to AI apps.

Today, over 75% of all Vercel Function invocations are using Fluid compute, saving up to 95% on compute bills costs. Compute that uses resources more efficiently, and thanks to our new [Active CPU pricing](https://vercel.com/docs/fluid-compute/pricing), more cost-effectively. Fluid compute is the [default for new projects](https://vercel.com/changelog/fluid-compute-is-now-the-default-for-new-projects), and we recommend [enabling it on your existing projects](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions%23fluid-compute&title=Go+to+Function+Settings) if you haven’t already.