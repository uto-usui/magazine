---
title: "Access Perplexity Web Search on Vercel AI Gateway with any model"
source: "https://vercel.com/changelog/access-perplexity-web-search-on-vercel-ai-gateway-with-any-model"
publishedDate: "2026-01-14"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jan 14, 2026

You can now give any model the ability to search the web using Perplexity through Vercel's AI Gateway.

AI Gateway supports Perplexity Search as a universal web search tool that works with all models, regardless of provider. Unlike native search tools that are exclusive to specific providers, Perplexity Search can be added to all models.

To use Perplexity Search with the AI SDK, import `gateway.tools.perplexitySearch()` from `@ai-sdk/gateway` and pass it in the tools parameter as `perplexity_search` to any model.

```
import { generateText } from "ai"import { gateway } from "@ai-sdk/gateway"const result = await generateText({  model: "openai/gpt-5.2",  tools: {    perplexity_search: gateway.tools.perplexitySearch(),  },  prompt: "What changed in Next.js this week?",})console.log(result.text)
```

Some example use cases include:

• **Models without native search:** Enable web search on models like `zai/glm-4.7` or any from any other providers that don't expose a built-in search tool.

```
import { streamText } from "ai"import { gateway } from "@ai-sdk/gateway"const result = await streamText({  model: "zai/glm-4.7",  prompt:    "What are the latest AI safety guidelines " +    "published by major tech companies?",  tools: {    perplexity_search: gateway.tools.perplexitySearch({      maxResults: 5,      searchRecencyFilter: "month",      searchLanguageFilter: ["en"],    }),  },})
```

• **Developer tooling and CI assistants:** Get current package versions, recently merged PRs, release notes, or docs updates.

```
import { generateText } from "ai"import { gateway } from "@ai-sdk/gateway"const { text } = await generateText({  model: "minimax/minimax-m2.1",  prompt:    "What breaking changes were introduced in " +    "Next.js 16.1? Check the latest release notes " +    "and migration guide.",  tools: {    perplexity_search: gateway.tools.perplexitySearch({      maxResults: 5,      searchDomainFilter: [        "github.com",        "nextjs.org",        "vercel.com",      ],      searchRecencyFilter: "month",    }),  },})
```

• **Consistency with fallbacks:** Maintain search behavior across multiple providers without rewriting search logic.

```
import { streamText } from "ai"import { gateway } from "@ai-sdk/gateway"const result = await streamText({  model: "meta/llama-3.3-70b",  prompt:    "What are the latest critical CVEs disclosed " +    "for Node.js in the past week?",  tools: {    perplexity_search: gateway.tools.perplexitySearch({      maxResults: 5,      searchDomainFilter: [        "nodejs.org",        "cve.mitre.org",        "github.com",      ],    }),  },  providerOptions: {    order: ["cerebras", "togetherai"],  },})
```

For more information, see the [AI Gateway Perplexity Web Search docs](https://vercel.com/docs/ai-gateway/web-search#using-perplexity-search).