---
title: "How fast is fast enough? Rethinking web performance in pragmagical terms"
source: "https://www.speedcurve.com/blog/fast"
publishedDate: "2026-02-13"
category: "performance"
feedName: "SpeedCurve Blog"
---

![](https://images.speedcurve.com/team/tammy_everts.png?w=152&h=152&fit=crop&auto=format,compress)

Tammy Everts - Feb 14, 2026

In a world full of friction – slow lines, dropped calls, canceled flights – creating moments of digital flow can feel like a gift. "Fast enough" isn’t just about protecting conversion rates. It’s about creating experiences that preserve momentum, reduce friction, and feel almost invisible.

![](https://blog-img.speedcurve.com/img/447/hero-unicorn.png?auto=format,compress&fit=max&w=2000)

When it comes to web performance, how fast is fast enough?

It’s a question I’ve tried to answer in different ways over the years. But while preparing [this talk](https://conffab.com/presentation/how-fast-is-fast-enough/?gl=x9afm7Z3U7ou) for [performance.now()](https://perfnow.nl/), I decided to go back to first principles. I tried to look at the question with fresh eyes – to set aside the patterns I’ve accumulated after years of working in the performance space and ask myself: what does "fast" really mean?

The honest answer? It depends.

There are so many variables. Any attempt to reduce "fast enough" to a single number – 1.2 seconds, 2.5 seconds, 100 milliseconds – quickly falls apart. If you came here hoping for a universal threshold, I’m sorry to disappoint you.

Instead, I want to explore something more nuanced: what fast _feels_ like and how we might bridge the gap between business pragmatism and user delight.

Because somewhere between those two lies what I like to call the "pragmagical".

## Fast is magical

[This blog post](https://www.catherinejue.com/fast) by Catherine Jue has captured my imagination. 

She describes how apps like Raycast or Superhuman serve content in under 100 milliseconds, often before you even consciously expect it to appear. The result isn’t that users say, "Wow, this is fast." Instead, they say things like "This is amazing" and "This is delightful" and "I love this tool".

Speed at that level doesn’t register as a metric. It registers as magic.

Fast eliminates cognitive friction. There's no waiting, no hesitation, no tiny mental tax while your brain holds context in suspense. The experience flows. It feels effortless.

And here’s what’s fascinating: users don’t praise these products for being fast. They praise them for being great. **Fast is invisible, and that invisibility makes it powerful.**

That idea pushed me to rethink our industry’s current mindset. Have we, in focusing on [Core Web Vitals](https://www.speedcurve.com/web-performance-guide/get-started-with-core-web-vitals/) thresholds and [business ROI](https://www.speedcurve.com/blog/site-speed-business-correlation/), accidentally lowered our ambitions? And in doing so, are we hurting our users?

## Fast is pragmatic

If web performance weren't pragmatic, most of us wouldn't have jobs. But let's think bigger than that.

In performance conversations, we often frame speed in terms of [business impact](https://www.speedcurve.com/blog/site-speed-business-correlation/): make your site fast enough to improve conversion rate, reduce bounce rate, increase time on site, or boost revenue. **If faster pages don’t produce measurable ROI beyond a certain point, is there any reason to continue optimizing?**

I’ll admit, I’ve made versions of this argument myself.

If business metrics flatten out into what we call the [performance plateau](https://www.speedcurve.com/blog/web-performance-plateau/), maybe that’s "fast enough". Maybe we should stop there.

But something about that feels incomplete. It frames speed purely as a lever for business gain, not as an intrinsic component of user experience.

![](https://blog-img.speedcurve.com/img/447/practical-magical-1.png?auto=format,compress&fit=max&w=2000)

So I started thinking... what if we didn’t have to choose between pragmatism and magic? What if we aimed for something that blends both?

That’s where the idea of "pragmagical" performance goals comes in.

![](https://blog-img.speedcurve.com/img/447/practical-magical-2.png?auto=format,compress&fit=max&w=2000)

## Who are you trying to please?

Before you define "fast enough", it’s worth asking a foundational question: who are you trying to please?

Your boss?

Google?

Your users?

The order of that list is intentional. **In many organizations, users have become an afterthought.** We optimize for revenue and SEO scores before we ask how the experience actually feels.

Let’s start with the business side.

You’ve probably heard some version of this: _"Our brand is strong. Our products are amazing. People will tolerate a bit of slowness."_

_![](https://blog-img.speedcurve.com/img/447/too-cool.png?auto=format,compress&fit=max&w=2000)_

It’s a comforting belief. But is it true? Luckily, it’s testable...

## What happens when you slow things down?

Years ago, I worked at a company that had a customer that was a very cool brand. They weren’t entirely convinced that performance mattered, so we ran an 18-week multivariate test. 

For two cohorts of users, we artificially throttled the experience by 500 and 1000 milliseconds – not to the point of being unusable, just noticeably slower. The other cohort received the normal, faster experience.

The results were predictable in one sense: the slower cohorts converted less.

But what surprised us came later.

After 12 weeks, we stopped throttling and continued to monitor all three groups for six more weeks. **The users who had the slower experiences returned at lower rates, even after performance returned to normal.** The slightly degraded experience had a lingering effect.

![](https://blog-img.speedcurve.com/img/447/ab-test.png?auto=format,compress&fit=max&w=2000)

Speed doesn’t just affect immediate conversions. It shapes memory, trust, and return behaviour.

## Finding your performance plateau

If you can’t run your own throttling experiments, [real user monitoring](https://www.speedcurve.com/features/performance-monitoring/) (RUM) can provide similar insights. By correlating performance metrics like Largest Contentful Paint (LCP) with business metrics such as conversion rate, patterns often emerge.

For example, on one site I looked at, the peak conversion rate (6.2%) aligned with an LCP of about 1.1 seconds.

![](https://blog-img.speedcurve.com/img/447/correlation-1.png?auto=format,compress&fit=max&w=2000)

I also identified the performance plateau for this site. In this case, conversions flattened out beyond 2.8 seconds. Improving from 4.5 to 2.9 seconds made little difference. Pushing users toward that 1.1 second experience did.

![](https://blog-img.speedcurve.com/img/447/correlation-2.png?auto=format,compress&fit=max&w=2000)

Two key takeaways:

-   There is no universal "ideal" number.
-   Your thresholds are unique to your site and audience.

If you stay on the plateau, business metrics stagnate. If you want meaningful gains, you may need to go much faster, not just incrementally faster.

## Google's thresholds are not your thresholds (and that's okay)

We need to talk about Google.

Over the past few years, Google's [Core Web Vitals](https://www.speedcurve.com/web-performance-guide/get-started-with-core-web-vitals/) have helped simplify performance conversations – making the topic accessible to more people – which is awesome. **But the downside is that people focus on Google's thresholds rather than investigating their own user data.**

Core Web Vitals focus on three key user experience dimensions:

-   Largest Contentful Paint (LCP) – Is meaningful content visible?
-   Cumulative Layout Shift (CLS) – Does the page feel stable?
-   Interaction to Next Paint (INP) – Is the page responsive to user actions?

![](https://blog-img.speedcurve.com/img/447/core-web-vitals-new.png?auto=format,compress&fit=max&w=2000)

Google provides "good", "needs improvement", and "poor" thresholds based on aggregated data. These are extremely useful as starting points. But they are not your finish line.

Google’s thresholds are built on broad datasets, not YOUR dataset. Your audience, your industry, and your user expectations may demand something stricter.

If you aim for a 2.5-second LCP simply because Google says it’s "good", you may be leaving opportunity on the table.

## The danger of averaging away reality

[A recent study by Contentsquare](https://contentsquare.com/blog/interaction-to-next-paint/) looked at 997 retail sites (yes, it bothers me that it's not 1,000). They found that customers with "good" INP experienced a 2.5% conversion rate, compared to 2% for those with "poor" INP. That 0.5% difference represents a 25% lift, which is a lot!

![](https://blog-img.speedcurve.com/img/447/contentsquare.png?auto=format,compress&fit=max&w=2000)

But remember: that finding is based on aggregated data.

When my colleague Cliff Crocker [analyzed four individual sites](https://www.speedcurve.com/blog/INP-user-experience-correlation/), he found that peak conversion rates occurred at INP thresholds ranging from 50 to 150 milliseconds – all significantly below Google’s 200-millisecond "good" benchmark.

![](https://blog-img.speedcurve.com/img/447/inp-correlation.png?auto=format,compress&fit=max&w=2000)

For those sites, 200 milliseconds wasn’t good enough. It was potentially leaving revenue behind.

**Aiming for someone else’s target is almost always a mistake.** Find your own.

## Metrics ≠ feelings

Now let’s talk about users.

We’ve all seen surveys claiming users expect pages to load in two seconds. Or three. Or five. Or eight.

People have no shortage of opinions. **But what users say they want doesn’t necessarily correlate with how they behave.** And metrics don’t directly translate to feelings.

We try to map numbers to experience – as we should – but we need to acknowledge that this mapping is imperfect.

## Analytics can be misleading

A user spending a long time on your site might be deeply engaged. Or completely lost. Without usability testing, you can't know which is which.

**Metrics like Time on Site and Pages per Session can hide frustration.** Pairing usability research with performance analytics gives you a much richer understanding of what’s actually happening.

## Engagement vs. productivity tasks

It also helps to consider why users are on your site. Broadly speaking, tasks fall into two categories:

### Engagement tasks are open-ended and absorbing

Users are browsing, exploring, dreaming. They have a high tolerance for waiting because time isn't tightly constrained.

Think about researching a vacation. You’re scrolling through destinations, reading reviews, looking at photos, dreaming dreams like this guy below. Waiting a few extra moments for content to load might not bother you much.

![](https://blog-img.speedcurve.com/img/447/vacation-dream.jpg?auto=format,compress&fit=max&w=2000)

### Productivity tasks are goal-oriented and time-sensitive

Users want to complete a specific action quickly. They might be in a rush or otherwise stressed.

Continuing the example I started above... imagine you’re on that vacation and you've just found out that your return flight has been canceled. You urgently need to rebook, extend your hotel stay, or find alternative accommodations... all while using your phone out on the hotel balcony trying to find a good signal, like this poor guy.

![](https://blog-img.speedcurve.com/img/447/vacation-reality.jpg?auto=format,compress&fit=max&w=2000)

Suddenly, your tolerance for waiting disappears.

**Same user. Same website. Completely different emotional state.** Metrics alone won’t capture that shift.

## One slow step breaks the journey

Even if most of your user journey is fast, one slow step can poison the entire experience.

When users move through a journey – searching, filtering, adding to cart, checking out – they build momentum. **A single sluggish interaction can shatter that momentum and make everything feel slower than it actually is.**

That’s why focusing only on page-level metrics is insufficient. You need to consider task-level performance and entire user journeys.

## Designing for flow

This brings us to the concept of flow state.

Flow is when someone is so immersed in an activity that nothing else seems to matter. The experience feels effortless and absorbing.

In digital experiences, true flow is hard to achieve. Networks have latency. Devices have limits.

**So what we’re really trying to do is fake flow.**

One hundred milliseconds is often cited as the threshold for "instantaneous". The idea was rooted in human perception. Interactions below that threshold feel immediate because the human eye takes roughly 100 milliseconds to process visual information.

![](https://blog-img.speedcurve.com/img/447/100ms-quote.png?auto=format,compress&fit=max&w=2000)

Back in 2012, 100 milliseconds was our north star for user-perceived performance. Have we lost sight of it?

Instead of asking _"How fast do we need to be to avoid hurting conversion or bounce rate?"_ maybe we should ask, _"How fast do we need to be to feel instantaneous?"_

## Closing the gap between pragmatic and magical

Pragmatic speed is about:

-   Meeting business targets
-   Monitoring regressions
-   Optimizing ROI

Magical speed is about:

-   Eliminating cognitive friction
-   Approaching instantaneous interactions
-   Creating delight

Pragmagical speed lives at the intersection. It acknowledges business realities while still striving for experiences that feel seamless and joyful.

![](https://blog-img.speedcurve.com/img/447/practical-magical-3.png?auto=format,compress&fit=max&w=2000)

We may not always reach 100 milliseconds. But aiming higher changes the conversation. It pushes us beyond "good enough". **It reminds us that we are in the business of creating experiences for other humans.** And it reminds us to invite empathy into our processes.

## Takeaways

If you’re trying to define "fast enough" for your site, I hope you keep these principles in mind:

-   **There is no universal "fast enough".** Your optimal thresholds are unique to your audience and business model.
-   **Benchmarks are a baseline, not a ceiling.** Meeting recommended standards doesn’t guarantee optimal performance.
-   **Speed affects long-term trust.** Even small degradations can influence return behaviour.
-   **Metrics don’t equal feelings.** Pair performance data with usability research to understand real user experience.
-   **Context matters.** Engagement tasks and productivity tasks have different tolerance for delay.
-   **Journey-level performance is critical.** One slow interaction can break momentum across an entire flow.
-   **Aim beyond tolerable.** Strive for experiences that feel smooth, effortless, and intuitive – not just acceptable.

"Fast enough" isn’t just about protecting conversion rates. It’s about creating experiences that preserve momentum, reduce friction, and feel almost invisible. And when performance becomes invisible, that’s when it starts to feel exceptional.

[![](https://blog-img.speedcurve.com/img/447/customer-logos-free-trial-banner.png?auto=format,compress&fit=max&w=2000)](https://www.speedcurve.com/signup/?utm_source=blog&utm_medium=blog&utm_campaign=blog-trials)