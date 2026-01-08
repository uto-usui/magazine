---
title: "Sam Penrose Design—process and write-up"
source: "https://csswizardry.com/2011/11/sam-penrose-design-process-and-write-up/"
publishedDate: "2011-11-03"
category: "css"
feedName: "CSS Wizardry"
---

2 November, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Progressive enhancement](#progressive-enhancement)
2.  [Content-out](#content-out)
3.  [Mobile first](#mobile-first)
4.  [Responsive](#responsive)
5.  [Designed in the browser](#designed-in-the-browser)

Last weekend, one of my best friends [Sam](https://twitter.com/sam_penrose) and I had a hack-weekend. One weekend of non-stop design and build. It was a pretty brutal affair considering we were only making a tiny portfolio site; a weekend of 4am nights, junk food, beer and dangerous amounts of Red Bull.

I’ve just about recovered now, and here is the result: [Sam Penrose Design–Creative designer and graffiti artist based in Leeds, UK](http://sampenrose.co.uk/)

This was a really cool build for me, Sam was a great ‘client’ in that he instantly ‘got’ progressive enhancement, he was totally cool with the fact that differences between browsers may be quite obvious (and glaring). He was fine with his idea of a design ending up being more like three designs, when different browsers are accounted for.

Buzzword time! This build was:

-   _Heavily_ progressively enhanced
-   Content-out
-   Mobile first
-   Responsive
-   Designed in browser

I’ll touch on each of these in a little more detail.

## Progressive enhancement

Basic really; this site uses loads of gradients, round corners, shadows, all that stuff. None of it works in IE\_x\_ but that’s cool. Sites don’t have to look the same in every browser (and we took that to a bit of an extreme where media queries are concerned).

It uses my [fluid carousel](https://csswizardry.com/2011/10/fully-fluid-responsive-css-carousel/) which doesn’t even behave like a carousel in IE, it acts as more of a promo. This is fine, though, as we were careful to only put non-essential content in here. Got a good browser? You get a pure CSS carousel. Got an older one? You get what looks like a nice, fluid promo panel.

## Content-out

We started off with just the content; I built pure markup to start, with no CSS whatsoever. We got the content into the page and then Sam decided how he’d like to design around that. It worked a treat and kept everything really really clean.

## Mobile first

With the content in place, we looked to build the site mobile first. This was really simple, but we spent most of the time on it. We simply created a fluid, single column design. We spent ages working on the mobile, most stripped back version to ensure that it was a perfect base. We wanted to make sure that anything on top of the mobile version would be taking the site [up to 11](https://www.youtube.com/watch?v=EbVKWCpNFhY).

Investing so much time on the mobile version was really fun and really sensible, it made the next bit a breeze.

## Responsive

Naturally, the site is responsive. The interesting thing is, though, that we’ve not bothered getting media queries to work in IE. The beauty of having spent so much time on the mobile version is that it’s not just an _okay_ state to serve IE, it’s actually a really nice one! The site is all fluid and built with `min-width` media queries to size the site up from mobile as opposed to down from desktop.

## Designed in the browser

Other than to process some portfolio images and create the dotted background image, Photoshop wasn’t used once. We built the whole site in the browser. The interesting thing about our process though was that Sam doesn’t code, but nor was he Photoshopping.

As he was learning the theory of exciting techniques in 2011 web design, he was applying them just as fast in order to art direct the design and build. He switched on to the idea of progressive enhancement and mobile first instantly so he didn’t struggle to adapt to a new way of thinking. He called the shots, saw how designing in the browser allowed us to test, iterate, drop and ultimately refine and create his ideas. Such a lean and neat process. He didn’t get precious about things, he didn’t beat a dead horse, he suggested, we tried, we reworked, we settled on the most pragmatic options.

So yeah, quite a fun and productive hack-weekend, if a little tiring.

Sam, by the way, is a newly freelance designer, so if you need any stuff doing you know where to find him. He’s also on Twitter at [@sam\_penrose](https://twitter.com/sam_penrose).

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