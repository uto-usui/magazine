---
title: "Microsoft AI models are now available on AI Gateway"
source: "https://vercel.com/changelog/microsoft-ai-models-are-now-available-on-ai-gateway"
publishedDate: "2026-10-01"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

Vercel and Microsoft AI (MAI) have partnered to make MAI models available on AI Gateway. AI Gateway is one of a limited number of platforms offering access to MAI models.

MAI's focus on security and zero data retention (ZDR) align with Vercel's goal of giving AI Gateway users control over their data and transparency in how it is used for training.

## [Copy link to heading](#mai-models-on-ai-gateway)MAI models on AI Gateway

[MAI's latest audio models](https://vercel.com/ai-gateway/models/labs/microsoft) are now supported on AI Gateway. MAI-Voice-2.1 and MAI-Voice-2.1-Flash generate speech, while MAI-Transcribe-2 Streaming returns transcript updates as audio arrives.

-   **MAI-Voice-2.1** (`microsoft/mai-voice-2.1`) generates expressive speech in 23 languages and keeps a consistent speaker across longer passages. Use it for narration, audiobooks, podcasts, and lessons where delivery matters from start to finish.
    
-   **MAI-Voice-2.1-Flash** (`microsoft/mai-voice-2.1-flash`) brings the same multilingual speech generation to lower-latency interactions. It is suited to voice agents, assistants, and spoken replies that need to arrive quickly.
    
-   **MAI-Transcribe-2 Streaming** (`microsoft/mai-transcribe-2-streaming`) returns partial transcripts while audio is still arriving. Applications can show live captions or follow a conversation as it happens, without waiting for the full recording.
    

AI Gateway bills these models at their listed rates, with no platform fee or markup on inference.

## [Copy link to heading](#get-started)Get started

Use `generateSpeech` in AI SDK 7 with MAI-Voice-2.1-Flash to create a spoken response. The voice name selects Microsoft's Harper voice with the Flash model:

```
import { experimental_generateSpeech as generateSpeech } from 'ai';import { writeFile } from 'node:fs/promises';const result = await generateSpeech({  model: 'microsoft/mai-voice-2.1-flash',  text: 'Your order is ready for pickup.',  voice: 'en-US-Harper:MAI-Voice-2.1-Flash',  outputFormat: 'mp3',});await writeFile('response.mp3', result.audio.uint8Array);
```

For longer audio such as narration, use `microsoft/mai-voice-2.1`.

### [Copy link to heading](#transcribe-live-audio)Transcribe live audio

`streamTranscribe` takes a stream of audio chunks and returns transcript updates as the audio arrives. This example assumes `microphoneStream` is a `ReadableStream` of 16 kHz, 16-bit PCM audio:

```
import { experimental_streamTranscribe as streamTranscribe } from 'ai';const stream = streamTranscribe({  model: 'microsoft/mai-transcribe-2-streaming',  audio: microphoneStream,  inputAudioFormat: { type: 'audio/pcm', rate: 16000 },});for await (const part of stream.fullStream) {  if (part.type === 'transcript-partial') {    process.stdout.write(`\r${part.text}`);  }}console.log(await stream.text);
```

Partial transcripts can change as more audio arrives, so replace the displayed text when a new partial arrives.

## [Copy link to heading](#additional-resources)Additional resources

Explore [MAI-Voice-2.1-Flash](https://vercel.com/ai-gateway/models/mai-voice-2.1-flash) for speech generation and [MAI-Transcribe-2 Streaming](https://vercel.com/ai-gateway/models/mai-transcribe-2-streaming) for live transcription. See the [MAI model page](https://vercel.com/ai-gateway/models/labs/microsoft) for the full family, or follow the [speech quickstart](https://vercel.com/docs/ai-gateway/getting-started/speech) to get started.

AI Gateway provides one API for calling models, tracking usage and cost, and viewing request traces. It also supports routing, retries, and failover across available providers.