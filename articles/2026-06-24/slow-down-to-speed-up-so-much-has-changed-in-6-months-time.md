---
title: "Slow down to speed up: so much has changed in 6 months’ time"
source: "https://newsletter.pragmaticengineer.com/p/slow-down-to-speed-up"
publishedDate: "2026-06-23"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

_Scheduling note: there will be no edition of The Pulse on Thursday as I’m in San Francisco for the next week and a half, visiting AI labs and startups, and attending the [AI Engineer World Fair](https://www.ai.engineer/worldsfair/2026) from next Monday. For the podcast and Tuesday articles, it’s business as usual._

Three weeks ago, at [Craft Conference](https://craft-conf.com/), in Budapest, Hungary, I opened the event with a keynote titled ‘Slow Down to Speed Up’.

As with most of my talks, it came together in stages, including with some input from full subscribers to the Pragmatic Engineer, with whom I shared my thinking in advance, in ‘[Ideas: slow down to speed up when working with AI agents](https://newsletter.pragmaticengineer.com/p/ideas-slow-down-to-speed-up-when)’. _Thank you for all the comments!_

As fate would have it, just two days beforehand, social media giant Meta appositely provided a real-world case study for my talk, with its [most embarrassing outage of all time](https://newsletter.pragmaticengineer.com/i/202307236/4-most-embarrassing-ever-outage): users could simply ask the Meta AI to change the email of any account, and the bot happily complied – even if the account belonged to someone else entirely – including a former US president. It was a timely example to kick off the talk with. _Check out the full keynote that’s available to [view on YouTube](https://youtu.be/5wks1W-auKY):_

[Watch the keynote video](https://youtu.be/5wks1W-auKY)

In this article, I summarize the key parts of my Craft Conference keynote in detail, and some responses received at the event. Full subscribers also have access to the slides, [here](https://newsletter.pragmaticengineer.com/i/40654455/reports-and-slides), and at the foot of this article.

We cover:

1.  **Meta: “AI psychosis” in effect?** Meta has been destroying its engineering org, and an obsessive focus on AI seems to be one reason for it. For more on this question, check out this [deep dive](https://newsletter.pragmaticengineer.com/p/why-is-meta-destroying-its-engineering).
    
2.  **Everything’s changed in six months.** From around November last year, things changed with a more capable generation of AI agents like Opus 4.5 and GPT-5.4.
    
3.  **How are tech companies changing how they work?** Anthropic, OpenAI, Google, Uber, startups, and traditional companies.
    
4.  **Trends**. Individual productivity is up, but team productivity’s flat, tokenmaxxing and tooling adoption, vanishing middle management, CEOs and CTOs back to coding, and more.
    
5.  **Trends across software.** Falling software quality, GitHub’s constant reliability woes, AI slop overwhelming devs who care about quality, and more.
    
6.  **Advice for software engineers and engineering leaders.** Suggestions to help future-proof a career.
    
7.  **Feedback.** “It’s happening here too!” is a common theme, and relief for some that it’s not unique to their own workplace.
    

I thought it was a made-up story when I read that Meta had enabled account takeovers via a “zero auth” policy; i.e., simply asking the Meta AI bot was sufficient to change any account’s email address. After all, shipping such a regression would fly in the face of security measures, code reviews, automated testing, and metrics. Plus, the company has dedicated Integrity teams whose mission statement is to ensure something like this never happens… And yet, this bug shipped.

It went undetected by anyone at Meta, and high-profile accounts like that of former US president, Barack Obama, were taken over as a result. Instagram’s dedicated Integrity team seems to have discovered the embarrassing issue via the news.

As mentioned, it was two days before the Craft keynote, so there was enough time to ask around at Instagram and Meta. Engineers at the company there told me this disaster was caused by AI-generated, AI-reviewed code, along with layoffs, and by forced reassignments from Integrity teams and elsewhere onto AI labeling and related duties.

[

![](https://substackcdn.com/image/fetch/$s_!zjyL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc59abcfc-a72d-4957-b4e0-9fd6bde46c98_2048x1365.jpeg)

](https://substackcdn.com/image/fetch/$s_!zjyL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc59abcfc-a72d-4957-b4e0-9fd6bde46c98_2048x1365.jpeg)

_Talking Meta at Craft Conference_

The problem at Meta seems to be that leadership is aggressively pushing AI, while withdrawing resources and headcount from areas responsible for security, quality, and reliability. Since last week’s [deepdive](https://newsletter.pragmaticengineer.com/p/why-is-meta-destroying-its-engineering) into what’s been happening behind the scenes was published, I’ve learned further details:

-   Integrity teams at WhatsApp [have been hit hard by layoffs](https://newsletter.pragmaticengineer.com/i/202609979/orgs-hit-hard-by-layoffs) and enforced data-labeling reassignments
    
-   Instagram’s design team suffered a 44% cut in headcount during layoffs
    
-   The Developer Documentation and Support team had a full 95% headcount reduction during layoffs
    
-   Data labeling at the ADO group [goes beyond](https://newsletter.pragmaticengineer.com/i/202609979/1-meta-follow-up) “just” labeling; there are many AI training tasks to do. But these are repetitive, unless you get really creative.
    

Based on everything I heard from talking with Meta folks, AI-induced behavior was indeed at the heart of this outage. AI-generated, AI-reviewed code, and security teams being gutted, were also factors in the beyond-embarrassing incident. As reported in last week’s deepdive:

-   Instagram’s Trust and Safety Team lost around 50% of its staff to data labeling and layoffs. Some of the most senior folks were drafted onto AI training tasks.
    
-   AI-generated changes with zero human input, with just an additional AI code review, have been very common in recent months across the codebase. The change that caused this outage looked like one of these
    
-   Normally, the Trust and Safety team would be on top of monitoring and alerting of security breaches, but it is currently in full disarray due to rapid, internal disorganization”.
    

If major changes like data labeling assignments and staff tracking are undone, then perhaps things at Meta could return to normal. But so far, the most being done is that leadership has boosted budgets for snacks, travel, and events. Hardly the change needed to restore morale and the former culture!

The comparison to the Lumon corporation in the hit show, Severance, was duly made:

**Meta’s worst-ever outage can be interpreted as a warning** about what happens when there’s so much focus on AI that the basic health of a company’s main – money-spinning – products is neglected. Instagram, WhatsApp, and Facebook generate the bulk of revenue for Meta, but the company is reallocating more engineers to training the coding model, and aggressively cutting the headcounts of vital orgs to do so – up to the point of not having oncall coverage for key services, and security teams being too stretched to do their jobs.

Am I missing some insight about why it’s more important to build a state-of-the-art, likely-closed AI model that’s good at coding, than it is to keep operating revenue-generating businesses with stable infra?

Independent, experienced software engineers with zero affiliation to AI labs have been saying for a few months that how we do software engineering has been transformed.

David Heinemeier Hansson (DHH), creator of Ruby on Rails [in January](https://x.com/dhh/status/2007504187568074843?s=20):

> ”Just \[in\] summer 2025, I spoke with Lex Fridman about not letting AI write any code directly, but it turns out part of this resistance was simply based on the models not being good enough at the time! I spent more time rewriting what it wrote, than if I’d done it from scratch. That has now flipped.”

Simon Willison, creator of Django, [in May](https://simonw.substack.com/p/i-think-anthropic-and-openai-have) pinpointed the start of the change to late last year:

> “**The models released in November 2025 elevated agents to being genuinely useful.** We’ve had six months to get used to that idea now; it’s no wonder companies are beginning to spend real money on this technology.”

**Teams using agents now ship 5x as many pull requests as two years ago.** Here’s data from Linear:

[

![](https://substackcdn.com/image/fetch/$s_!CCFv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcee67b29-e96c-4ec4-ac45-c9a0c018feb8_1780x786.png "Screenshot 2026-06-04 at 00.07.06.png")

](https://substackcdn.com/image/fetch/$s_!CCFv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcee67b29-e96c-4ec4-ac45-c9a0c018feb8_1780x786.png)

Comparing numbers of pull requests for teams that use AI agents with Linear, vs those that don’t. Source: Linear

**Devs using AI harnesses are producing 2.5x as much code versus 18 months ago.** Data from Cursor shows that their users, on average, went from adding 3,500 lines of code in January 2025 to 8,600 today:

**The size of pull requests is up 3x versus 18 months ago**. Also from Cursor:

[

![](https://substackcdn.com/image/fetch/$s_!VaTO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F373d75b5-dc2e-4ee7-b487-f867c235b7af_1504x820.png "Screenshot 2026-06-04 at 00.14.27.png")

](https://substackcdn.com/image/fetch/$s_!VaTO!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F373d75b5-dc2e-4ee7-b487-f867c235b7af_1504x820.png)

_Line goes up: more lines per PR than ever, today. Source: [Cursor](https://cursor.com/insights)_

**More AI changes are accepted without human review.** Data from Cursor shows a big jump in changes being accepted without human review from around February this year, when Opus 4.7 and GPT 5.5 launched:

[

![](https://substackcdn.com/image/fetch/$s_!g3dj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feef9732b-9411-445b-af5d-64f8bb026d7a_2048x1365.jpeg)

](https://substackcdn.com/image/fetch/$s_!g3dj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feef9732b-9411-445b-af5d-64f8bb026d7a_2048x1365.jpeg)

_Less human input than ever, as outlined at the Craft Conference. Source: [Cursor](https://cursor.com/insights)_

**We’re seeing a** _**lot**_ **more code generated, and less of it than ever being reviewed by devs.** In the relatively short time since AI agents became _really_ good last November, there are more pull requests generated by devs, those pull requests are getting better, and code reviews are harder to keep up with. And so, reviews are less stringent and more changes are shipped to production sans human review! _As per my discussions with Meta engineers, these kinds of AI-generated, AI-reviewed pull requests \[at Meta, they’re called diffs\] are what caused the most recent, embarrassing outage at Instagram._

Details from a few larger tech companies:

**Anthropic: all-in on AI agents.** In March, Boris Cherny, creator of Claude Code, [was on the Pragmatic Engineer podcast](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) and shared some details:

-   He personally runs ~5x agents parallel, and ships 20–30 PRs/day
    
-   Product requirement documents (PRDs) are dead & prototypes have replaced them inside Anthropic
    
-   ~100% of Claude Code was generated by Claude in March
    
-   ~70-90% of code inside Anthropic was generated by Claude
    
-   Claude Cowork – another billion-dollar product in terms of revenue potential – was built in just 10 days
    

Since then, Boris has [shared](https://x.com/rohanpaul_ai/status/2063347508831764647?s=20) that his workflow has changed to setting up loops to run agents.

**OpenAI: moving much faster with AI agents.** OpenAI’s Codex team was [on the main stage](https://www.youtube.com/watch?v=Bo6Gtq3nMXc) at The Pragmatic Summit in February. Tibo Sottiaux (head of engineering, Codex, OpenAI) shared interesting details on how software development is done in the Codex team:

-   There’s a “fix this” button integrated into the internal OpenAI mobile app. It makes one-shot fixes to bug reports, which devs review and can merge
    
-   AI code review for all code changes. With a tiered approach, some changes can be merged with just AI review, and more important ones need an extra human review
    
-   Most devs run several agents in parallel, often walking around with their laptop lids open, so the machine doesn’t enter sleep mode and suspend agents
    
-   Code isn’t really written by hand anymore on the Codex team, and is also less common on other teams too
    
-   “Taste” is becoming a core skill for working at the company
    
-   Codex improves itself: it runs its own test suite, runs improvement tasks overnight, and during team meetings it takes actions on topics discussed
    

**Google: AI widespread.** Gemini is not as capable at coding as Claude or Codex, as acknowledged by Google’s CEO, but it’s widely used companywide. The less capable coding model could be hurting AI adoption compared to other companies.

**Uber: in-house AI infra.** We covered in-depth [how Uber uses AI for development](https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development), touching on internal systems like:

Uber’s MCP Gateway:

[

![](https://substackcdn.com/image/fetch/$s_!86xc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfdfadc9-6d82-4960-a524-68f652453116_1342x1050.png)

](https://substackcdn.com/image/fetch/$s_!86xc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfdfadc9-6d82-4960-a524-68f652453116_1342x1050.png)

_Uber’s MCP Gateway_

Uber Agent Builder:

[

![](https://substackcdn.com/image/fetch/$s_!lJ3T!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b7b50b1-2fbe-4fbe-8175-1fd78742b9dc_1374x1400.png)

](https://substackcdn.com/image/fetch/$s_!lJ3T!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b7b50b1-2fbe-4fbe-8175-1fd78742b9dc_1374x1400.png)

Uber’s Agent Builder: a no-code experience to build agents

The AIFX command line interface:

[

![](https://substackcdn.com/image/fetch/$s_!tRVQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb8ad64cc-74f4-45e4-be0d-110cbfa09122_1980x1136.png)

](https://substackcdn.com/image/fetch/$s_!tRVQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb8ad64cc-74f4-45e4-be0d-110cbfa09122_1980x1136.png)

Uber’s AIFX command line tool

Minion: background agents

[

![](https://substackcdn.com/image/fetch/$s_!bCSQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fddffc676-68f3-42b1-8380-b6f2091580c2_1351x737.png)

](https://substackcdn.com/image/fetch/$s_!bCSQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fddffc676-68f3-42b1-8380-b6f2091580c2_1351x737.png)

_Uber’s Minion system: web interface’s appearance_

Code Inbox:

[

![](https://substackcdn.com/image/fetch/$s_!58dy!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F90fea6f1-4615-484a-a93e-589a6ad921b7_1456x901.png)

](https://substackcdn.com/image/fetch/$s_!58dy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F90fea6f1-4615-484a-a93e-589a6ad921b7_1456x901.png)

_Uber’s Code Inbox_

Smart Assignments as a neat feature of Code Inbox:

[

![](https://substackcdn.com/image/fetch/$s_!mJYV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F61073e2b-f26c-4421-8d3d-60c381c1b492_956x692.png)

](https://substackcdn.com/image/fetch/$s_!mJYV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F61073e2b-f26c-4421-8d3d-60c381c1b492_956x692.png)

_Smart assignment settings for Code Inbox_

Risk Profiles: another smart feature inside Code Inbox:

[

![](https://substackcdn.com/image/fetch/$s_!dbo4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F411ad35f-d8ea-470f-b480-82fc0bcce7bc_996x812.png)

](https://substackcdn.com/image/fetch/$s_!dbo4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F411ad35f-d8ea-470f-b480-82fc0bcce7bc_996x812.png)

Code Inbox estimates the riskiness of a code change, and brings attention to it

uReview, Uber’s AI code review tool:

[

![](https://substackcdn.com/image/fetch/$s_!4R6L!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb907a1b0-8a71-4baa-a9e2-0b895d82cc06_1456x1007.png)

](https://substackcdn.com/image/fetch/$s_!4R6L!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb907a1b0-8a71-4baa-a9e2-0b895d82cc06_1456x1007.png)

AI’s comments can be rated by usefulness

Autocover and Shepherd for large-scale migrations:

[

![](https://substackcdn.com/image/fetch/$s_!DvQf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce6bee21-20ea-476f-a2f7-6705c8cd8a12_1456x1352.png)

](https://substackcdn.com/image/fetch/$s_!DvQf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce6bee21-20ea-476f-a2f7-6705c8cd8a12_1456x1352.png)

Shepherd generates a pull request using a Minion AI agent. Part 2 of the diff (pull request) generated, with code changes

**Uber is a good case for learning how much of internal developer infra needs to be rebuilt in order to work well with AI agents.** Uber built all the tools above because they needed new, better ways to integrate AI agents into the developer workflow, but couldn’t find anything that worked up to requirements. I’d also point out how much time and effort Uber invested in making code review more efficient. Devs are, indeed, getting overloaded with AI code reviews and Uber’s Code Inbox tries to separate the _important_ pieces of code to review from _unimportant_ ones.

**Startups are jumping into using AI agents, although their integrations are more basic.** In preparation for the keynote, I talked with several startups about their AI usage. Harnesses like Claude Code, Codex, Cursor, OpenCode and others are popular, and I also noticed most startups are heavily integrating AI agents into Slack, so devs can kick off bugfixes or small feature requests straight from the chat tool.

I observed startups being the most likely to experiment with new AI dev tools; from code review, all the way to AI incident management tools.

**“Traditional” companies are also heavily investing in AI dev tools.** At the recent Pragmatic Summit in San Francisco, Laura Tacho [shared](https://newsletter.pragmaticengineer.com/i/188235220/2-data-vs-hype-how-orgs-actually-win-with-ai) interesting details:

-   In February, 18,000 Cisco developers used Codex for complex migrations, code review, and refactoring. This was _very_ early – Codex was just starting to gain industry-wide adoption!
    
-   JP Morgan Chase built a multi-agent framework for annotation, using multiple specialized agents to label customer interaction data, and judge agents to aggregate and rank results. These are pretty advanced use cases!
    

In general, “traditional” companies do not seem to be lagging behind in using, paying for, and adopting AI agents and AI developer tools.

There are trends I’ve observed around the adoption of AI dev tools: