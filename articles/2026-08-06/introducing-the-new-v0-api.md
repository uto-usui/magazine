---
title: "Introducing the new v0 API"
source: "https://vercel.com/blog/introducing-the-new-v0-api"
publishedDate: "2026-08-05"
category: "frontend"
feedName: "Vercel"
author: "Esteban Suárez"
---

Today we're introducing the new [v0 API](https://v0.app/docs/api): programmatic, headless access to v0's app-building agent. Send a prompt and [v0](https://v0.app/) generates an app, starts a dev server in a [Vercel Sandbox](https://vercel.com/sandbox), and gives you a preview URL you can embed in your own UI.

Each chat is an isolated workspace for one app, where v0 can read, edit, and run the files. Follow-up messages continue from the current state. v0 verifies the code running in the Sandbox, so it can catch and fix errors in your app in real time.

The new API is now generally available.

## [Copy link to heading](#how-it-works)How it works

Create a chat from a prompt, stream its work, and render the live preview, all from your own interface. First, install the v0 SDK.

```
pnpm add v0@latest
```

Then, create a chat. Send a prompt, and v0 generates your app.

```
import { v0 } from 'v0' const result = await v0.chats.create({   message: 'Build an issue triage app for a support team.', }) if (result.error) {   throw new Error(result.error.message) } const chatId = result.data.chat.id
```

Create a chat and keep its ID for every later request.

Send follow-up messages to the same chat to keep building. Each one continues from the current state.

```
const message = await v0.messages.send({   chatId,   message: 'Add a priority filter and an assignee column.', }) if (message.error) {   throw new Error(message.error.message) }
```

Send a follow-up; v0 edits the existing app in place.

Then embed the app.

```
<iframe src="/api/v0-preview/chat_abc123/" />
```

Embed the app by pointing an iframe at your proxy route.

A prompt goes in, a running app comes out. v0 operates the Sandbox, dev server, and preview behind it. When you're ready, deploy to Vercel in one API call. v0 manages the whole pipeline.

## [Copy link to heading](#what-this-unlocks)What this unlocks

The new API lets you run v0's app builder inside your own product or pipeline. This opens use cases like:

-   **A white-labeled app builder:** Your users describe an app and get one back.
    
-   **Automated app changes:** Trigger v0 from a script, CI job, or webhook to generate a new app or update an existing one.
    
-   **A build tool for your agents:** An agent hands back a working app instead of a code snippet.
    

Below, we break down the API primitives behind this workflow.

## [Copy link to heading](#start-with-a-chat)Start with a chat

Each chat holds the state for one app, and a repo or Vercel project can have many. Keep each chat's ID and send its follow-up messages to that chat. Metadata lets you group chats by customer, workspace, app, or any key you already use.

Learn more about [messages](https://v0.app/docs/api/v2/reference/messages/get-message).

## [Copy link to heading](#stream-the-trace)Stream the trace

Your interface needs to show what happens between sending a request and seeing the updated preview.

Every message includes ordered `parts`: text, thinking, file reads and edits, searches, bash commands, tool calls, and agent actions. The same object can drive a one-line status, a changed-files view, or the full trace.

```
const stream = await v0.messages.sendStream({   chatId: 'chat_abc123',   message: 'Add authentication and explain the files you changed.', }) for await (const update of stream.stream) {   console.log(update.parts)   if (update.usage) {     console.log(update.usage)   } }
```

Stream a message's work; each update is a full snapshot of parts.

Usage is returned with chat and message responses, so you can account for the work when it finishes.

## [Copy link to heading](#choose-sync,-async,-or-streaming)Choose sync, async, or streaming

Chat creation and messages support synchronous, asynchronous, and streaming responses. Use sync when the caller needs the completed response. Use async to queue the work and receive updates via [webhook](https://v0.app/docs/api/v2/reference/webhooks/create-webhook) or poll for v0's response later. Stream the request to render v0's work as it happens.

```
const message = 'Build an issue triage app for a support team.' // Wait for the completed response. const completed = await v0.chats.create({ message }) if (completed.error) {   throw new Error(completed.error.message) } // Queue work and use the returned IDs to retrieve the result later. const queued = await v0.chats.createAsync({ message }) if (queued.error) {   throw new Error(queued.error.message) } console.log(queued.data.chatId, queued.data.messageId) // Receive the agent's work as it happens. const stream = await v0.chats.createStream({ message })
```

Create a chat three ways: await, queue, or stream the same prompt.

## [Copy link to heading](#work-from-existing-code)Work from existing code

You can also create a chat from a repository, ZIP archive, or set of files.

```
const result = await v0.chats.createFromRepo({   repo: {     url: 'https://github.com/acme/app',     branch: 'main',   },   title: 'Acme app',   metadata: {     source: 'github',   }, }) if (result.error) {   throw new Error(result.error.message) } const chatId = result.data.chat.id console.log(chatId)
```

Create a chat from an existing repo.

## [Copy link to heading](#render-the-dev-server-preview)Render the dev server preview

Each chat gets a short-lived preview token. Fetch it from a server route and proxy browser requests through it, so your v0 API key never reaches the browser. When a preview is ready, traffic forwards to it; while the Sandbox spins up, requests fall back to a loading route. Point an iframe at your proxy route and cache the preview details until they expire.

```
import { fetchPreview, v0 } from 'v0' export async function proxyPreviewRequest(   request: Request,   chatId: string,   path: string[], ) {   const result = await v0.chats.getPreview({ chatId })   if (result.error) {     throw new Error(result.error.message)   }   return fetchPreview({     request,     preview: result.data,     path,     fallbackUrl: `/api/v0-preview/${chatId}/loading`,   }) }
```

Proxy preview requests through a server route.

Read more about [Accessing Previews](https://v0.app/docs/api/v2/guides/accessing-previews) in the docs.

## [Copy link to heading](#bring-your-own-tools-and-design-systems)Bring your own tools and design systems

Turn on specific MCP servers for a chat, or use the defaults.

[Design Systems 2.0](https://v0.app/docs/design-systems-2) saves a design system as a skill. Include it in a request to load its components, tokens, setup, and starter app.

```
const designSystem = {   type: 'memory',   scope: 'team',   skillName: 'geist-ui', } const result = await v0.chats.create({   message: 'Build an admin console with filters and charts.',   skills: [     designSystem,   ], })
```

Create a chat with a design system loaded as a skill.

You can pass up to three skills per request, from team or user memory, [skills.sh](https://www.skills.sh/), or the connected repo, or let the agent pull them in for you.

## [Copy link to heading](#use-v0-from-agents)Use v0 from agents

If you're building an agent, give it v0 as a tool. When the agent needs to produce a working app, it calls v0, and gets back a running preview or deployment to hand to the user. Your agent stays in charge of everything else.

There are three ways to connect it:

### [Copy link to heading](#mcp)MCP

Connect the v0 MCP server to an IDE, desktop assistant, or agent runtime that supports MCP.

```
{   "mcpServers": {     "v0": {       "url": "https://v0.app/api/mcp"     }   } }
```

The v0 server entry for your MCP client.

The first connection starts an OAuth flow. The MCP server exposes tools for creating chats, listing chats, getting chat details, listing and sending messages, resolving pending tasks, and getting preview URLs.

### [Copy link to heading](#ai-sdk)AI SDK

For TypeScript agents built with [AI SDK](https://ai-sdk.dev/), use `@v0-sdk/ai-tools` to expose v0's API operations as tools in the agent's own loop.

```
pnpm add @v0-sdk/ai-tools ai @ai-sdk/openai
```

Install the v0 tools with the AI SDK and a provider.

```
import { openai } from '@ai-sdk/openai' import { generateText, stepCountIs } from 'ai' import { v0ToolsByCategory } from '@v0-sdk/ai-tools' const { chats, messages } = v0ToolsByCategory() const result = await generateText({   model: openai('gpt-5.5'),   system: `Use v0 for creating and modifying web apps. Continue an existing v0 chat when a chat ID is available.`,   prompt: 'Build a customer insights app with charts.',   tools: {     ...chats,     ...messages,   },   stopWhen: stepCountIs(10), })
```

Give an AI SDK agent v0's chat and message tools.

The agent decides when to create or continue a chat. Your AI SDK run keeps control of the orchestration and final response.

### [Copy link to heading](#eve)eve

For [eve](https://vercel.com/eve) agents, add an OpenAPI connection file. eve turns the allowed operations into tools and attaches the API key at execution time, out of model context.

```
import { defineOpenAPIConnection } from 'eve/connections' export default defineOpenAPIConnection({   spec: 'https://api.v0.dev/v2/openapi/json',   baseUrl: 'https://api.v0.dev/v2',   description:     'Build and iterate on web apps with v0. Reuse one v0 chat per app-building task.',   auth: {     getToken: async () => ({ token: process.env.V0_API_KEY! }),   },   operations: {     allow: [       'chats_create',       'messages_send',       'messages_resolve',       'chats_getPreview',     ],   }, })
```

Register v0 as an eve connection, allow-listing its operations.

## [Copy link to heading](#connect-a-vercel-project)Connect a Vercel project

Create a Vercel project for the chat, then manage its environment variables, integrations, and settings through the Vercel API. Your apps get Vercel's [security](https://vercel.com/security) and [observability](https://vercel.com/products/observability) by default.

```
const result = await v0.chats.createVercelProject({   chatId: 'chat_123', }) if (result.error) {   throw new Error(result.error.message) } const vercelProjectId = result.data.vercelProjectId
```

Attach a Vercel project to a chat.

When you're ready to ship, deploy the chat to Vercel.

```
const result = await v0.chats.deploy({ chatId }) if (result.error) {   throw new Error(result.error.message) } const { deploymentId, vercelProjectId } = result.data
```

Ship the chat to Vercel.

## [Copy link to heading](#migrate-your-chats)Migrate your chats

Chats from the previous version of the v0 API don’t run on the new one, so carry them forward. Pick the version you want to keep, download it as a ZIP, and create a new chat from that ZIP. Store the old identifiers in the new chat’s metadata if you need traceability.

The [migration guide](https://v0.app/docs/api/v2/guides/migrating-from-v1-to-v2) covers the full mapping. The main changes:

-   Use `https://api.v0.dev/v2` for new requests.
    
-   The chat holds current app state, and messages hold its history.
    
-   Replace version workflows with chat file workflows, and v0 Project organization with chat metadata.
    
-   Use `vercelProjectId` plus the Vercel API for project operations.
    
-   Render message `parts`, not only final text.
    

## [Copy link to heading](#get-started)Get started

Create an API key in v0 settings and install the SDK.

```
pnpm add v0@latest
```

Or, scaffold a full app.

```
pnpm create v0-sdk-app@latest my-v0-app
```

Read the [documentation](https://v0.app/docs/api) and [migration guide](https://v0.app/docs/api/v2/guides/migrating-from-v1-to-v2).

[

**Build your first app-generation interface with the v0 API.**

Read the quickstart guide to go from a prompt to a running app in your own UI.

Get Started



](https://v0.app/docs/api/v2/quickstart)