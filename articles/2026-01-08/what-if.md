---
title: "What If?"
source: "https://csswizardry.com/2018/11/what-if/"
publishedDate: "2018-11-24"
category: "css"
feedName: "CSS Wizardry"
---

23 November, 2018

Written by **Harry Roberts** on **CSS Wizardry**.

I was recently conducting some exploratory work for a potential client when I hit upon a pretty severe flaw in a design decision they’d made: They’d built a responsive image lazyloader in JavaScript which, by design, worked by:

1.  immediately applying `display: none;` to the `<body>`;
2.  waiting until the very last of the page’s images had arrived;
3.  once they’d arrived, removing the `display: none;` and gradually fading the page into visibility.

Not only does this strike me as an unusual design decision—setting out to build a lazyloader and then having it intentionally block rendering—there had been no defensive strategy to answer the question: what if something goes wrong with image delivery?

‘Something wrong’ is exactly what happened. Due to an imperfect combination of:

1.  images being completely unoptimised, plus;
2.  a misconfiguration with their image transformation service leading to double downloads for all images;

…they’d managed to place 27.9MB of images onto the Critical Path. Almost 30MB of previously non-render blocking assets had just been turned into blocking ones on purpose with no escape hatch. Start render time was as high as 27.1s over a cable connection[1](#fn:1).

If you’re going to build an image loader that hides the whole page until all images are ready, you must also ask yourself **what if the images don’t arrive?**

This isn’t the first time I’ve encountered such an odd choice of development strategy. A popular A/B testing tool does something remarkably similar: they instruct developers to drop a `<script>` block into the HTML page that immediately applies `opacity: 0 !important` to the `<body>` element. While the page is hidden, an external and synchronous JavaScript file is requested from the provider’s origin. This external file contains all of the information needed to run the A/B test(s) on the page, and once the file applies the test(s), it then removes the `opacity: 0;`. However, the fatal flaw here is that the file responsible for showing the page again is separate to the file responsible hiding the page in the first place.

This means that if the second file, for whatever reason, doesn’t make it onto the user’s device _and_ execute successfully, we’ve left the user staring at a completely blank page. There are a number of ways that file could go missing: perhaps the third-party provider is suffering an outage; maybe the user has a third-party content blocker that strips out A/B testing software; what if the JavaScript is malformed and fails to execute? [These are all things that could, do, and will eventually go wrong](https://csswizardry.com/2017/07/performance-and-resilience-stress-testing-third-parties/), so if you’re a developer who decides that you’re going to forcibly hide a page until an event has taken place, you must also ask yourself **what if that event never happens?**

While ever you build under the assumption that things will always work smoothly, you’re leaving yourself completely ill-equipped to handle the scenario that they don’t. Remember the [fallacies](https://csswizardry.com/2017/11/the-fallacies-of-distributed-computing-applied-to-front-end-performance/); think about [resilience](https://resilientwebdesign.com/).

This short post feels like a summary of several other things I’ve been trying to teach for the past several years, so I would encourage you to also read:

-   [The Fallacies of Distributed Computing (Applied to Front-End Performance)](https://csswizardry.com/2017/11/the-fallacies-of-distributed-computing-applied-to-front-end-performance/) (November 2017)
-   [Airplanes and Ashtrays](https://csswizardry.com/2017/10/airplanes-and-ashtrays/) (October 2017)
-   [Performance and Resilience: Stress-Testing Third Parties](https://csswizardry.com/2017/07/performance-and-resilience-stress-testing-third-parties/) (July 2017)

1.  5Mb up, 1Mb down, 28ms RTT. [↩](#fnref:1)
    

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