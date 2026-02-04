---
title: "Introducing the new v0"
source: "https://vercel.com/blog/introducing-the-new-v0"
publishedDate: "2026-02-03"
category: "frontend"
feedName: "Vercel"
author: "Zeb Hermann"
---

4 min read

Feb 3, 2026

Since v0 became generally available in 2024, more than 4 million people have used it to turn their ideas into apps in minutes. v0 has helped people get promotions, win more clients, and work more closely with developers.

AI lowered the barrier to writing code. Now we're raising the bar for shipping it.

Today, v0 evolves vibe coding from novelty to business critical. Built for production apps and agents, this release includes enterprise-grade security and integrations teams can use to ship real software, not just spin up demos.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1Q67zaHzjdyvpwSkEq58S8%2Fbe204be2bf07ade4ed4ac0fb0c1da9b8%2Fpublish_pr_desktop_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5yzMYoojcYiTyuSMj5luS8%2F47820539bc0a91d12d170e3d46e3bc9a%2Fpublish_pr_desktop_dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1LJyhe7tUqw5O8lfdpDHGL%2F1414e2eea1c1230363b45d169c99da33%2Fpublish_pr_mobile_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5IpExBApmHfzsJP5eyjMNY%2F7701027f15edeea0a86b0cc360e2457e%2Fpublish_pr_mobile_dark.png&w=1920&q=75)

## [Link to heading](#the-limitations-of-vibe-coding)The limitations of vibe coding

We're at an inflection point where anyone can create software. But this freedom has created three problems for the enterprise.

**Vibe coding is now the world's largest shadow IT problem.** AI-enabled software creation is already happening inside every enterprise, and employees are shipping security flaws alongside features: credentials copied into prompts, company data published to the public internet, and databases get deleted, all with no audit trail.

**Demos are easy to generate, but production features aren't.** Prototyping is one of the most popular use cases for marketers and PMs, but the majority of real software work happens on existing apps, not one-off creations. Prototypes fail because they live outside real codebases, require rewrites before production, and create handoffs between tools and teams.

**The old Software Development Life Cycle is overloaded with dead-ends.** The legacy SDLC relies on countless PRDs, tickets, and review meetings. Feedback cycles take weeks or months. Vibe coding has overloaded these outdated processes with thousands of good ideas that will never see the light of day, frustrating engineers and their stakeholders.

We took these problems to heart and rebuilt v0 from the ground up.

## [Link to heading](#from-0-to-shipped:-what's-new)From 0 to shipped: What's new

These features will be rolling out to users over the next few days. [Follow us on X](https://x.com/v0) to learn more.

### [Link to heading](#work-on-existing-codebases)Work on existing codebases

Instead of engineers spending weeks on re-writes for production, v0’s new sandbox-based runtime can import any GitHub repo and automatically pull environment variables, and configurations from Vercel.

Every prompt generates production-ready code in a real environment, and it lives in your repo. No more copying code back and forth.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7ftruGyQmkEho8pR4aZTRt%2F23e6d48e15a8350adf7fbef8254bdb3d%2Fimport_from_github_desktop_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5fvuoCv4PHJFk7hirK0Hwz%2F8ee9124cd3e4735c41690d33a28ebd6b%2Fimport_from_github_desktop_dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F434WqubvaL8SEDbxEmO8WP%2F0cbe7ebe03adce8b7a4eb629edd8b0ab%2Fimport_from_github_mobile_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FFC4EfmCccS8XzTWNitgLl%2F393a6dbfc624c89595c096b20a732149%2Fimport_from_github_mobile_dark.png&w=1920&q=75)

### [Link to heading](#bring-git-to-your-entire-team)Bring git to your entire team

Historically, marketers and PMs weren’t comfortable setting up and troubleshooting a local dev environment. With v0, they don’t have to.

A new Git panel lets you create a new branch for each chat, open PRs against main, and deploy on merge. Pull requests are first-class and previews map to real deployments. For the first time, anyone on a team, not just engineers, can ship production code through proper git workflows.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6M7WmEIacLrGYkwQDP2QLH%2Ff499f9b9aa323d575da9462f3317d588%2Fgit_panel_desktop_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F30Gbnr0h3VfWFeNMApdzOl%2Fb2807e5e610f85271996df02afb6172e%2Fgit_panel_desktop_dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4K1zniGAxWyVhznKazweZ7%2F0bd2251d015298af05acf647414a8844%2Fgit_panel_mobile_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6Dlu2RcSZbhyze3IgpOxX8%2F1d8ba616fdae7f166f9d63b2e5a98dd6%2Fgit_panel_mobile_dark.png&w=1920&q=75)

### [Link to heading](#democratize-data,-safely)Democratize data, safely

Building internal reports and data apps typically requires painful setup of ETL pipelines and scheduled jobs. With v0, you can connect your app directly to the tables you need.

Secure integrations with Snowflake and AWS databases mean anyone can build custom reporting, add rich context to their internal tools, and automate data-triggered processes.

### [Link to heading](#stay-secure-by-default)Stay secure by default

Vibe coding tools optimize for speed and novelty, discarding decades of software engineering best practices.

v0 is built on Vercel, where security is built-in by default and configurable for common compliance needs. Set deployment protection requirements, connect securely to enterprise systems, and set proper access controls for every app.

## [Link to heading](#how-our-customers-use-the-new-v0)How our customers use the new v0

-   **Product leaders** turn PRDs into prototypes, and prototypes into PRs, shipping the right features, fast. They go from "tell sales there's another delay" to "it's shipped."
    
-   **Designers** work against real code, refining layouts, tweaking components, and previewing production with each update. They go from "another ticket for frontend" to "it's shipped."
    
-   **Marketers** turn ideas into site updates immediately, edit landing pages, changing images, fixing copy, and publishing, all without opening a ticket. They go from "please, it's a quick change" to "it's shipped."
    
-   **Engineers** unblock stakeholders without breaking prod, making quick fixes, importing repos, and letting business users open PRs, all in a single tab. They go from "I can't keep up with the backlog" to "it's shipped."
    
-   **Data teams** ship dashboards the business actually uses, building custom reports and analytics on top of real data with just a few prompts. They go from "that's buried in a notebook" to "it's shipped."
    
-   **GTM teams** close deals with the demo customers actually asked for, create live previews, mock data, and branded experiences in minutes. They go from "let's show the standard deck" to "it's shipped."
    

## [Link to heading](#what's-next)What's next

Today, you can use v0 to ship production apps and websites. 2026 will be the year of agents.

Soon, you’ll be able to build end-to-end agentic workflows in v0, AI models included, and deploy them on Vercel’s self-driving infrastructure.

Welcome to the new v0. We can’t wait to see what you build.

[Sign up or log in](https://v0.app/) to try the new v0 today.

_Snowflake, GitHub, AWS are trademarks of their respective owners._