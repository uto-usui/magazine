---
title: "Gemini 3.8 text-to-speech models now available on AI Gateway"
source: "https://vercel.com/changelog/gemini-3-8-text-to-speech-models-now-available-on-ai-gateway"
publishedDate: "2026-09-23"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Gemini 3.8 Flash-Lite TTS](https://vercel.com/ai-gateway/models/gemini-3.8-flash-lite-tts) and [Gemini 3.8 Flash TTS](https://vercel.com/ai-gateway/models/gemini-3.8-flash-tts) from Google are now available on [AI Gateway](https://vercel.com/ai-gateway).

Both models take text and generate speech in more than 100 languages. They support long-form narration, control over delivery, and two-speaker dialogue.

-   `google/gemini-3.8-flash-lite-tts` is suited to high-volume speech generation, with controls for tone, pacing, and line-by-line delivery.
    
-   `google/gemini-3.8-flash-tts` adds voice and character design through natural-language prompts, including acting cues, accents, and conversational reactions.
    

```
import { experimental_generateSpeech as generateSpeech } from 'ai';import { writeFile } from 'node:fs/promises';const result = await generateSpeech({  model: 'google/gemini-3.8-flash-lite-tts',  text: 'Welcome to the audio edition.',  voice: 'Kore',  outputFormat: 'wav',});await writeFile('speech.wav', result.audio.uint8Array);
```

Generate and listen to speech in the [Flash-Lite TTS playground](https://vercel.com/ai-gateway/models/gemini-3.8-flash-lite-tts) or the [Flash TTS playground](https://vercel.com/ai-gateway/models/gemini-3.8-flash-tts). For setup instructions and more code examples, see the [speech quickstart](https://vercel.com/docs/ai-gateway/getting-started/speech) and [text-to-speech guide](https://vercel.com/docs/ai-gateway/modalities/text-to-speech).

AI Gateway provides one API for speech generation alongside your other models, with usage and cost tracking for each request. You can configure [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules) and [bring your own provider key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok).