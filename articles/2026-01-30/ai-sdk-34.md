---
title: "AI SDK 3.4"
source: "https://vercel.com/blog/ai-sdk-3-4"
publishedDate: "2024-09-20"
category: "frontend"
feedName: "Vercel"
author: "Lars Grammel"
---

8 min read

Sep 20, 2024

Introducing language model middleware, data stream protocol, and multi-step generations

The [AI SDK](https://sdk.vercel.ai/) is an open-source toolkit for building AI applications with JavaScript and TypeScript. Its unified provider API allows you to use any language model and enables powerful UI integrations into leading web frameworks such as [Next.js](https://nextjs.org/) and [Svelte](https://svelte.dev/).

Since our [3.3 release](https://vercel.com/blog/vercel-ai-sdk-3-3), we've seen some incredible products built with the AI SDK:

-   [**postgres.new**](http://postgres.new/) is an AI-powered SQL editor that uses the AI SDK to translate user queries into SQL.
    
-   [**v0**](http://v0.dev/) is a web development agent that allows you to generate UI, ask engineering questions, and execute code — all in natural language.
    

![v0 by Vercel is powered by the AI SDK](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1wlz3w3jeSCUuBXV7jAPeq%2F4ad22d4a2a7d8b356d1b578b8050f419%2FScreenshot_2024-09-19_at_14.32.15.png&w=1920&q=75)![v0 by Vercel is powered by the AI SDK](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2cMFCC69Ko57qv7AdjN4c9%2F9a6050d642f3219cdb368cac7c41390b%2FScreenshot_2024-09-19_at_14.32.59.png&w=1920&q=75)

v0 by Vercel is powered by the AI SDK

Today, we’re excited to release AI SDK 3.4 which introduces several new features:

1.  [**Language model middleware**](#language-model-middleware): intercept and modify language model calls
    
2.  [**Data stream protocol**](#data-stream-protocol): use AI SDK UI with with any backend
    
3.  [**Structured outputs**](#structured-outputs)**:** object, array, or enum-based output modes
    
4.  [**Multi-step calls**](#multi-step-calls)**:** automatic tool use with agents and assistants
    
5.  [**Tracing improvements**](#tracing-improvements): advanced telemetry for performance and cost insights
    
6.  [**Mock models and testing**](#mock-models-and-testing)**:** simulate language model responses for unit testing
    
7.  [**Provider updates**](#provider-updates)**:** new providers, improved performance, and added features
    

## [Link to heading](#language-model-middleware)**Language model middleware**

AI SDK 3.4 introduces [language model middleware](https://sdk.vercel.ai/docs/ai-sdk-core/middleware#language-model-middleware). Inspired by web middleware, language model middleware provides a modular way to intercept, modify, and enhance language model calls.

Language model middleware provides three methods:

-   [`transformParams`](https://sdk.vercel.ai/docs/reference/ai-sdk-core/language-model-v1-middleware#transform-params): Modify language model calls before they're sent. This enables dynamic context injection, prompt refinement, or integration of external data sources. For example, you could implement retrieval-augmented generation by fetching relevant content to include in the prompt.
    
-   [`wrapGenerate`](https://sdk.vercel.ai/docs/reference/ai-sdk-core/language-model-v1-middleware#wrap-generate) and [`wrapStream`](https://sdk.vercel.ai/docs/reference/ai-sdk-core/language-model-v1-middleware#wrap-stream): Intercept and "wrap" language model calls, allowing you to implement request-level logic that executes both before and after model interactions. This is ideal for features like logging, caching, and implementing safety guardrails.
    

A major advantage of the language model middleware interface is that it is shareable. You can package, distribute, and reuse middleware across projects. This modular, self-contained approach makes it simple to maintain and update as new models come out.

Language model middleware is an experimental feature. Experimental features let you use the latest AI SDK functionality as soon as possible, however, they can change in patch versions.

### [Link to heading](#implementing-rag-with-middleware)**Implementing RAG with middleware**

Let's look at how you can implement a [retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) (RAG) middleware:

```
import type {   Experimental_LanguageModelV1Middleware as LanguageModelV1Middleware } from "ai";export const yourRagMiddleware: LanguageModelV1Middleware = {  transformParams: async ({ params }) => {    const lastUserMessageText = getLastUserMessageText({      prompt: params.prompt,    });    // do not use RAG when the last message is not a user message    if (lastUserMessageText == null) return params;    // find relevant sources for the last user message:    const sources = findSources({ text: lastUserMessageText });    const instruction =      "Use the following information to answer the question:\n" +      sources.map((chunk) => JSON.stringify(chunk)).join("\n");    // return params with the instruction added to the last user message:    return paramsWithUpdatedLastUserMessage({ params, text: instruction });  },};
```

Example RAG middleware (pseudocode)

This middleware uses the `transformParams` function to intercept the model call, retrieve relevant information based on the user's last message, and add it to the prompt. This approach keeps your RAG logic separate from your main application code, making it easy to maintain and extend based on your use case.

### [Link to heading](#using-middleware-with-your-language-model)**Using middleware with your language model**

Once you've created your middleware, you can apply it to your language model:

```
import {  streamText,  experimental_wrapLanguageModel as wrapLanguageModel,} from 'ai';import { openai } from '@ai-sdk/openai'const result = await streamText({  model: wrapLanguageModel({    model: openai('gpt-4o'),    middleware: yourLanguageModelMiddleware,  }),  prompt: 'What is founder mode?',});
```

Check out our [RAG template](https://vercel.com/templates/next.js/ai-sdk-internal-knowledge-base) to see middleware [in action](https://ai-sdk-preview-internal-knowledge-base.vercel.app/) and explore the [source code](https://github.com/vercel-labs/ai-sdk-preview-internal-knowledge-base) for a production-grade implementation.

Whether you're implementing complex [RAG systems](https://github.com/vercel/ai/blob/main/examples/ai-core/src/middleware/your-rag-middleware.ts), [adding guardrails](https://github.com/vercel/ai/blob/main/examples/ai-core/src/middleware/your-guardrail-middleware.ts), or [optimizing performance with caching](https://github.com/vercel/ai/blob/main/examples/ai-core/src/middleware/your-cache-middleware.ts), middleware provides a clean and modular way to extend your language model's capabilities.

## [Link to heading](#data-stream-protocol)**Data stream protocol**

Building AI-powered frontends often involves managing complex streaming data, handling partial responses, and maintaining consistent chat state. To solve these problems, we built [AI SDK UI](https://sdk.vercel.ai/docs/ai-sdk-ui/overview#ai-sdk-ui), a library that provides framework-agnostic hooks to help you build common AI-native UIs:

-   [`**useChat**`](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat): Manages real-time streaming of chat messages
    
-   [`**useCompletion**`](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-completion): Handles text completions with automatic UI updates
    

Up until now, to use AI SDK UI, you had to use [AI SDK Core](https://sdk.vercel.ai/docs/ai-sdk-core/overview) on the backend. This is not a viable option if your backend is already written in another language like Python. With AI SDK 3.4, we are **introducing a new Data Stream Protocol that allows you to use AI SDK UI with any backend**, in any programming language.

Implementing the data stream protocol involves two key steps:

1.  Send data from your backend according to [the protocol specifications](https://sdk.vercel.ai/docs/ai-sdk-ui/stream-protocol#stream-protocols)
    
2.  [Configure AI SDK UI hooks](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat#api) to use the custom backend endpoint
    

To help you get started with implementing the Stream Protocol in different backend frameworks, we've prepared a [Python FastAPI Example](https://github.com/vercel/ai/tree/main/examples/next-fastapi). We've also created examples for many JavaScript backend frameworks:

The new data stream protocol also allows you easily to create custom chat frontends completely tailored to your needs, while still leveraging the full power of AI SDK Core. To learn more, check out [the stream protocol documentation](https://sdk.vercel.ai/docs/ai-sdk-ui/stream-protocol#stream-protocols).

## [Link to heading](#structured-outputs)**Structured outputs**

The AI SDK has long supported [structured output generation](https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data) through the [`generateObject`](https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-object) and [`streamObject`](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-object) functions. These functions allow you to create type-safe, schema-validated outputs from language models. They are instrumental for tasks like information extraction, data classification, and synthetic data generation.

Based on your feedback, we're introducing a new output mode parameter for `generateObject` and `streamObject`. This parameter allows you to define what kind of output you want, and gives you options to better steer it. The default output mode is `object`.

1\. **Object mode (default)**

Object mode will force the model to return a single structured object based on the schema that you provide.

```
const { object } = await generateObject({  model: openai('gpt-4o'),  schema: z.object({    product: z.object({      name: z.string(),      description: z.string(),      price: z.number(),    }),  }),  prompt: 'Generate a description for a new smartphone.',});
```

Generate a single object with object output mode

2\. **Array mode (new)**

Array output mode allows the model to generate an array of objects that conform to a specified element schema. This mode is particularly useful when you need to create multiple structured objects with consistent properties.

```
const { elementStream: destinations } = await streamObject({  model: openai('gpt-4o'),  output: 'array',  schema: z.object({    city: z.string(),    country: z.string(),    description: z.string(),    attractions: z.array(z.string()).describe('List of major attractions.'),  }),  prompt: 'What are the top 5 cities for short vacations in Europe?',});for await (const destination of destinations) {  console.log(destination); // destination is a complete array element}
```

Generate an array of objects that conform to an element schema with array output mode

When used with the [`useObject`](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-object) hook in a React component, this new array output mode streams only complete array element as they become available. This results in a more stable UI with no layout shifts, improving the overall user experience.

Check out [array output mode in action](https://ai-sdk-preview-array-output-mode.vercel.app/).

3\. **Enum mode (new)**

Enum mode will force the model to return a single value from a predefined set of options. This is particularly useful for classification tasks (e.g. sentiment analysis) where you want to constrain the output to a specific set of categories.

```
const { object: movieGenre } = await generateObject({  model: openai('gpt-4o'),  output: "enum",  enum: ["action", "comedy", "drama", "horror", "sci-fi"],  prompt:    `Classify the genre of this movie plot:` +    `"A group of astronauts travel through a wormhole ` +    `in search of a new habitable planet for humanity."`,});
```

Generate a specific value with enum output mode

Note: Enum mode is limited to generateObject given the short length of the resulting generation.

4\. **No schema (new)**

In some cases, you might not want to use a schema, for example when the data is a dynamic user request. You can use the `output` setting to set the output format to `no-schema` in those cases and omit the schema parameter. Check out [no-schema output mode in action](https://ai-sdk-preview-no-schema.vercel.app/).

## [Link to heading](#multi-step-calls)Multi-step calls

In a [previous update](https://vercel.com/blog/introducing-vercel-ai-sdk-3-2#agents), we added the [`steps`](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling#steps) parameter to `generateText`, allowing language models to make multiple tool calls and receive results within a single generation.

With AI SDK 3.4, we've added this functionality to `streamText`. This addition addresses the need for real-time, streaming responses that can interact with tools, a frequent request from our users. The key benefit of this feature is that you no longer need to manually orchestrate checking for tool calls and feeding results back to the model. The AI SDK handles this automatically.

This functionality enables multi-step use cases:

The example above uses `streamText` with steps to give the model to automatically call any necessary tools to successfully fulfill the users query.

```
import { z } from 'zod';import { streamText, tool } from 'ai';​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍​‍﻿﻿‌‍​‌‌﻿​​‌‍‍‌​‍﻿﻿‌‍​‍‌‍﻿​‌‍﻿﻿‌‍‌﻿​‍﻿﻿‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​​﻿﻿﻿‌‍‌‌​﻿﻿‌​﻿​‌​﻿‍​‌﻿​﻿‌﻿‍‍‌​​﻿‌‌‌‌​﻿‌﻿​﻿‌‍‌‍​﻿‌﻿‌﻿‌﻿‌﻿‌‍​‍‌‍‌​‌‍‌﻿‌﻿‌‍‌﻿‍‍‌​‌​‌​‌﻿​﻿​﻿‌​‍‍‌‌​﻿‌​﻿﻿​‍‌‍‌﻿‌​​﻿﻿‌‌‍‌‌​‍​‍‌﻿﻿‌import { openai } from '@ai-sdk/openai';const result = await streamText({  model: openai('gpt-4o'),  messages,  tools: {    listOrders: tool({      description: "list all orders",      parameters: z.object({ userId: z.string() }),      execute: async ({ userId }) => getOrders(userId)    }),    viewTrackingInformation: tool({      description: "view tracking information for a specific order",      parameters: z.object({ orderId: z.string() }),      execute: async ({ orderId }) => getTrackingInformation({ orderId })    }),  },  maxSteps: 3,  onStepFinish({ toolResults, usage }) {    // your own logic    // e.g. saving chat history or recording usage for each step  },  onFinish({ steps }) {    // your own logic    // e.g. saving chat history or recording usage for the entire generation  }});​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍​‍﻿﻿‌‍​‌‌﻿​​‌‍‍‌​‍﻿﻿‌‍​‍‌‍﻿​‌‍﻿﻿‌‍‌﻿​‍﻿﻿‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​​﻿﻿﻿‌‍‌‌​﻿﻿‌​﻿​‌​﻿‍​‌﻿​﻿‌﻿‍‍‌​​﻿‌‌‌‌​﻿‌﻿​﻿‌‍‌‍​﻿‌﻿‌﻿‌﻿‌﻿‌‍​‍‌‍‌​‌‍‌﻿‌﻿‌‍‌﻿‍‍‌​‌​‌​‌﻿​﻿​﻿‌​‍‍‌‌​﻿‌​﻿﻿​‍‌‍‌﻿‌​​﻿﻿‌‌‍‌‌​‍​‍‌﻿﻿‌
```

Steps are a great option for any use case that requires the model to use multiple tools in succession to gather the necessary information and provide an accurate response to the user's query.

To access intermediate tool calls and results from each step, you can use the [`steps`](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling#steps) property in the result object. You can also provide an [`onStepFinish`](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling#onstepfinish-callback) callback that is triggered when a step is finished. Additionally, you can access `steps` in the `onFinish` callback, which allows you to work with the complete set of steps once the entire generation is complete.

Check out the [multi-step example in action](https://ai-sdk-preview-roundtrips.vercel.app/) and [deploy your own](https://vercel.com/templates/next.js/ai-sdk-roundtrips).

## [Link to heading](#tracing-improvements)**Tracing improvements**

In the last release of the AI SDK, we [introduced support for OpenTelemetry](https://vercel.com/blog/vercel-ai-sdk-3-3#tracing) to collect telemetry data, providing you with insights into your AI operations. [OpenTelemetry](https://opentelemetry.io/) is an open-source observability framework that offers standardized instrumentation for collecting telemetry data.

Since this launch, several observability platforms have created integration guides for using tracing with the AI SDK. These include:

In 3.4, we've enhanced our tracing capabilities to align more closely with [OpenTelemetry Semantic Conventions for GenAI operations](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/). We've added new attributes such as the **response ID**, **response model**, and **response timestamp**, as well as performance metrics like **time to first chunk** and **average output tokens per second**.

These improvements enable more accurate cost tracking, facilitate user feedback collection, and allow for the creation of detailed performance dashboards. Check out [the telemetry documentation](https://sdk.vercel.ai/docs/ai-sdk-core/telemetry) to learn more.

## [Link to heading](#mock-models-and-testing)Mock models and testing

Testing language models can be challenging as they are non-deterministic and slow and expensive to call. In 3.4, we are releasing mock providers and test helpers to allow you to unit test your code. Here’s an example of how you would create a mock response with `generateText`:

```
import { generateText } from 'ai';import { MockLanguageModelV1 } from 'ai/test';const result = await generateText({  model: new MockLanguageModelV1({    doGenerate: async () => ({      rawCall: { rawPrompt: null, rawSettings: {} },      finishReason: 'stop',      usage: { promptTokens: 10, completionTokens: 20 },      text: `Hello, world!`,    }),  }),  prompt: 'Hello, test!',});
```

These utilities allow you to control the output of the AI SDK and test your code in a repeatable and deterministic way without actually calling a language model provider. Check out [the testing documentation](https://sdk.vercel.ai/docs/ai-sdk-core/testing) to learn more.

## [Link to heading](#provider-updates)**Provider updates**

We've expanded our provider support to offer more options and improve performance across the board. These updates include new features for existing providers and the addition of new embedding models.

-   [**Anthropic**](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic): Added support for [prompt caching](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic#example-cache-control), enabling cheaper and faster applications.
    
-   [**Amazon Bedrock**](https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock): Added support for Amazon Bedrock Guardrails, allowing you to implement safeguards and modify model responses.
    
-   [**Cohere**](https://sdk.vercel.ai/providers/ai-sdk-providers/cohere): Added embedding model support.
    
-   [**OpenAI**](https://sdk.vercel.ai/providers/ai-sdk-providers/openai): Added support for new structured outputs feature to generate JSON and call tools with JSON that always adheres to the schema. Added [support for reasoning tokens](https://sdk.vercel.ai/providers/ai-sdk-providers/openai#reasoning-models) with o1-preview and o1-mini.
    
-   [**Google Generative AI**](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai): Added support for [search grounding](https://x.com/rauchg/status/1823386817086832784) for Gemini, which gives the model access to up-to-date information. Added embedding model support.
    
-   [**Mistral**](https://sdk.vercel.ai/providers/ai-sdk-providers/mistral): Added image support for [Pixtral](https://mistral.ai/news/pixtral-12b/).
    
-   [**LlamaIndex**](https://sdk.vercel.ai/providers/adapters/llamaindex): Added an adapter to use LlamaIndex's tools and abstractions with the AI SDK.
    
-   **New Community Providers**: [Cloudflare Workers AI](https://sdk.vercel.ai/providers/community-providers/cloudflare-workers-ai), [Portkey](https://sdk.vercel.ai/providers/community-providers/portkey), [Anthropic Vertex](https://sdk.vercel.ai/providers/community-providers/anthropic-vertex-ai), [FriendliAi](https://sdk.vercel.ai/providers/community-providers/friendliai).
    

## [Link to heading](#getting-started)**Getting started**

With new features like language model middleware, data stream protocol, and multi-step generations, it’s never been a better time to start building AI applications with the AI SDK.

-   **Start a new AI project**: Ready to build something new? Check out our [latest guides](https://sdk.vercel.ai/docs/guides).
    
-   **Explore our templates**: Visit our [Template Gallery](https://vercel.com/templates?type=ai) to see the AI SDK in action and get inspired for your next project.
    
-   **Join the community**: Let us know what you’re building with the AI SDK in our [GitHub Discussions](https://github.com/vercel/ai/discussions/1914).
    

**What's next?** AI SDK 4.0 will be a maintenance release in which experimental features will be promoted to stable, and deprecated features will be removed.

## [Link to heading](#contributors)Contributors

AI SDK 3.4 is the result of the combined work of our core team at Vercel and many community contributors.

Special thanks for contributing merged pull requests:

[DBvc](https://github.com/DBvc), [nikhilsnayak,](https://github.com/nikhilsnayak) [codybrouwers,](https://github.com/codybrouwers) [jackwilson323,](https://github.com/jackwilson323) [axel-rock,](https://github.com/axel-rock) [waigel,](https://github.com/waigel) [blechatellier,](https://github.com/blechatellier) [danielgavrilov,](https://github.com/danielgavrilov) [shoopapa,](https://github.com/shoopapa) [dyeoman2,](https://github.com/dyeoman2) [nalaso,](https://github.com/nalaso) [yoshinorisano,](https://github.com/yoshinorisano) [narengogi,](https://github.com/narengogi) [minpeter,](https://github.com/minpeter) [shaper,](https://github.com/shaper) [ggallon,](https://github.com/ggallon) [siddharthsambharia-portkey,](https://github.com/siddharthsambharia-portkey) [OscarBarrett](https://github.com/OscarBarrett) , [seuha516,](https://github.com/seuha516) [Saran33,](https://github.com/Saran33) [ahnjaeshin,](https://github.com/ahnjaeshin) [thucpn,](https://github.com/thucpn) [kexiZeroing,](https://github.com/kexiZeroing) [huozhi,](https://github.com/huozhi) [AbhiShake1,](https://github.com/AbhiShake1) [mikkokut](https://github.com/mikkokut), [marcusschiesser](https://github.com/marcusschiesser).

Your feedback and contributions are invaluable as we continue to evolve the AI SDK.