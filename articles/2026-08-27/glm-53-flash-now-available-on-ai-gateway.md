---
title: "GLM 5.3 Flash now available on AI Gateway"
source: "https://vercel.com/changelog/glm-5-3-flash-now-available-on-ai-gateway"
publishedDate: "2026-08-26"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[GLM 5.3 Flash from Z.ai](https://vercel.com/ai-gateway/models/glm-5.3-flash) is now available on AI Gateway.

GLM-5.3 Flash is a multimodal model that supports text and vision input, with a 1M token context window. It supports function calling, structured output, and streaming. To use GLM-5.3 Flash, set `model` to `zai/glm-5.3-flash`:

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-5.3-flash',  prompt: 'Recreate this screenshot as a responsive React component.',});
```

You can also pass images alongside text in a message. URLs and Base64 data URLs both work, and a request can include multiple images:

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-5.3-flash',  messages: [    {      role: 'user',      content: [        {          type: 'text',          text: 'Recreate this screenshot as a responsive React component.',        },        {          type: 'file',          mediaType: 'image/png',          data: readFileSync('screenshot.png'),        },      ],    },  ],});
```

To use it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, Codex, OpenCode, Cursor, Pi, and more, then select `zai/glm-5.3-flash` inside the agent.

Try [GLM-5.3 Flash](https://vercel.com/ai-gateway/models/glm-5.3-flash) in the model playground.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests. [View all language models](https://vercel.com/ai-gateway/models?type=text) on AI Gateway.