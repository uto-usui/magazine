---
title: " Vercel Sandbox increases concurrency and port limits"
source: "https://vercel.com/changelog/vercel-sandbox-increases-concurrency-and-port-limits"
publishedDate: "2025-08-18"
category: "frontend"
feedName: "Vercel"
author: "Laurens Duijvesteijn"
---

1 min read

Aug 18, 2025

Pro and Enterprise teams can now run up to 2,000 [Vercel Sandboxes](https://vercel.com/docs/vercel-sandbox) concurrently (up from 150), with each now able to expose up to 4 ports for external access.

This enables larger traffic spikes for workloads like untrusted code execution, batch jobs, and automated testing, as well as more complex applications with multiple services or protocols running side-by-side.

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({  ports: [3000, 3001, 3002, 3003]});const urlA = sandbox.domain(3000);console.log(sandbox.routes);// A sample of what the above console.log would return// [//   {//     url: 'https://sb-p0oybyhzzl2u.vercel.run',//     subdomain: 'sb-p0oybyhzzl2u',//     port: 3000//   },//   {//     url: 'https://sb-3erkpotk6i6h.vercel.run',//     subdomain: 'sb-3erkpotk6i6h',//     port: 3001//   },//   ...// ]
```

If you need a higher amount of concurrent sandboxes, you can [contact our sales team](https://vercel.com/contact/sales) to explore higher limits for your projects.

Learn more in the [Vercel Sandbox docs](https://vercel.com/docs/vercel-sandbox).