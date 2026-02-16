---
title: "Bias Toward Action"
source: "https://addyosmani.com/blog/bias-towards-action/"
publishedDate: "2026-02-15"
category: "performance"
feedName: "Addy Osmani"
---

**Bias toward action is defaulting to the smallest responsible step that produces real feedback, while pre-committing to guardrails so that being wrong is survivable and quickly correctable.**

“Bias toward action” sounds like something a startup founder shouts before doing something reckless. It’s not. When done right, it’s actually about learning faster while making sure that being wrong doesn’t kill you.

Here’s what it actually means: **take the smallest step that produces real feedback, but know exactly how you’ll recover when it breaks.**

That’s it. The rest is engineering discipline to make that possible.

[Stripe frames this well](https://stripe.com/jobs/culture) in their operating principle “Move with urgency and focus” - it’s not about recklessness, it’s about optimizing for learning speed while investing in foundations that make you faster tomorrow.

## **What “move fast” really looks like**

**Fast teams use more information than slow teams, not less - they just don’t wait for perfect information.**

I’ve noticed something interesting about teams that actually ship quickly: they don’t skip thinking. They’re not cowboys. They just have really tight feedback loops.

The research backs this up. [Kathleen Eisenhardt’s studies of fast decision-making](https://www.jstor.org/stable/256434) in high-velocity environments found something counterintuitive: fast decision makers used _more_ information than slow teams, not less. They developed more alternatives, they used better advice processes. They didn’t wait around for perfect information. They’d make decisions with about 70% of what they wanted to know, ship something small, and learn from what happened.

The difference between fast teams and slow teams isn’t courage. It’s infrastructure.

**Speed comes from making the safe thing easy, not from being brave about doing dangerous things.**

Fast teams have:

-   Feature flags so they can turn things off instantly
-   Monitoring that actually tells them when something’s wrong
-   Rollback procedures they’ve practiced
-   Small changes that are easy to understand when they break

Slow teams are stuck because every deploy feels risky. And it _is_ risky, because they don’t have the safety nets.

## **Two-way doors vs one-way doors**

**Most decisions are reversible if you design them that way - the highest-leverage move is often making a one-way door into a two-way door.**

[Jeff Bezos described this framework](https://www.sec.gov/Archives/edgar/data/1018724/000119312516530910/d168744dex991.htm) in his 2015 shareholder letter. Some decisions are like walking through a door you can’t walk back through - those deserve careful thought. But most decisions are two-way doors. You can try something, and if it sucks, you just walk back through.

The problem is we treat too many decisions like one-way doors.

Before you slow down to deliberate, ask yourself: **Can I make this reversible?**

Sometimes the answer is “add a feature flag.” Sometimes it’s “start with 1% of traffic.” Sometimes it’s “dual-write to both systems so we can switch back.”

Making things reversible is often the highest-leverage thing you can do. It converts a scary one-way door into a safe two-way door.

## **Error budgets: how to argue about speed without arguing**

**Error budgets replace philosophical debates about speed vs. reliability with objective thresholds - you either have budget to spend on changes, or you don’t.**

Here’s a concrete example from [Google’s SRE error budget policy](https://sre.google/workbook/error-budget-policy/) that I find really useful. They have this concept called an “error budget.”

Your service has an SLO - say, 99.9% uptime. That 0.1% is your error budget. It’s how much breakage you’re allowed.

The rule is simple:

-   If you’re within budget, keep shipping
-   If you’ve blown your budget, stop shipping and fix reliability

This completely changes the conversation. Instead of product and engineering fighting about whether to slow down, you look at the numbers. Are we within budget? Then ship. Have we burned through our budget? Then we need to fix things first.

[About 70% of outages come from changes](https://sre.google/workbook/error-budget-policy/). That’s why you need mechanisms that make change safer.

## **The smallest responsible step**

**Shipping to production multiple times at increasing percentages is safer than one careful big-bang deploy - the blast radius of being wrong stays tiny.**

Let me give you a concrete example of what “bias toward action” looks like in practice. Note, if you’re in a high-velocity startup without many existing users, this can look way simpler: ship, monitor and revert if there are issues.

Otherwise, say you’re changing something in the request path that could affect latency. Here’s what the “bias toward action” version looks like:

**Step 1:** Define what “broken” means before you start. Pick your SLIs - maybe error rate and p99 latency. Decide on the thresholds where you’ll abort.

**Step 2:** Put the change behind a feature flag. This lets you turn it off without redeploying.

**Step 3:** Ship to production with the flag off. The code is there, but not running yet.

**Step 4:** Turn the flag on for 1% of traffic. Watch your metrics.

**Step 5:** If the metrics look good, ramp to 5%, then 25%, then 50%, then 100%. If anything looks wrong at any point, flip the flag off.

**Step 6:** Once it’s fully rolled out and stable, remove the flag.

Notice what’s happening here. You’re shipping to production multiple times, but the blast radius of being wrong is tiny. At 1% traffic, if you’re wrong, only 1% of users see a problem for a few minutes.

This approach comes straight from [Google’s SRE canarying guidance](https://sre.google/workbook/canarying-releases/) - you can’t catch every defect in testing, so you expose a small subset of production traffic and evaluate the canary against a control.

Compare this to the “careful” approach: spend three weeks testing in staging, then do a big-bang deploy to 100% of production. If something breaks, everyone sees it, and rolling back is a whole production.

Which one is actually safer?

[Google’s release engineering practices](https://sre.google/sre-book/release-engineering/) are explicit about this: high velocity comes from frequent releases with fewer changes between versions, making testing and troubleshooting easier. Some teams “push on green” - they deploy every build that passes all tests.

## **When canaries lie to you**

**Your canary must measure what users actually care about not just infrastructure metrics.**

Canaries are great, but you have to watch the right things.

I’ve seen teams run canaries that only look at a technical metrics a few steps removed from what users actually care about. The canary passes, they roll out to everyone, and then error rates spike because the new code has a subtle bug that only shows up under certain conditions.

Your canary needs to measure the things users actually care about.

[Google’s SRE guidance is explicit](https://sre.google/workbook/canarying-releases/) about this: some metrics like CPU can be noisy and don’t map to service impact. Canaries need to be tied to SLIs that represent user experience.

And here’s a subtle point: your canary needs to run long enough to see the failure mode. Some bugs only show up after the cache warms up, or after certain traffic patterns emerge, or after memory pressure builds up.

Run one canary at a time when you can. Multiple canaries running simultaneously make it really hard to figure out which one broke things.

## **The Knight Capital disaster**

**In high-risk systems, “bias toward action” means investing in the controls and safety nets that bound worst-case outcomes - not skipping them.**

Here’s what “move fast” without guardrails looks like.

In 2012, Knight Capital deployed some trading software. They made a deployment error - old code was left running on some servers. Within 45 minutes, the system sent millions of erroneous orders. The company lost over $460 million and nearly went out of business.

[The SEC’s order and press release](https://www.sec.gov/litigation/admin/2013/34-70694.pdf) are brutal. They didn’t have proper deployment procedures. They didn’t have kill switches. They didn’t have pre-trade limits that would have stopped the bleeding. The SEC specifically emphasized asking “what happens if each component malfunctions and what safety nets limit harm?”

This is what happens when you have “bias toward action” without the “smallest responsible step” part. You move fast, all right. Fast into a wall.

The lesson isn’t “move slow.” It’s “invest in the safety nets that let you move fast without dying when you’re wrong.”

In high-risk systems - payments, trading, authentication - you still bias toward action. But the action is “run this in shadow mode first” or “deploy behind a kill switch we’ve tested” or “start with synthetic traffic.”

For regulated environments, [NIST’s incident response lifecycle](https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r2.pdf) provides a useful framework: preparation, detection & analysis, containment/eradication/recovery, and post-incident activity. The key insight is that response cycles back through detection and analysis during containment - you’re learning as you go.

## **Feature flags are inventory**

**Feature flags introduce combinatorial state complexity - treat them like inventory with owners, expiry dates, and removal tasks.**

Feature flags are incredibly useful for making things reversible. But they have a cost.

Every flag is a possible combination of states your system can be in. Two flags? Four states. Three flags? Eight states. Ten flags? 1,024 states.

You can’t test all those combinations. You probably don’t even know what all the combinations do.

[Martin Fowler’s guidance on feature toggles](https://martinfowler.com/articles/feature-toggles.html) is unusually direct about this: toggles introduce validation complexity, create combinatoric state space, and carry inventory cost that must be actively managed.

So treat flags like inventory. Give each one:

-   An owner
-   An expiry date
-   A clear purpose (release flag? experiment? operational toggle?)
-   A removal task

When the flag expires, your tests should fail until someone either extends it or removes it.

I’ve seen codebases where half the flags were from 2019 and nobody knew what they did anymore. Don’t let that happen.

## **What good looks like**

**Teams that move fast aren’t reckless - they’ve built the infrastructure that makes frequent, safe deployments boring.**

Let me show you what success looks like with some real examples.

[Etsy was deploying up to 50 times per day](https://www.etsy.com/codeascraft/quantum-of-deployment/). They tracked every deploy and correlated it with their metrics. When something went wrong, they could immediately see which deploy caused it. Their mean time to resolution was measured in minutes, not hours.

[Lowe’s adopted SRE practices](https://sre.google/resources/case-studies/lowes/) and improved their mean time to recovery by over 80%. One metric went from 2 hours to 17 minutes. They did it by investing in monitoring, clear incident procedures, and [blameless postmortems](https://sre.google/sre-book/postmortem-culture/).

These companies were moving fast because they built the infrastructure that makes it safe to move fast.

## **How to actually do this**

**You don’t need to transform your organization - start with one service where deploying becomes boring instead of terrifying.**

Here’s a practical 30-day plan:

**Week 1:** Pick one service as a pilot. Define its SLOs and error budget. Agree on the rule: if you’re within budget, you can ship. If not, you fix reliability first.

**Week 2:** Create a PR checklist and a rollout checklist. Nothing fancy - just “did you add a feature flag?” and “what metrics are you watching?” Start using them.

**Week 3:** Fix your noisiest alerts. Every alert that pages someone should be actionable and tied to user impact. If it’s not, delete it or downgrade it.

**Week 4:** Make rollback real. Pick your scariest deployment and practice rolling it back. Find out what breaks. Fix those things.

That’s it. You don’t need to boil the ocean. You just need one service where deploying is boring instead of terrifying.

## **The human part**

**“Bias toward action” isn’t about being brave - it’s about being paranoid in useful ways that give you escape routes.**

Here’s the thing nobody tells you: “bias toward action” isn’t about being brave. It’s about being paranoid in useful ways.

When I’m shipping something risky, I spend a lot of time thinking about what could go wrong. Not to talk myself out of shipping - to make sure I’ve got an escape route.

Can I turn this off without redeploying? Can I detect if it’s broken? Will I know within minutes if something’s wrong, or will I find out Monday morning from an angry Slack message?

The goal isn’t to ship fearlessly. The goal is to ship with well-founded confidence that being wrong won’t be catastrophic.

## **What actually slows teams down**

**Analysis paralysis is rarely the root cause - the real killers are large changes, flaky tests, poor observability, complicated rollbacks, and alert noise.**

Analysis paralysis is real. But in my experience, it’s rarely the root cause of slowness.

The real killers are:

-   **Large change batches** that are hard to review, hard to test, and hard to debug when they break
-   **Flaky tests** that make people afraid to ship because they don’t trust the gates
-   **Poor observability** that makes it hard to know if something’s broken
-   **Complicated rollback procedures** that make reverting scarier than limping forward
-   **Alert noise** that trains people to ignore alerts

Fix those, and the speed comes naturally. Teams stop hesitating because shipping stops being scary.

The monitoring piece is worth calling out specifically. [Google’s SRE “four golden signals”](https://sre.google/sre-book/monitoring-distributed-systems/) - latency, traffic, errors, saturation - provide a compact schema for what you must observe. And they’re blunt about alert noise: paging humans is expensive, noise leads to ignored alerts and longer outages.

## **The error budget conversation**

**Error budgets make reliability targets explicit and shared - turning philosophical debates into objective measurements.**

I want to come back to error budgets because they’re such a useful tool for making this concrete.

Without error budgets, you get these endless philosophical debates about speed vs quality. Product wants to move faster. Engineering wants more time for stability work. Nobody has a shared framework.

With error budgets, the conversation changes:

**Product:** “Can we ship this feature next week?”

**Engineering:** “Let me check our error budget… we’re at 85% of budget for the month. Yeah, we can ship.”

Or:

**Engineering:** “We’ve burned 110% of our error budget this month. We need to freeze features and fix the reliability issues.”

**Product:** “Okay, what’s the plan to get back within budget?”

It’s not personal. It’s not a judgment. It’s just: are we within our reliability targets, yes or no?

## **Starting small**

**Culture change happens when one team’s success becomes visible - start with a pilot, get good at it, then let it spread organically.**

You don’t need to transform your entire organization. Start with one team, one service, one project.

Get really good at shipping small changes safely. Build the muscle memory. Then expand.

The teams I’ve seen succeed with this don’t make a big announcement about “moving to continuous deployment” or “adopting SRE practices.” They just start shipping more frequently, watching their metrics more carefully, and making rollback easier.

After a few months, someone notices: “Hey, this team ships way more than everyone else, and they don’t break things more. How do they do that?”

That’s when it spreads.

## **Your job is still to deliver working code**

**The teams that move fastest made testing and deployment so routine that nobody thinks about them - that’s the real bias toward action.**

I opened with this in another piece, but it’s worth repeating: your job isn’t to ship code. It’s to ship code that works.

“Bias toward action” isn’t permission to dump untested changes on your coworkers. It’s a discipline for learning faster by making the cost of experiments lower.

The teams that move fastest aren’t the ones who skip testing. They’re the ones who made testing so fast and automated that it doesn’t slow them down.

They’re the ones who made deployments so routine that nobody thinks about them.

They’re the ones who made rollback so reliable that they’re not afraid to try things.

That’s the real bias toward action.

* * *

_If you want to measure whether you’re actually getting faster, the [DORA metrics](https://dora.dev/guides/dora-metrics-four-keys/) (deployment frequency, change lead time, change fail rate, and failed deployment recovery time) are a good starting point._