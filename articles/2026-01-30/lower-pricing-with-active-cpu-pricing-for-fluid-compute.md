---
title: "Lower pricing with Active CPU pricing for Fluid compute"
source: "https://vercel.com/changelog/lower-pricing-with-active-cpu-pricing-for-fluid-compute"
publishedDate: "2025-06-25"
category: "frontend"
feedName: "Vercel"
author: "Mariano Cocirio"
---

1 min read

Jun 25, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5E5Ob2FcWRjzMuwRsg3k7p%2F0fc765c7504256f6a663abff2c796a3c%2FActive_CPU.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FW8zLNgRvkRjUjBGayWrZ2%2F45fb66f346a5a403d46ae036a3faade0%2FActive_CPU-1.png&w=1920&q=75)

Vercel Functions on Fluid Compute now use Active CPU pricing, which charges for CPU only while it is actively doing work. This eliminates costs during idle time and reduces spend for workloads like LLM inference, long-running AI agents, or any task with idle time.

Active CPU pricing is built on three core metrics:

-   **Active CPU**: Time your code is actively executing in an instance. Priced at $0.128 per hour
    
-   **Provisioned Memory:** Memory allocated to the instance, billed at a lower rate. Priced at $0.0106 per GB-Hour
    
-   **Invocations**: One charge per function call
    

**An example of this in action:**

A function running Standard machine size at 100% active CPU would now cost ~$0.149 per hour (1 Active CPU hour + 2 GB of provisioned memory). Previously this would have cost $0.31842 per hour (1.7 GB Memory × $0.18).

Active CPU pricing is now enabled by default for all Hobby, Pro, and new Enterprise teams. For existing Enterprise customers, availability depends on your current plan configuration.

This change takes effect after a redeploy.

Learn more about [Fluid compute with Active CPU pricing](https://vercel.com/docs/fluid-compute/pricing) and read the [announcement](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute).