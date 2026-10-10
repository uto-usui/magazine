---
title: "Microsoft Decision-1 now available on AI Gateway"
source: "https://vercel.com/changelog/microsoft-decision-1-now-available-on-ai-gateway"
publishedDate: "2026-10-09"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Decision-1 from Microsoft](https://vercel.com/ai-gateway/models/microsoft-decision-1) is now available on [AI Gateway](https://vercel.com/ai-gateway). It answers typed questions about text with probabilities, choices, and scores. It can be used to classify support requests, select the next step in a workflow, or assess an AI response against a rubric.

The model can answer yes/no questions, choose among named categories, or score an input against an ordered set of criteria. Multiple questions can share the same input in one request. Choice and score answers include probabilities for each option, so your application can decide when to act or send an uncertain result for review.

Call Decision-1 through the [AI SDK decision API](https://vercel.com/docs/ai-gateway/modalities/decision), the [OpenAI-compatible Decisions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-decisions), or the [TypeSafe-compatible API](https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe). You only need an AI Gateway API key, with no separate Azure account or deployment.

To get started, use `microsoft/microsoft-decision-1` as the model name in your requests:

AI Gateway provides a unified way to access models and track usage and cost. Decision calls appear in [logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs) and count toward [budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets) alongside other model requests.

See the [decision documentation](https://vercel.com/docs/ai-gateway/modalities/decision) for Choice, Score, and Boolean questions. To pick a decision model, browse the [available models](https://vercel.com/ai-gateway/models?capabilities=decision) or read our [decision model guides](https://vercel.com/i/category/decision-models).