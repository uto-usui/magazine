---
title: "xAI and Vercel partner to bring zero-friction AI to developers"
source: "https://vercel.com/blog/xai-and-vercel-partner-to-bring-zero-friction-ai-to-developers"
publishedDate: "2025-03-20"
category: "frontend"
feedName: "Vercel"
author: "Jared Palmer"
---

2 min read

Mar 20, 2025

Use xAI's Grok models across Vercel, the AI SDK, and v0

Vercel provides the tools and infrastructure to build AI-native web applications. We're partnering with [xAI](https://x.ai/) to bring their powerful Grok models directly to Vercel projects through the [Vercel Marketplace](https://vercel.com/marketplace/xai)—and soon [v0](https://v0.dev/)—with no additional signup required.

To help you get started, xAI is introducing a new free tier through Vercel to enable quick prototyping and experimentation. These Grok models now power our official [Next.js AI chatbot template](https://vercel.com/templates/next.js/nextjs-ai-chatbot) with the [AI SDK](https://sdk.vercel.ai/).

This is a part of our ongoing effort to make using AI frictionless on Vercel.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7LLjQvzTiCwUGT8ny775ZZ%2F40c84dd2e8605d76b701d3a53fc90c01%2FxAI_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3E6krTBqCzA5nl298eWIPg%2F19231391e8108bcdcb4f66034c824d76%2FxAI_-_Dark-1.png&w=1920&q=75)

## [Link to heading](#the-vercel-marketplace)The Vercel Marketplace

With [Grok models now available](https://vercel.com/marketplace/xai) from the Vercel Marketplace, developers can build with xAI’s conversational models quickly.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3ZrM7WxQeowngQhTmLkMEl%2F4a522b1ae1b687c5599876979b60381d%2FxAI_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3A5WPiLZeNM4iGGRtWiPdm%2F50dd45f879f291a04eb2867bf3562b46%2FxAI_-_Dark.png&w=1920&q=75)

-   Get started with xAI's free plan—no additional signup through the Marketplace
    
-   Access Grok's large language models (LLMs) directly from your Vercel projects
    
-   Simplify authentication and API key management through automatically configured environment variables
    
-   Pay only for what you use with integrated billing through Vercel
    

If you're already working in a Vercel project, you can also install xAI through the Marketplace from the Vercel CLI:

```
vercel install xai
```

[

**Explore AI on the Vercel Marketplace**

Play, test, and integrate with a wide range of AI model types, sizes, and specializations in the Vercel Marketplace.

Get started



](https://vercel.com/marketplace?category=ai)

## [Link to heading](#more-ways-to-get-started-with-ai)More ways to get started with AI

We've streamlined AI experimentation and development through the AI SDK, ready-to-use templates, and our model playground.

### [Link to heading](#the-next.js-ai-chatbot,-now-powered-by-xai)The Next.js AI Chatbot, now powered by xAI

The [Next.js AI Chatbot](https://github.com/vercel/ai-chatbot) is a free open-source chatbot template built by the creators of Next.js, AI SDK, and shadcn/ui. It features tool calling, retrieval, code execution, artifacts, and genUI examples—the UI infrastructure you need to build your own ChatGPT or [grok.com](http://grok.com/).

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3VUtX3HkcC4W5NRb6T1lnB%2Fdb61dad23a3a53d1e0425a029c5c5b6f%2FScreenshot_2024-11-05_at_8.04.13_PM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fof6pHepNv70icp29mfQS6%2Fd5224de941da931f8ad9f56c8091a8fe%2FCleanShot_2024-11-07_at_16.20.34_2x.png&w=1920&q=75)

### [Link to heading](#ai-sdk)AI SDK

The [AI SDK](https://sdk.vercel.ai/docs) is a free open-source library that gives you the tools you need to build AI-powered products and agents. It offers a unified API for integrating almost any language model, so you can experiment, test, and change models and providers with just one or two lines of code.

```
import { xai } from "@ai-sdk/xai";import { streamtext } from "ai";const result = streamText({  model: xai("grok-2-1212"),  prompt: "What is the meaning of life?",});for await (const textPart of result.textStream) {  process.stdout.write(textPart); // The answer is 42.}
```

The AI SDK also has a [playground](https://sdk.vercel.ai/playground) where you can compare output from different models and providers. xAI is the default provider and you can compare xAI’s Grok models against others from Anthropic, Google, OpenAI, and many more.

## [Link to heading](#a-peek-at-what's-next)A peek at what's next

When you’re vibe coding with [v0](https://v0.dev/), you'll soon be able to leverage the xAI Vercel Marketplace integration right in v0's chat interface (which is currently possible with [Vercel Marketplace storage integrations](https://vercel.com/changelog/vercel-marketplace-integrations-now-available-in-v0)).

Soon, we'll be adding more AI integrations in the Vercel Marketplace. If you're a service provider interested in joining, you can reach out to us at integrations@vercel.com.

### [Link to heading](#get-started-today)Get started today

With xAI now in the Vercel Marketplace, developers have more flexibility to build AI-powered applications with industry-leading models. Whether you're integrating Grok into your chatbot, experimenting with new AI workflows and agents, or scaling existing workloads, Vercel makes it easy to start shipping.

[

**Explore AI on Vercel**

Vercel offers everything you need to get started with AI.

Start building



](https://vercel.com/ai)