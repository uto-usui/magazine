---
title: "The Pragmatic Engineer AMA"
source: "https://newsletter.pragmaticengineer.com/p/the-pragmatic-engineer-ama"
publishedDate: "2026-07-08"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/cSIMVYjVF28), [Spotify](https://open.spotify.com/episode/1fqJo4XYcs4vF5sEv7HIxI)**, **and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer-ama/id1769051199?i=1000775992941).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

Verify your system’s correctness by running your whole system in a hostile simulation and finding bugs. I’ve been using Antithesis myself, and I’m impressed with their innovation in building new kinds of debugging tools. Like this:

[

![](https://substackcdn.com/image/fetch/$s_!THaU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe3aa9c7-c1c1-449c-97af-f000307b5b8d_1988x1180.png)

](https://substackcdn.com/image/fetch/$s_!THaU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe3aa9c7-c1c1-449c-97af-f000307b5b8d_1988x1180.png)

_Bug probability analysis in Antithesis’ fully deterministic, simulated environment. When probability spikes, it’s a good place on the timeline to “rewind” and check logs to find what triggers bugs._

I show more examples of this neat UI [inside the episode, here](https://youtu.be/cSIMVYjVF28?si=jgzwdSRUGoGGElbG&t=2119). You can also [check out Antithesis.](https://antithesis.com/pragmatic)

In this special “ask me anything” episode of Pragmatic Engineer podcast, I am in the hot seat facing questions sent in by subscribers that are read out by guest Volodymyr Giginiak, CTO and cofounder of [Wordsmith AI](https://wordsmith.ai/), a legal tech startup _(note: I’m [an investor](https://blog.pragmaticengineer.com/investing/))_.

I tackle your questions on the software industry, AI, hiring, engineering organizations, career growth, the business model of the Pragmatic Engineer, and more. We also discuss where software engineering is headed, and I offer advice on some specific situations. _Thanks to everyone who sent questions!_

**Story #1: Without the COVID-19 pandemic, The Pragmatic Engineer might not exist.** Prior to the global health crisis in 2020, I had no plans to get serious about writing: I enjoyed blogging on The Pragmatic Engineer blog, but intended to remain an engineering manager or software engineer for the foreseeable future.

But then, COVID-19 happened and Uber made layoffs, which led to a quarter of my team being let go, while the rest of us were disbanded into other teams. It was a tough time, and I decided it was a good moment to exit and finish writing a book I had been working on, ‘The Software Engineer’s Guidebook’. After that project was complete, I planned to try and start a VC-funded startup and build something around platform engineering; possibly a system for tracking RFCs at mid-sized and larger companies.

I gave myself around eight months to finish the book, but when that deadline elapsed, it still wasn’t ready. I did write three other books (‘The Tech Resume Inside-Out’, ‘Building Mobile Apps at Scale’, and ‘Growing as a Mobile Engineer’) and still wasn’t convinced by any startup idea. But I did discover that I like to write!

**Story #2: I was on track to publish a damning exposé, until one message from an engineer changed my mind.**

During the first year of The Pragmatic Engineer, I wrote about conditions for engineers at the Dutch neobank Bunq, based on accounts from disgruntled employees. I had a final draft ready, which I sent to the company to provide a right of reply ahead of publication. Then I received a message.

It was sent by an engineer originally from the Middle East. They told me they had really wanted to break into the European tech industry, but that no company would sponsor their visa, except Bunq. Yes, the company was a tough place to work at as a dev – and this engineer subsequently left for another opportunity – but they appreciated Bunq for taking a chance on them that enabled them to move to Amsterdam and learn how to build fintech with a small team. This engineer now works at Meta and attributes their success to the break Bunq provided.

Based on that interaction, I opted not to publish the article, and it also led me to adopt a new editorial policy that I have followed since: I write about what _works_ inside companies, instead of focusing on what _seems_ to be broken.

**Story #3: Being called a “nobody” by a CEO led to my [sole investigative piece](https://blog.pragmaticengineer.com/pollen/), which uncovered some pretty interesting details.** After I briefly noted Pollen’s poorly-handled layoffs, CEO Callum-Negus Fancey dismissed my report during a company all-hands, and compared The Pragmatic Engineer unfavorably to the BBC as just some minor publication with an agenda against Pollen (why I would have an anti-Pollen bias isn’t clear to me!) To be honest, I took it personally when I heard a recording of this sent to me by employees there, and so started digging around.

I discovered unpaid salaries, silently cancelled health insurance in the US, and the CTO deliberately triggering a $3.2M double charge to customers and never publishing a postmortem, despite engineers requesting one.

It was certainly something, and I published the findings in the article [Inside Pollen’s Collapse: “$200M Raised” but Staff Unpaid - Exclusive](https://blog.pragmaticengineer.com/pollen/). To ensure the CEO saw the report on a platform he deemed worthy, I also contributed to the BBC’s documentary: [Crashed: $800M Festival Fail](https://www.bbcselect.com/watch/festival-fail/), aired in the UK during prime time. By doing all this, I also learned that investigative journalism is just not for me.

In a strange turn of events, someone at Pollen evidently [wants my original article to disappear from Google’s search results](https://blog.pragmaticengineer.com/pollen-tried-to-remove-my-article-about-callum-negus-fancey-and-google-is-assisting-to-it/), and filed bogus DMCA takedown notices a few weeks ago. Well, it’s [having the opposite effect!](https://blog.pragmaticengineer.com/pollen-tried-to-remove-my-article-about-callum-negus-fancey-and-google-is-assisting-to-it/)

**Opinion #1: I believe LeetCode-style interviews will stay because they self-select tolerance of corporate nonsense.** The existence of data structures and algorithm (DSA) interviews is a bit of a head scratcher because these skills are rarely used at work. However, a candidate who’s willing to grind for weeks or months to prepare for an interview which bears little resemblance to the job, is likely to be someone who understands that sometimes it’s necessary to do pointless work.

This suggests they’ll probably have a much better time in Big Tech than someone who refuses to engage with meaningless tasks. It’s one reason I’ve observed for companies retaining LeetCode-style interviews. Of course, AI solves the puzzles with ease these days, and I expect larger companies to move back to in-person interviewing – all while keeping DSA interview questions.

**Opinion #2: MCP became industry standard partly because Anthropic wasn’t a threat – but it couldn’t pull this off today.** When MCP [launched](https://newsletter.pragmaticengineer.com/p/mcp) in November 2024, Anthropic wasn’t yet considered _the_ leading AI lab. GPT-4o was seen as the top-performing multimodal model, followed by Claude 3.5 Sonnet and Gemini 1.5 Pro. At that point, Claude 3.5 Sonnet was seen as the best _coding_ model, but it wasn’t understood how advantageous being good at coding would be for AI in general.

Therefore, OpenAI, Google, Microsoft, and other players could adopt MCP without fear of lock-in, as it came from a promising, but not a dominant lab. When Google launched its [Agent2Agent protocol](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) a few months later, no major lab adopted it due to concerns about Google’s dominant position. Today, Anthropic is _the_ leading frontier lab and I reckon this would discourage adoption if MCP was launched in the present climate, for the same reason as nobody adopted the Agent2Agent protocol.

My answer to subscribers with questions about how to create standards is that I see them as emerging somewhat coincidentally, following a technically strong approach and with the right external conditions in place, which are impossible to entirely predict or control.

**Opinion #3: My hot AI take: AI doesn’t make work easier, and be mindful of skill atrophy**. If you’re using AI and life seems to be getting a lot easier, it raises the question: are you trying hard _enough_? Personally, using AI forces me to think just as hard, or even harder than before. I choose to use zero AI in my writing for the Pragmatic Engineer, and Grammarly is turned off as well. This is because I don’t want my writing skill to degrade, and would like to keep improving. On the other hand, with coding, I do use AI and accept my hand-coding ability will unavoidably degrade. My tip is to be mindful of the tradeoffs inherent in AI, and to keep using those skills which you value and want to keep sharp, even when AI tools are available.

**•** [State of the software engineering job market in 2026](https://newsletter.pragmaticengineer.com/p/state-of-the-job-market-2026)

**•** [The impact of AI on software engineers in 2026: key trends.](https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026)

**•** [How 10 tech companies choose the next generation of dev tools](https://newsletter.pragmaticengineer.com/p/measuring-ai-dev-tools)

**•** [The reality of tech interviews](https://newsletter.pragmaticengineer.com/p/the-reality-of-tech-interviews)

[00:00](https://www.youtube.com/watch?v=cSIMVYjVF28) Intro

[01:56](https://www.youtube.com/watch?v=cSIMVYjVF28&t=116s) From Uber to writing

[09:22](https://www.youtube.com/watch?v=cSIMVYjVF28&t=562s) AI-native SDLC

[14:00](https://www.youtube.com/watch?v=cSIMVYjVF28&t=840s) AI and hiring

[19:06](https://www.youtube.com/watch?v=cSIMVYjVF28&t=1146s) Engineers currently thriving

[22:18](https://www.youtube.com/watch?v=cSIMVYjVF28&t=1338s) Junior roles

[24:44](https://www.youtube.com/watch?v=cSIMVYjVF28&t=1484s) Meta’s war mode

[27:54](https://www.youtube.com/watch?v=cSIMVYjVF28&t=1674s) AI at Big Tech vs. startups

[36:46](https://www.youtube.com/watch?v=cSIMVYjVF28&t=2206s) Tech debt

[41:36](https://www.youtube.com/watch?v=cSIMVYjVF28&t=2496s) Types of engineering managers

[44:40](https://www.youtube.com/watch?v=cSIMVYjVF28&t=2680s) Measuring AI productivity

[48:30](https://www.youtube.com/watch?v=cSIMVYjVF28&t=2910s) The value of CS degrees

[50:53](https://www.youtube.com/watch?v=cSIMVYjVF28&t=3053s) AI at Pragmatic Engineer

[56:09](https://www.youtube.com/watch?v=cSIMVYjVF28&t=3369s) Future-proofing your career

[1:01:36](https://www.youtube.com/watch?v=cSIMVYjVF28&t=3696s) The EU job market

[1:03:55](https://www.youtube.com/watch?v=cSIMVYjVF28&t=3835s) Making money as a creator

[1:08:20](https://www.youtube.com/watch?v=cSIMVYjVF28&t=4100s) What’s next for The Pragmatic Engineer

[1:09:27](https://www.youtube.com/watch?v=cSIMVYjVF28&t=4167s) Bunq and Pollen

[1:13:38](https://www.youtube.com/watch?v=cSIMVYjVF28&t=4418s) Spotting trends

[1:14:33](https://www.youtube.com/watch?v=cSIMVYjVF28&t=4473s) Book updates

[1:15:20](https://www.youtube.com/watch?v=cSIMVYjVF28&t=4520s) Favorite books & tech products

[1:17:13](https://www.youtube.com/watch?v=cSIMVYjVF28&t=4633s) What won’t change in engineering

**Where to find Gergely Orosz:**

• X: [https://x.com/GergelyOrosz](https://x.com/GergelyOrosz)

• LinkedIn: [https://www.linkedin.com/in/gergelyorosz/](https://www.linkedin.com/in/gergelyorosz/)

• Bluesky: [https://bsky.app/profile/gergely.pragmaticengineer.com](https://bsky.app/profile/gergely.pragmaticengineer.com)

• Newsletter and blog: [https://www.pragmaticengineer.com/](https://www.pragmaticengineer.com/)

**Where to find Volodymyr Giginiak:**

• LinkedIn: [https://www.linkedin.com/in/giginiak](https://www.linkedin.com/in/giginiak)

• Newsletter:

**Mentions during the episode:**

• Wordsmith: [https://www.wordsmith.ai](https://www.wordsmith.ai/)

• Uber: [https://www.uber.com](https://www.uber.com/)

• Lenny’s Newsletter:

• Waterfall methodology: [https://www.atlassian.com/agile/project-management/waterfall-methodology](https://www.atlassian.com/agile/project-management/waterfall-methodology)

• Agile: [https://www.atlassian.com/agile](https://www.atlassian.com/agile)

• How Kent Beck shapes the software engineering industry:

• Building Claude Code with Boris Cherny: [https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)

• How Claude Code is built: [https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)

• How AI is changing software engineering at Shopify with Farhan Thawar: [https://newsletter.pragmaticengineer.com/p/how-ai-is-changing-software-engineering](https://newsletter.pragmaticengineer.com/p/how-ai-is-changing-software-engineering)

• Linear: [https://linear.app](https://linear.app/)

• Inside Linear’s Engineering Culture: [https://newsletter.pragmaticengineer.com/p/linear](https://newsletter.pragmaticengineer.com/p/linear)

• Linear: move fast with little process (with first engineering manager Sabin Roman): [https://newsletter.pragmaticengineer.com/p/linear-move-fast-with-little-process](https://newsletter.pragmaticengineer.com/p/linear-move-fast-with-little-process)

• Inside Meta’s Engineering Culture: Part 1: [https://newsletter.pragmaticengineer.com/p/facebook](https://newsletter.pragmaticengineer.com/p/facebook)

• Inside Meta’s Engineering Culture: Part 2: [https://newsletter.pragmaticengineer.com/p/facebook-2](https://newsletter.pragmaticengineer.com/p/facebook-2)

• Stacked diffs and tooling at Meta with Tomas Reimers: [https://newsletter.pragmaticengineer.com/p/stacked-diffs-and-tooling-at-meta](https://newsletter.pragmaticengineer.com/p/stacked-diffs-and-tooling-at-meta)

• _Chaos Monkeys: Obscene Fortune and Random Failure in Silicon Valley_: [https://www.amazon.com/dp/0062458191](https://www.amazon.com/dp/0062458191)

• Gemini: [https://gemini.google.com/app](https://gemini.google.com/app)

• Ramp: [https://ramp.com](https://ramp.com/)

• Intercom: [https://www.intercom.com](https://www.intercom.com/)

• Block: [https://block.xyz](https://block.xyz/)

• Coinbase: [https://www.coinbase.com](https://www.coinbase.com/)

• Why Rust is different, with Alice Ryhl: [https://newsletter.pragmaticengineer.com/p/why-rust-is-different-with-alice](https://newsletter.pragmaticengineer.com/p/why-rust-is-different-with-alice)

• Building a best-selling game with a tiny team – with Jonas Tyroller: [https://newsletter.pragmaticengineer.com/p/thronefall](https://newsletter.pragmaticengineer.com/p/thronefall)

• Bunq: [https://www.bunq.com](https://www.bunq.com/)

• Inside Pollen’s Collapse: “$200M Raised” but Staff Unpaid - Exclusive: [https://blog.pragmaticengineer.com/pollen](https://blog.pragmaticengineer.com/pollen)

• _A Philosophy of Software Design_: [https://www.amazon.com/dp/1732102201](https://www.amazon.com/dp/1732102201)

• _Tidy First?: A Personal Exercise in Empirical Software Design_:

[https://www.amazon.com/Tidy-First-Personal-Exercise-Empirical/dp/1098151240](https://www.amazon.com/Tidy-First-Personal-Exercise-Empirical/dp/1098151240)

• Granola: [https://www.granola.ai](https://www.granola.ai/)

• Perplexity Deep Research: [https://www.perplexity.ai/hub/blog/introducing-perplexity-deep-research](https://www.perplexity.ai/hub/blog/introducing-perplexity-deep-research)

—

Production and marketing by [Pen Name](https://penname.co/).