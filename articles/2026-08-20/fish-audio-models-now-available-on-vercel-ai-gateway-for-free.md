---
title: "Fish Audio models now available on Vercel AI Gateway for free"
source: "https://vercel.com/changelog/fish-audio-models-now-available-on-ai-gateway-for-free"
publishedDate: "2026-08-19"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

[Fish Audio](https://vercel.com/ai-gateway/models/providers/fish-audio)'s audio models are now available on AI Gateway. To celebrate the launch, every [Fish Audio](https://ai-sdk.dev/providers/ai-sdk-providers/fish-audio#fish-audio-provider) model is free on AI Gateway for the next 30 days, through September 18.

Capability

Regular

Through September 18

Text-to-speech

$15.00 per million characters

Free

Speech-to-text

$0.36 per hour of audio

Free

Four models from Fish Audio are available, including their latest text-to-speech model:

-   `fish-audio/s2.1-pro` (text-to-speech): Built for low-latency streaming; clones a voice from a reference recording.
    
-   `fish-audio/transcribe-1` (transcription): Returns the text along with the duration of the audio and timestamped segments, down to individual words.
    
-   `fish-audio/s2-pro` (text-to-speech): Covers around eighty languages and takes inline tags, plain-language directions written into the text itself, so you can change how a single word or phrase is delivered instead of setting one style for the whole request.
    
-   `fish-audio/s1` (text-to-speech): Reads text that can carry markers for emotion, tone, and sound effects.
    

**How to use models during the offer period**

-   Using the standard model name (i.e., `fish-audio/s2.1-pro`) is free, but will automatically begin billing when the offer period ends.
    
-   To ensure you aren't billed after the free period, add the `-free` suffix to the standard name, and the model will stop serving when the offer ends (i.e., `fish-audio/s2.1-pro-free`).
    

Speech and transcription ship in the current [AI SDK](https://ai-sdk.dev/providers/ai-sdk-providers/fish-audio#fish-audio-provider) 7 release.

```
npm install ai@latest @ai-sdk/gateway@latest
```

## [Copy link to heading](#text-to-speech)Text-to-speech

Generate spoken audio from text with `generateSpeech` and write the result:

```
import { experimental_generateSpeech as generateSpeech } from 'ai';import { writeFile } from 'node:fs/promises';const result = await generateSpeech({  model: 'fish-audio/s2.1-pro',  text: 'How are you doing today?',});await writeFile('speech.mp3', result.audio.uint8Array);
```

## [Copy link to heading](#speech-to-text)Speech-to-text

Transcribe recordings into text with `transcribe`. The audio can be a buffer, a base64 string, or a URL:

```
import { experimental_transcribe as transcribe } from 'ai';import { readFile } from 'node:fs/promises';const result = await transcribe({  model: 'fish-audio/transcribe-1',  audio: await readFile('audio.mp3'),});console.log(result.text);console.log(result.segments);
```

Each segment carries the text and its start and end time in seconds, down to individual words.

## [Copy link to heading](#playground)Playground

You can also try the Fish Audio models without writing any code. Open the [models list](https://vercel.com/ai-gateway/models/providers/fish-audio), click into a model, and send text or audio to hear or read the result in your browser.

For a full overview of how to utilize audio models, refer to the [speech quickstart](https://vercel.com/docs/ai-gateway/getting-started/speech). For more detail on Fish Audio, refer to the [AI SDK docs](https://ai-sdk.dev/providers/ai-sdk-providers/fish-audio#fish-audio-provider) for the provider.