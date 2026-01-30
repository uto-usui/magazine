---
title: "Cohere Provider for the Vercel AI SDK now available"
source: "https://vercel.com/changelog/cohere-provider-for-the-vercel-ai-sdk-now-available"
publishedDate: "2024-06-17"
category: "frontend"
feedName: "Vercel"
author: "Lars Grammel"
---

1 min read

Jun 17, 2024

The Vercel AI SDK now supports Cohere through [a new official provider](https://sdk.vercel.ai/providers/ai-sdk-providers/cohere). To use the provider, install the relevant package:

```
pnpm install ai @ai-sdk/cohere
```

You can then use the provider with all [AI SDK Core](https://sdk.vercel.ai/docs/ai-sdk-core/overview) methods. For example, here's how you can use it with `generateText`:

```
import { cohere } from '@ai-sdk/cohere';import { generateText } from 'ai';const { text } = await generateText({  model: cohere('command-r-plus'),  prompt: 'Write a vegetarian lasagna recipe for 4 people.',});
```

Using the Cohere provider with the Vercel AI SDK

For more information, [please see the documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/cohere).