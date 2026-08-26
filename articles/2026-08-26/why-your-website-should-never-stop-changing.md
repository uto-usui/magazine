---
title: "Why Your Website Should Never Stop Changing"
source: "https://smashingmagazine.com/2026/08/why-website-should-never-stop-changing/"
publishedDate: "2026-08-25"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Pierre Burgy)"
---

-   8 min read
-   [Tools](https://smashingmagazine.com/category/tools), [Design](https://smashingmagazine.com/category/design), [AI](https://smashingmagazine.com/category/ai)

Every website peaks on launch day and slowly drifts from there, not because it breaks, but because nobody has time to keep it current. Autonomous websites, continuously optimized by agents after launch, aim to change that. But take the idea seriously, and you quickly run into a problem that has nothing to do with technology: almost nobody wants a website that changes entirely on its own. Pierre Burgy shares what they learned building for full website autonomy and the deeper design problem they uncovered along the way.

Every website is at its best the day it ships. The final branch merges, the site goes live exactly as designed, and it is briefly perfect. It will never be this good again.

Not because anything breaks. The site keeps working. But the market moves, the messaging shifts, a competitor launches something, and the careful thing you built slowly stops matching the company it represents. A year later, it is a period piece. Not broken, just **behind**. Every team knows this decay, and almost everyone treats it as a law of nature.

It doesn’t have to be that way. A website could keep improving after launch instead of drifting away from its best day, **quietly optimizing itself** while the team that built it works on something else.

Picture it working: while you sleep, an agent catches that last week’s design-system change never propagated to the pricing page, and fixes it. Another finds a set of images shipped uncompressed in a rushed release and optimizes them. A third flags an accessibility regression a new component introduced, and either fixes it or leaves it for you to check. You wake up to a site that is measurably better than the one you left, and a short list of the few decisions the agents wanted your eyes on. That is the version worth wanting.

And the moment you take that promise seriously, you run into a problem that has nothing to do with the technology:

> Almost nobody actually wants a website that changes entirely on its own.

## Why “Just Make It Autonomous” Is The Wrong Goal

The obvious move, once you have capable agents, is to hand them the whole site. Let them write, edit, optimize, and publish, and get out of the way. It sounds like the natural endpoint, and it is the first thing most people picture when they hear “autonomous website.”

It is also the thing almost nobody wants once it is real in front of them.

We learned this the way you learn most things worth knowing: by building the opposite first. Building [Fimo](https://fimo.ai/), an autonomous website platform, we set out to make websites fully autonomous, assumed that was the goal, and then watched what people actually did with it. What they did was **hesitate**. Not because they distrusted the agents, but because a website has **no single owner**. Different parts belong to different people, and each one wants a different amount of autonomy. So the question was never whether to trust the agents. It was **where to draw the line**, and for whom.

Once you ask it that way, the work splits cleanly into three kinds.

## Most Of It Is A No-brainer

Start with the largest pile, because it is bigger than people expect. Most of what keeps a website healthy is rule-bound, repetitive, and completely joyless. Keeping accessibility compliant as pages change. Propagating a design-system update once a token moves. Catching a broken meta tag, an unoptimized image, a link that rotted when a URL changed three sprints ago.

None of this is where anyone’s talent lives. Nobody was hired because of their gift for spotting a missing alt attribute. This is the work you are actively relieved to hand off, and it is the work agents are best at, because it is **defined by rules rather than taste**. An agent that quietly keeps this layer correct across a whole site, unattended, is not a threat to anyone’s job. It is the tedious **eighty percent** finally taken care of.

Naming how much of the maintenance load actually lives in this pile is what makes the whole idea of an autonomous site feel less like a leap. You are not handing over judgment. You are handing over chores.

## Some Of It You’d Never Hand Over

At the other end sits the work you would not delegate at any price. It is a small pile, but it is the reason you exist.

An agent can check a new page against every rule you have given it. It can confirm the contrast passes, the heading order is right, the tokens are correct, the copy matches the style guide. What it cannot do is decide what the page should **feel** like, or whether the thing you are shipping is, in the **taste** sense, good. That judgment is exactly what you were hired for, and no amount of capability moves it off your desk.

This is the part people reach for first when they resist autonomy, and they are right to protect it. The mistake is thinking the whole site is made of this kind of work. Almost none of it is. But that small part matters more than all the rest, which is why automating everything feels so wrong.

## And A Lot Of It Depends On Who You Are

Between the chores and the untouchable sits the part no product can settle for you, because **the line runs through different places for different people**.

> Take one real change: making dark mode the default theme when someone lands on the site. An agent can do it in seconds. The question is who gets to decide it should happen at all. For the **designer** who owns the site’s identity, the default theme is not a setting; it is a statement about how the brand wants to be seen first, and they want that call. For the **developer** shipping the change, it is a one-line default with a clear rationale, the kind of thing they would happily let an agent apply and move on. Same change, same site, and the two of them draw the line in opposite places.

Notice what is happening there. It isn’t that one of them is cautious and the other reckless. It is that the same task carries **different amounts of judgment for each of them**. For one person it is a decision; for the other it is a chore. There is no default a product could ship that would be right for both, because **“right” is a function of where your value sits, not of the task itself**.

This is why the control has to be per-task and per-person, and why we stopped trying to find the setting that would work for everyone. There isn’t one. There is only the line each person draws, and the tools to draw it precisely.

## You Don’t Just Set The Autonomy: You Build The Agent

Once you accept that the **line is personal**, a toggle between “approve” and “delegate” stops being enough. Where the line sits depends on what the agent is actually doing, so the real unit of control is the agent itself.

This is where it stopped being a settings problem, and it is the shape Fimo took. You don’t pick from a fixed menu of behaviors. You compose the agents, deciding what each one is even allowed to touch. You can build one from scratch, or take one close to your needs and shape it to your own line: an accessibility agent you trust to run unattended, a content agent you keep close to anything brand-facing.

[![Fimo agents, such as content agent, translation agent, asset agent, and so on.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/why-website-should-never-stop-changing/fimo-agents.png)](https://files.smashing.media/articles/why-website-should-never-stop-changing/fimo-agents.png)

([Large preview](https://files.smashing.media/articles/why-website-should-never-stop-changing/fimo-agents.png))

And they don’t stay fixed. They learn from their tasks and from what you teach them, so the boundary you set last month isn’t the one you’re stuck with. What you had to approve then, you can delegate now, not because you lowered your guard but because the agent earned it. The line is not a setting you configure once. It moves as trust is earned, in the direction of less work for you.

## Start Narrow, and Widen As You Trust It

None of this means flipping a site to autonomous on day one. In practice it goes the other way. You delegate a little, watch how it does, and loosen.

And you can actually watch. Every agent’s runs, its history, its logs, and a before-and-after of what it changed are there to inspect. Trust doesn’t grow because you got used to the idea; it grows because you can see what happened and compare. The first time an agent quietly fixes something you would have missed, and you can see exactly what it did, the next delegation gets easier.

Deadlines keep you from becoming the bottleneck on what you have already handed over. If you don’t weigh in, the agent proceeds. You set the terms once, and you stop being the thing the whole site waits on.

## The Frozen Site Is The Real Risk

The worry people voice first is that an agent will change something on their site without them. Turn it around: **the real risk is a site that never changes at all**. A frozen site doesn’t stay safe. It just falls behind, slowly, in a way nobody notices until it represents a company that no longer exists.

> [The point of autonomy was never to remove you from your website. It was to remove the decay.](https://twitter.com/share?text=%0aThe%20point%20of%20autonomy%20was%20never%20to%20remove%20you%20from%20your%20website.%20It%20was%20to%20remove%20the%20decay.%0a&url=https://smashingmagazine.com%2f2026%2f08%2fwhy-website-should-never-stop-changing%2f)
> 
> “

The point of autonomy is to keep the launch-day version from being the best version, and to let you spend your judgment on the handful of things that actually deserve it, while the rest takes care of itself. Draw the line where your value is. Let the agents hold everything on the other side of it. And let the line move as they prove they can.

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)