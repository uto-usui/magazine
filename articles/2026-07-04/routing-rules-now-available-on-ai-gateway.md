---
title: " Routing rules now available on AI Gateway"
source: "https://vercel.com/changelog/ai-gateway-routing-rules"
publishedDate: "2026-07-02"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Vercel AI Gateway](https://vercel.com/docs/ai-gateway) now supports [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules).

Routing rules are firewall-style rules that control which models your team can use, applied at the gateway level instead of in your application code.

When a model goes down or gets retired, you usually have to ship a code change to move off it. With routing rules, you push one rule and every request reroutes instantly. There are two types:

Rules apply to every request made with your team's AI Gateway credentials. You manage them with the [Vercel CLI](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules#manage-rules-with-the-cli).

### [Copy link to heading](#rewrite)Rewrite

Create a rewrite with a source and a destination model. The Gateway swaps in the destination transparently, so your application keeps requesting the source model:

```
vercel ai-gateway rules add --type rewrite \  --source anthropic/claude-opus-4.8 \  --destination anthropic/claude-haiku-4.5
```

### [Copy link to heading](#deny)Deny

Create a deny rule to block a model. Requests for it return a `403`:

```
vercel ai-gateway rules add --type deny --source openai/gpt-5.5
```

Rules only change which model serves a request. Everything else you’ve configured still applies to the destination model, including:

Routing rules are in beta. For more information, read the [routing rules docs](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules).