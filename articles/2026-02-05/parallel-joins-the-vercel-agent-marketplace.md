---
title: "Parallel joins the Vercel Agent Marketplace"
source: "https://vercel.com/changelog/parallel-joins-the-vercel-agent-marketplace"
publishedDate: "2026-02-04"
category: "frontend"
feedName: "Vercel"
author: "Marketplace Team"
---

1 min read

Feb 4, 2026

[Parallel](https://vercel.com/marketplace/parallel) is now available on the [Vercel Agent Marketplace](https://vercel.com/marketplace/category/agents) with native integration support.

Parallel provides web tools and agents designed for LLM-powered applications, including Search, Extract, Tasks, FindAll, and Monitoring capabilities. The Vercel integration provides a single API key that works across all Parallel products, with billing handled directly through your Vercel account.

For developers building AI features on Vercel, Parallel enables agents to access the open web for tasks like answering questions, monitoring changes, and extracting structured data. Since Parallel returns results optimized for LLM consumption, your agents can resolve tasks with fewer round trips and reduced cost and latency.

```
import Parallel from "parallel-web";const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });async function main() {    const search = await client.beta.search({        objective: "When was the United Nations established? Prefer UN's websites.",        search_queries: [            "Founding year UN",            "Year of founding United Nations"        ],        max_results: 10,        excerpts: { max_chars_per_result: 10000 },    });    console.log(search.results);}main().catch(console.error);
```

Execute your first API call in minutes

Install Parallel from the [Marketplace](https://vercel.com/marketplace/parallel) or deploy the [Next.js template](https://vercel.com/templates/template/next-js-parallel-starter) to see Parallel's web research APIs integrated with Vercel in action.