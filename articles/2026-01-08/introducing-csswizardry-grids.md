---
title: "Introducing csswizardry-grids"
source: "https://csswizardry.com/2013/02/introducing-csswizardry-grids/"
publishedDate: "2013-02-07"
category: "css"
feedName: "CSS Wizardry"
---

7 February, 2013

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Featured case study: NHS](#)

Yesterday I wrote [Responsive grid systems; a solution?](https://csswizardry.com/2013/02/responsive-grid-systems-a-solution/), all about the principles behind creating the fluid grid system in [inuit.css](http://inuitcss.com/). That post deals with the thoughts, reasonings and theory behind how such a grid system works. _This_ post is [csswizardry-grids](http://git.io/csswizardry-grids)’ elevator pitch:

> csswizardry-grids is a simple, fluid, nestable, flexible, Sass-based, responsive grid system. It allows you to rapidly construct fully responsive websites whilst abstracting all the layout information away from your components, as all good grid systems should.

-   [csswizardry-grids source on GitHub](http://git.io/csswizardry-grids)
-   [Basic demo](https://csswizardry.github.com/csswizardry-grids)

**N.B.** I am a huge proponent of the extra `div`s style grid systems which keep your page’s layout and content totally separated. To find out more as to why, I recommend watching my [Breaking Good Habits](https://vimeo.com/44773888?t=20m25s) talk from Front-Trends, 2012.

csswizardry-grids allows you to configure your gutters and your own breakpoints to cater to layouts for palm-based, lap-based, portable and stationary devices. It works on the principle of percentages, rather than absolute columns, meaning that there are no confusing `.span-6` classes that behave like `.span-12` ones at smaller sizes.

### Featured case study: NHS

How I helped the NHS rapidly build a brand new product.

[Read case study…](https://csswizardry.com/case-studies/nhs-nhsx-elearning-platform/)

The grids are also fully (infinitely) nestable, meaning you can apply sizing to your sub-components as well as to your page-level layout. Furthermore, csswizardry-grids’ implementation is left entirely up to you, with two options:

1.  **To use ‘solid’ classes** which are basically just traditional CSS classes like `.one-half`. These need applying directly in your markup, e.g.: `<div class="grid__item one-whole desk-one-half">`.
2.  **To use Sass’ silent classes** which means that the classes sit ‘invisibly’ in your Sass and never get compiled to CSS until they are actually, explicitly used. You can turn this on via the `$use-silent-classes` variable.

Implementing silent classes means that your markup would now be something like:

```
<div class="content">
```

And your CSS:

```
.content{
    @extend %grid__item;
    @extend %one-whole;
    @extend %desk-one-half;
}
```

Each method has its merits, and it is left entirely to you to decide which you’d prefer to use.

* * *

So there you have [csswizardry-grids](http://git.io/csswizardry-grids), a micro-library for creating fully responsive layouts from breakpoints of your choosing.

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