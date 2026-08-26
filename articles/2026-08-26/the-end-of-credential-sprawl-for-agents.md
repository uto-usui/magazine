---
title: "The end of credential sprawl for agents"
source: "https://vercel.com/blog/the-end-of-credential-sprawl-for-agents"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Hedi Zandi"
---

Every useful agent reaches beyond your codebase. It posts to Slack, opens pull requests, queries Snowflake, or calls an internal API. That reach is what makes it valuable, and it's also where the risk lives, because for years, granting it meant provisioning a long-lived token and hoping it never leaked.

[Vercel Connect](https://vercel.com/connect) replaces long-lived tokens with ones your code requests at runtime, scoped to the task and expiring on their own.

During the [public beta](https://vercel.com/blog/introducing-vercel-connect), we've grown the ecosystem past 100 connectors, unified how they work, and added the governance capabilities teams need in production.

Today, Vercel Connect is generally available.

![Connect to 100+ services through secure, scoped tokens](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FJFSxVrGmjul6VdBkbLc9S%2F9786ea84925b74de4c0462364e69207e%2FConnects_blog_white_background_3b__1_.png&w=1920&q=95)![Connect to 100+ services through secure, scoped tokens](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7xdYGBO2WxFGKt2lIjoNsE%2Fc5d72e9605ba371243c9686d0301832a%2FConnectors_Blog_Dark_2b__1_.png&w=1920&q=95)

Connect to 100+ services through secure, scoped tokens

## [Copy link to heading](#vaults-don't-fix-long-lived-tokens)Vaults don't fix long-lived tokens

Managing credentials has become its own workload. Teams write rotation scripts, copy secrets across environments, and share tokens between users. Putting a token in a vault made it harder to steal, but no less dangerous once stolen. It never expires, and no vault limits what a leaked credential can do.

Agents compounded the problem by touching more systems with greater autonomy, more often. Yet the tools to contain a secret haven't changed.

With Vercel Connect, your app never stores credentials. It requests one:

-   You register a connector once for a provider like Slack, GitHub, Snowflake, Shopify, or your own OAuth service
    
-   You attach it to the projects and environments that need it
    
-   Your code requests a token at runtime, and it refreshes automatically
    
-   Your app has no provider secret to commit by accident
    

```
vercel connect create slack --name acme-slack
```

Create a Slack connector named acme-slack

```
import { getToken } from '@vercel/connect';const token = await getToken('slack/acme-slack', {  subject: { type: 'app' },});
```

Request an app-level Slack token

Requesting a token doesn't require another secret. Every deployment on Vercel carries an [OIDC identity](https://vercel.com/docs/oidc), and the SDK uses it to prove who's asking.

## [Copy link to heading](#what-changes-when-access-becomes-a-request)What changes when access becomes a request

The difference shows up in the properties of the credential:

**Property**

**Stored token**

**Vercel Connect**

Lifetime

Never expires

Short-lived, refreshed automatically

Reach

Everything the agent could need

Scoped to the task in the request

Identity

One shared bot for every user

App or a specific named user

Rotation

Mint, update copies, redeploy

None to perform

Revocation

Rotate and redeploy

One command, per user or all tokens

Credentials that used to sit in environments long after the work finished now expire on their own. Nothing lingers for an attacker to find.

> Minting short-lived tokens instead of keeping provider credentials in paused sandboxes has removed a whole class of security risk for us.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/7KVPOc1R4gVL9JRJbmTWK8/d3b1a85ccefe5e6c07c2cd7ff9b88602/image.png)
> 
> Fraser Brown BuildPass

Scoping happens per request. One step of an agent might read a repository, the next opens an issue, and each asks for only that.

How fine-grained a token can be depends on the service, and GitHub is the clearest example. Requests can restrict a token to a single repository with read-only permissions, rather than trusting a standing grant organization-wide.

The open-source [GitHub Tools SDK](https://github-tools.com/guide/vercel-connect) puts this into practice. Choose a preset like `code-review`, and it mints tokens with only the required scopes.

Identity is per request as well. Tokens act as the app by default, but pass a named user as the `subject` and the token acts on their behalf, scoped to what they authorized during a one-time consent flow.

## [Copy link to heading](#connectors-for-the-services-you-already-use)Connectors for the services you already use

Vercel Connect now ships with 100+ preset connectors for developer tools and SaaS providers like Notion, Shopify, and Workday, as well as managed connectors for Slack, GitHub, Linear, Salesforce, and more.

Your own services follow the same model via custom OAuth and API Key authentication, and any OAuth-capable MCP server can serve as a connector.

Finding and creating them is faster, too. Browse the [full catalog](https://vercel.com/connect/browse) on the Vercel website, create a connector in fewer steps, and manage everything from the dashboard, CLI, or API.

> Vercel Connect allowed us to quickly deploy new AI agents and channel integrations to our teams, while saving us the time and headache of rolling our own secure token management.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/5IlQZLA5FZyoua4nUCRMgL/49bd1d0d00f368986e4092e40bc4d0a7/image.png)
> 
> Pat Dunn EF World Journeys USA

## [Copy link to heading](#governance-that-scales-with-your-team)Governance that scales with your team

Teams adopting Vercel Connect need more than scoped tokens. They need to control who manages connectors and to track how access is used.

GA adds three capabilities:

-   Fine-grained RBAC controls who can create and manage connectors
    
-   Audit logs record authorization and connector activity
    
-   Token and trigger observability shows usage across projects
    

Together with per-environment attachment and one-command revocation, access becomes something you can inspect and prove.

When an auditor asks who had access to a system and when, the answer is a query against the audit log, not an investigation across projects and Slack threads.

## [Copy link to heading](#wherever-your-agents-run)Wherever your agents run

Vercel Connect is available wherever you and your users are:

-   Custom Environments are supported, so a `qa` environment gets its own connector alongside production, preview, and development
    
-   [eve](https://eve.dev/) supports Connect out of the box, with connections declared per agent
    
-   [Chat SDK support](https://chat-sdk.dev/docs/vercel-connect) brings the same model to conversational apps
    

### [Copy link to heading](#build-connected-apps-in-v0)Build connected apps in v0

Apps and agents built in [v0](https://v0.app/docs/vercel-connect) use the same model.

Tell v0 which service your app needs, and it sets up the connector during the build. Slack, GitHub, and other managed connectors need nothing on the provider's side, and since tokens are minted at runtime, the generated app has no secret to keep.

The KERNEL team shipped a [voice-driven browser agent](https://x.com/DanielPrevoznik/status/2088598328007078174) this way:

> v0 handles all the auth wiring with Connect, so instead of getting stuck managing API keys, I could just let anyone bring their own AI Gateway and KERNEL access via OAuth and start playing.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/2GvCRs86nQSdwxn4jVliGh/ab3d18c8bc623b561b0fb24e7f8e96c8/npc4kw4a_400x400.jpg)
> 
> Danny Prevoznik KERNEL

## [Copy link to heading](#events-flow-in,-without-a-secret-either)Events flow in, without a secret either

Requesting tokens is half the picture. Your agent also needs to hear about events.

Triggers handle this without putting a secret back in your app. When a user posts in Slack, the provider sends the event to Vercel Connect. It verifies the signature server-side, re-attests the event with an OIDC identity, and forwards it to your project. Forwarded events arrive even with Deployment Protection enabled.

Your app has no bot token to act with and no signing secret to verify webhooks, yet the full loop still runs.

Moonpig Group runs its internal legal agent on this loop in production:

> We're using Connect in production today. Our internal legal agent handles Slack, Jira, and Google Drive through Connect, so we don't manage tokens, secrets, or event subscriptions ourselves.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/4qictL13OwmGd5fWhSEFwS/48b8ad8042b654a2009ba4d7bfb70eb6/image.png)
> 
> Jorian Kalse Moonpig Group

## [Copy link to heading](#built-around-a-single-call)Built around a single call

Underneath everything is `getToken` from the [Vercel Connect SDK](https://vercel.com/docs/connect/ts-sdk-reference).

Whether your agent is built on eve or the AI SDK, runs as a background job in Vercel Workflows, or is a loop you wrote yourself, it asks for a credential the same way.

Around that call, adapters handle the wiring:

-   `@vercel/connect/eve` supplies the credentials behind an agent's connections
    
-   `@vercel/connect/chat` hooks Connect into [Chat SDK adapters](https://chat-sdk.dev/adapters)
    
-   `@vercel/connect/betterauth` and `@vercel/connect/authjs` produce provider configs for Better Auth and Auth.js
    
-   `@vercel/connect/ai-sdk` and `@vercel/connect/mcp` do the same for AI SDK tools and MCP clients, whether your agent calls tools directly or through a server
    

For eve agents and Chat SDK applications, the two secrets a Slack integration usually keeps in your environment, `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET`, are gone from your app entirely.

## [Copy link to heading](#pricing-and-availability)Pricing and availability

Vercel Connect is available on all plans, with pricing based on token requests and trigger events. The Hobby plan includes 500 token requests and 1,000 triggers per month at no additional cost. Pro plans are billed at $3 per 1,000 token requests and $0.95 per 1,000 triggers, with custom pricing on Enterprise.

If you used Vercel Connect during the beta, your current billing terms stay unchanged until September 25, 2026, when the updated pricing takes effect.

## [Copy link to heading](#get-started)Get started

-   Deploy a [software factory template with Vercel Connect](https://vercel.fyi/eve-software-factory) or [browse the source](https://github.com/vercel-labs/eve-software-factory-template)
    
-   Follow the [quickstart guide](https://vercel.com/docs/connect) in the documentation or read the [changelog](https://vercel.com/changelog/vercel-connect-ga)
    
-   Hand the prompt below to your coding agent to set up Vercel Connect: