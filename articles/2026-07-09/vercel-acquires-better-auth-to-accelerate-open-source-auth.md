---
title: "Vercel acquires Better Auth to accelerate open source auth"
source: "https://vercel.com/blog/vercel-acquires-better-auth"
publishedDate: "2026-07-07"
category: "frontend"
feedName: "Vercel"
author: "Guillermo Rauch"
---

Vercel is acquiring [Better Auth](https://better-auth.com/), the company behind the open source [TypeScript authentication library](https://github.com/better-auth/better-auth), which has 4.7M+ weekly npm downloads and more than 850 contributors. Founder Bereket Engida and the core team are joining Vercel to continue their work on Better Auth and agent identity.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F74kwNQGOPztNlhO4bDm4v8%2F61222f714c4128fb1327891d556be28a%2FPHB_2919-Edit-2.jpg&w=1920&q=75)

## [Copy link to heading](#the-open-web)The open web

Last year, we [published our approach](https://vercel.com/blog/open-sdk-strategy) behind Next.js, AI SDK, and Nuxt: software that's open by default, loosely coupled, and portable to any platform.

Better Auth applies it to authentication: framework-agnostic, runs anywhere, and gives developers auth they own.

## [Copy link to heading](#agent-identity)Agent identity

When an agent acts on your behalf, it runs under your identity and access, so every service it touches sees you, not the agent. There's no clean way to limit what any one agent or subagent can do, or to shut down just one without cutting off the rest.

The Better Auth team has been building [Agent Auth](https://agentauthprotocol.com/) so that each agent can carry its own identity and its own scoped, revocable authority, with you as the single point of control. Agent identity is foundational to [agentic infrastructure](https://vercel.com/blog/agentic-infrastructure).

The Better Auth team will continue that work at Vercel, bringing agent identity to [Vercel Connect](https://vercel.com/connect) and [eve](https://eve.dev/).

## [Copy link to heading](#what's-next-for-better-auth)What's next for Better Auth

The library remains free and open source under MIT, retains its name, and the team continues to lead development with the same open contribution model, community governance, and framework support across the ecosystem.

Read [the announcement on the Better Auth blog](https://better-auth.com/blog/better-auth-joins-vercel). Explore the [Better Auth documentation](https://better-auth.com/docs) and the [Agent Auth Protocol](https://agentauthprotocol.com/), or contribute to the project on [GitHub](https://github.com/better-auth/better-auth).