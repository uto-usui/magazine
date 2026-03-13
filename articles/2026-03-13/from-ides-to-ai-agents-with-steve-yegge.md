---
title: "From IDEs to AI Agents with Steve Yegge"
source: "https://newsletter.pragmaticengineer.com/p/from-ides-to-ai-agents-with-steve"
publishedDate: "2026-03-11"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/aFsAOu2bgFk), [Spotify](https://open.spotify.com/episode/6rSG9IY6qnMFX0wdUD1R6c), and [Apple](https://podcasts.apple.com/us/podcast/from-ides-to-ai-agents-with-steve-yegge/id1769051199?i=1000754686528).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!Gh57!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

](https://substackcdn.com/image/fetch/$s_!Gh57!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

• **[Statsig](http://statsig.com/pragmatic)** – ⁠ The unified platform for flags, analytics, experiments, and more. Stop switching between different tools, and have them all in one place. [Check out Statsig](http://statsig.com/pragmatic)

• **[Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** – The makers of SonarQube, the industry standard for automated code review. Sonar helps reduce outages, improve security, and lower risks associated with AI and agentic coding. [See how Sonar](https://www.sonarsource.com/pragmatic/) is empowering the Agent Centric Development Cycle with new products and capabilities that strengthen the guide, verify, and solve phases of development.

• **[WorkOS](https://workos.com/)** – Everything you need to make your app enterprise ready. Skip the rebuild for enterprise features. Keep shipping. Visit [WorkOS.com](http://workos.com/).

_Before we start: we recorded this episode with Steve, in Utah, early February, when both of us attended Marin Fowler’s [The Future of Software Development workshop](https://newsletter.pragmaticengineer.com/p/the-future-of-software-engineering-with-ai). Unfortunately, the audio recording for the episode turned out to be of poor quality, so I published a write-up of this conversation one month ago, as a deepdive: [Steve Yegge on AI Agents and the Future of Software Engineering](https://newsletter.pragmaticengineer.com/p/steve-yegge-on-ai-agents-and-the)._

_The article captured the essence of what Steve shared, but it felt like a shame not to be able to share the conversation, and just how animated and excited Steve got when talking about the software engineering craft. Thanks to the help of software engineer [Tatsuhiko Miyagawa](https://x.com/miyagawa) and audio post-production software [Auphonic](https://auphonic.com/), we managed to fix all audio issues, and you can enjoy the full episode, including parts that the deepdive omitted._

[Steve Yegge](https://steve-yegge.blogspot.com/) has spent decades writing software and thinking about how the craft evolves. From his early years at Amazon and Google, to his influential blog posts, he has often been early at spotting shifts in how software gets built.

In this episode of _Pragmatic Engineer_, I talk with Steve about how AI is changing engineering work, why he believes coding by hand may gradually disappear, and what developers should focus on, instead. We discuss his latest book, _[Vibe Coding](https://itrevolution.com/product/vibe-coding-book/),_ and the open-source AI agent orchestrator he built called [Gas Town,](https://github.com/steveyegge/gastown) which he said most devs should _avoid_ using.

Steve shares his framework for levels of AI adoption by engineers, ranging from avoiding AI tools entirely, to running multiple agents in parallel. We discuss why he believes the knowledge that engineers need to know keeps changing, and why understanding how systems evolve may matter more than mastering any particular tool.

We also explore broader implications. Steve argues that AI’s role is not primarily to replace engineers, but to amplify them. At the same time, he warns that the pace of change will create new kinds of technical debt, new productivity pressures, and fresh challenges for how teams operate.

My 9 observations from this episode:

**1\. A prototype-as-product model is replacing the build-then-dump cycle.** At Anthropic, Steve says teams create many prototypes rapidly and just ship the best one. Claude Cowork reportedly went from prototype to launch in just 10 days. Meanwhile, “slot machine programming” – building 20 implementations and picking the winner – is becoming normal practice for teams.

**2\. The IDE could be evolving into a conversation and monitoring interface, not a code editor.** Steve sees tools like Claude Cowork as the return of the IDE, focused on managing agent workflows above coding by hand. He predicts these new IDEs will focus on conversations with AI agents and monitoring them. _Side note: I’m not sure I foresee conversational tools appearing just yet, or IDEs turning into such tools – but we do see tools like Claude Code being wildly popular among devs, as per [our latest AI tooling survey.](https://newsletter.pragmaticengineer.com/p/ai-tooling-2026)_

**3\. Reading ability is becoming a blocker for wider AI adoption.** Some struggle with walls of text that current AI tools produce, and Steve predicts that in the very near future, most people will program by talking to a visual avatar, not reading terminal output because he observes that five paragraphs is already a lot to read for many devs.

**4\. AI coding has a spectrum, and most engineers trend near the bottom.** Steve describes eight levels, from “no AI” to “multi-agent orchestration,” with most engineers currently at levels 1–2: asking an IDE for suggestions and carefully reviewing output. He suspects such engineers will be left behind.

**5\. Monolithic codebases are a big blocker to AI adoption in enterprises.** AI agents have a ceiling of between roughly half a million to a few million lines of code which they can work with, effectively. If your codebase is a monolith that won’t fit in a context window, AI agents won’t work well with it.

**6\. What software engineers need to know keeps changing.** In the 1990s, any decent software engineer knew Assembly, and today almost no decent developer knows it because Assembly has long been superseded by technical progress. What engineers “need” to know these days is different from the ‘90s and that process continues with AI, changing the parts of the craft that are essential for devs. We grumble about this but that won’t change anything by itself.

**7\. SaaS companies that don’t offer platforms and APIs will be out-competed.** Steve uses Zendesk as an example: if your product doesn’t expose APIs, then AI-native companies will just build bespoke replacements. “If Zendesk doesn’t make themselves a platform, then they’ll put themselves out of existence.”

**8\. There’s a “Dracula Effect” where AI-augmented work drains engineers faster than traditional work** because AI automates the easy tasks, meaning that engineers are stuck doing high-intensity thinking all day. Steve says you may only get three daily productive hours at max speed, but during that time, you could produce 100x more output than before.

**9\. Even if AI progress stalls, it’s worthwhile getting proficient at working with parallel agents.** Steve argues that since there’s a model as capable as Opus 4.5 is, we don’t need smarter models but better orchestration layers. The worst outcome for someone who invests in learning AI tools is that they gain a skill set that stays useful, whether the models improve or not!

• [Steve Yegge on AI agents and the future of software engineering](https://newsletter.pragmaticengineer.com/p/steve-yegge-on-ai-agents-and-the)

• [Vibe coding as a software engineer](https://newsletter.pragmaticengineer.com/p/vibe-coding-as-a-software-engineer)

• [The full circle of developer productivity with Steve Yegge](https://newsletter.pragmaticengineer.com/p/steve-yegge)

• [AI Tooling for Software Engineers in 2026](https://newsletter.pragmaticengineer.com/p/ai-tooling-2026)

• [The AI Engineering Stack](https://newsletter.pragmaticengineer.com/p/the-ai-engineering-stack)

([00:00](https://www.youtube.com/watch?v=aFsAOu2bgFk)) Intro

([01:43](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=103s)) Steve’s latest projects

([02:27](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=147s)) Important blog posts

([04:48](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=288s)) Shifts in what engineers need to know

([10:46](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=646s)) Steve’s current AI stance

([13:23](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=803s)) Steve’s book Vibe Coding

([18:25](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=1105s)) Layoffs and disruption in tech

([31:13](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=1873s)) Gas Town

([40:10](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=2410s)) New ways of working

([51:08](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=3068s)) The problem of too many people

([54:45](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=3285s)) Why AI results lag in business

([59:57](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=3597s)) Gamification and product stickiness

([1:04:54](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=3894s)) The ‘Bitter Lesson’ explained

([1:07:14](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=4034s)) The future of software development

([1:23:06](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=4986s)) Where languages stand

([1:24:47](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=5087s)) Adapting to change

([1:27:32](https://www.youtube.com/watch?v=aFsAOu2bgFk&t=5252s)) Steve’s predictions

**Where to find Steve Yegge:**

• X: [https://x.com/steve\_yegge](https://x.com/steve_yegge)

• LinkedIn: [https://www.linkedin.com/in/steveyegge](https://www.linkedin.com/in/steveyegge)

• Website: [https://steve-yegge.blogspot.com/](https://steve-yegge.blogspot.com/)

• _Vibe Coding_: [https://itrevolution.com/product/vibe-coding-book](https://itrevolution.com/product/vibe-coding-book/)

**Mentions during the episode:**

• Steve Yegge on AI Agents and the Future of Software Engineering: [https://newsletter.pragmaticengineer.com/p/steve-yegge-on-ai-agents-and-the](https://newsletter.pragmaticengineer.com/p/steve-yegge-on-ai-agents-and-the)

• Amazon, Google and Vibe Coding with Steve Yegge: [https://newsletter.pragmaticengineer.com/p/amazon-google-and-vibe-coding-with](https://newsletter.pragmaticengineer.com/p/amazon-google-and-vibe-coding-with)

• Gas Town: [https://github.com/steveyegge/gastown](https://github.com/steveyegge/gastown)

• Execution in the Kingdom of Nouns: [https://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html](https://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html)

• Rich programmer food: [https://steve-yegge.blogspot.com/2007/06/rich-programmer-food.html](https://steve-yegge.blogspot.com/2007/06/rich-programmer-food.html)

• Wyvern on Steam: [https://store.steampowered.com/app/1541710/Wyvern](https://store.steampowered.com/app/1541710/Wyvern)

• Claude Code: [https://claude.com/product/claude-code](https://claude.com/product/claude-code)

• The death of the junior developer: [https://sourcegraph.com/blog/the-death-of-the-junior-developer](https://sourcegraph.com/blog/the-death-of-the-junior-developer)

• Erik Meijer on X: [https://x.com/headinthebox](https://x.com/headinthebox)

• Andy Jassy: [https://en.wikipedia.org/wiki/Andy\_Jassy](https://en.wikipedia.org/wiki/Andy_Jassy)

• The Death of the IDE? w/ Steve Yegge & Nathan Sobo:

• Nathan Sobo on LinkedIn: [https://www.linkedin.com/in/nathan-sobo-92b46720](https://www.linkedin.com/in/nathan-sobo-92b46720)

• Claude Cowork: [https://claude.com/product/cowork](https://claude.com/product/cowork)

• Craft Agents: [https://agents.craft.do](https://agents.craft.do/)

• Git Gui: [https://git-scm.com/tools/guis](https://git-scm.com/tools/guis)

• Fantasia: [https://en.wikipedia.org/wiki/Fantasia\_(1940\_film)](https://en.wikipedia.org/wiki/Fantasia_\(1940_film\))

• Welcome to Gas Town: [https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)

• Dolt: [https://www.dolthub.com](https://www.dolthub.com/)

• The Bitter Lesson: [http://www.incompleteideas.net/IncIdeas/BitterLesson.html](http://www.incompleteideas.net/IncIdeas/BitterLesson.html)

• Moltbook: [https://www.moltbook.com](https://www.moltbook.com/)

• The ‘9-9-6 Work Schedule’ Could Be Coming To Your Workplace Soon: [https://www.forbes.com/sites/bryanrobinson/2025/08/04/the-9-9-6-work-schedule-could-be-coming-to-your-workplace-soon](https://www.forbes.com/sites/bryanrobinson/2025/08/04/the-9-9-6-work-schedule-could-be-coming-to-your-workplace-soon)

• Perl: [https://www.perl.org](https://www.perl.org/)

• PHP: [https://www.php.net](https://www.php.net/)

• Anthropic: [https://www.anthropic.com](https://www.anthropic.com/)

• _Purely Functional Data Structures_: [https://www.amazon.com/Purely-Functional-Data-Structures-Okasaki/dp/0521663504](https://www.amazon.com/Purely-Functional-Data-Structures-Okasaki/dp/0521663504)

• Building Claude Code with Boris Cherny: [https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)

• Gemini: [https://gemini.google.com](https://gemini.google.com/)

• The Borderlands Gun Collector’s Club: [https://steve-yegge.blogspot.com/2012/03/borderlands-gun-collectors-club.html](https://steve-yegge.blogspot.com/2012/03/borderlands-gun-collectors-club.html)

• Ralph Wiggum as a “software engineer”: [https://ghuntley.com/ralph](https://ghuntley.com/ralph)

—

Production and marketing by [Pen Name](https://penname.co/).