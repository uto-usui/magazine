---
title: "Chat SDK now supports Vercel Connect"
source: "https://vercel.com/changelog/chat-sdk-vercel-connect"
publishedDate: "2026-07-08"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

You can now use [Vercel Connect](https://vercel.com/connect) to manage credentials for your [Chat SDK](https://chat-sdk.dev/) bots, with no tokens or signing secrets to store or rotate yourself.

The new `@vercel/connect/chat` subpath provides adapter helpers for Slack, GitHub, and Linear. Each helper takes a connector UID and returns a config you spread into the matching adapter factory.

lib/bot.ts

```
import { createSlackAdapter } from "@chat-adapter/slack";import { connectSlackAdapter } from "@vercel/connect/chat";export const adapter = createSlackAdapter({  ...connectSlackAdapter("slack/acme-slack"),});
```

Configure your Slack adapter with connectSlackAdapter from the Vercel Connect SDK

Outbound bot calls use a function-form token field backed by `getToken`, so each API request gets a fresh, short-lived token that Vercel Connect rotates for you.

Inbound [triggers](https://vercel.com/docs/connect/concepts/triggers) use a `webhookVerifier` that validates the OIDC token Connect attaches to forwarded events, eliminating the need for a `signingSecret`.

Read the [documentation](https://chat-sdk.dev/docs/vercel-connect) to set up your first connector with Chat SDK or follow the [knowledge base guide](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect) to build your own Slackbot with Vercel Connect.

**Vercel Connect is in beta and available on all plans.** Features and behavior, including available connectors and trigger forwarding, may change before general availability. Usage is subject to the [Beta Agreement](https://vercel.com/docs/release-phases/public-beta-agreement) and [Vercel Connect terms](https://vercel.com/docs/connect/legal).