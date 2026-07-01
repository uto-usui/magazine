---
title: "xAI Grok audio models now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/xai-grok-audio-models-now-available-on-vercel-ai-gateway"
publishedDate: "2026-06-29"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[xAI's audio models](https://vercel.com/ai-gateway/models?capabilities=realtime&providers=xai) are now live on AI Gateway. Realtime voice, text to speech, and speech to text are all available through the [AI SDK](https://ai-sdk.dev/v7/docs/ai-sdk-core/realtime) with the same routing, observability, and spend controls as your other models.

These capabilities are available on the AI SDK 7 release.

```
npm install ai @ai-sdk/react @ai-sdk/gateway
```

## [Link to heading](#available-models)Available models

Capability

Models

**Realtime voice**

`xai/grok-voice-think-fast-1.0`

**Text to speech**

`xai/grok-tts`

**Speech to text**

`xai/grok-stt`

## [Link to heading](#realtime)Realtime

A voice agent has two pieces: a server route that mints a short-lived token, so your API key never reaches the client, and a browser component that connects with it.

Add the token route: this example sets [model](https://vercel.com/ai-gateway/models/grok-voice-think-fast-1.0) to `xai/grok-voice-think-fast-1.0`:

app/api/realtime/token/route.ts

```
import { gateway } from '@ai-sdk/gateway';export async function POST() {  const { token, url } = await gateway.experimental_realtime.getToken({    model: 'xai/grok-voice-think-fast-1.0',  });  return Response.json({ token, url, tools: [] });}
```

Then connect from the browser. The `useRealtime`hook from `@ai-sdk/react` fetches that route and manages the WebSocket connection, microphone capture, and audio playback:

```
'use client';import { experimental_useRealtime as useRealtime } from '@ai-sdk/react';import { gateway } from '@ai-sdk/gateway';// Inside a client component:const { status, connect, startAudioCapture } = useRealtime({  model: gateway.experimental_realtime('xai/grok-voice-think-fast-1.0'),  api: { token: '/api/realtime/token' },  sessionConfig: { turnDetection: { type: 'server-vad' } },});// Call connect(), then startAudioCapture(stream) to start talking.
```

## [Link to heading](#text-to-speech)Text to speech

Generate [spoken audio](https://vercel.com/ai-gateway/models/grok-tts) from text with `generateSpeech`. Pass a voice and an output format, then write the result to a file with `xai/grok-tts`:

```
import { generateSpeech } from 'ai';import { writeFile } from 'node:fs/promises';const result = await generateSpeech({  model: 'xai/grok-tts',  text: 'Thanks for trying out AI Gateway.',  voice: 'eve',  outputFormat: 'mp3',});await writeFile('speech.mp3', result.audio.uint8Array);
```

## [Link to heading](#speech-to-text)Speech to text

[Transcribe](https://vercel.com/ai-gateway/models/grok-stt) recordings into text with `transcribe`. This example uses `xai/grok-stt`:

```
import { transcribe } from 'ai';import { readFile } from 'node:fs/promises';const result = await transcribe({  model: 'xai/grok-stt',  audio: await readFile('audio.mp3'),});console.log(result.text);
```

## [Link to heading](#playground)Playground

You can also try the xAI audio models directly in the AI Gateway playground. Open the [models list](https://vercel.com/ai-gateway/models) and click into any of the models to use them directly in the browser. The `xai/grok-voice-think-fast-1.0` playground [here](https://vercel.com/ai-gateway/models/grok-voice-think-fast-1.0) allows you to talk to the agent and see responses instantly:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4GeB4zXBcvVuJ7cGd8UQPc%2F73e00ae56f43a7ad372b373c4a5736fc%2FCleanShot_2026-06-22_at_23.12.39_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3odsLEMvUnMECBxdD7dtcm%2F7872d73c3b2d14e57c89327ffafa80b4%2FCleanShot_2026-06-22_at_23.13.29_2x.png&w=1920&q=75)

### [Link to heading](#more-information)More information