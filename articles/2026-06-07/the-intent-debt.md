---
title: "The Intent Debt"
source: "https://addyosmani.com/blog/intent-debt/"
publishedDate: "2026-06-05"
category: "performance"
feedName: "Addy Osmani"
---

_Technical debt lives in your code. Cognitive debt lives in your head. Intent debt lives in the artifacts you never wrote - the goals, constraints and rationale that explain why the system is the way it is. It’s the one kind of debt your agents can’t pay down for you, and the one agentic engineering makes most expensive._

* * *

## Three places debt can live

Margaret-Anne Storey’s [Triple Debt Model](https://arxiv.org/abs/2603.22106) is a clean way to think about software health. The three models of debt are technical, cognitive, and intent.

**Technical debt lives in the code.** It’s the accumulation of implementation choices that make the system harder to change later. The tangled module, the shortcut you took under deadline, the abstraction that leaked. Technical debt is the one we’ve understood for decades, and it announces itself - slow builds, fragile tests, the dread you feel touching one file.

**Cognitive debt lives in people.** It’s the erosion of shared understanding - the gap between how much code exists and how much any human actually understands. This is the thing I’ve been calling comprehension debt. It accumulates when the system grows faster than the team’s mental model of it. The code can be pristine and you can still have crippling cognitive debt, because pristine code nobody understands is still code nobody understands.

**Intent debt lives in artifacts.** It’s the absence or erosion of the _externalized_ rationale, goals and constraints that explain why the system is the way it is. Not the understanding in your head - the understanding written down somewhere a teammate, a future you, or an agent can actually read. When intent debt is high, the system slowly stops reflecting what it was meant to do, and nobody can quite say when it diverged or why.

Here’s the part that took me a minute to internalize: **these are independent.** You can have low technical debt and high intent debt. You can personally understand a system perfectly (no cognitive debt _for you_) while the intent of that system exists nowhere outside your skull (enormous intent debt for everyone else). They feel similar from the inside. They are not the same bill.

## Why intent debt is the one agents can’t help with

AI generates code faster than ever. So technical debt is cheaper to take on _and_, increasingly, cheaper to pay down - point an agent at a tangled module and it’ll refactor it.

Cognitive debt is recoverable too, in a way people underrate. If you don’t understand a chunk of the system, you can ask the agent to explain it. The mental model you lost can be partially rebuilt on demand, because the code still exists and the model can read it back to you.

Intent is different. **An agent cannot generate intent, because intent is the one input that has to come from you.** The model can infer a plausible rationale from the code, the same way you can guess why a previous engineer did something - but a guess about intent is not the intent. The model doesn’t know whether that 300ms debounce was a deliberate UX decision, a benchmark result, or a number someone typed once and never revisited. It will happily invent a confident-sounding reason, which is worse than admitting it doesn’t know.

So of the three debts, intent debt is the only one where the agent is structurally unable to bail you out. Code it can write. Comprehension it can restore. The _why_ it can only fabricate.

## Agents make the un-written cost compound much faster

There’s a reason teams got away with high intent debt for years. We carried it in our heads and in each other’s heads.

When a new human joined a team, you didn’t have to write everything down, because they absorbed intent slowly - hallway conversations, code review comments, “oh we don’t do it that way because of an incident in 2023.” Tacit knowledge transferred person to person, and it accumulated. The senior engineer who’d been there four years _was_ the intent documentation. Expensive, lossy, but it worked.

Agents break that model in a specific way. Bringing agents onto a team is like doubling its size overnight with entirely junior people - and I’d add, junior people with no long-term memory. **An agent starts most sessions cold.** It doesn’t carry forward the tacit intent your humans built up over years. Whatever isn’t externalized into an artifact it can read, it simply doesn’t have.

That changes the economics of _not writing things down_. Un-externalized intent used to be a cost you paid occasionally - at onboarding, after someone left. Now you pay it every session, multiplied by every agent you run. The 20 agents people are so excited to parallelize? Each one is a teammate who has never met you, can’t read your mind, and will confidently fill any gap in your intent with a plausible guess. The orchestration tax I [wrote about](https://addyosmani.com/blog/orchestration-tax/) is partly an intent-debt tax: a lot of what makes managing many agents exhausting is re-supplying the intent you never wrote down.

## This is the other half of the comprehension debt argument

When I wrote about [comprehension debt](https://addyosmani.com/blog/comprehension-debt/), I made a point that I want to revisit, because intent debt sharpens it.

I argued that detailed specs are not a complete answer - that translating a spec into working code involves a huge number of implicit decisions no spec ever fully captures, and that a spec detailed enough to _be_ the program is just the program in a slower language. I still believe that.

Intent debt is the complementary truth. The fact that you can’t capture _all_ intent is not a license to capture _none_ of it. The implicit decisions an agent now makes on your behalf - the ones a spec will never fully enumerate - are exactly the decisions whose rationale evaporates if you don’t capture at least the load-bearing ones. You can’t write down everything. You absolutely have to write down the _why_ behind the choices that would be expensive to get wrong, because those are the ones nobody will be able to reconstruct later.

The comprehension debt point was: don’t trust that the code is correct just because it exists. The intent debt point is: don’t trust that the _reason_ survives just because the code does. Code is the answer. Intent is the question the answer was supposed to be solving, and AI is brilliant at producing answers to questions you forgot to write down.

## What high intent debt actually looks like

You don’t notice intent debt as friction. You notice it as a particular kind of helplessness.

-   An agent “fixes” a bug by removing some code - maybe a guard clause, and nobody can say whether that guard was load-bearing or leftover, because the reason it existed was never recorded in docs or commit messages.
-   A behavior users depend on quietly changes in a refactor, and the review passed because the diff looked clean and the tests were green - but the tests never encoded the intent, only the previous behavior.
-   You ask why two services talk over a queue instead of a direct call and the honest answer is “an agent suggested it and it seemed fine.” That’s intent debt with interest already accruing.

If you’ve felt the [cognitive surrender](https://addyosmani.com/blog/cognitive-surrender/) version of this - defending a design choice you can’t actually reconstruct - intent debt is the team-scale, written-down version of the same hole. The difference is that surrender is about your own posture in the moment. Intent debt is what’s left in the repo after a hundred of those moments, for the next person and the next agent to inherit.

## Paying it down: externalize intent as a first-class artifact

The good news is that almost everything I’ve been writing about for the last few months is, in retrospect, intent-debt management. I just didn’t have the word. The move is the same in each case: **take the intent out of your head and put it somewhere an agent can read.**

**Write the spec for the intent, not the implementation.** A [good spec](https://addyosmani.com/blog/good-spec/) is the goals, the constraints, the non-negotiables, and the explicit definition of _done_ (fast, accessible, secure, delightful - not just “functionally correct”). The spec’s job is to carry the intent the code can’t carry on its own.

**Treat AGENTS.md as your intent ledger, not your config.** This is why I keep saying [stop using /init](https://addyosmani.com/blog/agents-md/). An auto-generated file describes what the code _is_. An intent file describes what the team _means_ - the conventions, the “we don’t do it this way because,” the constraints that aren’t visible in any single file. That’s the part agents can’t infer and most need.

**Capture decisions where they happen.** [Decision logs](https://addyosmani.com/blog/automated-decision-logs/) - lightweight ADRs - are pure intent-debt paydown. The cost of recording _why_ at the moment you decide is trivial. The cost of reconstructing it eight months later, after the person who knew has moved teams, is enormous. Agents make logging cheaper than it’s ever been; there’s no excuse left.

**Make the learning loop write intent back down.** I’ve argued for [self-improving agents](https://addyosmani.com/blog/self-improving-agents/) that update a learnings file at the end of a session. The same loop is an intent-debt pump running in reverse: every mistake whose root cause you record, every “we tried X and it didn’t work because Y” is intent that would otherwise have lived only in your memory of a bad afternoon.

None of these are new tools. They’re the discipline of refusing to let the _why_ exist only in your head, in an era where your head is no longer where most of the work is happening.

## The reframe

For a long time, the scarce, valuable thing in software was the ability to produce a correct implementation. Code was expensive, so we optimized for writing it.

AI made code cheap. Comprehension is recoverable. But intent - the goals, the constraints, the reasons - is the one input that still has to originate with a human, and it’s the one we’re worst at externalizing, because for decades we got away with carrying it around in our heads.

That worked when the team was a handful of people who could absorb intent over years of shared context. It does not work when half the team is agents that start every session as strangers.

Technical debt makes your system hard to change. Cognitive debt makes it hard to understand. Intent debt makes it hard to know whether it’s still doing what you wanted at all - and it’s the only one of the three your agents can’t pay back for you. So you have to. Write down the why. It’s becoming the most valuable thing you can leave in the repo.