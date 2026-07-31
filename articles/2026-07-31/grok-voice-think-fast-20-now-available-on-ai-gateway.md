---
title: "Grok Voice Think Fast 2.0 now available on AI Gateway"
source: "https://vercel.com/changelog/grok-voice-think-fast-2-0-now-available-on-ai-gateway"
publishedDate: "2026-07-29"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[Grok Voice Think Fast 2.0 from xAI](https://vercel.com/ai-gateway/models/grok-voice-think-fast-2.0) is now available on AI Gateway. It is a speech-to-speech voice model that takes audio in and audio out, improving on the previous Grok Voice model in reasoning, transcription accuracy, and conversation.

The model reasons in parallel with speech, so it can think through a query while talking without adding latency. It has also been trained to use fewer reasoning tokens than before, so tool calls fire sooner, often before the end of the agent's first sentence. Transcription holds up in real-world conditions, including background noise and telephony compression.

Use `xai/grok-voice-think-fast-2.0` through the AI SDK's realtime API. Mint a short-lived token on the server so your API key never reaches the client:

app/api/realtime/token/route.ts

```
import { gateway } from "@ai-sdk/gateway";export async function POST() {  const { token, url } = await gateway.experimental_realtime.getToken({    model: "xai/grok-voice-think-fast-2.0",  });  return Response.json({ token, url, tools: [] });}
```

See the [realtime documentation](https://vercel.com/docs/ai-gateway/modalities/realtime) to build a voice agent with Grok Voice Think Fast 2.0. Try out the model in the [AI Gateway playground](https://vercel.com/ai-gateway/models/grok-voice-think-fast-2.0).