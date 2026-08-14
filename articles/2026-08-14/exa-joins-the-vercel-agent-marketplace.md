---
title: "Exa joins the Vercel Agent Marketplace"
source: "https://vercel.com/changelog/exa-joins-the-vercel-agent-marketplace"
publishedDate: "2026-08-13"
category: "frontend"
feedName: "Vercel"
author: "Zachary Balda"
---

[Exa](https://vercel.com/marketplace/exa) is now available on the [Vercel Agent Marketplace](https://vercel.com/marketplace/category/agents) as a native integration.

Exa's neural search engine delivers high-quality, relevant results to ground AI in fresh, current information. Add Exa to your Vercel app in seconds to power search, research agents, and context-aware features. The Vercel integration provides a single API key that works across all Exa products, with billing handled directly through your Vercel account.

```
import Exa from "exa-js";import { NextResponse } from "next/server";const apiKey = process.env.EXA_API_KEY;if (!apiKey) {  throw new Error("Missing EXA_API_KEY");}const exa = new Exa(apiKey);export async function GET(request: Request) {  const { searchParams } = new URL(request.url);  const query = searchParams.get("q") ?? "latest AI infrastructure news";  const { results } = await exa.search(query, {    type: "instant",    numResults: 5,    contents: {      highlights: true,    },  });  return NextResponse.json({    results: results.map((result) => ({      title: result.title,      url: result.url,      highlights: result.highlights,    })),  });}
```

Execute your first API call in minutes

Install Exa from the [Marketplace](https://vercel.com/marketplace/exa) or deploy the [Next.js Search template](https://vercel.com/templates/next.js/exa-nextjs-search) to see Exa's instant search, deep answers, and contents extraction integrated with Vercel.

**About Exa**: For developers building AI features on Vercel, Exa gives agents the web, organized for them. Whether you're answering questions, monitoring changes, or extracting structured data, Exa's one API for search, crawling, and research returns token-efficient highlights with grounded citations, so your agents get the context they need with fewer round trips, lower cost, and lower latency.