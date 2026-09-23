---
title: "GPT-6 Sol and Luna now available on AI Gateway"
source: "https://vercel.com/changelog/gpt-6-sol-and-luna-now-available-on-ai-gateway"
publishedDate: "2026-09-22"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[GPT-6 Sol](https://vercel.com/ai-gateway/models/gpt-6-sol) and [GPT-6 Luna](https://vercel.com/ai-gateway/models/gpt-6-luna) from [OpenAI](https://vercel.com/ai-gateway/models/providers/openai) are now available on [AI Gateway](https://vercel.com/ai-gateway).

Both models bring GPT-6 improvements in professional work, coding, computer use, factuality, and communication at a lower price than [GPT-6 Astra](https://vercel.com/ai-gateway/models/gpt-6-astra).

-   **GPT-6 Sol** (`openai/gpt-6-sol`) is suited to complex professional workflows and sustained coding tasks where quality and room to iterate both matter.
    
-   **GPT-6 Luna** (`openai/gpt-6-luna`) is the lower-cost option for high-volume agentic workflows, coding, and everyday tasks.
    

Both Sol and Luna communicate more directly than their GPT-5.6 counterparts, with less jargon and fewer low-value details. They also improve factual reliability and are less likely to make misleading claims about work completed during coding tasks.

Use `openai/gpt-6-sol` and `openai/gpt-6-luna` across the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), [OpenAI-compatible Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI-compatible Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), and [coding agents](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway.

Install the latest [Vercel CLI](https://vercel.com/docs/cli) and connect your supported [coding agents](https://vercel.com/docs/ai-gateway/coding-agents) to AI Gateway:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `openai/gpt-6-sol` for longer or more demanding coding work, or `openai/gpt-6-luna` when throughput is the priority.

AI Gateway provides a unified API for calling models, tracking usage, and configuring retries, failover, and routing.

Try [GPT-6 Sol](https://vercel.com/ai-gateway/models/gpt-6-sol) or [GPT-6 Luna](https://vercel.com/ai-gateway/models/gpt-6-luna) in the model playground, or [view all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.