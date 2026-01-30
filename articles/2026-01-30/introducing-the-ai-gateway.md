---
title: "Introducing the AI Gateway"
source: "https://vercel.com/blog/ai-gateway"
publishedDate: "2025-05-20"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

2 min read

May 20, 2025

**Note**: This blog is outdated, please reference [this page](https://vercel.com/ai-gateway) for the latest information or read the docs [here](https://vercel.com/docs/ai-gateway).  
  
The Vercel AI Gateway is now available for alpha testing.

Built on the [AI SDK 5 alpha](https://ai-sdk.dev/docs/announcing-ai-sdk-5-alpha), the Gateway lets you switch between ~100 AI models without needing to manage API keys, rate limits, or provider accounts. The Gateway handles authentication, usage tracking, and in the future, billing.

```
import { streamText } from 'ai'const result = streamText({  model: 'xai/grok-3', // defaults to Vercel AI Gateway  prompt: 'Tell me the history of the San Francisco Mission-style burrito'})
```

Write code in an app route or a script like the code above

Get started with [AI SDK 5](https://ai-sdk.dev/docs/announcing-ai-sdk-5-alpha) and the [Gateway](https://ai-sdk.dev/model-library), or continue reading to learn more.

Terminal

```
pnpm install ai@beta
```

## [Link to heading](#why-we’re-building-the-ai-gateway)Why we’re building the AI Gateway

The current speed of AI development is fast and is **only getting faster**.

There's a new state-of-the-art model released almost every week. Frustratingly, this means developers have been locked into a specific provider or model API in their application code. We want to help developers ship fast and keep up with AI progress, without needing 10 different API keys and provider accounts.

Production AI applications often run into capacity issues or rate limiting due to high demand. Infrastructure providers move quickly to bring models online and keep up with this demand, but this can come at the expense of performance or availability.

The AI Gateway will allow you to load balance across providers, or fail over if a provider has downtime or degradation in performance. Model inference costs keep dropping and providers are competing on quality, performance, and price. The Gateway helps you quickly take advantage of these cost savings.

We're taking what we've learned scaling [v0](https://v0.dev/) to millions of users, by quickly load balancing and switching between a mixture of providers, and turning that infrastructure into the AI Gateway.

## [Link to heading](#integration-with-the-ai-sdk)Integration with the AI SDK

We built the [AI SDK](https://ai-sdk.dev/) to create a common abstraction for AI model APIs across modalities like text, images, and audio.

The AI SDK is free and open source, and works with any model or infrastructure provider. The AI Gateway is a separate Vercel product built _on top_ of the AI SDK.

We're building these products with high cohesion, but loose coupling. The Gateway will take full advantage of AI SDK features like tool calling, function arguments, streaming, retries, attachments, and structured outputs.

## [Link to heading](#pricing)Pricing

During the AI Gateway alpha, usage is free with rate limits based on your Vercel plan tier. These rate limits are similar to the current [AI SDK Playground](https://ai-sdk.dev/playground).

We plan to support pay-as-you-go pricing when the Gateway reaches general availability. Model pricing will follow the provider’s market rates, updated regularly. We are also planning to explore bring-your-own-key in the future.

## [Link to heading](#what’s-coming-next)What’s coming next

-   Load balancing and model failover
    
-   Pay-as-you-go billing
    
-   Bring-your-own-key support
    
-   Unified logging, usage tracking, and observability
    
-   OpenAI-compatible API
    

## [Link to heading](#start-exploring-ai-gateway)Start exploring AI Gateway

We’re shipping this in alpha to get your input and early feedback. [Tag us on X](https://x.com/intent/post?screen_name=vercel) to share your work and tell us what you want to see from the AI Gateway.

For more information, get started with our demo applications:

For model support and more usage examples, visit [ai-sdk.dev/model-library](https://ai-sdk.dev/model-library).

Vercel AI Gateway is not yet ready for production use or migrating existing projects.