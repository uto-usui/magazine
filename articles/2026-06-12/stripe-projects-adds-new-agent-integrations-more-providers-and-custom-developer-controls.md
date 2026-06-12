---
title: "Stripe Projects adds new agent integrations, more providers, and custom developer controls"
source: "https://stripe.com/blog/stripe-projects-adds-new-agents-providers-developer-controls"
publishedDate: "2026-06-11"
category: "engineering"
feedName: "Stripe Blog"
---

Last week, [agent traffic surpassed human traffic](https://radar.cloudflare.com/traffic#bot-vs-human) on the internet for the first time. Agents browsing webpages account for some of that traffic, but Stripe data points to a more significant reason for this growth: agents building software.

Agent traffic to Stripe’s documentation grew more than 10x in 2025 and now makes up nearly 40% of docs traffic. We’ve also seen exponential growth in new [Stripe CLI](https://docs.stripe.com/stripe-cli) users over the past year, with 70% of CLI requests for API resources coming from agents.

 ![Blog > Projects > CLI image](https://images.stripeassets.com/fzn2n1nzq965/3G0iWgnMnSR8GFq0u9d5UJ/32fd48eb83c7b4023911ba923e8399b0/new_CLI_users.png?w=1620&q=80)

Our data shows that agents are now fully capable of independently writing code and integrating with APIs like Stripe’s. And yet, many of the steps adjacent to writing code—such as provisioning infrastructure, managing credentials, setting up accounts, and connecting services together—are still too hard for agents to do on their own. 

We’re expanding [Stripe Projects](https://projects.dev/), which lets you provision and manage services from the CLI, to solve this with new agent integrations, additional providers, and new developer controls. 

Here’s what’s new with Projects.

## Hermes, Factory Droids, and Warp agents can provision infrastructure directly

Stripe Projects is now available as a skill—a set of structured instructions that give agents the context to act—in [Hermes](https://hermes-agent.nousresearch.com/), an open-source, self-improving AI agent from Nous Research. Stripe Projects handles infrastructure provisioning and management, while Hermes carries context across sessions. This means that if you’re building a complex product over days or weeks, your agent is a persistent collaborator—returning to a project the same way a developer would.

 ![Blog > Projects > Hermes](https://images.stripeassets.com/fzn2n1nzq965/3cBn2JGUW48c3vW16XVHSO/b86389a61ceda91eba7dd78324a2b2b2/projects-social.png?w=1620&q=80)

[Factory Droids](https://factory.ai/) and [Warp](https://www.warp.dev/integrations/stripe), model-agnostic coding agents, have also integrated with Projects. Developers can now access the embedded Projects CLI directly in their preferred agent workflows.

## Agents can provision and build with 16 new providers

Stripe Projects now connects to 16 new providers for a total of [49 providers](https://projects.dev/providers). New providers include Metronome, a Stripe product, for usage-based billing, Wix for public-facing storefronts, and ClickHouse for LLM observability. This allows agents to spin up a live AI-powered product, bill users, and monitor model cost, latency, and quality from the first call—without a human clicking through a dashboard.

## Developers can access new controls for agents to safely build

Agents provisioning infrastructure need many of the same guardrails as agents making purchases, such as scoped credentials, spend thresholds, and enforced environment boundaries. We’re shipping three updates to give you that control, plus the ability for platforms to natively distribute services for its users.

**See multiple providers’ spend in one place.** Stripe Projects now gives you a unified view across all providers by current and historical [cost per project](https://docs.stripe.com/projects#view-your-spend), so you can understand what a project costs to run. 

**Set spend limits per provider.** You can now [set custom spending caps per service](https://docs.stripe.com/projects#set-a-spend-limit), such as tighter limits on an AI model provider, or higher limits for production hosting and database layer. Per-provider limits let you tailor the guardrails for each service, helping prevent an agent from burning through your entire budget on a single provider. 

**Keep builds contained with named environments.** You can now create [isolated credentials](https://docs.stripe.com/projects#manage-multiple-environments) for  development, staging, production, or any custom environment, as well as share resources across environments when you need consistency. Agents default to the development environment, so even if an agent goes off-script, it won’t access or impact your production environment. 

**Natively provision services on your platform.** With delegated authority and white-labeling support, [platforms can now mint scoped credentials](https://docs.stripe.com/projects/platform-integration) and set up infrastructure on your developers’ behalf, so developers can go from writing code to running it without leaving your environment.

### What’s next

We’ll continue to expand Projects to cover the full lifecycle of agent-built software, from first provision to ongoing operations and security. We plan to add deeper security primitives for agents that act autonomously and a data layer, so providers can meter and bill for the software agents that build on top of their services.

Learn more about [Stripe Projects](https://docs.stripe.com/projects) or, if you’re ready to build, ask your agent to: _use Stripe Projects to add a Prisma database._