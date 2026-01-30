---
title: "Faster defaults for Vercel Function CPU and memory"
source: "https://vercel.com/changelog/faster-defaults-for-vercel-function-cpu-and-memory"
publishedDate: "2024-04-26"
category: "frontend"
feedName: "Vercel"
author: "Shohei Maeda"
---

1 min read

Apr 26, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4NsU3ondAGXhyx5s7vxKbE%2F0a6c9807f00efd449227d6d3673dc5e8%2FFunction_CPU_Module_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4hx33oINwxo27xvwLYg0p8%2Fe43e9a6b6aad8fc10fa9801214733d24%2FFunction_CPU_Module_Dark.jpg&w=1920&q=75)

The default CPU for Vercel Functions will change from **`Basic`** (0.6 vCPU/1GB Memory) to **`Standard`** (1 vCPU/1.7GB Memory) for **new projects** created after **May 6th, 2024**. **Existing projects will remain unchanged** unless manually updated.

This change helps ensure consistent function performance and faster startup times. Depending on your function code size, this may reduce cold starts by a few hundred milliseconds.

While increasing the function CPU _can_ increase costs for the same duration, it can also make functions execute faster. If functions execute faster, you incur less overall function duration usage. This is especially important if your function runs CPU-intensive tasks.

This change will be applied to all paid plan customers (Pro and Enterprise), no action required.

Check out our [documentation](https://vercel.com/docs/functions/configuring-functions/memory) to learn more.