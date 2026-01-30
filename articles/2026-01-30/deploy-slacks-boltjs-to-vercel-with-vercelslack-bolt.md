---
title: "Deploy Slack's Bolt.js to Vercel with @vercel/slack-bolt"
source: "https://vercel.com/changelog/build-slack-agents-with-vercel-slack-bolt"
publishedDate: "2025-08-27"
category: "frontend"
feedName: "Vercel"
author: "Matt Lewis"
---

1 min read

Aug 27, 2025

We've published [`@vercel/slack-bolt`](https://www.npmjs.com/package/@vercel/slack-bolt), our official adapter for deploying Slack's [Bolt for JavaScript](https://docs.slack.dev/tools/bolt-js/) to Vercel's AI Cloud.

Bolt provides a type-safe library for responding to Slack webhook events. However, Slack's API requires a response within three seconds or users are faced with timeouts. This has made it hard to build Slack agents on traditional serverless platforms.

Our adapter uses [Fluid compute’s](https://vercel.com/fluid) streaming and `waitUntil` to acknowledge responses within Slack’s deadline while your agent continues working in the background.

api/slack/events.ts

```
import { App } from "@slack/bolt";import { generateText } from "ai";import { VercelReceiver, createHandler } from "@vercel/slack-bolt";const receiver = new VercelReceiver();const app = new App({  token: process.env.SLACK_BOT_TOKEN,  signingSecret: process.env.SLACK_SIGNING_SECRET,  receiver,  deferInitialization: true,});// listening to Slack messagesapp.event("message", async ({ say, message }) => {  const { text } = await generateText({    model: "openai/gpt-5",    prompt: `Respond to the user's message: ${message.text}`,  });  // responding to Slack  await say(text);});export const POST = createHandler(app, receiver);
```

Listen to Slack messages and respond using the AI SDK

This adapter works with any function or framework using the Web API Request object such as Hono, Nitro or Next.js.

[

**Slack Agent Template**

Deploy your Slack agent on Vercel's AI Cloud

Deploy Now



](https://vercel.com/templates/ai/slack-agent-template)

Get started with our [Slack Agent Template](https://vercel.com/templates/ai/slack-agent-template) today or [visit the library on npm](https://www.npmjs.com/package/@vercel/slack-bolt).