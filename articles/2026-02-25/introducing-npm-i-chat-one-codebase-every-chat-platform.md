---
title: "Introducing npm i chat – One codebase, every chat platform"
source: "https://vercel.com/changelog/chat-sdk"
publishedDate: "2026-02-23"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Feb 23, 2026

Building chatbots across multiple platforms traditionally requires maintaining separate codebases and handling individual platform APIs.

Today, we're open sourcing the new [**Chat SDK**](https://chat-sdk.dev/) in public beta. It's a unified TypeScript library that lets teams write bot logic once and deploy it to Slack, Microsoft Teams, Google Chat, Discord, GitHub, and Linear.

The event-driven architecture includes type-safe handlers for mentions, messages, reactions, button clicks, and slash commands. Teams can build user interfaces using JSX cards and modals that render natively on each platform.

The SDK handles distributed state management using pluggable adapters for Redis, ioredis, and in-memory storage.

```
import { Chat } from "chat";import { createSlackAdapter } from "@chat-adapter/slack";import { createRedisState } from "@chat-adapter/state-redis";const bot = new Chat({  userName: "mybot",  adapters: {    slack: createSlackAdapter(),  },  state: createRedisState(),});bot.onNewMention(async (thread) => {  await thread.subscribe();  await thread.post("Hello! I am listening to this thread.");});
```

A simple example of Chat instance with a Slack adapter and Redis state that responds to new mentions.

You can post messages to any provider with strings, objects, ASTs and even JSX!

```
import { Card, CardText, Actions, Button } from "chat";await thread.post(  <Card title="Order #1234">    <CardText>Your order has been received!</CardText>    <Actions>      <Button id="approve" style="primary">Approve</Button>      <Button id="reject" style="danger">Reject</Button>    </Actions>  </Card>);
```

Chat SDK `post()` functions accept an AI SDK text stream, enabling real-time streaming of AI responses and other incremental content to chat platforms.

```
import { ToolLoopAgent } from "ai";const agent = new ToolLoopAgent({  model: "anthropic/claude-4.6-sonnet",  instructions: "You are a helpful assistant.",});bot.onNewMention(async (thread, message) => {  const result = await agent.stream({ prompt: message.text });  await thread.post(result.textStream);});
```

The framework starts with the core `chat` package and scales through modular platform adapters. Guides are available for building a Slack bot with Next.js and Redis, a Discord support bot with Nuxt, a GitHub bot with Hono, and automated code review bots.

Explore the [documentation](https://chat-sdk.dev/docs) to learn more.

Looking for the chatbot template? It's now [here](https://chatbot.ai-sdk.dev/).