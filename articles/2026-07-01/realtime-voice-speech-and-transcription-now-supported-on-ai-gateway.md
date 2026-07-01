---
title: "Realtime voice, speech, and transcription now supported on AI Gateway"
source: "https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway"
publishedDate: "2026-06-29"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[AI Gateway](https://vercel.com/ai-gateway) now supports voice and audio models. You can build realtime voice agents, generate speech from text, and transcribe audio to text. This provides the same observability, spend controls, and bring-your-own-key support as text, image, and video models in AI Gateway, with no markup or platform fees. These capabilities are in beta and available via [AI SDK](https://ai-sdk.dev/) 7.

With realtime support, a single model takes audio in and audio out, so a user can talk and hear a reply back in near real time instead of waiting on a chain of separate models.

Capability

What it does

**Realtime voice agents**

Model listens to the user, works out a response, and speaks it back in a live, low-latency conversation. It can call your tools mid-conversation to look something up or take an action. The `useRealtime` hook handles microphone capture and playback.

**Text to speech**

Generate spoken audio from text, with a selectable voice and output format such as MP3. Use it for voiceovers, audio versions of written content, and spoken responses.

**Speech to text**

Transcribe recordings into text, from a file buffer, base64 string, or URL. Use it for voice notes or other transcriptions.

**Two ways to get started:**

1.  Follow the realtime example below or the [realtime quickstart](https://vercel.com/docs/ai-gateway/getting-started/realtime) to add a voice agent to your app.
    
2.  Use the [playground](https://vercel.com/ai-gateway/models/gpt-realtime-2). Talk to a realtime model in the browser, no code required, in the AI Gateway Playground.
    

## [Link to heading](#realtime-example)Realtime example

A voice agent has two pieces: a server route that mints a short-lived token, so your API key never reaches the client, and a browser component that connects with it.

Add the token route:

app/api/realtime/token/route.ts

```
import { gateway } from '@ai-sdk/gateway';export async function POST() {  const { token, url } = await gateway.experimental_realtime.getToken({    model: 'openai/gpt-realtime-2',  });  return Response.json({ token, url, tools: [] });}
```

Then connect from the browser. The `useRealtime` hook fetches that route and manages the WebSocket connection, microphone capture, and audio playback:

```
'use client';import { experimental_useRealtime as useRealtime } from '@ai-sdk/react';import { gateway } from '@ai-sdk/gateway';// Inside a client component:const { status, connect, startAudioCapture } = useRealtime({  model: gateway.experimental_realtime('openai/gpt-realtime-2'),  api: { token: '/api/realtime/token' },  sessionConfig: { voice: 'alloy', turnDetection: { type: 'server-vad' } },});// Call connect(), then startAudioCapture(stream) to start talking.
```

## [Link to heading](#playground)Playground

You can also try audio models without writing any code. Open the [models page](https://vercel.com/ai-gateway/models), click into a [model](https://vercel.com/ai-gateway/models/gpt-realtime-2), and interact with it right in the browser:

-   Talk to a realtime model to hold a voice conversation
    
-   Send text and have a transcription model read it back
    
-   Speak to an audio model and have it transcribe your words
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1eLPtddrIxiuNS8i9LeSmn%2F2ebed79874661d6ff4ab1f23a84f74df%2FCleanShot_2026-06-22_at_16.26.44_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F56X6kYLKVr6suwIPVlTTRn%2Fcc629586c457a654e4c70579f6fa0cf7%2FCleanShot_2026-06-22_at_16.25.34_2x.png&w=1920&q=75)

For more information on [realtime voice](https://vercel.com/docs/ai-gateway/modalities/realtime), [speech](https://vercel.com/docs/ai-gateway/modalities/text-to-speech), and [transcription](https://vercel.com/docs/ai-gateway/modalities/speech-to-text) models on AI Gateway, see the documentation. To view a list of all the supported [realtime voice](https://vercel.com/ai-gateway/models?capabilities=realtime), [speech](https://vercel.com/ai-gateway/models?capabilities=speech), and [transcription](https://vercel.com/ai-gateway/models?capabilities=transcription) models on AI Gateway, check the full list [here](https://vercel.com/ai-gateway/models).