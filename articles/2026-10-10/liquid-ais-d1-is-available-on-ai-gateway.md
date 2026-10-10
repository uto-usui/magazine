---
title: "Liquid AI's d1 is available on AI Gateway"
source: "https://vercel.com/changelog/liquid-ai-d1-is-available-on-ai-gateway"
publishedDate: "2026-10-09"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Liquid d1](https://vercel.com/ai-gateway/models/d1) is now available on [AI Gateway](https://vercel.com/ai-gateway).

d1 is a [decision model](https://vercel.com/i/what-are-decision-models) that evaluates shared state against typed questions for classification, routing, and scoring. It returns structured answers with probabilities without generating text tokens.

d1 also has vision support: the model can answer typed questions about images for visual classification, inspection, and scoring.

Use `liquid/d1` through the [AI SDK decision API](https://vercel.com/docs/ai-gateway/modalities/decision), the [OpenAI-compatible Decisions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/decisions), or the [TypeSafe-compatible API](https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe). These examples ask whether a support agent issued a refund:

## [Copy link to heading](#image-input)Image input

This example reads a local PNG named `square.png` and asks which color it shows:

AI Gateway provides a unified way to access models and track usage and cost. Decision calls appear in [logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs) and count toward [budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets) alongside other model requests.

See the [decision documentation](https://vercel.com/docs/ai-gateway/modalities/decision) for Choice, Score, and Boolean questions. To pick a decision model, browse the [available models](https://vercel.com/ai-gateway/models?capabilities=decision) or read our [decision model guides](https://vercel.com/i/category/decision-models).