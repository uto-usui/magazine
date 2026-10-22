---
title: "AI Writes, Reviews, and Tests My Code. My Job Now Is to Taste It"
source: "https://tech.layerx.co.jp/entry/engineer-as-director-en"
publishedDate: "2026-10-21"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "khanake"
---

I've pretty much stopped reading the code AI writes for me.

On a typical day, about 13 PRs (pull requests) go up. If I read every line of every one, I'd be the bottleneck. So I stopped. My team still reviews it, and QA still tests it after that.

Then one day, six AI agents were reviewing one of my changes. Every comment sounded reasonable. Nothing was throwing errors.

Something nagged at me, so I opened the file named in the review notification.

Wait... did I ask for this change?

The AI had been reading code that didn't contain a single line of my change.

I don't write the code. I don't read it. And PRs keep going out every day. So what exactly am I doing here?

* * *

I'm Hanake, an engineer working on Ai Workforce at LayerX. Ai Workforce is a product that lets companies hand their work off to AI agents.

Over the past two years, the way I build software has changed almost completely. These days, AI agents handle nearly all of it: the tickets, the code, the reviews, the QA.

Here's what that looks like in numbers. Over 16 business days (September 24 to October 16, 2026), 211 of my PRs were merged into main (the branch headed for production). Assuming eight-hour workdays, that works out to roughly one every 36 minutes, though of course many were running in parallel. Even I was a little alarmed when I counted. Two years ago, I'd have said one merged PR a day made you a fast engineer.

Let me say this up front: this is how I work on the parts of the product I own. It only holds up because my team's reviews and QA are there, so I'm not suggesting every team copy it.

## TL;DR

-   I hand almost everything to AI, from ticket to merge to QA in the dev environment (four skills: `/ship`, `/plan-checker`, `/pr-checker`, and `/devqa`)
-   I don't read the code line by line. Instead, I look at what the AI checked, what it committed, and the thing it built. About 90% of PRs get a colleague's approval before merging, and the QA team checks everything before it reaches production
-   Not reading the code has bitten me (six AI reviewers once reviewed the wrong code), so I changed how I work

## The usual flow

Here's the flow I put together on top of my team's review process. I call the AI agents my "crew."

![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/khanake/20261021/20261021165628.png)

The flow from ticket to production. Top lane: humans. Bottom lane: the crew (AI agents).

Under the hood, it's a handful of Claude Code skills (think of them as playbooks you hand to the AI). For part of the review, I also mix in OpenAI's Codex so the two cross-check each other.

### Pick it up, hand it off, let it run

The workhorse is a skill called `/ship`, which takes a ticket all the way to merge in one go. Our PMs (product managers) have AI write the tickets and stack them up in Notion. I pick one and hand it to `/ship`.

From there, it investigates, implements, tests, opens a PR, fixes CI, replies to review comments, and merges once the review passes. It makes small calls on its own within limits I've approved in advance, then reports back on what it decided.

The one thing it doesn't get to decide on its own is the spec. If it can't meet the acceptance criteria, if it clashes with the existing design, or if there are several options for customer-facing behavior and no clear reason to pick one, it hands the ticket back to the PM and stops, even halfway through. When it's not sure, it asks itself one question: would the PM look at this PR and say, "I never decided that"?

Harder tickets (a DB migration, anything touching authentication or authorization, changes that span packages, or a problem with several reasonable approaches) get one more step before any code is written. For those, a skill called `/plan-checker` (built by the team) writes an implementation plan first. Finding out after the code is written that the premise was wrong is the most expensive way to fail. So other agents review the plan for security, performance, regressions, and so on, and the plan gets revised before anyone writes a line of code.

Once there's code to review, a skill called `/pr-checker` takes over. The team keeps improving it, and I mostly just use it. It reviews the change from several angles in parallel, then has a separate agent challenge every finding ("Would that actually happen?") before anything gets fixed. AI reviewers are, every so often, spectacularly confident and wrong.

On busy days, I have ten of these jobs running in parallel, each in its own tmux pane.

### Where humans come in: approvals, and right before prod

By the time a PR is ready for human review, `/pr-checker` has already been over it several times, with fixes between rounds. On top of that, about 90% of those 211 PRs were approved by a colleague. My colleagues, to varying degrees, leave most of their first-pass review to AI too.

The other 10% or so are merged without human approval, and only when all three hold: they meet conditions the team agreed on, nothing in our contracts rules them out, and AI review judged them low-impact. Exactly where to draw that line is something the team is still discussing.

Once a PR is merged, a skill called `/devqa` runs the scenarios from our QA test guides in the development environment (dev). It skips the UI and drives agent conversations and workflows end to end, and when it finds a bug, it files the ticket too. Over nine days in early October, it caught seven issues before release. Good job.

Merged doesn't mean shipped. Before release, everything goes through a final check by the QA team.

### The other reason I don't read it

Besides the volume, there's one more reason I don't read the code: the AI's code is good.

For the kind of work I do, Claude Opus 5.5 (Anthropic's AI model, as of October 2026) often writes better code than I've written over the years. Faster, too. After more than ten years of writing code, that stings a little.

Still, if something goes wrong, I'm the one accountable. And not reading shifts more of the review load onto my colleagues, so the least I can do is note in each PR which findings I chose not to act on, and why.

## The lights-out factory

In the summer of 2026, "software factory" was a term I kept hearing in tech circles outside Japan, usually alongside an argument about whether to leave the lights on.

In "[Software Factories, Light and Dark](https://addyo.substack.com/p/software-factories-light-and-dark)," Addy Osmani uses "dark factory" for one where code ships without any human reading it, verified only by machines. The name seems to come from manufacturing: a plant with nobody on the floor can run with the lights off. The other kind, where people read the code and stay involved in design and product decisions, is a lit factory.

Run agents in parallel, pour work in, pass it through review, ship it out: we've been drifting toward something like that. But the lights are off only at my desk. Past that, colleague approvals and the QA team keep the lights on.

In "[Why Software Factories Fail](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md)," Dex Horthy of HumanLayer writes about actually turning the lights off in the summer of 2025. The site went down, and they had to dig through a codebase they'd stopped reading months earlier. The outages kept coming, and in the end they rewrote it by hand. The last piece of advice in his closing list: "Read the dang code." As someone who doesn't, it really hits close to home.

Horthy also argues for moving planning earlier so human review gets cheaper. That part is close to what `/plan-checker` does. Before any code is written, the plan is only a few pages long, and you can actually read it. But Horthy never says that means you can stop reading the code. Taking that extra step is my own call.

The same question comes up inside our team. Our backend team leaves almost all of the first-pass review to AI, and even so, when we talked about automating the whole thing, some colleagues said they still wanted to read the code to check its quality. Yeah, fair. How much humans should read is still an open question.

Which leaves a practical question for me: if I'm not reading the code, what do I do when something breaks? I have the AI read the logs and the code, and then I grill it. Which path did the request take? Where is the state held? Then I go over the explanation carefully to see whether it accounts for every other symptom too.

Recently we had a bug where tool calls failed only when they went through one particular path. I had the AI dig in. It tried the tools one by one and came back with the cause and a workaround. I poked at the explanation, looking for holes, and cross-checked it with what my colleagues had found. (It was a little funny that everyone's report started with some version of "So, my agent says...")

Maybe the reason I can ask those questions is that, even without reading every line, I still have a rough picture of the system's shape in my head. It seems to form on its own, from design docs and from the logs I end up staring at every time something breaks.

## Lights off. Watch your step

But with the lights off at my desk, sometimes I can't see where I'm stepping.

A week before the six agents reviewed the wrong code, something similar happened. A file the AI was supposed to have edited in a worktree (git's feature for checking out several working copies at once) had somehow landed in the main working tree instead. The commit went through, but the file that mattered wasn't in it.

I noticed two hours later, when a test failed. On top of the commit that was missing that file, four more commits had piled up as if nothing were wrong.

A week later, worktrees got me again. Another session I was running in parallel switched the branch in the main working tree. Three reviewer agents and three verifier agents read code that didn't contain a single line of my change and handed back perfectly plausible results. That's the story from the top of this post. The whole review round had to be redone.

Both times, I'd have caught it sooner if I'd actually looked at the diff.

Since then, longer tasks go into their own worktree from the start, so no other session can switch the branch out from under them. After every commit, I run `git show --stat` and check the file names and line counts.

What I've started watching isn't the code. It's what the AI read, and what it committed.

The other thing I've started watching is the product itself, on screen.

`/devqa` is fast and consistent across runs, so I can't do without it. I can't try everything myself, but when something nags at me, I go and click around, even after every check comes back "Verified."

When we built an agent that walks users through the initial setup of a feature, we had AI come up with the first version. We tried it internally, and it worked. But every "ooh, it could also do this" idea had made it in, and you couldn't tell what the agent was actually for. The tests, of course, all passed.

Then the PM sat down with it and rebuilt it into something that felt good to use. Now the PM and I use it together and decide what stays.

## The head chef tastes the food

So if I'm not writing the code, and I'm not reading it, what am I doing?

A hint came from game director Hideo Kojima. In episode 9 of his Japanese-language podcast, Koji10, "[Hideo Kojima's Approach to Game Creation (小島秀夫流 ゲームの作り方)](https://open.spotify.com/episode/6p9sio7X9aavy58T4LlJMT)," he compares his job to a head chef's. He goes around tasting what each team is cooking, then lines the dishes up the way they'll be served and eats them in order. If meat comes after meat, he swaps one for fish.

That's close to what I do. The crew does the cooking. I taste. If something's off, the PM and I rethink the menu.

I'm still figuring out how to taste, and how to make those calls visible. For a start, I'd like every PR to record what we decided and what we checked. And we still haven't settled where the no-approval line goes.

* * *

Since I stopped reading code, I think I spend more time actually using what we build.

Earlier today, I was tasting a dish the crew had served up with total confidence, and I paused mid-bite. The service was as smooth as a three-star restaurant's. The plating was beautiful. But something nagged at me...

Is this the dish I asked for?

## We're hiring!

On the Ai Workforce team, we're trying out this way of building: AI does the writing, and humans handle the judgment and the tasting. We're looking for engineers (or, apparently, chefs) who'd like to figure this out with us.

If this sounds even a little interesting, come have a casual chat with us.

-   Ai Workforce careers: [https://jobs.layerx.co.jp/business/aiworkforce/](https://jobs.layerx.co.jp/business/aiworkforce/)
-   Casual chat: [https://jobs.layerx.co.jp/opendoor/](https://jobs.layerx.co.jp/opendoor/)