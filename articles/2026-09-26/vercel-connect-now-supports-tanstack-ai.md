---
title: "Vercel Connect now supports TanStack AI"
source: "https://vercel.com/changelog/vercel-connect-tanstack-ai"
publishedDate: "2026-09-24"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Agents built with TanStack AI can now call OAuth-protected MCP servers through Vercel Connect, with no credentials for you to store or rotate.

The new `@vercel/connect/tanstack-ai` subpath exports `connectMCPTransport`, which takes a TanStack transport config and attaches a Connect-backed auth provider. The provider is called before every MCP request, so the token is always fresh.

```
import { chat, toServerSentEventsResponse } from '@tanstack/ai';import { createMCPClient } from '@tanstack/ai-mcp';import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';import {  connectMCPTransport,  getConsentChallenge,} from '@vercel/connect/tanstack-ai';export async function POST(request: Request) {  const { messages } = await request.json();  const userId = await getUserId(request);  try {    const linear = await createMCPClient({      transport: connectMCPTransport(        { type: 'http', url: 'https://mcp.linear.app/mcp' },        'oauth/linear',        { subject: { type: 'user', id: userId } },      ),    });    const stream = chat({      adapter: vercelGatewayText('anthropic/claude-opus-5'),      messages,      mcp: { clients: [linear] },    });    return toServerSentEventsResponse(stream);  } catch (err) {    const challenge = getConsentChallenge(err);    if (challenge) return Response.redirect(challenge.url, 303);    throw err;  }}
```

Connect a Linear MCP client with a per-user token and redirect to consent when needed.

If the user has not granted access, `createMCPClient` fails with a consent challenge before the model runs. Catch it with `getConsentChallenge` and redirect to Connect's consent URL. Otherwise, a consent error raised within a tool call would reach the model as an error string rather than the user as a redirect.

Read the [TanStack AI integration docs](https://vercel.com/docs/connect/frameworks/tanstack-ai) to get started, or see the full list of [supported frameworks and adapters](https://vercel.com/docs/connect/frameworks) for Vercel Connect.