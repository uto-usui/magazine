---
title: "Measure What You Impact, Not What You Influence"
source: "https://csswizardry.com/2022/08/measure-what-you-impact-not-what-you-influence/"
publishedDate: "2022-08-24"
category: "css"
feedName: "CSS Wizardry"
---

24 August, 2022 (last updated on 22 August, 2025)

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Problems When Measuring Performance](#problems-when-measuring-performance)
2.  [Indirect Optimisation](#indirect-optimisation)
3.  [Isolate Your Impact](#isolate-your-impact)
4.  [Signal vs. Noise](#signal-vs-noise)
5.  [Final Thoughts](#final-thoughts)

A thing I see developers do time and time again is make performance-facing changes to their sites and apps, but mistakes in how they measure them often lead to incorrect conclusions about the effectiveness of that work. This can go either way: under- or overestimating the efficacy of those changes. Naturally, neither is great.

You can now make your measurements even more meaningful by using the [_Performance Extensibility API_](https://csswizardry.com/2025/07/the-extensibility-api/): add rich metadata to your _User Timing_ `performance.mark()`s and `performance.measure()`s, and filter and group them in DevTools’ _Performance_ panel.

## Problems When Measuring Performance

As I see it, there are two main issues when it comes to measuring performance changes (note, not _improvements_, but changes) in the lab:

1.  **Site-speed is nondeterministic[1](#fn:1).** I can reload the exact same page under the exact same network conditions over and over, and I can guarantee I will not get the exact same, say, DOMContentLoaded each time. There are myriad reasons for this that I won’t cover here.
2.  **Most metrics are not atomic:** FCP, for example, isn’t a metric we can optimise in isolation—it’s a culmination of other more atomic metrics such as connection overhead, TTFB, and more. Poor FCP is the symptom of many causes, and it is only these causes that we can actually optimise[2](#fn:2). This is a subtle but significant distinction.

In this post, I want to look at ways to help mitigate and work around these blind spots. We’ll be looking mostly at the latter scenario, but the same principles will help us with the former. However, in a sentence:

**Measure what you impact, not what you influence**.

## Indirect Optimisation

Something that almost never gets talked about is the indirection involved in a lot of performance optimisation. For the sake of ease, I’m going to use [Largest Contentful Paint](https://web.dev/lcp/) (LCP) as the example.

As noted above, it’s not actually possible to improve certain metrics in their own right. Instead, we have to optimise some or all of the component parts that might contribute to a better LCP score, including, but not limited to:

-   redirects;
-   TTFB;
-   the critical path;
-   self-hosting assets;
-   image optimisation.

Improving each of these should hopefully chip away at the timings of more granular events that precede the LCP milestone, but whenever we’re making these kinds of indirect optimisation, we need to think much more carefully about how we measure and benchmark ourselves as we work. Not about the ultimate outcome, LCP, which is a UX metric, but about the technical metrics that we are impacting directly.

We might hypothesise that reducing the amount of [render-blocking](https://csswizardry.com/2024/08/blocking-render-why-whould-you-do-that/) CSS should help improve LCP—and that’s a sensible hypothesis!—but this is where my first point about atomicity comes in. Trying to proxy the impact of reducing our CSS from our LCP time leaves us open to a lot of variance and nondeterminism. When we refreshed, perhaps we hit an outlying, huge first-byte time? What if another file on the critical path had dropped out of cache and needed fetching from the network? What if we incurred a DNS lookup this time that we hadn’t the previous time? Working in this manner requires that all things remain equal, and that just isn’t something we can guarantee. We can take reasonable measures (always refresh from a cold cache; throttle to a constant network speed), but we can’t account for everything.

This is why we need to **measure what we impact, not what we influence**.

## Isolate Your Impact

One of the most useful tools for measuring granular changes as we work is the [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API). This allows developers to trivially create high resolution timestamps that can be used much closer to the metal to measure specific, atomic tasks. For example, continuing our task to reduce CSS size:

```
<head>

  ...

  <script>performance.mark('CSS Start');</script>

  <link rel="stylesheet" href="app.css" />

  <script>
    performance.mark('CSS End');
    performance.measure('CSS Time', 'CSS Start', 'CSS End');
    console.log(performance.getEntriesByName('CSS Time')[0].duration)
  </script>

  ...

</head>
```

This will measure exactly how long `app.css` blocks for and then log it out to the console. Even better, in Chrome’s _Performance_ panel, we can view the _Timings_ track and have these `measure`s (and `mark`s) graphed automatically:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2022/08/user-timing-chrome.png)

Chrome’s Performance panel automatically picks up User Timings.

The key thing to remember is that, although our goal is to ultimately improve LCP, the only thing we’re impacting directly is the size (thus, time) of our CSS. Therefore, that’s the only thing we should be measuring. Working this way allows us to measure only the things we’re actively modifying, and make sure we’re headed in the right direction.

If you aren’t already, you should totally make User Timings a part of your day-to-day workflow.

On a similar note, I am [obsessed with `head` tags](https://speakerdeck.com/csswizardry/get-your-head-straight). Like, _obsessed_. As your `head` is completely render blocking[3](#fn:3), you could proxy your `head` time from your First Paint time. But, again, this leaves us susceptible to the same variance and nondeterminism as before. Instead, we lean on the User Timing API and `performance.mark` and `performance.measure`:

```
<head>

  <script>performance.mark('HEAD Start');</script>

  ...

  <script>
    performance.mark('HEAD End');
    performance.measure('HEAD Time', 'HEAD Start', 'HEAD End');
    console.log(performance.getEntriesByName('HEAD Time')[0].duration)
  </script>

</head>
```

This way, we can refactor and measure our `head` time in isolation without also measuring the many other metrics that comprise First Paint. In fact, I do that [on this site](https://github.com/csswizardry/csswizardry.github.com/blob/4cd8e456df9c9793879cd898f9871c631b8a1bf0/_includes/head.html#L102-L105).

## Signal vs. Noise

This next example was the motivation for this whole article.

Working on a client site a few days ago, I wanted to see how much (or _if_) [Priority Hints](https://web.dev/priority-hints/) might improve their LCP time. Using [Local Overrides](https://csswizardry.gumroad.com/l/perfect-devtools), I added `fetchpriority=high` to their LCP candidate, which was a simple `<img />` element (which is naturally pretty [fast by default](https://csswizardry.com/2022/03/optimising-largest-contentful-paint/)).

I created a control[4](#fn:4), reloaded the page five times, and took the median LCP. Despite these two defensive measures, I was surprised by the variance in results for LCP—up to 1s! Next, I modified the HTML to add `fetchpriority=high` to the `<img />`. Again, I reloaded the page five times. Again, I took the median. Again, I was surprised by the level of variance in LCP times.

The reason for this variance was pretty clear—LCP, as discussed, includes a lot of other metrics, whereas the only thing I was actually affecting was the priority of the image request. My measurement was a loose proxy for what I was actually changing.

In order to get a better view on the impact of what I was changing, one needs a little understanding of what priorities are and what Priority Hints do.

Browsers (and, to an extent, servers) use priorities to decide how and when they request certain files. It allows deliberate and orchestrated control of resource scheduling, and it’s pretty smart. Certain file types, coupled with certain locations in the document, have [predefined priorities](https://web.dev/priority-hints/#resource-priority), and developers have limited control of them without also potentially changing the behaviour of their pages (e.g. one can’t just whack `async` on a `<script>` and hope for the best).

Priority Hints, however, offer us that control. Our options are `fetchpriority=`

-   `high`: sets initial priority to High;
-   `auto`: effectively redundant—it’s the same as omitting the attribute altogether;
-   `low`: sets initial priority to Low.

Now comes the key insight: modifying a file’s priority doesn’t change how soon the browser discovers it—that’s not how browsers work—but it does affect how soon the browser will put that request out to the network. In browserland, this is known _Queuing_. Modifying a file’s priority will impact how long it is spent queuing. This is what I need to be measuring.

Let’s take a look at the before and after:

**Before, without Priority Hints:**

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2022/08/priority-hints-before.png)

Without Priority Hints, the LCP candidate spent a whole 1.7s queuing!

**After, with Priority Hints:**

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2022/08/priority-hints-after.png)

The addition of Priority Hints dropped queuing time to a mere 1.21ms!

Remember, the only thing that Priority Hints affects is Queuing time, but if we look at the two screenshots, we see huge variance across almost all resource timing phases. Judging the efficacy of Priority Hints on overall time would be pretty inaccurate (we’d still arrive at the same conclusions—Priority Hints _do_ help improve LCP—but via the wrong workings out).

## Final Thoughts

There is a lot of indirect work when it comes to optimising certain metrics. Ultimately, individual tasks we undertake will help with our overall goals, but while working (i.e. writing code) it’s important to isolate our benchmarking only to the granular task at hand. Only later should we zoom out and measure the influence those changes had on the end goal, whatever that may be.

Inadvertently capturing too much data—noise—can obscure our view of the progress we’re actually making, and even though we might end up at the desired outcome, it’s always better to be more forensic in assessing the impact of our work.

It’s vital to understand the remit and extent of the things we are changing. It’s vital to benchmark our changes _only_ on the things we are changing. It’s vital to **measure what you impact, not what you influence**.

* * *

1.  In computer programming, a nondeterministic algorithm is an algorithm that, even for the same input, can exhibit different behaviors on different runs… — [Nondeterministic algorithm](https://en.wikipedia.org/wiki/Nondeterministic_algorithm) [↩](#fnref:1)
    
2.  Thanks to [Ryan](https://twitter.com/ryantownsend) for the cause/symptom analogy, and for additional input and insights. [↩](#fnref:2)
    
3.  A browser can’t even see your `body` until it’s finished your `head`, which makes it render-blocking by definition. [↩](#fnref:3)
    
4.  Create a Local Override with zero changes—this ensures that your _before_ isn’t fetched from the network, just like your _after_ won’t be. [↩](#fnref:4)
    

* * *

* * *

* * *

![](https://csswizardry.com/img/content/avatar.jpg)

##### By [Harry Roberts](https://csswizardry.com/about/)

Harry Roberts is an [independent consultant](https://csswizardry.com/consultancy/) web performance engineer. He [helps companies](https://csswizardry.com/services/) of all shapes and sizes find and fix site speed issues.

* * *

* * *

![](https://csswizardry.com/img/css/masthead-small.jpg)

Hi there, I’m **Harry Roberts**. I am an **[award-winning](https://web.archive.org/web/20190630140300/https://thenetawards.com/previous-winners/) Consultant Web Performance Engineer**, **designer**, **developer**, **writer**, and **speaker** from the UK. I **[write](https://csswizardry.com/blog/)**, **[Tweet](https://twitter.com/csswizardry)**, **[speak](https://csswizardry.com/speaking/)**, and **[share code](https://github.com/csswizardry)** about measuring and improving site-speed. You [should hire me](https://csswizardry.com/services/).

* * *

#### Connect

-   [𝕏 (Twitter)](https://twitter.com/csswizardry)
-   [Mastodon](https://webperf.social/@csswizardry)
-   [Bluesky](https://bsky.app/profile/csswizardry.com)
-   [LinkedIn](https://www.linkedin.com/in/csswizardry/)
-   [GitHub](https://github.com/csswizardry)
-   [YouTube](https://www.youtube.com/@csswizardry?sub_confirmation=1)

* * *

#### Projects

#### Next Appearance

-   #### Talk
    
    ![](https://csswizardry.com/img/icons/nl.png) [performance.now()](https://perfnow.nl/): Amsterdam (Netherlands), October 2025

I help teams achieve **class-leading web performance**, providing consultancy, guidance, and hands-on expertise.

I specialise in tackling complex, large-scale projects where speed, scalability, and reliability are **critical to success**.

**CSS Wizardry Ltd** is a company registered in England and Wales. **Company No.** 08698093, **VAT No.** 170659396. [License Information](https://csswizardry.com/license/).