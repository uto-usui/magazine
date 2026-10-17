---
title: "MCP Events support in Vercel Connect is now in public beta"
source: "https://vercel.com/changelog/mcp-events-support-in-vercel-connect-is-now-in-public-beta"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Allen Zhou"
---

[Vercel Connect](https://vercel.com/connect) now supports MCP Events in public beta, allowing your apps and agents to subscribe to webhook events from compatible MCP servers. Build agents for tasks like summarizing new messages, reviewing newly created issues, or responding to document feedback.

Connect creates subscriptions on the MCP server and renews them automatically as needed, verifying the server’s webhooks and forwarding events to your application using authenticated delivery.

You can use the Connect SDK to subscribe to MCP events:

lib/subscribe-to-issues.ts

```
import { experimental_subscribe } from '@vercel/connect/mcp';// Use a new key for each subscription.// Reuse it when retrying the same request.export async function subscribeToIssues(idempotencyKey: string) {  return experimental_subscribe('oauth/issues', {    tokenParams: { subject: { type: 'app' } },    name: 'issue.created',    arguments: { project_id: 'ABC' },    destination: { path: '/hooks' },    ttlMs: 24 * 60 * 60 * 1000,    idempotencyKey,  });}
```

Requesting a 24-hour subscription to issue events

At your delivery endpoint, use the SDK to verify that each delivery came from Connect before acknowledging receipt:

app/hooks/route.ts

```
import { experimental_verifyMcpEvent } from '@vercel/connect/mcp';export async function POST(request: Request) {  await experimental_verifyMcpEvent(request, { path: '/hooks' });  return new Response(null, { status: 204 });}
```

Verifying incoming deliveries in a Next.js route

You can also expose [AI SDK](https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-events#managed-subscriptions) event discovery and subscription APIs as agent tools, using Connect’s MCP Events adapter to manage subscriptions.

In [eve](https://eve.dev/docs/connections/mcp), enabling events on an MCP connection gives agents tools to discover the server’s events and use Connect to create, inspect, or stop subscriptions.

Read the [MCP Events docs](https://vercel.com/docs/connect/mcp-events) and [Vercel Connect quickstart](https://vercel.com/docs/connect/quickstart) for SDK setup and authentication.