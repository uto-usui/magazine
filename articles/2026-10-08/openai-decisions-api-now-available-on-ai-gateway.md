---
title: "OpenAI Decisions API now available on AI Gateway"
source: "https://vercel.com/changelog/openai-decisions-api-now-available-on-ai-gateway"
publishedDate: "2026-10-07"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[OpenAI's Decisions API](https://vercel.com/i/what-is-openai-decisions-api) is now available on [AI Gateway](https://vercel.com/ai-gateway) through an OpenAI-compatible `/v1/decisions` endpoint. Use it with [GPT-6 Luna Decisions](https://vercel.com/ai-gateway/models/gpt-6-luna-decisions) or any other decision model on AI Gateway.

Decision models answer typed questions about a shared input and return probabilities, choices, and scores instead of generated text, which suits routing, triage, guardrails, and rubric scoring. You can ask predicate (yes/no), choice, and score questions against the same input in one request. See [seven practical use cases](https://vercel.com/i/openai-decisions-api-use-cases) for examples of each question type.

`openai/gpt-6-luna-decisions` is a separate model ID from `openai/gpt-6-luna`, which stays a language model for text generation. Requests to the decisions ID go to the Decisions API and are billed at its rates.

Call it with the [OpenAI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/decisions), the [AI SDK](https://ai-sdk.dev/docs/ai-sdk-core/decisions), the existing [HTTP API](https://vercel.com/docs/ai-gateway/modalities/decision#http-api) at `/v1/evaluate`, or the [AI CLI](https://github.com/vercel-labs/ai-cli).

## [Copy link to heading](#upgrading)Upgrading

`decisions.create` requires the OpenAI SDK 7.30.0 or later for JavaScript, or 3.26.0 or later for Python. In the AI SDK, `experimental_decide` requires `ai` 7.0.128 or later.

## [Copy link to heading](#openai-sdk-and-ai-sdk)OpenAI SDK and AI SDK

Point the OpenAI SDK at AI Gateway and call `decisions.create` as you would against OpenAI. In the AI SDK, questions are keyed by name and the yes/no type is called `boolean`. Each key in `questions` becomes a key in `answers`:

Answers come back as an array in question order, each carrying the question's `name`. Set `model` to any decision model, including [Jev](https://vercel.com/ai-gateway/models/jev), [Liquid d1](https://vercel.com/ai-gateway/models/d1), and [Laya](https://vercel.com/ai-gateway/models/laya).

See the [OpenAI-compatible Decisions API reference](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/decisions) for request limits and error formats, or the [decision documentation](https://vercel.com/docs/ai-gateway/modalities/decision) for the AI SDK. To pick a model, browse [all decision models](https://vercel.com/ai-gateway/models?capabilities=decision) on AI Gateway or read our [decision model guides](https://vercel.com/i/category/decision-models).