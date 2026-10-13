---
title: "OpenAI Decisions API now available on AI Gateway"
source: "https://vercel.com/changelog/openai-decisions-api-now-available-on-ai-gateway"
publishedDate: "2026-10-07"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[OpenAI’s Decisions API](https://developers.openai.com/api/docs/guides/decisions) is now available through [AI Gateway](https://vercel.com/ai-gateway) at `/v1/decisions`. It uses the same request and response format as OpenAI, so existing OpenAI SDK integrations can switch by changing the base URL, credentials, and model ID.

Decision models answer typed questions about shared input and return structured answers rather than generated text. In one request, you can ask a model to:

-   Estimate the probability that a condition is true with a `predicate` question
    
-   Select from supplied options with a `choice` question
    
-   Rate the input against an ordered rubric with a `score` question
    

Use these answers for [tasks](https://vercel.com/i/openai-decisions-api-use-cases) such as classification, routing, triage, and rubric-based scoring.

The endpoint works with any decision model on AI Gateway, including [Jev](https://vercel.com/ai-gateway/models/jev), [Liquid d1](https://vercel.com/ai-gateway/models/d1), and [Laya](https://vercel.com/ai-gateway/models/laya). Use `openai/gpt-6-luna-decisions` for OpenAI’s [GPT-6 Luna Decisions](https://vercel.com/ai-gateway/models/gpt-6-luna-decisions) model. This is separate from `openai/gpt-6-luna`, which generates text.

With OpenAI SDK 7.30.0 or later for JavaScript or 3.26.0 or later for Python, point the client at AI Gateway and call `decisions.create`:

The response returns answers in question order, each with the corresponding question’s `name`.

See the [OpenAI Decisions API documentation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-decisions) for Python and cURL examples. To use decision models with the AI SDK or `/v1/evaluate`, see the [decision documentation](https://vercel.com/docs/ai-gateway/modalities/decision).