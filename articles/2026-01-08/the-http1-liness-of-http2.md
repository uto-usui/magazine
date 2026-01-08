---
title: "The HTTP/1-liness of HTTP/2"
source: "https://csswizardry.com/2023/07/the-http1liness-of-http2/"
publishedDate: "2023-07-12"
category: "css"
feedName: "CSS Wizardry"
---

11 July, 2023

Written by **Harry Roberts** on **CSS Wizardry**.

This article started life as [a Twitter thread](https://twitter.com/csswizardry/status/1678793192756355073), but I felt it needed a more permanent spot. You should [follow me on Twitter](https://twitter.com/csswizardry) if you don’t already.

I’ve been asked a few times—mostly in [workshops](https://csswizardry.com/workshops/)—why HTTP/2 (H/2) waterfalls often still look like HTTP/1.x (H/1). Why are things are done in sequence rather than in parallel?

Let’s unpack it!

Fair warning, I am going to oversimplify some terms and concepts. My goal is to illustrate a point rather than explain the protocol in detail.

One of the promises of H/2 was infinite parallel requests (up from the historical six concurrent connections in H/1). So why does this H/2-enabled site have such a staggered waterfall? This doesn’t look like H/2 at all!

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/07/waterfall-h2.png)

This doesn’t look very parallelised!

Things get a little clearer if we add Chrome’s queueing time to the graph. All of these files were discovered at the same time, but their requests were dispatched in sequence.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/07/waterfall-h2-waiting.png)

The white bars show how long the browser queued the request for. All files were discovered around 3.25s, but were all requested sometime after that.

As a performance engineer, one of the first shifts in thought is that we don’t care only about when resources were discovered or requests were dispatched (the leftmost part of each entry). We also care about when responses are finished (the rightmost part of each entry).

When we stop and think about it, ‘when was a file useful?’ is much more important than ‘when was a file discovered?’. Of course, a late-discovered file will also be late-useful, but _really_ the only thing that matters is usefulness.

With H/2, yes, we can make far more requests at a time, but making more requests doesn’t magically make everything faster. We’re still limited by device and network constraints. We still have finite bandwidth, only now it needs sharing among more files—it just gets diluted.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/07/playing-cards.png)

Let’s leave the web and HTTP for a second. Let’s play cards! Taylor, Charlie, Sam, and Alex want to play cards. I am going to deal the cards to the four of them.

These four people and their cards represent downloading four files. Instead of bandwidth, the constant here is that it takes me ONE SECOND to deal one card. No matter how I do it, it will take me 52 seconds to finish the job.

The traditional round-robin approach to dealing cards would be one to Taylor, one to Charlie, one to Sam, one to Alex, and again and again until they’re all dealt. Fifty-two seconds.

This is what that looks like. It took 49 seconds before the first person had all of their cards.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/07/cards-round-robin.png)

Everything isn’t faster—everything is slower.

Can you see where this is going?

What if I dealt each person all of their cards at once instead? Even with the same overall 52-second timings, folk have a full hand of cards much sooner.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/07/cards-at-once.png)

Half a JavaScript file is useless to us, so let’s focus on getting complete responses over the wire as soon as possible.

Thankfully, the (s)lowest common denominator works just fine for a game of cards. You can’t start playing before everyone has all of their cards anyway, so there’s no need to ‘be useful’ much earlier than your friends.

On the web, however, things are different. We don’t want files waiting on the (s)lowest common denominator! We want files to arrive and be useful as soon as possible. We don’t want a file at 49, 50, 51, 52s when we could have 13, 26, 39, 52!

On the web, it turns out that some slightly H/1-like behaviour is still a good idea.

Back to our chart. Each of those files is [a `defer`red JS bundle](https://csswizardry.com/2023/07/in-defence-of-domcontentloaded/), meaning they need to run in sequence. Because of how everything is scheduled, requested, and prioritised, we have an elegant pattern whereby files are queued, fetched, and executed in a near-perfect order!

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/07/waterfall-h2-waiting.png)

Hopefully it all makes a little more sense now.

Queue, fetch, execute, queue, fetch, execute, queue, fetch, execute, queue, fetch, execute, queue, fetch, execute with almost zero dead time. This is the height of elegance, and I love it.

I fondly refer to this whole process as ‘orchestration’ because, truly, this is artful to me. And that’s why your waterfalls look like that.

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