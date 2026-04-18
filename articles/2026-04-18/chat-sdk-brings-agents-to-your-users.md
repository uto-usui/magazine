---
title: "Chat SDK brings agents to your users"
source: "https://vercel.com/blog/chat-sdk-brings-agents-to-your-users"
publishedDate: "2026-03-19"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

9 min watch

Mar 19, 2026

In early January, we gave the entire company a challenge: figure out how to multiply your output.

People created agents. Mostly chat bots, but dedicated ones, purpose-built for real workflow augmentation: the agents were doing things automatically that would otherwise be tedious and time consuming.

Initially people built individual interfaces for their agents, and AI SDK made that easy with out-of-the box model integrations and AI Elements to simplify UI design.

Then we hit a constraint. People wanted to interact with the agents in Slack, meaning everyone had to figure out how to integrate with Slack's API.

Then the problem got worse. Once the agents were in Slack, people wanted to integrate them with even more platforms, like Discord, Github, and even issue trackers like Linear. Each of those introduced a new integration adventure for every agent.

It hit us. Instead of asking people to come to agents, we needed to deliver agents to the places they were already working.

#### [Link to heading](#chat-needs-integration-abstraction)Chat needs integration abstraction

We realized we had made it easy for our teams to create agents, but we needed to make it easier to extend them for adoption across platforms.

This is true for every company. People are already using Microsoft Teams, WhatsApp, Telegram, and Google Chat, and agents need to be available in all of them.

That's exactly what the Chat SDK does: makes agents available across enterprise and consumer chat platforms.

Just like the AI SDK unified model provider APIs into a single interface, we built Chat SDK to abstract the quirks of messaging APIs into a simple framework for developers and their coding agents.

```
import { streamText } from "ai";const result = await streamText({  model: "anthropic/claude-opus-4.6", // swap out the provider  prompt: "Hello world",});
```

AI SDK abstracts away individual provider logic, making provider and model changes a simple string change.

Developers no longer need to think about the way streaming might differ from one platform to the next, or how formatting, branching logic, or even reaction-handling should be tackled for individual APIs.

## [Link to heading](#write-once,-deploy-everywhere)Write once, deploy everywhere

Chat SDK is a TypeScript library for building bots that work across Slack, Microsoft Teams, Google Chat, Discord, Telegram, GitHub, and Linear from a single codebase. The core `chat` package handles event routing and application logic. Platform-specific behavior is handled by adapters, so your handlers don't change when your deployment target does.

Here's what a basic bot looks like:

```
import { Chat } from "chat";import { createSlackAdapter } from "@chat-adapter/slack";import { createRedisState } from "@chat-adapter/state-redis";const bot = new Chat({  userName: "mybot",  adapters: {    slack: createSlackAdapter(),  },  state: createRedisState(),});bot.onNewMention(async (thread) => {  await thread.subscribe();  await thread.post("Hello! I'm listening to this thread now.");});bot.onSubscribedMessage(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Each adapter auto-detects credentials from environment variables, so you can get started without any additional configuration. Switching from Slack to Discord means swapping the adapter, not rewriting the bot.

## [Link to heading](#platform-inconsistencies,-handled)Platform inconsistencies, handled

Platforms behave very differently from each other, and Chat SDK doesn't paper over those differences with false promises. Instead, it handles them in the adapter layer so your application code doesn't have to.

Take streaming. Slack has a native streaming path that renders bold, italic, lists, and other formatting in real time as the response arrives. Other platforms use a fallback streaming path, passing streamed text through each adapter's markdown-to-native conversion pipeline at each intermediate edit.

Before Chat SDK, those adapters received raw markdown strings, so users on Discord or Teams would see literal `**bold**` syntax until the final message resolved. Now that conversion happens automatically.

Table rendering follows the same pattern. The `Table()` component gives you a composable API for rendering tables across every adapter. Pass in headers and rows, and Chat SDK figures out the rest. Slack renders Block Kit table blocks. Teams and Discord use GFM markdown tables. Google Chat uses monospace text widgets. Telegram converts tables to code blocks. GitHub and Linear continue to use their existing markdown pipelines.

```
import { Table } from "chat";await thread.post(  <Table    headers={["Name", "Status", "Region"]}    rows={[      ["api-prod", "healthy", "iad1"],      ["api-staging", "degraded", "sfo1"],    ]}  />);
```

Cards, modals, and buttons work similarly.

You write the element once using JSX, and each adapter renders them in whatever format the platform supports natively. If a platform doesn't support a given element, it will fall back gracefully.

## [Link to heading](#why-chat-sdk-matters-even-for-single-platforms)Why Chat SDK matters even for single platforms

Even if your agent only targets Slack, Chat SDK still solves real problems. Channel and user names are automatically converted to clear text so your agent understands the context of the conversation.

This translation works in both directions. When the agent at-mentions somebody using clear text, Chat SDK ensures the notification actually triggers in Slack.

Agents require full context to be effective. Chat SDK automatically includes link preview content, referenced posts, and images directly in agent prompts. Additionally, while models generate standard markdown, Slack does not natively support it.

Chat SDK converts standard markdown to the Slack variant automatically. This conversion happens in real time, even when using Slack's native append-only streaming API.

## [Link to heading](#ai-streaming,-built-in)AI streaming, built in

The `post()` function accepts an AI SDK text stream directly, which means you can pipe a streaming LLM response to any chat platform without any additional wiring:

```
import { streamText } from "ai";bot.onNewMention(async (thread) => {  await thread.subscribe();  const result = await streamText({    model: "anthropic/claude-sonnet-4",    prompt: "Summarize what's happening in this thread.",  });  await thread.post(result.textStream);});
```

The adapter layer handles the platform-specific rendering of that stream, including live formatting where the platform supports it.

## [Link to heading](#state-that-scales)State that scales

Thread subscriptions, distributed locks, and key-value cache state are handled through pluggable state adapters. Redis and ioredis have been available since launch. PostgreSQL is now supported as a production-ready option, so teams already running Postgres can persist bot state without adding Redis to their infrastructure.

```
import { createPostgresState } from "@chat-adapter/state-postgres";import { createSlackAdapter } from "@chat-adapter/slack";import { Chat } from "chat";const bot = new Chat({  userName: "mybot",  adapters: {    slack: createSlackAdapter(),  },  state: createPostgresState(),});
```

The PostgreSQL adapter uses `pg` (node-postgres) with raw SQL and automatically creates the required tables on first connect. It supports TTL-based caching, distributed locking across multiple instances, and namespaced state via a configurable key prefix. Community contributor [@bai](https://github.com/bai) laid the groundwork in [PR #154](https://github.com/vercel/chat/pull/154).

## [Link to heading](#whatsapp,-and-beyond)WhatsApp, and beyond

Chat SDK now supports WhatsApp, extending the write-once model to one of the largest messaging platforms in the world.

The WhatsApp adapter supports messages, reactions, auto-chunking, read receipts, multi-media downloads (images, voice messages, stickers), and location sharing with Google Maps URLs. Cards render as interactive reply buttons with up to three options, falling back to formatted text where needed.

```
import { createWhatsAppAdapter } from "@chat-adapter/whatsapp";import { Chat } from "chat";const bot = new Chat({  userName: "mybot",  adapters: {    whatsapp: createWhatsAppAdapter(),  },  state: createRedisState(),});bot.onNewMention(async (thread) => {  await thread.post("Hello from WhatsApp!");});
```

Note that WhatsApp enforces a 24-hour messaging window, so bots can only respond within that period. The adapter does not support message history, editing, or deletion. Community contributor [@ghellach](https://github.com/ghellach) laid the groundwork in [PR #102](https://github.com/vercel/chat/pull/102).

## [Link to heading](#getting-started)Getting started

To augment your coding agents, install the Chat skill:

```
npx skills add vercel/chat
```

This gives your agent access to Chat SDK's documentation, patterns, and best practices so it can help you build bots against the SDK.

And you can also modify and use this starter prompt:

Migrate this agent to the Vercel Chat SDK, consolidating all platform-specific logic (Slack, Discord, GitHub, etc.) into a single unified implementation where core behavior is defined once and adapters handle platform differences. Remove duplicated integration logic and refactor to a clean “write once, deploy everywhere” architecture using Chat SDK as the abstraction layer. Use best practices from: npx skills add vercel/chat.

The [Chat SDK documentation](https://chat-sdk.dev/docs) covers getting started, platform adapter setup, state configuration, and guides for common patterns including a Slack bot with Next.js and Redis, a Discord support bot with Nuxt, and a GitHub code review bot with Hono.

Chat SDK is open source and in public beta. The agents your team has been building don't have to live on just one platform. They can go where your users actually are.