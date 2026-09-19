---
title: "GPT-Live 1 now available on AI Gateway"
source: "https://vercel.com/changelog/gpt-live-1-now-available-on-ai-gateway"
publishedDate: "2026-09-17"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[GPT-Live 1 from OpenAI](https://vercel.com/ai-gateway/models/gpt-live-1) is now available on AI Gateway.

GPT-Live 1 is a full-duplex voice model and can listen and speak at the same time. Many voice models use turn detection to respond. Full duplex removes that boundary, so a user can pause, interrupt, or add detail while GPT-Live is speaking.

GPT-Live 1 also supports client delegation. Client delegation lets you choose the background model independently from GPT-Live 1. A basic session runs only the voice model. When deeper work is needed, your application can handle `delegation-created` with [any text model on AI Gateway](https://vercel.com/ai-gateway/models?type=text) while the conversation continues.

Install AI SDK 7, `@ai-sdk/openai 4.0.67` or later, and a WebSocket client:

```
pnpm add ai@latest @ai-sdk/openai@latest wspnpm add -D @types/ws @types/node
```

### [Copy link to heading](#simple-example-without-delegation)Simple example without delegation

This starts `openai/gpt-live-1` without calling another model. Wait for `session-started` before sending audio.

```
import { createOpenAI } from '@ai-sdk/openai';const live = createOpenAI({  apiKey: process.env.AI_GATEWAY_API_KEY,  baseURL: 'https://ai-gateway.vercel.sh/v1',}).experimental_realtime('openai/gpt-live-1', { api: 'live' });send(live.serializeClientEvent({  type: 'session-start',  config: { instructions: 'You are a helpful voice assistant.' },}));
```

### [Copy link to heading](#delegate-work-and-keep-talking)Delegate work and keep talking

You can call a text model for GPT Live to delegate to, then return the result on the `commentary` channel for it to speak. This example uses `openai/gpt-5.6-sol`, but you can substitute any text model available on AI Gateway:

```
const voice = openai.experimental_realtime(  'openai/gpt-live-1',  { api: 'live' },);async function handleDelegation({ delegationId }) {  const { text } = await generateText({    model: 'openai/gpt-5.6-sol', // Any text model    prompt: conversationContext,    maxOutputTokens: 200,  });  send(voice.serializeClientEvent({    type: 'context-append',    delegationId,    content: text,    providerOptions: { openai: { channel: 'commentary' } },  }));}
```

Your application controls delegated work and its permissions, confirmations, and cancellation. Delegated model requests are billed separately through AI Gateway; voice-session usage continues while they run. These snippets omit WebSocket connection, event parsing, transcript assembly, audio streaming, and shutdown. See the [GPT-Live guide](https://vercel.com/docs/ai-gateway/modalities/realtime/gpt-live) in the AI Gateway docs for connection setup, audio streaming, and complete examples. For all audio models on AI Gateway, go to the [model list](https://vercel.com/ai-gateway/models?modality=audio).