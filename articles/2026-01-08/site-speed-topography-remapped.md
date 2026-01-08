---
title: "Site-Speed Topography Remapped"
source: "https://csswizardry.com/2023/06/site-speed-topography-remapped/"
publishedDate: "2023-06-08"
category: "css"
feedName: "CSS Wizardry"
---

7 June, 2023

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [What Is Site-Speed Topography?](#what-is-site-speed-topography)
2.  [Remapping](#remapping)

**N.B.** This is an update to my 2020 article [Site-Speed Topography](https://csswizardry.com/2020/11/site-speed-topography/). You will need to catch up with that piece before this one makes sense.

Around two and a half years ago, I debuted my [Site-Speed Topography](https://csswizardry.com/2020/11/site-speed-topography/) technique for getting broad view of an entire site’s performance from just a handful of key URLs and some readily available metrics.

In that time, I have continued to make extensive use of the methodology (alongside additional processes and workflows), and even other performance monitoring tools have incorporated it into their own products. Also in that time, I have adapted and updated the tools and technique itself…

[Get the new spreadsheet!](https://csswizardry.gumroad.com/l/site-speed-topography-remapped)

## What Is Site-Speed Topography?

Firstly, let’s recap the methodology itself.

The idea is that by taking a handful of representative page- or template-types from an entire website, we can quickly build the overall landscape—or _topography_—of the site by comparing and contrasting numerical and milestone timings.

Realistically, you _need_ to read [the original post](https://csswizardry.com/2020/11/site-speed-topography/) before this article will make sense, but the basic premise is that by taking key metrics from multiple different page types, and analysing the similarities, differences, or variations among them, you can also very quickly realise some very valuable insights about other metrics and optimisations you haven’t even captured.

Pasting a bunch of [WebPageTest](https://www.webpagetest.org/) results into a spreadsheet is where we start:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2020/10/milestones-spreadsheet.png)

The old _Site-Speed Topography_ spreadsheet. Plugging milestone timings into a spreadsheet helps us spot patterns and problems.

Similar [TTFB](https://csswizardry.com/2019/08/time-to-first-byte-what-it-is-and-why-it-matters/) across pages suggests that no pages have much more expensive database calls than others; large deltas between TTFB and First Contentful Paint highlight a high proportion of render-blocking resources; gaps between Largest Contentful Paint and SpeedIndex suggest late-loaded content. These insights gained across several representative page types allow us to build a picture of how the entire site might be built, but from observing only a small slice of it.

The backbone of the methodology is—or at least _was_—viewing the data graphically and spotting patterns in the bar chart:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2020/10/milestones-chart.png)

Viewing the data as a bar chart can help highlight some of the issues.

Above, we can see that the Product Listing Page (PLP) is by far the worst performing of the sample, and would need particular attention. We can also see that First Paint and First Contentful Paint are near identical on all pages except the PLP—is this a webfont issue? In fact, [we can see a lot of issues](https://csswizardry.com/2020/11/site-speed-topography/#building-the-map) if we look hard enough. But… who wants to look hard? Shouldn’t these things be easier to spot?

**Yes**. They should.

## Remapping

If you read the original post, the section [Building the Map](https://csswizardry.com/2020/11/site-speed-topography/#building-the-map) explains in a lot of words a way to spot visually a bunch of patterns that live in numbers.

Surely, if we have all of the facts and figures in front of us anyway, manually eyeballing a bar chart to try and spot patterns is much more effort than necessary? We’re already in a spreadsheet—can’t we bring the patterns to us?

**Yes**. We can.

Here is the new-look _Site-Speed Topography_ spreadsheet:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/06/site-speed-topography-01.png)

A much more colourful spreadsheet provides way more information. [View full size/quality (182KB)](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/06/site-speed-topography-01-large.png)

[Get the new spreadsheet!](https://csswizardry.gumroad.com/l/site-speed-topography-remapped)

Now, without having to do any mental gymnastics at all, we can quickly see:

-   How pages perform overall across all metrics.
-   Which pages exhibit the best or worst scores for a given metric.
-   General stability of a specific metric.
-   Are any metrics over budget? By how much?
    -   We can also set thresholds for those budgets.
-   We can begin to infer other issues from metrics already present.

Of course, we can still graph the data, but we soon find that that’s almost entirely redundant now—we solved all of our problems in the numbers.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/06/site-speed-topography-02.png)

Graphing the data doesn’t provide as much benefit anymore, but it’s built into the spreadsheet by default.

Visually, patterns do still emerge: the PD- and SR-Pages have more dense clusters of bars, suggesting overall worse health; the Home and Product pages have by far the worst LCP scores; the SRP’s CLS is through the roof. But this is only visual and not exactly persistent. Still, I have included the chart in the new spreadsheet because different people prefer different approaches.

Without looking at a single line of code—without even visiting a single one of these pages in a browser!—we can already work out where our main liabilities lie. We know where to focus our efforts, and our day-one to-do list is already written. No more false starts and dead ends. **Optimise the work not done.**

So, what are you waiting for? [Grab a copy of the new Site-Speed Topography spreadsheet along with a 15-minute screencast explainer!](https://csswizardry.gumroad.com/l/site-speed-topography-remapped)

[Get the new spreadsheet!](https://csswizardry.gumroad.com/l/site-speed-topography-remapped)

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