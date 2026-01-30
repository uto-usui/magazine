---
title: "Introducing the Vercel AI SDK"
source: "https://vercel.com/blog/introducing-the-vercel-ai-sdk"
publishedDate: "2023-06-15"
category: "frontend"
feedName: "Vercel"
author: "Jared Palmer"
---

2 min read

Jun 15, 2023

An interoperable, streaming-enabled, edge-ready software development kit for AI apps built with React and Svelte.

Over the past 6 months, AI companies like [Scale](https://scale.com/), [Jasper](https://www.jasper.ai/), [Perplexity](https://www.perplexity.ai/), [Runway](https://runwayml.com/), [Lexica](https://lexica.art/), and [Jenni](https://jenni.ai/) have launched with [Next.js](https://vercel.com/solutions/nextjs) and Vercel. Vercel helps accelerate your product development by enabling you to focus on creating value with your AI applications, rather than spending time building and maintaining infrastructure.

Today, we're launching new tools to improve the AI experience on Vercel.

-   **Vercel AI SDK:** Easily stream API responses from AI models
    
-   **Chat & Prompt Playground:** Explore models from [OpenAI](https://vercel.com/docs/integrations/openai), Hugging Face, and more
    

## [Link to heading](#the-vercel-ai-sdk)The Vercel AI SDK

The [Vercel AI SDK](https://sdk.vercel.ai/) is an [open-source](https://github.com/vercel-labs/ai) library designed to help developers build conversational, streaming, and chat user interfaces in JavaScript and TypeScript. The SDK supports React/Next.js, Svelte/SvelteKit, with support for Nuxt/Vue coming soon.

To install the SDK, enter the following command in your terminal:

```
npm install ai
```

You can also [view the source code on GitHub](https://github.com/vercel-labs/ai).

### [Link to heading](#built-in-llm-adapters)**Built-in LLM Adapters**

Choosing the right LLM for your application is crucial to building a great experience. Each has unique tradeoffs, and can be tuned in different ways to meet your requirements.

Vercel’s AI SDK embraces interoperability, and includes first-class support for [OpenAI](https://openai.com/), [LangChain](https://js.langchain.com/docs/), and [Hugging Face](https://huggingface.co/) Inference. This means that regardless of your preferred AI model provider, you can leverage the Vercel AI SDK to create cutting-edge streaming UI experiences.

```
import { OpenAIStream, StreamingTextResponse } from 'ai'import { Configuration, OpenAIApi } from 'openai-edge'// Create an OpenAI API client (that's edge friendly!)const config = new Configuration({  apiKey: process.env.OPENAI_API_KEY})const openai = new OpenAIApi(config)// IMPORTANT! Set the runtime to edgeexport const runtime = 'edge'export async function POST(req: Request) {  // Extract the `messages` from the body of the request  const { messages } = await req.json()  // Ask OpenAI for a streaming chat completion given the prompt  const response = await openai.createChatCompletion({    model: 'gpt-3.5-turbo',    stream: true,    messages  })  // Convert the response into a friendly text-stream  const stream = OpenAIStream(response)  // Respond with the stream  return new StreamingTextResponse(stream)}
```

### [Link to heading](#streaming-first-ui-helpers)**Streaming First UI Helpers**

The Vercel AI SDK includes React and Svelte hooks for data fetching and rendering streaming text responses. These hooks enable real-time, dynamic data representation in your application, offering an immersive and interactive experience to your users.

Building a rich chat or completion interface now just takes a few lines of code thanks to [`useChat`](https://sdk.vercel.ai/docs/api-reference/use-chat) and [`useCompletion`](https://sdk.vercel.ai/docs/api-reference/use-completion):

```
'use client'import { useChat } from 'ai/react'export default function Chat() {  const { messages, input, handleInputChange, handleSubmit } = useChat()  return (    <div>      {messages.map(m => (        <div key={m.id}>          {m.role}: {m.content}        </div>      ))}      <form onSubmit={handleSubmit}>        <label>          Say something...          <input            value={input}            onChange={handleInputChange}          />        </label>      </form>    </div>  )}
```

### [Link to heading](#stream-helpers-and-callbacks)**Stream Helpers and Callbacks**

We've also included callbacks for storing completed streaming responses to a database within the same request. This feature allows for efficient data management and streamlines the entire process of handling streaming text responses.

```
export async function POST(req: Request) {  // ... same as above  // Convert the response into a friendly text-stream  const stream = OpenAIStream(response, {    onStart: async () => {      // This callback is called when the stream starts      // You can use this to save the prompt to your database      await savePromptToDatabase(prompt)    },    onToken: async (token: string) => {      // This callback is called for each token in the stream      // You can use this to debug the stream or save the tokens to your database      console.log(token)    },    onCompletion: async (completion: string) => {      // This callback is called when the stream completes      // You can use this to save the final completion to your database      await saveCompletionToDatabase(completion)    }  })  // Respond with the stream  return new StreamingTextResponse(stream)}
```

### [Link to heading](#edge-&-serverless-ready)**Edge & Serverless ready**

Our SDK is integrated with Vercel products like Serverless and Edge Functions. You can deploy AI application that scale instantly, stream generated responses, and are cost effective.

﻿With [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure), you write application code in frameworks like Next.js and SvelteKit using the AI SDK, and Vercel converts this code into [global application infrastructure](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure).

## [Link to heading](#chat-&-prompt-playground)**Chat & Prompt Playground**

In late April, we launched an interactive online prompt playground [play.vercel.ai](http://play.vercel.ai/) with 20 open source and cloud LLMs.

The playground provides a valuable resource for developers to compare various language model results in real-time, tweak parameters, and quickly generate Next.js, Svelte, and Node.js code.

Today, we’ve added a **new chat interface** to the playground so you can simultaneously compare chat models side-by-side. We’ve also added code generation support for the Vercel AI SDK. You can now go from playground to chat app in just a few clicks.

![Comparing the results from OpenAI GPT-4, Anthropic Claude, and Hugging Face through the Vercel AI SDK Playground and chat interface.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5sQ3ZY1Qw6dUUb6IeeKxd4%2F5111d20671107e7660ddbce22aa2933e%2FCleanShot_2023-06-14_at_13.36.18_2x.png&w=1920&q=75)

Comparing the results from OpenAI GPT-4, Anthropic Claude, and Hugging Face through the Vercel AI SDK Playground and chat interface.

## [Link to heading](#what’s-next)What’s Next?

We'll be adding more [SDK examples](https://sdk.vercel.ai/) in the coming weeks, as well as new templates built entirely with the AI SDK. Further, as new best practices for building [AI](https://vercel.com/ai) applications emerge, we’ll lift them into the SDK based on your feedback.

[

**Apply to the AI Accelerator**

Apply to get access to over $850k in credits from Vercel and our AI partners.

Apply today



](https://vercel.com/ai-accelerator)