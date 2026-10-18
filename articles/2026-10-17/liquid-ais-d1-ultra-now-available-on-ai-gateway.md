---
title: "Liquid AI's d1-ultra now available on AI Gateway"
source: "https://vercel.com/changelog/liquid-ais-d1-ultra-now-available-on-ai-gateway"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[d1-ultra from Liquid AI](https://vercel.com/ai-gateway/models/d1-ultra) is now available on AI Gateway. It is a multimodal decision model for classification, routing, and scoring across text and images, including visual defect inspection and checking damage claims against customer photos.

Rather than generating text, d1-ultra returns structured answers with probabilities. Ask a Boolean question to get the probability of a yes/no answer, use Choice to select among named categories, or use Score to rate an ordered scale. You can ask multiple questions about the same input in one request and use the probabilities to decide when to automate an action or request human review.

d1-ultra is designed for harder real-world decisions, with an emphasis on calibrated probabilities. It supports a 32,768-token context window and is billed on input tokens only, including image input, with no output-token charges.

Use `liquid/d1-ultra` as the model name. The examples below ask the same question through the AI SDK, OpenAI-compatible Decisions API, and TypeSafe-compatible API:

See the [decision models documentation](https://vercel.com/docs/ai-gateway/modalities/decision) for question types and additional usage details.

Try d1-ultra in the [model playground](https://vercel.com/ai-gateway/models/d1-ultra).

AI Gateway provides a unified API for accessing models and tracking usage and cost. Decision calls appear in [logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs) and count toward [budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets) alongside other model requests.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) requests.

Browse [all decision models](https://vercel.com/ai-gateway/models?modality=decision) available on AI Gateway.