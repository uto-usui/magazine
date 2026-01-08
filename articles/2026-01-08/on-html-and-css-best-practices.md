---
title: "On HTML and CSS best practices"
source: "https://csswizardry.com/2011/12/on-html-and-css-best-practices/"
publishedDate: "2011-12-11"
category: "css"
feedName: "CSS Wizardry"
---

11 December, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Further reading](#further-reading)

Best practices are exactly that; _best_. Not ‘better’, not ‘good when…’ or ‘best if…’, just best. They’re always the best, no matter what.

This is something I learned whilst undertaking the single biggest project of my career so far; the complete (and not-yet-live) rebuild of one of BSkyB’s most trafficked websites. For years I’d been working on medium-sized projects where I strove to use as few classes as possible, my CSS was so elegant and hand-crafted and everything used the cascade. I thought it was beautiful.

I found my old approach isn’t best practice when working on a big site, therefore it’s not best practice at all… You can scale down the big site mentality to smaller builds, you can’t scale up small site mentality to bigger ones. With this in mind, how you’d build bigger sites is best practice, how you tend to build smaller sites is _typically_ (though, as ever, not always) based on fallacy and myth.

I recently rebuilt my friend [Sam’s design portfolio site](http://sampenrose.co.uk/). Typically I’d have used IDs everywhere, not used any OO and not really paid much attention to the length or efficiency of my CSS selectors. This would have worked but only because the site is small. Any attempts by Sam to scale the site up, add pages, move components or alter the layout would have been hampered by these methods. Instead I decided to apply big-site mentality and dropped any IDs, used an OO approach and made sure every component is reusable. [The resulting code](https://github.com/csswizardry/sampenrose.co.uk) is incredibly flexible, very efficient and still looks nice.

-   OOCSS is _always_ best practice.
-   DRY is _always_ best practice.
-   Efficiency is _always_ best practice.
-   Maintainability is _always_ best practice.
-   Flexibility is _always_ best practice.

It doesn’t matter if you’re building the next Facebook or if it’s just a site for the builder down the road; best practice is always best. You might not notice an inefficient selector on a small site, but it doesn’t mean that it’s not still inefficient. Just because you don’t notice something it doesn’t mean it’s not still happening.

Build every site like it’s a 1000 page behemoth because then it can scale; it may never need to, but it _can_. Building every site like it’s a piece of art, using convoluted selectors and rigid, ID ridden code, it can never scale, even if you want it to.

Your code might look like the [Sistine Chapel](https://en.wikipedia.org/wiki/Sistine_Chapel), but if it’s a chore to maintain, or you find you can’t pick up a component and drop it anywhere with zero worry, then it’s not powerful. Code is about power before prettiness. You might feel dirty at first, but when you realise how nicely things fall into place using proper best practices you’ll see the benefits.

The only person who cares how pretty your code is is you. Your users want fast UIs, your clients want reliable builds and you and your team want code that is easy to maintain 6 months and a dozen client mind-changes down the line.

**Best always means best, it has no caveats or conditions.**

## Further reading

-   [Our Best Practices are Killing Us](http://www.lukew.com/ff/entry.asp?1379) by Nicole Sullivan
-   [OOCSS.org](http://oocss.org/)

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