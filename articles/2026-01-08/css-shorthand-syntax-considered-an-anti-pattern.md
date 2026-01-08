---
title: "CSS Shorthand Syntax Considered an Anti-Pattern"
source: "https://csswizardry.com/2016/12/css-shorthand-syntax-considered-an-anti-pattern/"
publishedDate: "2016-12-12"
category: "css"
feedName: "CSS Wizardry"
---

12 December, 2016

Written by **Harry Roberts** on **CSS Wizardry**.

There’s a very small but surprisingly significant (and even more surprisingly frequent) issue I spot a lot in other peoples’ code, either when working directly with it, refactoring it, or auditing it: the use of shorthand syntax in CSS.

Typically we would view shorthand syntax as a benefit: fewer keystrokes, fewer lines of code, less data over the wire. Sounds great! However, it comes with a rather troublesome side effect: **it often unsets other properties that we never intended to modify.**

When we write something like:

```
.btn {
  background: red;
}
```

…we’re likely to get a red background colour applied to our button. But what we’re really saying is this:

```
.btn {
  background-image: initial;
  background-position-x: initial;
  background-position-y: initial;
  background-size: initial;
  background-repeat-x: initial;
  background-repeat-y: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: red;
}
```

Simply by using the shorter syntax, we have implicitly decided that we want no image to start top-left, repeat x and y, to scroll with the element, and so on…

Nearly every problem, bug, or regression in CSS at scale is happens because we did too much too soon, and further down the line we’re being affected by that. What this basically comes down to is the fact that, with CSS, **you should only ever do as little as you need to do and nothing more.**

Misusing shorthand syntax is a surefire way to do too much too soon, as thus it should be avoided. CSS is a lot harder to undo than it is to do.

In this example, what we really wanted to say was this:

```
.btn {
  background-color: red;
}
```

Here we’ve done exactly what we needed to do, and absolutely nothing else.

* * *

One such example I encountered on a client project earlier this year looked a little like this:

```
.base-class {
  background-position: 0 0;
  background-repeat: no-repeat;
}

.base-class--modifier {
  background: radial-gradient(...)
}
```

The developer had—understandably—used a gradient syntax generator to create their rather complex radial gradient, but they found that things weren’t rendering correctly at all. Their gradient syntax was correct, autoprefixer was working just fine, but for some reason their page looked really, really broken.

They couldn’t work out at all what was going wrong, to the extent that an issue was raised which simply said ‘Get Harry to look at the gradients’. Enough years of experience told me instinctively what to look for, and sure enough, I found it: hidden away in the Sass for generating gradients was the `background` shorthand.

This is a problem commonly found in gradient generators, so:

1.  go and update your own gradient generators right now;
2.  submit pull requests to projects that you know to be using shorthand syntax;
3.  double check your copy/pasted syntax that you get from online generators.

The `background` example is just one of many instances in which we shouldn’t be using shorthand. Another very common use-case is vertical centring using `margin: 0 auto;`:

```
.wrapper {
  margin: 0 auto;
}
```

The problem here is that in order to use shorthand to define `auto` only once—but use it on both the left and right—we had to make a decision about top and bottom as well. That was a decision we shouldn’t have made, because now we’re explicitly removing any top or bottom margins that may have been intentionally introduced elsewhere.

If all you want to do is centre a `div`, then don’t mention anything to do with its top and bottom edges. Favour the longhand version:

```
.wrapper {
  margin-right: auto;
  margin-left:  auto;
}
```

Run a quick `grep` over your CSS project for the string `0 auto` right now and see what you find.

## Exceptions

So far we’ve looked at the problem with inadvertently unsetting other properties, but there is a scenario in which shorthand would be okay. Take for example:

```
.box {
  padding: 10px;
}
```

Here we aren’t inadvertently unsetting anything because we do want all four sides to carry `10px` padding. Here, shorthand makes complete sense. Also:

```
.btn {
  padding: 12px 24px;
}
```

…and:

```
.foo {
  margin: 12px 17px 16px 10px;
}
```

Here—although I’d question the use of [magic numbers](https://csswizardry.com/2012/11/code-smells-in-css/#magic-numbers)—we are still explicitly setting all four sides, so, again, this use of shorthand would still be okay.

The key thing to remember is that shorthand is bad when it’s affecting properties that you don’t actually need to modify.

* * *

This kind of action—the inadvertent unsetting of other properties—is particularly problematic in modular and composable systems, where many different classes may be used in conjunction with one another to form more complex composites. Units of code that cannot be combined without collision or conflict are said to lack _orthogonality_, an important principle in the design of software.

-   **Always favour the longhand.** It might be more keystrokes, it might be more repetitive, it might be less DRY, but it’s more accurate.
-   **Only write as much as you need and not a single bit more.** Most CSS issues are caused by applying things too broadly; avoid it.

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