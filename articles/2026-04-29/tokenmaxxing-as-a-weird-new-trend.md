---
title: "Tokenmaxxing as a weird new trend"
source: "https://blog.pragmaticengineer.com/the-pulse-tokenmaxxing-as-a-weird-new-trend/"
publishedDate: "2026-04-28"
category: "design"
feedName: "Sidebar"
---

_Hi, this is Gergely with a bonus, free issue of the Pragmatic Engineer Newsletter. In every issue, I cover Big Tech and startups through the lens of senior engineers and engineering leaders. Today, we cover one out of four topics from_ [_last week’s The Pulse_](https://newsletter.pragmaticengineer.com/p/the-pulse-tokenmaxxing-as-a-weird?ref=blog.pragmaticengineer.com) _issue. Full subscribers received the article below seven days ago. If you’ve been forwarded this email, you can_ [_subscribe here_](https://newsletter.pragmaticengineer.com/about?ref=blog.pragmaticengineer.com)_._

Inside Meta, an engineer created a “token leaderboard” that ranks employees by token usage. Last week, The Information [reported](https://www.theinformation.com/articles/meta-employees-vie-ai-token-legend-status?ref=blog.pragmaticengineer.com):

> “Employees at Meta Platforms who want to show off their AI superuser chops are competing on an internal leaderboard for status as a “Session Immortal”— or, even better, “Token Legend.”
> 
> The rankings, set up by a Meta employee on its intranet using company data, measure how many tokens — the units of data processed by AI models — employees are burning through. Dubbed “Claudeonomics” after the flagship product of AI startup Anthropic, the leaderboard aggregates AI usage from more than 85,000 Meta employees, listing the top 250 power users.
> 
> The practice is emblematic of Silicon Valley’s newest form of conspicuous consumption, known as “tokenmaxxing,” which has turned token usage into a benchmark for productivity and a competitive measure of who is most AI native. Workers are maximizing their prompts, coding sessions and the number of agents working in parallel to climb internal rankings at Meta and other companies and demonstrate their value as AI automates functions such as coding.”

I spoke with a few engineers at Meta about what’s happening, and this is what they said:

-   **Massive waste.** Plenty of devs are running an OpenClaw-like internal agent that burns massive amounts of tokens for little to no outcome.
-   **Outages caused by AI overuse.** A dev mentioned that some SEVs were caused by what looked like careless AI code generation; almost like a dev behind the SEV was more concerned with churning out massive amounts of code with AI than with product quality.
-   **Gamified leaderboard.** Those at the top of the leaderboard produce throwaway, wasteful work. This is painfully clear to anyone who checks Trajectories (AI prompts), which can be viewed.

As per The Information, Meta employees used a total of 60.2 trillion AI tokens (!!) in 30 days. If this was charged at Anthropic’s API prices, it would cost $900M. Of course, Meta is likely purchasing tokens at a discount, but that could still come in at $100M+ – in large part from senseless “tokenmaxxing”.

**After backlash on social media, Meta abolished the internal leaderboard last week.** One day after The Information revealed details about the incredible tokenmaxxing numbers, I confirmed that Meta has taken down its leaderboard; perhaps they realized that the incentive created enormous and unnecessary waste. If so, it’s a bit surprising that it took media coverage for the social media giant to reach that conclusion.

**One engineer at Meta told me they think Meta had a different goal with the token leaderboard.** A long-tenured engineer suspects increasing AI usage actually was the real goal. They said:

> “Putting a leaderboard in place was always going to incentivize much more AI usage. And more AI usage means producing a lot more real-world traces. These traces can then be used to train Meta’s next-generation coding model better.
> 
> I believe this was the goal, even if no one said it out loud.
> 
> It’s an expensive way to generate data for training, but if any company has the means to do so, it’s Meta.”

### **Microsoft: full-force tokenmaxxing**

Similarly, Microsoft has had an internal token leaderboard like Meta’s since January, and it started pretty well, as I reported back at the time: there’s an internal token dashboard that displays the individuals who use the most tokens in order to promote the use of tokens and experimentation with LLMs. At the Windows maker, this leaderboard is interesting:

-   Very senior engineers – distinguished-level folks – are in the top 5 across the whole company, despite the fact that this group generally wrote little code in the past.
-   VP-level folks make the top 10 and top 20, despite often being in meetings for most of the day and rarely writing code.

However, what starts as a metric for performance reviews or promotions can quickly become a target for devs. I talked with a software engineer at the Windows maker who admitted they’re full-on “tokenmaxxing” – not to get on the leaderboard, but rather because they don’t want to be seen as using too few tokens:

> “We have internal dashboards and metrics tracking AI usage, token usage, percentage of code written by AI vs hand-written code.
> 
> I am conscious of not wanting to be seen as “uses too little AI,” and I’m not ashamed to say I need to do tokenmaxxing to do this. Things I do to inflate my token usage metrics:Ask AI questions about the code already in the documentation. The AI pulls up the documentation, processes it, and gives me results 10x slower, but while burning lots of tokens. I could use “readthedocs” \[an internal product\], but then my token numbers would be lowerAsk the AI to prototype a feature that I have no intention of working on. Prompt it a few more times, then throw the whole thing awayDefault to always using the agent, even when I know I could do the work by hand much faster. Then watch it fail”

This engineer is relatively new at the company, so is concerned about job security, and is playing this game to avoid being tagged as insufficiently “AI-native” by burning far more tokens than necessary.

### **Salesforce: burning tokens to hit “minimum” & “ideal” targets**

Elsewhere, Salesforce has created “tokenmaxxing” incentives, as well. Talking with an engineer there, I learned that the company built two tools that effectively incentivize excessive spending on tokens:

1.  **“Minimum” incentives with a tracking tool.** There’s a Mac widget that shows your own spend, updated every 15 minutes. It also displays minimum expected spend. Last week, the target was $100 on Claude Code, and $70 on Cursor.
2.  **Showing everyone’s spend.** A web-based tool to see the token spend of any colleague. It’s used to check where team mates’ usage is at.
3.  **“Maximum” spend limits that can be exceeded.** Up to a week ago, there was also a _maximum_ monthly limit of $250 for Claude Code and $170 for Cursor. _However, this can be exceeded with the simple press of a button if the limit is reached. I’ve learned that last week, some engineering organisations at Salesforce had their “maximum” limit removed in order to “remove any friction from the development process.”_

The message Salesforce sends to staff is clear: “use a minimum of $170/month tokens or be flagged.” Who wants to get flagged for using too few tokens? The outcome is somewhat wasteful token spend:

-   **Burning tokens for nothing.** Devs ask Claude or Cursor: “build me X,” where X is a project or product with nothing to do with their work, and not something they’d ever ship. It’s just a way to burn tokens
-   **Calibrating token spend to be above average.** Plenty of devs browse peers’ token spend to figure out the slightly-above average point, then use the tokens needed to hit that mark

### **Shopify: an example on how to avoid tokenmaxxing**

The first-ever token leaderboard that I’m aware of was built by Shopify in 2025. And it worked well! Last June, the Head of Engineering at Shopify, Farhan Thawar, told me [on The Pragmatic Engineer Podcast](https://newsletter.pragmaticengineer.com/p/how-ai-is-changing-software-engineering?ref=blog.pragmaticengineer.com):

> “We have a leaderboard where we actively celebrate the people who use the most tokens because we want to make sure they are \[celebrated\] if they’re doing great work with AI.
> 
> \[And for the top people on the leaderboard,\] I want to see why they spent say $1,000 a month in credits for Cursor. Maybe that’s because they’re building something great and they have an agent workforce underneath them!”

I asked Farhan for details on how it’s gone since. Here’s what he told me:

> “We have since renamed the token leaderboard to usage dashboard: for obvious reasons, as we don’t want to encourage “competing” to make it to the top of this board. We have token spend on our internal wiki profile as well as on the usage dashboard.
> 
> **We also have circuit breakers to catch “runaway agents.”** So if personal spend spikes within a day, we can cut off access immediately, and you can renew if the usage spike was deliberate, or if it was a runaway agent. The circuit breaker worked well for us: we’ve not only caught runaway agents, but found bugs in our infra this way!”

Shopify’s approach seems to have worked for a few reasons:

-   **The usage dashboard served as a “push” for devs to use AI tools, early-on.** Last year, devs were mostly experimenting with AI tools because they were not as performant as today. The usage dashboard encouraged developers to try new tools, and highlighted power users.
-   **Circuit breakers helped.** Cutting off spend when usage spikes helped catch “runaway agents.”
-   **High usage is looked at.** Farhan checks-in with top-spending individuals to understand the use cases. Any tokenmaxxing would likely have been spotted at this stage, which would have been a bit embarrassing for the user!

One more interesting learning Farhan shared with me: it’s more interesting to not look at “who spent the most in _overall_ token cost?” but instead, “whose _tokens_ cost the most?” Devs who generate tokens that come out as expensive have turned out to do in-depth work that was interesting to learn about!

### **Tokenmaxxing: great for AI vendors, bad for everyone else**

I see very few rational reasons why incentivizing tokenmaxxing makes sense for any company. It results in increasing AI spend – by a lot! – in return for little to no value. Heck, in some cases it actually incentivises slower work – as shown by devs using the AI to answer questions when documentation is readily available – and encouraging ‘busywork’ where devs prompt projects that they don’t even want to ship. Tokenmaxxing seems to push devs to focus on stuff that makes no difference to a business.

It feels to me that a good part of the industry is using token count numbers similarly to how the lines-of-code-produced metric was used years ago. There was a time when the number of lines written daily or monthly was an important metric in programmer productivity, until it became clear that it’s a terrible thing to focus on. A lines-of-code metric can easily be gamed by writing boilerplate or throwaway code. Also, the best developers are not necessarily those who write the most code; they’re the ones who solve hard problems for the business quickly and reliably with – or without – code!

Similarly, the number of tokens a dev generates can easily be gamed, and if this metric is measured then devs will indeed game it. But doing so generates a massive accompanying AI bill!

_—-_

_Read the full issue of_ [_last week’s The Pulse_](https://newsletter.pragmaticengineer.com/p/the-pulse-tokenmaxxing-as-a-weird?ref=blog.pragmaticengineer.com)_, or check out_ [_this week’s The Pulse_](https://newsletter.pragmaticengineer.com/p/the-pulse-ai-token-spending-out-of?ref=blog.pragmaticengineer.com)_. This week’s issue covers:_

1.  **New trend: token spend breaks budgets – what next?** In the past 2-3 months, spending on AI agents has exploded at many tech companies, and the ramifications of this are starting to dawn on engineering leaders. We’ve sourced details from 15 companies, including the different ways they are coping with this realization.
2.  **New trend: more AI vendors can’t keep up with demand.** Related to massively increased spending, GitHub Copilot and Anthropic are starting to limit less-profitable individual users, so they can serve business users whose spend has easily 10x’d in the last few months. The exception is OpenAI and Codex.
3.  **Morale at Meta hits all-time low?** Business is booming but devs at Meta are furious and worried due to looming layoffs, and an invasive tracking program rolled out to all US employees.

[Subscribe to my weekly newsletter](https://newsletter.pragmaticengineer.com/about) to get articles like this in your inbox. It's a pretty good read - and the [#1 tech newsletter](https://substack.com/top/technology) on Substack.