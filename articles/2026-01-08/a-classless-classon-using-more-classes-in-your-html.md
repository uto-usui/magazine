---
title: "A classless class—on using more classes in your HTML"
source: "https://csswizardry.com/2012/10/a-classless-class-on-using-more-classes-in-your-html/"
publishedDate: "2012-10-17"
category: "css"
feedName: "CSS Wizardry"
---

16 October, 2012

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

This article is a pretty basic one, but it’s aimed at developers struggling to shake the idea that classes in your HTML are somehow a bad thing. Quite often, developers new to OOCSS find it hard to transition from adding no classes to anything to adding as many as you need (i.e. a lot more than you were).

Imagine a classroom full of children with no names. In order to organise and refer to them the teacher has a system; the guy two rows from the back, the kid next to the girl next to the kid under the light, the girl near the window, the first guy sat in the carpeted area…

Her seating plan reads like a board game. As soon as the guy next to the window swaps places with the girl next to the radiator then she has to remember that it’s now the guy near the window, and that the girl near the guy near the window is now near the _girl_ near the window.

As soon as anything moves or changes she has to do a lot of rethinking and making sure things still check out. If the guy near the door is now the guy under the AC unit then is that definitely the right girl next to the guy who used to be the _girl_ under the AC unit? Who knows?

This is obviously madness, but…

…this is how a lot of people are trying to write HTML.

This little analogy was born the other day when someone Tweeted:

> Struggling to switch to OOCSS. I’m not used to classing everything up, for so long it was all about super-clean HTML…

And I replied with:

> Imagine a teacher trying to control a class of kids who have no names. That’s how we used to write our HTML >.<

When things aren’t explicitly named—and we try and rely on coincidental and circumstantial situations to try and refer to and target them—we find ourselves in a real mess where things quickly become invalid or break/fail. Things are hard to manipulate and work with. We have to try and remember the dependencies our references have on our structure. Things are basically unstable and chaotic.

The above analogy sits _perfectly_ with the kind of HTML we often wrote, and the selectors we used to target it:

-   **The guy two rows from the back** is like `nth-of-type(){}`
-   **The kid next to the girl next to the kid under the light** can be likened to `el el + el{}`
-   **The girl near the window**—`el + el{}`
-   **The first guy sat in the carpeted area**—`el > el:first-of-type{}`

Things are much, _much_ easier to select when we explicitly name them. How much easier is it to say ‘Ben’ rather than ‘You near the stationery cupboard’? How much more easily can you swap James and Becky round when they have names, instead of saying ‘AC dude, swap with her next to her next to him near the sandpit’?

Loads more.

This is how we should start imagining our HTML. For the longest time we strove to keep our HTML free of classes, that meant that the only way of targeting things was through the convoluted selectors like I outlined above. I mean, no one really goes as far as to drop _all_ classes _entirely_ (there are a few notable exceptions), but the comparison still stands.

In a similar vein to my previous article, [Shoot to kill; CSS selector intent](https://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/), your selectors should be just as specific as an elements purpose/function. Don’t use `.header ul{}` if what you _really_ mean is `.site-nav{}`.

Of course, not everything needs a class, but going back to the classroom analogy the teacher might want to select a subset of people, perhaps all the girls. This you could liken to an element; boys, girls, teachers, janitors are all like types of element and these it often _does_ make sense to select on (all links need to be red, all `h1`s need to be a certain size etc). But what if you want to single out all milk-monitors or all people over 6 years old…? These subsets are explicit and reasoned, therefore the way you select them should be too. **Your selectors should be as explicit as your reason for wanting to select something.**

The long and short of this story is that it _is_ difficult to transition from the older (and frankly naïve) ways of working, but when you stop and think _why_ we name things you soon realise that it’s the only sensible way. Next time you’re building away stop and think of the kids with no names; only this time it’s not a classroom, it’s a website, and they’re not kids but components and elements and chunks of HTML. It just makes sense to give them nice explicit names, because the way you’d manage it otherwise is just daft…

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