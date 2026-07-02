---
title: "Claude Fable 5 access restored on AI Gateway"
source: "https://vercel.com/changelog/claude-fable-5-access-restored-on-ai-gateway"
publishedDate: "2026-07-01"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

Access to Claude Fable 5, the Mythos-class model, has now been [restored](https://www.anthropic.com/news/redeploying-fable-5) on AI Gateway following the [US Government's decision](https://www.anthropic.com/news/redeploying-fable-5) to lift the export controls.

[Fable 5](https://vercel.com/ai-gateway/models/fable-5) is the same model that was available between June 9 and June 12. What has changed is the safety classifiers, which are now updated and more robust.

In the near term, some routine tasks such as coding and debugging may trigger safety classifiers. To ensure requests are still serviced when the safety classifiers are triggered, use [model fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks). AI Gateway will try each model in `models` in the stated order if Anthropic refuses the request to Fable 5.

To call Fable 5, use model name `anthropic/claude-fable-5`:

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-fable-5',  prompt: 'Summarize this quarterly report and list the key risks.',  providerOptions: {    gateway: {      models: ['anthropic/claude-opus-4.8', 'anthropic/claude-sonnet-5'],    },  },});
```

Call Fable 5 with model fallbacks. This request will fall back to Opus 4.8, then Sonnet 5, if the safety classifier is triggered.

Model fallbacks work on every API format: for more information on how to configure these, see the [docs](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks).

Anthropic does not support Zero Data Retention for the model, because some misuse patterns are only visible across cumulative requests, which real-time filters cannot catch on their own. Prompts and completions are retained for 30 days and are not used to train Claude. Read more in the [data retention whitepaper](https://trust.anthropic.com/resources?s=7ksqkied5hn0pocsj206m&name=%5Banthropic%5D-security-and-privacy-design-of-anthropic-data-retention-and-review).