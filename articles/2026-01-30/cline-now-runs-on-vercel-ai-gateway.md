---
title: "Cline now runs on Vercel AI Gateway"
source: "https://vercel.com/blog/cline-on-ai-gateway"
publishedDate: "2025-12-16"
category: "frontend"
feedName: "Vercel"
author: "Harpreet Arora"
---

3 min read

Dec 16, 2025

Cline, the leading open-source coding agent built for developers and teams, now runs on the Vercel AI Gateway.

With more than 1 million developers and 4 million installations, Cline brings an AI coding partner directly into the development environment, grounded in the values of openness and transparency.

To support that mission at scale, the team needed infrastructure that matched those principles: fast, reliable, and built on open standards.

When you open Cline in your IDE and select its provider, your request doesn’t go straight to an AI model. It first routes through Cline’s infrastructure, and now through the Vercel AI Gateway.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3VygYp0KcSOLUlDJjH8MSz%2F434eb9675b6252449acaf37872ca3257%2Fdiagram-name--light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3gHbEoBQzKFfsWTMTh50G%2F82509fe2440db11b0b593983d1e9f3d2%2Fdiagram-name--light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3uh878AkbfAqe7jANSJRlH%2F38e9a11653b8408204154e3fb18e643d%2Fdiagram-name--mobile-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F24ovSMKEmA3z1bL8K9aJXi%2F8f6f8721f74a6b29b31d79a63208bb49%2Fdiagram-name--mobile-light.png&w=1920&q=75)

### [Link to heading](#built-on-vercel’s-global-network)Built on Vercel’s global network

Vercel AI Gateway itself runs on the same global infrastructure that powers millions of applications and handles trillions of requests on Vercel. Every request first hits one of more than a hundred points of presence around the world, where Vercel’s CDN terminates the TCP connection.

The request travels across Vercel’s private, congestion-free backbone to the nearest Vercel region. This ensures that developers anywhere in the world see sub-20ms overhead for interacting with models through Cline.

Unlike custom proxies or single-region setups, this system doesn’t rely on a single cloud region or datacenter. Traffic dynamically routes through the healthiest paths available. For in-cloud workloads, most of the path from IDE to inference provider stays within Vercel’s managed network.

This architecture supports lower round-trip times for interactive tools like Cline, especially during long streaming responses where network variance is noticeable.

To understand how much it would matter in real usage, Cline ran controlled tests against their existing proxy.

## [Link to heading](#a-measurable-improvement-in-cline’s-performance)A measurable improvement in Cline’s performance

Over a week of live A/B testing, splitting production traffic between their previous AI router and Vercel AI Gateway, Cline saw immediate gains in both speed and reliability. These results came from real coding interactions across their global user base.

### [Link to heading](#p99-streaming-latency-improved-by-10–14%-across-cline’s-most-used-models)P99 streaming latency improved by 10–14% across Cline’s most-used models

The slowest 1 percent of requests, also known as P99, represent those moments when an AI agent thinks or pauses mid-stream. Improving this long tail means developers experience fewer stalls, smoother reasoning chains, and more consistent token streaming, especially during complex multi-step tasks.

### [Link to heading](#api-error-rates-dropped-by-43.8%)API error rates dropped by 43.8%

For a coding agent, fewer errors translate directly into fewer broken generations and retries. It means the agent “just works” more often, even when running longer workflows.

### [Link to heading](#notable-model-specific-improvements:)Notable model-specific improvements:

-   Grok Code Fast 1 saw **9% faster P95 latency** and **13.7% faster P99 latency**, sharpening both typical and worst-case performance.
    
-   Minimax M2 delivered **14.4% faster P99 latency** along with meaningful cost reductions from more efficient routing.
    

These improvements weren’t theoretical, as they changed how Cline truly feels in day-to-day use. A coding agent only feels fast when the slowest moments get faster, and that’s exactly what Cline validated.

Cline is already the largest opted-in application on the AI Gateway Leaderboards. As soon as Cline switched its traffic to the Gateway, it became the top app by usage, a clear signal of how widely developers rely on it for day-to-day coding workflows.

[

**AI Gateway Leaderboards**

Track what’s trending in AI. See which models and apps are leading traffic and how usage is shifting over time.

See the leaderboards



](https://vercel.com/ai-gateway/leaderboards)

## [Link to heading](#a-shared-focus-on-performance-and-transparency)A shared focus on performance and transparency

Cline’s community expects clarity at every layer, including cost. With Vercel’s AI Gateway, developers pay exactly what the model provider charges for inference. There is no markup on direct requests and no markup on Bring Your Own Key (BYOK) usage. With Gateway, the price you see from the model provider is the price you pay, as simple as that.

Beyond transparent pricing, the Gateway gives Cline deep, real-time operational visibility. Telemetry, health checks, and per-request insight help the team diagnose issues, track reliability, and plan capacity as adoption grows.

The combination of predictable economics and clear observability mirrors Cline’s own philosophy: build systems that are fast, understandable, and honest about how they behave.

## [Link to heading](#preparing-for-the-enterprise-era-of-open-source-ai)Preparing for the enterprise era of open source AI

Cline’s shift to AI Gateway is part of a larger trend: open source AI tools maturing into everyday engineering utilities. As more developers rely on these tools for real production work, the underlying infrastructure has to be fast, predictable, and transparent.

The integration gives Cline the consistency it needed with lower latency variance, fewer failures, and clearer pricing without changing its open, extensible model. It improves the experience for individual developers today and supports the needs of teams adopting Cline at larger scale.

The story here isn’t about infrastructure for its own sake. It’s about helping an open source tool perform the way developers expect, everywhere they use it.