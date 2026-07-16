---
title: "Context engineering with Dex Horthy"
source: "https://newsletter.pragmaticengineer.com/p/context-engineering-with-dex-horthy"
publishedDate: "2026-07-15"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/Usufn8IQJgw), [Spotify](https://open.spotify.com/episode/7ahjKC1ft3RrJA8SvsilfC)**, **and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1769051199).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!HVBB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a9e89e3-866b-4248-91a9-e6461be25cd8_1497x131.png)

](https://substackcdn.com/image/fetch/$s_!HVBB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a9e89e3-866b-4248-91a9-e6461be25cd8_1497x131.png)

**• [Antithesis](https://antithesis.com/pragmatic)** — with Antithesis, you can use AI agents to work on critical systems without worrying about correctness. Going far beyond code review, you can run your complete system in a hostile environment, analyze its behavior, and reproduce every issue perfectly. Teams like Jane Street, [Fly.io](http://fly.io/), and the etcd community use Antithesis to ship better code, faster. [Learn more.](https://antithesis.com/pragmatic)

**• [Buildkite](https://buildkite.com/pragmatic)** — the CI platform trusted by OpenAI, Anthropic, Cursor, Meta, Uber, Ramp, Nvidia, Airbnb and many more. Buildkite was stress-tested at the largest scale inside companies solving some of the hardest engineering problems. It’s built to reliably manage whatever your coding agents throw at the build queue, today, next year and beyond. [Learn more.](https://buildkite.com/pragmatic)

**• [Sentry](http://sentry.io/pragmatic)** – application monitoring software built by developers, for developers. Sentry’s [Seer AI agent](https://sentry.io/lp/seer/utm_source=pragmatic&utm_medium=paid-community&utm_campaign=ai-fy27q1-seerlaunch&utm_content=recording-coreread-freetrial&code=pragmatic) is one of their new, neat tools, as a way to debug errors faster. Same with Sentry’s MCP server. [Check out Sentry](http://sentry.io/pragmatic).

Knowing how LLM contexts work and how to work around context limitations – aka “context engineering” – is becoming more important for software engineers working with LLMs. Let’s look into what works and what doesn’t, today.

In this episode of The Pragmatic Engineer podcast, I sit down with the CEO and cofounder of HumanLayer, Dex Horthy, who coined the term “context engineering”. We discuss the ideas behind this context engineering, harness engineering, loop engineering, software factories, why his approach to AI-assisted software development has evolved, and how [HumanLayer](https://www.humanlayer.dev/) is helping engineering teams automate more of the software development lifecycle without sacrificing code quality.

Here are 12 useful points Dex made in our conversation:

**1\. Dex talked with ~100 “real” AI Engineers and wrote the popular ‘[12-Factor Agents - Principles for building reliable LLM applications](https://github.com/humanlayer/12-factor-agents)**’ based on what he learned. Around August 2024, he started to build AI agents when the common approach was to use frameworks like LangChain and CrewAI, and also talked with around 100 AI engineers doing tangible work such as taking on $100K+ contracts to ship AI solutions within enterprises. They tried those frameworks and discarded them in favor of building their own pipelines. Dex shared the learnings from the conversations in his hit book, [12-Factor Agents](https://github.com/humanlayer/12-factor-agents). _It’s a great read!_

**2\. Lesson learned: Shipping unread code spells disaster within months.** Dex experimented with having the model write the code and humans not reviewing anything in July 2025. Four months later, they shut things down and threw the whole system out. Production broke, and no matter how much the team prompted Opus 4.1, the model could not find the root cause.

It took days of wading through spaghetti code to discover the primary key wrongly routed through the complete codebase. Once fixed, it took three weeks to re-onboard to a codebase no human had ever read. Today, Dex thinks this problem wouldn’t even take four months to develop, now that newer models produce code a _lot_ faster than a year ago.

**3\. Today’s coding models are most likely trained in a way that makes codebases** _**worse**_ **over time.** Dex believes that the reason we see LLMs “degrade” existing codebases is because they are optimized to do well on SWE-bench-style benchmarks. These benchmarks reward reproducing a known fix in codebases like Django, but cannot measure poor architecture decisions. This is because the cost function of bad architecture and bad program design cannot be evaluated by running a unit test. It’s a tricky problem to solve: Dex’s best guess is an eval of a model building 20 features in a row in a codebase without knowing what’s coming next.

**4\. Context engineering 101: figure out where the “dumb zone” begins.** As a rule of thumb, the less of the context window that is used, the better the outcomes are. This is because the attention mechanism [is quadratic](https://newsletter.pragmaticengineer.com/i/141865286/scalability-challenge-from-self-attention): the more that goes into the context window, the more compute is required to process it all. _We cover more about self-attention scalability challenges [in our ChatGPT deepdive](https://newsletter.pragmaticengineer.com/i/141865286/scalability-challenge-from-self-attention)._

For a model with a 1M context window, Dex pushes it to around 300-400K when it feels right. For smaller models, he stops at around 100K. You hit the “dumb zone” when its performance starts to degrade because the context window fills up beyond this heuristic limit, and the model begins doing increasingly stupid things like deleting your .env file, for example.

**5\. A larger context window does not mean a smarter model.** Models’ intelligence is behind the ability to use the tokens in the context window, by deciding which parts of the context are relevant for the next decision. You have to get a feel for how much context usage makes sense, and experiment when you hit the “dumb zone.”

**6\. Frequent, intentional compaction is a technique Dex uses for more complex projects.** He will take a long and noisy context, compress it into a Markdown document, then start a new session fresh, pointing the model to this “compressed context” that is in the Markdown.

A workflow he uses:

-   One session reads a ton of code (filling up its context window while in the “smart zone”), then emits a research document
    
-   The next session takes tickets describing the work to be done and turns it into a design document
    
-   The following session takes both documents to create a plan
    
-   The human is in the loop where it _really_ matters: in this case, reviewing the design document and architecture because Dex finds models to be weak on this
    

**7\. Don’t bother optimizing LLM usage until business is booming, there’s massive scale, or high costs.** Dex suggests to always start building software with the smartest available model to solve the problem, since engineering time is almost always the bottleneck. Begin to optimize LLM usage and context usage only when at real scale and costs are high enough. That’s when it can be worth using GPT-OSS-120B (1/1,000th the cost of Opus) for the simpler steps in your process.

**8\. “You’re completely right!” or “you’re right to push back on that” are phrases that mean it’s time to start a new session.** These responses mean the LLM session is trajectory-poisoned, and you’re wasting time and tokens to continue. Models are [autoregressive](https://en.wikipedia.org/wiki/Autoregressive_model), so if you get into this loop of:

-   Model makes a mistake
    
-   → user “yells”
    
-   → model keeps making mistakes
    
-   → user “yells”
    
-   … the model calculates that the next most probable message is to make another mistake!
    

**9\. Only four things matter in the context window:**

-   **Size**: the bigger it is, the more space you should have before hitting the “dumb zone”
    
-   **Information quality**. Once something is in the context window, every subsequent turn treats it as fact. This is why errors can compound.
    
-   **Missing information**: if there’s information missing that the agent would need, the outcome will be worse, as the agent fills in the gap with guesses.
    
-   **Trajectory.** Models are autoregressive, so they predict the next message in the conversation based on previous ones in a kind of thread of reasoning. “Trajectory poisoning” is when the agent gets into a pattern of doing things you don’t want. In this case, it’s time to start over.
    

**10\. Slow loops are Dex’s favorite way to do ‘loop engineering.’** The HumanLayer team started with a nightly automation setup that kicks off an agent to fix one thing in the codebase, and open a pull request. In the mornings, they woke up to a PR waiting to be merged. They tweaked it over time and now have four agents open a total of four PRs by the morning, with the focus on code quality improvements. A person still reads all of them before merging.

**11\. “Token harder” vs. “token smarter”:** Dex is in a group chat named ‘Hyper Engineering’, where members share advice on how to max out their Claude subscriptions. This approach, he calls “token harder”. On the other side is “token smarter”: aiming to get maximum value from AI while keeping control. Smarter is harder to pull off.

**12\. Three ways to run a “software factory.”** Here’s options Dex sees as viable:

1.  **“Turn the lights off:**” go all-in on agentic coding, do not review the code, and pray that AI doesn’t create too much slop. _Dex tried this and failed._
    
2.  **Read and review all AI-generated code.** This slows things down to human speed. Dex says that this way, you should expect a 30-50% lift in productivity from AI, compared to pre-AI engineering.
    
3.  **Find leverage, but keep people in the loop.** Find out where an hour spent in planning could save four hours’ worth of implementation, in terms of fewer bugs. Invest more time in areas with leverage: design, architecture, and key decisions. Then, let the agent generate code and don’t insist on reviewing all of it. In this way, Dex believes you can move 2-3x faster than when devs wrote all code by hand.
    

• [How Uber uses AI for development: inside look](https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development)

• [Are AI agents actually slowing us down?](https://newsletter.pragmaticengineer.com/p/are-ai-agents-actually-slowing-us)

• [AI Tooling for Software Engineers in 2026](https://newsletter.pragmaticengineer.com/p/ai-tooling-2026)

• [Vibe Coding as a software engineer](https://newsletter.pragmaticengineer.com/p/vibe-coding-as-a-software-engineer)

• [How Claude Code is built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)

• [AI Engineering in the real world](https://newsletter.pragmaticengineer.com/p/ai-engineering-in-the-real-world)

• [The AI Engineering Stack](https://newsletter.pragmaticengineer.com/p/the-ai-engineering-stack)

• [How AI-assisted coding will change software engineering: hard truths](https://newsletter.pragmaticengineer.com/p/how-ai-will-change-software-engineering)

• [The creator of OpenClaw: “I ship code I don’t read”](https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code)

[00:00](https://www.youtube.com/watch?v=Usufn8IQJgw) Intro

[01:33](https://www.youtube.com/watch?v=Usufn8IQJgw&t=93s) Dex’s path into tech

[03:34](https://www.youtube.com/watch?v=Usufn8IQJgw&t=214s) Early work in platform engineering

[05:28](https://www.youtube.com/watch?v=Usufn8IQJgw&t=328s) Replicated

[11:24](https://www.youtube.com/watch?v=Usufn8IQJgw&t=684s) Metalytics

[12:36](https://www.youtube.com/watch?v=Usufn8IQJgw&t=756s) 12-factor agents

[18:27](https://www.youtube.com/watch?v=Usufn8IQJgw&t=1107s) Context engineering

[23:38](https://www.youtube.com/watch?v=Usufn8IQJgw&t=1418s) Harness engineering

[26:11](https://www.youtube.com/watch?v=Usufn8IQJgw&t=1571s) Context overload

[30:45](https://www.youtube.com/watch?v=Usufn8IQJgw&t=1845s) Loop engineering

[44:34](https://www.youtube.com/watch?v=Usufn8IQJgw&t=2674s) Software factories before and after AI

[50:33](https://www.youtube.com/watch?v=Usufn8IQJgw&t=3033s) Automation limits

[55:18](https://www.youtube.com/watch?v=Usufn8IQJgw&t=3318s) Three options for automating

[59:00](https://www.youtube.com/watch?v=Usufn8IQJgw&t=3540s) RPI framework

[1:04:16](https://www.youtube.com/watch?v=Usufn8IQJgw&t=3856s) Intentional compaction

[1:11:48](https://www.youtube.com/watch?v=Usufn8IQJgw&t=4308s) Token harder vs. token smarter

[1:16:44](https://www.youtube.com/watch?v=Usufn8IQJgw&t=4604s) AI slop

[1:19:15](https://www.youtube.com/watch?v=Usufn8IQJgw&t=4755s) HumanLayer

[1:29:09](https://www.youtube.com/watch?v=Usufn8IQJgw&t=5349s) Book recommendation

**Where to find Dex Horthy:**

• X: [https://x.com/dexhorthy](https://x.com/dexhorthy)

• LinkedIn: [linkedin.com/in/dexterihorthy](http://linkedin.com/in/dexterihorthy)

• Website: [https://www.humanlayer.dev](https://www.humanlayer.dev/)

**Mentions during the episode:**

• HumanLayer: [https://www.humanlayer.dev](https://www.humanlayer.dev/)

• Jet Propulsion Laboratory (JPL): [https://www.jpl.nasa.gov](https://www.jpl.nasa.gov/)

• Dykstra’s projection algorithm: [https://en.wikipedia.org/wiki/Dykstra’s\_projection\_algorithm](https://en.wikipedia.org/wiki/Dykstra's_projection_algorithm)

• Replicated: [https://www.replicated.com](https://www.replicated.com/)

• Docker: [https://www.docker.com](https://www.docker.com/)

• HashiCorp: [https://www.hashicorp.com](https://www.hashicorp.com/)

• DataStax: [https://www.ibm.com/products/datastax](https://www.ibm.com/products/datastax)

• Puppet: [https://www.puppet.com](https://www.puppet.com/)

• Travis CI: [https://www.travis-ci.com](https://www.travis-ci.com/)

• Circle CI: [https://circleci.com](https://circleci.com/)

• Randy Newman’s website: [https://www.randynewman.com](https://www.randynewman.com/)

• 12-Factor Agents - Principles for building reliable LLM applications: [https://github.com/humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents)

• The creator of Clawd: “I ship code I don’t read”: [https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code](https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code)

• Vaibhav Gupta on LinkedIn: [https://www.linkedin.com/in/vaigup](https://www.linkedin.com/in/vaigup)

• Tobi Lutke’s post on X about context engineering:

[

![X avatar for @tobi](https://substackcdn.com/image/fetch/$s_!-OXc!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1999293930936909824%2F_HWYanot.jpg)

tobi lutke@tobi

I really like the term “context engineering” over prompt engineering. It describes the core skill better: the art of providing all the context for the task to be plausibly solvable by the LLM.

3:01 AM · Jun 19, 2025 · 2.07M Views

347 Replies · 879 Reposts · 8.59K Likes





](https://x.com/tobi/status/1935533422589399127)

• Andrej Karpathy’s post on X about context engineering:

[

![X avatar for @karpathy](https://substackcdn.com/image/fetch/$s_!oMwR!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1296667294148382721%2F9Pr6XrPB.jpg)

Andrej Karpathy@karpathy

+1 for "context engineering" over "prompt engineering". People associate prompts with short task descriptions you'd give an LLM in your day-to-day use. When in every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window

![X avatar for @tobi](https://substackcdn.com/image/fetch/$s_!-OXc!,w_20,h_20,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1999293930936909824%2F_HWYanot.jpg)

tobi lutke @tobi

I really like the term “context engineering” over prompt engineering. It describes the core skill better: the art of providing all the context for the task to be plausibly solvable by the LLM.

3:54 PM · Jun 25, 2025 · 2.38M Views

532 Replies · 2.05K Reposts · 14.3K Likes





](https://x.com/karpathy/status/1937902205765607626)

• Improving Deep Agents with harness engineering: [https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)

• # Skill Issue: Harness Engineering for Coding Agents: [https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)

• Harness engineering for coding agent users: [https://martinfowler.com/articles/harness-engineering.html](https://martinfowler.com/articles/harness-engineering.html)

• How AI will change software engineering – with Martin Fowler: [https://newsletter.pragmaticengineer.com/p/martin-fowler](https://newsletter.pragmaticengineer.com/p/martin-fowler)

• Dex’s post on X about context reality check:

[

![X avatar for @dexhorthy](https://substackcdn.com/image/fetch/$s_!9YgW!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1936650128518938624%2FtCFV_MZO.jpg)

dex@dexhorthy

don't make me tap the sign

![](https://pbs.substack.com/media/HDPRw74bQAMTATJ.jpg)

![X avatar for @dexhorthy](https://substackcdn.com/image/fetch/$s_!9YgW!,w_20,h_20,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1936650128518938624%2FtCFV_MZO.jpg)

dex @dexhorthy

Giving sonnet 4 a 1m context window is kinda unhinged considering I see many folks struggle to keep it on task past 100k

8:54 PM · Mar 12, 2026 · 123K Views

21 Replies · 25 Reposts · 700 Likes





](https://x.com/dexhorthy/status/2032198500063330703)

• Laurie Voss on LinkedIn: [https://www.linkedin.com/in/seldo](https://www.linkedin.com/in/seldo)

• Everything is a ralph loop: [https://ghuntley.com/loop](https://ghuntley.com/loop)

• Dex’s post on X about feedback loops:

[

![X avatar for @dexhorthy](https://substackcdn.com/image/fetch/$s_!9YgW!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1936650128518938624%2FtCFV_MZO.jpg)

dex@dexhorthy

Here’s what’s gonna happen: - you replace your code review with feedback loops (sentry, datadog, support tickets, etc) - you stop reading the code - software factory fixes everything - one day something breaks at 3am, agent can’t fix it - nobody’s read the code in 3 months - you

![X avatar for @dexhorthy](https://substackcdn.com/image/fetch/$s_!9YgW!,w_20,h_20,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1936650128518938624%2FtCFV_MZO.jpg)

dex @dexhorthy

@gregpr07 this may surprise you that thus is coming from me but I think we’re in for a 1-3 year period where stuff might break at 3am and if you’re relying on loops to fix it and nobody understands what’s under the hood, you’re looking at an existential threat to your company

3:40 PM · Mar 10, 2026 · 629K Views

254 Replies · 551 Reposts · 6.81K Likes





](https://x.com/dexhorthy/status/2031394747869192431)

• Dex’s post on X about token harder vs. token smarter:

[

![X avatar for @dexhorthy](https://substackcdn.com/image/fetch/$s_!9YgW!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1936650128518938624%2FtCFV_MZO.jpg)

dex@dexhorthy

noticing the ai coding meta is starting to shift in some circles from “token harder” to “token smarter” In August the mandate felt like “figure out how to spend lots of tokens, you are being held back by your inability to spend tokens” - Ralph wiggum, RPI, worktree tools like

3:51 AM · Mar 29, 2026 · 15.1K Views

21 Replies · 7 Reposts · 161 Likes





](https://x.com/dexhorthy/status/2038101619720781941)

• Dex’s post on X about AI slop:

[

![X avatar for @dexhorthy](https://substackcdn.com/image/fetch/$s_!9YgW!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1936650128518938624%2FtCFV_MZO.jpg)

dex@dexhorthy

STOP WRITING YOUR SPECS BY HAND yeah, ai can write your code, but it can also write your specs and PRDs but the same rule as always: slop in → slop out if you outsource the thinking, you’re gonna get garbage lucky you, me and @vaibcode went deep on some powerful techniques

4:15 PM · Jun 19, 2026 · 9.19K Views

7 Replies · 5 Reposts · 145 Likes





](https://x.com/dexhorthy/status/2068004719298228236)

• GitHub: [https://github.com](https://github.com/)

• Paul Graham, Live from Stockholm: [https://www.ycombinator.com/library/Q7-paul-graham-live-from-stockholm](https://www.ycombinator.com/library/Q7-paul-graham-live-from-stockholm)

• _Refactoring: Improving the Design of Existing Code_: [https://www.amazon.com/dp/0134757599](https://www.amazon.com/dp/0134757599)

• _Clean Code: A Handbook of Agile Software Craftsmanship_: [https://www.amazon.com/dp/0132350882](https://www.amazon.com/dp/0132350882)

• _The Pragmatic Programmer: From Journeyman to Master_: [https://www.amazon.com/dp/020161622X](https://www.amazon.com/dp/020161622X)

—

Production and marketing by [Pen Name](https://penname.co/).