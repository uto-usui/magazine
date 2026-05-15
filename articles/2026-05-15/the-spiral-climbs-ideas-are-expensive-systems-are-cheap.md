---
title: "The Spiral Climbs: Ideas Are Expensive, Systems Are Cheap"
source: "https://uxmag.com/articles/the-spiral-climbs-ideas-are-expensive-systems-are-cheap"
publishedDate: "2026-05-14"
category: "ux-research"
feedName: "UX Magazine"
author: " Pavel Bukengolts "
---

by Pavel Bukengolts

6 min read

-   May 14, 2026

Share this post on

### Save

![](https://uxmag.com/wp-content/uploads/2026/05/The-Spiral-Climbs_-Ideas-Are-Expensive-Systems-Are-Cheap-UX-Mag-site-Medium.png)

What do you do when you lose everything and have to start building from zero? Here, we tell the story of a product designer’s reply: a connected workflow that includes Miro, Figma, VS Code, and AI-powered assistants, all linking together from an idea to a shipped product to learning, all within a 48-hour loop of small bets, measurable results, and documented decisions. Design isn’t dead; it’s just gone upstream. And if you can frame a problem, test it quickly, and keep a clean trail of why, you can rebuild anything.

History doesn’t loop; it climbs the same corners to a higher floor.

-   **Late ’90s:** Function first. Ship it; paint it later.
-   **2010s:** Design first. Cheaper dev, better tooling, and design ran the room.
-   **2025:** Systems everywhere. Patterns are cheap, judgment is not, and speed finally has a brain.

The spine stayed the same: Critical thinking, research, communication, empathy. What changed is the distance. _The idea of coding_ is now a short walk. Live artifacts beat static decks, agents sit inside our tools, feedback lands faster, and excuses don’t.

## What actually changed

**Design isn’t dead;** it moved to systems, tokens, and code. You still need taste and story, but you don’t need to redraw the same control for the hundredth time. Handoffs got shorter, prototypes run in the real stack, and decisions now link to artifacts and metrics, so nothing floats alone.

## The modern stack I run _(and how it’s all connected)_

It’s a connected surface, not a pile of apps; each step hands context to the next.

-   **Miro** to frame the bet, flows, and risks. One board. One narrative. It takes the hit: Tons of drafts, sketches, ideas, docs, and charts, all parked there. Organized, productive chaos.
-   **Figma,** when I need to _teach AI how to build it_: States, constraints, edge cases. Pictures as instructions.
-   **VS Code + AI (Codex as my “dev team”)** to scaffold, refactor, and test. AI is my pair, not my boss.
-   **GitHub** for PRs and a clean decision log. Every change has a why.
-   **Jira** for small, measurable bets. Throughput you can’t fake.
-   **Assistants embedded in the flow:** Design Thinking Facilitator (personas/methods for bets), Systems Thinking Coach (loops, dependencies, and second‑order effects), and Meeting Minutes Facilitator (decisions, talk‑time analysis, and auto‑actions into Jira).

## Everything is connected

Miro snapshot links to a Jira bet (goal, metric, exit). Jira links to the Figma clarifier and the GitHub PR. The PR holds the decision log and a preview. Telemetry flows back into Jira, and my debrief notes. Design tokens match IDs in Figma Dev Mode and in code. Smart commits update Jira. Meeting actions open tickets automatically. One chain of truth from idea through shipping to learning.

![The Spiral Climbs: Ideas Are Expensive, Systems Are Cheap](https://cdn.sanity.io/images/jvku6ehl/production/3de51936df5b96e2a47738e5165c3665f6842622-985x387.svg)

_Illustration by [Pavel Bukengolts](https://www.linkedin.com/in/pavelbukengolts/)_

## TCE: The wipeout and the rebuild

We lost the plot. Wrong bet. Slow signals. It hurts fast. We lost all app data and connections. We decided to start over from zero. We chose zero. That made every step simpler to judge: Does it get us learning by Friday or not? I cut the ceremony. Kept the spine. Short interviews, plus a bot trained on our past data that interviewed me for about four hours and surfaced gaps we’d missed. We pulled the data we already had and tightened the hypothesis. Miro framed the new bet. Figma clarified the states so the agent wouldn’t hallucinate. In VS Code, the AI laid out scaffolds and tests. I edited. I owned it. PRs landed early. Jira tracked the bet, the metric, and the exit condition. We shipped behind a flag, watched the dials, and adjusted. We got back to market. Not because research vanished. Because waste did.

## From UX to product

Titles follow the work. When UI is commoditized, advantage moves upstream: Framing the problem, sequencing bets, and owning outcomes.

**“Product Designer” fits.**

Not just “make it pretty.” Own the value. Own the risk. Design closer to code. Engineers closer to users. Fewer handoffs. Cleaner bets.

## 0 to 1: what AI is good for _(and what it isn’t)_

AI gets me from zero to one, fast. Scaffolds, test shells, variant ideas, quick refactors. I’m not saying we don’t need developers; I was one. Code is messy. Edge cases bite. Architecture matters. Performance isn’t free. Security is a profession. After we hit one, professionals take over the code to harden, scale, and secure it. Use AI to explore and draft. Use people to harden and scale. That balance is the job.

## The 48-hour operating loop

This cadence is simple on purpose; it keeps the room aligned and the work honest.

### Observe

Support logs. Analytics. Sales notes. _Meeting Minutes Facilitator_ pulls the last decisions and open risks and flags who’s blocked.

### Orient

One Miro snapshot: Goal, constraints, success metric, edges to test. _Systems Thinking Coach_ maps loops and second‑order effects so we don’t fix one metric and break another.

### Decide

Write a small bet. Define the minimum test. _Design Thinking Facilitator_ runs JTBD/HMW to shape the bet and the test plan.

### Act

Use Figma for AI clarity, create an agent plan, scaffold in VS Code, open a PR early, and run a 30-minute usability pass.

### Review

Ship behind a flag. Watch metrics. Log decisions in the PR and Jira. _Meeting Minutes Facilitator_ scores the debrief (talk time, sentiment, decision clarity), opens follow-ups in Jira; the Systems Thinking Coach flags second‑order effects before we scale. Fidelity ladder: Sketch, prompt, runnable prototype, then production. If it isn’t linked, it isn’t real.

## Guardrails so speed doesn’t lie

-   **Agent RACI:** Who proposes, who approves, and who owns failure.
-   **Tests and telemetry** are non-negotiable.
-   **System sameness check:** Break patterns when user value demands it.
-   **Weekly research touchpoints:** Light. Consistent.
-   **Privacy and ethics:** Opt-in recording. Off-the-record flags. Redaction by default. Clear retention.

## Metrics that keep you honest

-   **Lead:** time to first PR, time to usable prototype, review latency, and preview coverage.
-   **Quality:** escaped defects, task success rate, and decision-log completeness.
-   **Outcome:** one north-star metric per bet.
-   **Collaboration/meeting health (auto‑scored by the _Meeting Minutes Facilitator_):** Hygiene score, talk-time fairness, sentiment, decision clarity, % of meetings with actions, and SLA on follow-ups.
-   **Connection health:** % PRs linked to bets, % bets with telemetry, and design-token drift rate.

## My thinking stack: custom assistants I use every week

_They don’t replace people. They sharpen me._

### Design Thinking Facilitator

Spins working personas on demand. Rotates methods (JTBD, “How Might We,” 2x2s, assumption maps) so I don’t tunnel. Outputs crisp prompts, concept boards, and test plans.

### Systems Thinking Coach

Maps feedback loops and dependencies. Flags second-order effects before we commit. Gives me a one-page global picture.

### Meeting Minutes Facilitator

Turns meetings into decisions: Agenda, outcomes, owners, deadlines. And it doesn’t stop at notes. It **analyzes dynamics:** Talk-time distribution, interruptions, sentiment, quote capture, question-to-statement ratio, and decision clarity. It pulls risks and open questions into Jira. Tracks follow-ups.  
Private coaching notes for me. Redacted summaries for the team.

_Use them like teammates. I still make the call._

## Start/Stop/Keep

### Start

-   Writing measurable bets in Jira with an exit condition.
-   Opening a PR within 24 hours of deciding.
-   Running a 30-minute usability pass before polish.

### Stop

-   Treating Figma as the source of truth for everything.
-   Shipping without a hypothesis and a metric.
-   Letting agents merge code.

### Keep

-   Real people. Real empathy. Real collaboration. Real interviews. Real data. Real stories that move stakeholders.

## Close

The tools got loud. Judgment still wins. Patterns are cheap. Ideas are expensive. If you can frame a problem, test it fast, and keep a clean trail of why, you can rebuild anything.

**Your move.** How does your team’s 48-hour loop look today? What breaks first? Send it. Let’s compare notes.

> “Plans are worthless, but planning is everything.” — Dwight D. Eisenhower

_The article originally appeared on [UX Design Lab](https://uxdesignlab.com/insights/the-spiral-climbs-ideas-are-expensive-systems-are-cheap/).  
Featured image courtesy: [Pavel Bukengolts](https://www.linkedin.com/in/pavelbukengolts/)._

[![](https://uxmag.com/wp-content/uploads/2020/12/banner-podcast-new-3-1.png)](https://uxmag.com/podcasts)

[![](https://uxmag.com/wp-content/uploads/2020/12/banner-book-new.png)](https://invisiblemachines.ai/?utm_source=uxmag&utm_medium=referral&utm_campaign=article_consciousAImodels?&utm_content=ad2)

-   [Agile and Iterative Process](https://uxmag.com/topics/agile-and-iterative-process), [AI Orchestration](https://uxmag.com/topics/ai-orchestration), [Artificial Intelligence](https://uxmag.com/topics/artificial-intelligence), [Design Systems](https://uxmag.com/topics/design-systems), [Design Thinking](https://uxmag.com/topics/design-thinking-design), [DesignOPS](https://uxmag.com/topics/designops), [Product Design](https://uxmag.com/topics/product-design-design), [Product Management](https://uxmag.com/topics/product-management), [UX Design](https://uxmag.com/topics/ux-design), [UX Tools](https://uxmag.com/topics/ux-tools)

[![post authorPavel Bukengolts](https://uxmag.com/wp-content/uploads/2025/10/pavel_bukengolts_01.jpg)](https://uxmag.com/contributors/pavel-bukengolts)

[Pavel Bukengolts](https://uxmag.com/contributors/pavel-bukengolts)  
Pavel Bukengolts is a design leader, educator, and founder of [UX Design Lab](https://uxdesignlab.com/). With over 25 years of experience, he focuses on building better products and stronger teams. He helps organizations create human-centered, accessible digital experiences by maturing their design operations (DesignOps), making teams more efficient and fulfilled. As an educator and mentor, he’s dedicated to developing future leaders and empowering designers to grow their skills, confidence, and impact.

Ideas In Brief

-   The piece explores that design is no longer about designing screens but owning systems, bets, and outcomes. But the core judgment, empathy, and research are irreplaceable. I chain Miro, Figma, VS Code, GitHub, and Jira into one traceable loop from idea to learning. AI takes on the exploration and scaffolding. People own architecture, security, and accountability. A 48-hour operating cadence of small, measurable bets, linked artifacts, and documented decisions keeps speed honest.

#### Related Articles

-   Artificial Intelligence, Machine Learning, Software Development

Learn how your AI system can be failing silently while all dashboards are green and what it takes to actually see it.

Article by **Kwansah Madani**

AI Fails Silently: A Systems Perspective on AI Reliability

-   The article argues that AI systems don’t fail catastrophically, but rather degrade quietly, meaning that normal tools for detecting failure will miss the problem, and engineers need to rethink how they monitor system health from the ground up.

Share:AI Fails Silently: A Systems Perspective on AI Reliability

-   May 11, 2026

5 min read

![](https://uxmag.com/wp-content/uploads/2026/05/AI-Fails-Silently_-A-Systems-Perspective-on-AI-Reliability-UX-Mag-site-1-1024x711.png)

-   Agile, Design Process, Lean UX, Product Design, User Research, UX Design

Learn why the real design challenge of agile is not speed but learning to design smaller, one valuable slice at a time.

Article by **Paivi Salminen**

Designing Small Is Harder than Designing Big

-   The article suggests that agile design is not about quick development but rather the more difficult discipline of designing smaller, resisting the temptation to map out complete systems, avoiding the snare of horizontal slicing, and inquiring into what the smallest iteration of an idea is that still provides real value to users.

Share:Designing Small Is Harder than Designing Big

-   May 7, 2026

5 min read

![](https://uxmag.com/wp-content/uploads/2026/04/Designing-Small-Is-Harder-than-Designing-Big-And-How-to-Fix-It-UX-Mag-site-Medium-1024x711.png)

-   Behavioral Design, Cognition, Dark Patterns, Ethical Design, Ethical UX Series, Privacy and Data Security, Psychology and Human Behavior, User Psychology, UX Design

Find out how clicking “Accept All” is not really consent and how ethical UX design can return user choice to users.

Article by **Tushar Deshmukh**

Consent Fatigue: Are We Designing People into Compliance?

-   The article shows that _consent fatigue_ is not a user problem but a design problem in which endless permission popups, visual manipulation, and legal-shield thinking have quietly replaced real user autonomy with engineered compliance.

Share:Consent Fatigue: Are We Designing People into Compliance?

-   May 5, 2026

10 min read

![](https://uxmag.com/wp-content/uploads/2026/04/Consent-Fatigue_-Are-We-Designing-People-into-Compliance_-UX-Mag-site-Medium-1024x711.png)