---
title: "Build custom Slack runtimes"
source: "https://vercel.com/changelog/build-custom-slack-runtimes"
publishedDate: "2026-06-02"
category: "frontend"
feedName: "Vercel"
author: "Josh Singh"
---

1 min read

Jun 2, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F63EiU4p14P6lqQR4j4wVe6%2F008095db41d9d0b7e2a154f6f81dab0c%2FChat_SDK_-_Slack.png&w=1920&q=75)

Chat SDK now ships the [Slack adapter](https://chat-sdk.dev/adapters/official/slack)'s primitives as standalone imports for apps that already handle their own routing, state, or workflow execution.

Use only what you need:

-   Request verification and payload parsing (`@chat-adapter/slack/webhook`)
    
-   Markdown formatting (`@chat-adapter/slack/format`)
    
-   Fetch-based Web API calls (`@chat-adapter/slack/api`)
    
-   Block Kit conversion (`@chat-adapter/slack/blocks`)
    

Each subpath skips the full `Chat` runtime, so your imports stay clean.

lib/bot.ts

```
import { readSlackWebhook } from "@chat-adapter/slack/webhook";import { postSlackMessage } from "@chat-adapter/slack/api";export async function POST(request: Request) {  const payload = await readSlackWebhook(request, {    signingSecret: process.env.SLACK_SIGNING_SECRET!,  });  if (payload.kind === "app_mention") {    await postSlackMessage({      channel: payload.continuation.channelId,      markdownText: `received: ${payload.text}`,      token: process.env.SLACK_BOT_TOKEN!,    });  }  return new Response(null, { status: 200 });}
```

Verifying a webhook and posting a reply with the low-level subpaths.

To get started, read the [Slack primitives](https://chat-sdk.dev/docs/slack-primitives) documentation.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)