---
title: "Judgment and creativity are all you need"
source: "https://lethain.com/judgment-is-all-you-need/"
publishedDate: "2026-03-20"
category: "design"
feedName: "Sidebar"
---

When I joined Imprint a little less than a year ago, our deploys were manual, requiring close human attention to complete. Our database migrations were run manually, too. Developing good software is very possible in those circumstances, but it takes a remarkable attention to detail to do it. It was also possible to develop good software using Subversion and developing by ssh’ing into a remote server to edit PHP files, but the goal is making things _easy_ rather than _possible_.

Ten months later, the vast majority of our changes, including database migrations, continuously deploy to production without human involvement after the initial pull request is reviewed and merged. Reading aloud the relevant pages from the mandated gospel of continuous deployment, deploying changes this way doesn’t make them less reliable, but more so. Each step of validation a human _might_ do, is now consistently done on every deploy, including many steps that are just onerous enough to drop off the standard operating steps like meticulously checking the post-launch health on a production canary every minute for half an hour after each deploy.

This migration has reminded me a lot of the Uber service migration, which prompted me to write [Migrations: the only scalable solution for technical debt](https://lethain.com/migrations/) back in 2018, and in particular how _different_ this sort of migration feels in the age of coding agents. The more I’ve thought about how these two migrations compared, the more it’s solidified my thinking a bit about how this technology is going to impact software development over the next few years.

Although I really want to talk about how coding agents are changing software development, I want to start by expanding a bit on this recent migration at Imprint and how it compared with the migration at Uber.

The Uber migration was:

1.  Spinning up a new self-service service provisioning platform, along the lines of a very minimal Heroku, including the actual scheduling algorithm across clusters, etc. A lot of the edges were rough, including for example I do not remember how we performed service database migrations, but I suspect we simply left that as an exercise for the user. Part of the challenge was that this was a heterogenous environment with Python, NodeJS, Go, and a long-tail of random things (R, Elixir, etc). (For historical context, Kubernetes was sufficiently early that it effectively didn’t exist in 2014 when we did this work.)
2.  Migrated services iteratively, driven almost entirely by the platform team, without much product engineering support. (Everyone was too busy to help, and our timeline was driven by an upcoming datacenter migration.) A team of ~3 engineers focused on this migrated hundreds of services, although it included Xiaojian Huang who remains a likely contender for the most productive engineer I have worked with in my career, so maybe it’s unfair to call it a ~3 engineer team.
3.  Shedding a quiet tear for our colleagues on the core product engineering team responsible for deprecating the Python monolith, and migrating it over as a single, heavy service.
4.  This took us less than six months start to finish, but I don’t think I stopped working at any point in those six months.

The Imprint migration felt fairly differently:

1.  We were building on substantially more powerful infrastructure, with Kubernetes, ArgoCD, etc. Our problem statement was composing our software and workflows with these platforms, rather than building the platforms from scratch.
    
2.  We migrated all our services and databases to a continuous deployment setup, with the majority of the work occurring over 3 months. Once again, the significant majority of it was done by a team of ~3 engineers.
    
3.  In 2014, we spent the vast majority of our time _implementing decisions_: how the scheduler worked, how the UX for provisioning services worked, etc. In 2026, we spent almost our entire time designing our approach, reviewing coding agent pull requests, and revising our approach when designs and reality didn’t come together as cleanly as we hoped.
    
    The frenzied sprint was replaced by substantially more time on designing our approach.
    

All the fundamental challenges of migrations remained true, but in 2026 we got to solely work on solving those challenges, rather than on the essential but mundane minutiae of implementing those decisions. (Ok, I’ll be honest, we also had to keep iterating on our approach to using coding agents to get longer working cycles out of them without human involvement, but we’re telling a story here, let’s not get distracted.)

## Productivity today is is most constrained on judgment

What this migration highlighted for me, is that coding agents have already generally solved the problem of **time** for our team. We have, effectively, an unlimited amount of time, at a very affordable price, to complete our work.

They have also made substantial progress on the problem of **attention**. After I go beyond five or so concurrent projects, I tend to lose track of the necessary work to shepherd those projects to completion, but increasingly I believe that this, as the LLM community would charmingly frame it, is a skill issue in how I am composing the tools. I’m fairly confident that I will evolve my approach to these problems such that the bottleneck on my attention is less important. I don’t think this will go to zero, a reality of working on teams is that the work has to be coordinated, but it will go down.

The next constraint, which I think is the biggest issue today when it comes to building genuinely important software, is **judgment**. With unlimited time, and with attention increasingly constrained on my personal workflow rather than an inherent limit, I _can_ do anything. But how do I do it in a way that is maintainable, secure, and reliable? How do I do it in a way where it keeps running after a key engineer leaves the company?

I developed the idea of datapacks in [What is the competitive advantage of authors in the age of LLMs?](https://lethain.com/competitive-advantage-author-llms/), and this still rings true to me as the core mechanism for scaling judgment in how we approach software: we can supplement judgment by introducing expert context for the task at hand. Today this is defacto happening within the coding agent development layer, in the wider community developing shared agent skills, and internally within companies developing their own skills. My guess is that the industry will develop an ecosystem for high-quality skills, e.g. detailed and maintained skills for security engineering, product engineering, and so on. You can easily imagine O’Reilly, or another technology publisher, developing a package manager for blessed skills, which is the first stop for injecting judgment into tasks. (This is the idea I experimented with in creating [LLM-optimized edition of my latest book](https://www.amazon.com/Companion-Crafting-Engineering-Strategy-Thoughtful-ebook/dp/B0FXN2J4PJ), but it’s really the distribution platform that’s going to be most valuable here.)

Once we solve judgment, and I do imagine that we will using a variety of open-source and commercially managed skill package managers that are tightly integrated with coding agents, then the last constraint ahead of us is **creativity**. This is a problem far enough ahead that I’m not too worried about it, but I feel like it’s a classic entrepreneurship problem that will be amenable to the same solutions as it is today.

* * *

I’ll admit I’m ignoring financial constraints here, but relative to how much companies are spending on software engineering budgets today, this isn’t a particularly interesting constraint today. Maybe the financial constraints will get more interesting over time as engineering _conceivably_ gets cheaper, but as we think about injecting judgment, things will get more expensive as well, so the outcomes remain to be seen.