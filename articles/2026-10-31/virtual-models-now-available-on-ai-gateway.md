---
title: "Virtual models now available on AI Gateway"
source: "https://vercel.com/changelog/virtual-models-now-available-on-ai-gateway"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Virtual models](https://vercel.com/docs/ai-gateway/models-and-providers/virtual-models) are now available on [AI Gateway](https://vercel.com/ai-gateway).

A virtual model is a saved configuration that tells AI Gateway which model and settings to use. Your apps and agents call it with a custom model ID, such as `vmc/coding-agent`. You can change the model or settings centrally in AI Gateway without redeploying your apps or reconfiguring your agents.

Use virtual models to:

-   **Configure coding agents:** Set reasoning effort, fast mode, prompt caching, and other options even when your agent doesn’t expose them.
    
-   **Control routing and compliance:** Choose providers, configure fallback models, and enforce requirements such as [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr).
    
-   **Attribute spend:** Attach [custom reporting](https://vercel.com/docs/ai-gateway/observability-and-spend/custom-reporting) tags to every request that uses the virtual model.
    

To create a virtual model, open the [Virtual Models page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fvirtual-models&title=AI+Gateway+Virtual+Models) and click **Create Virtual Model**. Enter a slug, choose the underlying model, configure the settings you want requests to use, and save.

Or create one with the [Vercel CLI](https://vercel.com/docs/cli/ai-gateway#virtual-models):

```
vercel ai-gateway virtual-models create coding-agent \  --model anthropic/claude-opus-5.5 \  --config '{"speed":"fast","zeroDataRetention":true}'
```

Create a reusable coding-agent configuration with fast mode and Zero Data Retention.

To use a virtual model, replace the provider model ID in your AI SDK or compatible API requests with `vmc/<slug>`, such as `vmc/coding-agent`.

For [coding agents](https://vercel.com/docs/ai-gateway/coding-agents), connect to AI Gateway with `vercel ai-gateway setup` if needed, then select your virtual model in the agent’s model picker or configuration.

Virtual models work with every model type on AI Gateway. Read the [launch post](https://vercel.com/blog/ai-gateway-virtual-models) for examples or learn more in the [virtual models documentation](https://vercel.com/docs/ai-gateway/models-and-providers/virtual-models).