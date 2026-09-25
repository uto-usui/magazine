---
title: "How Klaviyo shipped 356 internal apps in two weeks on Vercel "
source: "https://vercel.com/blog/how-klaviyo-shipped-356-internal-apps-in-two-weeks-on-vercel"
publishedDate: "2026-09-24"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

### [Copy link to heading](#klaviyo-on-vercel)Klaviyo on Vercel

-   Built a platform for shipping internal apps
    
-   512 builders and 356 live apps in two weeks
    
-   Every app ships SSO-gated and private by default
    
-   Builders go from idea to live app in 3 minutes
    

[Klaviyo](https://www.klaviyo.com/) is a B2C CRM for more than 200,000 brands. It brings marketing, service, agents, and data together in one platform so brands can deliver customer experiences at scale. Klaviyo built a platform on Vercel for shipping internal apps, then opened it to every employee through a citizen developer program.

In the first two weeks of the program, 512 of Klaviyo’s more than 2,000 employees deployed 356 apps on Vercel. Of those, 196 were full-stack apps with their own databases. The teams that are now shipping software include legal, marketing, and HR. "The next big thing at Klaviyo could be in a marketer's laptop," says Sr. Lead AI Architect Mohamed Ali.

## [Copy link to heading](#guardrails-instead-of-walls)Guardrails instead of walls

Opening deployment to a couple thousand new builders made security the first conversation. The obvious way to keep them safe is to broadly restrict what they can do. Klaviyo went the other way.

> Blocking access is the laziest thing you can do. Vercel let us engineer guardrails instead of walls. Every app is SSO-gated, every database connection is private, and everything feeds our security tooling.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/1ScmuYoO6uwsvQ48NXtuQ7/10a6874c0ee44c2a3661339d74d419e1/mohamed_ali_.jpeg)Mohamed Ali Sr. Lead AI Architect @ Klaviyo

Employees aren't just building microsites; they are shipping full-stack apps on top of Klaviyo's own databases, and none of it touches the public network. Every builder is managed through Klaviyo's identity provider, which Vercel made possible through [Enterprise Managed Users](https://vercel.com/docs/security/enterprise-managed-users).

### [Copy link to heading](#implementing-safeguards-across-the-stack)Implementing safeguards across the stack

[Secure Compute](https://vercel.com/docs/networking/secure-compute) gives Vercel deployments a private network path into Klaviyo's own infrastructure. Apps built in the program read from and write to Klaviyo's databases without any traffic crossing the public internet. That's what made bring-your-own-database work for Klaviyo.

> When we were exploring Lovable, Netlify, and all of these tools, the thing that was a total game changer was Vercel's Secure Compute.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/1ScmuYoO6uwsvQ48NXtuQ7/10a6874c0ee44c2a3661339d74d419e1/mohamed_ali_.jpeg)Mohamed Ali Sr. Lead AI Architect @ Klaviyo

On top of that connection, [Vercel Passport](https://vercel.com/passport) and Klaviyo’s identity provider give every app the same access defaults, with nothing for the builder to configure:

-   Apps are private and SSO-gated through Okta
    
-   Sensitive environment variables are set at the team level, out of builders' hands
    
-   Klaviyo's hardened GitHub security is inherited by every project
    
-   Wiz scans every project, and findings feed Klaviyo's SIEM
    
-   Public deployment is granted case-by-case, so sales can share microsites with prospects, while internal tools stay private
    

## [Copy link to heading](#how-klaviyo's-app-platform-turns-an-idea-into-an-app)How Klaviyo's app platform turns an idea into an app

Klaviyo wanted anyone with an idea to be able to describe it in plain language, from Slack, Claude, or Cursor, and get back a working app. They designed K:Forge, an in-house pipeline built on the [Vercel SDK](https://vercel.com/docs/rest-api/sdk), to handle everything in between.

![K:Forge's home screen. Employees start from an idea, a project they already built in another tool, or a single HTML file.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1hjeDNKIp5m6NigrgI8B9d%2F3d48b3ff1f0e859640c5508b03361ea3%2Fimage__10_.png&w=1920&q=95)![K:Forge's home screen. Employees start from an idea, a project they already built in another tool, or a single HTML file.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1hjeDNKIp5m6NigrgI8B9d%2F3d48b3ff1f0e859640c5508b03361ea3%2Fimage__10_.png&w=1920&q=95)

K:Forge's home screen. Employees start from an idea, a project they already built in another tool, or a single HTML file.

K:Forge creates a GitHub repo, deploys the app on Vercel, connects data through Secure Compute, and applies every security default. The output is a live, SSO-gated app, and the builder never touches infrastructure. Changes work the same way: mid-thread in Slack, someone can tell K:Forge what should be different, then it makes the change and redeploys.

> K:Forge takes anyone at Klaviyo from an idea to a live, deployed app in under three minutes thanks to Vercel. It's a new way of building infrastructure and you don't have to cut corners on security or governance.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/4e00ey3L5ofjBXQYhCpX2f/81d5c017476c6ae8fb84def5637ca3a7/Jordan_Trundy_pic.png)Jordan Trundy Director of AI & App Engineering @ Klaviyo

Klaviyo built the pipeline and deliberately didn't build the layer under it. CDN behavior, preview environments, analytics, global scale: all of it is R&D Vercel had already done, so builders and engineers at Klaviyo don't have to think about it.

> We don't want our users worrying about how a CDN performs in Australia. Vercel abstracts all of it. Building that ourselves would have meant hiring a whole department to solve problems Vercel already solved.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/1ScmuYoO6uwsvQ48NXtuQ7/10a6874c0ee44c2a3661339d74d419e1/mohamed_ali_.jpeg)Mohamed Ali Sr. Lead AI Architect @ Klaviyo

For bigger builds, citizen developers take an app about 80% of the way, and Klaviyo's platform team steps in for the last 20%, for fine-tuning and safety review. The platform team went from being the bottleneck to being the finishing touch. "We don't worry about scale," Mohamed says. "If 100,000 people hit an app, Vercel already solved that."

## [Copy link to heading](#what-people-at-klaviyo-are-building)What people at Klaviyo are building

Employees build everything from microsites that rework a sales process to full-stack apps for problems too niche for any vendor tool. For [K:BOS,](https://www.klaviyo.com/events/kbos-2026-recap) Klaviyo's flagship event, the team skipped off-the-shelf registration tooling and built its own. Engineering barely touched it.

Klaviyo was one of the first customers of [Vercel for Enterprise Apps and Agents](https://vercel.com/enterprise). The platform gave the company a way to let anyone build full-stack apps, with security handled by default.

## [Copy link to heading](#what's-next)What's next

Klaviyo sets a high bar for AI fluency. One in five employees has shipped an app so far, and Mohamed intends to get even more people building. The team is also going deeper into Vercel, with MCP and AI Gateway.

> We have a lot of questions, we're figuring this out. There's no playbook on what a citizen developer program should look like, so partnering with Vercel who can guide us through it is super important.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/1ScmuYoO6uwsvQ48NXtuQ7/10a6874c0ee44c2a3661339d74d419e1/mohamed_ali_.jpeg)Mohamed Ali Sr. Lead AI Architect @ Klaviyo

**About Klaviyo**: [Klaviyo](https://www.klaviyo.com/) is an autonomous B2C CRM that powers more valuable customer experiences. We unify a flexible, scalable data platform, intelligence that gets smarter with every interaction, and action across Marketing and Service to help businesses turn real-time customer data into personalization at scale.