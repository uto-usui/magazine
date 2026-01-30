---
title: "How to create an optimal developer workflow"
source: "https://vercel.com/blog/improving-developer-workflow"
publishedDate: "2023-09-12"
category: "frontend"
feedName: "Vercel"
author: "Lindsey Simon"
---

6 min read

Sep 12, 2023

The way your team builds software matters.

Software engineers strive to build experiences that delight and engage customers, but there are plenty of workflow roadblocks that can stand in the way of shipping great software quickly.

In this blog, we'll break down the costs of poor developer experience and share some tactics that can help promote a healthy development workflow. 

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4BBtmj57Ebu4EkUkI7488M%2Fef1ca2197e03e423d8ea98b18b85fca7%2FFrame_427319609__2_.png&w=1920&q=75)

## [Link to heading](#the-costs-of-poor-developer-experience)The costs of poor developer experience

The developer experience (DX) at your organization directly impacts your bottom line. When that experience is lacking—from tedious configuration and inefficient workflows—morale and iteration speed suffer. 

Here are four ways poor DX will cost you:

### [Link to heading](#1\)-real-costs-from-slow-builds)1) Real costs from slow builds

**Our stakeholders need us to quickly ship and gather feedback.** 

The tech giants release thousands of production deployments daily, and those companies know that build speed matters in order to keep up with the competition. 

In addition to slow builds, it’s imperative to minimize the refresh time between making a change and seeing the result when a developer is working locally. Even small lags here can significantly harm productivity for teams and individuals, removing developers and their collaborators from their flow state and causing context switches.

But there are also hidden costs to slow builds, including the culture it creates. When developers are faced with slow builds, they become hesitant to ship and take extra time out of their day to make iterative changes. They create larger and larger pull requests (PRs), feel disconnected, and become frustrated.

### [Link to heading](#2\)-sunk-costs-from-tech-debt)2) Sunk costs from tech debt

**If I had a friend who had lost their paycheck gambling, I wouldn’t tell them to keep trying—I’d tell them to step away from the blackjack table.**

The same is true with technical debt. In this case, the blackjack table is your outdated tech stack. While the sunk costs of outdated infrastructure can be a tough pill to swallow, accumulated tech debt means that new tech can’t be implemented and adopted efficiently, blocking teams across your organization from moving quickly. In fact, developers lose two days a week on average to managing tech debt, according to a [2018 report by Stripe.](https://stripe.com/files/reports/the-developer-coefficient.pdf)

Tech debt is a nebulous concept, but here are a few common causes and effects:

-   Complex dependencies make simple changes too complex.
    
-   Missing test coverage makes it hard to move quickly because errors and regressions are more easily introduced from each change.
    
-   A lack of monitoring or debugging tools makes it hard to see and catch mistakes.
    

### [Link to heading](#3\)-opportunity-costs-from-configuration-and-maintenance-)3) Opportunity costs from configuration and maintenance 

**Your business doesn’t need to be a software infrastructure company.**

From setting up staging and pre-production environments, to entire DevOps teams managing CI/CD and pipeline management, a bespoke, customized system will bog down your workflow, costing you time and money. 

There are so many solutions in today’s market that allow you to leverage cost-efficient and robust solutions, instead of building that infra in-house. 

Your framework controls your global infrastructure, not the other way around.

### [Link to heading](#4\)-hidden-costs-from-friction-in-collaboration)4) Hidden costs from friction in collaboration

**Siloed communication is a devastating blocker of fast iteration and hurts your DX in the process.** 

When your organization is giving design feedback in one tool, copy suggestions in another, and code changes somewhere else, you’ll ship more slowly. 

At smaller organizations, dev teams might be able to modify any part of the codebase themselves. But when a business expands, collaboration becomes essential in order to understand different parts of the codebase, which includes documentation, discerning correct points of contact, and overall communication. 

## [Link to heading](#creating-a-developer-experience-that-promotes-iteration)Creating a developer experience that promotes iteration

A powerful and seamless front-end workflow with a rich developer experience is possible. 

When you focus on the goal of fast iteration, everything else will fall into place. Here are some tips on how to overcome these roadblocks: 

### [Link to heading](#speed-up-feedback-loops)Speed up feedback loops

When you give your team the right tools to build, merge, and deploy, slow builds become a thing of the past. 

Your software delivery is only as fast as the slowest part of your toolchain. As you and your teams work towards optimizing your deployment pipelines, CI automations can keep pace with your developers, instead of holding them back. 

**For example, our entire engineering organization recently saved 2,600 hours in a week when we used** [**Turborepo**](https://turbo.build/)**,** an open-source incremental bundler and build system. 

Fast and lightweight testing infrastructure can also speed up iteration cycles, as developers can ship with confidence, knowing that their changes won’t break anything.

Finally, refresh time should be measured in milliseconds, not minutes. In the web world, for example, hot module reload (HMR) enables React developers to refresh the results of their code nearly instantly, allowing them quick feedback loops to the updates they are making to their user interfaces.

### [Link to heading](#choose-open-source-and-zero-configuration-solutions)Choose open-source and zero-configuration solutions

Opt for tools your developers love, without extra configuration or custom tooling. This will become your biggest weapon against tech debt. 

Thanks to the breadth of modern software offerings, infrastructure that was previously only feasible for enterprises and the tech giants is now accessible to anyone. In other words, companies no longer have to settle when it comes to the best monitoring, alerting, and analytics solutions.

Open-source and zero-configuration tools with strong communities allow new employees to easily get up to speed and leverage the larger community for improvements. You also won’t need to worry about maintaining custom, in-house solutions when there’s turnover. 

Open-source has quickly become a differentiator for leading organizations. [90% percent of Fortune 500 companies use open-source software](https://octoverse.github.com/)—with libraries like React, Webpack, and Vercel-owned Next.js among them. 

### [Link to heading](#prioritize-and-de-risk-innovation)Prioritize and de-risk innovation

Having a compelling frontend requires craft and care—it’s your differentiator in a crowded market. Make sure you’re investing in making it a delightful experience for your customers by giving devs time to innovate and code, instead of focusing on tech debt and infrastructure management. 

Our CTO, Malte Ubl, often says, “Iteration velocity is the answer to all software problems.” We’ve tried to create an engineering organization that empowers our developers to embrace that philosophy by making it easy to fail fast. We prioritize experimentation at Vercel, but that means having the tools to roll back instantly, track across versions, and make fast, data-driven decisions.

### [Link to heading](#enable-collaborative-feedback)Enable collaborative feedback

Choose front-end tools that enable collaboration across teams, so that you can speed up review cycles, eliminate bottlenecks, and ensure that staging and production infrastructure is always aligned. 

Identifying the right points of contact, having good documentation, and communicating are all vital to fast feedback cycles. Don’t forget about your teammates outside of the engineering team either. Other parts of the business like design, marketing, and legal must be accounted for in feedback loops. 

Additionally, choose tools that make staging and pre-production environment creation a breeze. Developers should have a staging environment automatically set up for every PR, so they can share their work with others around the company, receive prompt feedback, and see their work in the product.

## [Link to heading](#just-code-)Just code 

Our teams prioritize a culture of efficiency and iteration. We know that the best developer experience is one where your tools enhance your work, not slow it down. It's been interesting to watch our developers build for developers, and we’ve learned these important lessons along the way. Remove bad workflows and let your developers be creative through code. 

Now you can go and break down workflow roadblocks and give your team the time to focus on what makes your product unique.

[

**Upgrade your workflow today**

Reach out to learn more about how you can improve your frontend workflow and empower your team to ship better web experiences with Vercel.

Contact Us



](https://vercel.com/contact/sales)