---
title: "Introducing Active CPU pricing for Fluid compute"
source: "https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute"
publishedDate: "2025-06-25"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

3 min read

Jun 25, 2025

[Fluid compute](https://vercel.com/fluid) exists for a new class of workloads. I/O bound backends like AI inference, agents, MCP servers, and anything that needs to scale instantly, but often remains idle between operations. These workloads do not follow traditional, quick request-response patterns. They’re long-running, unpredictable, and use cloud resources in new ways.

[Fluid quickly became the default compute model](https://vercel.com/changelog/fluid-compute-is-now-the-default-for-new-projects) on Vercel, helping teams cut costs by up to 85% through optimizations like in-function concurrency.

Today, we’re taking the efficiency and cost savings further with a new pricing model: you pay CPU rates only when your code is actively using CPU.

## [Link to heading](#from-servers-to-serverless)From servers to serverless

In the early days of cloud computing, teams ran long-lived servers. You had to manage provisioning, handle scaling manually, and decide what happens during traffic spikes. Over-provisioning cloud resources was common, and idle time meant wasted money.

Serverless changed that. It abstracted away infrastructure configuration and introduced automatic scaling. Each request triggered its own isolated instance.

But this came with trade-offs. These instances were single-purpose and short-lived. Powerful, but ephemeral. That led to cold starts, duplicated overhead, and underutilized compute. Once again, teams were paying for resources they didn't fully use.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6bK8DvDHsGz8H5ZkiZIZSA%2F01537f67d35b07aa05ce043bb2d54903%2Fserverless-dark-1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5guWhx2S4ONxNnnzRQx4wJ%2Ffb7f4d5bedada0b50ff60c9e20458c44%2Fserverless-dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FfGRUhr753dlbztRh0IIpn%2F89658e6ddab5025a3559448b6b910232%2Fserverless-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3OaHd9WMnseskjhFLnpgYw%2F219b6d5dd7ad2c9f097ffb9115f01159%2Fserverless-dark.png&w=1920&q=75)

## [Link to heading](#from-serverless-to-fluid-compute)From serverless to Fluid compute

Fluid compute breaks away from the traditional one-to-one serverless model. Instead of spinning up a separate instance for each invocation, Fluid compute intelligently orchestrates compute across invocations. Multiple concurrent requests can share the same underlying resources, eliminating cold starts and reusing idle time. This allows I/O bound workloads like AI to run more efficiently.

The impact was visible immediately. Fluid became the default for AI on Vercel, powering [over one trillion invocations](https://x.com/rauchg/status/1936139463564181773). Teams saw up to 90% cost savings by sharing compute across workloads intelligently.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7KEayQ8AMwtFDnx9ATO2wK%2F9da263b61519be6edfa0289bf9578501%2Fserverless-dark-1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F49K3D2U62q6timnOFCRq3R%2F8f38bc208d6cd2a232855d00c0175bd5%2Fserverless-dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5FPXpDIRM36LXjEWR1bXfI%2F19281d67e95e24360aba162babee1ce8%2Fserverless-dark-1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3pQ3aT8Fz4iacLubgbU4CZ%2F99596b2f2c8dfea1d7f18e0c28ff95cf%2Fserverless-dark.png&w=1920&q=75)

## [Link to heading](#fluid-with-active-cpu)Fluid with Active CPU

Fluid improved performance and cost, but there was still room to optimize. Even with high concurrency, there could still be moments where all invocations are waiting on external responses and no code is actively running. During these idle periods, functions stay in memory, doing no work, yet still incur CPU cost.

Active CPU pricing solves this. It's a new pricing model that charges for CPU only when your code is actively using the CPU. Building on existing Fluid gains, this brings additional cost savings of up to 90% for workloads with high idle time, like AI inference.

This aligns pricing with actual usage. Compute costs scale with real work, not just with the time a function is alive.

### [Link to heading](#the-active-cpu-pricing-model)The Active CPU pricing model

Fluid compute now charges based on three key metrics, each designed to reflect actual resource usage:

1.  **Active CPU** reflects the compute time your code is actively executing on a virtual CPU (vCPU). It’s measured in milliseconds, calculated as the number of vCPUs allocated multiplied by the time they’re actively used. Pricing starting at at $0.128 per hour
    
2.  **Provisioned Memory** covers the memory required to keep a function alive while it's running. It’s measured in GB-hours and billed at a much lower rate (less than 10% of Active CPU), thanks to Fluid’s ability to reuse memory across multiple concurrent invocations. Pricing starting at at $0.0106 per GB-Hour
    
3.  **Invocations** are counted per function call (just like in traditional serverless) and remain part of the overall pricing
    

This pricing model in action:

A function running on a Standard machine size at 100% active CPU would now cost ~$0.149 per hour (1 Active CPU GB-Hour + 2 GB of provisioned memory). Previously, this would have cost $0.31842 per hour (1.7 GB Memory × $0.18).

## [Link to heading](#built-for-the-way-modern-apps-run)Built for the way modern apps run

Fluid is our proprietary compute platform, built for modern workloads.

It simplifies cloud infrastructure while preserving flexibility and performance. Developers can use standard runtimes like Node.js and Python, making it easy to run existing code without changes.

Fluid powers core product experiences across our platform, including [Functions](https://vercel.com/docs/functions), and [recently announced Sandbox](https://vercel.com/changelog/run-untrusted-code-with-vercel-sandbox). All of them run on the same compute engine, optimized for concurrency, reuse, and efficiency, with unified billing across the stack.

## [Link to heading](#available-today)Available today

Active CPU pricing is now enabled by default for all Hobby, Pro, and new Enterprise teams. For existing Enterprise customers, availability depends on your current plan configuration. Most teams will have access right away. Reach out to your Vercel account representative to learn more and enable the new pricing model.

With Active CPU, Fluid compute automatically optimizes your costs to match actual usage. It reduces waste, scales with real usage, and reflects the way modern apps actually run.

[

**Deploy an AI-powered app with Fluid compute today**

Optimize your AI applications with Fluid compute and maximize your compute.

Get started



](https://vercel.com/templates/ai)