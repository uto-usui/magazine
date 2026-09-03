---
title: "GLM-5.3 is 50% off through DigitalOcean on AI Gateway"
source: "https://vercel.com/changelog/glm-5-3-is-50-off-through-digitalocean-on-ai-gateway"
publishedDate: "2026-09-02"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[GLM-5.3](https://vercel.com/ai-gateway/models/glm-5.3) is 50% off on AI Gateway through Tuesday, September 8, in partnership with DigitalOcean.

## [Copy link to heading](#how-to-use-the-model-during-the-offer-period)How to use the model during the offer period

-   Using the promo name (`zai/glm-5.3-promo-50`) gets the discounted rate. It routes only to DigitalOcean, with no fallback to another provider, and it stops serving when the offer ends.
    
-   Using the standard name (i.e., `zai/glm-5.3`) with provider options to sort DigitalOcean as the preferred provider keeps working after September 8 and routes across every provider that serves the model, at their usual rates.
    

Because the promo name goes away when the offer ends, treat it as something you switch on for the window rather than hardcode. To keep the standard name in your code instead, pin the provider with `order: ['digitalocean']` under `providerOptions.gateway`, which prefers DigitalOcean and falls back to the others if it cannot serve the request.

GLM-5.3 takes text input, with a 1M token context window and a maximum output of 128K tokens. Discounted requests appear in your spend dashboard and carry a trace like any other request.

Try [GLM-5.3](https://vercel.com/ai-gateway/models/glm-5.3) in the model playground.

To use it in a coding agent, see the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents), then run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, Codex, OpenCode, Cursor, Pi, and more and select `zai/glm-5.3-promo-50` inside the agent.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.