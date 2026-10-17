---
title: "TypeSafe AI's Jev 1.14 is now available on AI Gateway"
source: "https://vercel.com/changelog/typesafe-ais-jev-1-14-is-now-available-on-ai-gateway"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Nick Oates"
---

[Jev 1.14 from TypeSafe AI](https://vercel.com/ai-gateway/models/jev-1.14.0) is now available on [AI Gateway](https://vercel.com/ai-gateway).

Jev is a [decision model](https://vercel.com/docs/ai-gateway/modalities/decision) for software. You pass it state and a set of questions, and it returns typed Choice, Score, and Boolean answers with probabilities instead of free-form text. It answers every question in one request, in parallel, for classification, routing, scoring, and automated verification.

Jev 1.14 accepts images as part of the state, and has an experimental long-context mode for documents, logs, or conversation histories that are too long for a standard request.

Use `typesafe-ai/jev-1.14.0` as the model name.

## [Copy link to heading](#image-input)Image input

Pass an image as a file part alongside text in `state`. This example reads a local PNG and asks a Boolean question about its color:

## [Copy link to heading](#long-context)Long context

Enable long-context mode with `providerOptions.typesafe.longContext: true`. This example reads a support log and checks whether it reports a damaged delivery:

Jev supports [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) and [No Training](https://vercel.com/docs/ai-gateway/security-and-compliance/disallow-prompt-training), which you can enable per request. Decision calls also appear in [logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs) and [custom reporting](https://vercel.com/docs/ai-gateway/observability-and-spend/custom-reporting), count toward [budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets), and accept other Gateway provider options in the same `providerOptions.gateway` object.

Read the documentation on [decision models](https://vercel.com/docs/ai-gateway/modalities/decision) on AI Gateway for more details, discover [practical use cases for Jev](https://vercel.com/i/jev-use-cases), and browse resources in the [knowledge base](https://vercel.com/kb/jev-from-typesafe-ai).