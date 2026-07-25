---
title: "AI Gateway now supports streaming transcription"
source: "https://vercel.com/changelog/ai-gateway-now-supports-streaming-transcription"
publishedDate: "2026-07-22"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

AI Gateway now supports [streaming transcription](https://vercel.com/ai-gateway/models?modality=audio:transcription&features=websockets). Previously, transcription required a complete audio file and returned the full transcript in a single response. Now you can stream audio in as it's captured and get transcript updates back as the model produces them, keeping latency low for uses like live captioning and voice input.

Streaming transcription is in beta and available through the [AI SDK](https://ai-sdk.dev/docs/ai-sdk-core/transcription#streaming-transcription)'s `streamTranscribe` function with any streaming-capable transcription model.

The example below streams raw PCM audio to `openai/gpt-realtime-whisper` and prints each transcript delta as it arrives. The result stream also carries partial and final transcripts:

```
import { experimental_streamTranscribe as streamTranscribe } from 'ai';const result = streamTranscribe({  model: 'openai/gpt-realtime-whisper',  audio: audioStream, // ReadableStream<Uint8Array | string>  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },});for await (const part of result.fullStream) {  if (part.type === 'transcript-delta') {    process.stdout.write(part.delta);  }}
```

The same code works across providers: swap the model string to use `xai/grok-stt` or any other [streaming-capable transcription model](https://vercel.com/ai-gateway/models?modality=audio:transcription&features=websockets).

Streaming transcription also makes it easy to add a voice mode to an agent. Stream the user's speech to a transcription model and pass the live text to your agent. The agent itself does not change: it still receives text, so this works with any text-based agent. For agents that speak back, pair it with speech generation, or use realtime voice for full two-way conversation.

For more information on streaming transcription on AI Gateway, see the [documentation](https://vercel.com/docs/ai-gateway/modalities/speech-to-text#streaming-transcription).