---
title: "Inside the Vercel intern experience"
source: "https://vercel.com/blog/inside-the-vercel-intern-experience"
publishedDate: "2026-08-13"
category: "frontend"
feedName: "Vercel"
author: "Robin Lee"
---

The best way to learn is by shipping product to users in production, and that's why we don’t treat our interns as temporary guests. Every intern at Vercel is expected to operate like a core part of our engineering team from day one.

![Each person in our Winter 2026 Intern cohort shipped product to production](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fen2lewyGC6ikJ25dE1uN9%2Fd126ec066eaf018b7a661676e1311268%2Fimage1.png&w=1920&q=75)

Each person in our Winter 2026 Intern cohort shipped product to production

This past winter, we welcomed a small cohort of those interns to our headquarters in San Francisco. Over an intense four months, they contributed to some of our most important products: the CDN, v0, financial infrastructure, AI Gateway, and more. They shipped features used by millions, helped close the gap for enterprise deals, and in more than a few cases, left a mark that will outlast their time here.

## [Copy link to heading](#meet-the-winter-'26-intern-cohort)Meet the Winter '26 intern cohort

### [Copy link to heading](#yash-kothari,-cdn-team)Yash Kothari, CDN Team

_University of Waterloo_

> At most companies this size, interns get a single well-scoped project that's usually not very visible or customer-facing. At Vercel, I was able to ship features to GA.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/1RYDJt9VMAZFNO2PEUhK2f/8d8f4e337ab2ba24bf2e65e9f33f95e4/yash.png)
> 
> —Yash Kothari CDN Team

**What Yash shipped:**

Yash's internship spanned the full CDN stack, from infrastructure to CLI to UI in the dashboard.

His first major project was [**Project-level routing**](https://vercel.com/changelog/vercels-cdn-now-supports-updating-routing-rules-without-a-new-deployment), which is part of the new CDN tab in the Vercel dashboard. This feature lets customers update routing rules, including redirects, rewrites, and header transforms, from the dashboard, API, CLI, or SDK, without needing to redeploy their project or touch a single line of code. Yash built the underlying API endpoints (including a staging/publish workflow), the [`vercel routes`](https://vercel.com/docs/cli/routes) CLI commands, and contributed AI-powered route generation. Right after launch, hundreds of teams immediately adopted it and created thousands of rules.

"One of my favorite things about my internship was that at Vercel you get a lot of autonomy and ownership," Yash said. "I hopped on calls with enterprise customers, saw my work featured on Vercel's changelog, and demoed my work in a live YouTube community session."

In the second half of his internship, Yash worked on Vercel's Firewall and Security products. He shipped the [`vercel firewall`](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli) CLI command, enabling users and AI agents to configure custom rules, IP blocks, and firewall controls directly from the terminal. He also built an [**AI-powered Firewall Rule Builder**](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language) that lets users describe a desired rule in natural language and generates a WAF custom rule automatically.

### [Copy link to heading](#kavin-valli,-v0-team)Kavin Valli, v0 Team

_University of Waterloo_

> I like being in that kind of environment where things are moving fast and you have to figure it out as you go.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/nq3ef3PO38K7psBunxf66/e10e9610cf3728c082a2eb7c21f9900e/kavin.png)
> 
> —Kavin Valli v0 Team

**What Kavin shipped:**

Kavin worked across the full v0 platform over four months, taking on projects that ranged from user-facing features to cost efficiency for the system’s backend infrastructure.

He started by building [**Folders and v0 Projects**](https://v0.app/changelog) end-to-end: core CRUD operations, a library page redesign, favoriting, visibility controls (private/team/public), and folder sharing. He also closed a critical gap in v0's version history by shipping the **manual commit button**, which ensured that manual edits in the VM editor properly created commits and blocks, which closed the loop between manual edits and v0's iteration model.

His highest-leverage work came later in the term, when he focused on **VM and sandbox infrastructure**. By splitting VMs into tiered pools and routing smaller projects to a cost-efficient default pool, Kavin significantly reduced memory usage and infrastructure cost for roughly 80% of sandboxes.

"I worked on v0 and got thrown into the deep end pretty quickly, especially around the v1 launch," remembered Kavin. "It was a bit chaotic at times, but that's something I actually enjoyed."

His final and most involved project was taking ownership of the [**v0 Slack agent**](https://v0.app/docs/slack). He shipped Slack preview deployments for safe testing, rebuilt the router agent with improved thread history and SAML re-auth resume, redesigned project context tracking, and built out the full PR flow including v0 labels, Slack thread links, and merged/closed state tracking. The result was an agent that went from rough around the edges to something teams can genuinely rely on.

### [Copy link to heading](#mingchung-xia,-financial-infrastructure-team)Mingchung Xia, Financial Infrastructure Team

_University of Waterloo_

> I shipped production financial code that impacts real users.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/5OXa7cvw3HjluYwyip9HUh/aaff4b7ab3752df409c34858889fc3e8/mingchung.png)
> 
> —Mingchung Xia Financial Infrastructure Team

**What Mingchung shipped:**

Mingchung pushed over 250 PRs in four months and became one of the top contributors on Vercel's central control systems monorepo.

His most externally visible project was the [`v1/billing/charges`](https://vercel.com/changelog/access-billing-usage-cost-data-api) API endpoint and the [`vercel usage`](https://vercel.com/changelog/access-billing-usage-cost-data-api) CLI command, which let users view their usage and costs in the standardized FOCUS v1.3 FinOps format. Originally scoped as a full-internship project, Mingchung completed it early and expanded its scope into a joint launch with Vantage. The work was subsequently adopted by Meta, Notion, Porsche, and other prominent companies to analyze their Vercel spend in a modern, compliant format.

His most technically complex project was designing and building **Vercel's core entitlements system**, which is the infrastructure that enables granting, revoking, and provisioning entitlements across project-based monetization, add-ons, enterprise, and marketplace work streams. The system architecture incorporated strong and eventual consistency guarantees, async and synchronous derivations, transactional outboxing, write-ahead logs, plan change manifests, stale-validation sentinels, and materializations. It was rolled out to production and backfilled across all active subscriptions.

"Most companies don't give interns or even existing engineers the opportunity to touch payment systems or billing infrastructure, let alone own it end to end," explained Mingchung. "Correctness is imperative when you're working with money, and I got to experience that firsthand at Vercel."

He finished his internship by shipping [**Vercel Buy**](https://vercel.com/docs/cli/buy), a new billing service supporting frictionless purchasing for agent credits, gateway credits, v0 credits, and pro subscriptions, complete with a CLI surface.

Mingchung will be joining Vercel full-time on the Financial Infrastructure team after completing his degree.

### [Copy link to heading](#kevin-thomas,-v0-team)Kevin Thomas, v0 Team

_University of Waterloo_

> Instead of a neatly boxed-in intern project, we had the autonomy to really dive straight into the deep end and take ownership over essential chunks of the v0 project.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/6ash5lFKqGACzclDQk4tkV/7f433c3b5330a47ea9fbd43843a4b94e/kevin.png)
> 
> —Kevin Thomas v0 Team

**What Kevin shipped:**

Kevin's work spanned ML infrastructure, enterprise features, reliability engineering, and incident response, often simultaneously.

His most ambitious self-directed project was [**v0's auto model routing system**](https://v0.app/changelog): a full pipeline that automatically routes user prompts to the right model tier based on complexity. Kevin proposed the system, built the labeling pipeline, experimented with multiple classifier architectures (embedding-based MLP classifiers, TF-IDF baselines, fine-tuned TinyBERT), and integrated everything into TypeScript-only functions for production deployment. By launch, the system had processed over 1.4 million v0 messages and became the default for all non-enterprise users, reducing decision fatigue and latency for a very large share of v0's user base.

"From working on on-call incidents and vulnerabilities in month one to working directly with enterprise customers in April, I've gotten to work on an unusually wide range of meaningful problems," Kevin said at the end of his internship.

In the latter half of his internship, Kevin focused on enterprise work, most notably the [**v0 × Snowflake integration**](https://vercel.com/go/v0-snowflake-integration). He built enterprise admin controls for model access, RBAC for team skill management, resolved issues in SAML and isolated tenant environments, and shipped the integration itself. This work directly unblocked enterprise customers, supported renewals, and addressed live customer issues.

Kevin also served as a primary investigator for several incidents around signup, billing, auth, and account access, staying at the center of v0's reliability work throughout his term.

### [Copy link to heading](#sylvie-zhang,-ai-gateway-team)Sylvie Zhang, AI Gateway Team

_University of Pennsylvania_

> Interning at Vercel felt a lot like being a full-time software engineer. I had the agency to make design decisions end-to-end and even talk directly to customers, all with mentorship along the way.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/6X4loZnvngyx5UBrCsIOch/00792c314f547ad0ef191ab7ec9bb67a/sylvie.png)
> 
> —Sylvie Zhang AI Gateway Team

**What Sylvie shipped:**

Sylvie worked across the [AI Gateway](https://vercel.com/docs/ai-gateway) service, contributing to everything from database and backend logic to observability, the frontend, and documentation.

Her first project was **Price Strikethrough**, surfacing provider MSRP as a strikethrough price alongside Gateway pricing, making provider discounts visible to end users. It touched the full stack and gave her a complete view of the AI Gateway product from the start.

"All that sounded daunting to a student like me with little experience," Sylvie said, "but it was the best learning experience I could have asked for."

Her most impactful and technically demanding project was the **AI SDK v5 → v6 endpoint migration** for AI Gateway's OpenAI-compatible and Anthropic-compatible endpoints. As the AI provider landscape had grown significantly more complex since v5 was designed, maintaining the legacy version had become a bottleneck, especially for handling token usage granularity differences across providers. Sylvie led the migration with a disciplined approach: deep cross-provider knowledge to catch incorrect AI-generated assumptions, systematic multi-turn and cross-provider testing scripts, concurrency testing to surface race conditions, proactive customer communication, and a deliberate fallback strategy that left legacy code in place until the migration proved stable.

The result was a cleaner, more maintainable Gateway service better equipped to handle the continued evolution of AI providers and models.

## [Copy link to heading](#advice-for-future-interns)Advice for future interns

We asked these interns to share their top advice for future cohorts.

![Interns work hard and enjoy group activities together throughout the semester](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FeExDlNiBKjHFdll2g8WhL%2F30710e1dd356573ea48e288f9c04f62c%2Fimage2.png&w=1920&q=75)

Interns work hard and enjoy group activities together throughout the semester

#### [Copy link to heading](#take-ownership-from-day-one)**Take ownership from day one**

Vercel gives interns real autonomy, but that means it's on you to use it well. Don't wait to be assigned work. Take initiative, identify what needs to be done, and start shipping.

#### [Copy link to heading](#ask-questions)**Ask questions**

Every intern said the same thing: no one at Vercel makes you feel like a burden for asking. The team genuinely wants you to succeed, so use that to your advantage and ask.

#### [Copy link to heading](#work-in-public)**Work in public**

Share your PRs in team channels. Post updates. Present at Demo Days. The feedback loop is fast, and the visibility helps you iterate and build trust faster.

#### [Copy link to heading](#talk-to-people-outside-your-team)**Talk to people outside your team**

Some of the best conversations happen across team lines with engineers, designers, finance, and people in roles you've never considered. Go to the office. Grab lunch with someone new.

#### [Copy link to heading](#give-yourself-time-to-ramp-up)**Give yourself time to ramp up**

The codebase, the culture, and the pace can be a lot at once. Don't rush. The first few weeks are for absorbing, not sprinting. Take time to ramp well, and you will be able to run fast.

## [Copy link to heading](#apply-to-become-a-vercel-intern)Apply to become a Vercel intern

There are additional internship opportunities coming soon. If you want to join our next cohort, check our [career site](https://vercel.com/careers) in September to apply.