---
title: "Exa web search free through August 31 on AI Gateway and eve"
source: "https://vercel.com/changelog/exa-web-search-free-through-august-31-on-ai-gateway-and-eve"
publishedDate: "2026-08-12"
category: "frontend"
feedName: "Vercel"
author: "Shar Dara"
---

[Exa](https://exa.ai/) web search is now free on [AI Gateway](https://vercel.com/ai-gateway) through August 31, and it's now the default web search for [eve](https://vercel.com/eve) agents.

The tool works with any AI Gateway model, with no separate Exa API key. When the model calls it, AI Gateway routes the request to Exa's Search API, returning web results and extracted page content with support for domain filters, date filters, and token-efficient excerpts.

The built-in `web_search` tool in eve now uses Exa by default when the model is served through AI Gateway. See other supported search configurations in the [eve docs](https://eve.dev/docs/concepts/default-harness#built-in-tools).

To use it with the AI SDK, pass `gateway.tools.exaSearch()` to the `tools` parameter of a `generateText` call:

web-search.ts

```
import { gateway, generateText, stepCountIs } from 'ai';const { text } = await generateText({  model: 'openai/gpt-5.6-terra',  prompt: 'What are the latest developments in AI this week?',  tools: {    exa_search: gateway.tools.exaSearch(),  },  stopWhen: stepCountIs(3),});
```

Answering a prompt with Exa web search over multiple tool steps

Read the [web search documentation](https://vercel.com/docs/ai-gateway/models-and-providers/web-search) to learn more and get started.