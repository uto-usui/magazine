---
title: "Introducing AI Integrations on Vercel"
source: "https://vercel.com/blog/ai-integrations"
publishedDate: "2024-02-08"
category: "frontend"
feedName: "Vercel"
author: "Jared Palmer"
---

2 min read

Feb 8, 2024

Incorporate AI models and services from industry-leading providers into your Vercel projects with just a few clicks.

Today, we’re launching **nine new AI integrations for Vercel** from leading AI companies.

We’ve also created a new **model playground** where you can try dozens of models instantly to generate text, images, audio, and more right in your dashboard.

![Explore and play with the popular AI models from various providers.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7Co0WqvKO3BRskNVnEifvI%2Fef9462bdcff338044afde480bbf249aa%2FScreenshot_2024-02-07_at_12.57.33.png&w=1920&q=75)![Explore and play with the popular AI models from various providers.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5PUf26SDadfyE3PNtXQXB2%2F2a4acdfd87b22b0516b24c448577b169%2FScreenshot_2024-02-07_at_12.57.50.png&w=1920&q=75)

Explore and play with the popular AI models from various providers.

## [Link to heading](#building-the-future-with-ai)**Building the future with AI**

Vercel is the product infrastructure for [AI applications](https://vercel.com/ai).

From [chatbots](https://vercel.com/templates/next.js/nextjs-ai-chatbot) that augment customer service flows, to recommendation systems with semantic search, [Retrieval Augmented Generation (RAG)](https://vercel.com/guides/retrieval-augmented-generation), and generative image services—companies can build better product experiences faster than ever before with AI.

We've partnered with our first cohort of AI providers to speed up your product development process.

![Our first cohort of AI Integration partners, now available in the AI tab.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4mcedk6Ib2HFe9sBP36qgU%2F784a7c67b683d357fc03c890f2fc4bcd%2FFrame_2.png&w=1920&q=75)![Our first cohort of AI Integration partners, now available in the AI tab.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4ZCXUCovgd9qmA4sIAAbhC%2F4a4f4559b7fed81f7ee6ac8ef5c67d22%2FFrame_1.png&w=1920&q=75)

Our first cohort of AI Integration partners, now available in the AI tab.

_**"We're excited to partner with Vercel on bringing the latest state of the art open source machine learning models to more AI Engineers. We believe that AI should be easy to run and integrate into any web application."**_ — Replicate Software Engineer, Charlie Holtz

## [Link to heading](#connecting-to-models-with-the-ai-sdk)Connecting to models with the AI SDK

After you've integrated with an AI provider, you can then quickly get started using the model in your frontend application using the [Vercel AI SDK](https://sdk.vercel.ai/docs). This SDK is like an ORM for any AI model you want to use, whether it's for text, images, and soon audio.

For example, if you want to use the Perplexity API with Next.js, it only takes the following code to stream back responses to your frontend:

app/api/chat/route.ts

```
import { OpenAIStream, StreamingTextResponse } from 'ai';import OpenAI from 'openai';const perplexity = new OpenAI({  apiKey: process.env.PERPLEXITY_API_KEY || '',  baseUrl: 'https://api.perplexity.ai',});export async function POST(req: Request) {  const { messages } = await req.json();  // Generated a chat completion based on the prompt  const response = await perplexity.chat.completions.create({    model: 'pplx-7b-chat',    stream: true,    messages: messages,  });  // Convert the response into a friendly text-stream  const stream = OpenAIStream(response);  // Respond with the stream  return new StreamingTextResponse(stream);}
```

Using the Perplexity API with the Next.js App Router.

[Learn more about the AI SDK](https://sdk.vercel.ai/docs) or follow the instructions after connecting to your provider of choice.

### [Link to heading](#get-started-today)**Get Started Today**

The future of application development is intelligent, intuitive, and immersive. With Vercel's AI Integrations, you're not just building applications; you're crafting experiences that anticipate and adapt to user needs in real-time.

If you’re an AI company or developer keen to join our AI Integrations, you can [create your own integration](https://vercel.com/docs/integrations/create-integration).

Check out the new tab in your Vercel dashboard and [add AI to your app today](https://vercel.com/docs/integrations/ai).

[

**Start building today**

Explore, preview, and seamlessly integrate AI models and databases into your Vercel projects.

Get Started



](https://vercel.com/docs/integrations/ai)