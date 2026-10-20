---
title: "Elorian AI's Glimpse now available on AI Gateway"
source: "https://vercel.com/changelog/elorian-ai-glimpse-now-available-on-ai-gateway"
publishedDate: "2026-10-16"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Glimpse from Elorian](https://vercel.com/ai-gateway/models/glimpse) is now available on AI Gateway. The visual reasoning model accepts images and video to follow objects through motion, interpret spatial relationships, and connect an action to its physical consequences.

Glimpse can return to visual evidence as it works: zooming into a detail, revisiting a short interval of video, or tracking the same feature across frames. This allows the model to support use cases like scientific chart analysis, video captioning, visual counting, and robotics data annotation.

Some examples include checking a train's motion to determine whether it is slowing down, keeping objects distinct through camera movement, and labeling completed actions in robot footage.

Use `elorian/glimpse` as the model name:

With AI SDK 7, you can send a video as a file part. Replace the placeholder URL with a public or signed HTTPS URL for your video:

To configure AI Gateway in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Try Glimpse in the [model playground](https://vercel.com/ai-gateway/models/glimpse).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.