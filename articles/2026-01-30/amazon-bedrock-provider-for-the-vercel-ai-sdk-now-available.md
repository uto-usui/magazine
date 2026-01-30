---
title: "Amazon Bedrock Provider for the Vercel AI SDK now available"
source: "https://vercel.com/changelog/amazon-bedrock-provider-for-the-vercel-ai-sdk-now-available"
publishedDate: "2024-06-21"
category: "frontend"
feedName: "Vercel"
author: "Lars Grammel"
---

1 min read

Jun 21, 2024

The Vercel AI SDK now supports Bedrock through [a new official provider](https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock). To use the provider, install the relevant package:

```
pnpm install ai @ai-sdk/amazon-bedrock
```

You can then use the provider with all [AI SDK Core](https://sdk.vercel.ai/docs/ai-sdk-core/overview) methods. For example, here's how you can use it with `generateText`:

```
import { bedrock } from '@ai-sdk/amazon-bedrock';import { generateText } from 'ai';const { text } = await generateText({  model: bedrock('meta.llama3-70b-instruct-v1:0'),  prompt: 'Write a vegetarian lasagna recipe for 4 people.',});
```

Using the Amazon Bedrock provider with the Vercel AI SDK

For more information, [please see the documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock).  
  
Thanks Jon Spaeth for contributing this feature!