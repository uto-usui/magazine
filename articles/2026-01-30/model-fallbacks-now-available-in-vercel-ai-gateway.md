---
title: "Model fallbacks now available in Vercel AI Gateway"
source: "https://vercel.com/changelog/model-fallbacks-now-available-in-vercel-ai-gateway"
publishedDate: "2025-11-10"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Nov 10, 2025

Vercel's [AI Gateway](https://vercel.com/ai-gateway) now supports [fallback models](https://vercel.com/docs/ai-gateway/provider-options#model-fallbacks-with-the-models-option) for when models fail or are unavailable. In addition to safeguarding against provider-level failures, model fallbacks can help with errors and capability mismatches between models (e.g., multimodal, tool-calling, etc.).

Fallback models will be tried in the specified order until a request succeeds or no options remain. Any error, such as context limits, unsupported inputs, or provider outages, can trigger a fallback. Requests are billed based on the model that completes successfully.

This example shows an instance where the primary model does not support multimodal capabilities, falling back to models that do. To use, specify the model fallbacks in `models` within `providerOptions`:

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-oss-120b', // Primary model  prompt: 'Parse the attached PDF for tables and graphs, \  and return the highest performing categories this year',  providerOptions: {    gateway: {      models: [        'google/gemini-2.5-pro',        'anthropic/claude-sonnet-4.5',        'meta/llama-3.1-8b'      ], // Fallback models    },  },})
```

To have pre-defined provider routing in addition to model routing, specify both `models` and providers (`order` or `only`) in `providerOptions`:

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5-nano', // Primary model  prompt: 'Parse the attached PDF for tables and graphs, \  and return the highest performing categories this year',  providerOptions: {    gateway: {      order: ['vertex', 'cerebras'], // Provider routing order      models: [        'google/gemini-2.5-flash',        'openai/gpt-oss-120b'      ], // Fallback models    },  },})
```

AI Gateway also includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway#configuring-your-own-provider-keys-byok), and supports [OpenAI-compatible API](https://vercel.com/docs/ai-gateway/openai-compat#model-fallbacks).