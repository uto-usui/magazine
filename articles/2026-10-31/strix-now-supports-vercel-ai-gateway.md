---
title: "Strix now supports Vercel AI Gateway"
source: "https://vercel.com/changelog/strix-now-supports-vercel-ai-gateway"
publishedDate: "2026-10-29"
category: "frontend"
feedName: "Vercel"
author: "Harpreet Arora"
---

[Strix](https://strix.ai/), the open-source AI penetration testing tool, can now run on any of the 400+ models on Vercel [AI Gateway](https://vercel.com/docs/ai-gateway).

Strix can reach models from Anthropic, OpenAI, Kimi, GLM, Deepseek, and others through a single API with no markup, removing the need to sign up for multiple providers. Usage and cost are tracked across all models in AI Gateway.

Strix selects the Gateway through `STRIX_LLM`, where the model is the standard AI Gateway `<provider>/<model>` ID behind a `vercel_ai_gateway/` prefix:

terminal

```
export STRIX_LLM="vercel_ai_gateway/zai/glm-5.3"export LLM_API_KEY="your-ai-gateway-api-key"
```

See [Strix's AI Gateway setup guide](https://docs.strix.ai/llm-providers/vercel-ai-gateway) to configure it and get started today.