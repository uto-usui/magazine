---
title: "How Sandstone grew 40x in 147 days on Vercel"
source: "https://vercel.com/blog/how-sandstone-grew-40x-in-147-days-on-vercel"
publishedDate: "2026-07-27"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

### [Copy link to heading](#sandstone-on-vercel)**Sandstone on Vercel**

-   1,000+ legal requests managed daily across customer teams
    
-   7-app turborepo monorepo deployed seamlessly to multiple Vercel projects
    
-   Multi-step agentic legal workflows built end-to-end with AI SDK
    

When in-house legal teams get a request from their business, it kicks off a manual process of pulling data from multiple systems. In a typical workflow, lawyers will pull deal details from Salesforce, review past contracts, and chase account teams for missing context, all before they start the legal work itself.

Sandstone automates this data gathering process, and centralizes requests into a single platform. When a request is created, Sandstone automatically ingests context from every system, including messaging and email tools. By the time the lawyer sees it, they have all of the information they need to get to work.

The founding team includes a McKinsey legal tech veteran, a lawyer-turned-engineer, and cybersecurity founder. At Sandstone, that mix shows up directly in the product: legal professionals work alongside engineers, catching the workflow details and legal nuances that only someone who has practiced law would notice. That is how Sandstone ships fast and correctly for one of the most demanding buyers in enterprise software.

That attention to detail has paid off: in less than 6 months after their launch, their revenue grew 40x. Three things made their growth possible on Vercel:

-   Preview deployments fast enough to win enterprise trust
    
-   An AI layer flexible enough to ship agentic workflows in minutes
    
-   [Secure Compute](https://vercel.com/docs/networking/secure-compute) that makes security a one-sentence answer
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5zi9tsWwMhJfKdeEboMeQ9%2F905176e97bd85412a1514f1b8c18d266%2FCleanShot_2026-06-23_at_11.04.07.png&w=1920&q=75)

### [Copy link to heading](#vercel-deployments-turned-a-sunday-request-into-a-five-minute-fix)**Vercel deployments turned a Sunday request into a five-minute fix**

For Sandstone's customers, trust is built on responsiveness, and lawyers are trained to notice small details. Liam Germain, Co-Founder and CTO, puts it simply: when a customer asked for a scrollbar accessibility change on a Sunday, he had it live in production in five minutes. On any other platform, he said that same change would have taken five or ten times longer.

Vercel deployments help with more than just fixes. [Preview branches with inline commenting](https://vercel.com/docs/comments/using-comments) mean Sandstone's head of marketing can leave a note on a live landing page with Vercel Toolbar, which is configured to automatically creates a Linear issue and assigns it to engineering. What used to take an afternoon happens in a single comment.

[Vercel Flags](https://vercel.com/docs/flags) runs feature flags across all applications, giving the team dynamic control over what is live, what is demoed, and what is still in progress, without touching a deployment.

Sandstone runs a [monorepo](https://vercel.com/docs/monorepos) of over seven applications across multiple Vercel projects with clean environment variable linking and a custom CLI built on top of Vercel's API layer, and every push on every repo generates a preview of production.  

> Nothing has saved us more time than Vercel preview branches with comments.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/52zGTtZbHe5kn38Aeqbk0l/ad8c512587a2d3f1edfa9fa04d26bd01/Liam_Germain-_Sandstone.png)
> 
> Liam Germain Co-Founder & CTO

## [Copy link to heading](#without-the-right-foundation,-complexity-kills-velocity)Without the right foundation, complexity kills velocity

Sandstone's product started as smart triage, routing requests to the right lawyer. But the bigger opportunity was what happened when a request landed: every lawyer was still manually gathering context before they could act, pulling relevant details from a handful of separate systems, every time, for every request. Shipping a system that could handle that automatically required infrastructure capable of keeping pace with the product vision.

#### [Copy link to heading](#ai-sdk-unlocks-faster-agentic-workflows)**AI SDK unlocks faster agentic workflows**

Sandstone has evolved into an AI system that executes complex, multi-step legal workflows end-to-end, searching through thousands of procurement agreements, surfacing the most at-risk agreements, alerting owners via Slack, and notifying legal when responses come in.

Vercel's [AI SDK](https://ai-sdk.dev/) is what makes those workflows composable enough for a small team to keep pace with a rapidly expanding product surface.

The composability shows up across the entire stack. Chat SDK powers the Teams integration. Emulate SDK handles integration testing for Slack and Okta. Agent Browser SDK runs agentic testing locally. Flags SDK drives the toolbar integration. One SDK, four workflows, zero separate infrastructure.

> I could add a new tool to our AI SDK setup in ten minutes. It's just made shipping super easy, and we trust that Vercel is front of market in terms of what's available.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/52zGTtZbHe5kn38Aeqbk0l/ad8c512587a2d3f1edfa9fa04d26bd01/Liam_Germain-_Sandstone.png)
> 
> Liam Germain Co-Founder and CTO

## [Copy link to heading](#vercel-secure-compute-makes-security-a-one-sentence-answer)Vercel Secure Compute makes security a one-sentence answer

Sandstone uses Vercel [Secure Compute](https://vercel.com/docs/networking/secure-compute) to establish private communication between Vercel and its data layer. The setup was straightforward to implement and well-architected enough that it became a point of confidence rather than friction in every enterprise conversation. When the security question comes up with customers and prospects, and it always does, the answer is simple: all communication between Vercel and Sandstone's data layer is private and never touches the public internet.

Sandstone chooses platforms they believe will be ahead of the market in three to five years, a vendor evaluation framework they apply to both frontier model providers and core infrastructure.

> Vercel is the only platform that moves at our pace. Every day in my dev tools channel there's something new. No other company is pushing the industry forward like that.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/52zGTtZbHe5kn38Aeqbk0l/ad8c512587a2d3f1edfa9fa04d26bd01/Liam_Germain-_Sandstone.png)
> 
> Liam Germain Co-Founder & CTO

Sandstone connected with the Vercel team through the Sequoia startup partnership. Within ten days of starting the company, the program gave them a shared Slack channel and access to engineers who could help think through architecture decisions in real time.

## [Copy link to heading](#what’s-next)What’s next

Less than 6 months after launch, Sandstone had grown revenue 40x and landed customers across technology, manufacturing, and ecommerce, leading to a $30M Series A led by Lightspeed. The team is already shipping fast, so the goal for using that capital is straightforward: get Sandstone into more legal departments.

The vision they are building toward is a Legal Relationship Management platform that not only manages intake but also connects every workflow to the business context behind it, flags issues before they surface, and operationalizes legal knowledge through supervised agents. Sandstone describes this as a system of action for the legal department of the future.

For a team shipping with speed toward that ambition, the [infrastructure](https://vercel.com/blog/agentic-infrastructure) underneath the product has be a competitive advantage, not a burden, and that's why Sandstone runs on Vercel.

**About** [**Sandstone**](https://sandstone.com/)**:** Sandstone was born out of the acute frustration experienced by in-house legal teams who spend more time on process than progress due to fragmentation across disparate business systems. The platform provides a comprehensive solution for intake, triage, execution, fulfillment, and measurement of legal work, designed to run across email, messaging, and the business tools teams already use.