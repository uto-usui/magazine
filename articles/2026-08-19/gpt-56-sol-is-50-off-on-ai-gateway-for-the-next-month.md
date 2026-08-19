---
title: "GPT-5.6 Sol is 50% off on AI Gateway for the next month"
source: "https://vercel.com/changelog/gpt-5-6-sol-is-50-off-on-ai-gateway-for-the-next-month"
publishedDate: "2026-08-17"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[GPT-5.6 Sol](https://vercel.com/ai-gateway/models/gpt-5.6-sol), the flagship of OpenAI's GPT-5.6 series, is 50% off on AI Gateway through September 18. The discount applies on the OpenAI provider to all token types, tiers, regions, and modes, and it is available only on requests running directly through AI Gateway (not BYOK).

## [Copy link to heading](#pricing:-50%-off)Pricing: 50% off

Service tier

New price per M tokens (input / output)

Original price per M tokens (input / output)

Default

$2.50 / $15.00

$5.00 / $30.00

Flex

$1.25 / $7.50

$2.50 / $15.00

Priority (fast mode)

$5.00 / $30.00

$10.00 / $60.00

The discount applies on the same terms everywhere else the model is priced: across every service tier, including fast mode, and to cached tokens, cache writes, long-context requests, and different regions.

It covers requests billed through AI Gateway on the OpenAI provider. [BYOK](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) requests run on your own provider accounts and bill at whatever rate you have with them.

The model ID is unchanged, so requests you already send pick up the discounted rate with no code change:

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.6-sol',  prompt: 'Investigate the failing tests and open a PR with a fix.',});
```

Sol takes a reasoning effort up to `max` for the hardest problems, accepts text, image, and PDF input, and carries a long context window.

To use it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup` to connect Claude Code, Codex, OpenCode, or Pi, then select `openai/gpt-5.6-sol` inside the agent. The 50% discount will apply there.

## [Copy link to heading](#get-started)Get started

[Create an API key](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway&title=AI+Gateway) in the AI Gateway section of your dashboard, or try the model in the browser first from its [playground page](https://vercel.com/ai-gateway/models/gpt-5.6-sol).