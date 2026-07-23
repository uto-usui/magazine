---
title: "Against design system federation"
source: "https://karolinaszczur.com/journal/against-design-system-federation/"
publishedDate: "2026-07-22"
category: "design"
feedName: "Sidebar"
---

Design systems operate under one of the following governance models: centralised, federated, or hybrid. All approaches have different benefits and drawbacks, swaying the decision-making scales depending on organisational priorities, maturity, size, and resourcing. Not all decisions are made the same, as one of these models stands to upend what design system teams care about most: cohesion, consistency, and a high bar for excellence. Yes, I’m talking about federated design systems.

A federated system (also known as decentralised) operates with no centralised ownership. Instead, it relies on feature teams maintaining it, most often as a side-track to delivery and bug fixing sprints. **Federation is the least favoured design system model**, with only [13% of teams working within that framework](https://report.zeroheight.com/#chart-your-ds-what-is-your-design-system-model), based on the latest ZeroHeight Design System Report (up from 9% a year prior).

Interestingly, [How We Document](https://hs-19492330.f.hubspotemail.net/hubfs/19492330/Community%20and%20Content/How%20We%20Document/HowWeDocument2024.pdf?utm_campaign=How%20We%20Document%20-%20MKTG.RESOURCE.FEB.24&utm_medium=email&_hsenc=p2ANqtz-9m7Maw3c35g_PWpGTLZlTvBGOKvq7-MDMsOThu4PaIrFdNIRux6oHPRoHdaBL9zXCMd7zv2G72Hkk3ZfA5BSL64RTcsQ&_hsmi=294104622&utm_content=294104622&utm_source=hs_automation), their first iteration of annual reporting, **showed the highest level of dissatisfaction among the federated cohort**, pointing to possible challenges with that model. While these surveys might not be fully representational of the design system practice, it’s a signal that teams are consciously steering away from federated governance. And there are good reasons for caution.

* * *

## Why federate now? [#](#why-federate-now)

What if federating is a panacea to the most pressing tech landscape challenges? In the past, I’ve seen federation poised as a remedy to two top concerns.

### Reclaiming resources to remedy organisational failures [#](#reclaiming-resources-to-remedy-organisational-failures)

The interest rise in federation is a byproduct of mass layoffs exacerbated by “AI” hype. Just this year, the [tech layoffs tracker](https://layoffs.fyi/) reported 226 companies letting over 120,000 employees go. And that’s only the layoffs _we know about_. Tech has been scrambling to offset faltering revenues, more discerning VCs, lack of product-market fit, and peak Covid over-hiring by shedding headcount (where most “savings” come from).

When the time comes to decide who stays and who goes, foundational-level teams are often the first getting axed (make it make sense). The death of design has been proclaimed for several years straight, and classical, web platform-oriented front-end has been struggling against the false appeal of React and Next.js’s hey-we-just-rewrote-CSS-in-JavaScript “innovation”. Not mentioning performance or accessibility, which always fought an uphill battle for interest, funding, and care.

**The skills that are the backbone of design systems (and lasting product design) are now first to go.** By federating, people can be rerouted to feature streams (which design systems always compete with for resources) or let them go, while maintaining a _vague_ impression that design system work still matters. After all, federation makes it so democratic ([more on this later](#ownership-is-democratic)).

### Maximising “AI” productivity illusion [#](#maximising-ai-productivity-illusion)

[Probabilistic automation](https://buttondown.com/maiht3k/archive/how-to-talk-about-ai-without-adding-to-the/) (“AI”) adds another enticing narrative for federation. If we believe that models bring significant productivity gains, and can reliably output any design system assets (especially components), a federated model is now suddenly supported by as many software manipulators as our budget can afford. **Whether the output is erroneous, its quality acceptable, or it fits into the system is another story** (often in these cases, velocity > quality).

Outside manipulating an existing system, models can be driven to generate design systems from scratch. Often popularised front-end frameworks, such as Tailwind or Shadcn are then used as a base for lightweight, on-brand theming. Big tool players (Figma Make, Claude Design) already built in these capabilities with a scattering of open source and paid tools available. All resulting in the spreading sameness of product UIs. But hey, let’s productivitymaxx.

[Echoing Nathan](https://medium.com/@nathanacurtis/the-fallacy-of-federated-design-systems-23b9a9a05542), “(federated design system) is _never_ pursued first and _never_ without central investment.” Federation is a reaction to structural issues. **Transitioning to this falsely legitimate governance model brings damage to systems, user experience, and team morale.** If something sounds too good to be true, it probably isn’t, but it doesn’t stop organisations from [pursuing alluring theories](https://www.shaunbent.co.uk/blog/why-federated-design-systems-keep-failing/).

* * *

## Failed promises of federation [#](#failed-promises-of-federation)

### Everyone will contribute [#](#everyone-will-contribute)

Centralised and hybrid design systems often struggle with soliciting contributions. By opening up the system, there’s an assumption each feature/focus team will default to evaluating their work through the systems’ lens, and subsequently contributing reusable pieces. [They won’t](https://www.shaunbent.co.uk/blog/why-federated-design-systems-keep-failing/#the-promise%3A-contributions-from-multiple-teams).

Teams are always stretched thin, buckling under the pressure of their backlogs. **Adding more responsibility without resourcing, specialised knowledge, and support is at best reckless, and malicious at worst.** With odds stacked against genuinely willing contributors, designers and engineers duplicate solutions outside the system to suit their needs, promising further consolidation that never happens.

In my experience as a design system leader guiding and supporting numerous contributions, feature teams were most happy if the design system folks addressed their needs without them directly contributing—they’re happy helping drive direction, but have no capacity to do the work within a stretched environment.

### Every contribution meets the bar [#](#every-contribution-meets-the-bar)

Another barrier that makes universal contributions scarce is the required specialised knowledge. Not only the awareness of the systems' current state (and future direction), but also the ability to make infrastructure-level decisions. While organisational context might be easier to gain, designing and building architectures (no matter if it’s code, design, or content) require in-depth knowledge and often, seniority.

Design systems have a wide-reaching impact radius—contributions often have to meet multiple requirements: be genuinely needed, be generic enough to be highly reusable, leverage design tokens, follow design and code prop modelling guidelines, meet accessibility regulations, and that’s just the top of the mountain. **One of the most common frustrations of contributors is misunderstanding of the quality bar, and why it’s vital to uphold it.**

Federation can obscure this issue by changing how contributions are reviewed or lowering the expectations for successful addition. While the latter might decrease frustrations and enable artificial system growth, what you’re growing is substandard, increasing future maintenance cost and eating at UX cohesion. There’s a reason why design system practitioners [say no more often than yes](https://zeroheight.com/blog/the-cost-of-yes-design-systems-and-the-work-nobody-sees/).

### Ownership is democratic [#](#ownership-is-democratic)

Theoretically, diffusing ownership of a design system could make it more equitable. Contributions become freer as all designers own the system—no more pitches and difficult conversations where the maintaining team pushes back. This ideal falls apart quickly when meeting the reality of a leadership vacuum and reinforcement of existing structures of power.

“Where everyone is responsible, no one is really responsible”, says Albert Bandura, and he’s right. Diffusion of responsibility manifests itself at workplaces regularly—the larger the group, the easier it is to forgo accountability and rely on someone else (who?) to address issues. Everyone quickly becomes no-one, and the critical work of maintaining the health and direction of the design system stalls. **Without dedicated ownership, the system collapses into chaos and growing debt.**

[As expertly explained by Amy Hupe](https://amyhupe.co.uk/articles/your-contribution-model-is-doomed/), systems also enforce existing inequalities, making equitable distribution of power challenging. Not all contributors will face a level playing field under any governance model, even more so with hazy ownership. Seniority, age, race, gender, and other intersectional axes will grant and take power away. What’s advertised as a democratic dream, ends up more confusing and exclusionary.

### Time to value is cheaper [#](#time-to-value-is-cheaper)

Federation is a cost-cutting measure. With more people working in the feature streams with design system work only done when absolutely needed, any organisation can deliver customer value with spending fraction of the cost. In an adverse economy, re-allocating people to what tech companies see as most valuable (more features! more scale!) will always take precedence over system maintenance. What’s cheaper long term, will come back with high interest later.

To realise the savings, we’d have to assume a high rate of contributions and solution reusability. Both of which are markedly more challenging under the federated model, making it highly unlikely. **Enabling high velocity with design system infrastructure requires a mature practice, smooth cross-functional collaboration, and deeply researched, scalable solutions—ingredients organisations nearly never get right.**

If we forget maturity and let go of firm guardrails, velocity can be obtained by allowing snowflake solutions to get into the system. What previously belonged to the depths of a Figma/GitHub file tree, now exists in the system; therefore, feature work is produced with the established process. Bam, now we have savings, and [1,500 components](https://www.shaunbent.co.uk/blog/why-federated-design-systems-keep-failing/#what-happened-instead%3A-duplication-without-reuse).

* * *

## Federation is an aspect, not a model [#](#federation-is-an-aspect-not-a-model)

Federated model requires organisational perfection. The odds are stacked against it from the beginning, fuelled by [damaging myths leaders fall for](https://medium.com/@nathanacurtis/the-fallacy-of-federated-design-systems-23b9a9a05542#b6e2). Federating demands more overhead and operational diligence than any centralised team would, leaving chaos in their wake when federated eventually comes back around to centralisation (I’ve seen this happen). Design system is now set aback multiple years of janitorial work to bring it back to consistency.

While federation isn’t successful standalone, I’ve seen it work effectively as an aspect of centralised governance (forming the currently most popular, hybrid approach). Hybrid models support ongoing maintenance and growth, while soliciting contributions from feature teams. Design system practitioners focus on their core competencies, while getting feedback from individuals who know their respective areas best.

**Treating federation as an aspect of a hybrid model doesn’t solve the issues described above, but it does lessen their impact.** Managing contributions remains a challenge across all governance types. So does democratising ownership and distributing power. Measuring just how much a system enables delivery remains tricky, too. But at least, we aren’t setting up teams for failure. Nor are we trading team morale for failed promises.