---
title: "Building Pi, and what makes self-modifying software so fascinating"
source: "https://newsletter.pragmaticengineer.com/p/building-pi-and-what-makes-self-modifying"
publishedDate: "2026-04-29"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/n5f51gtuGHE), [Spotify](https://open.spotify.com/episode/1fDw9cSN5Xx6wkgVQLKTHs), and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1769051199).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!Gh57!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

](https://substackcdn.com/image/fetch/$s_!Gh57!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

• **[Statsig](http://statsig.com/pragmatic)** – ⁠ The unified platform for flags, analytics, experiments, and more. Stop switching between different tools, and have them all in one place.

• **[Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer) —** The makers of SonarQube, the industry standard for code verification and automated code review. As AI agents generate extreme volumes of code, verification can’t be optional: SonarQube acts as the independent, zero‑trust, multi-layered verification engine that checks every line of code against your quality, security, and architectural standards, so only safe, reliable, and auditable code reaches production. [Try it out for yourself](https://www.sonarsource.com/plans-and-pricing/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=sq-download&utm_content=podcast-sonar-verification&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer).

• **[WorkOS](https://workos.com/)** – Designing large systems is about tradeoffs. But one thing isn’t a tradeoff: enterprise features. WorkOS gives you APIs to ship enterprise features – SSO, directory sync, RBAC, audit logs – in days, not months. Visit [WorkOS.com](http://workos.com/) to learn more.

Mario Zechner is the creator of [Pi](https://github.com/badlogic/pi-mono), a minimalist, self-modifying AI coding agent, that is the foundation upon which OpenClaw (created by Peter Steinberger) is built. Meanwhile, Armin Ronacher is the creator of Flask, and a longtime user of Pi. The pair are also friends.

I sat down with Mario and Armin for the latest episode of the Pragmatic Engineer Podcast for an interesting conversation about AI and their reservations about it – even though both are heavily invested in building AI-powered tools.

Mario explains why he built Pi, and gives his take on why it has become so popular. Armin walks us through how he uses AI tools, including building a game with Pi, and why he always puts human judgment firmly at the heart of his approach.

We cover the risks of over-automation, the limits of agentic workflows, and why strong engineers with informed judgment still matter. We also get into the challenges of working with code written by non-engineers, and whether open source can withstand a tidal wave of agent-generated code.

Here are 9 of my most interesting takeaways from talking with Armin and Mario:

**1\. Pi was built because Claude Code became unpredictable.** Mario was a big fan of Claude Code at first. But as the team behind it pushed velocity and added features, he found that bugs multiplied and the tool’s behavior started to change. Mario wanted an AI harness that behaves in a stable, consistent way. He observed that the addition of new features caused Claude Code to act unpredictably, so resolved to add as few features as possible to Pi.

**2\. It should be MUCH easier to build specialized tools for specific tasks.** Different projects need different harness types because, as Mario points out, the same hammer is not ideal for every single construction job. As such, Pi is built with the goal of allowing the creation of specialized harnesses. It can modify itself so that a user can create the bespoke harness needed for any task. Mario believes it’s a preview of how self-modifiable software might look in the future.

**3\. Automation bias is one of the biggest risks of working with AI agents.** Once devs confirm that an AI agent can produce acceptable code, they start to review its output less often, even though agents can – and do! – produce slop. Mario advises being far more sceptical with agents, and cautions that the quality of their output isn’t guaranteed, however well they performed previously.

**4\. AI agents decrease code quality, but this is not on purpose.** From talking with 30+ engineering teams, Armin found that code quality is down everywhere, and serious projects are shipping with “vibe slop.” A potential cause of this is that keeping agentic output clean and of high quality takes _deliberate_ effort, but it’s not clear to many devs exactly _how_ to do this. There’s also PR review fatigue and automation bias (the assumption that AI agents invariably generate good code).

**5\. New trend: AI makes it harder for senior engineers to reject pointless complexity.** Historically, senior engineers kept software complexity at bay simply by saying “no” a lot. But Armin observes that these days, more junior engineers and product managers deploy agent-scripted counterarguments when a senior colleague kicks an idea to the curb. This makes decision-making exhausting, and more bad ideas make it into production as a result.

**6\. Junior engineers > AI agents.** Mario points out that, unlike humans, agents don’t retain lessons in the same way, nor feel the pain of bad code. Junior engineers do, and the pain of maintenance teaches them to simplify interfaces and avoid bad abstractions – which are both qualities of an effective senior engineer. In this way, a junior engineer is more valuable than an AI agent!

**7\. Agents refactor less because they feel no “pain.”** Humans rewrite bad interfaces because maintaining them _hurts_, whereas agents will obliviously churn out and extend a terrible structure, _ad infinitum_. This is a big reason why AI agents keep adding more tech debt.

**8\. Frictionless shipping can actually be harmful.** Armin notes that some friction is desirable; for example, multi-reviewer approvals on critical services, SLO gates (different gates based on the service level objective offered), and migration checklists. The good thing about friction is that it makes humans stop and think.

**9\. Does not being in San Francisco help people stay grounded about AI?** I asked Mario how he keeps level-headed about AI while building one of the most popular AI agent harnesses. In response, he credits living in Austria, being a father, and enjoying the great outdoors, as his antidotes to all the hype.

• [The creator of OpenClaw: “I ship code that I don’t read”](https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code)

• [Building great SDKs](https://newsletter.pragmaticengineer.com/p/building-great-sdks)

• [What is inference engineering? Deepdive](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering)

• [The impact of AI on software engineers in 2026: key trends](https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026)

• [Cycles of disruption in the tech industry](https://newsletter.pragmaticengineer.com/p/cycles-of-disruption-in-the-tech)

• [The AI engineering stack](https://newsletter.pragmaticengineer.com/p/the-ai-engineering-stack)

([00:00](https://www.youtube.com/watch?v=n5f51gtuGHE)) Intro

([07:30](https://www.youtube.com/watch?v=n5f51gtuGHE&t=450s)) How Mario, Armin, and Peter Steinberger met

([15:15](https://www.youtube.com/watch?v=n5f51gtuGHE&t=915s)) How 30 dev teams use AI agents: learnings

([21:50](https://www.youtube.com/watch?v=n5f51gtuGHE&t=1310s)) The importance of judgment

([24:26](https://www.youtube.com/watch?v=n5f51gtuGHE&t=1466s)) Challenges when non-engineers write code

([28:30](https://www.youtube.com/watch?v=n5f51gtuGHE&t=1710s)) Downsides of over-automation

([32:18](https://www.youtube.com/watch?v=n5f51gtuGHE&t=1938s)) Pi

([48:09](https://www.youtube.com/watch?v=n5f51gtuGHE&t=2889s)) OpenClaw + Pi

([50:54](https://www.youtube.com/watch?v=n5f51gtuGHE&t=3054s)) “Clankers”

([57:32](https://www.youtube.com/watch?v=n5f51gtuGHE&t=3452s)) Open source and AI

([1:00:22](https://www.youtube.com/watch?v=n5f51gtuGHE&t=3622s)) Complexity as the enemy

([1:02:50](https://www.youtube.com/watch?v=n5f51gtuGHE&t=3770s)) Building an AI-native startup

([1:11:52](https://www.youtube.com/watch?v=n5f51gtuGHE&t=4312s)) “Slow the F down”

([1:16:40](https://www.youtube.com/watch?v=n5f51gtuGHE&t=4600s)) MCPs vs. CLI

([1:25:03](https://www.youtube.com/watch?v=n5f51gtuGHE&t=5103s)) Predictions and staying up to date

**Where to find Mario Zechner:**

• X: [https://x.com/badlogicgames](https://x.com/badlogicgames)

• LinkedIn: [https://www.linkedin.com/in/mariozechner](https://www.linkedin.com/in/mariozechner)

• Website: [https://mariozechner.at](https://mariozechner.at/)

**Where to find Armin Ronacher:**

• X: [https://x.com/mitsuhiko](https://x.com/mitsuhiko)

• LinkedIn: [https://www.linkedin.com/in/arminronacher](https://www.linkedin.com/in/arminronacher)

• Website: [https://mitsuhiko.at](https://mitsuhiko.at/)

• Blog: [https://lucumr.pocoo.org](https://lucumr.pocoo.org/)

**Mentions during the episode:**

• Python, Go, Rust, TypeScript and AI with Armin Ronacher: [https://newsletter.pragmaticengineer.com/p/python-go-rust-typescript-and-ai](https://newsletter.pragmaticengineer.com/p/python-go-rust-typescript-and-ai)

• Pi: [https://pi.dev](https://pi.dev/)

• OpenClaw: [https://openclaw.ai](https://openclaw.ai/)

• Flask: [https://flask.palletsprojects.com/en/stable](https://flask.palletsprojects.com/en/stable)

• The creator of Clawd: “I ship code that I don’t read”: [https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code](https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code)

• Amiga 500: [https://en.wikipedia.org/wiki/Amiga\_500](https://en.wikipedia.org/wiki/Amiga_500)

• i486: [https://timeline.intel.com/1989/meet-the-i486](https://timeline.intel.com/1989/meet-the-i486)

• Peter Steinberger on X: [https://x.com/steipete](https://x.com/steipete)

• Sentry: [https://sentry.io](https://sentry.io/)

• Nat Friedman on X: [https://x.com/natfriedman](https://x.com/natfriedman)

• Chroma: [https://www.trychroma.com](https://www.trychroma.com/)

• Siemens: [https://www.siemens.com](https://www.siemens.com/)

• Y Combinator: [https://www.ycombinator.com](https://www.ycombinator.com/)

• The Final Bottleneck: [https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck](https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck)

• Children’s Learning With Tablet Technology is Often Too Passive: [https://news.utexas.edu/2017/08/22/childrens-learning-with-tablet-technology-is-often-passive](https://news.utexas.edu/2017/08/22/childrens-learning-with-tablet-technology-is-often-passive)

• Amp: [https://ampcode.com](https://ampcode.com/)

• OpenCode: [https://opencode.ai](https://opencode.ai/)

• Agent Design Is Still Hard: [https://lucumr.pocoo.org/2025/11/21/agents-are-hard](https://lucumr.pocoo.org/2025/11/21/agents-are-hard)

• How Linux is built with Greg Kroah-Hartman: [https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah](https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah)

• Mario’s post on X about complexity:

[

![X avatar for @badlogicgames](https://substackcdn.com/image/fetch/$s_!lPG2!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1553485821767991296%2F87k3l720.jpg)

Mario Zechner@badlogicgames

your biggest enemy is still complexity. it's also your agent's biggest enemy. but it has no holistic view of your code base, so it keeps adding complexity. and you think that's how it's supposed to be, because the clanker shat it out, and you don't know the stack. glhf!

10:02 PM · Mar 9, 2026 · 47.4K Views

25 Replies · 35 Reposts · 406 Likes





](https://x.com/badlogicgames/status/2031128616545747414)

• VibeTunnel: [https://vibetunnel.sh](https://vibetunnel.sh/)

• Thoughts on slowing the F down: [https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down](https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down)

• StackOverflow: [https://stackoverflow.com](https://stackoverflow.com/)

• David Cramer on LinkedIn: [https://www.linkedin.com/in/dmcramer](https://www.linkedin.com/in/dmcramer)

• Stainless: [https://www.stainless.com](https://www.stainless.com/)

—

Production and marketing by [Pen Name](https://penname.co/).