---
title: "AI SDK 4.0"
source: "https://vercel.com/blog/ai-sdk-4-0"
publishedDate: "2024-11-18"
category: "frontend"
feedName: "Vercel"
author: "Lars Grammel"
---

6 min read

Nov 18, 2024

Introducing PDF support, computer use, and an xAI Grok provider

The [AI SDK](https://sdk.vercel.ai/) is an open-source toolkit for building AI applications with JavaScript and TypeScript. Its unified provider API allows you to use any language model and enables powerful UI integrations into leading web frameworks such as [Next.js](https://nextjs.org/) and [Svelte](https://svelte.dev/).

Since our 3.4 release, we've seen the community build amazing products with the AI SDK:

-   Val Town's Townie is an [AI assistant that helps developers](https://blog.val.town/blog/building-a-code-writing-robot/) turn ideas into deployed TypeScript apps and APIs right from their browser
    
-   Chatbase has [scaled to 500K monthly visitors and $4M ARR](https://vercel.com/blog/how-chatbase-scaled-rapidly-with-vercels-developer-experience-and-ai-sdk), using the AI SDK to power customizable chat agents for customer support and sales
    
-   ChatPRD helps product managers craft Product Requirements Documents (PRDs) and roadmaps with AI, [growing to 20,000 users in just nine months](https://vercel.com/blog/leveraging-vercel-and-the-ai-sdk-to-deliver-a-seamless-ai-powered-experience)
    

Today, we're announcing the release of AI SDK 4.0. This version introduces several new capabilities including:

-   [PDF support for Anthropic and Google Generative AI providers for document analysis](#pdf-support)
    
-   [Computer use support with Anthropic's Claude](#computer-use-support-\(anthropic\))
    
-   [Continuation support for long text generation](#continuation-support)
    
-   [New xAI Grok provider](#new-xai-grok-provider)
    
-   [Additional provider updates](#additional-provider-updates)
    
-   [Updated AI Chatbot template](#updated-chatbot-template)
    

Let's explore these new features and improvements.

## [Link to heading](#pdf-support)PDF support

Supporting PDF documents is essential for AI applications as this format is the standard way people share and store documents. Organizations and individuals have built up large collections of important documents in PDF format—from contracts and research papers to manuals and reports—which means AI systems need to handle PDFs well if they're going to help with analyzing documents, pulling out information, or automating workflows.

AI SDK 4.0 introduces PDF support across multiple providers, including [Anthropic](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic#pdf-support), [Google Generative AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai#file-inputs), and [Google Vertex AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-vertex#file-inputs). With PDF support, you can:

-   Extract text and information from PDF documents
    
-   Analyze and summarize PDF content
    
-   Answer questions based on PDF content
    

To send a PDF to any compatible model, you can pass PDF files as part of the message content using the `file` type. Here’s an example with Anthropic’s Claude Sonnet 3.5 model:

```
import { generateText } from 'ai';import { anthropic } from '@ai-sdk/anthropic';const result = await generateText({  model: anthropic('claude-3-5-sonnet-20241022'),  messages: [    {      role: 'user',      content: [        {          type: 'text',          text: 'What is an embedding model according to this document?',        },        {          type: 'file',          data: fs.readFileSync('./data/ai.pdf'),          mimeType: 'application/pdf',        },      ],    },  ],});
```

Thanks to the AI SDK's unified API, to use this functionality with Google or Vertex AI, all you need to change is the model string in the code above.

The code example demonstrates how PDFs integrate seamlessly into your LLM calls. They're treated as just another message content type, requiring no special handling beyond including them as part of the message.

Check out our [quiz generator template](https://ai-sdk-preview-pdf-support.vercel.app/) to see PDF support in action. Using `useObject` and Google's Gemini Pro 1.5 model, it generates an interactive multiple choice quiz based on the contents of a PDF that you upload.

## [Link to heading](#computer-use-support-\(anthropic\))**Computer use support (Anthropic)**

Enabling AI to interact with apps and interfaces naturally, instead of using special tools, unlocks new automation and assistance opportunities.

AI SDK 4.0 introduces [computer use support for the latest Claude Sonnet 3.5 model](https://www.anthropic.com/news/3-5-models-and-computer-use), allowing you to build applications that can:

-   Control mouse movements and clicks
    
-   Input keyboard commands
    
-   Capture and analyze screenshots
    
-   Execute terminal commands
    
-   Manipulate text files
    

Anthropic provides three predefined tools designed to work with the latest Claude 3.5 Sonnet model: the [Computer Tool](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic#computer-tool) for basic system control (mouse, keyboard, and screenshots), the [Text Editor Tool](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic#text-editor-tool) for file operations, and the [Bash Tool](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic#bash-tool) for terminal commands. These tools are carefully designed so that Claude knows exactly how to use them.

While Anthropic defines the tool interfaces, you'll need to implement the underlying `execute` function for each tool, defining how your application should handle actions like moving the mouse, capturing screenshots, or running terminal commands on your specific system.

Here's an example using the computer tool with `generateText`:

```
import { generateText } from 'ai';import { anthropic } from '@ai-sdk/anthropic';import { executeComputerAction, getScreenshot } from '@/lib/ai'; // user-definedconst computerTool = anthropic.tools.computer_20241022({  displayWidthPx: 1920,  displayHeightPx: 1080,  execute: async ({ action, coordinate, text }) => {    switch (action) {      case 'screenshot': {        return {          type: 'image',          data: getScreenshot(),        };      }      default: {        return executeComputerAction(action, coordinate, text);      }    }  },  experimental_toToolResultContent: (result) => {	  return typeof result === 'string'	    ? [{ type: 'text', text: result }]	    : [{ type: 'image', data: result.data, mimeType: 'image/png' }];  },});const result = await generateText({  model: anthropic('claude-3-5-sonnet-20241022'),  prompt: 'Move the cursor to the center of the screen and take a screenshot',  tools: { computer: computerTool },});
```

You can combine these tools with the AI SDK's [`maxSteps`](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling#multi-step-calls) feature to enable more sophisticated workflows. By setting a `maxSteps` value, the model can make multiple consecutive tool calls without user intervention, continuing until it determines the task is complete. This is particularly powerful for complex automation tasks that require a sequence of different operations:

```
const result = await generateText({  model: anthropic('claude-3-5-sonnet-20241022'),  prompt: 'Summarize the AI news from this week.',  tools: { computer: computerTool, textEditor: textEditorTool, bash: bashTool },  maxSteps: 10,});
```

Note that Anthropic computer use is currently in beta, and it's recommended to [implement appropriate safety measures](https://sdk.vercel.ai/docs/guides/computer-use#security-measures) such as using virtual machines and limiting access to sensitive data when building applications with this functionality. To learn more, check out our [computer use guide](https://sdk.vercel.ai/docs/guides/computer-use).

## [Link to heading](#continuation-support)Continuation support

Many AI applications—from writing long-form content to generating code—require outputs that exceed the generation limits of language models. While these models can understand large amounts of content in their context window, they're typically limited in how much they can generate in a single response.

To address this common challenge, AI SDK 4.0 introduces [continuation support](https://sdk.vercel.ai/docs/ai-sdk-core/generating-text#generating-long-text), which detects when a generation is incomplete (i.e. when the finish reason is “length”) and continues the response across multiple steps, combining them into a single unified output. With continuation support, you can:

-   Generate text beyond standard output limits
    
-   Maintain coherence across multiple generations
    
-   Automatically handle word boundaries for clean output
    
-   Track combined token usage across steps
    

This feature works across all providers and can be used with both [`generateText`](https://sdk.vercel.ai/docs/ai-sdk-core/generating-text#generatetext) and [`streamText`](https://sdk.vercel.ai/docs/ai-sdk-core/generating-text#streamtext) by enabling the `experimental_continueSteps` setting. Here's an example of generating a long-form historical text:

```
import { generateText } from 'ai';import { openai } from '@ai-sdk/openai';const result = await generateText({  model: openai('gpt-4o'),  maxSteps: 5,  experimental_continueSteps: true,  prompt:    'Write a book about Roman history, ' +    'from the founding of the city of Rome ' +    'to the fall of the Western Roman Empire. ' +    'Each chapter MUST HAVE at least 1000 words.',});
```

When using continuation support with `streamText`, the SDK ensures clean word boundaries by only streaming complete words. Both `generateText` and `streamText` may trim trailing tokens from some calls to prevent whitespace issues.

## [Link to heading](#new-xai-grok-provider)New xAI Grok provider

The AI SDK now supports [x.AI](https://x.ai/) through a [new official provider](https://sdk.vercel.ai/providers/ai-sdk-providers/xai). To use the provider, install the package:

```
pnpm install ai @ai-sdk/xai
```

You can then use the provider with all AI SDK Core methods. For example, here's how you can use it with `generateText`:

```
import { xai } from '@ai-sdk/xai';import { generateText } from 'ai';const { text } = await generateText({  model: xai('grok-beta'),  prompt: 'Write a vegetarian lasagna recipe for 4 people.',});
```

For more information, please see the [AI SDK xAI provider documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/xai).

## [Link to heading](#additional-provider-updates)Additional provider updates

We've expanded our provider support to offer more options and improve performance across the board:

-   [Cohere](https://sdk.vercel.ai/providers/ai-sdk-providers/cohere): v2 support and added tool calling capabilities, expanding supported functionality
    
-   [OpenAI](https://sdk.vercel.ai/providers/ai-sdk-providers/openai): [Predicted output support](https://sdk.vercel.ai/providers/ai-sdk-providers/openai#predicted-outputs), enabling more accurate and context-aware completions. Added [prompt caching support](https://sdk.vercel.ai/providers/ai-sdk-providers/openai#prompt-caching) for improved performance and efficiency
    
-   [Google Generative AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai) & [Vertex AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-vertex): Support for [file inputs](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai#file-inputs), fine-tuned models, schemas, tool choice, and frequency penalty. Added [text embedding support to Vertex AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-vertex#embedding-models)
    
-   [Amazon Bedrock](https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock): Introduces support for [Amazon Titan embedding models](https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock#embedding-models)
    
-   [Groq](https://sdk.vercel.ai/providers/ai-sdk-providers/groq): Adds first-party Groq provider, replacing previous OpenAI-compatible provider
    
-   [xAI Grok](https://sdk.vercel.ai/providers/ai-sdk-providers/xai): Adds first-party xAI Grok provider, replacing previous OpenAI-compatible provider
    
-   [LM Studio](https://sdk.vercel.ai/providers/openai-compatible-providers/lmstudio), [Baseten](https://sdk.vercel.ai/providers/openai-compatible-providers/baseten), [Together AI](https://sdk.vercel.ai/providers/openai-compatible-providers/togetherai): Adds OpenAI-compatible providers
    

## [Link to heading](#updated-chatbot-template)Updated chatbot template

The [Next.js AI Chatbot template](https://chat.vercel.ai/) has been updated, incorporating everything we've learned from building [v0](https://v0.dev/chat) and the latest framework advances. Built with [Next.js 15](https://nextjs.org/blog/next-15), React 19, and [Auth.js 5](https://authjs.dev/), this new version represents the most comprehensive starting point for production-grade AI applications.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3VUtX3HkcC4W5NRb6T1lnB%2Fdb61dad23a3a53d1e0425a029c5c5b6f%2FScreenshot_2024-11-05_at_8.04.13_PM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fof6pHepNv70icp29mfQS6%2Fd5224de941da931f8ad9f56c8091a8fe%2FCleanShot_2024-11-07_at_16.20.34_2x.png&w=1920&q=75)

The template ships with production-ready features, including a redesigned UI with model switching, persistent PostgreSQL storage, and [much more](https://github.com/vercel/ai-chatbot?tab=readme-ov-file#features). It showcases powerful patterns for generative UI and newer variations of the chat interface with interactive workspaces (like [v0 blocks](https://v0.dev/docs#blocks)) that allow you to integrate industry specific workflows and tools to design hybrid AI-user collaborative experiences.

[Try the AI Chatbot demo](https://chat.vercel.ai/) to see these features in action or [deploy your own instance](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot&env=AUTH_SECRET,OPENAI_API_KEY&envDescription=Learn%20more%20about%20how%20to%20get%20the%20API%20Keys%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot%2Fblob%2Fmain%2F.env.example&demo-title=AI%20Chatbot&demo-description=An%20Open-Source%20AI%20Chatbot%20Template%20Built%20With%20Next.js%20and%20the%20AI%20SDK%20by%20Vercel.&demo-url=https%3A%2F%2Fchat.vercel.ai&stores=%5B%7B%22type%22:%22postgres%22%7D,%7B%22type%22:%22blob%22%7D%5D) to start building sophisticated AI applications with battle-tested patterns and best practices.

## [Link to heading](#migrating-to-ai-sdk-4.0)Migrating to AI SDK 4.0

AI SDK 4.0 includes breaking changes that remove deprecated APIs. We've made the migration process easier with automated migration tools. You can run our automated codemods to handle the bulk of the changes.

For a detailed overview of all changes and manual steps that might be needed, refer to our [AI SDK 4.0 migration guide](https://sdk.vercel.ai/docs/migration-guides/migration-guide-4-0). The guide includes step-by-step instructions and examples to ensure a smooth update.

## [Link to heading](#getting-started)**Getting started**

With new features like PDF, computer use, and the new xAI Grok provider, there's never been a better time to start building AI applications with the AI SDK.

-   **Start a new AI project**: Ready to build something new? Check out our [**latest guides**](https://sdk.vercel.ai/docs/guides)
    
-   **Explore our templates**: Visit our [**Template Gallery**](https://sdk.vercel.ai/docs/introduction#templates) to see the AI SDK in action
    
-   **Join the community**: Share what you're building in our [**GitHub Discussions**](https://github.com/vercel/ai/discussions)
    

## [Link to heading](#contributors)Contributors

AI SDK 4.0 is the result of the combined work of our core team at Vercel ([Lars](https://x.com/lgrammel), [Jeremy](https://x.com/jrmyphlmn), [Walter](https://x.com/shaper), and [Nico](https://x.com/nicoalbanese10)) and many community contributors. Special thanks for contributing merged pull requests:

[minpeter](https://github.com/minpeter), [hansemannn](https://github.com/hansemannn), [HarshitChhipa](https://github.com/HarshitChhipa), [skull8888888](https://github.com/skull8888888), [nalaso](https://github.com/nalaso), [bhavya3024](https://github.com/bhavya3024), [gastonfartek](https://github.com/gastonfartek), [michaeloliverx](https://github.com/michaeloliverx), [mauhai](https://github.com/mauhai), [yoshinorisano](https://github.com/yoshinorisano), [Saran33](https://github.com/Saran33), [K-Mistele](https://github.com/K-Mistele), [MrHertal](https://github.com/MrHertal), [h4r5h4](https://github.com/h4r5h4), [tonyfarney](https://github.com/tonyfarney).

Your feedback and contributions are invaluable as we continue to evolve the AI SDK.x