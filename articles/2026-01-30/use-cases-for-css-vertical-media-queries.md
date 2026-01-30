---
title: "Use Cases For CSS Vertical Media Queries"
source: "https://ishadeed.com/article/vertical-media-queries/"
publishedDate: "2016-04-28"
category: "css"
feedName: "Ahmad Shadeed"
---

Two weeks ago, [Sara Soueidan](https://twitter.com/sarasoueidan/status/721004691719659520) tweeted about the love of CSS Vertical Media Queries, I’ve remembered that I used them in some projects and so I decided to write an article about them.

We all love media queries, don’t we? Without them our layouts won’t be responsive. Media queries that check for `min-width` and `max-width` are well-known and used a lot. In this article we will explore different use cases for using vertical media queries in CSS. So we will focus on `min-height` and `max-height`.

## 1\. Sectioning Content

![](https://ishadeed.com/assets/vertical-mq/sectioning-content.jpg)

Sometimes the designer work on a web page that is divided into multiple sections, each one should occupy the full viewport height. In CSS, the easiest way to do it is by using viewport unites `vh, vw, vmin, vmax`. If each section has a content that almost fill it, in smaller viewport height this will cause an overlapping issue so we will notice that each section content appear above the other.

The solution is that we apply the `height: 100vh` only if the height is bigger than a specified value, test your design and when you notice that something is broken, add a breakpoint.

## Demo

See the Pen [Sectioning Content](https://codepen.io/shadeed/pen/e4e1d7093c90afb07d287148dcc5eb24/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

Now the section default height will be determined by the content inside it and if the viewport height is bigger than 400px and width is > 500px, the section height will be `100vh` (100% of the viewport).

![](https://ishadeed.com/assets/vertical-mq/fixed-header.jpg)

Fixed headers are a trend and requested from clients a lot these days. I personally don’t like them because they occupy from the screen estate, specially if the height was a bit big. In smaller viewport screens, like for example a mobile landscape mode, why not making the header fixed? We can make it like so only after a certain height so we will be sure that the it doesn’t occupy a lot from the screen estate.

## Demo

See the Pen [Fixed Header](https://codepen.io/shadeed/pen/aa71861a791e311d42b5580a0b7816de/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

![](https://ishadeed.com/assets/vertical-mq/fixed-footer.jpg)

When you have a fixed footer in your design and you want it to be fixed while scrolling, you might face an issue when the viewport height is not big enough, the hero section content will overlap with the footer and the user won’t be able to read the text. So for that, we will apply the fixed thing for the bar only when the viewport height is good.

## Demo

See the Pen [Fixed Footer](https://codepen.io/shadeed/pen/c840500f5302b49017d74f6c7d350b74/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

## 4\. Modals

![](https://ishadeed.com/assets/vertical-mq/modals.jpg)

Usually the modal (dialog) should be centered vertically and horizontally. The goal of this is to grab the user attention. But, in smaller viewport screens the modal top and bottom edges might be very close to the screen vertical edges. In that case, it’s better to make the modal centered horizontally only and for the vertical centering, it will stick to top (no centering).

## Demo

See the Pen [Modals](https://codepen.io/shadeed/pen/c3d9d8b94567624bec235f3512304f98/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

![](https://ishadeed.com/assets/vertical-mq/mobile-menu.jpg)

There are a lot of patterns for mobile navigation. One of them that cover the whole screen as in the below illustration. In mobile portrait mode it’s almost looking good and the user doesn’t need to scroll down a lot. But in landscape mode, the scrolling will be annoying so the solution for that is to check for height, if it’s less than `400px` for example, each navigation item will occupy 50% width.

![](https://ishadeed.com/assets/vertical-mq/mobile-menu-solution.jpg)

## Demo

See the Pen [Mobile Menu](https://codepen.io/shadeed/pen/de25ac5747897958e62fad793f0b8317/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

![](https://ishadeed.com/assets/vertical-mq/sidebar-vs-header.jpg)

In some cases, it’s useful to switch the header element between being fixed at top and on the side. We can do that by checking for the width and height.

![](https://ishadeed.com/assets/vertical-mq/sidebar-vs-header-solution.jpg)

## Demo

See the Pen [Sidebar Vs. Header](https://codepen.io/shadeed/pen/d5af72aa8816318dbc8977dfe54c31f9/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

## 7\. Shrinking Font Sizes and Spacing

Simply the idea is to shrink the font sizes and spacing to show more content when the height is not enough. While I don’t recommend to follow this approach 100%, but be sure to use it with care. Test, Test, test…

Bootstrap has a nice example of this, while I was searching about the topic I found a [page](https://css-tricks.com/examples/VerticalMediaQueries/bootstrap.html) on CSS Tricks that has an example of this idea.

![](https://ishadeed.com/assets/vertical-mq/font-sizes.jpg)

## Demo

## The End

It’s the end! Do you have any interesting use cases that you would like to share with me? I will be happy to hear from you on Twitter! Ping me on [@shadeed9](https://twitter.com/shadeed9)

{% include note.html content = “Some of the above use cases and solutions are examples of issues I faced while working on real projects. That said, they might not work for your case so please pick them wisely and carefully.” %}

Further reading:

-   [5 Uses for Vertical Media Queries](http://www.sitepoint.com/5-uses-vertical-media-queries/)
-   [Go Vertical](http://cognition.happycog.com/article/go-vertical/)
-   [Vertical Media Queries - Twitter Bootstrap Example](https://css-tricks.com/examples/VerticalMediaQueries/bootstrap.html)
-   [Quick Tip: Spare a Thought for Vertical Break Points](http://webdesign.tutsplus.com/tutorials/quick-tip-spare-a-thought-for-vertical-break-points--webdesign-18387)

{% include share.html text = “Use Cases For CSS Vertical Media Queries” link = “[https://ishadeed.com/article/vertical-media-queries/](https://ishadeed.com/article/vertical-media-queries/)” %}

Thank you for reading, you are AWESOME <3