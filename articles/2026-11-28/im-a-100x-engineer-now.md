---
title: "I’m a 100x engineer now"
source: "https://veszelovszki.com/a/tpe/"
publishedDate: "2026-11-27"
category: "design"
feedName: "Sidebar"
---

![Selfie of me holding a paint roller in the kids' room, with a laptop showing code behind me](https://veszelovszki.com/blog/tpe/painting.webp)

After 30+ years of coding the old-fashioned way, I’m _extremely_ enthusiastic and about **100x faster** with AI! It has changed my entire workflow, and my life. While I’m writing this, I’m painting the kids’ room. Claude helped select the type and color of the paint, calculate the amount of paint I needed, and look up where to buy it. _I_ made all the decisions, I _own_ everything that happened, while Claude did the research and prepared the decisions for me. That’s also exactly how I work.

Today, while I’m painting, Claude is fixing bugs, developing features, and preparing a release. I’m even considering getting a day job because I could now run my current project, [Cmdr](https://getcmdr.com/), in an hour a day, agents carrying the rest. What a time to be alive!

I’ve coded for 36 years. I started at 6, professionally at 16. I founded and ran my startup as CTO for 5 years (CodeBerry, a coding school, 200k+ students taught, $1.8M raised, ~50 teammates), worked 3 years at [Sourcegraph](https://sourcegraph.com/) building coding assistant Cody, the predecessor of [Amp](https://ampcode.com/). I’ve been on sabbatical since Jan 2025.

These days, I build [Cmdr](https://getcmdr.com/) (pronounced “commander”), a two-pane file manager for macOS written in Rust + Tauri + Svelte. It’s two things: a solid and fast traditional file manager, spiritual successor of Total Commander, _plus_ an AI-first file management tool with a built-in agent. Free for personal use, [source code available](https://github.com/vdavid/cmdr). Try it. It’s lovely.</ad>

## Speed!

Lines of code is far from a perfect metric to describe complexity but, you know, it’s easy to measure and it _kinda_ correlates with complexity? Also, AI-written code is famously more verbose than human-written code. Let’s say it’s as much as 50% more verbose. Fine. It’s _still_ a whole different level. I’ll show you below. As imperfect a metric as it is, I’ll use it throughout this article because I think it’s still an _okay_ estimate for complexity.

An older snapshot of Sourcegraph’s main repo is still [available](https://github.com/sourcegraph/sourcegraph-public-snapshot) so I know that my average output on the days when I pushed code was **194 LoC/day** between 2022–2025. 194 sweaty, reviewed, production-ready code lines from my own little fingers—okay, with the help of GitHub Copilot. Without Copilot, it would’ve been… half of that, maybe? And these were my _active_ workdays. Weekends, sick days, meeting days are not counted. So, my real average output was closer to **100 LoC** per calendar day.

In contrast, I started Cmdr 10 months ago, and it’s 1.4M LoC now (+800k lines of translations, docs, etc.). That’s 1.4 _million_ lines of code. It’s not counting generated code, libraries, docs, etc. It’s 1.4M lines of actual code, most of it production, the rest being tests. That’s more than 4,500 LoC/day added _on average_, _including weekends_. Last 90 days average? ~9,700 LoC/day. Last 30 days? ~12,000. It’s speeding up. Discount it by 33% to compensate for the AI bloat, but consider that docs are on _top_ of this. Still what, like, **60x faster** than when I only used Copilot? And 80–100x faster than when I didn’t use any AI. (Yes, working in a team is different from running solo, but that’s part of my point—without AI, I’d _need_ a team, with all the overhead it brings, and with AI I don’t!)

Also, Cmdr is only my main project. Over the last 10 months, I also built [Prvw](https://getprvw.com/), a simple and delightful free image viewer ([135k LoC](https://gitstrata.com/github.com/vdavid/prvw)), a few libraries that support Cmdr ([mtp-rs](https://github.com/vdavid/mtp-rs) being [45k LoC](https://gitstrata.com/github.com/vdavid/mtp-rs) and [smb2](https://github.com/vdavid/smb2) [116k LoC](https://gitstrata.com/github.com/vdavid/smb2)), plus several side projects like [gitstrata](https://gitstrata.com/github.com/vdavid/gitstrata).

I mean, it’s just _completely nuts_, isn’t it? I can do in a _day_ what used to take me two or three _months_. I often explain it to non-coder friends with the example of a mason/handy person who has all the knowledge to build houses, from the ground up. Like, say this mason was building houses for three decades, each house taking a year. And suddenly, a cool robot appears that builds a house in a _week_. How cool and scary and exciting is that! And it’s _still_ getting faster!

![gitstrata chart of Cmdr's lines of code over time, with Opus releases marked](https://veszelovszki.com/blog/tpe/cmdr-loc-chart-2026-10-24.webp)

(live version at [https://gitstrata.com/github.com/vdavid/cmdr](https://gitstrata.com/github.com/vdavid/cmdr)).

But if you don’t like the LoC metric, fair, let me add:

-   1,674 [changelog](https://getcmdr.com/changelog/) entries over 10 months, each delivering a piece of user value. Increased from ~40/month in Jan–Feb to 230–350/month by Aug–Oct. (Fixes alone went 68 → 225 from Mar to Sep. It’s also because the app is getting traction so a lot more people are testing it now. Overall, Cmdr is in a period where the issue count was rising as a result of its launch, and is now going down steadily.)
-   12,005 commits (avg. ~55/workday, but increased from ~15/workday in Jan to ~160/workday in Oct, so about 10x!).
-   67 releases so far, 7–10 a month, so ~2/week at a steady pace.

A glimpse of how I work these days:

-   I use Claude Code with Opus 5.5 medium in a terminal, with a single 20x Max plan.
-   I write few-liner prompts and no specs.
-   I use zero skills.
-   I use radically fewer rules than six months ago. Agents need much less now.
-   I don’t read specs/plans. I do a QA at the end.
-   I never do code reviews.
-   Claude maintains my dev env, CI, and deployments.
-   I aim for grasping 100% of the product level, and 0% of the code level.

## Stages of AI use

The path that led me here was pretty much this:

1.  1990–2021: No AI assistance. I coded like monkeys and horses. An editor and my fingers baby.
2.  2021–2023: GitHub Copilot era. In conversations, I used to say it sped up my overall coding by **2x**.
3.  2023–2025: At Sourcegraph, I used our product Cody (since superseded by [Amp](https://ampcode.com/)). I also copied and pasted code back and forth between my IDE and ChatGPT. Neither was great, but they both helped some. This was the time when Stack Overflow started going downhill, and I’d say my speed was **3x** compared to no AI, thanks to LLMs generating larger chunks of code.
4.  In the second half of 2025, I used Cursor and then Antigravity, which were actually decent, and Antigravity gave an unfair amount of Opus use for like $10/month or something. I’d say it was a **4–5x** speedup total, by giving me better models and by editing my code directly. I still looked at every line it wrote, though.
5.  In Nov 2025, Opus 4.5 came out, I switched to Claude Code, and then it all sped up. It started writing code at scale. I stopped doing code reviews, but still manually confirmed each change, which was increasingly annoying but necessary because those LLMs were not that great yet. Still an increase to, say, **~7x** speed.
6.  Around Jan 2026, I found `--dangerously-skip-permissions`, enabled it instantly, and this unlocked **parallel agents**. Sometimes a dozen. My guess is that it was a **~15x speed** compared to my traditional baseline. Still, at this time, a lot of hands-on steering was needed: when Claude suggested a solution to a problem, I would accept it in maybe 40–50% of the cases. I more often chose option B or C, or an idea that the agent didn’t think of. Agents started working for hours without any interaction.
7.  During Feb–June 2026, I blazed through Opus 4.6, 4.7, 4.8, each adding speed, and I was fond of each one of them. They were awesome LLMs, the context window went up from 200k to 1M, my workflows simplified, and I used more and more parallel agents, subagents, agent teams, etc. These were like **20–25x speed** times. Agents worked for like 4–8 hours straight without me. I loved it.
8.  In July 2026, I took a big leap and started giving agents a bunch of API tokens, often full access, including to our private home devices. It was a _huge_ change! I don’t need to click on Google Cloud Platform UIs, AWS UIs, or Cloudflare UIs anymore. I tell the agent to swap out Plex with Jellyfin on our NAS, it does it in five minutes. Some devices like our home router have no API, so Claude drives a browser to use them. It even hacked our TV to enable some obscure dev mode so it can install apps on it remotely. Opus 5.0+ _can_ be trusted with such tasks, it makes very few mistakes. With this, the 1M context, some help from Fable, and other improvements that these new agents helped me put in place, I’d say I was at **40–50x speed** at the time, and agent ideas had an 80–90% acceptance rate. In this period, I [shipped](https://getcmdr.com/roadmap/) one or two major Cmdr features every week, and occasionally, an agent worked 12–24h without me.
9.  Sep 2026, Opus 5.5 arrived. OMG. I’ll talk more about the current stage below, but for a quick comparison, I currently accept what it suggests in 90+% of the cases, and my speed is the **80–100x** that I described above. I still live in the illusion that it’s _I_ who makes the decisions, but decreasingly so.

## Enter Opus 5.5: Fixing bugs by the dozens

I’m totally hyped up about this. With Opus 5.5, another new era started for me. On October 1, I first gave Claude a dozen issues at once. It went like this:

-   I told it pretty much: “Hey, I’m painting a room today, so I don’t have a lot of time to be at my computer. Could you find 10 smaller tickets on the board that you could do on your own?”
-   It looked and came back with “Yeah, I found 10.”
-   They were all cards that I’d decided about or were straightforward, so we could just knock them off. I said, “Get subagents to fix them, then reconcile, merge, and push it at the end, see if CI’s green. If you see any adjacent clear wins, feel free to scope them in.”
-   Claude shipped it in a few hours and closed the tickets. They were all internal issues, so no responses to real humans were needed.
-   Then I told it, “Nice work! Please take 10 more.”
-   “Yeah, I found 10 more suitable ones scattered on the board, plus a few extras in case these are not right,” said Claude, so I got it to do ~12 more issues. It delivered the same way.
-   In the third round, I told it, “Find 10 more issues, and I understand we’re probably out of simple ones, so if you need some upfront decisions, just list the decision points for me. Try to find stuff that are related—it’s mentally simpler for both of us to understand one problem space.”
-   It brought me 8–12 UI bugs as a single category, I made the initial decisions, and it knocked them off in a few hours again.
-   We then did a fourth round the same way. On some, I said something like “No, let’s skip this, I need more time to figure out what’s the best UX here,” and we only did the straightforward ones.
-   For the fifth round, I asked it to choose ~5 bigger issues because small ones got scarce. So it completed 5–6 bigger issues.
-   On 2026-10-01, [I closed these 42 GitHub issues](https://github.com/vdavid/cmdr/issues?q=is%3Aissue+state%3Aclosed+closed%3A2026-10-01) total. And this was only one session; at the same time, some more agents worked on larger feature development work!

Note that this was all bug fixing and feature development that _didn’t directly touch humans_. I’ll talk more about my principles of delivering AI-assisted creations to humans in a respectful way, but the gist is that I never want Claude to write human-facing texts, create UIs, etc. Where the issues included UI copywriting, Claude always brought the new strings back to me and I took five minutes to edit them before shipping.

## A word about trust

Some of the above might sound scary to some. I mentioned `--dangerously-skip-permissions`, passing Claude broad-access tokens to sensitive accounts, and giving it the passwords to our home devices. Is that risky? I mean, it is, to some extent. Prompt injection attacks, clumsy AI, rogue AI. Is it still the right tradeoff? To me it 100% is! I have guardrails, backups, off-site backups to mitigate the downside. And the upside is HUGE! So, call me reckless, and I respect your decision not to take this path, but then I keep my speed advantage, thank you.

I also put myself in the position where I need to trust agents with the coding side. Cmdr is Rust + Tauri + Svelte. I’d never done Rust before. Or Tauri. Or Svelte. Go was the first language that I learned in the AI era, 5 years ago, at the time when I used GitHub Copilot. That was miles behind today’s tooling, but already enough to skip needing to learn Go’s syntax well. But at least I _read_ the Go code. Now with Cmdr, I hardly ever see the code. I mean, over 36 years, I’ve seen a bunch of flavors of code, believe me, and Rust code is _code_, so I grasp the essence, but I wouldn’t remotely be able to code Rust on a whiteboard. Same with Svelte: how does it do its state management? Does it use one- or two-way bindings? No idea. I know Svelte files are JS+HTML+CSS, but that’s pretty much it.

## Let’s talk about slop

If you’ve read the stuff above and now think “well, you sloppy f\*\*k”, I feel you. I hate AI slop as much as the next Hacker News commenter. And I’ve thought a lot about how I can create stuff at speed _and_ stay safe _and_ respect people. I’ll talk a lot more about respect further below, so let me talk about staying safe here.

When I developed [mtp-rs](https://github.com/vdavid/mtp-rs), a Rust lib that talks to Android phones via USB _several times faster_ than any library before it, the ultimate test was whether it could talk to devices without data corruption, unexpected disconnections, and transfer failures. And when I first built it with Claude in two days, it didn’t work at first. It needed months of love from me and others, and tests with my Pixel, with my wife’s Samsung, and with a bunch of other people’s [weird devices](https://github.com/vdavid/mtp-rs/issues/6). So, was it slop in the beginning? I mean, _yeah_, and the tests proved it. Is it slop now? Nope. It works pretty reliably with all sorts of devices, and I copy my family photos with it every month, at crazy speeds! And one thing I never had to do to achieve this is read the code.

Similarly, I put 10 months of full-time love into Cmdr, and it was annoyingly buggy in the beginning. After 10 months, it feels pretty solid. It safely handles all sorts of weird data transfer edge cases between an ADB-mounted phone on your desk and your 12-year-old SFTP server in Tajikistan, without corrupting your data or doing weird stuff. It gives value to people, and it _feels_ right for them. It _doesn’t matter_ whether someone’s fingers or Claude typed out the internals.

So, how do I ensure that the internals are right, even without seeing the code?

The answer is **guardrails** and frequent **architecture upgrades**. About 40–50% of my time goes into improving the tooling and the structure.

Over time, I’ve added **159 checks** to verify certain aspects of the code. It’s mainly test suites, linters, and Go scripts. Examples:

-   A check to ensure that the TypeScript/Rust bindings are up to date.
-   A check that runs ~11,500 Rust tests.
-   A check that runs hundreds of E2E tests in 3 parallel app instances.
-   Custom scripts that check that every new string is translated to all 15 languages.
-   `gocyclo` with max. complexity of 15, and its equivalents for TypeScript and Rust.
-   And one that checks that no `CLAUDE.md` is over 600 words.

The checks flag bad code and overcomplicated code. I have checks to make sure that no file or module grows too big, except if it’s on an allowlist with reasoning, which is always possible, and today’s agents don’t abuse this anymore.

In September alone, agents ran 104,000 checks, encountering 2,200 failures, almost all of them caught before they hit CI.

To maintain this bar, whenever I’m fixing a bug, I try to structurally eliminate _that whole kind of bug_. This process adds a check or two every week. Example: on the day of writing this, a dead-code audit found five unused Tauri commands. We added a new check (`desktop-ipc-unused`) which found a total of 37 such problems and the agent fixed them, so this kind of problem is impossible now.

I periodically put effort into making the checks _super fast_ too. All 159 checks currently finish in about 20 minutes on my computer, but I also have “fast” and “standard” suites that are ~20 seconds and ~5 minutes, respectively.

![Terminal output of Cmdr's fast check suite](https://veszelovszki.com/blog/tpe/check-fast.webp)

Even with the latest agents, the code would become very messy without such checks in place.

This implies that no non-dev can do what I’m doing. Yet. Agents are getting close to being good enough so that smart non-coders can just do this. I still need to steer Claude to add the right checks, keep code modular, maintain a good architecture, etc.

About good architecture: From time to time, I browse the file tree of the project to spot stuff that looks off (huge folders, tiny folders, discrepancies between front-end and back-end structure, inconsistent/weird naming, etc.) and make an effort to make it _feel_ nice, modular, etc., so agents don’t get lost in the complexity. Also from time to time, I ask my agents to fix an example bug and record what they’re reading during that, how much garbage, overly verbose info, stale info, missing info, and other noteworthy things they bump into. Then we iterate. And we often do big sweeps on the codebase to streamline stuff.

(A word to software engineers working on critical systems: **Your systems are different.** I would not program our family car or my donkey’s pacemaker this way, or advise anyone to do it. For critical systems, the safest bet is still for a human to understand the code. I’d expect this to change in a year or so with new LLM versions, though: humans are just as non-deterministic as LLMs, and just like with self-driving cars, a tipping point exists when the LLMs simply make fewer coding mistakes than the human coder. Anyway, for now, this article is mainly about non-critical systems.)

## Context, CLAUDE.md

One more cornerstone of making Claude work at my scale is to use colocated `CLAUDE.md` files throughout the codebase. These are auto-loaded by the Claude Code harness, and that always gives my agents contextual knowledge wherever they work, without populating their context too much. In the Cmdr codebase, for a fresh agent to assemble pretty good knowledge for fixing a bug or advising about a new feature in a certain area, it would use about 80–130k tokens of context. I think it’s not too bad for a codebase this size.

Also, at some point when my `CLAUDE.md` files got too big, I split them into `CLAUDE.md` and `DETAILS.md`. `CLAUDE.md` files have an enforced limit of 600 words, and `DETAILS.md` has no limit currently. `DETAILS.md` is not auto-loaded. Agents are encouraged to read it on demand, and not as a whole but by searching for extra information they need about the area.

This system feels efficient and scalable. 210k lines of docs, ~10% of the codebase, all written for agents. The only two files that are written for humans are `README.md` and `CONTRIBUTING.md`.

## Why I can work so fast and you probably can’t

My weakest skill in the coding space right now is _teamwork in the agentic era_. I haven’t worked in a team for 1.5 years, and I know little about the specifics of how people work in cutting-edge teams these days. But I know that at a multi-person org (where 99% of sw engs work), you as a single engineer won’t contribute 10k lines of code per workday in a project because you need to coordinate with other people. You need to be somewhat careful, loop in some people on what you’re doing, get up to date with what others have done, build common mental models of the system, and maybe even _review code_. This all needs focus and time. My advantage as a solo eng is that I don’t have any of that overhead.

(Side note: There is a dark side of this sort of AI use that I’m doing. I don’t have the space to go into the details here, but my short summary is that [the opportunity cost of sleep is high](https://steve-yegge.medium.com/the-ai-vampire-eda6e4f07163), weekly token resets dictate a certain pace which doesn’t always fully align with life, the slot machine of random promotional quota resets brings more rollercoaster effects, and in general, this is the closest in my life to understanding what the life of a heroin addict might be. The lack of sleep does add up and it’s unhealthy. If you’re in a similar situation: take care of yourself.)

Now, let’s see where all that time saved should go.

## Moving up the abstraction ladder

Lately, I feel a lot more like a product person and company leader than a software engineer.

When I tell people what I do, I still say “I code” out of habit, but do I really?

All that stuff that _needs to be done_ to deliver software hasn’t changed compared to five years ago. This all still happens:

1.  **Company strategy** is created. **Capturing user preferences** happens.
2.  **Customer issues** flow in. **Issue tracking** exists. **Prioritization** happens.
3.  **Research** happens. **Feature development** happens. **Fixing bugs** happens.
4.  **Linters and tests** run. **Security issues** are checked. **Deployments** happen.

However, _all_ of these are _at least partially_ done by agents. In the above list:

-   I do most of #1 and some of #2.
-   I do almost nothing of #3 and #4.

The _time_ the raw coding work needs from me is _dramatically_ different. I have a lot more time for the high-level stuff!

Think about it. Traditionally, a lot of the engineering work was coding: figuring out how to realize some requirement with code. Sometimes entire days went by tracking down a bug, figuring out how to make something work the way I wanted. That all took a _lot_ of time, and it left little for figuring out _what_ to do. And you know, I _enjoyed_ coding. Coding itself felt meaningful. And I let other people decide which features to build. We called them “product people”.

What’s changed now is that **I don’t need to do all that time-consuming work** because Claude does the coding, the debugging, the feature development, and it automates processes, translates strings to 15 languages, does almost all the dirty work. And _all that time_ can go into **strategy** and **product decisions** and **marketing** and **customer service**. Which means **caring about the user and the product**.

I find the focus to think deeply about product and business questions. For example, setting the business plan and finding the right licensing/pricing/packaging [structure](https://getcmdr.com/pricing/) for Cmdr was damn hard, and it needed some focused days of thinking. And this is where most of the user value is.

As a result, I am aiming to be an expert on the _product_ itself. I use it every day. I develop it every day. I know _all the parts_ of the app, I know exactly what each part can do and why. Every button, every dialog. But I don’t know the _code_. I think it’s the respectful thing for me to know the product as I’m shipping Cmdr to _people_, but I don’t want and don’t need to know how the sausage is made.

![Cmdr's dialog for connecting to S3-compatible storage](https://veszelovszki.com/blog/tpe/s3-dialog.webp)

I built the S3 connect feature in two days while painting the room. 50k LoC, fully tested with 7 providers. Displays transfer costs based on current list prices. How nice is that? ❤️

And that brings us to the topic of respect.

## Quality as a form of respect

I think the distinctive feature of Cmdr among the 80+ file managers that exist for macOS is the amount of **human touch** added to it. When developing Cmdr, all I think about is **quality**, and I see quality as an expression of **respect**. It’s traditionally difficult to make quality software because the last 10% takes 90% of the time. But these are _not_ traditional times, and time is way less scarce now! What’s a better place to put it than raising the quality bar?

The _opposite_ of quality is slop. And by respect, I mean avoiding sloppy output, human-made or otherwise. Within that, I think it’s extremely impolite to put AI-generated content in the face of humans. My principle is that all human-facing content must be created and/or critically reviewed by a human, and owned by a human.

For this article, I asked Claude to help with research, numbers, screenshots, and typo sweeps, but I wanted _zero_ words from it. I think this is the _only_ right way to create with AI.

In the case of my work, the same principle manifests in putting a lot of human focus on:

-   a solid feel to the entire app
-   data safety and the user’s privacy
-   respectful resource use (CPU, RAM, disk)
-   careful selection of features and assembly of the menus, dialogs, and other interfaces
-   delightful UX/UI: going the extra mile to ensure that the whole experience is nicely cushioned
-   accessibility (app works with a mouse or keyboard, and for people with special needs and preferences)
-   human-written labels, tooltips, error messages, and other copy in the app
-   human-chosen colors, layout, spacing, fonts, etc.
-   manually edited website content, `README.md`, `CONTRIBUTING.md`, privacy policy content, etc.

See also my [AGENTS.md#principles](https://github.com/vdavid/cmdr/blob/main/AGENTS.md#principles) that all my agents read.

Claude can write the code and internal docs, I don’t care, because only agents read those things.

(One gray area for me is translations because Cmdr is translated into 15 languages, and I don’t speak all of those languages. Cmdr doesn’t have the budget yet to loop in humans for all reviews. But I want to get there eventually. The system already tracks what strings have been reviewed by a human, it’s just currently at 0% for all languages.)

## Build vs. buy dilemmas of the future

Does it still make sense to write software? Coding is getting faster and cheaper for everyone. When will we get to the point where people can just build the software they need for themselves, on demand, even throwaway-style?

For now, it depends on complexity.

-   Short Python scripts already have zero value. Agents write them on the go, not even caring to save them.
-   Web page for picking your kids’ room color? Claude can build it in 2 minutes, including deploying it to a URL. Just [tried it](https://claude.ai/artifact/1dGWC4vAtdwUxfoM9hMTVk) yesterday. Nicer than what I could’ve done in an hour.
-   [Pocket](https://getpocket.com/) (RIP) alternative that imports your saved URLs and syncs live to your server? An hour for an agent, probably?
-   A tool to display git repo history [like gitstrata](https://github.com/vdavid/gitstrata)? Takes a day or two, depending on how elaborate you want it.
-   A file manager with all bells and whistles? Takes months for now.

You won’t wait an hour to get Pocket rebuilt every time you want to save a new article, but the same applied to Python scripts just two or three years ago. Maybe in a year we _will_ get our Chrome extensions rewritten every time we click the button, or our file manager built on the fly in five years (assuming that some people will still want to manage files).

I see no great way to prepare for that as a software engineer. But I do my best to lean into it: Cmdr has no plugin system but it’s source-available. As long as you hold a license (Cmdr is free for personal use but paid for companies), you can bring your favorite agent and change your Cmdr any way you like, then ask the agent to rebase it on latest `main` on the 18th of every month to keep it up to date with security fixes. Done. Extensibility by agents. Get Cmdr, save 10 months of building with it, then customize it to your needs. Today this is much more viable than writing your own file manager.

Overall, I’m extremely, extremely glad and thankful to be alive at this time and to be able to work with this tooling! It’s incredibly rewarding. It’s an unbelievably nice feeling that I can turn the “100x engineer” advantage into delivering quality apps with care and respect. It’s just hard to choose to get some sleep, too.