---
title: "GPT-5.6 Sol is now 50% off a lower price"
source: "https://vercel.com/changelog/gpt-5-6-sol-is-now-50-percent-off-a-lower-price"
publishedDate: "2026-08-21"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

OpenAI lowered list pricing for [GPT-5.6 Sol](https://vercel.com/ai-gateway/models/gpt-5.6-sol), and the 50% AI Gateway [discount](https://vercel.com/changelog/gpt-5-6-sol-is-50-off-on-ai-gateway-for-the-next-month) now applies to the new, lower price through September 18. Input drops 20%, output drops a third.

The discount applies on every OpenAI service tier:

Service tier

You pay now (input / output)

New list price (input / output)

You paid before (input / output)

Default

$2.00 / $10.00

$4.00 / $20.00

$2.50 / $15.00

Flex

$1.00 / $5.00

$2.00 / $10.00

$1.25 / $7.50

Priority (fast mode)

$4.00 / $20.00

$8.00 / $40.00

$5.00 / $30.00

Rates are per million tokens for requests up to 272K tokens. Cached tokens, cache writes, long-context requests above 272K, and the US regional rates all move by the same proportion. See the [pricing page](https://vercel.com/docs/ai-gateway/pricing) for all model rates.

The model ID is unchanged, so requests you already send bill at the new price automatically. [BYOK](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) requests bill at your own rate with OpenAI.

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.6-sol',  prompt: 'Investigate the failing tests and open a PR with a fix.',});
```

The same AI SDK call, at a new, lower rate.

To use Sol in a coding agent, run `vercel ai-gateway coding-agents setup` to connect your agents to AI Gateway, then select `openai/gpt-5.6-sol` in the agent's model settings. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for setup details.

Try it in the [playground](https://vercel.com/ai-gateway/models/gpt-5.6-sol), or [browse every language model](https://vercel.com/ai-gateway/models?type=text) on the AI Gateway.