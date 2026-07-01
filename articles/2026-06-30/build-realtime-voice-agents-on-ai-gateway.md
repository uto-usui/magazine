---
title: "Build realtime voice agents on AI Gateway"
source: "https://vercel.com/blog/realtime-voice-agents-on-ai-gateway"
publishedDate: "2026-06-29"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[AI Gateway](https://vercel.com/ai-gateway) now supports audio/voice. You can add realtime voice, text to speech, and speech to text with the same calls you already use for text, image, and video, routed through AI Gateway alongside every other modality.

Audio launches with models from [OpenAI](https://vercel.com/ai-gateway/models?providers=openai&capabilities=realtime) and [xAI](https://vercel.com/ai-gateway/models?providers=xai&capabilities=realtime). Each call gets the same provider routing, observability, spend controls, and bring-your-own-key support you already use for your other models.

These capabilities are in beta and available in [AI SDK](https://ai-sdk.dev/) 7.

**Capability**

**How it works**

**Use it for**

**Realtime voice**

Live audio in and out, for streaming, low-latency session

Two-way voice agents and live conversation

**Text to speech**

Text in, audio file out, single request

Voiceovers, spoken responses, audio versions of written content

**Speech to text**

Recorded audio in, text out, single request

Transcribing voice notes, call recordings

## [Link to heading](#getting-started)Getting started

Realtime, speech, and transcription model are supported on [AI SDK 7](https://ai-sdk.dev/docs/ai-sdk-core/realtime#realtime).

```
npm install ai @ai-sdk/react @ai-sdk/gateway
```

## [Link to heading](#realtime-voice-agents)Realtime voice agents

Realtime turns your app into something a user can hold a conversation with. When they speak, the model responds right away. Because it replies in the moment instead of waiting for a full turn, users can interrupt and talk over it the way they would with a person. It fits voice assistants, customer support agents, hands-free tools, and anywhere a user would rather talk than type.

What sets it apart from chaining models together is that a single realtime model hears audio and produces audio directly, instead of running a speech-to-text, then language model, then text-to-speech pipeline.

In the browser, the `useRealtime` hook manages the WebSocket connection, microphone capture, and audio playback.

The connection is authenticated with your AI Gateway credential, so you mint a short-lived token on the server and hand the browser only that token. Your API key never reaches the client. Add a route that mints the token:

```
import { gateway } from '@ai-sdk/gateway';export async function POST() {  const { token, url } = await gateway.experimental_realtime.getToken({    model: 'openai/gpt-realtime-2',  });  return Response.json({ token, url, tools: [] });}
```

Then connect from a client component:

```
'use client';import { experimental_useRealtime as useRealtime } from '@ai-sdk/react';import { gateway } from '@ai-sdk/gateway';import { useMemo } from 'react';export default function Page() {  const model = useMemo(    () => gateway.experimental_realtime('openai/gpt-realtime-2'),    [],  );  const { status, connect, startAudioCapture } = useRealtime({    model,    api: { token: '/api/realtime/token' },    sessionConfig: { voice: 'alloy', turnDetection: { type: 'server-vad' } },  });  // Call connect(), then startAudioCapture(stream) with a microphone MediaStream.}
```

The hook captures the microphone, streams the audio to the model through AI Gateway, and plays back the spoken reply. Outside the browser, you can drive the session over a WebSocket yourself with `getWebSocketConfig`, `serializeClientEvent`, and `parseServerEvent`. See the [realtime reference](https://vercel.com/docs/ai-gateway/modalities/realtime) for that path.

### [Link to heading](#inside-a-realtime-session)Inside a realtime session

A realtime session works differently from a normal model call:

-   **Turn-taking and interruptions.** `turnDetection: { type: 'server-vad' }` lets the server decide when the user has stopped speaking, and lets the user talk over the model to cut a reply short (barge-in), with no client-side silence timers.
    
-   **Tools mid-conversation.** The model emits a tool call mid-reply, you run it and return the result as a client event, and it folds the answer into what it says next without ending the turn.
    

## [Link to heading](#text-to-speech)Text to speech

Generate spoken audio from text with `generateSpeech`. Pass a voice and an output format, then write the result to a file:

```
import { generateSpeech } from 'ai';import { writeFile } from 'node:fs/promises';const result = await generateSpeech({  model: 'xai/grok-tts',  text: 'Thanks for trying out AI Gateway.',  voice: 'eve',  outputFormat: 'mp3',});await writeFile('speech.mp3', result.audio.uint8Array);
```

## [Link to heading](#speech-to-text-\(transcription\))Speech to text (transcription)

Transcribe recordings into text with `transcribe`. The audio can be a buffer, a base64 string, or a URL:

```
import { transcribe } from 'ai';import { readFile } from 'node:fs/promises';const result = await transcribe({  model: 'openai/whisper-1',  audio: await readFile('audio.mp3'),});console.log(result.text);
```

Speech and transcription are complementary, so they compose. You can generate audio with one model and read it back with the other, which is a quick way to check both ends of an audio pipeline.

## [Link to heading](#playground)Playground

You can also try audio models without writing any code. Open the [models page](https://vercel.com/ai-gateway/models), click into a model, and interact with it right in the browser. Talk to a realtime model to hold a voice conversation, or send text or audio to a speech or transcription model and read or play back the result.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1eLPtddrIxiuNS8i9LeSmn%2F2ebed79874661d6ff4ab1f23a84f74df%2FCleanShot_2026-06-22_at_16.26.44_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F56X6kYLKVr6suwIPVlTTRn%2Fcc629586c457a654e4c70579f6fa0cf7%2FCleanShot_2026-06-22_at_16.25.34_2x.png&w=1920&q=75)

## [Link to heading](#routing-audio-through-ai-gateway)Routing audio through AI Gateway

Audio calls behave like every other model call on AI Gateway. You use one API key across [providers](https://vercel.com/docs/ai-gateway/getting-started), see requests and usage in [observability](https://vercel.com/docs/ai-gateway/observability-and-spend/observability), apply the same [budgets and spend limits](https://vercel.com/docs/ai-gateway/observability-and-spend/api-key-budgets), and [bring your own provider keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) when you need to. Adding speech to an app that already uses AI Gateway for text/images/videos can now all be done in the same place.

## [Link to heading](#more-information)More information