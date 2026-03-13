---
title: "Cognitive debt"
source: "https://acairns.co.uk/posts/cognitive-debt"
publishedDate: "2026-03-11"
category: "design"
feedName: "Sidebar"
---

Your team is shipping faster than ever. Pull requests are flowing. Features land in days that used to take weeks. Something feels off though. The code works. But nobody knows _how_ it works.

This is cognitive debt.

## [#](https://acairns.co.uk/posts/cognitive-debt#the-delta)The Delta

There are two lines worth paying attention to right now.

The first is code volume. We're producing more code than ever. Code you'd normally spend time designing for a bit, work out its interface, what it needs to do, figure out the right responsibilities, maybe write a test first, now turns up fully formed from a prompt. Methods and all. It's there before you've finished thinking about the problem.

The second is comprehension. How much of that code does your team actually understand? This line isn't keeping up. It's falling behind as the first one pulls away.

The space between those two lines is cognitive debt.

## [#](https://acairns.co.uk/posts/cognitive-debt#not-technical-debt)Not Technical Debt

You've heard of technical debt. Most teams live with it. Technical debt is code you _know_ is bad. Shortcuts you chose to take, corners you consciously cut, with a plan to come back later. You can point at it. You can put it on a backlog.

Cognitive debt is different. It's code you don't even know is bad, because nobody understands it well enough to judge. You didn't choose to take it on. It accumulated silently, one accepted suggestion at a time.

Technical debt lives in the codebase. Cognitive debt lives in your team's heads, in the gaps between what the codebase does and what anyone can actually explain.

## [#](https://acairns.co.uk/posts/cognitive-debt#how-it-accumulates)How It Accumulates

When you write code by hand, you build understanding as a side effect. You wrestle with the problem, try things that don't work, and arrive at a solution you can explain because you lived through finding it.

When AI writes code for you, the code appears fully formed. It compiles. It passes tests. You read it, it looks reasonable, you merge it. But the understanding was never constructed. The struggle that would have made you the expert on that piece of the system was skipped.

Peter Naur [wrote in 1985](https://pages.cs.wisc.edu/~remzi/Naur.pdf) that a program is not its source code. It's a mental model, shared between the people who built it.

> the theory built by the programmers has primacy over such other products as program texts, user documentation, and additional documentation such as specifications.

For Naur, the theory comes first. The code comes second. Understanding why the code works one way, and not the other. What was tried. What was rejected. None of that made it into the code. It only ever lived in the heads of the people who thought it through.

When AI generates the code, that reasoning doesn't happen on its own. The code is there, but the mental model isn't. Not unless you make a point of building it.

## [#](https://acairns.co.uk/posts/cognitive-debt#the-warning-signs)The Warning Signs

Cognitive debt doesn't show up in failing builds. It's subtler than that.

Review times drop. Not because anyone got careless, but because there's more code coming through than anyone can thoroughly read. _"It passes tests"_ starts doing the job that a proper review used to.

Incident response slows down because nobody can trace the logic through code they didn't write. When you don't understand the code you're debugging, fixing it takes two or three times longer than it should.

Onboarding breaks down. New engineers can't learn from teammates who don't understand the system themselves. _"Ask the person who wrote it"_ falls apart when the answer is _"Copilot wrote it."_

![](https://acairns.co.uk/posts/cognitive-debt/copilot-human-slop.png)

And code gets rewritten more than it should. Someone accepts a generated function, moves on, and three weeks later when the requirements change, nobody can figure out how to modify it. So they rewrite it from scratch.

There's a thing nobody talks about enough: parts of the codebase that nobody wants to touch. Not because the code is bad, but because nobody knows what it does. That reluctance is cognitive debt making itself felt.

## [#](https://acairns.co.uk/posts/cognitive-debt#the-three-stages)The Three Stages

[Allstacks](https://www.allstacks.com/blog/comprehension-debt-the-hidden-cost-of-ai-generated-code) describes three stages of accumulation. The progression makes a lot of sense.

The HoneymoonDay 1–30

“Look how much we're getting done.”

In the first month or so, everything is fine. The team has full context. AI is speeding up work they already understand. Fast output, low risk.

The DriftMonth 1–6

“It’s been reliable enough so far.”

Between months one and six, things slip. The output keeps landing, so you stop double-checking every line. That’s natural. But the gap between “this works” and “I understand why this works” widens without anyone noticing.

The CliffMonth 6+

“I don’t really know how this works anymore.”

After six months, you hit the wall. Your team can’t confidently change the code you own. When something breaks, you’re not debugging. You’re guessing. And then you’re reverse-engineering your own system.

## [#](https://acairns.co.uk/posts/cognitive-debt#the-trust-paradox)The Trust Paradox

Here's the part that makes this hard to address. Stack Overflow's developer surveys found that trust in AI coding tool accuracy [dropped from 43% to 33%](https://stackoverflow.blog/2026/02/18/closing-the-developer-ai-trust-gap) year over year. In that same period, [usage went _up_ to 84%](https://survey.stackoverflow.co/2025/ai/).

![](https://acairns.co.uk/me/thinking.svg)

We trust it less but use it more?

This makes sense as the tools are genuinely useful. But _"useful for generating code"_ and _"I understand what it generated"_ are not the same thing. The more comfortable the workflow becomes, the easier it is to skip the understanding part.