---
title: "Gemini 3.8 Live models now available on AI Gateway"
source: "https://vercel.com/changelog/gemini-3-8-live-models-now-available-on-ai-gateway"
publishedDate: "2026-09-15"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[Gemini 3.8 Live](https://vercel.com/ai-gateway/models/gemini-3.8-live) and [Gemini 3.8 Live Extended Thinking](https://vercel.com/ai-gateway/models/gemini-3.8-live-extended-thinking) from Google are now available on AI Gateway.

Both models support real-time spoken interactions for voice assistants, conversational experiences, and applications that respond through audio.

-   `google/gemini-3.8-live` supports real-time audio, visual grounding, automatic switching across 97 languages, and background tool calls while the conversation continues.
    
-   `google/gemini-3.8-live-extended-thinking` adds multi-step reasoning that runs in parallel with speech, allowing it to acknowledge requests and narrate progress without interrupting the conversation.
    

Use either model through the AI SDK's realtime API. Install the Gateway provider and a WebSocket client:

```
pnpm add @ai-sdk/gateway@latest ws
```

Mint a short-lived token, open the WebSocket, and use the model adapter to serialize and parse realtime events:

```
import { gateway } from '@ai-sdk/gateway';import WebSocket from 'ws';const modelId = 'google/gemini-3.8-live';const { token, url } = await gateway.experimental_realtime.getToken({  model: modelId,});const model = gateway.experimental_realtime(modelId);const config = model.getWebSocketConfig({ token, url });const ws = new WebSocket(config.url, config.protocols);const send = async (  event: Parameters<typeof model.serializeClientEvent>[0],) => ws.send(JSON.stringify(await model.serializeClientEvent(event)));ws.on('open', async () => {  await send({    type: 'session-update',    config: {      outputModalities: ['audio'],      outputAudioTranscription: {},      // Extended Thinking only. Set exactly one of thinkingLevel or thinkingBudget:      // providerOptions: {      //   google: { thinkingConfig: { thinkingLevel: 'LOW' } },      // },    },  });  await send({    type: 'conversation-item-create',    item: {      type: 'text-message',      role: 'user',      text: 'Say hello in one sentence.',    },  });});ws.on('message', (data) => {  const parsed = model.parseServerEvent(JSON.parse(data.toString()));  for (const event of Array.isArray(parsed) ? parsed : [parsed]) {    if (event.type === 'audio-transcript-delta') {      process.stdout.write(event.delta);    }    if (event.type === 'response-done') {      console.log();      ws.close();    }    if (event.type === 'error') {      console.error(event.message);      ws.close();    }  }});ws.on('close', (code, reason) => {  if (code !== 1000) {    console.error(`WebSocket closed (${code}): ${reason.toString()}`);  }});
```

See the [realtime quickstart](https://vercel.com/docs/ai-gateway/getting-started/realtime) for more details on realtime events and WebSocket connections.

Try [Gemini 3.8 Live](https://vercel.com/ai-gateway/models/gemini-3.8-live) or [Gemini 3.8 Live Extended Thinking](https://vercel.com/ai-gateway/models/gemini-3.8-live-extended-thinking) in the model playground.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime.