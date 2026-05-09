---
title: "Vercel Flags now supports JSON values"
source: "https://vercel.com/changelog/vercel-flags-now-supports-json-values"
publishedDate: "2026-05-07"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

May 7, 2026

You can now store JSON values in [Vercel Flags](https://vercel.com/docs/flags/vercel-flags), extending the existing support for boolean, string, and number values. This allows you to collapse what used to take several related flags into a single feature flag.

For example, to A/B test how a different model performs, you can now define a single `model` flag. This allows you to manage one flag that serves the full object rather than managing `ai_model`, `ai_temperature`, and `ai_max_tokens` separately:

```
// Variant A{  "id": "claude-sonnet-4-6",  "temperature": 0.7,   "maxTokens": 1024,  "systemPrompt": "You are a helpful shopping assistant."}// Variant B{  "id": "claude-opus-4-6",  "temperature": 0.8,   "maxTokens": 2048,  "systemPrompt": "You help with shopping."}
```

A feature flag holding JSON configuration in its variants

Use Vercel Flags to progressively route traffic to a new model, A/B test, or quickly switch models in case a provider is having issues.

[Try it out](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fflags&title=Vercel+Flags) or learn more about [Vercel Flags](https://vercel.com/docs/flags/vercel-flags).