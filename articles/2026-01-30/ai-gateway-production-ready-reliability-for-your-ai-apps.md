---
title: "AI Gateway: Production-ready reliability for your AI apps"
source: "https://vercel.com/blog/ai-gateway-is-now-generally-available"
publishedDate: "2025-08-21"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

3 min read

Aug 21, 2025

Building an AI app can now take just minutes. With developer tools like the [AI SDK](https://ai-sdk.dev/), teams can build both AI frontends and backends that accept prompts and context, reason with an LLM, call actions, and stream back results.

But going to production requires reliability and stability at scale. Teams that connect directly to a single LLM provider for inference create a fragile dependency: if that provider goes down or hits rate limits, so does the app. As AI workloads become mission-critical, the focus shifts from integration to reliability and consistent model access. Fortunately, there's a better way to run.

[AI Gateway](https://vercel.com/ai-gateway), now generally available, ensures availability when a provider fails, avoiding low rate limits and providing consistent reliability for AI workloads. It's the same system that has powered [v0.app](https://v0.app/) for millions of users, now battle-tested, stable, and ready for production for our customers.

## [Link to heading](#the-case-for-flexibility)The case for flexibility

AI capabilities have grown and changed with incredible speed. Reasoning, barely a concept a year ago, is now a standard capability across models. Tool use and the Model Context Protocol (MCP) went from experiments to widely adopted standards in under a year.

An essential tool for success in AI is staying flexible and adapting to the new frontier. Whether AI native or leveraging AI integrations, teams want the ability to use the best model available at any given time while keeping systems composable and avoiding lock-in.

Building in the flexibility to switch between models requires sophisticated engineering. APIs can fail without warning, rate limits vary by provider, and keys must be managed and secured per vendor. Even tracking spend means juggling multiple dashboards with different top-up programs and spend controls. Engineering around these failure modes is time-consuming and slows teams down.

AI Gateway handles this complexity for you so you can scale confidently and quickly.

## [Link to heading](#great-developer-experience,-trusted-infrastructure)Great developer experience, trusted infrastructure

The AI SDK now sees more than 2 million downloads per week and powers apps like Browserbase and Perplexity. While AI SDK standardized provider APIs and made switching as simple as a single line of code, the harder problem is ensuring availability when a provider fails. The AI Gateway brings the same developer experience together with globally available, production-grade infrastructure.

Swap a model string and you’re testing a new provider in seconds:

```
import { streamText } from 'ai'const result = streamText({  model: 'xai/grok-4', // defaults to Vercel AI Gateway  prompt: 'How does Vercel AI Gateway have no markup on tokens?'})
```

AI Gateway supports hundreds of models, you can [view the library here](https://vercel.com/ai-gateway/models).

With AI Gateway you can use any vendor, any model, through a single API. Built on AI SDK 5, it supports hundreds of models today without requiring you to manage API keys, rate limits, or provider accounts. The Gateway handles authentication, usage tracking, failover, billing, and more.

Developers want speed, reliability, and choice. AI Gateway is built for teams creating AI apps, agents, RAG systems, or search and chat experiences who:

-   Evaluate or swap models dynamically
    
-   Need higher rate limits than a single vendor can provide
    
-   Want access to new frontier models as soon as they launch
    
-   Can’t afford a single point of failure
    
-   Need visibility into model usage and cost without juggling several dashboards
    

## [Link to heading](#zero-markup,-high-reliability)Zero markup, high reliability

And all this with zero markup: bring your own keys and contracts, with no added markup on model prices.

Just as CDNs transformed networking with redundancy, failover, and optimization, AI Gateway will transform inference reliability for your apps. Vercel's CDN powers trillions of requests a year[\[1\]](#note-trillions-of-requests), and sits at the core of AI Gateway providing sub-20ms latency.

## [Link to heading](#getting-started-with-ai-gateway)Getting started with AI Gateway

The AI Gateway is now [generally available](https://vercel.com/changelog/ai-gateway-is-now-generally-available). [Try it for free](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys%3Futm_source%3Dai_gateway_landing_page&title=Get+an+API+Key), or [browse the model library](https://vercel.com/ai-gateway/models) to see supported providers and chat with a model of your choice.

Through the AI Gateway, we want to help you build fast, stay reliable, and keep up with the rapid pace of AI innovation without being slowed down by infrastructure, or locked into any one model or provider.

## [Link to heading](#frequently-asked-questions)Frequently Asked Questions

## Notes

2.  [↑](#trillions-of-requests)https://vercel.com/blog/gartner-mq-visionary-2025 - 115B weekly requests served by Vercel