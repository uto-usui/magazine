---
title: "Fluid grid calculator"
source: "https://csswizardry.com/2011/06/fluid-grid-calculator/"
publishedDate: "2011-06-29"
category: "css"
feedName: "CSS Wizardry"
---

28 June, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [](#fluid-grid-calculator)[Fluid grid calculator](https://csswizardry.com/fluid-grids/)
2.  [How it works](#how-it-works)
    1.  [A note on inuit.css](#a-note-on-inuitcss)

What with [Ethan’s book](http://www.abookapart.com/products/responsive-web-design) and [A List Apart](http://www.alistapart.com/articles/responsive-web-design/) article the whole community is responsive design mad. Which is a good thing… I’ve been looking at redesigning CSS Wizardry onto a fluid grid and also adding a custom fluid-grid-igloo builder for [inuit.css](http://inuitcss.com/).

## [Fluid grid calculator](https://csswizardry.com/fluid-grids/)

In doing these I realised how time consuming it is actually working out your percentages. I wrote a little proof of concept PHP script the other day and, as a test-case, decided to run the grid system we use at work through it. The outcome was surprisingly good so I got the script finished!

All I needed was to test, test and test it then pop a UI on it and bam! Here it is, my [fluid grid calculator](https://csswizardry.com/fluid-grids/).

## How it works

You give the calculator the number of columns you want your grid system to have, how wide you want one of those columns to be and, finally, how wide you want the gaps between each column (gutters) to be.

Given just these three bits of information the script gives you back a full stylesheet–which you can download–which contains the measurements for all of your possible grid sizes, their gutters and their containers.

Now, this is in Super-Uber-Pre-Alpha™ so please report any bugs to me as soon as you can, preferably via [Twitter](https://twitter.com/csswizardry).

### A note on inuit.css

As I mentioned I am currently working on integrating this calculator into [inuit.css](http://inuitcss.com/) so you can build your own custom fluid grids. However, there is _a lot_ of work involved in removing old code and building a builder that will construct a perfect igloo. I’m working on it, but it will take time. To be the first in the know follow [the inuit.css Twitter account](https://twitter.com/inuitcss).

In the meantime you can simply paste your [generated grid system](https://csswizardry.com/fluid-grids/) into your own inuit.css extension.

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