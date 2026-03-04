---
title: "AI Tooling for Software Engineers in 2026"
source: "https://newsletter.pragmaticengineer.com/p/ai-tooling-2026"
publishedDate: "2026-03-03"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

Which AI tools are software engineers using, and what do they really think of them? We asked The Pragmatic Engineer subscribers, and nearly a thousand of you have shared your experiences of using AI tools for work. This article provides a high-level overview of those findings from our latest AI tooling survey. _Thank you to everyone who participated!_

There are plenty of interesting details, most notably, validation of _just_ how much Anthropic and Claude Code have risen to dominate tooling usage. Claude Code is today nearly as widespread as GitHub Copilot was in [our survey three years ago](https://newsletter.pragmaticengineer.com/p/ai-coding-tools) (in the spring of 2023) – which shows how fast the AI market moves.

In today’s issue, we cover:

1.  **Interesting findings:** Claude Code has rocketed to #1 in just eight months, AI is fully mainstream with 95% weekly usage among respondents, and more.
    
2.  **Most-used AI tools:** Claude Code leads the pack, followed by chatbots and GitHub Copilot. Cursor’s rising fast, and newcomers like Codex and Antigravity are gaining traction. Most engineers juggle two to four tools at once.
    
3.  **Popular models:** Anthropic’s Opus and Sonnet models dominate coding tasks by a wide margin, with more mentions than all others combined.
    
4.  **AI trends: mainstream adoption achieved.** 95% of respondents report using AI tools at least weekly, 75% use AI for half or more of their work, and 56% report doing 70%+ of their engineering work with AI.
    
5.  **AI agent usage rising**: 55% of respondents now regularly use AI agents, with staff+ engineers leading adoption on 63.5% usage in the survey results. Agent users are twice as excited about AI as non-users are.
    
6.  **Company size and tool usage:** smaller places overwhelmingly favor Claude Code (75% at the tiniest businesses), while large enterprises default to GitHub Copilot. This popularity is probably down to enterprise procurement preferences – and Microsoft’s enterprise marketing efforts.
    
7.  **Tools engineers love:** Claude Code is the most loved tool at 46%, far ahead of Cursor on 19% and GitHub Copilot at 9%. Senior leaders are especially enthusiastic about Claude Code.
    
8.  **Demographics**: Overview of who took part in the survey.
    

_Full subscribers also have access to a longer, 35-page report with additional details - linked at the end of this article._

Here are my ten personal, most-interesting findings from this survey:

1.  **Claude Code has gone from zero to be the #1 tool in only eight months.** Released in May 2025, it’s already the most-used AI coding tool, overtaking GitHub Copilot and Cursor.
    
2.  **AI is now mainstream.** 95% of respondents use AI tools at least weekly, or more often, and 75% use AI for at least half their software engineering work. Among readers of The Pragmatic Engineer, it seems the question is no longer whether to use AI in day-to-day work, but _which_ tools to use.
    
3.  **Cursor is catching up fast on GitHub Copilot.** As much as we hear about companies dropping Cursor for Claude Code, Cursor is doing more than fine, growing in mentions 35% since our previous survey nine months ago.
    
4.  **Most engineers juggle multiple AI tools.** 70% use between two and four tools simultaneously, while 15% use five or more.
    
5.  **Staff+ engineers are the heaviest agent users.** 63.5% use agents regularly; more than regular engineers (49.7%), engineering managers (46.1%), and directors/VPs (51.9%).
    
6.  **Codex is seeing explosive early growth.** Despite not existing during the last survey, OpenAI’s Codex already has 60% of Cursor’s usage (!!)
    
7.  **Using agents correlates strongly with being positive about AI.** People using agents are nearly twice as likely to feel excited about AI while non-users are twice as likely to be skeptical.
    
8.  **Company size influences tool choice more than preference.** Huge companies (10K+) more likely to use Copilot (56%), tiny startups mostly go with Claude Code (75%) and Cursor (42%). It seems like enterprise procurement, not individual preference, is behind this divergence.
    
9.  **A tight chatbot race.** ChatGPT, Gemini, and Claude as standalone chatbots have nearly equal numbers of mentions, suggesting there’s no clear winner outside of coding-specific tools among software engineers.
    
10.  **Directors and senior leaders are especially into Claude Code**. The survey finds this tool is twice as popular with these folks as it is at less senior levels, while Cursor gets less love as seniority increases.
     

Let’s jump into some of the data:

Just eight months after its release, Claude Code is already the most-used tool, overtaking both GitHub Copilot and Cursor:

[

![](https://substackcdn.com/image/fetch/$s_!ZjLB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53356907-6657-4146-894a-417095d3b665_1194x896.png)

](https://substackcdn.com/image/fetch/$s_!ZjLB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53356907-6657-4146-894a-417095d3b665_1194x896.png)

_Most-used AI tools by mentions. Respondents could select several tools_

Tools mentioned, in order of popularity:

1.  [Claude Code](https://code.claude.com/docs/en/overview): a terminal-first coding agent from Anthropic. _We cover its history in the deepdive, [How Claude Code is built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)_
    
2.  Chatbots: ChatGPT, Claude, Gemini, and others
    
3.  [GitHub Copilot](https://github.com/features/copilot): launched in 2021, it’s the “oldest” AI coding tool on this list
    
4.  [Cursor](https://cursor.com/): agent-powered coding IDE. Learn _more about it in our deepdive, [Real-world engineering challenges: building Cursor](https://newsletter.pragmaticengineer.com/p/cursor)._
    
5.  [Codex](https://openai.com/codex/): OpenAI’s AI coding agent. _We recently covered [how Codex is built](https://newsletter.pragmaticengineer.com/p/how-codex-is-built)_
    
6.  [Gemini CLI](https://github.com/google-gemini/gemini-cli): Google’s command line agent
    
7.  [OpenCode](https://opencode.ai/): the most popular open source coding agent, where you can swap out the model being used, sidestepping vendor lock-in
    
8.  [Antigravity](https://antigravity.google/): Google hired the original team behind Windsurf and launched its own agentic IDE
    
9.  [JetBrains Junie](https://www.jetbrains.com/junie/): the AI coding agent by JetBrains
    
10.  [Zed](https://zed.dev/): a fast editor with agentic workflows
     
11.  [Windsurf](https://windsurf.com/): when Google acquihired the team, it did not buy the product. An AI IDE, now owned and operated by Cognition
     
12.  [Amp](https://ampcode.com/): a model-agnostic coding agent. A free version is supported by ads
     
13.  [Augment Code](https://www.augmentcode.com/): an enterprise-focused coding agent
     
14.  [Factory](https://factory.ai/): agent-native software development, which calls agents “droids.”
     

It’s interesting to compare how people answered the same question just nine months ago, last May:

[

![](https://substackcdn.com/image/fetch/$s_!2X9D!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ae0abef-cbc2-4a31-ba11-6a1ae1d9f443_1288x922.png)

](https://substackcdn.com/image/fetch/$s_!2X9D!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ae0abef-cbc2-4a31-ba11-6a1ae1d9f443_1288x922.png)

Tool usage, 9 months apart: The rise of Claude Code is clear, jumping from nowhere to number one by this February

Notable trends:

-   **Claude Code has massive momentum and is already the market leader.** Since being released in May 2025, it has become the most-used AI coding tool among survey respondents. Anecdotally, I’ve heard several teams that have been Cursor power users are introducing Claude Code with great success (while still keeping Cursor in-place.)
    
-   **Cursor has grown circa 35% in nine months and now threatens GitHub’s popularity.** In this survey, 35% more respondents mention using Cursor than in our previous research, last May. Such growth is impressive: at this rate, Cursor will have more users than GitHub in 6-9 months!
    
-   **Chatbot usage remains high.** Combined mentions for ChatGPT, Claude, Gemini, Perplexity, and others used outside of coding apps are still higher than for any other tool except Claude Code. For context, the most-mentioned chatbot (ChatGPT, 107 times) only has as many as Gemini CLI (also 107).
    
-   **GitHub Copilot usage stable.** Nine months ago, 46% of respondents said they used GitHub Copilot. Since then, it’s barely risen.
    
-   **Explosive growth for Codex.** OpenAI’s Codex wasn’t available during our last survey. But it now already has 60% of Cursor’s usage(!), and could be [growing even faster](https://newsletter.pragmaticengineer.com/p/how-codex-is-built) since this survey.
    
-   **Up-and-coming tools: OpenCode, Gemini CLI, Antigravity.** None of these had launched nine months ago, but today they’re used by around 10% of respondents – no small feat!
    
-   **Tools growing more than before:** The likes of Zed, Windsurf, Amp, Augment Code, and Factory appear less often in these results, but all are mentioned more by respondents than they were nine months ago.
    

Here’s how mentions of chatbot usage line up in our survey:

[

![](https://substackcdn.com/image/fetch/$s_!xu9N!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F98fa96e3-08dc-4b2e-8d23-6b410ab476ea_1162x956.png)

](https://substackcdn.com/image/fetch/$s_!xu9N!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F98fa96e3-08dc-4b2e-8d23-6b410ab476ea_1162x956.png)

Chatbots: ChatGPT, Gemini, and Claude have almost equal numbers of mentions

Most tech professionals use between two and four AI tools. An interesting detail is how many different ones are mentioned by respondents:

[

![](https://substackcdn.com/image/fetch/$s_!PvBu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf19349d-1894-462e-8064-6edaa917bd90_1192x1046.png)

](https://substackcdn.com/image/fetch/$s_!PvBu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf19349d-1894-462e-8064-6edaa917bd90_1192x1046.png)

_Number of AI tools mentioned per respondent_

Noteworthy details:

-   **70%** of survey participants mention using between two and four tools
    
-   **15%** use a single tool
    
-   **15%** are using 5 or more
    

Anthropic’s Opus and Sonnet dominate the ranking of models used for coding.

[

![](https://substackcdn.com/image/fetch/$s_!lQDW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae9785df-af0b-4ea4-a2e0-451bc771e6fe_1044x946.png)

](https://substackcdn.com/image/fetch/$s_!lQDW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae9785df-af0b-4ea4-a2e0-451bc771e6fe_1044x946.png)

_Models used for coding tasks in our survey results_

This is not even a contest: Opus 4.5 and Sonnet 4.5 (latest models at the start of our survey) come up more often than all other models, combined. Anthropic has become the go-to model developer for coding-related work – for now, that is. _When this survey launched, Opus 4.6, Sonnet 4.6, and GPT-5.3 were not yet out._

**Around 1 in 8 respondents say they just use whatever model is the default at their company.** This is interesting to note: these are likely folks who might not bother changing default settings, and just go with whatever’s available. If the default model is powerful enough, that’s fine, but if the company’s default is a cheaper, less capable model, then these people could face a more frustrating experience than those who get to choose what they use.

In the “other” category of models, some other mentions include:

-   Cursor’s custom Composer/Composer-1 model, and its “Cursor Auto” auto-select model
    
-   Kimi/Kimi K2.5 — Moonshot
    
-   DeepSeek model variants like R1, V3.2, Coder
    
-   Alibaba’s Qwen/Qwen3
    
-   xAI’s Grok
    
-   Various Mistral models
    

How often do people use AI tools? Very often, as it turns out; 95% of respondents are using them weekly, at a minimum:

[

![](https://substackcdn.com/image/fetch/$s_!3ZKE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7fa50f1d-b9cc-4bb8-aebc-9f1f64ba66cc_1248x1240.png)

](https://substackcdn.com/image/fetch/$s_!3ZKE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7fa50f1d-b9cc-4bb8-aebc-9f1f64ba66cc_1248x1240.png)

_95% use AI tools weekly or more frequently; only 2.1% don’t use them at all_

It’s worth reflecting on this data in relation to insights presented by Laura Tacho [at the recent Pragmatic Summit in San Francisco:](https://newsletter.pragmaticengineer.com/i/189035949/1-data-vs-hype-how-orgs-actually-win-with-ai)

[

![](https://substackcdn.com/image/fetch/$s_!foSN!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd62304a1-218b-43fb-ab71-620f6824c517_1594x896.png)

](https://substackcdn.com/image/fetch/$s_!foSN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd62304a1-218b-43fb-ab71-620f6824c517_1594x896.png)

The Pragmatic Engineer data is from 900 respondents. DX’s data is based on 121,000 respondents

**It seems that AI is now mainstream in software engineering.** Anecdotally, this has been my sense since the beginning of the year: everyone whom I talk with is using AI tooling on a roughly daily basis. Now, there’s data to prove it.

This year, we asked readers to estimate the percentage of their software engineering work that’s done using AI. The results:

[

![](https://substackcdn.com/image/fetch/$s_!IVYB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1978e2b6-e2bf-4c57-aedf-c3e803773ea5_1096x920.png)

](https://substackcdn.com/image/fetch/$s_!IVYB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1978e2b6-e2bf-4c57-aedf-c3e803773ea5_1096x920.png)

_Percentage of work done using AI_

The data show that AI is embedded in the workflows of participants in our survey:

-   **Only 25% of respondents** use AI for less than 40% of their work
    
-   **56%** do 70% or more of their work using AI
    
-   **75%** use AI for at least half of their software engineering work
    

Eighteen months ago, AI usage was mostly for code generation and tab completion. There were [one or two respondents](https://newsletter.pragmaticengineer.com/i/146678491/how-developers-use-ai-tools) who experimented with early AI agents in March 2024, as something equivalent to a junior software engineer.

**This year, 55% say they regularly use AI agents**. This is 507 people, a massive jump!

The most common use cases for agents:

-   Code review and code validation
    
-   Automating manual / annoying tasks
    
-   Bug fixing / investigating bugs
    
-   Code investigation
    
-   Debugging
    
-   “Crafting” code, or “weaving” it together with the agent
    

Below is a typical-enough comment from one software engineer who uses agents at a smaller company:

> “I use agents for pretty much all coding work, mostly prompting with Cursor Chat. I use it for code investigation, bug investigation, creating commits and pull requests. It’s my tool for reviewing code, I am always still in the loop. Almost all of my AI-written code is still reviewed and ‘crafted’. When using it for code review, I find it helpful to chat with and gain understanding, rather than letting it loose on code review. So, I use it for everything, but I am still very much in the loop.”

A common arrangement in the survey is the split-screen setup: a terminal with Claude Code open to drive work, and an IDE also open to review changes made by the agent.

The tools mentioned by those who regularly use AI agents split almost identically to the broader survey results:

[

![](https://substackcdn.com/image/fetch/$s_!KCu-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5bfdcbfe-8256-4ea8-acec-1ab516fcc905_988x822.png)

](https://substackcdn.com/image/fetch/$s_!KCu-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5bfdcbfe-8256-4ea8-acec-1ab516fcc905_988x822.png)

_Tool usage by regular users of AI agents. Claude Code is the clear leader (71% usage), followed by GitHub Copilot (46%) and Cursor (39%)_

**Staff+ engineers are the heaviest users of agents.** Here’s the data on agent usage by experience level:

[

![](https://substackcdn.com/image/fetch/$s_!qPN-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fba02fd8f-7afc-4d19-a86f-a38462211c7a_858x982.png)

](https://substackcdn.com/image/fetch/$s_!qPN-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fba02fd8f-7afc-4d19-a86f-a38462211c7a_858x982.png)

This data point is slightly amusing because it shows there’s not much difference between the lowest and highest levels: 46% of leads and engineering managers say they use AI agents regularly, while for Staff+ engineers it’s 63%. Does it suggest the most experienced engineers are also the most curious?

**The more someone uses AI, the more they also use AI agents.** We segmented the data by the percentage of software engineering work that respondents do with AI:

-   Heavy users have AI for 80% or more tasks, or use AI on an hourly basis
    
-   Moderate users have AI for 30-80% of tasks, or use AI on a daily basis
    
-   Light users employ AI for 30% of tasks or less, or use AI on a weekly or monthly basis
    

[

![](https://substackcdn.com/image/fetch/$s_!6-AP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F614f68b5-0588-4c8b-a3c2-27dbc9b86b18_1320x1040.png)

](https://substackcdn.com/image/fetch/$s_!6-AP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F614f68b5-0588-4c8b-a3c2-27dbc9b86b18_1320x1040.png)

**The more positive someone is about AI, the more likely they are using agents on a regular basis.** In contrast, those negative about AI barely use agents:

[

![](https://substackcdn.com/image/fetch/$s_!qyru!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F801f1e4b-b3a7-4dc5-a8fb-316f6039f303_1314x774.png)

](https://substackcdn.com/image/fetch/$s_!qyru!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F801f1e4b-b3a7-4dc5-a8fb-316f6039f303_1314x774.png)

How do people feel about AI, based on usage of agents

One question is whether this finding indicates correlation or causation: that is, does starting to use AI agents more, actually _cause_ people to feel more positive about AI?

A couple of details:

-   Using agents seems to make people nearly twice as enthusiastic about AI (61%) as those who do not use them (36%)
    
-   Respondents who don’t use agents are twice as likely to be skeptical (22%) about AI than those using agents regularly (11%)
    

It looks like that if you don’t use AI agents on a regular basis, you may have a negative opinion about the tools, in general, which could come at the cost of not experiencing what the technology has to offer.

In our results, company size and tooling choice correlate for some tools; for example, the smaller a team or company is, the more likely it is to use Claude Code or Codex:

[

![](https://substackcdn.com/image/fetch/$s_!1VyX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd35006b6-809d-4e14-bfc5-b0bfa2eceb43_1034x790.png)

](https://substackcdn.com/image/fetch/$s_!1VyX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd35006b6-809d-4e14-bfc5-b0bfa2eceb43_1034x790.png)

Claude Code and Codex usage vs company size

**Claude Code is used by a whopping 75% of the smallest companies and teams.** This is a big number, far ahead of any other tools. At the smallest places, the most-used tools are, in order:

1.  Claude Code: 75%
    
2.  Chatbots: 55%
    
3.  Cursor: 42%
    
4.  GitHub Copilot: 35%
    
5.  Codex: 26%
    
6.  Gemini CLI: 14%
    
7.  OpenCode: 13%
    

**GitHub Copilot overtakes Claude Code at large companies.** This confirms what was known: Microsoft is very good at enterprise sales, and at bundling GitHub Copilot in its suite of products:

[

![](https://substackcdn.com/image/fetch/$s_!b06F!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc52f907b-aadc-458f-be21-b00220ee6ab4_1298x950.png)

](https://substackcdn.com/image/fetch/$s_!b06F!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc52f907b-aadc-458f-be21-b00220ee6ab4_1298x950.png)

_GitHub Copilot usage increases with company size, overtaking Claude Code at the largest companies_

**Cursor and OpenCode usage drops at massive companies with similar usage patterns.** Across the board, usage is roughly the same, regardless of company size. We only see a drop at the very largest of companies with 10,000+ employees:

[

![](https://substackcdn.com/image/fetch/$s_!h1Rj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4a721ed-7336-4461-8c5c-30f3485f8adf_1002x818.png)

](https://substackcdn.com/image/fetch/$s_!h1Rj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4a721ed-7336-4461-8c5c-30f3485f8adf_1002x818.png)

_Cursor and OpenCode usage vs company size_

One theory for such a drop at massive companies could be that large companies often build their own internal coding agents that engineers use; e.g., at fintech, Block, the agent is called [Goose](https://github.com/block/goose), Meta has its own agent, as does Google with [Jetski](https://newsletter.pragmaticengineer.com/i/179478823/google-devs-to-use-jetski-a-custom-antigravity) (its version of Antigravity) and [Cider](https://newsletter.pragmaticengineer.com/i/174937901/ide).

**Google’s tools are evenly used across the spectrum of company size.** Google’s Gemini CLI and Antigravity are the only tools in this survey whose usage is notably stable, regardless of company size. Both tools hover at around 10% from the smallest to largest workplaces:

[

![](https://substackcdn.com/image/fetch/$s_!xnl5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b07c05b-a8f2-45e3-b438-3c8c27077bfc_974x710.png)

](https://substackcdn.com/image/fetch/$s_!xnl5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b07c05b-a8f2-45e3-b438-3c8c27077bfc_974x710.png)

_Gemini CLI and Antigravity usage vs company size_

**The feeling among survey respondents that they can experiment at work, correlates with Claude Code being available.** We asked if readers experiment frequently with tools. Below are the “yes” responses by company size:

[

![](https://substackcdn.com/image/fetch/$s_!Fb6W!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3236c521-5d15-4cf8-87d9-cb266482525b_746x658.png)

](https://substackcdn.com/image/fetch/$s_!Fb6W!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3236c521-5d15-4cf8-87d9-cb266482525b_746x658.png)

When these responses are mapped to the percentage of people using Claude Code, there’s a very similar distribution. My theory is that Claude Code is new enough at 9 months old to have not yet been approved at companies with bureaucratic processes for approving new tools, and this is partly why some respondents feel their chance to experiment with the range of tooling is being thwarted.

[

![](https://substackcdn.com/image/fetch/$s_!GzSD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F00010dd4-df20-4e29-8d7a-070a990ae00d_906x668.png)

](https://substackcdn.com/image/fetch/$s_!GzSD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F00010dd4-df20-4e29-8d7a-070a990ae00d_906x668.png)

_Percentage of respondents using Claude Code & those who experiment often with AI tools, by company size_

Engineers at places with lots of red tape for tooling are less empowered to experiment with new AI tools; not just Claude Code, but any new, interesting tool.

We asked respondents: “Which AI tools do you love using the most, and why?” Below are the tools which respondents enjoy most, in descending order of number of mentions:

[

![](https://substackcdn.com/image/fetch/$s_!1tJJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8becc664-01aa-4136-b86e-5b09702bb56c_990x752.png)

](https://substackcdn.com/image/fetch/$s_!1tJJ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8becc664-01aa-4136-b86e-5b09702bb56c_990x752.png)

**Claude and Cursor stand out in terms of how much they are loved.** A whopping 57% of respondents mention either Claude Code (46%) or Claude models (11%) as the tools they are attached to. Cursor was at a respectable 19% – double GitHub on 9%.

Other notable tools with two or more mentions:

-   [Warp](https://www.warp.dev/): a terminal for building agents
    
-   [Zed](https://zed.dev/): a fast editor with agentic workflows
    
-   [Amp](https://ampcode.com/): a model-agnostic coding agent. A free version is supported by ads
    
-   [Cline](https://cline.bot/): an open source coding agent
    
-   [RooCode](https://roocode.com/): an open source, AI-powered coding assistant running in VS Code
    
-   [Continue.dev](https://www.continue.dev/): AI checks on every pull request
    

**Claude Code is especially loved by Director-and-above folks.** Segmenting the “most loved” responses by level (engineers up to the senior levels of staff+ engineers, leads/eng managers, and Director+ folks):

[

![](https://substackcdn.com/image/fetch/$s_!0nw-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0842b345-d7df-441e-9666-2e9070c8ba95_1028x728.png)

](https://substackcdn.com/image/fetch/$s_!0nw-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0842b345-d7df-441e-9666-2e9070c8ba95_1028x728.png)

_Claude Code is loved far more by Director folks than others; Cursor gets less love as seniority goes up_

Both Claude Code and Cursor become less loved – or used! – as seniority goes up, but it’s notable that folks in senior engineering leadership positions are obsessed with Claude Code, but not Cursor.

**GitHub Copilot is equally loved by engineering managers as Cursor is** — and this is surprising:

[

![](https://substackcdn.com/image/fetch/$s_!WsqN!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F72d7548b-ddd5-439e-bacb-003a3c1a66f7_1068x742.png)

](https://substackcdn.com/image/fetch/$s_!WsqN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F72d7548b-ddd5-439e-bacb-003a3c1a66f7_1068x742.png)

_Percentage of people naming GitHub Copilot or Cursor as a tool they love_

**Both OpenCode and GitHub Copilot are surprisingly loved by Staff+ engineers.** Another unexpected detail is that, despite OpenCode being used about a quarter as much as GitHub Copilot, it rivals the “loved” mentions. For Staff+ engineers, it matches GitHub on those terms:

[

![](https://substackcdn.com/image/fetch/$s_!LjeY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F749ca291-8a53-4689-8d8a-4d8a481cd02e_1016x748.png)

](https://substackcdn.com/image/fetch/$s_!LjeY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F749ca291-8a53-4689-8d8a-4d8a481cd02e_1016x748.png)

Percentage of people naming GitHub Copilot or OpenCode as a tool they love

Finally, when segmenting based on company size, we see the familiar pattern of Claude Code vs GitHub Copilot. Claude Code is less frequently mentioned as a “loved” tool as company size increases.

[

![](https://substackcdn.com/image/fetch/$s_!S3fs!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F592fbbe0-5784-4647-885b-542ff90da7aa_1106x820.png)

](https://substackcdn.com/image/fetch/$s_!S3fs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F592fbbe0-5784-4647-885b-542ff90da7aa_1106x820.png)

_How “loved” Claude Code is, versus GitHub Copilot, based on company size_

GitHub Copilot sees the opposite trajectory: it’s more loved within larger companies where it’s likely to be harder to experiment with alternatives.

In closing, below are details about who took the survey, and how the 906 responses came together.

Engineers comprise 55% of respondents, and engineering leadership another 34%:

[

![](https://substackcdn.com/image/fetch/$s_!u7dF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff93c1e68-36ae-45a2-8445-31289a7fa9f2_928x834.png)

](https://substackcdn.com/image/fetch/$s_!u7dF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff93c1e68-36ae-45a2-8445-31289a7fa9f2_928x834.png)

_Respondents by their role_

Respondents are experienced professionals. The median respondent has 11-15 years of experience:

[

![](https://substackcdn.com/image/fetch/$s_!nQ7b!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe359547a-7130-4f5b-893f-b619d4ec18ca_1012x876.png)

](https://substackcdn.com/image/fetch/$s_!nQ7b!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe359547a-7130-4f5b-893f-b619d4ec18ca_1012x876.png)

_Years of experience, split across the 906 respondents_

Company size is also a fairly even split across this group:

[

![](https://substackcdn.com/image/fetch/$s_!-1lV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F02487aa9-d574-40ae-9c9d-1314bfffd489_972x812.png)

](https://substackcdn.com/image/fetch/$s_!-1lV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F02487aa9-d574-40ae-9c9d-1314bfffd489_972x812.png)

Respondent split, based on company size

Region-wise, most respondents are in Europe or the US:

[

![](https://substackcdn.com/image/fetch/$s_!Cc3F!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F334ecd90-ae13-499e-9599-afd6591c3731_892x772.png)

](https://substackcdn.com/image/fetch/$s_!Cc3F!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F334ecd90-ae13-499e-9599-afd6591c3731_892x772.png)

_Respondents, based on location_

We have compiled additional findings from this survey which did not fit in this article: it’s a 35-page article: