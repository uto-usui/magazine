---
title: "GLM 5.3 FlashX now available on AI Gateway"
source: "https://vercel.com/changelog/glm-5-3-flashx-now-available-on-ai-gateway"
publishedDate: "2026-09-18"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[GLM 5.3 FlashX](https://vercel.com/ai-gateway/models/glm-5.3-flashx) is now available on AI Gateway.

GLM 5.3 FlashX is a high-speed serving option for Z.ai's multimodal coding model, delivering inference at ~200 tokens per second for faster streamed responses.

The higher serving speed is useful for coding agents, tool loops, and interactive applications where users wait on generated output.

Use `zai/glm-5.3-flashx` across API formats and in coding agents:

To use it in a coding agent, see the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents), then run `vercel ai-gateway setup` to create a key and configure your supported agents. Select `zai/glm-5.3-flashx` inside the agent.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try [GLM-5.3-FlashX in the model playground](https://vercel.com/ai-gateway/models/glm-5.3-flashx), or [view all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.