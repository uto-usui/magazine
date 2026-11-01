---
title: "ElevenLabs on AI Gateway"
source: "https://vercel.com/blog/elevenlabs-on-ai-gateway"
publishedDate: "2026-10-27"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

Vercel and [ElevenLabs](https://vercel.com/ai-gateway/models/providers/elevenlabs) are partnering to bring 14 ElevenLabs models to [AI Gateway](https://vercel.com/ai-gateway). To celebrate the launch, all ElevenLabs models are 50% off on AI Gateway for the first 14 days, through November 9th.

AI Gateway supports six different types of ElevenLabs audio models:

-   **Speech to text:** Transcribe recordings or caption live audio as people speak.
    
-   **Streaming text to speech:** Start playing audio while a language model is still writing its reply, so users don't have to wait for the full answer.
    
-   **Realtime voice agents:** Let users talk to your app and listen to it respond out loud in a single live session. Useful for support lines, tutors, and in-app assistants.
    
-   **Music:** Describe a track in plain text and get back a finished song or instrumental at the length you need.
    
-   **Sound effects:** Generate game and interface sounds, or ambience that loops cleanly, from a short description.
    
-   **Multi-voice dialogue:** Voice a whole conversation in one call, with a different voice for each speaker.
    

All of these audio models are accessible through a single gateway API key. Your app or agent can transcribe what a user says, reason over it with your choice of hundreds of models, then answer in an ElevenLabs voice. You can also create soundtracks with generated music and sound effects.

Every request lands in the same usage, cost, and trace views as your other AI Gateway traffic.

## [Copy link to heading](#model-types)Model types

AI Gateway gives you access to 14 ElevenLabs models, spanning speech to text, realtime voice, and music.

**Model type**

**Model IDs**

Speech to text

`elevenlabs/scribe-v2`, `elevenlabs/scribe-v2-realtime`

Streaming text to speech

`elevenlabs/eleven-flash-v2.5`, `elevenlabs/eleven-flash-v2`, `elevenlabs/eleven-multilingual-v2`, `elevenlabs/eleven-v3-conversational`

Realtime voice agents

`elevenlabs/eleven-realtime-v1-max`, `elevenlabs/eleven-realtime-v1-mini`

Music

`elevenlabs/music-v2.5`, `elevenlabs/music-v2`

Sound effects

`elevenlabs/sound-effects-v2`

Multi-voice dialogue

`elevenlabs/eleven-v4`, `elevenlabs/eleven-v4-turbo`, `elevenlabs/eleven-v3`

## [Copy link to heading](#speech-and-transcription)Speech and transcription

[Scribe v2 Realtime](https://vercel.com/ai-gateway/models/scribe-v2-realtime) turns a user's speech into text while they are still talking. A language model of your choice then writes the answer. [Eleven Flash v2.5](https://vercel.com/ai-gateway/models/eleven-flash-v2.5), a low-latency ElevenLabs voice model, reads that answer aloud as it streams in, so the user hears the reply begin before the model finishes writing it.

Because each step is its own model, you can swap the transcription, language, or speech model without touching the rest of the pipeline.

In the example below, a user asks whether they’ll make a connecting flight. The text model combines flight status and gate distance to answer, then the speech model delivers the response.

```
import {  experimental_streamSpeech as streamSpeech,  experimental_streamTranscribe as streamTranscribe,  streamText,} from 'ai';const heard = streamTranscribe({  model: 'elevenlabs/scribe-v2-realtime',  audio: microphoneStream,  inputAudioFormat: { type: 'audio/pcm', rate: 16000 },});const { textStream } = streamText({  model: 'anthropic/claude-haiku-5.5',  prompt: await heard.text,});const { audioStream } = streamSpeech({  model: 'elevenlabs/eleven-flash-v2.5',  text: textStream,  voice: 'hpp4J3VqNfWAUOO0d1Us',});
```

The code transcribes a 16 kHz microphone stream, sends the finished transcript to a language model, and pipes the model’s text straight into speech.

## [Copy link to heading](#realtime-voice-agents)Realtime voice agents

[Eleven Realtime v1 Max](https://vercel.com/ai-gateway/models/eleven-realtime-v1-max) and [Eleven Realtime v1 Mini](https://vercel.com/ai-gateway/models/eleven-realtime-v1-mini) run the whole spoken conversation in one model, which suits conversations where users expect natural back-and-forth, like a support call or an in-app assistant. Both models take the user's audio in and speak a reply back over a single WebSocket session, so there's no separate transcription or speech step to wire up.

Eleven Realtime hears “Can I change the delivery address for my order?” and responds “I can help with that. What’s your order number?” over one WebSocket session.

```
import { gateway } from 'ai';const { token, url } = await gateway.experimental_realtime.getToken({  model: 'elevenlabs/eleven-realtime-v1-max',});
```

The browser opens the WebSocket session itself, so the server’s only job is to mint a short-lived token for your chosen model, which keeps your API key off the client.

In the browser, connect with the `useRealtime` hook from `@ai-sdk/react`, which handles the WebSocket connection, microphone capture, and audio playback. In the hook's `sessionConfig`, set an ElevenLabs voice ID and `turnDetection: { type: 'semantic-vad' }`. These models support semantic voice activity detection (VAD) to decide when the user has finished speaking, but they don't support `server-vad`. The [realtime guide](https://vercel.com/docs/ai-gateway/modalities/realtime#browser-voice-agent) walks through the full browser setup.

## [Copy link to heading](#music-and-sound-effects)Music and sound effects

[Music v2.5](https://vercel.com/ai-gateway/models/music-v2.5) and [Music v2](https://vercel.com/ai-gateway/models/music-v2) compose original music from a text description. Name a genre, a mood, or the instruments you want, and the model returns a finished track at the length you ask for, with or without vocals. For more control, you can lay out a song section by section and give each section its own style and length.

[Sound Effects v2](https://vercel.com/ai-gateway/models/sound-effects-v2) works the same way for shorter sounds, such as footsteps, a door slamming, or rain that loops under a game level.

All three models use `generateSpeech`, with `text` describing the sound you want instead of words to read aloud. This example requests a 30-second track:

```
import { generateSpeech } from 'ai';const { audio } = await generateSpeech({  model: 'elevenlabs/music-v2.5',  text: 'A mellow lo-fi beat with soft piano',  providerOptions: { elevenlabs: { musicLengthMs: 30000 } },});
```

## [Copy link to heading](#multi-voice-dialogue)Multi-voice dialogue

[Eleven v4](https://vercel.com/ai-gateway/models/eleven-v4), [Eleven v4 Turbo](https://vercel.com/ai-gateway/models/eleven-v4-turbo), and [Eleven v3](https://vercel.com/ai-gateway/models/eleven-v3) perform a script with several speakers in a single request. You assign a voice to each line, and each change of voice starts a new turn. A two-host podcast or a scene with a full cast comes back as one continuous recording, so there are no separate clips to stitch together.

```
import { experimental_streamSpeech as streamSpeech } from 'ai';const host = 'hpp4J3VqNfWAUOO0d1Us';const guest = 'CwhRBWXzGAHq8TQ4Fs17';const { audioStream } = streamSpeech({  model: 'elevenlabs/eleven-v4',  text: [    { type: 'text', text: 'Did the deploy go out?', voice: host },    { type: 'text', text: 'It shipped an hour ago.', voice: guest },  ],  providerOptions: { elevenlabs: { dialogue: { voices: [host, guest] } } },});
```

Each voice is an ElevenLabs voice ID. Parts can also stream in from a language model writing the script.

## [Copy link to heading](#about-ai-gateway)About AI Gateway

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and doesn't charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

The [AI Gateway audio docs](https://vercel.com/docs/ai-gateway/modalities/text-to-speech#generate-speech-with-elevenlabs) have examples across the ElevenLabs models. Browse [all audio models](https://vercel.com/ai-gateway/models) on AI Gateway, and try ElevenLabs at 50% off until November 9th.