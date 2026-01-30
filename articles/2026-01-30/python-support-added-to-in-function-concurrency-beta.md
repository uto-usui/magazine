---
title: "Python support added to in-function concurrency beta"
source: "https://vercel.com/changelog/python-support-added-to-in-function-concurrency-beta"
publishedDate: "2025-01-14"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Jan 14, 2025

[

**In-function concurrency is now part of Fluid compute**

Fluid compute combines the efficiency of servers and the fleixbility of serverless, enabling real-time, dynamic workloads like APIs, streaming, and AI.

Learn about Fluid



](https://vercel.com/changelog/vercel-functions-can-now-run-on-fluid-compute)

[Python](https://vercel.com/docs/functions/runtimes/python) is now supported in the ongoing [in-function concurrency public beta](https://vercel.com/changelog/in-function-concurrency-now-in-public-beta).

In-function concurrency optimizes functions to handle multiple invocations simultaneously, improving resource efficiency. By reusing active instances instead of creating new ones, it reduces idle compute time and associated costs.

In-function concurrency is particularly beneficial for workloads with external API or database calls, such as AI models, where functions often sit idle while waiting for responses.

The in-function concurrency public beta is available to Pro and Enterprise customers using Standard or Performance Function CPU, and can be [enabled through your dashboard](https://vercel.com/d?to=/%5Bteam%5D/%5Bproject%5D/settings/functions%23in-function-concurrency&title=Go+to+Function+Settings). Real-time tracking of resource savings is available in [Observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability&title=Go+To+Observability).

Learn more in our [blog post](https://vercel.com/blog/serverless-servers-node-js-with-in-function-concurrency-2MoEVmoCwraZoZC9t5HI59) and [documentation](https://vercel.com/docs/functions/configuring-functions/concurrency), or get started with [our template](https://vercel.com/templates/python/ai-sdk-python-streaming) by enabling In-function concurrency in your [project settings](https://vercel.com/d?to=/%5Bteam%5D/%5Bproject%5D/settings/functions%23in-function-concurrency&title=Go+to+Function+Settings).