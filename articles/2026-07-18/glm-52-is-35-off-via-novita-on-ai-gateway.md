---
title: "GLM 5.2 is 35% off via Novita on AI Gateway"
source: "https://vercel.com/changelog/glm-5-2-is-35-off-via-novita-on-ai-gateway"
publishedDate: "2026-07-17"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[GLM 5.2](https://vercel.com/ai-gateway/models/glm-5.2) is 35% off on AI Gateway through July 24 when routed through Novita.

To get the discounted rate, set the model to `zai/glm-5.2` in the [AI SDK](https://ai-sdk.dev/) and route requests through Novita:

agent.ts

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-5.2',  prompt: 'Migrate every API route to the new auth middleware and open a PR.',  providerOptions: {    gateway: {      order: ['novita'],    },  },});
```

Routing GLM 5.2 requests to Novita with the gateway provider options

After July 24, the model stays available at standard provider rates with no markup.

Try GLM 5.2 in the [model playground](https://vercel.com/ai-gateway/models/glm-5.2).