---
title: "xAI joins the Vercel Marketplace "
source: "https://vercel.com/changelog/xai-joins-the-vercel-marketplace"
publishedDate: "2025-03-20"
category: "frontend"
feedName: "Vercel"
author: "Hedi Zandi"
---

1 min read

Mar 20, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7LLjQvzTiCwUGT8ny775ZZ%2F40c84dd2e8605d76b701d3a53fc90c01%2FxAI_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3E6krTBqCzA5nl298eWIPg%2F19231391e8108bcdcb4f66034c824d76%2FxAI_-_Dark-1.png&w=1920&q=75)

xAI's Grok models are now available in the [Vercel Marketplace](https://vercel.com/marketplace/xai), making it easy to integrate conversational AI into your Vercel projects.

-   Get started with xAI's free plan—no additional signup through the Marketplace
    
-   Access Grok's large language models (LLMs) directly from your Vercel projects
    
-   Simplify authentication and API key management through automatically configured environment variables
    
-   Pay only for what you use with integrated billing through Vercel
    

To get started, you can use the [AI SDK xAI provider](https://vercel.com/docs/ai/xai#getting-started) in your project:

```
import { xai } from "@ai-sdk/xai";import { streamtext } from "ai";const result = streamText({  model: xai("grok-2-1212"),  prompt: "What is the meaning of life?",});for await (const textPart of result.textStream) {  process.stdout.write(textPart); // The answer is 42.}
```

Then, [install the xAI Marketplace Integration](https://vercel.com/marketplace/xai) with Vercel CLI (or [from the dashboard](https://vercel.com/marketplace/xai)):

```
vercel install xai
```

Once you've accepted the terms, you'll be able to use Grok models from within your project, with no additional steps necessary.

To help you get started, we've also made a [ready-to-deploy Next.js xAI starter template](https://vercel.com/new/clone?project-name=Vercel+x+xAI+Chatbot&repository-name=ai-sdk-starter-xai&repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fai-sdk-starter-xai&demo-title=Vercel+x+xAI+Chatbot&demo-url=https%3A%2F%2Fai-sdk-starter-xai.labs.vercel.dev%2F&demo-description=A+simple+chatbot+application+built+with+Next.js+that+uses+xAI+via+the+AI+SDK+and+the+Vercel+Marketplace&products=[{%22type%22:%22integration%22,%22protocol%22:%22ai%22,%22productSlug%22:%22grok%22,%22integrationSlug%22:%22xai%22}]). To learn more about xAI on Vercel, read our [announcement](https://vercel.com/blog/xai-and-vercel-partner-to-bring-zero-friction-ai-to-developers) and the [documentation](https://vercel.com/docs/ai/xai).