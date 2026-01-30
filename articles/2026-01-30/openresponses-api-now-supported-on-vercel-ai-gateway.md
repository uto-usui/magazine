---
title: "OpenResponses API now supported on Vercel AI Gateway"
source: "https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway"
publishedDate: "2026-01-15"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jan 15, 2026

Vercel AI Gateway is a day 0 launch partner for the OpenResponses API, an open-source specification from OpenAI for multi-provider AI interactions.

OpenResponses provides a unified interface for text generation, streaming, tool calling, image input, and reasoning across providers.

**AI Gateway supports OpenResponses for:**

-   **Text generation:** Send messages and receive responses from any supported model.
    
-   **Streaming:** Receive tokens as they're generated via server-sent events.
    
-   **Tool calling:** Define functions that models can invoke with structured arguments.
    
-   **Image input:** Send images alongside text for vision-capable models.
    
-   **Reasoning:** Enable extended thinking with configurable effort levels.
    
-   **Provider fallbacks:** Configure automatic fallback chains across models and providers.
    

Use OpenResponses with your AI Gateway key, and switch models across providers by changing the model string.

```
const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {  method: 'POST',  headers: {    'Content-Type': 'application/json',    Authorization: `Bearer ${process.env.VERCEL_AI_GATEWAY_KEY}`,  },  body: JSON.stringify({    model: 'anthropic/claude-sonnet-4.5',    input: [      {        type: 'message',        role: 'user',        content: 'Explain quantum computing in one sentence.',      }    ],  }),});
```

You can also use OpenResponses for more complex cases, like tool calling.

```
const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {  method: 'POST',  headers: {    'Content-Type': 'application/json',    Authorization: `Bearer ${process.env.VERCEL_AI_GATEWAY_KEY}`,  },  body: JSON.stringify({    model: 'zai/glm-4.7',    input: [{ type: 'message', role: 'user', content: 'What is the weather in SF?' }],    tools: [{      type: 'function',      name: 'get_weather',      description: 'Get current weather for a location',      parameters: {        type: 'object',        properties: { location: { type: 'string' } },        required: ['location'],      },    }],  }),});
```

Read the [OpenResponses API documentation](https://vercel.com/docs/ai-gateway/openresponses) or [view the specification](https://www.openresponses.org/specification).