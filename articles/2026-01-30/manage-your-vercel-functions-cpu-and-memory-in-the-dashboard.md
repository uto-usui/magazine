---
title: "Manage your Vercel Functions CPU and memory in the dashboard"
source: "https://vercel.com/changelog/manage-your-vercel-functions-cpu-and-memory-in-the-dashboard"
publishedDate: "2024-03-11"
category: "frontend"
feedName: "Vercel"
author: "Shohei Maeda"
---

1 min read

Mar 11, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4NsU3ondAGXhyx5s7vxKbE%2F0a6c9807f00efd449227d6d3673dc5e8%2FFunction_CPU_Module_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4hx33oINwxo27xvwLYg0p8%2Fe43e9a6b6aad8fc10fa9801214733d24%2FFunction_CPU_Module_Dark.jpg&w=1920&q=75)

You can now configure Function CPU from the project settings page, where you can change your project’s default memory, and by extension CPU. Previously, this could only be changed in `vercel.json`.

The memory configuration of a function determines how much memory and CPU the function can use while executing. This new UI makes it more clear increasing memory boosts vCPU, which can result in better performance, depending on workload type.

Existing workloads (that have not modified `vercel.json`) are using the cost-effective basic option. Increasing function CPU increases the cost for the same duration, but may result in a faster function. This faster function may make the change net-neutral (or a price decrease in some cases).

[Check out the documentation](https://vercel.com/docs/functions/configuring-functions/memory) to learn more.