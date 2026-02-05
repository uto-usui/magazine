---
title: "Parallel's Web Search and tools are live on Vercel"
source: "https://vercel.com/changelog/parallel-web-search-is-now-on-ai-gateway"
publishedDate: "2026-02-04"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

2 min read

Feb 4, 2026

You can now use [Parallel's](https://parallel.ai/) LLM-optimized web search and other tools all across Vercel.

## [Link to heading](#ai-gateway)AI Gateway

Unlike provider-specific web search tools that only work with certain models, Parallel's web search tool works universally across all providers. This means you can add web search capabilities to any model without changing your implementation.

To use through AI SDK, set `parallel_search: gateway.tools.parallelSearch()` in `tools`.

```
import { gateway, streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k2.5', // Works with any model  prompt: 'What are the best new restaurants in San Francisco?',  tools: {    parallel_search: gateway.tools.parallelSearch(),  },});
```

Parallel web search extracts relevant excerpts from web pages, making it ideal for agentic tasks and real-time information retrieval. For more control, you can also configure the tool to use specific parameters.

```
import { gateway, streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k2.5',  prompt: 'What new AI model releases have been announced this month?',  tools: {    parallel_search: gateway.tools.parallelSearch({      mode: 'one-shot',      maxResults: 10,      includeDomains: ['anthropic.com', 'moonshot.ai', 'deepmind.google'],      afterDate: '2026-01-01',    }),  },});
```

For agentic workflows, use `mode: 'agentic'` to get concise, token-efficient search results that work well in multi-step reasoning.

Time-sensitive queries can control cache freshness with `maxAgeSeconds`, while domain-specific search lets you restrict results to trusted sources or exclude noisy domains.

Parallel web search requests are charged at exactly the same rate as the Parallel API. $5 per 1,000 requests (includes up to 10 results per request) and additional results beyond 10 charged at $1 per 1,000 additional results. Read the [docs](https://vercel.com/docs/ai-gateway/capabilities/web-search#using-parallel-search) for more information and details on how to use the tool.

## [Link to heading](#ai-sdk)AI SDK

AI SDK supports Parallel as a tool for both web search and extraction. To use, simply install the `parallel-web` tool package.

```
pnpm install @parallel-web/ai-sdk-tools
```

View the [docs](https://ai-sdk.dev/tools-registry/parallel) for more details on how to utilize the tools.

## [Link to heading](#vercel-marketplace)Vercel Marketplace

You can utilize all Parallel products: Search, Extract, Task, Findall, and Monitoring in [Vercel Agent Marketplace](https://vercel.com/marketplace/category/agents) with centralized billing through Vercel and a single API key. To get started, go to the [Parallel integration](https://vercel.com/marketplace/parallel) and connect your account or deploy the [Next.js template](https://vercel.com/templates/template/next-js-parallel-starter) to integrate Parallel's web research APIs with Vercel in action.  

Get started with Parallel for your AI applications through AI Gateway, the AI SDK tool package, or Vercel Marketplace.