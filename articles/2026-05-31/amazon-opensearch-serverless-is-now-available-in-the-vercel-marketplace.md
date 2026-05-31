---
title: "Amazon OpenSearch Serverless is now available in the Vercel Marketplace"
source: "https://vercel.com/changelog/amazon-opensearch-serverless-is-now-available-in-the-vercel-marketplace"
publishedDate: "2026-05-28"
category: "frontend"
feedName: "Vercel"
author: "Michael Toth"
---

2 min read

May 28, 2026

[Amazon OpenSearch Serverless](https://vercel.com/marketplace/aws) is now available in the [Vercel Marketplace](https://vercel.com/marketplace), with guided setup and automatic project configuration built into the Vercel dashboard.

## [Link to heading](#built-for-agentic-infrastructure)Built for agentic infrastructure

By bringing Amazon OpenSearch Serverless into the Vercel Marketplace, teams benefit from a unified workflow:

-   **In-dashboard provisioning:** Spin up OpenSearch collections directly from the Vercel dashboard
    
-   **Automatic configuration:** Environment variables are automatically injected into your projects on provisioning
    
-   **Unified management:** View and manage search resources alongside the rest of your application infrastructure in the Marketplace resource view, with quick links to AWS for deeper configuration
    

lib/opensearch.ts

```
import { createOpenSearch } from '@vercel/aws';const os = createOpenSearch();
```

An OpenSearch client authenticated through Vercel OIDC, with no static AWS keys.

app/api/ask/route.ts

```
import { opensearch } from "@/lib/opensearch";import { embed, generateText } from "ai";export async function POST(req: Request) {  const { question } = await req.json();  // Turn the question into a vector  const { embedding } = await embed({    model: "openai/text-embedding-3-small",    value: question,  });  // Retrieve the 5 most semantically similar docs  const { body } = await opensearch.search({    index: "docs",    body: {      size: 5,      query: { knn: { embedding: { vector: embedding, k: 5 } } },    },  });  const context = body.hits.hits    .map((h: any) => h._source.content)    .join("\n\n");  // Answer grounded in the retrieved context  const { text } = await generateText({    model: "anthropic/claude-sonnet-4-5",    prompt: `Answer using only this context:\n\n${context}\n\nQuestion: ${question}`,  });  return Response.json({ answer: text });}
```

A RAG route that embeds the question, retrieves the top-5 nearest documents from OpenSearch, and answers grounded in them.

This integration is powered by the next generation of Amazon OpenSearch Serverless APIs, with Vercel participating as a key design partner alongside AWS during development.

-   Unified support for vector, lexical, hybrid, and agentic search in a single collection
    
-   Autoscales up to 20× faster, built for the bursty, unpredictable load patterns of agentic workloads
    
-   Scale to zero with no idle costs
    
-   Up to 60% cost savings by paying for actual usage instead of peak capacity
    

## [Link to heading](#get-started)Get started

To help you get started, you can create a new AWS Account directly through Vercel and receive **$100 USD in credits** to try Amazon OpenSearch Serverless. If you already have an active AWS account, you can link it instantly, manage your plan, and view usage details right from your Vercel dashboard.

Ready to build? Install Amazon OpenSearch from the [Vercel Marketplace](https://vercel.com/marketplace/aws) or deploy a [starter template](https://vercel.com/templates/next.js/next-js-with-amazon-opensearch) to see the integration in action.