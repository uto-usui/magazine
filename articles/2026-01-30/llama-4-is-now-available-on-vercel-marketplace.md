---
title: "Llama 4 is now available on Vercel Marketplace"
source: "https://vercel.com/changelog/llama-4-is-now-available-on-vercel-marketplace"
publishedDate: "2025-04-05"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 5, 2025

Meta’s latest and most powerful [Llama 4](https://www.llama.com/docs/model-cards-and-prompt-formats/llama4_omni/) models are now available through the Vercel Marketplace via [Groq](https://vercel.com/marketplace/groq).

To get started for free, [install the Groq integration](https://vercel.com/marketplace/groq) in the Vercel dashboard or add Groq to your existing projects with the Vercel CLI:

```
vercel install groq
```

You can then use the [AI SDK Groq provider](https://vercel.com/docs/ai/groq#getting-started) with Lama 4:

```
import { groq } from '@ai-sdk/groq';import { streamText } from 'ai';import fs from 'fs'const result = streamText({  model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),  messages: [    {      role: 'user',      content: [        { type: 'text', text: 'Describe the image in detail.' },        { type: 'image', image: fs.readFileSync('./data/llama.png') },      ],    },  ],});for await (const textPart of result.textStream) {  process.stdout.write(textPart);}
```

For a full demo, check out the [official Groq chatbot template](https://vercel.com/templates/next.js/vercel-x-groq-chatbot) (which now uses Llama 4) or compare Llama 4 against other models side-by-side on our [AI SDK Playground](https://sdk.vercel.ai/playground). To learn more, visit [our AI documentation](https://vercel.com/docs/ai/groq).