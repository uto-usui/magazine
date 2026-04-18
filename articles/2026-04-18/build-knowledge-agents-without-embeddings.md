---
title: "Build knowledge agents without embeddings"
source: "https://vercel.com/blog/build-knowledge-agents-without-embeddings"
publishedDate: "2026-03-19"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

5 min read

Mar 19, 2026

Deploy an agent with Vercel Sandbox, Chat SDK, and AI SDK

Most knowledge agents start the same way. You pick a vector database, then build a chunking pipeline. You choose an embedding model, then tune retrieval parameters.

Weeks later, your agent answers a question incorrectly, and you have no idea which chunk it retrieved or why that chunk scored highest.

We kept seeing this pattern internally and for teams building agents on Vercel. The embedding stack works for semantic similarity, but it falls short when you need a specific value from structured data. The failure mode is silent: the agent confidently returns the wrong chunk, and you can't trace the path from question to answer.

That's why we tried something different. We replaced our vector pipeline with a filesystem and gave the agent `bash`. Our [sales call summarization agent](https://vercel.com/blog/how-to-build-agents-with-filesystems-and-bash) went from ~$1.00 to ~$0.25 per call, and the output quality improved. The agent was doing what it already knew how to do: read files, run `grep`, and navigate directories.

So we open-sourced the [Knowledge Agent Template](https://vercel.com/templates/template/chat-sdk-knowledge-agent), a production-ready version of this architecture built on Vercel.

## [Link to heading](#what-the-template-does)What the template does

The Knowledge Agent Template is an open source, file-system-based agent you can fork, customize, and deploy. Plug any source: GitHub repos, YouTube transcripts, documents (e.g., markdown files), or custom APIs. Ship it as a web chat app, a GitHub bot, a Discord bot, or all three at once.

The template is built on [Vercel Sandbox](https://vercel.com/sandbox), [AI SDK](https://ai-sdk.dev/), and [Chat SDK](https://chat-sdk.dev/). Deploy to Vercel in a single click, configure your sources, and start answering questions.

## [Link to heading](#file-based-search-with-vercel-sandbox)File-based search with Vercel Sandbox

No vector database. No chunking pipeline. No embedding model.

Your agent uses `grep`, `find`, and `cat` inside of isolated [Vercel Sandboxes](https://vercel.com/docs/vercel-sandbox/run-commands-in-sandbox).

**Here's how it works:**

1.  You add sources through the admin interface, and they're stored in Postgres
    
2.  Content syncs to a snapshot repository via [Vercel Workflow](https://vercel.com/docs/workflow)
    
3.  When the agent needs to search, a Vercel Sandbox loads the [snapshot](https://vercel.com/docs/vercel-sandbox/concepts/snapshots)
    
4.  The agent's `bash` and `bash_batch` tools execute file-system commands
    
5.  The agent returns an answer with optional references
    

Results are deterministic, explainable, and fast. When the agent gives a wrong answer, you open the trace and see: it ran `grep -r "pricing" docs/`, read `docs/plans/enterprise.md`, and pulled the wrong section. You fix the file or adjust the agent's search strategy. The whole debugging loop takes minutes.

Compare that to vectors. If the agent returns a bad chunk, you have to determine which chunk it retrieved, then figure out why it scored 0.82 and the correct one scored 0.79. The problem could be the chunking boundary, the embedding model, or the similarity threshold. With filesystem search, there is no guessing why it picked that chunk and no tuning retrieval scores in the dark. You're debugging a question, not a pipeline.

**Embeddings**

**Filesystem**

Black-box scoring

Transparent commands

Hard to debug

Inspect actual files

Requires tuning

Works out of the box

LLMs already understand filesystems. They've been trained on massive amounts of code: navigating directories, grepping through files, managing state across complex codebases. If agents excel at filesystem operations for code, they excel at them for anything. That's the insight behind the [filesystem and bash approach](https://vercel.com/blog/how-to-build-agents-with-filesystems-and-bash).

You're not teaching the model a new skill; you're using the one it's best at. No embedding pipeline to maintain or vector DB to scale. Add a source, sync, and search.

## [Link to heading](#chat-sdk:-one-agent,-every-platform)Chat SDK: one agent, every platform

Your agent has one knowledge base, one codebase, and one source of truth. Yet your engineers are scattered across Slack, your community spread across Discord, your bug reports buried in GitHub. A single agent that understands all three.

Chat SDK connects your knowledge agent to every platform your users are on. Import the adapters you need, point each one to the same agent pipeline, and your agent is live in any Chat SDK-supported platform.

**Chat SDK Knowledge Agent example**

Each adapter handles platform-specific concerns (e.g., authentication, event formats, messaging) while the agent itself stays unchanged. `onNewMention` fires whenever the bot is mentioned, regardless of platform. The agent receives the message text, streams a response through the same filesystem-backed pipeline, and posts back to the thread.

```
import { Chat } from "chat";import { createSlackAdapter } from "@chat-adapter/slack";import { createDiscordAdapter } from "@chat-adapter/discord";import { createRedisState } from "@chat-adapter/state-redis";const bot = new Chat({  userName: "knowledge-agent",  adapters: {    slack: createSlackAdapter(),    discord: createDiscordAdapter(),  },  state: createRedisState(),});bot.onNewMention(async (thread, message) => {  await thread.subscribe();  const result = await agent.stream({ prompt: message.text });  await thread.post(result);});
```

The template ships with GitHub and Discord adapters out of the box, and Chat SDK already supports Slack, Microsoft Teams, Google Chat, and more. See the [adapter directory](https://chat-sdk.dev/adapters) for a full list of official and community adapters.

## [Link to heading](#deep-integration-with-ai-sdk)Deep integration with AI SDK

The `@savoir/sdk` package provides tools that connect any AI SDK-powered agent or app to your knowledge base. Import the tools, point the client to your instance URL, and pass the tools to your agent to establish the connection.

If you plan to extend the SDK's capabilities and publish it, customize the package name from `@savoir/sdk` to your own.

```
import { generateText } from 'ai'import { createSavoir } from '@savoir/sdk'const savoir = createSavoir({  apiUrl: process.env.SAVOIR_API_URL!,  apiKey: process.env.SAVOIR_API_KEY,})const { text } = await generateText({  model: yourModel, // any AI SDK compatible model  tools: savoir.tools, // bash and bash_batch tools  maxSteps: 10,  prompt: 'How do I configure authentication?',})console.log(text)
```

The template also includes a smart complexity router. Every incoming question is classified by complexity and routed to the right model. Simple questions go to fast, cheap models. Hard questions go to powerful ones. Cost optimization happens automatically, with no manual rules.

Compatible with any AI SDK model provider via [Vercel AI Gateway](https://vercel.com/ai-gateway).

## [Link to heading](#built-in-admin-tools)Built-in admin tools

The template includes a full admin interface: usage stats, error logs, user management, source configuration, and content sync controls. No external observability needed.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7mfGm0LFQBVNvxxn8Qljwu%2F128646b8f4723f709926266229e4ee16%2Fimage.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6KECH19ef5v2boiaxDWPC0%2F5f536b49e33478cf4f871b50f30a8d34%2Fdark-desktop.png&w=1920&q=75)

There's also an AI-powered admin agent. You can ask it questions like: "what errors occurred in the last 24 hours", or "what are the common questions users ask". It will use internal tools (`query_stats`, `query_errors`, `run_sql`, and `chart`) to provide answers directly. You debug your agent _with_ an agent.

## [Link to heading](#get-started)Get started

You don't need a vector database, an embedding model, or a chunking pipeline to build a working knowledge agent. You need a filesystem, bash, and a way to put your agent where your users already are. Those are the primitives.

The Knowledge Agent Template wires them together so you can focus on what your agent knows rather than how it retrieves insights.

[

**Knowledge Agent Template**

Deploy the template to your Vercel team in a single click.

Deploy



](https://vercel.link/deploy-knowledge-agent-template)