---
title: "WebSocket support for OpenAI Responses API live on AI Gateway"
source: "https://vercel.com/changelog/websocket-support-for-openai-responses-api-live-on-ai-gateway"
publishedDate: "2026-07-27"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[AI Gateway](https://vercel.com/ai-gateway) now supports WebSocket mode for the OpenAI Responses API. You can keep a persistent connection open and continue each turn by sending only new input items plus `previous_response_id`, instead of re-sending the full context over a fresh HTTP request every turn.

[OpenAI reports](https://developers.openai.com/api/docs/guides/websocket-mode) up to ~40% faster end-to-end execution on WebSockets for agentic rollouts with 20 or more tool calls.

### [Copy link to heading](#route-responses-api-traffic-over-websocket)Route Responses API traffic over WebSocket

The Responses route opens at `GET /v1/responses` and accepts raw `response.create` frames over a persistent WebSocket connection. The mode is compatible with `store=false` and [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr), and follows OpenAI's [WebSocket mode](https://developers.openai.com/api/docs/guides/websocket-mode) specification upstream.

```
import WebSocket from 'ws';const ws = new WebSocket('wss://ai-gateway.vercel.sh/v1/responses', {  headers: { Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}` },});ws.on('open', () => ws.send(JSON.stringify({  type: 'response.create',  model: 'openai/gpt-5.6-sol',  store: false,  input: 'Pick a gemstone.',})));ws.on('message', (data) => {  const event = JSON.parse(data);  if (event.type === 'response.completed') {    ws.send(JSON.stringify({      type: 'response.create',      model: 'openai/gpt-5.6-sol',      store: false,      previous_response_id: event.response.id,      input: 'Which gemstone did you pick?',    }));  }});
```

See the [AI Gateway documentation](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/websockets) for setup and the full route list.