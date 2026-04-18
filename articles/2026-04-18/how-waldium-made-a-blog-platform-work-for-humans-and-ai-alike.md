---
title: "How Waldium made a blog platform work for humans and AI alike"
source: "https://vercel.com/blog/how-waldium-made-a-blog-platform-work-for-humans-and-ai-alike"
publishedDate: "2026-04-01"
category: "frontend"
feedName: "Vercel"
author: "Nic Vargus"
---

5 min read

Apr 1, 2026

[Waldium](https://www.waldium.com/) is a two-person, YC-backed startup that built an agentic CMS for businesses. Co-founded by Amrutha Gujjar and CTO Shivam Singhal, the platform automates content research and creation, and gives every customer blog its own MCP server endpoint so AI agents can query it directly. Today, it all runs from a single [Next.js](https://nextjs.org/) deployment on Vercel.

Amrutha spent years building software where the infrastructure kept getting in the way. "I was never stuck on the part I was excited to build," she says. "It was always the infrastructure friction around it." That frustration became a design principle for Waldium. The infrastructure needed to disappear so the product could stay focused on what made it interesting.

**Waldium on Vercel**

-   **500+** customer blogs served from a single Vercel deployment
    
-   New customers get MCP endpoints live in under 5 minutes
    
-   AI query response times consistently under 50ms globally
    
-   **45%** lower infrastructure cost vs. per-customer deployment model
    
-   One customer generated 1,000+ posts in a single month; research time cut from weeks to hours
    

![A Waldium-powered blog index page showing category tabs, post cards, and author avatars (InfraStack Engineering example)](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F77DGdVsLXM3vRmYRjWQoPl%2Fc363836a9d4c5c306b87041a9dca3f36%2Fblog-index.png&w=1920&q=75)

A Waldium-powered blog index page showing category tabs, post cards, and author avatars (InfraStack Engineering example)

## [Link to heading](#when-agents-became-part-of-the-audience)When agents became part of the audience

Waldium started the way most content platforms do, building blogs for humans to read. But something Amrutha kept noticing was quietly changing who, and what, showed up to read them.

> The people consuming content are not even necessarily people these days. It's oftentimes agents consuming content.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/5Ft5a41x3A0xinlEIVDwV0/691ff799d1f804d5fc93ca6dbad621f9/amrutha-gujjar.jpeg)
> 
> **Amrutha Gujjar**

Developers and technical teams were pulling blog content into their coding environments, into Claude Desktop, into ChatGPT, using it as live context in the tools where they actually worked. The browser tab was still part of the picture, but it wasn't the whole story anymore. Content that couldn't travel into those environments was leaving reach on the table.

That insight pointed Waldium toward [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) as the right primitive. If every customer blog had its own MCP server endpoint, an AI assistant could search, retrieve, and interact with that content directly, without anyone leaving their workflow. A developer could ask an agent to find a specific code snippet across an entire blog archive and get an answer in the same window where they were building.

For technical founders who don't think of themselves as marketers, it opened up something new entirely. "Being able to use MCP," Amrutha says, "allows you to create a blog post from the same place you're building a feature."

The vision was clear, but the infrastructure question was harder.

## [Link to heading](#a-thousand-front-pages,-one-codebase)A thousand front pages, one codebase

Supporting hundreds of customer blogs across custom domains is already a serious engineering challenge. Give every one of those blogs its own branded MCP server, with subdomain generation, SSL certificates, and a live install page, and you quickly outgrow the DIY approach.

Waldium had started by assembling their own pipeline on AWS Amplify, wiring GitHub Actions, managing deployment configs, and handling SSL manually. As the number of tenants grew, the complexity grew faster, and the team found themselves spending more time maintaining infrastructure than building their product. They moved to Vercel early, and the difference was immediate.

"The developer experience is so seamless," Amrutha says. "It allows our team to focus on what we do best."

![The Waldium admin dashboard showing branding controls alongside a live preview of the customer blog](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3sHGa1k0SNfOGYJiTbipNv%2F3e959b5bffaae4030bdcc4d8de47a083%2Fcustomize.png&w=1920&q=75)

The Waldium admin dashboard showing branding controls alongside a live preview of the customer blog

The unlock for Waldium's MCP infrastructure specifically was [Vercel for Platforms](https://vercel.com/docs/multi-tenant). With a single Next.js application, the team now serves every customer blog, every MCP endpoint, and every custom domain from one unified deployment. [Vercel Middleware](https://vercel.com/docs/functions/edge-middleware) handles routing dynamically so that when an AI agent sends a query, the request reaches the right tenant automatically.

The [Vercel Domains API](https://vercel.com/docs/multi-tenant/domain-management) provisions custom domains in seconds, with SSL certificates issued and renewed without any manual work. When Waldium evaluated MCP-specific hosting tools, the subdomain limits weren't close. Competitors capped out in the dozens. Vercel handles tens of thousands.

> It allowed us to think at scale without having to worry about scale.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/5Ft5a41x3A0xinlEIVDwV0/691ff799d1f804d5fc93ca6dbad621f9/amrutha-gujjar.jpeg)
> 
> **Amrutha Gujjar**

Shivam points to the overall mental model as the thing that's proved stickiest. "It's very simple now: push to a particular git branch, get a preview deployment, get a production deployment. It works cleanly with authentication, with our databases. It just works." The integrated storage layer, with [Neon](https://vercel.com/marketplace/neon) and [Upstash](https://vercel.com/marketplace/upstash) sitting alongside the application rather than off in a separate console, gave the team what he calls "a single pane of glass into all the parts of our system."

![A single blog post on a Waldium-powered site with hero image, breadcrumbs, author, and tags](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FFCw6ENuyf7akHxqO1pG86%2F862ca726cc49f0c0608dbe44a1e0a201%2Fblog-post.png&w=1920&q=75)

A single blog post on a Waldium-powered site with hero image, breadcrumbs, author, and tags

Today, a new customer signs up, gets a unique subdomain generated during onboarding, and walks away with a sitemap, [LLMs.txt](https://llmstxt.org/), robots.txt, an MCP install page, and a live MCP endpoint, all in under five minutes.

## [Link to heading](#from-weeks-of-research-to-a-thousand-posts)From weeks of research to a thousand posts

Because Waldium could give every customer a dedicated MCP endpoint without per-tenant infrastructure work, their customers got a distribution channel that simply didn't exist before. Their content became queryable directly inside AI assistants, not just discoverable through search.

Take [Saphira AI](https://saphira.ai/), a safety compliance company that publishes highly technical educational content. Previously, their team faced weeks of manual research for every content push, with someone reading through thousands of pages of ISO standards to identify what would actually be useful to customers. With Waldium, a team of research agents handles that work continuously, building company and industry profiles, flagging newsworthy developments, and generating content at a volume no traditional content team could match. Saphira AI produced over 1,000 posts in a single month. The research timeline went from weeks to hours.

Amrutha sees this as the new table stakes.

> Before, if you were starting a business, you had a landing page. Today, if you're starting a business, you have to have a corpus of data about your business that an LLM can consume.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/5Ft5a41x3A0xinlEIVDwV0/691ff799d1f804d5fc93ca6dbad621f9/amrutha-gujjar.jpeg)
> 
> **Amrutha Gujjar**

Waldium is building that path, and [Vercel for Platforms](https://vercel.com/docs/multi-tenant) is what makes it possible to hand it to hundreds of customers at once, without rebuilding it for each one.

"Once you understand how good things can be," Amrutha says, "it's really hard to go back to a product that hasn't given as much intentional thought toward good design."

That's what happens when good engineers pick the right foundation. Waldium is still a two-person team, and 500+ businesses are publishing through their platform every day.

_About Waldium:_ [Waldium](https://www.waldium.com/) _is a YC-backed platform founded by Amrutha Gujjar and Shivam Singhal. Learn more at_ [waldium.com](https://www.waldium.com/)_._