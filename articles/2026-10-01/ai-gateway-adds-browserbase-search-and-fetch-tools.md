---
title: "AI Gateway adds Browserbase Search and Fetch tools"
source: "https://vercel.com/changelog/ai-gateway-adds-browserbase-search-and-fetch-tools"
publishedDate: "2026-09-30"
category: "frontend"
feedName: "Vercel"
author: "Josh Lipman"
---

[Browserbase Search and Fetch](https://vercel.com/ai-gateway/models/browserbase-search) are now available through [AI Gateway](https://vercel.com/ai-gateway). Give your models access to current information, find relevant pages, and retrieve their contents, alongside Browserbase's existing AI SDK and Vercel Marketplace integrations.

AI Gateway lets you use Browserbase's tools across model providers with one API key. Add web search and page retrieval to any model that supports tool calling, and keep the same tools when you switch models.

These helpers are available in AI SDK 7.0.116 and later. Update with `pnpm add ai@latest` and set your `AI_GATEWAY_API_KEY`. To add search and fetch, pass the helpers in `tools` .

```
import { gateway, streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k3',  prompt: 'Find Browserbase\'s latest announcement, fetch the page, and summarize it.',  tools: {    browserbase_search: gateway.tools.browserbaseSearch({ numResults: 3 }),    browserbase_fetch: gateway.tools.browserbaseFetch({      allowRedirects: true,    }),  },});
```

For pricing and configuration options, see the [Browserbase Search and Fetch documentation](https://vercel.com/docs/ai-gateway/models-and-providers/web-search#using-browserbase-search).

Try the Browserbase tools in the [AI Gateway model playground](https://vercel.com/ai-gateway/models/browserbase-search), or explore the [model catalog](https://vercel.com/ai-gateway/models).

AI Gateway provides one API for calling models, tracking usage and cost, and configuring routing, retries, and failover. You can use an [AI Gateway API key](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys) or [bring your own provider key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok).