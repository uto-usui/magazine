---
title: "Designing product simplicity for the agentic AI era"
source: "https://commandline.microsoft.com/design-product-simplicity-seamless-ux-ui-agentic-ai-azure-developer-services-foundry/"
publishedDate: "2026-09-03"
category: "design"
feedName: "Sidebar"
---

When I returned from maternity leave in March 2026, I felt like I had entered an alternate universe. I rejoined a newly restructured organization, moved to a different team, and was managing a new portfolio of products and people within [Azure](https://azure.microsoft.com/) Developer Services. 

I expected to spend time learning a new product space, but I didn’t expect to spend time relearning what it means to be a designer. 

The teams around me were already using [GitHub Copilot](https://github.com/features/copilot) and agents in their daily work. Designers on my team were moving beyond making static mockups and clickable prototypes in Figma. Some were contributing directly to production code using [VS Code](https://code.visualstudio.com/) or the GitHub Copilot CLI. The traditional boundary between design and engineering seemed more blurred than ever. 

Even though I had spent portions of my leave experimenting with AI, I was still blown away by how quickly things had changed in such a short period of time.

> The same forces that were helping teams execute faster were also making it harder to achieve consistency across surfaces.

As I acclimated to my new surroundings, I found myself asking a lot of obvious questions (my kinder rebrand of “dumb” questions). Designers, engineers, and product teams across Azure Developer Services generously shared context, taught me new tools, and helped me understand how products fit together across CoreAI. As I learned more about individual products, I began to see a broader pattern. The same forces that were helping teams execute faster were also making it harder to achieve consistency across surfaces.

## Beyond shared components 

CoreAI is Microsoft’s organization bringing together AI platforms, developer tools, and services—including Microsoft Foundry and Azure Developer Services—to help developers build and operate AI-powered applications. As this portfolio has grown rapidly to meet the evolving needs of AI-empowered developers, so has the number of offerings outside Azure, including the Microsoft Foundry portal and standalone Azure Developer Services portals. Each product serves a different purpose, but we want customers to experience and use them together as a platform. 

As our teams increasingly built portals, a challenge emerged: 

**How do independently built products feel like parts of the same ecosystem?** 

Many of these portals were already built using [Fluent 2](https://fluent2.microsoft.design/), the latest version of Microsoft’s design system. In fact, it was a requirement for any standalone portal to be built using this framework. That gave teams access to the same accessible, high-quality components and visual foundations. But we realized that **even though we were using the same atomic components, our suite of products felt disjointed**. 

> Even though we were using the same atomic components, our suite of products felt disjointed.

Think of a set of LEGO® bricks. The set can include the same color, size, and shaped pieces. However, if you give three people the same materials and ask them to build a house, they’ll all end up with something that looks pretty different.

![Illustrations by Owen Richard.](https://commandline.microsoft.com/wp-content/uploads/2026/08/image-14-1024x815.png)

Illustrations by Owen Richard.

The same thing had happened with the portals across CoreAI. Teams used the same buttons, tables, and controls while still creating dramatically different navigation models, page layouts, workflows, detail views, and dashboards. Each decision may make sense locally, but when you zoom out and look at the services as a family, you see many points of differentiation that don’t serve a purpose. In other words, the differences are not earned. This happens when humans are making decisions—and it’s even more of a problem when agents are at the helm, since they leverage historical choices that might not have been correct in the first place. 

For customers moving between related products, that friction shows up as cognitive overhead. People find themselves repeatedly learning and relearning patterns that essentially solve the same problems. What customers experience as “complexity” is often just unnecessary differentiation.

## A familiar problem 

Before Microsoft, I spent several years at IBM, where I worked with Carbon, IBM’s enterprise design system. 

In addition to providing a collection of components, Carbon was an organizational strategy for creating coherence across a large and growing portfolio of products built by different teams. At IBM, I saw firsthand how a shared design system helps teams align as products evolve by giving them a common foundation while preserving room to solve distinct customer needs. Without that shared foundation, even reasonable local decisions can accumulate into complexity for customers. 

> “Inconsistency compounds.”

– Dave Chan

 As Foundry Product Designer Dave Chan poignantly observed, “Inconsistency compounds.” 

That experience shaped how I understood what I saw across CoreAI. Our teams didn’t lack talented designers, strong engineering practices, or a shared component foundation. Fluent 2 already provided much of that. The challenge was creating coherence across a rapidly expanding ecosystem of products while preserving the flexibility individual teams needed to solve unique customer problems.

> AI was changing how the software itself was being built and who—or what—was consuming the design system.

In many ways, CoreAI was facing a modern version of a challenge enterprise software organizations have wrestled with for decades. The difference was that, this time, AI was changing how the software itself was being built and who_—or what_—was consuming the design system.

## Product simplicity as a strategic priority 

This spring, EVP of CoreAI Jay Parikh introduced product simplicity as a strategic focus area. He challenged us to reduce unnecessary complexity and create experiences that are easier to understand, learn, and trust. 

CVP of CoreAI Design John Maeda has explored this focus area and teased it out into four complementary disciplines. These pillars all contribute to the overarching notion of product simplicity: 

1.  **Decision Making:** Build the _right_ thing through deep customer understanding.
2.  **Engineering Craft:** Build and refine resilient, high-quality systems.
3.  **Coherence Making:** Create consistency across experiences.
4.  **Product Craft:** Deliver thoughtful, polished experiences customers value.

The challenge we were facing heavily aligned with _coherence making_. As products evolved independently, how could they still feel connected? That’s a question that a _traditional_ design system could solve. More importantly, how could they continue feeling connected as AI accelerated the speed at which software was being created? That’s a question for this new era.

## Learning from existing success 

Fortunately, we weren’t starting from scratch. Teams working on Microsoft Foundry had already spent significant time solving similar problems. In preparation for its Next Gen release, a group of contributors developed a design system for Foundry, with Senior Designer Owen Richard playing a leading role in shaping its vision for developer audiences.  

This system delivered a smooth, clean, and modernized experience. It was further influenced by Foundry’s sister products, GitHub and Visual Studio Code, so the team crafted components and patterns that felt familiar across these canvases. Functionally, the team leveraged the best parts of Fluent under the hood, so they wouldn’t waste time reinventing the wheel. The result was a curated collection of components forked from Fluent and styled in a design language specific to Foundry. UX Engineer James Bradford refined the production components for this system, ensuring they were accessible to coding agents. In parallel, the UX engineering team also created a prototyping sandbox called Mini Foundry, which empowered designers and PMs to prototype in code while avoiding the complexities of Foundry’s production codebase. 

Through this exercise, Foundry defined variables that emerged through customer feedback, iteration, and the practical realities of building a complex product at scale.

Rather than creating yet another independent design system for Azure-based experiences, we saw an opportunity to build on the Foundry design team’s extensive work. That is the genesis of the CoreAI Design System: a framework to unify the suite of services under the CoreAI umbrella. 

The goal has never been to make every product identical. Rather, our goal was to establish shared expectations around common experiences. There’s no reason why every portal should have a different create flow. People moving between products should encounter familiar approaches to tables, detail pages, navigation models, and other recurring patterns.  

> Consistency—or lack thereof—was the symptom of a problem that simplicity could cure.

Designers and engineers should start from common foundations rather than reinventing solutions repeatedly. Not only does this simplicity improve the customer’s experience, it also saves unnecessary production toil spent reimagining patterns over and over again in each portal experience. 

Consistency—or lack thereof—was the symptom of a problem that simplicity could cure. 

## Product simplicity for humans and agents 

As we worked toward product simplicity, we had to acknowledge that the way software is created has changed drastically—and it continues to do so. 

Historically, design systems were built primarily for humans. Designers worked in design tools like Figma and engineers worked in code. Design engineers and frontend developers often bridged the gap, translating design intent into production implementation. 

That model is evolving. Today, designers can describe a change to their Copilot and receive a working implementation. The artifact moving between design and engineering is no longer always a mockup or specification. Increasingly, it is code. 

If product simplicity depends on consistent implementation across products, and AI systems are participating in implementation, then design guidance must be consumable by more than just people. It must be consumable by the agents helping build the experience as well. This understanding influenced how we approached the CoreAI Design System. 

Rather than only creating a traditional component library accompanied by documentation, our goal is to design a system that supports both human decision-making and AI-assisted development workflows. This strategy will support designers at varying stages of their product teams’ AI readiness.

![Illustrations by Owen Richard.](https://commandline.microsoft.com/wp-content/uploads/2026/08/image-15-1024x576.png)

Illustrations by Owen Richard.

If you’re operating with the **clickable prototype handoff, you can use our Figma library** as a resource. The CoreAI Figma library is the more traditional repository of guidance and redlined componentry that designers are highly familiar with. 

If you’re making **changes in code, you’ll be able to connect to our MCP server**. To make this possible, we’re adding a context layer—a set of references and metadata that both humans and agents can use to interpret guidance and adapt it to their specific scenarios. This context layer ensures that recommendations aren’t just static rules but living guidance that adjusts to the needs of different products, teams, and implementation environments. 

Our MCP server provides access to getting started guidance, usage examples, implementation recommendations, and pattern documentation. This is currently experimental, and designers are testing this methodology as I write and as you read. Through this effort, James Bradford and other design engineers made notable revelations. 

-   API documentation proved to be one of the least valuable pieces of information. Agents can often understand component APIs directly from installed packages and TypeScript definitions. What they struggle with is intent. When should a pattern be used? What approach should be used and why? Examples, constraints, and guidance often matter more than API signatures.
-   Progressive disclosure benefits agents just as much as people. Instead of organizing knowledge into large documents, guidance is broken into smaller focused topics connected through references and indexes. This lets agents retrieve only the information relevant to the task at hand, reducing noise and improving implementation quality.

One goal of our system is to reduce the distance between design intent and production code. Instead of treating handoff as a static artifact, we want designers to be able to describe changes, work with AI-assisted tools, and generate experiences built from the same foundations used in production. In that world, the design system becomes less of a reference manual and more of an active source of truth shared by designers, PMs, engineers, and agents. By delivering our system through various mechanisms, we also acknowledge that not all components should be distributed the same way. Some patterns are more appropriately delivered as reusable components. Others work better as template examples that teams can fork to adapt to their own environments. Or maybe a team just needs examples demonstrating preferred approaches to common product scenarios. 

> Ultimately, consistency in service of our customers is what product simplicity is all about.

By designing the system around how both people and agents consume information, we increased the likelihood that shared patterns would be applied consistently across products. And ultimately, consistency in service of our customers is what product simplicity is all about.

## Building a community around simplicity 

Creating guidance for foundational elements was only part of the work. We needed a model that supported continuous addition and refinement for high-impact patterns. Designers and design engineers from Foundry and Azure Developer Services formed a v-team (James Bradford, Alex Britez, Will Eastler, Dana Lachman, Owen Richard, Kham Udom, and myself) to continue building out pattern guidance that had the highest impact and highest usage across our canvases. 

To ensure our solutions addressed a variety of use cases, we recruited volunteers from multiple product areas for month-long sprints dedicated to formalizing and documenting these patterns. By using product designers to build out our guidance, we ensure they account for realistic scenarios that they’ve seen in their own products or peer products. The first sprint tackled data grids and detail pages, with Foundry designers Amy Chen, Dasi Fletcher, and Thoa Nguyen leading the effort. Their success set the stage for a second sprint, where Azure Developer Services designers Kristin Holifield and Xiaowei Jiang created templates for a complex but high-impact pattern: create flows. 

To maintain momentum and foster collaboration, we established weekly checkpoints and open office hours. These sessions provide a regular forum for volunteers and other design system users to: 

-   Ask questions about ongoing work or upcoming sprints
-   Share feedback and lessons learned
-   Exchange resources and best practices
-   Surface new pattern needs or challenges

When designers identify a pattern that needs attention, they can submit a ticket to our GitHub board. We triage these requests based on priority for inclusion in future sprints. For smaller contributions that don’t require a full sprint, designers are encouraged to submit ad hoc improvements directly to the system. 

Rather than treating consistency as something imposed by a central team, we see it as a capability developed collectively across the organization. 

While there’s still much to do, we can celebrate early wins and signs of success. What once could have taken months can now be accomplished in a couple days. When partners have the time to grant repo access and review PRs, Azure portal teams can adopt the baseline npm package for the design system in just a few days. In June 2026, no Azure portals were using the CoreAI Design System. In August, over five have the npm package installed, and that number is increasing as we learn about additional portal offerings. Stay tuned in to see how our portals gain coherence across experiences as they release publicly. The design system in and of itself is growing day by day as we support its expansion with dedicated sprints and ongoing contributions from other designers.

## Simplicity as a competitive advantage 

The CoreAI Design System is ultimately not a story about components, documentation, or design tooling. Rather, it’s a story about product simplicity. 

We understood that every unnecessary difference creates friction. Every interaction pattern customers must relearn increases their cognitive load. Every fragmented experience makes a portfolio feel more _complicated_ than complex. 

As AI lowers the barrier of creating new features and capabilities, experience quality becomes an increasingly important differentiator. Customers have more choices than ever before. The products that succeed won’t simply be the most powerful. They’ll be the products people can understand, learn, trust, and use with confidence. 

Product simplicity is how we get there. And increasingly, achieving that simplicity means designing systems that can be understood and optimized not only by people, but also by the agents helping people build the future.

### Acknowledgements 

I’d be remiss not to name the folks who made significant contributions to this work in production, guidance, and leadership: James Bradford, Alex Britez, Will Eastler, Dana Lachman, John Maeda, Owen Richard, and Quirine van Walt Meijer.

* * *

_All em dashes have been intentionally used by this post’s human author, who currently_ _leads_ _the design team for Azure Developer Services in CoreAI._