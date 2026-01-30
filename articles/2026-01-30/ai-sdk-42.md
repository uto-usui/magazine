---
title: "AI SDK 4.2"
source: "https://vercel.com/blog/ai-sdk-4-2"
publishedDate: "2025-03-21"
category: "frontend"
feedName: "Vercel"
author: "Lars Grammel"
---

8 min read

Mar 21, 2025

Introducing MCP clients, reasoning, sources and more.

The [AI SDK](https://sdk.vercel.ai/) is an open-source toolkit for building AI applications with JavaScript and TypeScript. Its unified provider API allows you to use any language model and enables powerful UI integrations into leading web frameworks such as [Next.js](https://nextjs.org/) and [Svelte](https://svelte.dev/).

With over 1 million weekly downloads, developers are using the SDK to create [incredible applications](#showcase) like [Otto](https://ottogrid.ai/), an AI-powered research tool:

> The AI SDK powers everything in Otto, from agents to structuring data to building workflows. With the AI SDK we can focus on building our product, letting us deliver updates much faster. Best of all, we don't have to worry about supporting new models when they change - the AI SDK does it for us, letting us ship updates faster.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/37cy4iw3JVhrWZEj86feCc/caf5676e06ae5748bf5e9cf24a797c42/image.png)
> 
> **Sully Omar**

Today, we're announcing the release of AI SDK 4.2, which introduces:

-   [Reasoning](#reasoning)
    
-   [Model Context Protocol (MCP) clients](#model-context-protocol-\(mcp\)-clients)
    
-   [useChat Message Parts](#usechat-message-parts)
    
-   [Image Generation with Language Models](#image-generation-with-language-models)
    
-   [URL Sources](#url-sources)
    
-   [OpenAI Responses API](#openai-responses-api)
    
-   [Svelte 5](#svelte-5)
    
-   [Middleware updates](#middleware-updates)
    

Let’s explore these new features and improvements.

## [Link to heading](#reasoning)**Reasoning**

Reasoning models—like Anthropic Sonnet 3.7 and DeepSeek R1—dedicate computational resources at inference-time to work through problems methodically, much like a human showing their chain-of-thought. This approach produces more accurate and reliable results than traditional models, especially for tasks involving logic or multi-step analysis.

The AI SDK now supports reasoning models across major providers. You can use a reasoning model like Anthropic’s Claude 3.7 Sonnet with the AI SDK just like any other model. You can access the model’s reasoning tokens with the `reasoning` property:

```
import { generateText } from 'ai';import { anthropic } from '@ai-sdk/anthropic';const { text, reasoning } = await generateText({  model: anthropic('claude-3-7-sonnet-20250219'),  prompt: 'How many people will live in the world in 2040?',});
```

You can experiment with different models to find the best fit for your application. You can easily switch between providers by changing just two lines of code:

```
import { generateText } from 'ai';import { bedrock } from '@ai-sdk/amazon-bedrock'; const { text, reasoning } = await generateText({  model: bedrock('anthropic.claude-3-7-sonnet-20250219-v1:0'),   prompt: 'How many people will live in the world in 2040?',});
```

For providers that include reasoning as part of their text output rather than as separate tokens, you can use the `extractReasoningMiddleware` that automatically pulls reasoning content from formatted responses. This ensures a consistent experience across OpenAI, Anthropic, Groq, Together AI, Azure OpenAI, and other providers—without changing your application code.

To see reasoning in action, check out the [AI SDK Reasoning template](https://ai-sdk-reasoning.vercel.app/). To learn more, check out our [reasoning documentation](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot#reasoning).

## [Link to heading](#model-context-protocol-\(mcp\)-clients)**Model Context Protocol (MCP) Clients**

The AI SDK now supports the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction), an open standard that connects your applications to a growing ecosystem of tools and integrations. With MCP support, you can [access hundreds of pre-built tools](https://github.com/modelcontextprotocol/servers) (”servers”) that add powerful functionality to your application. Some popular MCP servers include:

-   [GitHub](https://github.com/modelcontextprotocol/servers/blob/main/src/github) - manage repositories, issues, and pull requests
    
-   [Slack](https://github.com/modelcontextprotocol/servers/blob/main/src/slack) - send messages and interact with workspaces
    
-   [Filesystem](https://github.com/modelcontextprotocol/servers/blob/main/src/filesystem) - Secure file operations with configurable access controls
    

As MCP is an open-protocol, your users can also build and connect their own custom MCP servers to extend your applications functionality as needed. MCP has many use cases, but is particularly powerful for local code automation.

The SDK supports connecting to MCP servers via either stdio (for local tools) or SSE (for remote servers). Once connected, you can use MCP tools directly with the AI SDK:

```
import { experimental_createMCPClient as createMCPClient } from 'ai';import { openai } from '@ai-sdk/openai';const mcpClient = await createMCPClient({  transport: {    type: 'sse',    url: 'https://my-server.com/sse',  },});const response = await generateText({  model: openai('gpt-4o'),  tools: await mcpClient.tools(), // use MCP tools  prompt: 'Find products under $100',});
```

To learn more about implementing MCP in your projects, check out our [MCP tools documentation](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling#using-mcp-tools) and our step-by-step [MCP recipe](https://sdk.vercel.ai/cookbook/node/mcp-tools).

## [Link to heading](#usechat-message-parts)useChat Message Parts

Language models produce more than just text -- they combine reasoning, sources, tool calls, and text responses, all in one message. With multi-step agentic use cases, these different types of outputs are frequently mixed together in a single response.

AI SDK 4.2 introduces message parts to `useChat`, a new way to handle these different types of outputs that preserve their exact sequence.

```
function Chat() {  const { messages } = useChat();  return (    <div>      {messages.map(message => (        message.parts.map((part, i) => {          switch (part.type) {            case "text": return <p key={i}>{part.text}</p>;            case "source": return <p key={i}>{part.source.url}</p>;            case "reasoning": return <div key={i}>{part.reasoning}</div>;            case "tool-invocation": return <div key={i}>{part.toolInvocation.toolName}</div>;            case "file": return <img key={i} src={`data:${part.mimeType};base64,${part.data}`} />;          }        })      ))}    </div>  );}
```

We plan to add more part types in future 4.2.x releases. To learn more, check out our [4.2 migration guide](https://sdk.vercel.ai/docs/migration-guides/migration-guide-4-2).

## [Link to heading](#image-generation-with-language-models)**Image Generation with Language Models**

Google's Gemini 2.0 Flash is the first language model capable of producing images directly as part of the response. The AI SDK supports this feature, enabling multi-modal chatbots that can generate and understand both text and images.

On the client, you can access images generated by the language model with the `file` message part with `useChat`:

```
import { useChat } from '@ai-sdk/react';export default function Chat() {  const { messages } = useChat();  return (    <div>      {messages.map(message => (        <div key={message.id}>          {message.role === 'user' ? 'User: ' : 'AI: '}          {message.parts.map((part, i) => {            if (part.type === 'text') {              return <div key={i}>{part.text}</div>;            } else if (              part.type === 'file' &&              part.mimeType.startsWith('image/')            ) {              return (                <img                  key={i}                  src={`data:${part.mimeType};base64,${part.data}`}                  alt="Generated image"                />              );            }          })}        </div>      ))}    </div>  );}
```

When images are generated, they become part of your chat history just like text messages. You can reference, iterate on, or "edit" previously generated images through natural conversation - asking the model to modify colors, adjust styles, or create variations while maintaining context of the visual conversation.

To learn more, check out our [file generation documentation](https://sdk.vercel.ai/docs/ai-sdk-core/image-generation#generating-images-with-language-models).

## [Link to heading](#url-sources)**URL sources**

Many providers like OpenAI and Google can include search results in their responses, but each implements their own unique way of exposing and accessing these sources. The AI SDK standardizes URL sources (i.e. websites), allowing you to build AI applications that use source attribution.

For example, here's how to use and send sources with Gemini Flash:

api/chat/route.ts

```
import { google } from "@ai-sdk/google";import { streamText } from "ai";export async function POST(req: Request) {  const { messages } = await req.json();  const result = streamText({    model: google("gemini-1.5-flash", { useSearchGrounding: true }),    messages,  });  return result.toDataStreamResponse({    sendSources: true,  });}
```

Here's how to display the sources in your client-side component using `useChat`:

app/page.tsx

```
function Chat() {  const { messages } = useChat();  return (    <div>      {messages.map((message) => (        <div key={message.id}>          {message.role === "user" ? "User: " : "AI: "}          {message.parts            .filter((part) => part.type !== "source")            .map((part, index) => {              if (part.type === "text") {                return <div key={index}>{part.text}</div>;              }            })}          {message.parts            .filter((part) => part.type === "source")            .map((part) => (              <span key={`source-${part.source.id}`}>                [                <a href={part.source.url} target="_blank">                  {part.source.title ?? new URL(part.source.url).hostname}                </a>                ]              </span>            ))}        </div>      ))}    </div>  );}
```

The AI SDK supports URL sources across compatible models with [OpenAI Respones](https://sdk.vercel.ai/providers/ai-sdk-providers/openai#responses-models), [Google](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai#sources), [Vertex](https://sdk.vercel.ai/providers/ai-sdk-providers/google-vertex#search-grounding), and [Perplexity](https://sdk.vercel.ai/providers/ai-sdk-providers/perplexity#sources). To see sources in action, check out the [sources template](https://ai-sdk-sources.vercel.app/).

## [Link to heading](#openai-responses-api)OpenAI Responses API

OpenAI [recently released the Responses API](https://openai.com/index/new-tools-for-building-agents/), a brand new way to build applications on OpenAI's platform. The new API offers a way to persist chat history, a web search tool for grounding LLM responses, and tools like file-search and computer use that will be coming in a future update.

With day one support from the AI SDK, migrating to the new Responses API from the existing Completions API is simple:

```
import { openai } from '@ai-sdk/openai';const completionsAPIModel = openai('gpt-4o-mini');const responsesAPIModel = openai.responses('gpt-4o-mini');
```

The new web search tool enables models to access the internet for relevant information, improving response quality for factual queries:

```
import { openai } from '@ai-sdk/openai';import { generateText } from 'ai';const result = await generateText({  model: openai.responses('gpt-4o-mini'),  prompt: 'What happened in San Francisco last week?',  tools: {    web_search_preview: openai.tools.webSearchPreview(),  },});console.log(result.text);console.log(result.sources);
```

The Responses API also simplifies managing conversation history. Instead of sending the full conversation with each request, you can reference previous interactions by ID, reducing complexity in your applications.

To learn more about these features, check out the [OpenAI Responses API guide](https://sdk.vercel.ai/docs/guides/openai-responses).

## [Link to heading](#svelte-5)Svelte 5

With AI SDK 4.2, the `@ai-sdk/svelte` package has been completely rewritten by the Svelte team to support Svelte 5 and properly leverage native patterns.

This new implementation replaces React's hook-based approach with a Svelte-native class-based pattern:

```
<script>  import { Chat } from '@ai-sdk/svelte';  // Use the Chat class instead of useChat hook  const chat = new Chat();</script><div>  {#each chat.messages as message}    <div class="message {message.role}">{message.content}</div>  {/each}</div>
```

To learn more check out the [Svelte quickstart guide](https://sdk.vercel.ai/docs/getting-started/svelte) or check out the [open-source Svelte chatbot template](https://svelte-chat.vercel.ai/) with these patterns implemented.

## [Link to heading](#middleware-updates)Middleware Updates

Language model middleware, now stable, is a way to enhance the behavior of language models by intercepting and modifying the calls to the language model. This pattern enables features like guardrails, caching, and logging while maintaining provider flexibility. Middleware is applied with a simple wrapping function that preserves the standard model interface.

The SDK now includes three production-ready middleware options:

-   [`extractReasoningMiddleware`](https://sdk.vercel.ai/docs/ai-sdk-core/middleware#extract-reasoning) extracts reasoning steps from text with special tags like `<think>`.
    
-   [`simulateStreamingMiddleware`](https://sdk.vercel.ai/docs/ai-sdk-core/middleware#simulate-streaming) simulates streaming behavior with responses from non-streaming language models.
    
-   [`defaultSettingsMiddleware`](https://sdk.vercel.ai/docs/ai-sdk-core/middleware#default-settings) applies consistent configurations across model calls, working seamlessly with any model including custom providers. Simply specify defaults for parameters like temperature and use `providerMetadata` for provider-specific options.
    

```
import { openai } from "@ai-sdk/openai";import { anthropic } from "@ai-sdk/anthropic";import {  customProvider,  defaultSettingsMiddleware,  wrapLanguageModel,} from "ai";// custom provider with defaultSettingsMiddleware:export const model = customProvider({  languageModels: {    fast: openai("gpt-4o-mini"),    writing: anthropic("claude-3-5-sonnet-latest"),    reasoning: wrapLanguageModel({      model: anthropic("claude-3-7-sonnet-20250219"),      middleware: defaultSettingsMiddleware({        settings: {          providerMetadata: {            anthropic: {              thinking: { type: "enabled", budgetTokens: 12000 },            },          },        },      }),    }),  },});
```

These middleware options can be combined to create powerful, composable functionality that work across any supported language model. Check out our [middleware documentation](https://sdk.vercel.ai/docs/ai-sdk-core/middleware) to learn more.

## [Link to heading](#other-features)Other Features

We have recently made several experimental features stable, meaning they are now production-ready and well-tested. These features include:

-   [**Custom Provider**](https://sdk.vercel.ai/docs/ai-sdk-core/provider-management#custom-providers)**:** map ids to any model allowing you to set up custom model configurations, alias names, and more.
    
-   [**Middleware Improvements**](https://sdk.vercel.ai/docs/ai-sdk-core/middleware)**:** apply multiple middlewares simultaneously for enhanced request processing and transformation. Middleware moved to stable.
    
-   [**Tool Call Streaming**](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot-tool-usage#tool-call-streaming)**:** stream partial tool calls as part of the data stream. Moved to stable.
    
-   [**Response Body Access**](https://sdk.vercel.ai/docs/ai-sdk-core/generating-text#accessing-response-headers--body)**:** access the original response body directly via `response.body` property when using `generateText` or `generateObject`.
    
-   [**Data Stream Enhancements**](https://sdk.vercel.ai/cookbook/next/stream-text-multistep)**:** send start/finish events for `streamText` and use `write`/`writeSource` methods for more control over stream data.
    
-   [**Error Handling**](https://sdk.vercel.ai/docs/ai-sdk-core/generating-text#onerror-callback)**:** utilize `onError` callback for `streamText`/`streamObject` to manage errors gracefully.
    
-   [**Object Generation**](https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data#repairing-invalid-or-malformed-json)**:** leverage `generateObject` `repairText` functionality to fix and improve generated content.
    
-   **Provider Options:** configure provider-specific request options (e.g. `reasoningEffort` with OpenAI). Details depend on the provider. Moved to stable.
    
-   **Provider Metadata:** access provider-specific response metadata. Details depend on the provider. Moved to stable.
    

## [Link to heading](#provider-updates)Provider Updates

The AI SDK provider ecosystem continues to grow with new and improved providers:

-   [**Amazon Bedrock**](https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock): integrated more closely into AI SDK standard features with abort, fetch and error handling. Added support for cache point support, image generation for Amazon Nova Canvas, budget token support, and reasoning support.
    
-   [**Anthropic**](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic): Added reasoning support, model setting adjustments for reasoning content, tool updates (bash, text editor, computer), and image URL support.
    
-   [**Azure**](https://sdk.vercel.ai/providers/ai-sdk-providers/azure): Added image generation support.
    
-   [**Cohere**](https://sdk.vercel.ai/providers/ai-sdk-providers/cohere): Improved tool handling with fixes for parameters and tool plan content.
    
-   [**DeepInfra**](https://sdk.vercel.ai/providers/ai-sdk-providers/deepinfra): Added image generation support.
    
-   [**Google**](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai): Enhanced schema support, resilience against undefined parts, seed support, dynamic retrieval, empty content handling, reasoning support, and model ID updates.
    
-   [**Google Vertex AI**](https://sdk.vercel.ai/providers/ai-sdk-providers/google-vertex): Added new Gemini models, support for public file URLs in messages, and prompt caching for Anthropic Claude models.
    
-   [**Mistral**](https://sdk.vercel.ai/providers/ai-sdk-providers/mistral): Improved content handling with fixes for undefined content, complex content types, PDF support, and multiple text content parts.
    
-   [**OpenAI**](https://sdk.vercel.ai/providers/ai-sdk-providers/openai): Added support for gpt-4.5, o3-mini, responses API, and PDF input.
    
-   [**OpenAI Compatible**](https://sdk.vercel.ai/providers/ai-sdk-providers/openai-compatible): Added support for providerOptions in generateText/streamText.
    
-   [**Perplexity**](https://sdk.vercel.ai/providers/ai-sdk-providers/perplexity): Added sources support.
    
-   [**Replicate**](https://sdk.vercel.ai/providers/ai-sdk-providers/replicate): Added support for versioned models.
    
-   [**Together AI**](https://sdk.vercel.ai/providers/ai-sdk-providers/togetherai): Added image generation support and extended provider V1 specification.
    
-   [**xAI**](https://sdk.vercel.ai/providers/ai-sdk-providers/xai): Add image generation support.
    

## [Link to heading](#getting-started)**Getting started**

With powerful new features like MCP support, image generation with language models, and reasoning, there's never been a better time to start building AI applications with the AI SDK.

-   **Start a new AI project**: Ready to build something new? Check out our [**latest guides**](https://sdk.vercel.ai/cookbook)
    
-   **Explore our templates**: Visit our [**Template Gallery**](https://sdk.vercel.ai/docs/introduction#templates) to see the AI SDK in action
    
-   **Join the community**: Share what you're building in our [**GitHub Discussions**](https://github.com/vercel/ai/discussions)
    

## [Link to heading](#showcase)Showcase

Since our 4.1 release, we've seen some incredible products powered by the AI SDK that we wanted to highlight:

-   [Otto](https://ottogrid.ai/) is an agentic spreadsheet that automates repetitive knowledge work.
    
-   [Payload](https://payloadcms.com/) is an open-source Next.js fullstack framework that transforms your configuration into a complete backend with admin UI, APIs, and database management in one seamless package.
    

> Switching to the AI SDK allowed us to instantly remove a significant amount of custom code and effortlessly support all current and future AI providers. The API is super clean, thoughtfully designed, and offers first-class TypeScript support—we couldn’t be happier!
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5hADKXNTIDcBSXJ5O1STS7/a5c9c55e41e8678ab0c776ba03dd809c/alessio-gravili-avatar.jpeg)
> 
> **Alessio Gravili,** Payload

## [Link to heading](#contributors)Contributors

AI SDK 4.2 is the result of the combined work of our core team at Vercel ([Lars](https://x.com/lgrammel), [Jeremy](https://x.com/jrmyphlmn), [Walter](https://x.com/shaper), and [Nico](https://x.com/nicoalbanese10)) and many community contributors. Thanks for contributing merged pull requests:

[Xiang-CH](https://github.com/Xiang-CH), [d3lm](https://github.com/d3lm), [dreamorosi](https://github.com/dreamorosi), [MrunmayS](https://github.com/MrunmayS), [valstu](https://github.com/valstu), [BrianHung](https://github.com/BrianHung), [jstjoe](https://github.com/jstjoe), [rmarescu](https://github.com/rmarescu), [lasley](https://github.com/lasley), [shaneporter](https://github.com/shaneporter), [FinnWoelm](https://github.com/FinnWoelm), [threepointone](https://github.com/threepointone), [minpeter](https://github.com/minpeter), [UrielCh](https://github.com/UrielCh), [Younis-Ahmed](https://github.com/Younis-Ahmed), [edukure](https://github.com/edukure), [O1af](https://github.com/O1af), [abhishekpatil4](https://github.com/abhishekpatil4), [sandonl](https://github.com/sandonl), [NVolcz](https://github.com/NVolcz), [nihaocami](https://github.com/nihaocami), [yudistiraashadi](https://github.com/yudistiraashadi), [mattlgroff](https://github.com/mattlgroff), [gianpaj](https://github.com/gianpaj), [habeebmoosa](https://github.com/habeebmoosa), [KABBOUCHI](https://github.com/KABBOUCHI), [franklin007ban2](https://github.com/franklin007ban2), [yoshinorisano](https://github.com/yoshinorisano), [jcppman](https://github.com/jcppman), [gravelBridge](https://github.com/gravelBridge), [peetzweg](https://github.com/peetzweg), [patelvivekdev](https://github.com/patelvivekdev), [ggallon](https://github.com/ggallon), [zeke](https://github.com/zeke), [epoyraz](https://github.com/epoyraz), [IObert](https://github.com/IObert), [KitBurgess](https://github.com/vercel/ai/commits?author=KitBurgess), [marwhyte](https://github.com/marwhyte), [niranjan94](https://github.com/niranjan94), [asishupadhyay](https://github.com/asishupadhyay), [SalmanK81099](https://github.com/SalmanK81099).

With special recognition to:

-   [elliott-with-the-longest-name-on-github](https://github.com/elliott-with-the-longest-name-on-github) for Svelte 5 support
    
-   [iteratetograceness](https://github.com/iteratetograceness) for MCP support
    
-   [Und3rf10w](https://github.com/Und3rf10w) for Amazon Bedrock reasoning support
    

Your feedback and contributions continue to shape the AI SDK. We're excited to see what you'll build with these new capabilities.