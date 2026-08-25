---
title: "Exa joins the Vercel AI Gateway and Agent Marketplace"
source: "https://vercel.com/changelog/exa-joins-vercel-ai-gateway-agent-marketplace"
publishedDate: "2026-08-19"
category: "frontend"
feedName: "Vercel"
author: "Zachary Balda"
---

[Exa](https://vercel.com/marketplace/exa) is now available on the [Vercel AI Gateway](https://vercel.com/ai-gateway/models/exa-search) and [Agent Marketplace](https://vercel.com/marketplace/category/agents) as a native integration. Exa's neural search engine grounds models in current information.

-   Exa search is now a built-in tool on [AI Gateway](https://vercel.com/ai-gateway), which runs the search for you without an Exa account of your own.
    
-   You can also add Exa to a Vercel project from the [Agent Marketplace](https://vercel.com/marketplace) to power search or a research agent, with a single API key that works across every Exa product and billing through your Vercel account.
    

## [Copy link to heading](#exa-search-on-ai-gateway)Exa search on AI Gateway

Every model on AI Gateway can search with Exa through a [built-in tool](https://vercel.com/ai-gateway/models/exa-search), with no Exa account or key of your own required. Pass `gateway.tools.exaSearch()` alongside your prompt and the gateway runs the search, hands the results back to the model, and keeps going until the model stops searching. You get one finished response with a synthesized answer rather than raw results to stream back yourself.

```
import { generateText } from 'ai';import { gateway } from '@ai-sdk/gateway';const result = await generateText({  model: 'openai/gpt-5.6-sol',  prompt: 'What is the latest AI news this month?',  tools: { exa_search: gateway.tools.exaSearch() },});
```

The tool takes the same controls as the Exa API, so you can set how many results come back, focus a search on a category such as news or research papers, restrict it to a country, and include or exclude domains.

Searches bill through AI Gateway next to your model usage at list price with no markup.

## [Copy link to heading](#exa-on-the-agent-marketplace)Exa on the Agent Marketplace

Install Exa from the [Marketplace](https://vercel.com/marketplace/exa) or deploy the [Next.js Search template](https://vercel.com/templates/next.js/exa-nextjs-search) to integrate Exa's instant search, deep answers, and content extraction to your Vercel project.

```
import Exa from "exa-js";import { NextResponse } from "next/server";const apiKey = process.env.EXA_API_KEY;if (!apiKey) {  throw new Error("Missing EXA_API_KEY");}const exa = new Exa(apiKey);export async function GET(request: Request) {  const { searchParams } = new URL(request.url);  const query = searchParams.get("q") ?? "latest AI infrastructure news";  const { results } = await exa.search(query, {    type: "instant",    numResults: 5,    contents: {      highlights: true,    },  });  return NextResponse.json({    results: results.map((result) => ({      title: result.title,      url: result.url,      highlights: result.highlights,    })),  });}
```

Execute your first API call in minutes

**About Exa**: For developers building AI features on Vercel, Exa gives agents the web, organized for them. Whether you're answering questions, monitoring changes, or extracting structured data, Exa's one API for search, crawling, and research returns token-efficient highlights with grounded citations, so your agents get the context they need with fewer round trips, lower cost, and lower latency.