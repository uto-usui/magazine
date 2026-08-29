---
title: "Ling 3.0 Flash Fin now available on AI Gateway for free"
source: "https://vercel.com/changelog/ling-3-0-flash-fin-now-available-on-ai-gateway-for-free"
publishedDate: "2026-08-27"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Ling 3.0 Flash Fin from Inclusion AI](https://vercel.com/ai-gateway/models/ling-3.0-flash-fin) is now available on AI Gateway and free to use through September 25.

Ling 3.0 Flash Fin is a finance-focused version of [Ling 3.0 Flash](https://vercel.com/ai-gateway/models/ling-3.0-flash). It has a 256K-token context window, produces up to 32K output tokens, and supports reasoning and function calling.

The model is designed for financial research and analysis, including multi-step workflows that user multiple tool calls before producing an answer.

Choose a model ID based on what should happen after the free period:

-   **Continue after September 25:** Use `inclusionai/ling-3.0-flash-fin`. Requests are free during the offer and begin billing at the standard rate when it ends.
    
-   **Stop after September 25:** Use `inclusionai/ling-3.0-flash-fin-free`. This model ID returns an error after the offer ends, preventing future charges.
    

```
import { streamText } from 'ai';const result = streamText({  model: 'inclusionai/ling-3.0-flash-fin',  prompt: 'Summarize this earnings report.',});
```

Use the standard model ID during the free period to continue at regular pricing afterward.

To use Ling 3.0 Flash Fin with a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup`, then select either model ID as your agent’s model. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for more.

Try Ling 3.0 Flash Fin in [the model playground](https://vercel.com/ai-gateway/models/ling-3.0-flash-fin), or browse [all language models](https://vercel.com/ai-gateway/models?type=text).