---
title: "Why AI is exposing design’s craft crisis"
source: "https://www.doc.cc/articles/craft-crisis"
publishedDate: "2026-02-25"
category: "design"
feedName: "Sidebar"
---

### **Why AI is exposing design’s craft crisis**

AI didn’t create the craft crisis in design — it exposed the technical literacy gap that’s been eroding strategic influence for over a decade.

![Drawing of a monkey](https://images.prismic.io/doc-ux-collective/aZnDU8FoBIGEgngn_HeroPERSPECTIVE-1-.jpg?auto=format,compress&rect=429,0,1958,1958&w=1000&h=1000)

At [Figma’s Config 2024](https://www.figma.com/blog/whats-happening-at-config-2024/), CEO Dylan Field stood before 10,000 designers and typed a simple prompt: “A personal portfolio website for a sustainable Middle Earth architect.” Seconds later, a complete UI layout materialized on screen. The crowd watched as Figma’s AI generated wireframes, layouts, and design systems from text prompts.

Field’s pitch was seductive: “In a world where more software is being created and reimagined because of AI, designing and building products is everyone’s business.”

Everyone’s business. The democratization promise we’ve heard before — this time powered by GPT-4o and Amazon’s image generators. Some features got huge reactions. The Rename Layers tool earned cheers. But on social media after the event, a different story emerged.

![dylan field giving a talk](https://images.prismic.io/doc-ux-collective/aZOeQ1WLo0XkEjuN_dylan.png?auto=format,compress)

Dylan Field at Figma 2024 Config (Source: [Figma blog](https://www.figma.com/blog/whats-happening-at-config-2024/))

Designer [Sebastiaan de With wrote](https://sdw.space/figma-ai-and-lost-jobs/) what many were thinking: “Figma AI will kill most — if not all — of these entry-level design jobs… if someone can simply get that poster (and 10 more like it) generated in a click, people will opt for that most of the time.” The anxiety wasn’t about the technology. It was about what the technology revealed: if AI can do your job with a text prompt, what exactly is your job?

Then came [the Apple Weather app incident](https://techcrunch.com/2024/07/02/figma-disables-its-ai-design-feature-that-appeared-to-be-ripping-off-apples-weather-app/). Within days of launch, someone noticed Figma’s AI was generating designs that looked suspiciously like Apple’s Weather app. Not inspired by. Resembling. Field disabled the feature and admitted the company had rushed to hit a Config deadline. The feature relaunched months later as “First Draft,” with better guardrails.

But the damage was philosophical, not just technical. The promise of AI democratizing design ran headlong into a paradox nobody wanted to say out loud: these tools don’t make design accessible to everyone. They make design accessible to people who already understand what they’re looking at.

#### The Paradox Nobody Mentions

Here’s what actually happened when non-technical users got their hands on AI design tools.

In May 2025, accessibility expert [Adrian Roselli tested Figma Sites](https://adrianroselli.com/2025/05/do-not-publish-your-designs-on-the-web-with-figma-sites.html) — the company’s new publish-to-web feature that promised to turn Figma designs into live websites. He ran automated tests on Figma’s own flagship demo sites. The results were brutal: 210 WCAG violations on one demo site. Another had 107 violations. Images with no alt text. Contrast ratios failing basic accessibility standards. The HTML output was what Roselli called “div soup” — everything rendered as generic container elements, even headings and navigation.

![](https://images.prismic.io/doc-ux-collective/aZOeQVWLo0XkEjuL_config.png?auto=format,compress)

The technical implementation was worse. Drop caps were created using background-colored underscores, a technique that belonged in 1974 typewriter manuals, not modern web development. One commenter created a satirical video called “Introducing: Webbed Sites.” Another posted a reaction titled “Figma’s New Horrific DIV Generator.”

This wasn’t an AI training problem. This was an expertise problem masquerading as a democratization tool. Figma Sites generated technically valid HTML that was utterly inappropriate for actual use. If you don’t know why that’s a problem, the tool won’t help you. If you do know why it’s a problem, you probably wouldn’t use the tool.

The pattern repeated across every AI design tool that launched in 2024–2025. V0 by Vercel produced code that stopped mid-generation. Users reported the AI losing context and forgetting previous work. Bolt.new earned a 1.5-star rating on Trustpilot, with users reporting they spent over a thousand dollars in tokens just trying to fix code problems. One developer burned through 20 million tokens on a single authentication issue. Critical files went missing. Projects deployed with blank screens.

Claude Code, despite being one of the more capable AI coding tools, experienced performance degradation so severe that GitHub users reported 30–40% drops in development speed. Tasks that previously took one day required two or three. The most telling detail: Anthropic had to publish an official postmortem admitting infrastructure bugs caused the AI to produce broken code with odd characters.

And then there was [Builder.ai](https://techstartups.com/2025/05/24/builder-ai-a-microsoft-backed-ai-startup-once-valued-at-1-2-billion-files-for-bankruptcy-is-ai-becoming-another-com-bubble/) — the cautionary tale everyone should study. Valued at $1.5 billion with backing from Microsoft and Qatar’s sovereign wealth fund, Builder.ai promised AI-powered app development. The company employed over 1,500 people and raised $445 million. In May 2025, it filed for bankruptcy. The reason? The “AI” was actually 700 Indian engineers manually coding everything. The Wall Street Journal had exposed this back in 2019, but the company limped along for six more years. Enterprise clients experienced apps crashing under basic user loads. A former employee later joked that the “AI” stood for “Another Indian.”

The paradox crystalizes: tools marketed as democratization require more technical knowledge than traditional workflows, not less. You need to understand prompt engineering, debug AI-generated output, recognize when the AI is hallucinating, and know enough about technical constraints to evaluate whether what the AI produces is actually feasible.

We told ourselves AI would level the playing field. Instead, it raised the floor. If you can’t tell the difference between functional code and broken code, between accessible design and inaccessible design, between scalable architecture and technical debt, these tools just let you fail faster.

#### How we got here

The craft crisis didn’t start with AI. AI just made it impossible to ignore.

Somewhere in the early 2010s, the design industry made a collective decision: designers don’t need to code. [Alan Cooper](https://mralancooper.medium.com/should-designers-code-cde3ef9d6621), the father of Visual Basic and interaction design pioneer, wrote definitively that coding wasn’t necessary for top-notch designers. Design Thinking became the dominant framework, emphasizing empathy and process over technical craft. Design bootcamps proliferated with promises of career changes in six months, explicitly advertising that no coding knowledge was required.

[Google’s UX Certificate](https://designlab.com/blog/google-ux-design-certificate-on-coursera-is-it-worth-it) on Coursera states clearly: “UX design requires no knowledge of coding.” For $300 and six months at 10 hours per week, you could become a UX designer. Bootcamps charged $10,000 for 12-week programs focused on wireframing, prototyping, and user research — not technical implementation.

This wasn’t gatekeeping by engineers. This was the design industry telling itself a story about what designers needed to know. The story went like this: designers focus on users, empathy, and problem-solving. Engineers focus on implementation, code, and technical constraints. Clean separation of concerns. Everyone stays in their lane.

#### What we lost wasn’t the ability to code. What we lost was the ability to participate in technical conversations.

Understanding why an API limitation makes a feature infeasible. Recognizing when performance constraints should influence design decisions. Knowing enough about technical debt to engage in build-versus-buy discussions. Being able to evaluate whether AI-generated code actually works or just looks like it works.

[Roger Wong](https://rogerwong.me/2025/07/design-talent-crisis), analyzing the design talent crisis in 2025, put it bluntly: entry-level designers at Big Tech now represent just 7% of all hires — a 50% drop from 2019. How do designers develop taste, craft, and strategic thinking without doing the foundational work? The industry created a pipeline that produces designers who can talk about empathy but can’t evaluate technical trade-offs.  
The consequences show up everywhere. [UXPin research](https://www.uxpin.com/studio/blog/10-ways-to-improve-design-to-development-handoff/) found that 62% of developers spend significant time redoing designs due to communication breakdowns. Not because designers made bad aesthetic choices. Because designers proposed things that were technically nonsensical, or missed constraints that would have changed the entire approach.

A designer proposes a feature without understanding that it requires a new API endpoint, which requires backend changes, which requires database migrations, which means a three-month timeline instead of a three-week timeline. The feature gets de-scoped or killed. The designer learns their proposals aren’t strategic input — they’re suggestions engineers will simplify into whatever is actually buildable.

This happened so many times, in so many companies, that it became the pattern. Designers create mockups. Engineers override them based on technical constraints the designer didn’t know existed. The designer spends days in “alignment meetings” trying to advocate for the user, but can’t speak the technical language needed to actually influence the decision. Business stakeholders step in to make product calls because they can at least understand the technical constraints, even if they don’t understand users.

[Rune Madsen](https://designsystems.international/ideas/product-design-is-lost/), in his essay “Product Design Is Lost,” captured this perfectly: designers found themselves “in a place between strategy and implementation, yet they are not fully empowered to influence either.” We’re filling our time with checklists instead of focusing on the very thing that makes designers relevant. We’ve been painted into a corner.

The industry did this to itself. And we called it progress.

#### Why This Matters Now

Here’s the part that makes designers defensive: we lost influence long before AI showed up. AI just exposed the gap.

The “Great Design Handoff” wasn’t a single event — it was a slow erosion of strategic control. Growth teams took over conversion optimization. Algorithms dictated layout and personalization. Business stakeholders made product decisions. Design leaders found themselves defending the existence of their teams rather than shaping product strategy.

The evidence is everywhere. [IDEO](https://www.fastcompany.com/90976682/design-giant-ideo-cuts-a-third-of-staff-and-closes-offices-as-the-era-of-design-thinking-ends) — the company that popularized Design Thinking — lost half its headcount between 2020 and 2025. Revenue dropped from $300 million to $100 million. Google laid off over 100 designers in November 2024, cutting some cloud design teams in half. IBM eliminated its chief design officer position entirely. Autodesk cut 1,350 employees in December 2024. Across tech, [150,000+ jobs disappeared in 2024](https://www.computerworld.com/article/3816662/tech-layoffs-in-2024-a-timeline.html) alone.

But here’s the telling detail: only one major company hired a chief design officer in the second half of 2023. PayPal. That’s it. Executive-level design roles are disappearing across corporate America, and it’s not because AI replaced them. It’s because the roles stopped delivering strategic value.

[Fast Company reported](https://www.fastcompany.com/91027996/the-big-design-freak-out-a-generation-of-design-leaders-grapple-with-their-future) on a March 2024 conference where design leaders from P&G, Ford, Verizon, GE Healthcare, and other Fortune 500 companies confronted the question directly: “Is Design Dead?” The consensus wasn’t about AI. It was about business priorities. Design has been deprioritized during a business cycle championing technology and marketing.

Netflix provides the clearest case study. Eighty percent of all viewing hours come from algorithmic recommendations. The homepage layout, row ordering, and even the thumbnails users see are determined by algorithms, not designers. Netflix’s personalization saves over a billion dollars per year in subscriber retention. When the business case is that strong, design becomes an execution function serving algorithmic strategy.

Growth teams present a similar challenge. [Andrew Chen](https://andrewchen.com/how-to-build-a-growth-team/), a prominent growth expert, notes that growth teams work best when they can run lightweight experiments quickly. Design-conscious companies resist this because their incentives reward large, complex projects rather than many small changes. So growth teams route around design, making decisions that move metrics even when they compromise user experience. Princeton found that [1 in 10 of 11,000 shopping sites](https://www.eleken.co/blog-posts/dark-patterns-examples) used dark patterns. Zurich University found 95% of popular Android apps had at least one dark pattern. The European Commission found 97% of apps used by EU consumers contained dark patterns.

These aren’t isolated bad actors. These are systemic outcomes when growth imperatives override design principles, and designers lack the technical fluency to advocate effectively in those conversations.

The root cause is simple: most product decisions are fundamentally technical. They involve technical constraints, technical trade-offs, technical debt, and technical feasibility. If you can’t participate in technical conversations, you can’t influence product strategy. You can’t influence product strategy, you end up in alignment meetings explaining user needs to people making technical decisions you don’t fully understand.

This is why the handoff happened. Not because AI replaced designers. Because designers couldn’t articulate why technical decisions should consider user impact in language that resonated with the people making those decisions.

#### This Isn’t About Coding

Let me be crystal clear: this is not an argument that designers should learn to code production software.

This is about strategic literacy. Understanding enough about technical systems to make informed design decisions and advocate effectively for users when those decisions are being made.

There’s a difference between writing production code and understanding what code does. Between implementing a database schema and knowing why data models influence user workflows. Between configuring a build pipeline and recognizing when technical debt is accumulating in ways that will limit future design possibilities.

Strategic literacy means you can:

  
• Evaluate whether AI-generated code is functional or broken  
• Understand API constraints well enough to design features that are actually feasible  
• Recognize when performance implications should influence interaction patterns  
• Participate in technical debt conversations because you understand what’s being traded off+  
• Spot when “technical constraints” are actually implementation choices masquerading as limitations

The design engineers who maintained influence through the 2024–2025 crisis weren’t necessarily writing backend services. But they understood technical systems deeply enough to design with constraints in mind, advocate for users in technical conversations, and ship work that didn’t require wholesale engineering rewrites.

[Rauno Freiberg at Vercel](https://vercel.com/blog/design-engineering-at-vercel) describes his role as providing “the Design team with Engineering firepower to lead and ship our own projects end-to-end.” [Paco Coursey at Linear](https://ui.land/interviews/paco-coursey) says design and code don’t feel separate to him. These aren’t people who abandoned design for engineering. They’re people who refused to treat design as separate from implementation.

The counter-argument is always gatekeeping: requiring technical knowledge excludes people from design. But what actually excludes people is creating a professional track that leads to strategic irrelevance. Roger Wong’s research shows entry-level hiring has collapsed. Matt Ström warns that if we don’t train junior designers now, we’ll have no senior designers for complex work AI can’t do. Design Week points out that students aren’t being equipped with essential technical skills.

We told designers they didn’t need technical knowledge. Then we eliminated their jobs when they couldn’t influence technical decisions. That’s not inclusion. That’s malpractice.

The question isn’t whether designers should code. The question is whether designers should understand the medium they’re designing for. Whether they should be able to evaluate their own work. Whether they should have enough technical fluency to advocate for users when technical decisions are being made.

That’s the baseline for strategic relevance.

#### What Changes

The opportunity here is clearer than the design industry wants to admit: technical understanding is learnable, and the designers who develop it will have influence that others don’t.

Look at what technical literacy enables. [At Airbnb](https://www.bbva.com/en/airbnb-design-thinking-success-story/), a designer studying the star rating system realized replacing stars with hearts could feel more personal. That design change increased bookings by more than 30%. Not because the designer had great visual taste. Because the designer understood the technical system well enough to identify a high-leverage intervention.

At [GitHub](https://medium.com/@broccolini/design-systems-at-github-c8e5378d2542), designers contribute production code to the Primer design system. They don’t do this because they want to be engineers. They do it because understanding the technical implementation makes them better designers. They can prototype with real constraints, collaborate with engineers as peers, and ship work that actually functions.

Vercel’s design engineering team operates with “aesthetic sensibility with technical skills,” which allows them to “deeply understand a problem, then design, build, and ship a solution autonomously.” This isn’t a replacement for traditional design — it’s an expansion of what design can influence.

![](https://images.prismic.io/doc-ux-collective/aZOeRVWLo0XkEjuQ_infra.png?auto=format,compress)

The technical skills that matter most:

  
• Understanding data models and how they constrain user workflows  
• Knowing enough about APIs to design technically feasible features  
• Recognizing performance bottlenecks that should influence interaction patterns  
• Evaluating AI-generated outputs for technical correctness  
• Understanding how design systems map to component libraries  
• Participating in build-versus-buy discussions with actual technical context  
• None of this requires a computer science degree. It requires curiosity about how things actually work and a willingness to learn technical fundamentals.

The designers maintaining strategic influence through 2024–2025 aren’t the ones with the best Figma skills. They’re the ones who can participate in technical conversations, evaluate trade-offs, and advocate for users in language that resonates with engineers and product leaders.

This is the path forward. Not back to “designers should code” debates from the 2010s. Forward to “designers should understand the systems they’re designing for” as a baseline professional expectation.

#### The Reckoning

When Figma’s AI generated Apple Weather app clones, it revealed that many designers couldn’t articulate what made a design original beyond surface aesthetics. When Figma Sites produced [210 WCAG violations](https://adrianroselli.com/2025/05/do-not-publish-your-designs-on-the-web-with-figma-sites.html), it showed that accessibility knowledge wasn’t widespread enough to catch obviously broken output. [Research shows](https://medium.com/design-bootcamp/ai-generated-ux-and-the-growing-accessibility-debt-how-to-fix-it-8109fda7d9d5) that 81% of homepages have low-contrast text, and when AI trains on this data, it perpetuates systemic exclusion. When Builder.ai collapsed after six years of pretending AI was doing what engineers actually did, it demonstrated how easy it is to fake technical competence in an industry that stopped valuing technical craft.

The designers who maintained influence through this period share one thing: technical depth. Not necessarily coding ability, but deep understanding of technical systems. They can evaluate AI output. They can participate in architecture discussions. They can advocate for users in technical terms that actually influence decisions.

The designers who lost influence — and there were many, given 150,000+ layoffs — often shared a different trait: they treated design as separate from implementation. They created mockups for engineers to “build.” They relied on tools without understanding outputs. They couldn’t evaluate technical trade-offs or participate meaningfully in technical conversations.

The question facing the industry isn’t whether AI will replace designers. It’s whether designers will develop the technical literacy needed to remain strategically relevant in a world where most product decisions are fundamentally technical.

Some will argue this sets the bar too high. That requiring technical understanding excludes people. But what actually excludes people is creating a professional track that leads to irrelevance. Entry-level hiring has collapsed. Design leadership roles are disappearing. The “Great Design Handoff” already happened, and it wasn’t to AI — it was to growth teams, algorithms, and business stakeholders who could at least speak the technical language of trade-offs and constraints.

![](https://images.prismic.io/doc-ux-collective/aZOeQlWLo0XkEjuM_design-eng.png?auto=format,compress)

The industry told designers they didn’t need to understand implementation. Then eliminated their influence when they couldn’t participate in implementation discussions. That’s not AI’s fault. That’s ours.

The technical reckoning is here. The designers who face it with curiosity about how systems actually work will have opportunities the industry hasn’t seen in years. The designers who keep insisting technical knowledge isn’t their job will find that strategic influence isn’t theirs either. 

The choice, as always, is ours to make.