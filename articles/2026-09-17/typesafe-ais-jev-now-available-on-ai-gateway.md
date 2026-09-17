---
title: "TypeSafe AI's Jev now available on AI Gateway"
source: "https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway"
publishedDate: "2026-09-16"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Jev from TypeSafe AI](https://vercel.com/ai-gateway/models/jev) is now available on AI Gateway.

Jev is a probabilistic decision model for software: state goes in, typed Choice, Score, and Boolean answers come out.

Regular language models generate text one token at a time, which the application then parses and validates. Jev evaluates all declared questions in parallel and returns typed answers plus probabilities directly. That removes unnecessary text generation and makes it straightforward to automate clear cases while routing uncertain ones to review.

TypeSafe reports Jev was up to 193.6x faster and 444.6x cheaper than LLMs on its workflow evaluations. Example use cases include:

-   Choosing the next tool or subagent in an agent loop
    
-   Deciding whether to continue, retry, ask the user, or stop
    
-   Scoring urgency or risk before an action
    
-   Verifying model outputs and enforcing guardrails.
    

AI SDK 7 exposes Jev through the experimental `evaluate` [API](https://ai-sdk.dev/docs/ai-sdk-core/evaluation). Choice selects an option, Score grades an ordered rubric, and Boolean estimates the probability of `true`. Install the current AI SDK (AI SDK 7.0.105 onwards supports the `evaluate` API):

```
pnpm add ai@latest
```

Each evaluation specifies:

-   `model`: the evaluation model to call,
    
-   `state`: the shared string, object, or array to evaluate, and
    
-   `questions`: a map of named decisions to make about that state.
    

Call the model with `typesafe-ai/jev`. This example turns one support case into a queue, priority, and refund-review decision, with uncertain routing sent for manual review:

```
import { experimental_evaluate as evaluate } from 'ai';const result = await evaluate({  model: 'typesafe-ai/jev',  state: 'The support agent issued a full refund to the customer.',  questions: {    refunded: {      type: 'boolean',      instructions: 'Was a refund issued?',    },  },  providerOptions: {    gateway: { zeroDataRetention: true },  },});console.log(result.answers.refunded);
```

The result preserves question IDs and Choice keys. TypeSafe reports separate Choice and Score confidence in `result.providerMetadata.typesafe.confidence`. Calibrate probabilities and confidence against labeled examples from your workflow.

Jev supports [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) and [No Training](https://vercel.com/docs/ai-gateway/security-and-compliance/disallow-prompt-training), enabled per request in the example. Evaluation calls also appear in [logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs) and [custom reporting](https://vercel.com/docs/ai-gateway/observability-and-spend/custom-reporting), count toward [budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets), and accept other Gateway provider options in the same `providerOptions.gateway` object.

Read the documentation on [evaluation models](https://vercel.com/docs/ai-gateway/modalities/evaluation) on AI Gateway for more details.