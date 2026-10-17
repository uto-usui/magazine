---
title: "Vercel for Enterprise"
source: "https://vercel.com/blog/vercel-for-enterprise"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Jeanne Grosser"
---

AI adoption in the enterprise is growing rapidly, and expanding beyond engineering users.

In the last three months, token usage by enterprise companies on AI Gateway has quadrupled, and [OpenAI recently reported](https://cdn.openai.com/pdf/5d1e1489-21c0-43e4-9d42-f87efdbf0082/the-shift-to-agentic-ai-evidence-from-codex.pdf) that from August 2025 to June 2026, non-developer Codex users grew 189x.

Our customers call these builders citizen developers. They know their part of the business better than anyone else, and with AI they can create the software they need to ship work faster and deliver better customer experiences.

Building has never been easier, but that also means that control and governance have never been harder. Employees are using AI tools [whether they are approved or not](https://www.gartner.com/en/newsroom/press-releases/2025-11-19-gartner-identifies-critical-genai-blind-spots-that-cios-must-urgently-address0), and if a citizen developer vibe codes a login page incorrectly, private data can reach the public internet.

Enterprise leaders have to figure out how to let everyone build, without giving up security or control.

### [Copy link to heading](#enterprise-apps-and-agents)Enterprise Apps and Agents

We built Enterprise Apps and Agents to solve these challenges at Vercel, and in June, we [made it available](https://vercel.com/blog/vercel-for-enterprise-apps-and-agents) to our customers. Enterprise Apps and Agents is a central control plane for governing every builder, app, agent, token, and dollar.

Today, we are expanding the platform:

-   [**Bring Your Own Cloud**](https://vercel.com/changelog/bring-your-own-cloud-on-aws-is-now-generally-available) **(BYOC) on AWS** is generally available, giving you the full Vercel developer experience, while keeping compute and data inside your AWS boundary.
    
-   [**Enterprise-Managed Authorization**](https://vercel.com/changelog/vercel-connect-adds-enterprise-managed-authorization) through Vercel Connect is launching in public beta, giving agents the ability to access connected services on behalf of employees through your IdP.
    

## [Copy link to heading](#a-single-control-plane-for-governing-enterprise-ai)A single control plane for governing enterprise AI

Enterprise Apps and Agents gives you a single deployment destination for both engineers and citizen developers, with central governance over access, providers, models, data retention, token budgets, integrations, and policies, managed through your existing IdP.

Vercel centralizes AI governance so that company policies can be applied consistently across control domains.

**Control domain**

**Vercel controls**

**Deployment governance**

[Enterprise Managed Users](https://vercel.com/docs/security/enterprise-managed-users) and [RBAC](https://vercel.com/docs/rbac)

**Access governance**

[Vercel Passport](https://vercel.com/docs/passport), [Deployment Protection](https://vercel.com/docs/deployment-protection), and [Vercel Firewall](https://vercel.com/docs/vercel-firewall)

**Integration and data governance**

[Vercel Connect](https://vercel.com/docs/connect) and [Enterprise-Managed Authorization](https://vercel.com/docs/connect/ema)

**Model and token governance**

[AI Gateway](https://vercel.com/docs/ai-gateway), including [US-only inference](https://vercel.com/docs/ai-gateway/security-and-compliance/regional-inference) and [budget controls](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets)

Apps and agents run on the same infrastructure that powers billions of production deployments, and Vercel gives you a single place for [observability](https://vercel.com/docs/observability) and security monitoring across every project, through [analytics](https://vercel.com/docs/analytics), [audit logs](https://vercel.com/docs/audit-log), and the [Security Dashboard](https://vercel.com/docs/security/security-dashboard).

[Secure Compute](https://vercel.com/docs/networking/secure-compute) provides private connectivity to enterprise systems, while BYOC on AWS lets your application functions run in your own AWS account under your permissions and network controls.

### [Copy link to heading](#deployment-governance)Deployment governance

Citizen developers and engineers use different tools. A marketer might use ChatGPT to build a landing page, an analyst might use Claude Code to run queries and build a report, and an engineer might use Codex, OpenCode, or fx.

No matter the harness, Vercel gives you a single deployment target, and connects to your existing IdP, so you can control who creates deployments.

#### [Copy link to heading](#how-klaviyo's-built-a-secure-internal-app-platform)How Klaviyo's built a secure internal app platform

Before Vercel, shipping a simple internal app at Klaviyo took two weeks of chasing IT, opening tickets for engineering, and following up with the platform team. They built an internal app-building platform on top of Enterprise Apps and Agents, and now anyone in the company can deploy an idea in three minutes. In their first two weeks on Vercel, 512 employees deployed 356 apps.

> Vercel let us engineer guardrails instead of walls.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/1ScmuYoO6uwsvQ48NXtuQ7/10a6874c0ee44c2a3661339d74d419e1/mohamed_ali_.jpeg)Mohamed Ali Sr. Lead AI Architect at Klaviyo

### [Copy link to heading](#access-governance)Access governance

Controlling who can deploy doesn't protect the apps, agents, and data that make it into production.

On Vercel, you can configure every deployment to be private by default, and with Vercel Passport, you can require employees to authenticate through your IdP before they can access internal apps.

### [Copy link to heading](#integration-and-data-governance)Integration and data governance

Agents are only useful when they can access your systems and data, but that often means using long-standing environment varibles with wide-ranging permissions to your CRM, databases, Slack, and other systems.

Vercel Connect implements connectors with scoped access, and mints tokens for each agent task, meaning agents only access the specific context they need for the job. And now, with Enterprise-Managed Authorization, when employees sign into Vercel through your IdP, agents can use connected services automatically, without a separate authorization prompt.

Connect also integrates with Passport, so individual employee permissions also apply at the integration and data layer. If someone can't see data in a source system, they can't access it through an app or agent either.

## [Copy link to heading](#model-and-token-governance)Model and token governance

The average enterprise company using Vercel AI Gateway routes across 17 different models. Without a model router, that would require integrating with multiple separate providers, spreading API keys and budget management across platforms.

AI Gateway gives you access to hundreds of models through a single API, with no markup on cost, and Zero Data Retention keeps your data from being stored or trained on. You can also elect to route through US-only providers to maintain compliance.

#### [Copy link to heading](#how-mercor-manages-model-governance-at-scale)How Mercor manages model governance at scale

Mercor connects AI labs with subject-matter experts who help train and evaluate models. Their engineers need access to hundreds of models to enable that work, but before migrating to Vercel, access was spread across direct integrations and third-party routers, making stolen credentials a huge risk, and token spend impossible to manage.

They moved their model routing to AI Gateway, and now engineers can access hundreds of models with a single, expiring secret, and they can set budgets per person or project.

In their first 10 days on AI Gateway, they processed 63 billion tokens without hitting any rate limits.

> Not all gateways have the capability to do time-expiration keys or limits at the key level. As an admin, being able to provision keys with guardrails, and not having fears of stolen keys or runaway spend months later, has been particularly valuable.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/1VyQGHJ0jBu1i02JJprS9C/659a182c83eaa02af30930ff3a906544/abhi.png)Abhi Kottamasu Engineering Manager at Mercor

## [Copy link to heading](#centralized-visibility-and-security)Centralized visibility and security

[Vercel Observability](https://vercel.com/docs/observability) gives you a single view for app and agent telemetry across every project, so you can easily manage performance and troubleshoot problems for both internal tools and customer-facing products.

The [Security Dashboard](https://vercel.com/docs/security/security-dashboard) flags risks across your team and apps, including missing MFA, unprotected preview deployments, long-lived credentials, and framework vulnerabilities. Each finding links to the settings needed to fix it.

## [Copy link to heading](#bring-your-own-cloud-on-aws)Bring Your Own Cloud on AWS

BYOC on AWS is [generally available](https://vercel.com/changelog/bring-your-own-cloud-on-aws-is-now-generally-available). With BYOC, application functions execute in your AWS account, within your security and network boundaries.

Meta Superintelligence Labs runs on Vercel via BYOC, giving its AI teams the ability to test and deploy ideas quickly, inside their own AWS environment. Leaders at Meta said that in their first week on Vercel, they shipped a month worth of work.

## [Copy link to heading](#from-idea-to-global-scale-on-one-platform)From idea to global scale on one platform

Vercel let's everyone in your company build safely, and makes it easy for engineers to ship the best ideas at global scale, all on a single platform.

That is how we built Vertex, our customer support agent. We were previously using a vendor, but it couldn't answer all of our customers questions. When our support team built agents and skills to cover the gaps and increase our responses times, and we realized they had laid the foundation for the experience we wanted to deliver directly to our customers.

Our GTM engineering team took that foundation and made it production ready with evals and model failover.

Today, Vertex handles 91% of our customer support cases autonomously, processing thousands of tickets a week, and it runs on the same platform where the idea started.

### [Copy link to heading](#ship-your-best-ideas,-securely)Ship your best ideas, securely

[Contact sales](https://vercel.com/contact/sales) to learn more about enterprise governance on Vercel and get a custom demo of the platform.

### [Copy link to heading](#resources)Resources

-   Learn more about [Enterprise Apps and Agents](https://vercel.com/for/enterprise-apps-and-agents)
    
-   Learn how to protect internal apps with [Vercel Passport and your identity provider](https://vercel.com/kb/guide/vercel-passport)
    
-   Read the complete guide to [Bring Your Own Cloud on AWS](https://vercel.com/kb/guide/byoc)
    
-   Deploy a secure data analyst agent [in one click](https://vercel.com/templates/eve/eve-data-analyst)