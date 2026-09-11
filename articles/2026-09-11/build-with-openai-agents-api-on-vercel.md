---
title: "Build with OpenAI Agents API on Vercel"
source: "https://vercel.com/changelog/build-with-openai-agents-api-on-vercel"
publishedDate: "2026-09-10"
category: "frontend"
feedName: "Vercel"
author: "Anshuman Bhardwaj"
---

You can now build and deploy long-running, tool-using agents with the [OpenAI Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview) on Vercel. OpenAI manages the agent loop and session state, while Vercel hosts the application and connects each session to [Vercel Sandbox](https://vercel.com/docs/sandbox) for code execution and file access.

With this integration, you get:

-   An OpenAI-managed agent loop and session state
    
-   Reliable Sandbox creation and reconnection through signed OpenAI webhooks and [Vercel Queues](https://vercel.com/docs/queues)
    
-   An isolated execution environment for every agent session
    
-   A persistent workspace that retains files across follow-up instructions
    
-   A scale-to-zero architecture without an always-on worker
    

Follow the [step-by-step guide](https://vercel.com/kb/guide/openai-agents-api-vercel) to build and deploy an agent, or explore the [sample application](https://github.com/vercel-labs/openai-agents-api-vercel).