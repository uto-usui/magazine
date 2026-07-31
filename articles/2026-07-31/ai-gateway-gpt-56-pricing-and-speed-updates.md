---
title: "AI Gateway: GPT-5.6 pricing and speed updates"
source: "https://vercel.com/changelog/ai-gateway-gpt-5-6-pricing-speed-updates"
publishedDate: "2026-07-30"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

On [AI Gateway](https://vercel.com/ai-gateway), [GPT-5.6 Luna](https://vercel.com/ai-gateway/models/gpt-5.6-luna) and [GPT-5.6 Terra](https://vercel.com/ai-gateway/models/gpt-5.6-terra) are now cheaper and [GPT-5.6 Sol](https://vercel.com/ai-gateway/models/gpt-5.6-sol) is faster.

AI Gateway adds no markup on token pricing, so these changes reach you at the upstream rate.

The changes apply to both short and long context pricing.

Model

Change

Input: Short context (per 1M tokens)

Output: Short context (per 1M tokens)

`openai/gpt-5.6-luna`

80% price reduction

$0.2

$1.2

`openai/gpt-5.6-terra`

20% price reduction

$2

$12

`openai/gpt-5.6-sol`

Same price, fast mode now 2.5x faster (up from 1.5x)

Unchanged

Unchanged

GPT-5.6 Sol keeps the same price; its fast mode now runs 2.5x faster, up from 1.5x. Model IDs are unchanged, so existing requests get the new rates and speed with no code change.

See full pricing detail on [AI Gateway](https://vercel.com/ai-gateway/models).