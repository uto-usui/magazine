---
title: "Gemini 3.5 Transcribe now available on AI Gateway"
source: "https://vercel.com/changelog/gemini-3-5-transcribe-now-available-on-ai-gateway"
publishedDate: "2026-08-26"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[Gemini 3.5 Transcribe](https://vercel.com/ai-gateway/models/gemini-3.5-transcribe-live) from Google is now available on AI Gateway. It takes audio and returns text, in two variants:

-   `google/gemini-3.5-transcribe` transcribes a complete recording in a single request.
    
-   `google/gemini-3.5-transcribe-live` transcribes audio over a WebSocket, returning a transcript that updates while the recording is still going.
    

The model detects the language on its own, covers 85+, and follows a speaker who switches language partway through. You can also supply custom vocabulary so it recognizes names, jargon, and spellings.

Streaming transcription is new in AI SDK V7:

```
npm install ai@latest @ai-sdk/gateway@latest
```

## [Copy link to heading](#live-transcription)Live transcription

`streamTranscribe` opens the socket and takes a `ReadableStream` of raw audio chunks, so you can pass a microphone straight through. Tell it the format you are sending with `inputAudioFormat`:

```
import { gateway } from '@ai-sdk/gateway';import { experimental_streamTranscribe as streamTranscribe } from 'ai';const stream = streamTranscribe({  model: gateway.transcription('google/gemini-3.5-transcribe-live'),  audio: microphoneStream, // ReadableStream of 16 kHz 16-bit PCM chunks  inputAudioFormat: { type: 'audio/pcm', rate: 16000 },  providerOptions: {    google: { mode: 'SMART' }, // or 'VERBATIM' (default)  },});
```

## [Copy link to heading](#complete-recordings)Complete recordings

For audio you already have on disk, `transcribe` sends it in one request and returns the text:

```
import { experimental_transcribe as transcribe } from 'ai';import { readFile } from 'node:fs/promises';const result = await transcribe({  model: 'google/gemini-3.5-transcribe',  audio: await readFile('meeting.mp3'),});console.log(result.text);
```

You can also try the model without writing any code. Open [Gemini 3.5 Transcribe Live](https://vercel.com/ai-gateway/models/gemini-3.5-transcribe-live) and send audio to read the transcript in the browser.

AI Gateway provides a unified API for calling models, tracking usage and cost, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all transcription models](https://vercel.com/ai-gateway/models?type=transcription) available on AI Gateway, or start from the [speech quickstart](https://vercel.com/docs/ai-gateway/getting-started/speech).