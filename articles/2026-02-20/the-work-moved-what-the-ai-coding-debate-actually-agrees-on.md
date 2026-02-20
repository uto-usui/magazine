---
title: "The work moved: what the AI coding debate actually agrees on"
source: "https://leadership.garden/ai-the-work-moved/"
publishedDate: "2026-02-19"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

I manage an engineering organization. I also build side projects with AI agents on evenings and weekends. This means I occupy a strange position in the current debate about AI-assisted development: I've felt the dopamine hit of shipping something in an afternoon that would have taken a week, and I've also watched the downstream effects ripple through teams in ways that nobody seems to have good answers for.

So far, I've been awfully quiet about AI, specifically agentic coding. I've been watching, experimenting, and learning.

Over the past few weeks, I've read a cluster of articles about AI coding that span the full spectrum from deeply skeptical to fully committed. [Cory Doctorow](https://www.theguardian.com/us-news/ng-interactive/2026/jan/18/tech-ai-bubble-burst-reverse-centaur?ref=leadership.garden) warns about an AI bubble and the rise of "reverse centaurs": humans reduced to squishy appendages for machines. [Armin Ronacher](https://lucumr.pocoo.org/2026/1/18/agent-psychosis/?ref=leadership.garden) diagnoses an "agent psychosis" sweeping the developer community. [Addy Osmani](https://addyo.substack.com/p/the-80-problem-in-agentic-coding?ref=leadership.garden) documents what he calls the 80% problem and comprehension debt. [Bicameral AI](https://www.bicameral-ai.com/blog/introducing-bicameral?ref=leadership.garden) argues that coding assistants are solving the wrong problem entirely. Meanwhile, [Dmytro Gaivoronsky](https://dreamiurg.net/2026/02/02/where-the-work-goes-when-agents-arrive.html?ref=leadership.garden) reports from inside Steve Yegge's Gas Town, running 20-30 agents simultaneously, and [Jake Quist](https://www.jakequist.com/thoughts/what-happens-when-ai-can-write-all-your-software/?ref=leadership.garden) offers a clean conceptual frame that tries to explain why AI nails a RingBuffer implementation but falls apart on a simple CRM.

What struck me isn't where they disagree. **_It's how much they agree on the facts AND how differently they interpret them._**

## The productivity paradox nobody can escape

Let's start with the numbers, because nearly every author reaches for the same datasets.

[Faros AI](https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025?ref=leadership.garden) and Google's [DORA report](https://dora.dev/research/2025/dora-report/?ref=leadership.garden) found that teams with high AI adoption merged 98% more PRs, but review times ballooned 91%, and PR size increased 154% on average. The bottleneck just moved from generation to review.

[Atlassian's 2025 survey](https://www.atlassian.com/blog/developer/developer-experience-report-2025?ref=leadership.garden), cited by both Osmani and Bicameral, found the paradox in stark terms: 99% of AI-using developers reported saving 10+ hours per week, yet most reported no decrease in overall workload. The time saved writing code was consumed by coordination overhead and context switching.

[Index.dev](https://www.index.dev/blog/ai-coding-assistants-roi-productivity?ref=leadership.garden) reported that teams using AI completed 21% more tasks, yet company-wide delivery metrics showed no improvement. And [METR](https://metr.org/blog/2025-01-13-measuring-ai-ability-to-complete-long-tasks/?ref=leadership.garden), in a controlled study, found that experienced developers were 19% slower when using AI coding assistants - yet believed they were faster.

[Stack Overflow's 2025 survey](https://stackoverflow.co/labs/developer-sentiment-ai-ml/?ref=leadership.garden) showed only 16% of developers reported "great" productivity improvements from AI. The top frustrations: AI solutions that are almost right but not quite (66%) and debugging AI code taking longer than writing it yourself (45%). [SonarSource](https://www.sonarsource.com/blog/ai-coding-trust-gap/?ref=leadership.garden) found that only 48% of developers consistently check AI-assisted code before committing it, while 38% said reviewing AI-generated logic requires more effort than reviewing human-written code. And [Apiiro](https://apiiro.com/blog/4x-velocity-10x-vulnerabilities-ai-coding-assistants-are-shipping-more-risks/?ref=leadership.garden) reported that 48% of AI-generated code contains security vulnerabilities.

These numbers aren't contested. Bulls and bears cite the same data. The disagreement is about what to do with it.

## Where the work went

Here's where the interpretations diverge, and where I think reading these pieces together is more illuminating than reading any of them alone.

Gaivoronsky, writing from inside Gas Town, puts it most directly:

For him, the work moved upstream: into design, guardrails, and feedback loops. He splits his attention into two modes: autopilot (70% of tasks, where CI and linting provide the quality gate) and deliberate (30%, where he brainstorms with AI before writing anything, sketches designs, and reviews code carefully). He's not worried about the distance because he's invested heavily in the infrastructure that catches falls.

Osmani sees the same shift but focuses on its cost. He coined (via [Jeremy Twei](https://x.com/jeremytwei/status/2015886793955229705?ref=leadership.garden)) what I think is the most useful concept in this whole debate: **_comprehension debt_**. Generation and comprehension are different cognitive capabilities. You can review code competently long after your ability to write it from scratch has atrophied. But there's a threshold where "review" becomes rubber stamping. Osmani confesses to crossing it himself: "Claude implemented a feature I'd been putting off for days. The tests passed. I skimmed it, nodded, merged. Three days later I couldn't explain how it worked."

Bicameral pushes back on the entire frame. Their argument, backed by [IDC's 2024 data](https://www.infoworld.com/article/3831759/developers-spend-most-of-their-time-not-coding-idc-report.html?ref=leadership.garden) showing developers spend only 16% of their time writing code, is that the bottleneck was never code generation. It was always an ambiguity: the gap between business intent and technical implementation. As they quote from [r/ExperiencedDevs](https://www.reddit.com/r/ExperiencedDevs/?ref=leadership.garden):

Their concern is that AI agents bury requirement gaps within hundreds of lines of code rather than surfacing them the way a human developer would escalate to product.

Quist offers what I think is the cleanest conceptual frame. He asked an LLM to write a RingBuffer - a self-contained data structure with clear boundaries - and it did it flawlessly, better than he could have. Then he asked it to build a personal CRM, and it fell apart. His hypothesis: the dividing line isn't frontend versus backend or simple versus hard. It's _complexity_: meaning interconnected concerns that require holding multiple contexts simultaneously. Humans are remarkably good at context-switching across these concerns. Current AI architectures aren't. "Humans will own whatever is complex; LLMs will handle whatever isn't."

These aren't contradictory views. They're describing the same elephant from different vantage points. The work moved. Whether that's liberating or terrifying depends on where you're standing and what infrastructure you have in place.

## The spectrum of coping strategies

What's more useful than picking a side is recognizing that practitioners are developing a spectrum of strategies, and your position on it depends on your risk tolerance, your guardrails, and the maturity of your codebase.

On one end, Osmani lays out a comprehensive [spec-driven development](https://addyosmani.com/blog/good-spec/?ref=leadership.garden) workflow. Start in read-only plan mode. Draft specifications before touching code. Structure them like professional PRDs with commands, testing expectations, project structure, code style, git workflow, and boundaries. Use [GitHub's Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/?ref=leadership.garden) four-phase gated workflow (specify, plan, tasks, implement). Break work into modular prompts. Build in self-checks, three-tier boundaries (always do, ask first, never do), and LLM-as-a-judge review patterns. [GitHub's analysis of over 2,500 agent configuration files](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/?ref=leadership.garden) confirmed that the most effective specs cover six areas: commands, testing, project structure, code style, git workflow, and boundaries.

Osmani cites [Andrej Karpathy's](https://x.com/karpathy?ref=leadership.garden) observation about the shift from imperative to declarative development: don't tell the AI what to do - give it success criteria and let it iterate. Write tests first, let the agent loop until they pass. Define the API contract, let it implement to spec. The developers succeeding with this approach spend 70% of their time on problem definition and verification, 30% on execution. The ratios inverted from traditional development, but total time decreased.

On the other end, Gaivoronsky has embraced what he calls "autopilot mode" for the majority of his work, relying on deterministic feedback loops - unit tests, linters, formatters, type checking, CI gates, pre-commit hooks - as the quality net. He's codified his patterns into Claude commands, skills, and custom prompts. When he spots something working reliably, he encodes it. The codified workflows compound. His numbers from January 2026: 1,130 sessions, 37,562 prompts, failure signals in about 16% of sessions, mostly CI-related. He's not reviewing every line anymore, and he's made peace with that: "Less intimate, more managerial. I know what's there at an architectural level, but I don't have line-by-line familiarity anymore."

Between these two poles, there's a pattern that both converge on: asking AI to verify its own work in a fresh context window. Have the model review its output with a clean slate and it catches its own mistakes. It sounds strange - the same model critiquing itself - but both Osmani and Gaivoronsky report that it works. The key is the fresh context: it breaks the coherence bias that made the model confident in the first place.

## What goes wrong when you get it wrong

Ronacher's piece is the necessary cold water. As a maintainer of popular open-source projects, he sees the downstream consequences when people skip the guardrails entirely and enter what he calls "slop loops."

The asymmetry is brutal. It takes someone a minute of prompting and a few minutes of waiting for code to come out. Actually reviewing a pull request takes many times longer. The contributor felt good about it - their AI companion validated them. But the maintainer sees code that looks plausible on the surface and takes real effort to evaluate. Some projects now prefer receiving [the prompts rather than the code](https://x.com/GergelyOrosz/status/2010683228961509839?ref=leadership.garden), because prompts reveal intent more clearly than AI-generated implementations.

Ronacher describes a dynamic that resonates with something Doctorow named more precisely: the _reverse centaur_. In Doctorow's formulation, a centaur is a person assisted by a machine - autocomplete, driving a car. A reverse centaur is a machine head on a human body: a person serving as a squishy appendage for an uncaring system. He points to Amazon delivery drivers surrounded by AI cameras, monitored and driven at superhuman speed. In what Dan Davies calls an "accountability sink," the human's job isn't to oversee the machine's work - it's to take the blame for the machine's mistakes.

You don't have to buy Doctorow's full macro thesis about the AI bubble to find this concept useful at the micro level. When a developer merges AI-generated code they don't understand because the tests passed and they're under pressure to ship, they've become a reverse centaur. They're not overseeing the AI. They're providing the accountability surface for its output. That's a different relationship than the orchestrator-builder role that Osmani and Karpathy describe, and the line between them is thinner than anyone wants to admit.

Osmani cites [Yoko Li](https://x.com/stuffyokodraws/status/2013373307291340870?ref=leadership.garden) capturing the addiction loop: "The agent implements an amazing feature and got maybe 10% of the thing wrong, and you're like 'hey I can fix this if I just prompt it for 5 more mins.' And that was 5 hours ago." You're always almost there. The psychological hook is real.

Karpathy, via Osmani, catalogs the failure modes that persist despite system prompts, despite CLAUDE.md instructions, despite plan mode: assumption propagation (misunderstanding something early and building on faulty premises), abstraction bloat (1,000 lines where 100 would suffice), dead code accumulation, and sycophantic agreement - no pushback, just enthusiastic execution of incomplete or contradictory instructions. As Osmani puts it: "Agents optimize for coherent output, not for questioning your premises."

## What this means for your team (and for you)

I don't have a tidy conclusion. Nobody does, and anyone claiming otherwise is selling something. But reading these pieces together surfaced a few things I keep returning to.

**The split is real, and it's not just about tools.** Karpathy, via Osmani, predicts that AI coding "will split up engineers based on those who primarily liked coding and those who primarily liked building." [Armin Ronacher's poll](https://x.com/mitsuhiko/status/2010446141817844207?ref=leadership.garden) of 5,000 developers shows it's already happening: 44% write less than 10% of their code manually, while 20% still write over 90% by hand. That's a bimodal distribution, not a bell curve. As Osmani notes, there's an uncomfortable truth here: orchestrating agents feels a lot like management. If you became an engineer because you didn't want to be a project manager, this shift might feel like a betrayal.

**Guardrails are the prerequisite, not the afterthought.** Gaivoronsky is the most bullish practitioner in this group, and his entire argument rests on infrastructure: tests, linting, CI gates, pre-commit hooks, type checking. Without those, he says, "_you cannot put anything on autopilot. You end up reviewing every line because that is your only quality gate_." This maps directly to the [DORA 2025](https://dora.dev/research/2025/dora-report/?ref=leadership.garden) finding that AI amplifies your existing practices - good processes get better, bad processes accumulate debt at unprecedented speed.

**The bottleneck probably isn't where you think.** Bicameral's argument haunts me, because it matches my experience from the past 25+ years: most tech debt isn't created in the code. It's created in product meetings. Deadlines, scope cuts, "ship now, optimize later." AI agents that bury requirement gaps instead of surfacing them accelerate this. If your product-engineering handoff is already messy, AI coding tools will make it worse, not better. The [IDC data](https://www.infoworld.com/article/3831759/developers-spend-most-of-their-time-not-coding-idc-report.html?ref=leadership.garden) showing developers spend only 16% of their time writing code should make everyone pause before celebrating 10x improvements in that 16%.

**Comprehension debt compounds silently.** Of everything I've read, this is what I worry about most for my teams. The risk isn't that AI produces bad code. It's that it produces _confident_ code in the wrong direction, and that over time, the people responsible for the system understand less and less of it. As Osmani puts it:

As one commenter on Hacker News [wrote](https://news.ycombinator.com/item?id=46772025&ref=leadership.garden): "It's been like the boiling frog for me. Started by copy-pasting more into ChatGPT. Then more in-IDE prompting. Then agent tools. Suddenly I barely hand code anymore. The transition was so gradual I didn't notice until I was already there."

**Complexity is the moat, for now.** Quist's frame is the one I find most durable. AI commoditizes the simple, self-contained parts of software. Humans retain ownership of the interconnected, context-heavy parts. This applies at every level: within a codebase, within a team, within an organization. The question for any engineering leader isn't "should we use AI agents?" It's "where in our system does the real complexity live, and how do we make sure humans still own that?"

* * *

The work moved. It didn't disappear. Whether your organization thrives or drowns depends on whether you've moved with it upstream into design, specifications, guardrails, and the messy human work of reducing ambiguity, or whether you're still standing where the code used to be, wondering why everything feels faster and worse at the same time.