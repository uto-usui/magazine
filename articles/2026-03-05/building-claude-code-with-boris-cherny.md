---
title: "Building Claude Code with Boris Cherny"
source: "https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny"
publishedDate: "2026-03-04"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/julbw1JuAz0), [Spotify](https://open.spotify.com/show/2Bho9xCbOQMWMJ7UKmqCzD), and [Apple](https://podcasts.apple.com/us/podcast/building-claude-code-with-boris-cherny/id1769051199?i=1000753093675).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!Gh57!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

](https://substackcdn.com/image/fetch/$s_!Gh57!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

• **[Statsig](http://statsig.com/pragmatic)** — ⁠ The unified platform for flags, analytics, experiments, and more. Stop switching between different tools, and have them all in one place. [Check out Statsig.](http://statsig.com/pragmatic)

• **[Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** – The makers of SonarQube, the industry standard for automated code review. Proactively find and fix issues in real-time with **[SonarQube MCP Server](https://www.sonarsource.com/products/sonarqube/mcp-server/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-mcp-server-launch25&utm_content=podcast-sonarqube-mcp-server&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** by connecting AI tools like Claude Code, GitHub Copilot, and Cursor directly to Sonar’s systematic code analysis engine. [Learn how Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer) provides the essential verification layer for the AI development era.

• **[WorkOS](https://workos.com/)** – Everything you need to make your app enterprise ready. Companies like Anthropic, OpenAI, and Cursor already run on WorkOS. [See why.](https://workos.com/)

Boris Cherny is the creator and Head of Claude Code at Anthropic. He previously spent five years at Meta as a Principal Engineer and is the author of the book _[Programming TypeScript](https://www.amazon.com/Programming-TypeScript-Making-JavaScript-Applications/dp/1492037656)._

In this episode of _Pragmatic Engineer_, we went through how Claude Code was built and what it means when engineers no longer write most of the code themselves.

We discuss how Claude Code evolved from a side project into a core internal tool at Anthropic and how Boris uses it day-to-day. We go deep into workflow details, including parallel agents, PR structure, deterministic review patterns, and how the system retrieves context from large codebases. We also get into how Claude Cowork was built.

As coding becomes more accessible, the role of engineers shifts rather than shrinks. We examine what that shift means in practice, which skills become more important, and why the lines between product, engineering, and design are blurring.

Here are 10 observations from this conversation that I found the most interesting:

**1\. Boris ships 20-30 PRs a day by running 5 parallel Claude instances.** Boris works across five terminal tabs (each a separate checkout), starting Claude in plan mode, iterating on the plan, then letting it one-shot the implementation. As he put it: “once there is a good plan, it will one-shot the implementation almost every time.”

**2\. Boris learned at Meta that code quality has a measurable, double-digit-percent impact on engineering productivity.** At Meta, Boris led causal analysis showing clean codebases meaningfully boost output. This learning holds for AI-generated code, too: partially-migrated codebases with multiple frameworks confuse both humans and models. As Boris put it: “always make sure that when you start a migration, you finish the migration.”

**3\. Claude Code’s “agentic search” is really just glob and grep — and it outperformed RAG.** The team tried several approaches to make agentic search better: local vector databases, recursive model-based indexing, and other fancy approaches. All had downsides (stale indexes, permission complexity). Plain glob and grep, driven by the model, beat everything. This approach was inspired by how Boris observed engineers at Instagram searched code when the click-to-definition functionality in Meta’s in-house coding editor was broken.

**4\. Boris automated himself out of code review well before AI.** Boris was one of the most prolific code reviewers at Meta company. And he worked hard to minimize time spent on code review. His system: every time he left the same kind of review comment, he logged it in a spreadsheet. Once a pattern hit 3-4 occurrences, he’d write a lint rule to automate it away!

**5\. Everyone at Anthropic has the same title — “Member of Technical Staff” — and it’s by design.** Without role-specific titles, the default assumption is that everyone does everything: product, design, infrastructure, research. As Boris put it: “It kind of inverts this relationship between people, even if you don’t know each other well yet.”

**6\. Claude Cowork was built in ~10 days — and it’s growing faster than Claude Code did at launch.** The team spotted “latent demand” from non-engineers already hacking with Claude Code (data scientists, finance, sales). The bulk of the engineering complexity for Cowork wasn’t product logic, but around safety: building classifiers, a shipping VM, OS-level protections against accidental file deletion, and rethinking the permission model for non-technical users.

**7\. PRDs are dead on the Claude Code team — prototypes replaced them.** Instead of writing Product Requirement Documents (specs), they build hundreds of working prototypes before shipping a feature. Boris: “There’s just no way we could have shipped this if we started with static mocks and Figma or if we started with a PRD.”

**8\. This is the year of the generalist (and maybe the year of those with ADHD)**. Boris’s work has shifted from deep-focus single-threaded coding to managing multiple parallel agents and context-switching rapidly. As Boris put it: “It’s not so much about deep work, it’s about how good I am at context switching and jumping across multiple different contexts very quickly.”

**9\. Fix infra before building a product.** Working at Meta, when Boris moved to Instagram, the Python/Django stack was so poor that click-to-definition didn’t work and the type checker was broken. He abandoned his original team, and went straight to Dev Infra, leading migrations from Python to the Facebook monolith and from REST to GraphQL. He did this because you can’t build great products on a terrible foundation, and sometimes the highest-leverage move is fixing the platform rather than shipping features.

**10\. Could software engineers of today be the medieval equivalents of scribes?** Boris brought up an interesting analogy: in the middle ages, scribes were a tiny literate elite employed by often-illiterate kings. When the printing press was invented, scribes technically lost their jobs. Still, many of them became writers and authors, and the market for written work expanded beyond prediction!

Boris wondered if we could see the same pattern with software engineers: coding is becoming accessible to everyone. Could the software engineers of today be building systems that have far broader reach, in the future, than ever than before?

-   [How Claude Code is built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)
    
-   [How Anthropic built Artifacts](https://newsletter.pragmaticengineer.com/p/how-anthropic-built-artifacts)
    
-   [How Codex is built](https://newsletter.pragmaticengineer.com/p/how-codex-is-built)
    
-   [Real-world engineering challenges: building Cursor](https://newsletter.pragmaticengineer.com/p/cursor)
    

([00:00](https://www.youtube.com/watch?v=julbw1JuAz0)) Intro

([11:15](https://www.youtube.com/watch?v=julbw1JuAz0&t=675s)) Lessons from Meta

([19:46](https://www.youtube.com/watch?v=julbw1JuAz0&t=1186s)) Joining Anthropic

([23:08](https://www.youtube.com/watch?v=julbw1JuAz0&t=1388s)) The origins of Claude Code

([32:55](https://www.youtube.com/watch?v=julbw1JuAz0&t=1975s)) Boris’s Claude Code workflow

([36:27](https://www.youtube.com/watch?v=julbw1JuAz0&t=2187s)) Parallel agents

([40:25](https://www.youtube.com/watch?v=julbw1JuAz0&t=2425s)) Code reviews

([47:18](https://www.youtube.com/watch?v=julbw1JuAz0&t=2838s)) Claude Code’s architecture

([52:38](https://www.youtube.com/watch?v=julbw1JuAz0&t=3158s)) Permissions and sandboxing

([55:05](https://www.youtube.com/watch?v=julbw1JuAz0&t=3305s)) Engineering culture at Anthropic

([1:05:15](https://www.youtube.com/watch?v=julbw1JuAz0&t=3915s)) Claude Cowork

([1:12:48](https://www.youtube.com/watch?v=julbw1JuAz0&t=4368s)) Observability and privacy

([1:14:45](https://www.youtube.com/watch?v=julbw1JuAz0&t=4485s)) Agent swarms

([1:21:16](https://www.youtube.com/watch?v=julbw1JuAz0&t=4876s)) LLMs and the printing press analogy

([1:30:16](https://www.youtube.com/watch?v=julbw1JuAz0&t=5416s)) Standout engineer archetypes

([1:32:12](https://www.youtube.com/watch?v=julbw1JuAz0&t=5532s)) What skills still matter for engineers

([1:35:24](https://www.youtube.com/watch?v=julbw1JuAz0&t=5724s)) Book recommendations

**Where to find Boris Cherny:**

• X: [https://x.com/bcherny](https://x.com/bcherny)

• LinkedIn: [https://www.linkedin.com/in/bcherny](https://www.linkedin.com/in/bcherny)

• Website: [https://borischerny.com](https://borischerny.com/)

**Mentions during the episode:**

• Jarred Sumner on LinkedIn: [https://www.linkedin.com/in/jarred-sumner-a8772425](https://www.linkedin.com/in/jarred-sumner-a8772425)

• Vladimir Kolesnikov on LinkedIn: [https://www.linkedin.com/in/voloko](https://www.linkedin.com/in/voloko)

• React: [https://react.dev](https://react.dev/)

• Will Bailey on LinkedIn: [https://www.linkedin.com/in/willbailey](https://www.linkedin.com/in/willbailey)

• Fiona Fung on LinkedIn: [https://www.linkedin.com/in/fionafung](https://www.linkedin.com/in/fionafung)

• Inside Meta’s Engineering Culture: Part 1: [https://newsletter.pragmaticengineer.com/p/facebook](https://newsletter.pragmaticengineer.com/p/facebook)

• Inside Meta’s Engineering Culture: Part 2: [https://newsletter.pragmaticengineer.com/p/facebook-2](https://newsletter.pragmaticengineer.com/p/facebook-2)

• Adam Wolff on LinkedIn: [https://www.linkedin.com/in/adamwolff](https://www.linkedin.com/in/adamwolff)

• The Bitter Lesson: [http://www.incompleteideas.net/IncIdeas/BitterLesson.html](http://www.incompleteideas.net/IncIdeas/BitterLesson.html)

• How Claude Code is built: [https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)

• Mike Krieger on X: [https://x.com/mikeyk](https://x.com/mikeyk)

• Dario Amodei on X: [https://x.com/DarioAmodei](https://x.com/DarioAmodei)

• Ben Mann on LinkedIn: [https://www.linkedin.com/in/benjamin-mann/](https://www.linkedin.com/in/benjamin-mann/)

• Marc Andreessen: The real AI boom hasn’t even started yet:

• Cat Wu on LinkedIn: [https://www.linkedin.com/in/cat-wu](https://www.linkedin.com/in/cat-wu)

• Asana: [https://asana.com](https://asana.com/)

• Claude Cowork: [https://claude.com/product/cowork](https://claude.com/product/cowork)

• Felix Rieseberg on LinkedIn: [https://www.linkedin.com/in/felixrieseberg](https://www.linkedin.com/in/felixrieseberg)

• Electron: [https://www.electronjs.org](https://www.electronjs.org/)

• Building a C compiler with a team of parallel Claudes: [https://www.anthropic.com/engineering/building-c-compiler](https://www.anthropic.com/engineering/building-c-compiler)

• Introducing Claude Opus 4.6: [https://www.anthropic.com/news/claude-opus-4-6](https://www.anthropic.com/news/claude-opus-4-6)

• Thariq Shihipar on LinkedIn: [https://www.linkedin.com/in/thariqshihipar](https://www.linkedin.com/in/thariqshihipar)

• _Programming TypeScript: Making Your JavaScript Applications Scale_: [https://www.amazon.com/Programming-TypeScript-Making-JavaScript-Applications/dp/1492037656](https://www.amazon.com/Programming-TypeScript-Making-JavaScript-Applications/dp/1492037656)

• A General Theory of Reactivity: [https://kriskowal.gitbooks.io/gtor/content/intro.html](https://kriskowal.gitbooks.io/gtor/content/intro.html)

• Ryan Dahl on X: [https://x.com/rough\_\_sea](https://x.com/rough__sea)

• Anders Hejlsberg on X: [https://x.com/ahejlsberg](https://x.com/ahejlsberg)

• _The Three-Body Problem_: [https://www.amazon.com/Three-Body-Problem-Cixin-Liu/dp/0765382032](https://www.amazon.com/Three-Body-Problem-Cixin-Liu/dp/0765382032)

• _Accelerando_: [https://www.amazon.com/Accelerando-Singularity-Charles-Stross/dp/0441014151](https://www.amazon.com/Accelerando-Singularity-Charles-Stross/dp/0441014151)

• _Functional Programming in Scala_: [https://www.amazon.com/Functional-Programming-Second-Michael-Pilquist-ebook/dp/B0C4LX999T](https://www.amazon.com/Functional-Programming-Second-Michael-Pilquist-ebook/dp/B0C4LX999T)

—

Production and marketing by [Pen Name](https://penname.co/).