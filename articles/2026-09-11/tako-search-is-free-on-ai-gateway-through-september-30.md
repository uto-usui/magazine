---
title: "Tako Search is free on AI Gateway through September 30"
source: "https://vercel.com/changelog/tako-search-is-free-on-ai-gateway-through-september-30th"
publishedDate: "2026-09-10"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

[Tako Search](https://vercel.com/ai-gateway/models/tako-search) is free exclusively on AI Gateway through September 30.

It lets AI models search Tako's curated data and the live web, filter web results by domain or publication date, and use the results to answer questions with current information, citations, and visualizations. After September 30, searches are billed at standard rates.

The same integration works with [any model](https://vercel.com/ai-gateway/models) on AI Gateway, so you can switch models without changing your search setup. You also don't need a separate Tako account or API key.

To use Tako Search with the AI SDK, add `gateway.tools.takoSearch()` to a `generateText` or `streamText` request. The model can then call it when it needs current information:

```
import { gateway, generateText } from 'ai';const result = await generateText({  model: 'openai/gpt-5.6-terra',  prompt: 'How has US electricity generation from solar changed over the past five years? Cite current data.',  tools: {    tako_search: gateway.tools.takoSearch(),  },});console.log(result.text);
```

Give any AI Gateway model access to current web and structured data with Tako Search.

Try [Tako Search](https://vercel.com/ai-gateway/models/tako-search) in the AI Gateway playground. See the [web search documentation](https://vercel.com/docs/ai-gateway/models-and-providers/web-search#using-tako-search) for configuration and search options.