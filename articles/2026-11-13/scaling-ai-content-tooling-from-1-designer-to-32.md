---
title: "Scaling AI content tooling from 1 designer to 32"
source: "https://uxcontent.com/scaling-ai-content-tooling-from-1-designer-to-32/"
publishedDate: "2026-11-13"
category: "ux-writing"
feedName: "UX Content Collective"
author: "Giovanni Ella"
---

_This is the fourth article in a series about the evolution of my content architect role at Clover. Read the **[first](https://uxcontent.com/governance-ai-content-strategy/)**, **[second](https://uxcontent.com/from-content-designer-to-content-architect/)**, and **[third](https://uxcontent.com/building-a-content-architect-role-from-scratch/)** installments on UX Content Collective._

_In my last article, I wrote about defining a role that didn’t exist before me. This one is about what happened when I had to make the tools I built for myself work for everyone else._

A pilot with one designer can prove a concept.

A rollout to a team of 32 product designers is the real test of whether the concept will survive in the wild.

### The path before the title

Before the content architect role became official, AI was already central to how I worked. I was one content designer supporting too many squads to cover effectively. I used AI tools to gain leverage.

I built a Google Gem, a custom AI writing assistant trained on Clover’s voice, UX writing principles, and content guidelines. At first, it was just for me. Then I pulled in a product designer I worked with in the same office and launched a private pilot with her. For 30 days, we met weekly. I watched her use the Gem in real workflows and adjusted the instructions based on what worked and what didn’t.

I had no idea the content architect role was going to happen. When it was presented to me after several months of advocating, it was a genuine surprise. But because I’d already been building with AI, I wasn’t starting from square one. I had a working tool, a pilot under my belt, and proof that a designer would actually use it. Launching the Gem more broadly was the logical next step.

### Going from one designer to 32

Doing a private pilot with one designer in the same office is a low-lift, controlled environment. Rolling it out to a team of 32 product designers across multiple squads, time zones, and countries is a different kind of challenge altogether.

I asked for the time to train designers during their squad design meetings. Some of the training happened individually. By the end of Q2 2026, 100% of product designers had been trained on the Gem. The Gem would serve as interim tooling while more comprehensive content standards are updated and the content system is being built.

I also built a custom skill within Figma AI, connecting it to our content style guide in Zeroheight and adding a web connector as a secondary source. In theory, this gives designers content guidance without having to leave their design tool. However, in practice, Figma AI is slower than the Gem, and its recommendations are harder to read in the side panel. The Gem, while not integrated into Figma, is fast and easy to read. That tradeoff mattered more than I expected.

### Aligning on the definition of done

Now that product designers own the content they deliver, “done” needed a shared definition that included content quality.

I met with each of the four design leadership team (DLT) members to secure buy-in and alignment. My ask was very straightforward:

-   First, integrate Gem usage into the team’s definition of done, which means a design flow is ready for review after the content has been verified using the Gem.
-   Second, adopt a partner-observation model. I don’t expect design leaders to have content expertise, but I do expect them to notice when the copy feels off and flag it directly to me.

During design critiques, leaders can ask simple questions. “What did the Gem suggest when you ran this screen through it?” or “How does this label align with the content standards?” These nudges build accountability without adding too much overhead to already full plates.

I also attend weekly squad design critique meetings to keep a pulse on what’s shipping. From those sessions, I can escalate content issues as needed. And occasionally, DLT escalates specific product flows to me directly, which sometimes leads to one-on-one working sessions with a designer.

The model works well because the design leaders are my active partners, not just passive observers.

### Redefining content design without content designers

With the product design restructuring, Clover officially moved away from embedding content designers in squads. For me, it was the official green light to step into the content architect role I’d spent months pitching—turning my focus from one-to-one hands-on contribution to one-to-many organizational enablement.

Under the new model, content systems sits as one of three pillars within the Design Operations team, alongside Design Ops and the Sprout Design System. Each pillar has its own audience and engagement model, but they share unified leadership and strategy.

As the sole content architect running content systems, I own the voice model, decision trees, AI content tooling, escalation paths, and quality governance. I partner on design system documentation, content training, and onboarding. What I explicitly don’t do is write copy for individual flows, review every screen before production, or act as an embedded resource for specific product teams. Content quality for feature launches is owned by the individual squads.

For day-to-day support, designers have three channels:

1.  The Gem is the first stop for most content decisions.
2.  The #content-systems Slack channel handles quick questions with a one-business-day response time.
3.  Two weekly office hours are open for Gem questions, flow reviews, and content decisions that need more thought partnership.

### The content systems roadmap

My roadmap is structured across two horizons:

1.  The first focuses on the foundation and bridge: updating content standards, establishing governance and quality rubrics, and keeping interim tooling live while the backbone is being built. It’s building the plane mid-flight, with a bridge—the Gem—holding the team.
2.  The second horizon then shifts to scale and sustainability. Content standards extend into engineering. Tooling evolves from interim to integrated. Quality becomes structural and enforced by the system itself rather than by headcount.

The horizons are intentionally sequential because you can’t scale what you haven’t yet built.

### Tracking Gem usage

Launching the Gem was one piece of the puzzle. I also needed a way to track whether designers are actually using it.

Google Enterprise doesn’t provide an insights dashboard for Gems, so after some sleuthing, I finally connected with someone in IT who could provide raw Gemini data. The dataset is exactly that—raw. Each record captures a single server-side event, such as a submitted prompt, a regenerated response, or an entered keystroke. Other fields included timestamp, user, app name, and action type. The raw data tells you something happened, but it doesn’t tell you whether it’s meaningful.

My first version of the Gem scorecard was based on ranking: total sessions per designer. That’s useful for spotting who’s active, but the numbers can be inflated. Every click generates a log entry, so a designer refining a single error message across five prompts appears as five separate sessions.

For version two of the scorecard, I introduced a 15-minute session filter. Consecutive prompts from the same designer within a 15-minute window get grouped into a single estimated session, which I reframed as a _distinct copy task_. This removed noise and gave me a metric that better reflects actual work—a designer sitting down to solve a content problem.

I also added conversational depth in the scorecard. This is the average log entries per session, showing whether designers iterate or accept first outputs. I also segmented product designers into power users, core contributors, and occasional users.

This is all very much a starting point, not a finished analytics system by any stretch, but it shifted reporting from counting activity to measuring meaningful usage.

### Listening to the team

Two months after the broader Gem launch, I supplemented the feedback from Slack and weekly office hours with a structured survey targeting product designers.

The survey covered usage frequency, workflow integration, time saved per screen, confidence in recommendations, guideline inaccuracies, and most-wanted features.

The results were encouraging and eye-opening. The majority of respondents reported using the Gem multiple times a week or more. Most rated their confidence in the Gem’s recommendations as high. A large share reported saving 30 to 60 minutes per screen, with some saving more than an hour! The workflow integration scored well, and most designers didn’t notice any incorrect patterns in the Gem’s output.

What designers liked most was the Gem’s ability to handle specific screens and use cases, its rationale and source citations, and its role in overcoming writer’s block. There were also frustrations, but not when it comes to the quality. The frustrations were about access. Designers had to switch tabs and deal with extra clicks. There were too many steps to get to the Gem. Designers said they want content guidance and enforcement integrated directly into Figma.

### Extending beyond our internal design org

Scaling wasn’t just limited to Clover’s internal team. We have two external design agencies that touch Clover product experiences and need to adhere to our content standards. Sharing the Gem wasn’t an option there.

-   For the first agency, their compliance team blocked the most straightforward path—building one instance of the Gem under a single owner and sharing it broadly across their team. Since they were already on our Clover Figma instance, the workaround was to provide a copy of our content standards so they could upload them into Figma AI. As long as the chat stayed within the same canvas, the AI would retain the context. I also created a workflow cheat sheet so their designers could replicate the Gem’s capabilities through Figma AI.
-   The second agency had even tighter constraints. They had limited access to Clover’s ecosystem and no Gemini Enterprise. Thankfully, they had Claude Enterprise, so I worked with their team to build a dedicated Claude Project. We loaded it with the same Clover content standards and guidelines. It was a different platform, but it had the same objective.

It’s worth noting that scaling content tools across organizational boundaries isn’t a one-size-fits-all solution. It’s building the right ecosystem for each context, within each set of constraints you’re up against.

### What’s next

In short, the Gem works. Designers trust the recommendations, and it saves them real time. The friction isn’t the quality of the AI output. It’s the extra steps, clicks, and tab-switching required to use it.

The next step is integration, which means meeting designers directly inside the tools where they already work, rather than outside it. In the next article, I’ll dig deeper into what native workflow integration looks like and how embedded capabilities can bring standards directly onto the active canvas.

The templates behind the work described in this article, including the definition-of-done guide, ownership model, roadmap framework, scorecard methodology, and survey questions are available in [my content system toolkit on GitHub](https://github.com/gioangeloella/content-system-toolkit).