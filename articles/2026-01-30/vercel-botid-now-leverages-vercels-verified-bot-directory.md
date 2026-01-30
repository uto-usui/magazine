---
title: "Vercel BotID now leverages Vercel's verified bot directory"
source: "https://vercel.com/changelog/vercel-botid-now-leverages-vercels-verified-bot-directory"
publishedDate: "2025-08-12"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

1 min read

Aug 12, 2025

Starting in `botid@1.5.0`, [BotID’s Deep Analysis mode](https://vercel.com/docs/botid#how-botid-deep-analysis-works) provides authenticated information for verified bots based on Vercel's [directory of known and verified bots](https://bots.fyi/). This allows developers to detect verified bots in real time and make programmatic decisions based on bot identity.

This allows you to securely allow known bots that are good for your business (such as agentic bots that purchase on behalf of users) while blocking other bots and sophisticated abuse.

[BotID](https://vercel.com/blog/introducing-botid) is an invisible CAPTCHA that classifies sophisticated bots without interrupting real users. With this update, developers using Deep Analysis now get additional context about the bot itself, such as source IP range, reverse DNS, and user-agent validation, helping teams fine-tune how bots are handled before taking action.

app/api/checkout/route.ts

```
import { checkBotId } from "botid/server";export async function POST(request: Request) {  const botResult = await checkBotId();  const { isBot, verifiedBotName, isVerifiedBot, verifiedBotCategory } = botResult;  // Check if it's ChatGPT Operator  const isOperator = isVerifiedBot && verifiedBotName === "chatgpt-operator";  if (isBot && !isOperator) {    return Response.json({ error: "Access denied" }, { status: 403 });  }  // ... rest of your handler  return Response.json(botResult);}
```

Example of allowing ChatGPT-Operator access

Get started with [BotID](https://vercel.com/docs/botid) and check out the [documentation for verified bots](https://vercel.com/docs/botid/verified-bots) in BotID.