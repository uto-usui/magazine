---
title: "How General Intelligence used agents to build an agent platform on Vercel"
source: "https://vercel.com/blog/how-general-intelligence-used-agents-to-build-an-agent-platform-on-vercel"
publishedDate: "2026-05-04"
category: "frontend"
feedName: "Vercel"
author: "Eric Dodds"
---

4 min read

May 4, 2026

### [Link to heading](#general-intelligence-on-vercel)General Intelligence on Vercel

-   8-person team (5 engineers) shipping 10 PRs and 70+ commits per engineer, per day
    
-   4,000+ preview branches with ~100 parallel app versions running at any moment
    
-   90% of SRE work automated through Vercel and their own agent (Cofounder)
    
-   Cofounder launches with a managed Vercel account for every customer
    

General Intelligence is building a platform that lets any founder run a company entirely with AI agents. Their vision is the one-person, billion-dollar company where every department is driven by agents.

Their flagship product, Cofounder, gives founders a full team of agents that cover engineering, marketing, SEO, finance, sales, customer support, and operations.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1cFRvdRiLrGKhi85yM7Yse%2F71e8ccf2d811937b09d074a32e37b09c%2Fimage__21_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2yt1cPhsmK9HNv6B3mJhGl%2F48ae894d9efeabf2f27b453a84eaae12%2Fimage__18_.png&w=1920&q=75)

General Intelligence is an 8-person company with 5 engineers. To ship a platform that lets their customers run agentic companies, they had to operate as one themselves. They wanted to use Cofounder's CTO agent to build out other agentic business functions, and their developers quickly learned that was an infrastructure problem, not an agent problem.

For a complex, multi-tenant platform, the requirement was total programmatic control: every action a human could take on the underlying cloud platform had to be available to a coding agent through [a CLI](https://vercel.com/docs/cli) or APIs. That meant killing deployments, changing DNS, managing billing, editing configs, all of it. Most cloud providers failed that test, and that's why General Intelligence migrated to Vercel.

> If you want to make a system where an agent drives all of your infrastructure, you should probably be using Vercel.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/uvMaJs8B18cbJSd1ZB3vl/d5e51ae15d2cf1b2d3139ce735e8aebe/andrew-pignanelli.png)
> 
> **— Andrew Pignanelli,** CEO @ General Intelligence

## [Link to heading](#agents-need-infrastructure-built-for-agents)Agents need infrastructure built for agents

A coding agent runs dozens of processes in parallel. It queries logs as data, parses errors as input, and treats every dashboard click as a missing API. The bottleneck stops being how fast the agent can write code and becomes how much of the cloud it can actually reach.

Most clouds aren't shaped for that pattern. They're built for human developers: dashboards to click, consoles to read, APIs that cover some operations but stop short of others. The closer an agent gets to running development end-to-end, the more those gaps stack up.

General Intelligence started out hosting on Render. It worked for the early product, but provisioning preview environments for the full stack was painful from day one.

When they started building Cofounder's CTO agent, that pain became a blocker. The platform had to be reachable end-to-end through code, and Render's Python support couldn't keep up with what the agent needed.

"There are vendors that let an agent do 5% of the work, and vendors that let an agent do 50%," explained Pignanelli. "We needed a platform that would let an agent do 100%." They evaluated vendors against that bar and made the choice to migrate to Vercel.

## [Link to heading](#how-five-engineers-ship-like-a-hundred)How five engineers ship like a hundred

Migrating to Vercel changed how General Intelligence builds software, and their engineers don't develop locally anymore. Every change Cofounder's CTO agent makes goes straight to a Git branch, spins up a preview environment, and gets tested end-to-end by a browser agent on the live URL.

> We don't configure local development at all. Each branch has a preview environment, and within 30 seconds I'm using that version of the app. That just doesn't exist on other platforms.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/uvMaJs8B18cbJSd1ZB3vl/d5e51ae15d2cf1b2d3139ce735e8aebe/andrew-pignanelli.png)
> 
> **— Andrew Pignanelli,** CEO @ General Intelligence

General Intelligence has over 4,000 branches in flight. At any moment during a workday, around 100 versions of their app are running on Vercel, each on its own [preview environment](https://vercel.com/docs/deployments/environments) with a coding agent or browser agent operating it. Earlier this year, [Fluid compute](https://vercel.com/docs/fluid-compute) grew 6.5x month-over-month, and most of that growth was internal engineering work: coding agents building business agents in Cofounder.

Today, engineers ships an average of 10 PRs a day with 70+ commits each, on a token budget of $5,000 per engineer per month.

### [Link to heading](#migrating-cofounder's-python-backend-to-vercel)Migrating Cofounder's Python backend to Vercel

General Intelligence runs a Python backend, and they were one of the first teams to migrate a complex [full stack app Vercel](https://vercel.com/docs/functions/runtimes/python). They did it deliberately, because the agent had to drive deployments, configs, and compute across the whole stack, not just the frontend.

Unifying on one platform shrank the surface area for the team and the agent to one CLI, one API, and one observability layer. When something breaks, the agent and the developers have the full picture in one place.

### [Link to heading](#running-cofounder-as-a-multi-tenant-app-on-vercel)Running Cofounder as a multi-tenant app on Vercel

When a founder spins up a company on Cofounder, they get more than a set of agents, they get a real GitHub repository and a managed Vercel deployment, provisioned automatically through [Vercel for Platforms](https://vercel.com/platforms/docs). Each company also gets its own domain, with SSL and DNS handled automatically.

The engineering agent inside the customer's company is Cofounder's CTO, the same product General Intelligence uses internally. It runs the same workflow: branches, preview environments, browser agents testing the live URL.

## [Link to heading](#what's-next)What's next

General Intelligence will keep building their own company on the same products they ship to customers. As they add new departments and agents, Pignanelli says Vercel allows them to focus on the customer, not configuring the cloud underneath.

> We don't want to worry about infrastructure for our users. We want them to be able to say 'make my app go' and have it work, and Vercel is the answer.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/uvMaJs8B18cbJSd1ZB3vl/d5e51ae15d2cf1b2d3139ce735e8aebe/andrew-pignanelli.png)
> 
> **— Andrew Pignanelli,** CEO @ General Intelligence

General Intelligence is building [Cofounder](https://cofounder.co/), the first full-stack agent company platform.