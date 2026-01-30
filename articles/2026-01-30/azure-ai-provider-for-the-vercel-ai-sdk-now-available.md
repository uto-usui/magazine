---
title: "Azure AI Provider for the Vercel AI SDK now available"
source: "https://vercel.com/changelog/azure-ai-provider-for-the-vercel-ai-sdk-now-available"
publishedDate: "2024-06-12"
category: "frontend"
feedName: "Vercel"
author: "Lars Grammel"
---

1 min read

Jun 12, 2024

The Vercel AI SDK now supports Azure AI services through [a new official provider](https://sdk.vercel.ai/providers/ai-sdk-providers/azure). To use the provider, install the relevant package:

```
pnpm install ai @ai-sdk/azure
```

You can then use the provider with all [AI SDK Core](https://sdk.vercel.ai/docs/ai-sdk-core/overview) methods. For example, here's how you can use it with `generateText`:

```
import { azure } from '@ai-sdk/azure';import { generateText } from 'ai';const { text } = await generateText({  model: azure('your-deployment-name'),  prompt: 'Write a vegetarian lasagna recipe for 4 people.',});
```

Using the Azure provider with the Vercel AI SDK

For more information, [please see the documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/azure).