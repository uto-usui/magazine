---
title: "Extending silent classes in Sass"
source: "https://csswizardry.com/2014/01/extending-silent-classes-in-sass/"
publishedDate: "2014-01-07"
category: "css"
feedName: "CSS Wizardry"
---

7 January, 2014

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Featured case study: NHS](#)

This is a shorter, tip-style post that covers a little thing I like to do when writing Sass. It’s something that I’ve been asked about in workshops, and something I hope to bring to the new version of [inuitcss](http://inuitcss.com/).

When writing Sass, specifically any objects or abstractions, I write it like this:

```
.foo,
%foo {
    color: red;
}
```

The reason for the solid and the silent class is simple: I only use the silent class as the subject of an `@extend`.

[Oliver J Ash](https://twitter.com/OliverJAsh) wrote [a great post](http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html) that I would really recommend you read; it will give this post a lot more context.

In short, **a common problem with `@extend` is that it will indiscriminately extend _every_ instance of a matching selector that it finds**. For example, if you author this:

```
.foo {
    color: red;
}

.footer .foo {
    font-weight: bold;
}

.bar {
    @extend .foo;
}
```

You might expect, or _want_, to see some output like this:

```
.foo, .bar {
    color: red;
}

.footer .foo {
    font-weight: bold;
}
```

However, anyone who’s used Sass’ `@extend` directive before will know that what you actually get is this:

```
.foo, .bar {
    color: red;
}

.footer .foo, .footer .bar {
    font-weight: bold;
}
```

What Sass has done is it’s extended _every_ instance of `.foo` that it could find. This is a very timid example, but Oliver’s article will paint a more detailed picture of what’s going on.

In order to circumvent this correct-but-unexpected (but really should be totally expected) behaviour, I came up with a very simple way of managing my `@extend` directives: **make sure that the subject of an `@extend` only exists once in a project**.

There are a number of ways you could achieve this, perhaps a simple naming convention or a namespace, something like:

```
.foo,
.x-foo {
}
```

Remembering to only ever `@extend` the `x-` prepended version—and avoid writing the prepended version elsewhere—means that there’s no chance of an overzealous `@extend` directive yielding far more CSS than we were expecting.

### Featured case study: NHS

How I helped the NHS rapidly build a brand new product.

[Read case study…](https://csswizardry.com/case-studies/nhs-nhsx-elearning-platform/)

The only issue with this, really, is the fact that the `x-` classes will still appear in my CSS. Not such a big deal, but considering the whole point of this exercise is to _reduce_ the amount of classes in our CSS, it seems a little counter-productive.

The obvious solution to this particular problem is _silent classes_. Instead of:

```
.foo,
.x-foo {
}
```

We’d write:

```
.foo,
%foo {
}
```

Now the `%foo` silent class—which should only ever exist once in any project—is the subject of our `@extend`. This means that we can limit the reach of our `@extend`s, and not have that placeholder class appear in our compiled stylesheet(s).

Our Sass now looks like this:

```
.foo,
%foo {
    color: red;
}

.footer .foo {
    font-weight: bold;
}

.bar {
    @extend %foo;
}
```

And our compiled CSS now looks exactly how we want it:

```
.foo,
.bar {
    color: red;
}

.footer .foo {
    font-weight: bold;
}
```

The rules to follow:

1.  Only write a given silent class once in your Sass.
2.  Only ever `@extend` silent classes.
3.  Use solid classes in markup, and as many times as you need in your Sass.

**All we’re really doing is making sure the selectors we `@extend` exist as few times as possible.**

Of course, this solution isn’t bulletproof, failsafe, or ideal; it’s only as good as your ability to stick to it, and your ability to stick to it isn’t always entirely in your own hands. It’s simply a little hack I came up with in order to make use of `@extend` (which, incidentally, I don’t really use much anyway) whilst attempting to mitigate the effects of its ‘greedy’ nature.

There may well be better ways—and I’d love to hear them—but this, for now, is how I’m handling it. I actually created a mixin (which hasn’t been stress tested _at all_) to generate this in one, DRYer go: [jsfiddle.net/csswizardry/ECntr](http://jsfiddle.net/csswizardry/ECntr/)

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