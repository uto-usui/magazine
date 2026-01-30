---
title: "Vercel collaborates with OpenAI for GPT-5 launch"
source: "https://vercel.com/blog/vercel-collaborates-with-openai-for-gpt-5-launch"
publishedDate: "2025-08-07"
category: "frontend"
feedName: "Vercel"
author: "Aparna Sinha"
---

4 min read

Aug 7, 2025

The GPT-5 family of models, released today, is now available through [AI Gateway](https://vercel.com/ai-gateway/models/gpt-5) and in production on [v0.dev](https://v0.dev/). Thanks to OpenAI, Vercel has been testing these models over the past few weeks in v0, Next.js, AI SDK, and [Vercel Sandbox.](https://vercel.com/docs/vercel-sandbox)

From our testing, GPT-5 is noticeably better at frontend design than previous models. It generates polished, balanced UIs with clean, composable code. Internally, we’ve already started using GPT-5 for Vercel's in-dashboard Agent and for [v0.dev/gpt-5](https://v0.dev/gpt-5). GPT-5 shows strong performance in agent-based workflows. We have been impressed with it's long-context reasoning and ability to handle multiple tools in parallel have been especially effective in powering Vercel Agent.

### [Link to heading](#how-we're-using-gpt-5-in-production-with-v0)How we're using GPT-5 in production with v0

We evaluated GPT-5 as part of v0's composite model architecture, and it consistently impressed us. Its code quality matches or exceeds the best models available, and its frontend sensibilities stand out. It creates well-structured UIs from short prompts, often better than older models even with prompt tuning.

The smaller GPT-5 variants, mini and nano, also excel in low-latency delivery and their consistency. They’re already in use for our speed-sensitive codegen workloads, and perform well across tool calling and generation tasks.

To demonstrate what’s possible with GPT-5 on our AI infrastructure, we’ve built two interactive environments you can immediately get your hands on to put it to the test.

### [Link to heading](#see-for-yourself)See for yourself

The first, is a dedicated model playground within Gateway itself. Every model can be tested, for free, including GPT-5, and gpt-oss-20b, and gpt-oss-120b released earlier this week, with a simple chat interface that lets you put it to the test. From the same page you grab the model string, pop it into AI SDK, and begin using it with AI Gateway's higher rate limits, performance and reliability, and built-in observability.

[

**GPT-5 Playground**

Try GPT-5 on AI Gateway instantly, with no setup or install necessary. Open the playground and start prompting.

Try GPT-5



](https://vercel.com/gpt-5)

Second, we are sharing a new open-source vibe-coding platform built on the [Vercel AI Cloud](https://vercel.com/blog/the-ai-cloud-a-unified-platform-for-ai-workloads) that uses GPT-5 and other models to generate real applications, from prompt to live preview. This platform shows what’s possible not just with GPT-5, but with our end-to-end AI infrastructure that many production AI apps rely on today.

We’re essentially open-sourcing a v0\-like app that you can clone, customize, and build on. An open-source code-generation platform, that shows the full flow: you enter a prompt, responses stream in as code is generated, and a live preview spins up in a secure sandbox.

[

**Now open source: Vibe coding platform**

The Vibe Coding Platform is a new open-source app that combines GPT-5 and Vercel AI infrastructure so anyone can build apps that build apps. Under the hood it uses AI SDK, AI Gateway, Vercel Functions, Sandbox, BotID, and more.

See the Platform



](https://vercel.fyi/vibe-coding-platform)

The model handles reasoning, file creation, dependency installation, and shell commands. Everything runs in an isolated environment that’s safe to use in production.

Prompt handling is powered by [Fluid compute](https://vercel.com/fluid) on [Vercel Functions](https://vercel.com/docs/functions), with code execution handled by the sandbox. The entire stack is built for speed, security, and extensibility.

### [Link to heading](#building-an-open-source-vibe-coding-platform-with-gpt-5-and-vercel-ai-cloud)Building an open-source vibe coding platform with GPT-5 and Vercel AI Cloud

The vibe coding platform’s frontend is built with Next.js and AI SDK. Setup only takes a few lines of code.

When a user submits a message, the `sendMessage` API is triggered. Both the prompt and selected model, which defaults to GPT-5, are sent to the backend. Once deployed to Vercel, the framework-defined infrastructure determines the right resources to serve the frontend quickly through the Vercel CDN and handle API calls with Vercel Functions.

The backend is a simple function running on Fluid compute, optimized for prompt-based workloads. Since AI calls often involve idle time while the model is reasoning, Fluid compute can reallocate those cycles to serve other requests or avoid charging for unused CPU.

```
const result = streamText({  model: "openai/gpt-5",  system: prompt,  messages,  stopWhen: stepCountIs(20),  tools});
```

The API call is powered by AI SDK. It receives the full message history, verifies the user with [Vercel BotID](https://vercel.com/docs/botid), and forwards the request. Specifying the model as a string automatically uses AI Gateway, which removes the need to manage separate API keys.

As responses start streaming back from the model, the code is executed inside a freshly provisioned sandbox. This environment is stateless, isolated, and expires after a short timeout. It has no access to your projects or data, making it safe to run arbitrary code.

The sandbox streams real-time updates back to the frontend. As commands run in the backend, the frontend reflects their progress instantly:

```
{  type: "data-run-command",  data: {    status: "done",    sandboxId: "sbx_123",    command: "npm install",    commandId: "cmd_abc",  }}
```

This approach keeps the UI responsive and transparent without waiting for the full task chain to complete.

Finally, it's important with potentially high-value API calls to mitigate abuse with sophisticated bot protection powered by [BotID](https://vercel.com/docs/botid) and rate limiting with Vercel Firewall.

## [Link to heading](#get-started-with-gpt-5-via-ai-gateway)Get started with GPT-5 via AI Gateway

```
import { streamText } from 'ai'const result = streamText({  model: "openai/gpt-5",  prompt: "why is the sky blue?" })
```

The vibe coding platform lets you compare all three GPT-5 models: main, mini, and nano. You can also evaluate models from other providers side by side.

## [Link to heading](#use-v0.dev,-or-build-your-own)Use v0.dev, or build your own

[v0.dev](https://v0.dev/) now offers GPT-5 as an available model for improved UI generation, and this platform shows you how to build your own version from scratch.

Whether you're scaffolding backend APIs, generating infrastructure as code, or building fullstack starter kits, the system gives you a clear and repeatable pattern you can use in production.

All components, AI Gateway, AI SDK, Sandbox, and BotID are part of the Vercel AI Cloud. They are designed to work on their own or as part of a complete stack. Everything runs at the Edge and can be integrated into existing applications.

## [Link to heading](#get-started)Get started

Clone the vibe coding platform, change the model, swap in your own tools, or connect it to a database. The infrastructure is in place to support it.

-   [Explore the code](https://github.com/vercel/examples/tree/main/apps/vibe-coding-platform) on GitHub
    
-   Learn more about [AI Gateway](https://vercel.com/gpt-5)
    

[Vercel AI Cloud](https://vercel.com/ai) is designed for developers shaping how software is created; building with models, not just using them.