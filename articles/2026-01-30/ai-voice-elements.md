---
title: "AI Voice Elements"
source: "https://vercel.com/changelog/ai-voice-elements"
publishedDate: "2026-01-14"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

2 min read

Jan 14, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1o6ZpsMGJwI37ugXob9qAh%2F827dddb253b78fd9ee1f90a92ba9f9ff%2FFrame_10.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FP2fdUsJ0YfPGpxuiJT5cH%2F057b90583848bd208aa7897316a63bdf%2FFrame_11.png&w=1920&q=75)

Today we're releasing a brand new set of components for AI Elements designed to work with the [Transcription](https://ai-sdk.dev/docs/ai-sdk-core/transcription) and [Speech](https://ai-sdk.dev/docs/ai-sdk-core/speech) functions of the AI SDK, helping you build the next generation of voice agents, transcription services and apps powered by natural language.

## [Link to heading](#persona)Persona

The `Persona` component displays an animated AI visual that responds to different conversational states. Built with Rive WebGL2, it provides smooth, high-performance animations for various AI interaction states including idle, listening, thinking, speaking, and asleep. The component supports multiple visual variants to match different design aesthetics.

```
npx ai-elements@latest add persona
```

## [Link to heading](#speech-input)Speech Input

The `SpeechInput` component provides an easy-to-use interface for capturing voice input in your application. It uses the Web Speech API for real-time transcription in supported browsers (Chrome, Edge), and falls back to MediaRecorder with an external transcription service for browsers that don't support Web Speech API (Firefox, Safari).

```
npx ai-elements@latest add speech-input
```

## [Link to heading](#transcription)Transcription

The `Transcription` component provides a flexible render props interface for displaying audio transcripts with synchronized playback. It automatically highlights the current segment based on playback time and supports click-to-seek functionality for interactive navigation.

```
npx ai-elements@latest add transcription
```

## [Link to heading](#audio-player)Audio Player

The `AudioPlayer` component provides a flexible and customizable audio playback interface built on top of media-chrome. It features a composable architecture that allows you to build audio experiences with custom controls, metadata display, and seamless integration with AI-generated audio content.

```
npx ai-elements@latest add audio-player
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3DYtqDPnqrPdVe4s0g1UQ%2F56c59f8e6c87ea9d63a4f34f8008f377%2FCleanShot_2026-01-16_at_12.20.59_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6msC0BxjgW4GmEm8DBa0TJ%2F7c6f79c1bba133aec7a56c79ce44b966%2FCleanShot_2026-01-16_at_12.21.10_2x.png&w=1920&q=75)

## [Link to heading](#microphone-selector)Microphone Selector

The `MicSelector` component provides a flexible and composable interface for selecting microphone input devices. Built on shadcn/ui's Command and Popover components, it features automatic device detection, permission handling, dynamic device list updates, and intelligent device name parsing.

```
npx ai-elements@latest add mic-selector
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4wHUvjMrUL6LAyGucZ3APZ%2Fc5b913528eecbf3a6b97961b6ffb680f%2FCleanShot_2026-01-16_at_12.22.59_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FMrxHYVw4uQJvYShoLI7io%2F5bc99c30a98022b871c23dccf82a7e38%2FCleanShot_2026-01-16_at_12.22.49_2x.png&w=1920&q=75)

## [Link to heading](#voice-selector)Voice Selector

The `VoiceSelector` component provides a flexible and composable interface for selecting AI voices. Built on shadcn/ui's Dialog and Command components, it features a searchable voice list with support for metadata display (gender, accent, age), grouping, and customizable layouts. The component includes a context provider for accessing voice selection state from any nested component.

```
npx ai-elements@latest add voice-selector
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6EpqdwRm43EVUoAWnV1tyv%2F8a5d231a21aedd67fe6d6a86b65fa4d8%2FCleanShot_2026-01-16_at_12.24.10_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FDVpXuGjrUK8nIkP2r6Yzu%2Fc754ba0bcd9e419ec912c387c0dfa6e3%2FCleanShot_2026-01-16_at_12.24.20_2x.png&w=1920&q=75)