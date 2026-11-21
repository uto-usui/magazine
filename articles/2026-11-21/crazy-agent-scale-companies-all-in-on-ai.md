---
title: "Crazy Agent Scale: Companies All-in on AI"
source: "https://www.lukew.com/ff/2173/crazy-agent-scale-companies-all-in-on-ai"
publishedDate: "2026-11-20"
category: "design"
feedName: "LukeW"
author: "info@lukew.com (Luke Wroblewski)"
---

by [Luke Wroblewski](http://www.lukew.com/about/) November 20, 2026

At the Crazy Agent Scale event at Sutter Hill Ventures, Clement Pang, David Cramer, Shawn Wang, Quinn Slack, and John Hayes demonstrated what pushing agents to their limits looks like today.

[![crazy agent scale event poster at the Sutter Hill Ventures speaker series](https://static.lukew.com/crazyagent_long2.png)](https://static.lukew.com/crazyagent_long2.png)

To kick things off, I shared an Alan Kay quote: "you can live in the future if you're willing to pay for it". In the 70s, Xerox PARC gave everyone a ridiculously expensive Alto computer and, as a result, lived ten to fifteen years in the future. The goal of this event was to see what living in the future looks like with agents at crazy scale. Here's my notes:

## Clement Pang: Lessons from Building Intent

Clement Pang (co-founder of Wavefront) shared lessons from six months building [Intent](https://intentapp.dev/), an open source system for large-scale agent orchestration. He of course gave the caveat that tips and tricks in AI age poorly.

-   Give agents a spec that lives outside their context window, somewhere they can read, search, and edit as work progresses. Once agents have a shared space like this, they self-organize and use it for specs, logs, research, UI mockups, and more.
-   Intent represents work as a task graph where some tasks block others and some conflict. Because models often stop early thinking they're done, Intent quietly hints to the model when finished tasks unlock new ones, which drives work to its logical conclusion and makes the model seem smarter than it is.
-   Organize agents like a company with specialists (system prompts that govern how each agent behaves). One useful pattern is adversarial pairs: a PM specialist interrogates the user to build a spec while a second PM only critiques it and writes no code.
-   Having no context can be a feature. Code reviewers that never saw the implementation discussion regularly spot a third option the original agent never considered.
-   Long-running agents can retire to avoid compaction. A fresh agent spins up, the two do some knowledge sharing, and the retiring agent signs off (sometimes with a "nice working with you").
-   To save tokens, swap agents sleeping in loops while they wait on CI for monitors: JavaScript the agent writes that runs inside Intent and wakes it only on a signal. Better still is waking the agent only when there's something actionable, like a failing check, a missing approval, or a blocking comment.
-   After tokens, compute becomes the bottleneck. Intent's Rust backend (IntentD) runs on any machine, links machines into a mesh (so a task that needs Xcode finds a Mac), and now extends to cloud sandboxes and Kubernetes, which also limit network and file access.
-   Intent runs coding agents like Claude Code, Codex, Google Antigravity, etc. underneath through ACP, so the main challenge is getting the model to use Intent's tools (like its PR monitor) while keeping the system prompt close to the size of Claude Code's own.
-   Specialists and delegation are now optional, and the model decides when to use them. Parallelism still pays off for work like internationalizing an app, where small, clear tasks fan out to faster models.
-   Clement rarely types anymore. He uses dictation and a small hardware controller with a dial and status lights to move between agent workspaces.

## David Cramer: One Agent for the Whole Company

David Cramer (co-founder of Sentry) built Junior, an open source agent that does nearly every job at Sentry and is its top contributor by commits. Opus 5.5 does 99% of the lift, the rest is automation and efficiency.

-   Run agents in cloud sandboxes. Local setups quickly hit disk space limits, port conflicts, database and Docker networking headaches, while sandboxes remove those choices (much like code formatters ended the tabs versus spaces debate) and scale indefinitely. Compute is roughly 10 to 20% of Junior's bill.
-   Skip role play. A single agent with access to the knowledge it needs, using one system prompt, handles every task at the company that isn't highly confidential.
-   Treat the agent like an intern: hand it the work and expect it to come back when it's blocked or done, with no micromanaging along the way.
-   Give the agent its own corporate identity. Junior has a shared account and email address, so it can log into services like Notion once and give the whole company access through it.
-   Attribution matters. Junior opens pull requests under its own name, co-authors every commit with the person who asked for it, and adds a footer. David expects every company will need an identity model that covers both the person and the agent.
-   Getting an agent to stay quiet until it's needed is hard. Magic "no reply" markers work but aren't reliable, while injecting a tool call that ends the turn works much better.
-   Use watches over loops. Polling loops are expensive (Intercom reportedly found about 60% of its token spend went to checking pull requests), so Junior subscribes to events like CI failures and review comments that get injected as user messages. Leaving review comments on a pull request produces far better output than chatting with a bot.
-   Before starting work, Junior checks whether anyone else has touched the task and pulls in related transcripts, which is more diligence than most people do.
-   Enforce core workflows with code and keep them out of the system prompt. Reject tool calls that skip a step, add co-author credits automatically, and route traffic through an egress firewall that can answer a raw gh pr create with instructions to use the right tool. The agent never sees secrets.
-   Tool descriptions and tool responses are powerful places to steer behavior, a lesson David learned building MCP servers.
-   Human attention is now the limiting factor. Junior pushes questions and ready-to-review pull requests into an inbox, and the team is experimenting with managing all work through that inbox and a single always-on thread.
-   Junior's biggest unlock came from answering questions. Anyone at the company (sales included) can ask how something works, and Junior clones the relevant repos in a sandbox, reads the code, and comes back with a correct answer.
-   Most companies shouldn't build one of these. Junior has taken thousands of hours and a team of five, and David would start with an existing framework like Mastra.
-   Junior's memory is basic: shared, stored forever, with passive extraction and recall injected into every prompt via hybrid search. Even so, it makes the agent noticeably more token efficient.

## Shawn Wang: Tiny Teams and Internal Tools

Shawn Wang (Latent Space podcast, AI Engineer) talked about tiny teams, companies with more than $1M in revenue per employee, and how his own team uses agents to build internal tools.

-   Every company should have an internal tools repo where employees can build whatever helps them, with guidance on guardrails. Shawn's team has built its own code hosting, a drive with a DocuSign clone that files signed documents automatically, a calendar replacement, and more.
-   Facing a $40,000 a year bill for a mid-sized SaaS tool, Shawn ran a competition with a $10,000 prize to replace it. Entrants spent a few hundred dollars each building clones, the team hired the top two, and now owns the resulting software outright.
-   For the competition, he wrote evals that contestants could hill climb against, then had his buying team evaluate the finalists as if they were independent vendors.
-   Think in loops on top of loops: token generation, multi-turn conversations, tool calls, goals, and automations. The loop above all of these is how you direct the humans who direct the agents.
-   People increasingly want AI that owns an outcome and coordinates a team, a different abstraction than either a software factory or an agent on a loop. These agents also need to keep learning and research what to do next.
-   Most answer engine optimization (AEO) tools only report a score, so Shawn stores each model's full answer and reasoning, which shows exactly what to fix. One founder on the podcast was losing to a competitor because models had the wrong pricing information, and fixing it moved the results.
-   Give every agent a dashboard with a template that updates over time. Vibe coding a new report each time produces inconsistent results.
-   AI Engineer has transcribed and cleaned up every talk it's ever hosted and plans to release the corpus on Hugging Face so models can train on it, the opposite of blocking crawlers and charging for access.
-   Software factories are a comfortable focus for people in the room, but some of the most ambitious work is applying AI to science and real economic problems (Periodic Labs being one example). Memory and skills also remain largely unsolved.

## Quinn Slack: Building a Company Around Agents

Quinn Slack (CEO of Amp, co-founder of Sourcegraph) shared how Amp passed $100M in ARR with the same 21 people it started with a year ago using agents to scale.

-   Amp spun out of Sourcegraph and couldn't grant stock options for most of its first year, which forced the team to do everything themselves without hiring experts.
-   Quinn thinks selling software to a broad audience is dead. He compared software companies using agents to a typewriter company celebrating that computers made its sales team more efficient while holding the seed of its own demise.
-   Software companies were organized around writing code being slow and expensive, with sales, marketing, and support each in their own box. Incremental changes like lighter code review or "agent first" processes don't go far enough, and the whole structure needs to be burned down.
-   At Amp, one person working with an agent owns something end to end: deciding what to build, shipping it, supporting it, and marketing it. Everyone owns at least 1% of the company, and Quinn believes that much responsibility and skin in the game brings out the best in people.
-   Amp received about 9,300 bug reports in three months, most filed by customers' agents, so they capture what the person was trying to do (and whether they were mad).
-   An agent clusters those reports into themes, pulls in telemetry, logs, customer value, and past communications, kicks off fixes, and drafts emails to every affected user, including people who never reported the bug.
-   Those emails often include free credits. Amp gave out about half a million dollars in credits over three months, less than 0.5% of revenue and far cheaper than a support team, and delighted users send even more feedback.
-   A human still reviews every outgoing email, because fully automated customer messages feel too impersonal.
-   Amp has no support, finance, or marketing teams. The best marketing turns out to be finding the 300 people who asked for something and building it for them.
-   The team built its own bug tracker in half a day, since they only needed about 2% of Linear plus a few things Linear would never build.
-   You can do all of this with any agent. If your company won't let you connect your agent to this kind of data, Quinn's take is that's pretty dumb.
-   Amp makes its money through joint ventures (with banks, for example) that earn it shares of companies benefiting most from AI. It avoids selling to software companies, which he doesn't expect to be around long enough to renew.

## John Hayes: Running a Software Factory in Production

John Hayes (Reve; Pure Storage) walked through how his team runs a software factory in production for Motif, a product that turns an entire marketing department into code. Since marketers don't review code, agents build, verify, and fix it continuously on the live system.

-   Marketing work like ad feedback loops, landing pages, user journey models, asset generation, strategy, and reporting all becomes code. With everything in code, you can trace backwards from what's working to the assets, journeys, and strategy behind it.
-   A runbook skill shows the general pattern. It runs a program first and only falls back to a prompt for the agent when something fails, and the agent then fixes the script so next time no agent is needed. Over time, prompts turn into code.
-   The team doesn't use a bug database or continuous integration, and lets the system find and fix problems itself. At one point, the agent figured out it could spin up a sandbox and pull secrets from the database to populate John's local environment file.
-   For softer qualities in the UI, every component fills out contracts covering things like layout stability, focus, relevance, and how DOM elements can collapse. These get turned into a machine readable form so a verification harness can observe components at runtime and report findings.
-   Findings go to a judge that decides whether the component is wrong or the contract is, much like a unit test that turns out to be the thing in need of fixing.
-   At around 130 components, the system deadlocked for 48 hours trying to track the state of its findings, and steps kept getting dropped. The fix was alternating agents and scripts: scripts handle the busywork and return a just-in-time prompt for the next step, since agents forget steps no matter how emphatic the system prompt is.
-   On the backend, everything is stored in Git (about 600,000 files for a larger customer), so careless reads blow up the system. John instrumented every IO and byte to give agents a ratio of data read to output produced.
-   Agents have poor performance instincts, like running lots of small operations in parallel when batching would be faster. He ended up changing the API so batching was the only option, and gave up on letting agents access Git history at all.
-   In production sandboxes, agents are immortal. Each directory gets its own agent that lives forever, so keeping things in context covers for details it forgets to write down.
-   Each ad network integration ends up as generated code, and agents call each other the same way a program calls an executable, with requests transparently routed to other sandboxes.
-   Generated Python modules can run inside an agent debugger the first time they're used or whenever something breaks. The agent completes the task, returns the result, and writes the code so the next run is much faster.
-   Agents tend to look for fixes right where a problem shows up. Trace scripts, written by hand at first and later extracted from successful debugging sessions, broaden their view and get contributed back to the library where the problem originated.
-   When an agent goes down the wrong rabbit hole, you can insert a trace to redirect it. Often one extra sentence, like a reminder to do static analysis, is enough. The goal is super continuous development on a running system that keeps fixing itself.

Got a question about this topic?

-   [The Evolution of AI Products](https://www.lukew.com/ff/2096/the-evolution-of-ai-products)
-   [Background Agents Reduce Context Window Issues](https://www.lukew.com/ff/2102/background-agents-reduce-context-window-issues)
-   [Dynamic Context for AI Agents](https://www.lukew.com/ff/2114/dynamic-context-for-ai-agents)
-   Tags: [agents](https://www.lukew.com/ff?tag=agents) [ai models](https://www.lukew.com/ff?tag=ai%20models) [coding](https://www.lukew.com/ff?tag=coding)