---
title: "Voyage Rerank 3 and Rerank 3 Lite are now available on AI Gateway"
source: "https://vercel.com/changelog/voyage-rerank-3-and-rerank-3-lite-are-now-available-on-ai-gateway"
publishedDate: "2026-09-30"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Rerank 3](https://vercel.com/ai-gateway/models/rerank-3) and [Rerank 3 Lite](https://vercel.com/ai-gateway/models/rerank-3-lite) from Voyage AI by MongoDB are now available on AI Gateway.

The models reorder search results by relevance before passing documents to a language model. The series improves retrieval quality across domains, with the largest gains on long documents and code.

Rerank 3 focuses on accuracy, while Rerank 3 Lite is optimized for latency and cost. Both handle up to 32K tokens per query-document pair and follow instructions in the query to guide ranking.

To use Rerank 3, set the model to `voyage/rerank-3`:

```
import { rerank } from 'ai';const { ranking } = await rerank({  model: 'voyage/rerank-3',  query: 'How does a vector database find similar documents?',  documents: [    'A load balancer distributes traffic across servers.',    'A vector database searches embeddings to find similar documents.',  ],  topN: 1,});
```

For Rerank 3 Lite, change the model to `voyage/rerank-3-lite`.

Try Voyage Rerank 3 in the [AI Gateway model playground](https://vercel.com/ai-gateway/models/rerank-3), or explore the [model catalog](https://vercel.com/ai-gateway/models).

AI Gateway provides one API for calling models, tracking usage and cost, and configuring routing, retries, and failover. You can use an [AI Gateway API key](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys) or [bring your own provider key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok).