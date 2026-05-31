---
title: "Building OpenCode with Dax Raad"
source: "https://newsletter.pragmaticengineer.com/p/opencode"
publishedDate: "2026-05-27"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/1VqKUrxR2C8), [Spotify](https://open.spotify.com/episode/10InvdH4AqOfZGCMTyzqiM), and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1769051199).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!YCsL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39bdfbb4-fb73-41d8-83cb-0ca4832aed49_1280x80.png)

](https://substackcdn.com/image/fetch/$s_!YCsL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39bdfbb4-fb73-41d8-83cb-0ca4832aed49_1280x80.png)

• **[Antithesis](https://antithesis.com/pragmatic)** – if you’re using agentic workflows, you need to be extremely clear about what you’re building and how your system should behave. Antithesis brings specification and verification together, making your agents faster, smarter, and safer. And when you’re using Antithesis, you’ll have greater clarity about your code as well. [Learn more](http://antithesis.com/pragmatic).

•**[WorkOS](https://workos.com/)** – The fastest AI-native teams have to slow down for the hard problems — WorkOS makes sure auth, for your app and your agents, is never one of them.

• **[turbopuffer](https://turbopuffer.com/pragmatic)** – a search engine that companies like Cursor, Notion, and Linear use to index and retrieve every byte of context for their AI agents. It’s ridiculously scalable, built on object storage, with smart caching on NVMe SSDs so it’s very fast. It also offers many different search indexes and tools: [check it out.](https://turbopuffer.com/pragmatic)

OpenCode is one of the fastest-growing AI developer tools around, surging in just a few months from roughly 650,000 monthly active users to nearly 8 million, and almost 1M daily active users.

In this episode of The Pragmatic Engineer Podcast, we meet Dax Raad, co-founder of OpenCode, for a discussion about the gaps in developer tooling that led him to build OpenCode, the advantages of open source, and why taste and engineering judgment matter even more as AI becomes a core part of software development.

We also cover how OpenCode turned Anthropic’s blocking of integration with Claude Code into a massive growth lever by partnering with OpenAI and other model providers, why GPU demand is becoming a bottleneck everywhere, how come AI coding tools don’t automatically mean engineering teams move faster, and also why Dax is personally skeptical about predictions for the future of engineering and work, in general.

I found this conversation especially interesting because Dax displays a healthy skepticism toward the benefits of AI, even while building one of the most popular AI coding harnesses.

Here are 14 of my most interesting takeaways from talking with Dax:

**1\. AI makes coding easier, but the hard parts of the job don’t vanish.** Dax remarks that a lot of the job has become objectively easier with AI, but then follows up with a simple question: why does it feel like he is still having to think as hard as he ever did?

**2\. Thinking upfront beats building prototypes and seeing what sticks.** This is especially true in the period before a product-market fit is found, Dax says. AI doesn’t help much in this early phase because the problem is figuring out _what_ to build, not how fast you can build it, he says. Therefore, thinking hard about the right direction for development beats taking unfocused swings at different ideas.

**3\. Shipping 10x more features is a recipe for a Frankenstein-like product**. It’s tempting to one-to-one prompt an agent for every user’s complaint or competitor’s feature. But the more features are jammed into a product, the worse it tends to become. Also, don’t forget that every shipped feature will need to be supported for as long as it’s part of the product!

**4\. No AI-native coding agent company is “winning” by being better with AI.** Dax says that none of OpenCode’s competitors are crushing them, and that nobody is using AI so well that others cannot compete.

**5\. For OpenCode, product positioning beats speed of execution.** A massive reason for OpenCode becoming the most popular open source AI coding harness is that they noticed no coding agent had successfully claimed the open source category. Dax was wondering why not, given that every market-leading dev tool across the industry is open source. So, he and the team focused on positioning and it paid off handsomely. He summarizes: “Get positioning right and the world just keeps handing you wins you didn’t expect.”

**6\. OpenCode’s “inverted” strategy: start with a good-enough product, then optimize.** Dax admits their harness wasn’t ideal during OpenCode’s first five months, but it was still good enough. “Once we won enough market share, we went back and tried to make our harness good and smart.”

**7\. Most software engineers profit from AI as time gained, not increased output — unless you change incentives!** Dax says the natural way for software engineers to “cash out” their AI tooling gains is with time savings, by doing the same work as before, but faster. Until compensation and motivation structures change, most teams should expect output to stay flat while engineers go home earlier. There’s nothing wrong with this, but AI vendors sell a different outcome to CFOs: increased output.

**8\. Motivated engineers who care about quality get buried by slop PRs from devs who don’t care.** Dax has hired people from companies where they were one of the few who still cared about quality. In contrast, former colleagues just pumped out AI-generated code and focused on getting their tasks done, ignorant of the decreasing quality of code. Motivated devs feel they are drowning in garbage code and tech debt, and getting burnt out by trying to clean it up. Dax calls this an engineering leadership problem that most companies don’t notice.

**9\. AI code generation mutes the “guilt” of doing the wrong thing, but this builds up tech debt.** Pre-AI, writing a hack felt bad, the second time it felt _really bad,_ and by the third time you’d often just refactor in order to fix up the code. Now, the agent hides the hack, which skews devs’ judgment and results in less tech debt being cleaned up.

**10\. Dealing with tech debt is easier than ever, and teams should do more of it**. Agents make refactoring across a codebase cheap: for example, ask an agent to implement a new pattern everywhere across the codebase. It’s very easy and cheap to clear up tech debt, today. So, do more of it!

**11\. AI has not really changed the thinking / doing ratio for Dax.** “Pre-AI, I would spend 95% of my energy thinking about what to do and 5% on doing it. Now I spend 96% of my time thinking, and 4% on actually doing it. So, it’s like a 20% improvement \[from 5% doing to 4% doing\], but day to day, it feels as hard as ever.”

**12\. Confident predictions about AI are often forms of self-reassurance.** A post went viral on X claiming that 24-29 year-old engineers will dominate in the future, which was written by – you can guess – someone in that exact age bracket. Dax says he sees this pattern a lot and frames such posts in terms of the author making themself feel better: “Someone like me has all the advantages. Someone unlike me has all the disadvantages”. Dax says he’s uninterested in predictions and just focuses on the next task, and the next day.

**13\. Old “enterprise” patterns are coming back in fashion for writing quality software, as agents are the new junior engineers**. Dax says that things like domain-driven design and verbose design patterns went out of style over the past two decades because they’re tedious to type out. But they are actually very useful when there are junior devs on the team – or when there are agents that need strong guardrails. Dax is already using more such “old school” patterns.

**14\. The future-proof tech career: solid software engineering + deep industry expertise.** Dax reckons engineers undervalue how easily they can become industry insiders compared to people who only focus on engineering, but never become an expert in one business area, as they go.

-   [How Claude Code is built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)
    
-   [How Codex is built](https://newsletter.pragmaticengineer.com/p/how-codex-is-built)
    
-   [Real-world engineering challenges: building Cursor](https://newsletter.pragmaticengineer.com/p/cursor)
    
-   [The AI Engineering stack](https://newsletter.pragmaticengineer.com/p/the-ai-engineering-stack)
    
-   [How Uber uses AI for development: inside look](https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development)
    

[00:00](https://www.youtube.com/watch?v=1VqKUrxR2C8) Intro

[07:03](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=423s) Dax’s path into tech

[09:04](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=544s) Early startup experience

[13:16](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=796s) Getting involved with open source

[16:13](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=973s) OpenCode

[23:17](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1397s) Anthropic banning OpenCode

[30:34](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1834s) From terminal to GUI

[32:34](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1954s) OpenCode’s business model

[36:33](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2193s) Why inference is profitable

[39:11](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2351s) GPU bottlenecks

[40:54](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2454s) AI hype

[45:50](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2750s) AI spending

[48:47](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2927s) Dax’s memo

[55:41](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3341s) Dax’s skepticism of predictions

[58:58](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3538s) Engineering culture at OpenCode

[1:02:38](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3758s) How building works at OpenCode

[1:05:36](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=3936s) Taste and quality

[1:11:32](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=4292s) Dax’s work setup

[1:12:35](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=4355s) The role of engineers and EMs

[1:15:50](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=4550s) Advice for engineers

[1:18:12](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=4692s) Book recommendation

**Where to find Dax Raad:**

• X: [https://x.com/thdxr](https://x.com/thdxr)

• Website: [https://thdxr.com](https://thdxr.com/)

**Mentions during the episode:**

• OpenCode: [https://opencode.ai](https://opencode.ai/)

• Minecraft: [https://www.minecraft.net](https://www.minecraft.net/)

• IRC: [https://en.wikipedia.org/wiki/IRC](https://en.wikipedia.org/wiki/IRC)

• Ride Health: [https://www.ridehealth.com](https://www.ridehealth.com/)

• Serverless Stack: [https://sst.dev](https://sst.dev/)

• OpenNext: [https://opennext.js.org](https://opennext.js.org/)

• Vercel: [https://vercel.com](https://vercel.com/)

• Red Hat: [https://www.redhat.com](https://www.redhat.com/)

• Ubuntu: [https://ubuntu.com](https://ubuntu.com/)

• Canonical: [https://canonical.com](https://canonical.com/)

• OpenCode Zen: [https://opencode.ai/zen](https://opencode.ai/zen)

• Dax on X “inference is very profitable”:

[

![X avatar for @thdxr](https://substackcdn.com/image/fetch/$s_!Aw98!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1602333093485891584%2FmmVqjFNI.jpg)

dax@thdxr

inference is very profitable and probably a good opportunity to understand some basic business math 1. companies buy long lived assets like GPUs. these are one time costs and the asset depreciates over time 2. once you own this asset, you can plug it in and produce tokens which

![X avatar for @thdxr](https://substackcdn.com/image/fetch/$s_!Aw98!,w_20,h_20,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1602333093485891584%2FmmVqjFNI.jpg)

dax @thdxr

@d4m1n i'm a bit confused why so many people say api tokens are sold at a loss this isn't true - these models are incredibly expensive compared to the gpu time cost there's potential for 90% margin depending on the model

4:23 PM · Apr 9, 2026 · 151K Views

65 Replies · 69 Reposts · 1.4K Likes





](https://x.com/thdxr/status/2042277156940587469)

• The history of servers, the cloud, and what’s next – with Oxide: [https://newsletter.pragmaticengineer.com/p/the-history-of-servers-the-cloud](https://newsletter.pragmaticengineer.com/p/the-history-of-servers-the-cloud)

• Dax on X “everyone’s talking about their teams like they were at the peak of efficiency”:

[

![X avatar for @thdxr](https://substackcdn.com/image/fetch/$s_!Aw98!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1602333093485891584%2FmmVqjFNI.jpg)

dax@thdxr

everyone's talking about their teams like they were at the peak of efficiency and bottlenecked by ability to produce code here's what things actually look like - your org rarely has good ideas. ideas being expensive to implement was actually helping - majority of workers have

7:32 AM · Feb 14, 2026 · 1.02M Views

288 Replies · 1K Reposts · 10.8K Likes





](https://x.com/thdxr/status/2022574719694758147)

• From IDEs to AI Agents with Steve Yegge: [https://newsletter.pragmaticengineer.com/p/from-ides-to-ai-agents-with-steve](https://newsletter.pragmaticengineer.com/p/from-ides-to-ai-agents-with-steve)

• Stripe: [https://stripe.com](https://stripe.com/)

• TDD, AI agents and coding with Kent Beck: [https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)

• How AI will change software engineering – with Martin Fowler: [https://newsletter.pragmaticengineer.com/p/martin-fowler](https://newsletter.pragmaticengineer.com/p/martin-fowler)

• The third golden age of software engineering – thanks to AI, with Grady Booch: [https://newsletter.pragmaticengineer.com/p/the-third-golden-age-of-software](https://newsletter.pragmaticengineer.com/p/the-third-golden-age-of-software)

• Mitchell Hashimoto’s new way of writing code: [https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto](https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto)

• Arch Linux: [https://archlinux.org](https://archlinux.org/)

• tmux: [https://github.com/tmux/tmux/wiki](https://github.com/tmux/tmux/wiki)

• Neovim: [https://neovim.io](https://neovim.io/)

• _Skin in the Game: Hidden Asymmetries in Daily Life (Incerto)_: [https://www.amazon.com/Skin-Game-Hidden-Asymmetries-Daily/dp/042528462X](https://www.amazon.com/Skin-Game-Hidden-Asymmetries-Daily/dp/042528462X)

• _The Black Swan: The Impact of the Highly Improbable, second editio_n: [https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X](https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X)

—

Production and marketing by [Pen Name](https://penname.co/).