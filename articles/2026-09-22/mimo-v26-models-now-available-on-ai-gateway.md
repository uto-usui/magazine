---
title: "MiMo V2.6 models now available on AI Gateway"
source: "https://vercel.com/changelog/mimo-v2-6-models-now-available-on-ai-gateway"
publishedDate: "2026-09-21"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[MiMo V2.6 Pro](https://vercel.com/ai-gateway/models/mimo-v2.6-pro), [MiMo V2.6 Flash](https://vercel.com/ai-gateway/models/mimo-v2.6-flash), and [MiMo V2.6 Pro UltraSpeed](https://vercel.com/ai-gateway/models/mimo-v2.6-pro-ultraspeed) from [Xiaomi](https://vercel.com/ai-gateway/models/providers/xiaomi) are now available on [AI Gateway](https://vercel.com/ai-gateway).

MiMo V2.6 combines coding, reasoning, and tool use with native text, image, audio, and video understanding. Its 1M token context supports long repositories, tool traces, and multi-session agent work, with structured outputs and up to 128K output tokens.

Choose a model based on the workload:

-   `xiaomi/mimo-v2.6-pro` is the larger sparse mixture-of-experts checkpoint, with 1.02T total parameters and 42B activated per token, for complex software engineering and long-running agent work.
    
-   `xiaomi/mimo-v2.6-flash` uses 309B total parameters and activates 15B per token, making it the more efficient option for multimodal automation and everyday agent workflows.
    
-   `xiaomi/mimo-v2.6-pro-ultraspeed` serves Pro at up to 20 times its output speed for interactive and latency-sensitive workflows, with the same capabilities.
    

To use MiMo V2.6 in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), install the latest Vercel CLI and run:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `xiaomi/mimo-v2.6-pro`, `xiaomi/mimo-v2.6-flash`, or `xiaomi/mimo-v2.6-pro-ultraspeed` in your agent.

Try [MiMo V2.6 Pro](https://vercel.com/ai-gateway/models/mimo-v2.6-pro), [Flash](https://vercel.com/ai-gateway/models/mimo-v2.6-flash), or [Pro UltraSpeed](https://vercel.com/ai-gateway/models/mimo-v2.6-pro-ultraspeed) in the model playground.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.