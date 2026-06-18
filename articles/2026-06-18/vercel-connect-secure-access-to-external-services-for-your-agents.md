---
title: "Vercel Connect: Secure access to external services for your agents"
source: "https://vercel.com/changelog/vercel-connect-secure-access-to-external-services-for-your-agents"
publishedDate: "2026-06-17"
category: "frontend"
feedName: "Vercel"
author: "Dima Voytenko"
---

[Vercel Connect](https://vercel.com/connect) lets your apps and agents access external services like Slack, GitHub, Salesforce, and your own custom APIs without storing a long-lived provider secret in your environment. You register a connector once, and your code requests scoped, short-lived tokens at runtime, only when it needs them.

![Diagram of three agents (a Support Agent, a Code Review Agent, and a Data Analyst Agent) connecting through Vercel Connect to Slack, Linear, and Snowflake.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1i9Ba8UZlv3GRk3fUKgzW5%2F548ad7b33db56629e03e3822063b6741%2FConnect_imagery_-_light.png&w=1920&q=75)![Diagram of three agents (a Support Agent, a Code Review Agent, and a Data Analyst Agent) connecting through Vercel Connect to Slack, Linear, and Snowflake.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3UNGvCYEUyJvuPhwjKQVlC%2Ffc11d0e2eb0b39fc4f4d997ec70be145%2FConnect_imagery_-_dark.png&w=1920&q=75)

Each agent reaches its service through Vercel Connect, with its own scoped tokens and triggers.

You can create a connector from your dashboard or the Vercel CLI:

```
vercel connect create slack --name mybot
```

Create a Slack connector

Your agent can then request a token from it at runtime, only when it needs it. The SDK fetches and refreshes that token automatically, so there is no secret for you to store or rotate by hand:

app/api/agent/route.ts

```
import { getToken } from '@vercel/connect';const token = await getToken('slack/mybot', {  subject: { type: 'app' },});
```

Request a token at runtime

## [Link to heading](#scoped-tokens)Scoped tokens

Each token is scoped to the task in front of it, with granularity that depends on the provider. A GitHub token can be limited to a single repository and read-only, instead of your whole organization. An agent gets exactly the access a task needs, never broad standing access to everything.

app/lib/github-token.ts

```
const token = await getToken('github/mybot', {  subject: { type: 'app' },  authorizationDetails: [{    type: 'github_app_installation',    repositories: ['myorg/repo1'],    permissions: ['contents:read']  }],});
```

Scope a token to one repository, read-only

A token can also be tied to a specific user instead of the app. It then acts with that user's identity and inherits their permissions, so the agent can do only what that user is allowed to do:

```
vercel connect token slack/mybot --subject user
```

Request a token for a specific user

## [Link to heading](#isolation-and-revocation)Isolation and revocation

A connector only works in the environments you attach it to, so you can run separate connectors for development, preview, and production. This means if a token leaks in development, it cannot be used against production:

```
vercel connect attach slack/mybot --project my-app --environment production
```

Attach a connector to a single environment

Because access is issued as tokens, you can revoke it with a single command, either your own or every token a connector has issued across all users and installations:

```
vercel connect revoke-tokens slack/mybot --all-tokens
```

Revoke every token a connector has issued

## [Link to heading](#triggers)Triggers

Events can also flow from a provider to your app. With triggers enabled on a connector, Vercel Connect verifies the provider's incoming webhooks and forwards them to the projects you choose, so a new Slack message can reach an agent that acts on it. Triggers support Slack, GitHub, and Linear in Beta, and a connector can forward to up to three projects:

```
vercel connect attach slack/mybot --triggers
```

Forward verified Slack webhooks to a project

## [Link to heading](#connectors-and-adapters)Connectors and adapters

Dedicated connectors for Slack, GitHub, Linear, Discord, Notion, Salesforce, Figma, and Snowflake are available from the dashboard, along with generic OAuth and API key connectors, and you can create connectors for other services from the CLI, including MCP servers like `mcp.linear.app`. Vercel Connect also ships adapters for Better Auth, Auth.js, eve, the AI SDK, and MCP clients, so it works with the auth library and agent tooling you already use.

## [Link to heading](#get-started)Get started

Pricing is based on token requests. Hobby includes 5,000 per month at no additional cost, and Pro and Enterprise are billed at $3 per 10,000.

[Vercel Connect](https://vercel.com/connect) is now available in Public Beta. Read the [documentation](https://vercel.com/docs/connect), or have your coding agent set it up by installing the vercel-connect skill with `npx skills add vercel/vercel-plugin --skill vercel-connect`.

[

**Connect your first agent**

Your deployment proves its identity over OIDC and gets back a short-lived token, scoped to one task. Works with Slack, GitHub, Linear, and any OAuth MCP server.

Get started



](https://vercel.com/kb/vercel-connect)