---
title: "AI Gateway adds confidence-based decision fallbacks"
source: "https://vercel.com/changelog/confidence-based-decision-fallbacks"
publishedDate: "2026-10-06"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[AI Gateway](https://vercel.com/docs/ai-gateway) can now escalate a decision request to a fallback model when the primary model's answer trips a [confidence condition you set](https://vercel.com/i/confidence-based-decision-fallbacks).

Conditions can be combined, so an escalation can depend on more than one signal. The plain model names you already list in `models` keep catching outright errors, so existing fallbacks are unaffected. Confidence conditions cover Choice and Score questions. Boolean questions escalate on a probability range instead.

Set the fallback by adding one conditional object to `providerOptions.gateway.models`. Requests without it keep their existing behavior.

```
import { gateway } from '@ai-sdk/gateway';import { experimental_decide as decide } from 'ai';const result = await decide({  model: gateway.decisionModel('typesafe-ai/jev'),  state: 'I was charged twice and now the app will not load.',  questions: {    intent: {      type: 'choice',      instructions: 'Which team should handle this?',      criteria: { billing: 'Charges and refunds', technical: 'Bugs and outages' },    },  },  providerOptions: {    gateway: {      models: [{ model: 'openai/gpt-6-astra', when: { question: 'intent', confidenceBelow: 0.6 } }],    },  },});console.log(result.answers.intent.choice);
```

Escalating an uncertain answer to a fallback model with a confidence condition

Leave out `question` and the condition checks every question of the matching type, so `{ confidenceBelow: 0.6 }` escalates when any Choice or Score answer falls below 0.6.

Because a triggered fallback runs a second decision, it bills both stages.

Learn more in the [decision fallbacks documentation](https://vercel.com/docs/ai-gateway/models-and-providers/decision-fallbacks), or see them in practice for [mapping CSV columns](https://vercel.com/i/map-csv-columns-ai-gateway-fallbacks) and [flagging UI copy for translation review](https://vercel.com/i/translation-review-ai-gateway-fallbacks).