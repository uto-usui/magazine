---
title: "Writing DRYer vanilla CSS"
source: "https://csswizardry.com/2013/07/writing-dryer-vanilla-css/"
publishedDate: "2013-07-05"
category: "css"
feedName: "CSS Wizardry"
---

5 July, 2013

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Featured case study: NHS](#)

When dealing with code, we often strive to make things _DRY_. DRY code usually means two things:

1.  Less actual code, meaning smaller file sizes, less for the user to have to download, more efficient code, etc.
2.  Less to have to maintain; not repeating yourself means that you can make fewer changes to your codebase.

Simple, obvious stuff, I’m sure you’ll agree.

When we talk about DRY CSS, we usually mention things like OOCSS, abstractions, variables in Sass, etc. However, there is a way of DRYing out CSS at a much more fundamental and far smaller level. This is just going to be a short tip-style post covering how and where you can spot the chance to DRY things out in your regular/‘vanilla’ CSS.

When DRYing out code for maintainability, **it is preferable to DRY out the things most likely to change**, even if that does result in more code at the end. Take the following example:

```
.foo {
    border-top: 1px solid red;
    border-bottom: 1px solid blue;
}
```

This is a fairly innocuous looking snippet of CSS; we simply want to pop different coloured borders on the top and bottom of a `div`. However, we have some repetition here; we have the words `1px` and `solid` twice. If you ever want to change the border style on this `div`, you have to change two words. Not a big deal, right? But it’s still literally twice as many (i.e. **double**) what you should need to change. Extrapolate this example across an entire site then all of a sudden you have 200% as much code as you need in these cases.

Let’s rewrite this CSS a little more verbosely, but a lot DRYer (in terms of code that is likely to change):

```
.foo {
    border-width: 1px 0;
    border-style: solid;
    border-top-color: red;
    border-bottom-color: blue;
}
```

Or even:

```
.foo {
    border: 0 solid red;
    border-width: 1px 0;
    border-bottom-color: blue;
}
```

Far more CSS, but far less repetition! If we want to change the width of the borders we can do so in one go; if we want to change the style of border then we can make that change once. Even though there is more code, there is less repetition of the parts that are most likely to change. It doesn’t matter that the word `border` is written four times as you could never really change that, only delete it.

### Featured case study: NHS

How I helped the NHS rapidly build a brand new product.

[Read case study…](https://csswizardry.com/case-studies/nhs-nhsx-elearning-platform/)

Another decent example, using borders again:

```
.bar {
    border-top: 1px solid #ccc;
}

    .bar > li {
        border-bottom: 1px solid #ccc;
    }
```

Here we are simply applying a `border` to the top of a list and the bottom of all its `li`s, to create a bookended border effect. Again, though, not too DRY. Let’s rewrite it:

```
.bar,
    .bar > li {
        border: 0 solid #ccc;
    }

.bar {
    border-top-width: 1px;
}

    .bar > li {
        border-bottom-width: 1px;
    }
```

Once again, more code, but _far_ DRYer. We can change the colour and style of both the list’s and its `li`’s borders in one go.

Another example (and these really are only examples):

```
.page--home {
    background: url(home.jpg) center center no-repeat;
}

.page--about {
    background: url(about.jpg) center center no-repeat;
}

.page--work {
    background: url(work.jpg) center center no-repeat;
}

.page--contact {
    background: url(contact.jpg) center center no-repeat;
}
```

Again, a lot of repetition. Not in absolute terms, but certainly more than is necessary. We can DRY that out by rewriting it as:

```
.page {
    background-position: center center;
    background-repeat: no-repeat;
}

.page--home     { background-image: url(home.jpg); }
.page--about    { background-image: url(about.jpg); }
.page--work     { background-image: url(work.jpg); }
.page--contact  { background-image: url(contact.jpg) }
```

Abstracting out the repeated parts and avoiding using shorthand means writing a few more lines of code, but massively trims down the amount of repetition.

All of these examples are pretty tame, but they should hopefully serve as a decent springboard from which you can extrapolate and extend the idea of rewriting your code to avoid repetition; more specifically, _the repetition of the parts of your CSS that are most likely to change_.

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