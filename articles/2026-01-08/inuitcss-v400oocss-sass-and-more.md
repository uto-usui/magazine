---
title: "inuit.css v4.0.0—OOCSS, Sass and more"
source: "https://csswizardry.com/2012/09/inuit-css-v4-oocss-sass-and-more/"
publishedDate: "2012-09-30"
category: "css"
feedName: "CSS Wizardry"
---

30 September, 2012

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [OOCSS](#oocss)
2.  [Who for?](#who-for)
3.  [The proof is in the pudding](#the-proof-is-in-the-pudding)
4.  [Bootstrap?](#bootstrap)
5.  [Roadmap](#roadmap)
6.  [Using inuit.css?](#using-inuitcss)

I decided to completely overhaul [inuit.css](http://inuitcss.com/) over the last couple of weeks. It’s now at version 4.0.0 and completely incompatible with previous versions of the framework.

It is now written on top of Sass, not doing anything particularly exciting but taking advantage of includes and variables to make your life a little easier.

[inuit.css on GitHub](http://inuitcss.com/)

## OOCSS

inuit.css is fully OO; it is a library which does very little styling but a _lot_ of heavy lifting. inuit.css’ job is to package up design patterns and abstractions such as [the nav abstraction](https://csswizardry.com/2011/09/the-nav-abstraction/), [the island object](https://csswizardry.com/2011/10/the-island-object/) and more.

OOCSS promotes DRYness, abstractions, reuse, portability and lends itself well to scalability, making inuit.css ideal for projects of any size (especially big ones!).

## Who for?

inuit.css is great for designers because it doesn’t tread on their toes, but inuit.css is also super-awesome for developers. It borrows a lot from programming principles (objects and abstractions, DRY, single responsibility principle) as well as being written in a very developer-friendly manner. inuit.css features DocBlock comments, 80 char line lengths, heavily documented, lots of whitespace.

I genuinely believe inuit.css has the potential to be the most useful CSS framework on the market. The quality of the code is far better than most other alternatives, the principles employed are tried and tested on sites of all sizes, it does one job and it does that job very well. It’s a project and codebase I’m very proud of and hope that, as it starts getting used, people will start to believe in it as much as I do.

## The proof is in the pudding

Rather shamefully, I never actually used previous versions of inuit.css on any projects. With version 4.0.0 I will be using inuit.css as standard on any projects I begin. In fact, it has already been forked and reused in a big, new project at Sky. This version of inuit.css is the most useful version there has been.

## Bootstrap?

Bootstrap is getting a lot of love lately, and it’s not a bad framework, but inuit.css does a very different job. Bootstrap is fine if you’re a developer who needs a framework to do the design for you, but Bootstrap is of no use to a designer who needs a hand with the CSS. inuit.css aims to be more useful to a wider array of people than Bootstrap is; inuit.css is a design-free framework meaning it can be used on literally any type of project. You define your own font sizes, your own spacing units for paddings etc and you extend inuit.css with your own stylesheet to add skin. inuit.css makes no decisions or assumptions, because that’s not the job of a framework.

The result of this is a more versatile framework that can be used on any projects of any size, and there’ll be no need to edit or delete anything; no undoing someone else’s design decisions, no needing to alter someone else’s code. inuit.css is as little as possible whilst also being a hell of a lot.

## Roadmap

There’s no official roadmap for inuit.css but I’m finally happy enough with the architecture, content and abilities of the framework to safely say this should be the last complete rewrite.

The framework’s architecture is something I have proven to myself time and again on working on big sites at [Sky](http://sky.com/), so I’m confident it’s ‘the right way’. As such, inuit.css will only grow and mature, never really change. As I get better with Sass I’ll add/update any mixins etc, and as I dream up more objects and abstractions they will get added accordingly.

## Using inuit.css?

If you use inuit.css on any projects that make it live, drop me a tweet and I’ll send you out some inuit.css stickers!

[inuit.css](http://inuitcss.com/)

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