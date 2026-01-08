---
title: "Ideas are cheap, execution is cheaper"
source: "https://davekiss.com/blog/ideas-are-cheap-execution-is-cheaper"
publishedDate: "2026-01-07"
category: "design"
feedName: "Sidebar"
---

Remember when coming up with a great idea was the easy part? Ideas were worthless. What was valuable was the commitment. The grit. The planning, the technical prowess, the unwavering ability to think night and day about a product, a problem space, incessantly obsessing, unsatisfied until you had some semblance of a working solution. It took hustle, brain power, studying, iteration, failures.

LLMs have shattered this long-held truth into a million pieces.

* * *

I’ve been writing code for 15 years. In that time, I internalized a simple truth: ideas are cheap, execution is everything. The ability to actually build something—to turn a napkin sketch into working software—was the thing that separated dreamers from builders. It’s what made you valuable.

That truth no longer holds.

## The evidence is overwhelming

I work at Mux. Over the holidays, I had some time off. I decided to build a few ideas I’d been kicking around—tools to solve problems I run into at my day job.

I shipped three projects in that break. Not MVPs. Not prototypes. Working products with test suites, documentation, and polish.

1.  [Driftless](https://usedriftless.com/) helps keep your documentation in sync with your code changes.
2.  [DeployCast](https://deploycast.app/) generates AI summaries of your deployments for the rest of your team. Marketing, customer support, executives—anyone who needs to know what changed, explained in plain language, based on the truth of what’s actually in the codebase.
3.  [VoicePatch](https://voicepatch.app/) lets your users report bugs directly to an AI that triages, formats, and hands off to another AI to implement the fix and open a PR. Your users open pull requests. Not your engineers. These ideas didn’t exist before my break. I described them to Claude Code, and it built them. It wrote automated tests for everything—something I never did consistently in 15 years of shipping software. I had a project acquired once that didn’t have a test suite. Claude Code covered more test cases in hours than I wrote in years.

I’m not exaggerating. And neither is anyone else.

> [](https://twitter.com/rakyll/status/2007239758158975130)

> [](https://twitter.com/bcherny/status/2004897269674639461)

> [](https://twitter.com/tenobrus/status/2007589234736308639)

Stack Overflow, the site that defined a generation of software development, received 3,710 questions last month. That’s barely above the 3,749 it got in its first month of existence. The entire knowledge-sharing infrastructure we built our careers on is collapsing because people don’t need to ask anymore.

Claude Code routinely overestimates how long things will take. It’ll say “over the next three to four weeks, we’ll build this.” The user types “do it now.” Claude builds it in an hour.

This isn’t incremental improvement. This is a phase change.

## Ideas are now instantly replicable

Here’s the part that unsettles me most.

I tweeted about VoicePatch in response to someone saying talented engineers now write the majority of their code with agents. My reply: “What about not writing the code at all?” I described the idea—users report bugs to AI, AI triages and implements, AI opens the PR.

Days later, the same person published an article: “Our AI agent now files its own bug reports.”

They liked my tweet, saw the idea, and shipped it.

I’m not claiming ownership. That’s exactly the point. In a world where execution is trivial, ideas become instantly commodifiable. The moat isn’t “I can build this and you can’t.” The moat can’t be that anymore, because anyone can build anything. The window between sharing an idea and someone else shipping it has collapsed from months to days—sometimes hours.

> [](https://twitter.com/dabit3/status/2006489676924989860)

This isn’t about one person copying one idea. It’s about the fundamental economics of software changing.

When Nader Dabit can rebuild a billion-dollar product like Typeform in hours and open-source it, the value of “we built it first” approaches zero.

## What I’m actually feeling

I’ve been trying to name this feeling for weeks. It’s not one thing. It’s three things at once.

1.  Longing for the times when software required deep understanding. When you had to earn your ability to ship through study and struggle. When the complexity was a gate that separated serious builders from everyone else. There was craft in that. There was pride in it.
2.  Excitement for not having to care about the code anymore. For years, the code was the bottleneck. Now I can focus purely on shipping—on the problem, the user, the experience. The implementation details that used to consume 90% of my mental energy are now handled. I can think about what to build instead of how to build it.
3.  Dizziness at how fast the ground shifted. A few years ago, my value was my ability to write code. Today, that ability is table stakes—or maybe not even that. The role of “software engineer” is becoming something entirely different, and I’m not sure any of us know what it’s becoming.

## So, what actually… matters now?

If execution is no longer the differentiator, what is?

A friend of mine who’s spent years in SaaS put it bluntly: “It feels like the only thing people will pay for is tokens.” Tokens to create features within their own solutions. The layer of value is shifting from the software itself to the infrastructure that powers its creation.

But I don’t think that’s the whole picture.

Speed of iteration matters. Not speed of initial build—everyone has that now. Speed of learning. How fast can you ship, learn from users, and adapt? The teams that win will be the ones that cycle fastest, not the ones that build first.

Taste matters. Knowing what’s worth building. Knowing what to say no to. In a world where you can build anything, the scarcest resource is judgment about what should exist. Most things shouldn’t.

Distribution matters. It always did, but now it matters more. When everyone can build, the only differentiation is who people hear about, who they trust, whose product they encounter first. The network you can tap into for trials and feedback—that’s the real moat.

Problem selection matters. The hardest part of building software was never typing the code. It was figuring out which problems are real, which solutions people will pay for, which bets are worth making. That calculus hasn’t changed. If anything, it’s more important now because the cost of building the wrong thing is lower, which means more wrong things will get built.

The “execution is hard” era trained us to be careful about what we committed to building. That constraint is gone. The new discipline is choosing wisely when you can build anything.

* * *

I don’t know exactly what software engineering becomes from here. I know it won’t look like what I learned. I know the skills that made me valuable five years ago are not the skills that will make me valuable five years from now.

What I do know is that the builders who thrive won’t be the ones who can write the best code. They’ll be the ones who can identify the right problems, reach the right people, and iterate faster than everyone else.

The code was never the point. We just couldn’t see that until the code became free.