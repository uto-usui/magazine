---
title: "Vercel Connect is now generally available"
source: "https://vercel.com/changelog/vercel-connect-ga"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Hedi Zandi"
---

[Vercel Connect](https://vercel.com/connect) is now generally available on all plans and in [v0](https://v0.app/docs/vercel-connect). Instead of storing long-lived provider secrets, your code requests short-lived, scoped tokens at runtime. Deployments authenticate with their existing Vercel OIDC identity. Each token is scoped to the task, refreshed automatically, and expires on its own.

![Connect to 100+ services through secure, scoped tokens](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FJFSxVrGmjul6VdBkbLc9S%2F9786ea84925b74de4c0462364e69207e%2FConnects_blog_white_background_3b__1_.png&w=1920&q=95)![Connect to 100+ services through secure, scoped tokens](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7xdYGBO2WxFGKt2lIjoNsE%2Fc5d72e9605ba371243c9686d0301832a%2FConnectors_Blog_Dark_2b__1_.png&w=1920&q=95)

Connect to 100+ services through secure, scoped tokens

## [Copy link to heading](#any-service-with-one-command)Any service with one command

Register a connector [once from the CLI](https://vercel.com/changelog/vercel-cli-100-services). Pass the service name and the CLI pre-populates the brand name, icon, auth type, and MCP or discovery URL, then prompts for any credentials the service requires:

```
vercel connect create slack --name acme-slack
```

Create a Slack connector named acme-slack

Connect ships with [100+ preset connectors](https://vercel.com/changelog/vercel-connect-preset-connectors) for tools like [Notion](https://vercel.com/connect/notion) and [Workday](https://vercel.com/connect/workday), managed connectors for [Slack](https://vercel.com/connect/slack), [GitHub](https://vercel.com/connect/github), [Linear](https://vercel.com/connect/linear), [Salesforce](https://vercel.com/connect/salesforce), [Snowflake](https://vercel.com/connect/snowflake), and [Microsoft](https://vercel.com/connect/microsoft), plus generic OAuth, API key authentication, and MCP servers.

## [Copy link to heading](#tokens-at-runtime,-not-secrets-at-rest)Tokens at runtime, not secrets at rest

Request a token only when your code needs one, with `getToken`:

```
import { getToken } from '@vercel/connect';const token = await getToken('slack/acme-slack', {  subject: { type: 'app' },});
```

Request an app-level Slack token

Switch the `subject` from the app to a named user and the token acts on that user's behalf, triggering the authorization flow when consent is needed.

## [Copy link to heading](#access-your-team-can-inspect-and-prove)Access your team can inspect and prove

New at GA:

-   **Fine-grained RBAC** controls who can create and manage connectors
    
-   **Audit logs** record authorization and connector activity
    
-   [**Token and trigger observability**](https://vercel.com/changelog/vercel-connect-adds-observability-support) shows how tokens are used across projects
    

Together with per-environment attachment, including [Custom Environments](https://vercel.com/changelog/vercel-connect-now-supports-custom-environments), and one-command revocation, external access becomes something your team can inspect, prove, and cut off in seconds.

## [Copy link to heading](#triggers-without-stored-webhook-secrets)Triggers without stored webhook secrets

Triggers deliver provider events to your app without a stored secret. Vercel Connect verifies signatures server-side, re-attests each event using an OIDC identity, and forwards the event to your project, even when Deployment Protection is enabled.

Connect also manages private keys and the full credential lifecycle, so you get standards-compliant OAuth without building the infrastructure yourself.

## [Copy link to heading](#works-with-your-stack)Works with your stack

Connect works wherever your functions run and is supported in v0, eve, and Chat SDK. Adapters are available for the auth libraries and agent tooling you already use:

-   **Better Auth**: `@vercel/connect/betterauth`
    
-   **Auth.js**: `@vercel/connect/authjs`
    
-   **AI SDK**: `@vercel/connect/ai-sdk`
    
-   **MCP clients**: `@vercel/connect/mcp`
    
-   [**eve**](https://eve.dev/integrations): `@vercel/connect/eve`
    
-   [**Chat SDK**](https://chat-sdk.dev/docs/vercel-connect): `@vercel/connect/chat`
    

### [Copy link to heading](#securely-connect-your-ai-sdk-agents-to-mcp-servers)Securely connect your AI SDK agents to MCP servers

The AI SDK adapter authenticates MCP clients with tokens minted at runtime. In this example, the agent gets read-only Linear access issued for a single user, so downstream actions carry that user's identity:

```
import { createMCPClient } from '@ai-sdk/mcp';import { connectAuthProvider } from '@vercel/connect/ai-sdk';import { streamText } from 'ai';const mcpClient = await createMCPClient({  transport: {    type: 'http',    url: 'https://mcp.linear.app',    authProvider: connectAuthProvider('oauth/linear', {      subject: { type: 'user', id: userId },      scopes: ['read'],    }),  },});const result = await streamText({  model: 'openai/gpt-5.6-sol',  tools: await mcpClient.tools(),  prompt,});
```

### [Copy link to heading](#give-your-github-agents-only-the-access-they-need)Give your GitHub agents only the access they need

[GitHub Tools](https://github-tools.com/guide/vercel-connect), our open source tool layer for GitHub agents, plugs into eve through Connect via an [eve extension](https://vercel.com/changelog/vercel-connect-support-in-github-tools). Presets like `code-review` map to Connect scopes automatically, so tokens carry only the permissions the toolset needs:

```
import githubExtension from '@github-tools/eve-extension';export default githubExtension({  connector: 'github/my-connector',  preset: 'code-review',});
```

## [Copy link to heading](#pricing-and-availability)Pricing and availability

Vercel Connect is available on all plans, with pricing based on token requests and trigger events. Hobby includes 500 token requests and 1,000 triggers per month at no additional cost. Pro is billed at $3 per 1,000 token requests and $0.95 per 1,000 triggers, with custom pricing on Enterprise.

## [Copy link to heading](#get-started)Get started

-   Deploy a [software factory template with Vercel Connect](https://vercel.fyi/eve-software-factory) or [browse the source](https://github.com/vercel-labs/eve-software-factory-template)
    
-   Follow the [quickstart guide](https://vercel.com/docs/connect) in the documentation or read the [launch blog post](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents)
    
-   Hand the prompt below to your coding agent to set up Vercel Connect: