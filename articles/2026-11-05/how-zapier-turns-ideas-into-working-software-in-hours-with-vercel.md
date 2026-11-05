---
title: "How Zapier turns ideas into working software in hours with Vercel"
source: "https://vercel.com/blog/how-zapier-turns-ideas-into-working-software-in-hours-with-vercel"
publishedDate: "2026-11-03"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

## [Copy link to heading](#zapier-on-vercel)Zapier on Vercel

-   Interactive partner demos in under two hours with v0, replacing a process that could take weeks
    
-   First versions of three internal applications, each built in one day
    
-   A shared daily briefing for more than 60 marketers, replacing individual efforts to assemble the same information
    
-   3.3 million sandboxes created in one month, isolating the code execution behind Zapier’s AI workloads
    

Before the industry had a word for agents, Zapier was building them. Today [Zapier](https://zapier.com/) is the AI orchestration platform connecting AI to the workflows, data, and systems businesses use every day.

Zapier has been a Vercel customer since they began using Vercel for web experiences several years ago. They stayed, and expanded, because every team that needed to ship quickly found the same answer: speed, with the security guardrails already in place. As they grew, so did their adoption of Vercel as more teams found new uses for the platform. Today, Vercel supports work across engineering, partnerships, and marketing, from customer-facing AI to interactive partner demos and internal applications.

The needs vary by team, but the priority is getting useful work into people’s hands quickly. A backend engineer can create an interactive demo of an integration inside a partner’s product. In marketing, a former product marketer with no prior deployment experience can share tools containing sensitive information through a company-approved environment and keep improving them as colleagues use them.

Zapier’s teams are moving faster and doing more than they could before. When the next launch comes around, building on Vercel is a given.

## [Copy link to heading](#from-weeks-of-prototype-work-to-a-demo-in-under-two-hours)From weeks of prototype work to a demo in under two hours

Every partnership Zapier signs extends what its customers can automate. The Powered by Zapier team is how those partnerships become product, helping SaaS and AI companies embed Zapier’s automation capabilities directly into their own tools, so users can automate without ever leaving the partner’s app. The stakes are high, because Zapier relies on this team to make its platform the entry point to all the software in the world. The problem was speed: collaborating outside the organization took forever, with every prototype requiring screenshots, design time, and frontend resources, and weeks could pass before a partner saw anything clickable.

With [v0](https://vercel.com/customers/how-zapier-scales-product-partnerships-with-v0), the team can create a fully interactive, multi-view prototype in under two hours, showing an embedded Zapier experience inside the partner’s own product.

> In two hours using v0, I can now create a fully clickable prototype with 10+ different views. That just wasn’t possible before.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/52efICooPK9Pidk0cnFwQh/d63c39ccc27b6c0b2f9c28e7bf09e6ff/michelle_Chu-_Zapier_photo.png)Michelle Chu Backend Engineer @ Zapier

Chu’s background is in backend development, not frontend engineering or design, but v0 lets her build these experiences without coordinating a separate design and frontend effort for every partner conversation. Partners can click through the flow and share it with colleagues, using the prototype as a blueprint for implementation alongside the API documentation.

## [Copy link to heading](#sharing-sensitive-internal-data-securely)Sharing sensitive internal data securely

In marketing, Joe Stych set out to make the team’s scattered knowledge easier to use. He had spent years in product marketing before becoming a agentic go-to-market engineer, but had never worked out of a Git repository or deployed an application.

At an internal hackathon, he built Marketing Hive, a shared source for positioning, messaging, personas, and competitive intelligence. Sharing his local prototype meant making sensitive information accessible to colleagues without exposing it to everyone else.

“The Hive holds our positioning, personas, and competitive intel, so I couldn't just send people a link. On Vercel it was behind our SSO from the first deploy, so I could share it without exposing it” says Joe Stych, Senior Lead, Agentic GTM at Zapier.

Zapier’s data and security teams had already endorsed Vercel. Stych deployed through the company’s approved internal tooling environment, with access gated behind Zapier’s single sign-on.

He develops in Cursor and keeps code and source material in GitLab, where changes trigger [Vercel builds and deployments](https://vercel.com/docs/git/vercel-for-gitlab). If an update needs to be undone, he can [roll back the deployment](https://vercel.com/docs/instant-rollback).

The first versions of three of his internal applications took about a day each. In roughly two months, a hackathon project had grown into production software used across marketing. It was built by someone who had never deployed anything before.

## [Copy link to heading](#internal-apps-for-marketing-and-sales)Internal apps for marketing and sales

Marketing Hive holds the knowledge. Marketing OS puts it to work. It gives more than 60 marketers a daily briefing in Slack and a dashboard with what changed across marketing, one update from each team, a win worth celebrating, and progress against goals. Each marketer can start from the briefing instead of assembling the same information from separate channels.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4PhbmIWo3HD5JBPZ2bzyAO%2F302d41ace847152ece04408c85ea5f0d%2Fmarketing-os-option-C-light-v3.png&w=1920&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Kkur8fwi1aW8pOFpgbHzh%2Fc7b8349ccbf874a5a0864c5d03bc52f2%2Fmarketing-os-option-C-dark-v3.png&w=1920&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4PhbmIWo3HD5JBPZ2bzyAO%2F302d41ace847152ece04408c85ea5f0d%2Fmarketing-os-option-C-light-v3.png&w=1920&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Kkur8fwi1aW8pOFpgbHzh%2Fc7b8349ccbf874a5a0864c5d03bc52f2%2Fmarketing-os-option-C-dark-v3.png&w=1920&q=95)

“The first five minutes of your day, you need to look at the Marketing OS update,” says Dan Slagen, Zapier’s CMO.

Readers mark what they found useful, helping Stych prioritize improvements. The briefings also spark discussions in a marketing channel open to everyone at the company.

Stych is building a sales coaching application that brings together account context and industry messaging before a call. Afterward, it reviews the Gong recording to highlight what worked and suggest changes to the talk track.

For the internal applications, he checks reported numbers and the evidence behind claimed insights. Decisions about positioning remain with people, and he says additional safeguards will come before agents publish without human review.

## [Copy link to heading](#model-access-and-isolated-code-execution)Model access and isolated code execution

Beyond Marketing OS, a separate team at Zapier uses [AI Gateway](https://vercel.com/ai-gateway) to send requests to AI models on behalf of customers using Zapier products.

> AI Gateway gives us one endpoint for every model provider. When the best model changes, we change with it. No rebuilt integrations, no migration projects.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/6L1mT2CRGax6cPHimYwKnd/8d223c04e857a4ef5c32ffdfa2d244ce/ryan_anderson_.png)Ryan Anderson Head of Product Marketing @ Zapier

A common endpoint lets an application change or add models without maintaining a separate integration for each provider. Failover gives requests another route when a provider cannot serve them, while unified reporting lets a team see their usage across providers in once place.

## [Copy link to heading](#what's-next)What's next

Zapier’s relationship with Vercel began with web experiences and expanded as the company grew, with more teams finding uses for the platform as their needs changed. Today its role spans the software Zapier runs for customers and the tools its people build for one another, and every thread is still widening.

The clearest picture of where it leads is in marketing, where other teams are starting to borrow the pattern. The goal is more versions across the company, and perhaps a Revenue OS for Zapier’s customer-facing teams next, each built the way the first one was, by someone close to the problem. First comes trust. Stych still checks reported numbers and the evidence behind claimed insights, and additional safeguards will come before agents publish without human review.

Across all of it, Vercel helps Zapier put useful work into people’s hands and keep adapting it to the needs of the business.