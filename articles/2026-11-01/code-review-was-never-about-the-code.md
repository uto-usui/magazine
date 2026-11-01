---
title: "Code review was never about the code"
source: "https://mattstromawn.com/writing/code-review-was-never-about-the-code/"
publishedDate: "2026-10-27"
category: "design"
feedName: "Sidebar"
---

If you work in software (as a designer, developer, PM, or any adjacent role), you’re probably aware of just how much AI has changed the way code is created. And if you’re an engineer, you’re definitely feeling the _downstream_ impacts of AI’s speed. Way, way more code is being written. But the way we review code hasn’t changed that much.

But if you’re not familiar, **code review** is a step in the software development process where developers look at code before it gets shipped. It’s been a cornerstone of engineering teams’ workflows for almost as long as there have been engineering teams. AI coding has turned code review into a bottleneck; a human can only look at so much code, so reviews have started taking longer, and each engineer’s review backlog is growing exponentially.[1](#fn1)

AI code review tools have stepped into the breach, eliciting an earnest grumble from developers: AI reviewing AI-written code is like a student grading their own test. Execs don’t have much sympathy, though. We can move faster, so we should. So teams are stuck in a traffic jam, trying to figure out how to review code faster, without sacrificing quality.

I’d like to argue that the source of this problem is more fundamental than speed vs. quality. We’re in this situation because somewhere along the way we swapped one question for another. Code review was always meant as a verification step: does the code produce the outcome we want? But it’s a hard question to answer, so we started asking an easier one instead: is this good code?

Let’s go back to the original question. Code review should get better at verifying outcomes — faster, yes, but more accurately, and for the system as a whole, not just single lines of code.

## What is code worth?

The premise of code review is that code can be good or bad, and that bad code can be turned into good code, and that good code is important. This is a sound premise. Bugs are obviously bad for business. But we’ve made an [attribute substitution](https://en.wikipedia.org/wiki/Attribute_substitution): we decide whether code looks good as a stand-in for whether the software works.

Engineers use mental shortcuts to determine the goodness or badness of code. They range from very well-documented patterns (use guard clauses to return early, use pure functions where possible) to vibe-based ‘code smells’ (magic numbers, deep nesting). But these aren’t written in stone. They are debated and re-evaluated constantly.

Even if there are inviolable definitions of good code, writing good code isn’t guaranteed to result in valuable software products. Sometimes, it works out that way; before Facebook bought it, WhatsApp kept its codebase lean enough that 35 engineers could serve 450 million users.[2](#fn2) But there are far, far more examples of software succeeding _despite_ being written poorly: Undertale would never have passed a single code review (almost all of its dialog was one giant switch statement), but became one of the most beloved games of the past decade.

Good code does not strictly equal good software. Code itself has no intrinsic value. So what are we actually reviewing when we review code?

## Verifying

There’s just no substitute for actually _running_ the code and verifying that it does its job well. I don’t mean unit tests, or even integration tests, but running the code in total, a full end-to-end test.

Doing this at scale for large applications is difficult. At an org with hundreds of AI-enabled engineers, you likely have thousands of pull requests a day. Spinning up and breaking down complete copies of your entire application (likely, application cluster) is time- and resource-intensive. Even if you do manage it, verifying under _realistic_ conditions may be completely infeasible (imagine simulating the activity that Stripe handles — 1.75% of global GDP).

Which is to say that you won’t know if your code works or not until it’s in users’ hands.

Traditional code review has two outcomes:

1.  You are confident enough that the code works well enough to ship it
2.  You are not confident enough that the code works well enough to ship it

Verifying your code under the most realistic scenario possible (i.e., yolo, straight to production) has three:

1.  You are sure the code works, and it’s already shipped. Good job!
2.  You are sure the code doesn’t work, so you improve the code until it works
3.  You don’t know because the system failed in an interesting way. Instead of confidence, you have _information_, and can use it to improve the system.

Verifying a major change by shipping it is risky, but the closer you can get to it, the more your review is actually worth.

Feature flags, canary releases, observability and CI/CD — the stuff of modern devops — have all been commoditized to the point where it’s cheap to build in the safeguards that make the yolo approach tractable (even at Stripe scale).

## Stop reviewing code[3](#fn3)

You’re probably doing code review for the wrong reasons.

Let AI do the work of making code better: tracing code paths, finding, and fixing obvious issues. And if it’s a student grading their own test, so what? AI can make the code better. People can check if it works.

Invest in the tools to verify your code in realistic conditions, deploying it directly to users if possible. Use your own eyes and brain to see it working, or see it not working. Learn from the difference, share what you learn with your team, and build feedback loops that improve the system the more it fails.

And eventually the failures will become rare and _incredibly_ interesting.

I'll send new posts to your inbox, along with links to related content and a song recommendation or two.

1.  GitHub saw 1 billion commits in all of 2025; by April 2026 it was seeing [275 million a week](https://x.com/kdaigle/status/2040164759836778878). [↩︎](#fnref1)
    
2.  Cade Metz, “[Why WhatsApp Only Needs 50 Engineers for Its 900M Users](https://www.wired.com/2015/09/whatsapp-serves-900-million-users-50-engineers/),” _Wired_, September 15, 2015. [↩︎](#fnref2)
    
3.  Of course, there are situations where safety means protecting human lives or massive economic outcomes, and reviewing code is the only safe option. The IRS shouldn’t ship updates to the code it uses to disburse tax refunds without reviewing the code. Waymo shouldn’t ship updates to its self-driving cars’ algorithms without reviewing the code. But you probably aren’t working for the IRS or Waymo. And if you are, get in touch ;) [↩︎](#fnref3)