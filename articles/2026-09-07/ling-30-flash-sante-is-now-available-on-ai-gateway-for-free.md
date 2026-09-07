---
title: "Ling 3.0 Flash Sante is now available on AI Gateway for free"
source: "https://vercel.com/changelog/ling-3-0-flash-sante-is-now-available-on-ai-gateway-for-free"
publishedDate: "2026-09-04"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Ling 3.0 Flash Sante from inclusionAI](https://vercel.com/ai-gateway/models/ling-3.0-flash-sante) is now available on AI Gateway, free to use through October 4.

Ling 3.0 Flash Sante is a health and medicine-focused version of [Ling 3.0 Flash](https://vercel.com/ai-gateway/models/ling-3.0-flash). It is a Mixture-of-Experts model with 124B total parameters and about 5.1B active per token, a 256K token context window, and function calling.

The model is built for medical reasoning, professional healthcare tasks, deep research, evidence-based retrieval, and multi-step medical workflows. It retains the base model's general reasoning, coding, and agentic capabilities.

## [Copy link to heading](#how-to-use-the-model-during-the-free-period)How to use the model during the free period

-   The standard model ID, `inclusionai/ling-3.0-flash-sante`, is free through October 4 and begins billing when the offer ends.
    
-   The free model ID, `inclusionai/ling-3.0-flash-sante-free`, stops serving when the offer ends instead of billing.
    

Free requests still appear in your spend dashboard and carry a trace, they just cost nothing.

To use Ling 3.0 Flash Sante, set `model` in the [AI SDK](https://ai-sdk.dev/):

Use `inclusionai/ling-3.0-flash-sante-free` if you want the model to stop serving when the offer ends rather than start billing.

To use it in a coding agent, see the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents), then run `vercel ai-gateway coding-agents setup` to connect Claude Code, Codex, Cursor, and more, then select `inclusionai/ling-3.0-flash-sante` in the agent.

Try Ling 3.0 Flash Sante in the [model playground](https://vercel.com/ai-gateway/models/ling-3.0-flash-sante), or open the [free model page](https://vercel.com/ai-gateway/models/ling-3.0-flash-sante-free).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.