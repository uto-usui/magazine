---
title: "Customizing Serverless Functions"
source: "https://vercel.com/blog/customizing-serverless-functions"
publishedDate: "2019-11-12"
category: "frontend"
feedName: "Vercel"
author: "Andy Schneider"
---

You can configure Vercel functions in many ways, including the runtime, region, maximum duration, and memory.

With different configurations, particularly the runtime configuration, there are a number of trade-offs and limits that you should be aware of. For more information, see the [runtimes](https://vercel.com/docs/functions/runtimes) comparison.

The runtime you select for your function determines the infrastructure, APIs, and other abilities of your function.

With Vercel, you can configure the runtime of a function in any of the following ways:

-   Node.js: When working with a TypeScript or JavaScript function, you can use the Node.js runtime by setting a config option within the function. For more information, see the [runtimes](https://vercel.com/docs/functions/runtimes).
-   Ruby, Python, Go: These have similar functionality and limitations as Node.js functions. The configuration for these runtimes gets based on the file extension.
-   Community runtimes: You can specify any other [runtime](https://vercel.com/docs/functions/runtimes#community-runtimes), by using the [`functions`](https://vercel.com/docs/project-configuration#functions) property in your `vercel.json` file.

See [choosing a runtime](https://vercel.com/docs/functions/runtimes) for more information.

Your function should execute in a location close to your data source. This minimizes latency, or delay, thereby enhancing your app's performance. How you configure your function's region, depends on the runtime used.

See [configuring a function's region](https://vercel.com/docs/functions/configuring-functions/region) for more information.

The maximum duration for your function defines how long a function can run for, allowing for more predictable billing.

Vercel Functions have a default duration that's dependent on your plan, but you can configure this as needed, [up to your plan's limit](https://vercel.com/docs/functions/limitations#max-duration).

See [configuring a function's duration](https://vercel.com/docs/functions/configuring-functions/duration) for more information.

Vercel Functions use an infrastructure that allows you to adjust the memory size.

See [configuring a function's memory](https://vercel.com/docs/functions/configuring-functions/memory) for more information.