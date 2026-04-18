---
title: "AI Gateway supports OpenAI's Responses API"
source: "https://vercel.com/changelog/ai-gateway-supports-openais-responses-api"
publishedDate: "2026-03-06"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

1 min read

Mar 6, 2026

OpenAI's Responses API is now available through AI Gateway. The Responses API is a modern alternative to the Chat Completions API. Point your OpenAI SDK to AI Gateway's base URL and use the `creator/model` names to route requests. TypeScript and Python are both supported. All of the functionality in the Responses API was already accessible through AI Gateway via the AI SDK and Chat Completions API, but you can now use the Responses API directly.

## [Link to heading](#what-you-can-do)What you can do

-   **Text generation and streaming**: Send prompts, get responses, stream tokens as they arrive
    
-   **Tool calling**: Define functions the model can invoke, then feed results back
    
-   **Structured output**: Constrain responses to a JSON schema
    
-   **Reasoning**: Control how much effort the model spends thinking with configurable effort levels
    

## [Link to heading](#getting-started)Getting started

Install the OpenAI SDK and point it at AI Gateway.

```
npm install openai
```

```
import OpenAI from 'openai';const client = new OpenAI({  apiKey: process.env.AI_GATEWAY_API_KEY,  baseURL: 'https://ai-gateway.vercel.sh/v1',});
```

## [Link to heading](#basic-example:-text-generation)Basic example: text generation

Send a prompt and get a response from any supported model.

```
const response = await client.responses.create({  model: 'openai/gpt-5.4',  input: 'What is the best restaurant in San Francisco?',});
```

## [Link to heading](#structured-output-with-reasoning)Structured output with reasoning

Combine reasoning levels with a JSON schema to get structured responses.

```
const response = await client.responses.create({  model: 'anthropic/claude-sonnet-4.6',  input: 'Build a Next.js app with auth and a dashboard page.',  reasoning: { effort: 'high' },  text: {    format: {      type: 'json_schema',      name: 'app_plan',      strict: true,      schema: {        type: 'object',        properties: {          files: { type: 'array', items: { type: 'string' } },          summary: { type: 'string' },        },        required: ['files', 'summary'],        additionalProperties: false,      },    },  },});
```

To learn more about the Responses API, read the [documentation](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses).