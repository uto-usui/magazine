---
title: "Perplexity's Decider V1.2 models now available on AI Gateway"
source: "https://vercel.com/changelog/perplexity-decider-v1-2-models-now-available-on-ai-gateway"
publishedDate: "2026-10-16"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Perplexity Decider V1.2 27B](https://vercel.com/ai-gateway/models/pplx-decider-v1.2) and [Decider Flash V1.2 4B](https://vercel.com/ai-gateway/models/pplx-decider-flash-v1.2) are now available on [AI Gateway](https://vercel.com/ai-gateway). Both are multimodal [decision models](https://vercel.com/docs/ai-gateway/modalities/decision) for classifying content, routing requests, and scoring text, structured records, and images.

The models answer typed questions with probabilities. Boolean questions return the likelihood of yes, Choice questions select from categories you define, and Score questions assess content against an ordered rubric. Your application can use those results to route a support ticket, flag a damaged product, or send an uncertain decision for human review. Multiple questions can share the same input in one request.

-   **Decider V1.2 27B** (`perplexity/pplx-decider-v1.2`) is the larger model, for nuanced judgments and detailed rubrics.
    
-   **Decider Flash V1.2 4B** (`perplexity/pplx-decider-flash-v1.2`) is the smaller model, for high-volume labeling, filtering, and routing with clear criteria.
    

The examples below use `perplexity/pplx-decider-v1.2` and check the same delivery report through the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), the [Decisions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-decisions), and the [TypeSafe-compatible API](https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe):

For image input, embed base64 `image_url` objects in JSON `state` through the AI SDK or TypeSafe-compatible API. See [Perplexity's image format](https://docs.perplexity.ai/docs/decisions/quickstart#images-in-state) and the [decision models documentation](https://vercel.com/docs/ai-gateway/modalities/decision) for request formats and question types.

Explore Decider V1.2 27B in the [model playground](https://vercel.com/ai-gateway/models/pplx-decider-v1.2), or try [Decider Flash V1.2 4B](https://vercel.com/ai-gateway/models/pplx-decider-flash-v1.2).

Use AI Gateway to call models with one API key and monitor usage and cost in one place. Decision requests are recorded in [request logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs) and included in [spend budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets). Inference uses provider pricing without a markup or platform fee. This also applies when you supply your own provider credentials through [BYOK](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok).

Browse the [decision model catalog](https://vercel.com/ai-gateway/models?modality=decision) to see the available options.