---
title: "Build for the Web, Build on the Web, Build with the Web"
source: "https://csswizardry.com/2025/01/build-for-the-web-build-on-the-web-build-with-the-web/"
publishedDate: "2025-01-23"
category: "css"
feedName: "CSS Wizardry"
---

23 January, 2025

Written by **Harry Roberts** on **CSS Wizardry**.

This article started life as [a post on LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7287827600968699904/), but after some gentle nudging from friend, web custodian, and unwitting mentor [Jeremy Keith](https://adactio.com/), I’ve decided to publish and expand upon it here.

If you’re going to build for the web, build _on_ the web and build _with_ the web.

If I was only able to give one bit of advice to any company: **iterate quickly on a slow-moving platform**.

In the last year alone, I have seen two completely different clients in two completely different industries sink months and months into framework upgrades. Collectively, they’ve spent tens, if not hundreds, of thousands of dollars rewriting entire projects just to maintain feature parity with the previous iteration. This is not meaningful or productive work—it is time sunk into merely keeping themselves at square one.

It’s a form of open-source vendor lock-in, and adding even the most trivial of performance improvements becomes impossible as frameworks obscure or sometimes remove the ability to fiddle with the nuts and bolts. The worst thing? You get to do it all again in 18 months! The stack owns you, and you have an entire development team who might be paid one or two quarters every two or three years just to tread water.

They’re **iterating slowly on a fast-moving platform**.

The saddest part of it all is that these were ex-clients who had to [re-hire](https://csswizardry.com/services/) me because with the ‘upgrades’ came severe site-speed regressions. As good as it may be for business, I hate going through the same work with the same client more than once. After all, you should never need to call pest control twice.

The web as a platform is a safe bet. It’s un-versioned _by design_. That’s the commitment the web makes to you—take advantage of it.

1.  **Opt into web platform features incrementally:** To paraphrase my good friend [Ryan Townsend](https://twnsnd.com/), customers don’t want smooth page transitions—[they want a website that works](https://www.youtube.com/watch?v=f5felHJiACE&t=1202s). Don’t make your entire site a single page app just so you don’t have to retransmit a header and footer.
2.  **Embrace progressive enhancement to build fast, reliable applications that adapt to your customers’ context:** The beauty of opting into web platform features as they become available is that your site becomes _contextual_. The same codebase adapts into its environment, playing to its strengths, rather than trying to build and ship your own environment from the ground up. Meet your users where they are.
3.  **Write code that leans into the browser, not away from it:** By using progressive enhancement, you can opt into browser-native features that are usually faster, more accessible, more secure, and—perhaps most importantly to the business—maintained by someone else.

All of this seems painfully reminiscent. As far back as 2007, [Dan Cederholm](https://simplebits.com/about/) gave us [do­websites­need­to­look­exactly­the­same­in­every­browser.com](https://web.archive.org/web/20071212220950/http://dowebsitesneedtolookexactlythesameineverybrowser.com/) (the answer is _no_; I saved you a click). Almost 20 years ago, the discussion was around much more trivial, visual flourishes like rounded corners and drop shadows, but the sentiment still rings true today: shipping hundreds of kilobytes of JavaScript so you can give an otherwise static site smooth, soft navigations is entirely nonsensical. Nowadays, you can implement that with one line of CSS[1](#fn:1) and the worst case scenario is that browsers that don’t support it simply traverse your site just like they were always designed to do. Your [escalator became stairs](https://www.youtube.com/watch?v=tqOkWWV6a_U).

The web platform moves slowly, and I understand that can be frustrating for developers who want to innovate, but [over a decade of consultancy experience](https://csswizardry.com/consultancy/) has taught me time and time again that the alternative is much more restrictive in the long run. What’s brand new today starts to show its age much more quickly than something that’s already stood the test of time.

Every layer of abstraction made in the browser moves you further from the platform, ties you further into framework lock-in, and moves you further away from fast.

I remain convinced that the typical developer doesn’t know enough about business analysis, and the typical business analyst doesn’t know enough about development, to fully reconcile the two sides of the coin. Deeper, and more balanced, long-term discussions need to be had from both parties, because the lock-in (and its ongoing cost) is very real, and today’s shiny will soon become tomorrow’s millstone.

I’m not against front-end frameworks, and, believe me, I’m not naive enough to believe that the only thing a front-end framework provides is soft navigations, but if you’re going to use one, I shouldn’t be able to smell it.

If you’re going to go all-in on a framework or, heaven forbid, an SPA, give the long term some serious consideration, and make sure you do a really, really good job.

[Nolan Lawson](https://nolanlawson.com/) said it best when he said [the best SPA is better than the best MPA; the average SPA is worse than the average MPA](https://nolanlawson.com/2022/06/27/spas-theory-versus-practice/).

1.  `@view-transition { navigation: auto; }` [↩](#fnref:1)
    

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