---
title: "Build your own AI app builder with the v0 Platform API"
source: "https://vercel.com/blog/build-your-own-ai-app-builder-with-the-v0-platform-api"
publishedDate: "2025-07-23"
category: "frontend"
feedName: "Vercel"
author: "Chris Tate"
---

2 min read

Jul 23, 2025

Learn how to build, extend, and automate AI-generated apps with programmatic access to v0’s app generation pipeline

The [v0 Platform API](https://v0.dev/docs/v0-platform-api) is a text-to-app API that gives developers direct access to the same infrastructure powering [v0.dev](https://v0.dev/).

Currently in [beta](https://vercel.com/changelog/v0-platform-api-now-in-beta), the platform API exposes a composable interface for developers to automate building web apps, integrate code generation into existing features, and build new products on top of LLM-generated UIs.

## [Link to heading](#what-is-the-v0-platform-api)What is the v0 Platform API?

The Platform API is a REST interface that wraps v0’s full code generation lifecycle: prompt → project → code files → deployment. Every app built with the platform API is backed by a [v0.dev](https://v0.dev/) chat link.

It includes endpoints for almost all functionality on v0.dev:

-   **Natural language app generation:** Generate full-stack web apps from natural language prompts and get back parsed code files and a live demo URL
    
-   **Bring your own context:** Start chats with your own files, from source code, git, or shadcn registry, or include attachments in individual messages
    
-   **Projects and deployments:** Create new Vercel projects, link Vercel projects to a chat, and trigger deploys
    

## [Link to heading](#how-to-use-the-v0-platform-api)How to use the v0 Platform API

The [v0 SDK](https://github.com/vercel/v0-sdk) is a TypeScript library that makes it simple to interact with the v0 Platform API.

```
pnpm install v0-sdk
```

Get your API key from your [v0 account settings](https://v0.dev/chat/settings/keys) and set it as an environment variable:

.env

```
V0_API_KEY=your_api_key_here
```

Now, you can integrate v0's AI-powered code generation into your application. Learn more in our complete [Quickstart Guide](https://v0.dev/docs/v0-platform-api/quickstart).

```
import { v0 } from "v0-sdk"export default async function V0Chat() {    // No initialization needed - uses V0_API_KEY automatically    const chat = await v0.chats.create({    message: "Build a todo app with React and TypeScript"  })  // Access the generated files  chat.files?.forEach((file) => {    console.log(`File: ${file.name}`)    console.log(`Content: ${file.content}`)  })  // Use the Demo URL in an iframe  return (    <iframe      src={chat.demo}      width="100%"      height="600">    </iframe>  )}
```

## [Link to heading](#what-can-you-build-with-the-platform-api)What can you build with the Platform API?

The Platform API turns v0 into a headless app builder. Developers are already using it to power:

-   Website builders where users can describe a site and get production-ready code
    
-   Slack and Discord bots that return deployed web applications
    
-   VSCode plugins and CLIs that build around the prompt-to-app workflow
    
-   Embedded flows in analytics or CRM tools that generate UI components from natural language
    
-   Custom dev environments and agents that read user intent and return live apps with demo links
    

## [Link to heading](#get-started)Get started

Check out the [v0 Platform API template](https://vercel.com/templates/ai/v0-platform-api-demo), a Next.js application demonstrating the v0 Platform API and features like project management, chat history, and real-time app generation with live previews.