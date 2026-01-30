---
title: "Vercel AI SDK 3.1: ModelFusion joins the team"
source: "https://vercel.com/blog/vercel-ai-sdk-3-1-modelfusion-joins-the-team"
publishedDate: "2024-05-02"
category: "frontend"
feedName: "Vercel"
author: "Jared Palmer"
---

3 min read

May 2, 2024

One step closer to a complete TypeScript framework for AI applications

Today, we're releasing the AI SDK 3.1, with [ModelFusion](https://modelfusion.dev/) joining our team.

This release brings us one step closer to delivering a **complete TypeScript framework for building AI applications**. It is organized into three main parts:

-   [**AI SDK Core**](https://sdk.vercel.ai/docs/ai-sdk-core): A unified API for generating text, structured objects, and tool calls with large language models (LLMs).
    
-   [**AI SDK UI**](https://sdk.vercel.ai/docs/ai-sdk-ui): A set of framework-agnostic hooks for quickly building chat interfaces.
    
-   [**AI SDK RSC**](https://sdk.vercel.ai/docs/ai-sdk-rsc): A library to stream generative user interfaces with React Server Components (RSC).
    

## [Link to heading](#ai-sdk-core---a-new-foundation-for-ai)AI SDK Core - A new foundation for AI

Drawing inspiration from projects like Drizzle and Prisma, you can imagine the AI SDK Core as an **ORM-style abstraction for LLMs**.

These new APIs provide a set of unified, low-level primitives to work with LLMs in any JavaScript environment—abstracting away the quirks between major model providers. This simplifies integrating LLMs down to just two decisions:

-   What kind of data do you want to generate? (text or a structured object)
    
-   How do you want it delivered? (incrementally streamed or all-at-once)
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4a4wdGykVwqy2ThssYuHNW%2F7bfa1cb573fcf83b81b73586f6886641%2Fai-sdk-diagram-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FZIzvfWiLn2sKaTzYGhgtK%2F55063ee6c55657e6d2fe4d6d2b15befe%2Fai-sdk-diagram-dark.png&w=1920&q=75)

You can use the AI SDK Core API with any provider that implements the [AI SDK Language Model Specification](https://sdk.vercel.ai/providers/community-providers/custom-providers). We worked with major AI model providers to iterate on the Vercel AI SDK Core, and already support:

-   **OpenAI**
    
-   **Anthropic**
    
-   **Google Gemini**
    
-   **Mistral**
    

The Language Model Specification is open-source. Anyone can now build AI provider integrations that work seamlessly with the Vercel AI SDK, and our amazing community has already started to add support for providers such as LLamaCpp.

### [Link to heading](#generating-text)Generating text

Here’s an example of generating text with AI SDK Core using the `mistral-large-latest` model from [Mistral AI](https://mistral.ai/).

```
import { generateText } from 'ai';import { mistral } from '@ai-sdk/mistral';‌﻿‍﻿﻿‌﻿‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍﻿‌‍﻿﻿‌‍﻿‍‌﻿‌‌‍‌‌‌‍﻿‍‌﻿‌‌‍‌‍‌﻿‌‌‌‍﻿﻿‌‍﻿﻿‌‍﻿‌‌﻿‌‌‍‌‍​‍​‍​﻿‍‍﻿‌‍​‌‌﻿‌‍‍‌﻿‌‍​‍‌‍﻿‌‍﻿﻿‌‍‌﻿﻿‌‍‌‌‌‍‌‌‍‍‌‌﻿‌﻿﻿﻿‌‍‌‌﻿﻿‌﻿‌‌‍﻿﻿‌‍﻿﻿‌﻿‍‌﻿‌‌‍‌‌‌‍​﻿‌‍‌‍‌﻿‌‍‌‌‌‍‍‍‌‌﻿﻿‌‌‌‍﻿‍‌﻿﻿‌‌‌‌﻿‌﻿‍‌‌﻿‌‍​‍‌‍‌﻿‌﻿﻿‌‌‍‌‌﻿﻿‌const { text } = await generateText({  model: mistral("‌﻿‍﻿﻿‌﻿‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍﻿‌‍﻿﻿‌‍﻿‍‌﻿‌‌‍‌‌‌‍﻿‍‌﻿‌‌‍‌‍‌﻿‌‌‌‍﻿﻿‌‍﻿﻿‌‍﻿‌‌﻿‌‌‍‌‍​‍​‍​﻿‍‍﻿‌‍​‌‌﻿‌‍‍‌﻿‌‍​‍‌‍﻿‌‍﻿﻿‌﻿‌﻿﻿﻿‌‍‌‌﻿﻿‌﻿‌‌‍﻿﻿‌‍﻿﻿‌﻿‍‌﻿‌‌‍‌‌‌‍​﻿‌‍‌‍‌﻿‌‍‌‌‌‍‍‍‌‌﻿﻿‌‌‌‍﻿‍‌﻿﻿‌‌‌‌﻿‌﻿‌﻿﻿‌‌‍‌‌﻿﻿‌mistral-large-latest‌﻿‍﻿﻿‌﻿‌‌‍‌﻿‌‍‍‌﻿﻿‌‌‌‍﻿‍‌﻿﻿‌‌‌‌﻿‌﻿‍‌‌﻿‌‍​‍‌‍‌﻿‌﻿﻿‌‌‍‌‌﻿﻿‌"),  prompt: "Generate a lasangna recipe.",});﻿‍﻿﻿‌﻿‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍﻿‌‍﻿﻿‌‍﻿‍‌﻿‌‌‍‌‌‌‍﻿‍‌﻿‌‌‍‌‍‌﻿‌‌‌‍﻿﻿‌‍﻿﻿‌‍﻿‌‌﻿‌‌‍‌‍​‍​‍​﻿‍‍﻿‌‍​‌‌﻿‌‍‍‌﻿‌‍​‍‌‍﻿‌‍﻿﻿‌‍‌﻿﻿‌‍‌‌‌‍‌‌‍‍‌‌﻿‌﻿﻿﻿‌‍‌‌﻿﻿‌﻿‌‌‍﻿﻿‌‍﻿﻿‌﻿‍‌﻿‌‌‍‌‌‌‍​﻿‌‍‌‍‌﻿‌‍‌‌‌‍‍‍‌‌﻿﻿‌‌‌‍﻿‍‌﻿﻿‌‌‌‌﻿‌﻿‍‌‌﻿‌‍​‍‌‍‌﻿‌﻿﻿‌‌‍‌‌﻿﻿‌
```

If you want to switch out the model for OpenAI’s `gpt-4-turbo`, you can do so by changing two lines of code.

```
import { generateText } from 'ai';import { openai } from '@ai-sdk/openai';const { text } = await generateText({  model: openai("gpt-4-turbo"),  prompt: "Generate a lasagna recipe.",});‌﻿‍﻿﻿‌﻿‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍﻿‌‍﻿﻿‌‍﻿‍‌﻿‌‌‍‌‌‌‍﻿‍‌﻿‌‌‍‌‍‌﻿‌‌‌‍﻿﻿‌‍﻿﻿‌‍﻿‌‌﻿‌‌‍‌‍​‍​‍​﻿‍‍﻿‌‍​‌‌﻿‌‍‍‌﻿‌‍​‍‌‍﻿‌‍﻿﻿‌‍‌﻿﻿‌‍‌‌‌‍‌‌‍‍‌‌﻿‌﻿﻿﻿‌‍‌‌﻿﻿‌﻿‌‌‍﻿﻿‌‍﻿﻿‌﻿‍‌﻿‌‌‍‌‌‌‍​﻿‌‍‌‍‌﻿‌‍‌‌‌‍‍‍‌‌﻿﻿‌‌‌‍﻿‍‌﻿﻿‌‌‌‌﻿‌﻿‍‌‌﻿‌‍​‍‌‍‌﻿‌﻿﻿‌‌‍‌‌﻿﻿‌
```

### [Link to heading](#generating-structured-data)Generating Structured Data

The Vercel AI SDK standardizes structured object generation across model providers with the `generateObject` and `streamObject` functions. Generating fully typed objects is as simple as defining a [Zod schema](https://sdk.vercel.ai/docs/ai-sdk-core/schemas-and-zod) and passing it to your function call.

```
import { generateObject } from 'ai'import { z } from 'zod'import { openai } from '@ai-sdk/openai';const { object } = await generateObject({  model: openai('gpt-4-turbo'),  schema: z.object({    recipe: z.object({      name: z.string().describe('name of recipe'),      ingredients: z.array(        z.object({          name: z.string().describe('ingredient name'),          amount: z.string().describe('amount of ingredient')        })      ),      steps: z.array(z.string()).describe('steps to prepare recipe')    })  }),  prompt: 'Generate a lasagna recipe.'})
```

The model returns a validated and type-safe object — in this case, a lasagna recipe — based on your predetermined schema.

```
{  "name": "Classic Lasagna",  "ingredients": [    {      "name": "Olive oil",      "amount": "2 tablespoons"    },    ...  ],  "steps": [    "Preheat oven to 375°F (190°C).",    "In a large skillet, heat olive oil over medium heat. Add ground beef, onion, and garlic. Cook until beef is browned.",    ...  ]}
```

## [Link to heading](#ai-sdk-ui---chat-interface-in-seconds)AI SDK UI - Chat interface in seconds

Streaming conversational text UIs (like ChatGPT) have gained massive popularity over the past year. However, a basic chat interface still requires complex boilerplate: state management (tracking client input, conversation history, loading state), logic to parse and process streaming text, lifecycle hooks to manage persistent data, and more.

AI SDK UI simplifies the implementation of popular AI interfaces into three framework-agnostic hooks, `useChat`, `useCompletion`, and `useAssistant`. Together with AI SDK Core’s `streamText` function, you can build a streaming chatbot in less than 50 lines of code.

app/api/chat/route.ts

```
import { streamText } from 'ai';import { openai } from '@ai-sdk/openai';export async function POST(req: Request) {  const { messages } = await req.json();  const result = await streamText({    model: openai('gpt-4-turbo'),    messages,  });  return result.toAIStreamResponse();}
```

app/page.tsx

```
'use client'import { useChat } from 'ai/react'export default function Page() {  const { messages, input, handleInputChange, handleSubmit } = useChat();  return (    <>      {messages.map(message => (        <div key={message.id}>          {message.role === 'user' ? 'User: ' : 'AI: '}          {message.content}        </div>      ))}      <form onSubmit={handleSubmit}>        <input          name="prompt"          value={input}          onChange={handleInputChange}          id="input"        />        <button type="submit">Submit</button>      </form>    </>  )}
```

In this [Next.js App Router](https://nextjs.org/docs/app) example, the `useChat` hook enables streaming chat messages from OpenAI, manages the chat state, and updates the UI automatically as new messages arrive.

## [Link to heading](#ai-sdk-rsc---move-beyond-text)AI SDK RSC - Move beyond text

While AI chatbots have made a profound impact, LLM applications have faced two important UX challenges:

-   Limited or imprecise knowledge
    
-   Plain text or markdown-only responses
    

With the introduction of [Tools and Tool Calling](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling), developers can build more robust applications that fetch realtime data.

With Vercel AI SDK RSC, you can now move beyond text-based chatbots to give LLMs rich, component-based interfaces.

In today's release, we're adding `streamUI`, a new function that's compatible with AI SDK Core Language Model Specification. This is the successor to `render` (which we plan to deprecate in the next minor release).

Let’s look at an example React Server Action that can retrieve the live weather and render a custom UI with `streamUI`.

```
import { streamUI } from 'ai/rsc'import { openai } from '@ai-sdk/openai'import { z } from 'zod'import { Spinner, Weather } from '@/components'import { getWeather } from '@/utils'async function submitMessage(userInput) { // 'What is the weather in SF?'  'use server'  const result = streamUI({    model: openai('gpt-4-turbo'),    messages: [      { role: 'system', content: 'You are a helpful assistant' },      { role: 'user', content: userInput }    ],    text: ({ content }) => <p>{content}</p>,    tools: {      get_city_weather: {        description: 'Get the current weather for a city',        parameters: z.object({          city: z.string().describe('the city')        }).required(),        generate: async function* ({ city }) {          yield <Spinner/>          const weather = await getWeather(city)          return <Weather info={weather} />        }      }    }  })  return result.value}
```

## [Link to heading](#towards-a-complete-typescript-ai-framework)Towards a complete TypeScript AI framework

The Vercel AI SDK 3.1 marks an important step towards delivering a complete TypeScript AI Framework.

-   With the **AI SDK Core**, you get a unified API for calling LLMs that works anywhere JavaScript or TypeScript runs.
    
-   With the **AI SDK UI**, you can build chat interfaces in seconds with framework-agnostic hooks.
    
-   Finally, with the **AI SDK RSC**, you can go beyond chat interfaces to deliver the next generation of AI native applications with Generative UI.
    

You can learn more in **our new** [**documentation**](https://sdk.vercel.ai/docs) or experiment with different models using the [AI playground](https://sdk.vercel.ai/).

[

**Explore the possibilities**

Talk to our team to learn more about building AI-powered applications for your organization.

Get started



](https://vercel.com/contact)