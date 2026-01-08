---
title: "The Importance of !important: Forcing Immutability in CSS"
source: "https://csswizardry.com/2016/05/the-importance-of-important/"
publishedDate: "2016-05-09"
category: "css"
feedName: "CSS Wizardry"
---

8 May, 2016

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Never Use `!important` in Anger](#never-use-important-in-anger)
    1.  [Hacking Specificity](#hacking-specificity)
2.  [Forcing Immutability with `!important`](#forcing-immutability-with-important)
3.  [A Note on Utility Classes](#a-note-on-utility-classes)

There’s a piece of advice I give out to clients and workshop attendees that is often met with shock and horror:

**I advise the use of `!important`.**

For the most part, I’m glad that the initial reaction is disgust—`!important` usually _is_ bad news—however, there’s a little more to it than that…

As with most things, there are exceptional circumstances in which following the rules would actually be a pretty bad idea, and it’s usually context and discretion that inform our decision to break them.

For example, in the UK, the speed limit is 70mph (unfortunately we do still use miles). You are not allowed to drive faster than 70mph. It’s illegal. You just can’t do it.

_However…_ if your friend is dying in the back seat and you’re trying to get them to hospital before they bleed out everywhere, by all means, drive faster than 70mph!

In 90% of situations, the rule is a good one. By and large, we’re much better off following it than not following it. But there will definitely be situations that fall outside of that 90%.

Similarly, as we mature as developers, we need to recognise that the rules we live by will also have exceptions, given the correct circumstances.

With age (or time, I guess) comes wisdom, so with that it mind I would always tell junior developers not to use `!important` at all. But, once developers start to grow and learn that things aren’t always that black and white, we can get a little more detailed and nuanced, and throw in some caveats.

But before we look at the exceptions to the rule, let’s look at the rule itself.

## Never Use `!important` in Anger

Using `!important` reactively is the most heavy-handed, nuclear, [all-the-way-up-to-11](https://www.youtube.com/watch?v=uMSV4OteqBE&t=78s) option we have at our disposal. Using `!important` to get yourself out of a problem with some existing CSS is most certainly inadvisable. It will have knock-on effects whose only solution will be to use another `!important`, then another, then another, ad infinitum.

Do not use `!important` reactively. Do not use `!important` to solve a specificity issue. Do not use `!important` in anger.

### Hacking Specificity

If we do find ourselves in a situation where existing styles are overriding our current work, we have much safer methods of altering their specificity.

If we need to bump the specificity of a single class up, we can chain it with itself (e.g. `.btn.btn {}`). If we need to bring the specificity of an ID down, we can rewrite it as an attribute selector (e.g. `[id="header"] {}`). You can read about that in much more detail in my [Hacks for Dealing with Specificity](https://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/) article.

Most of the time, there is no need to turn to an `!important`.

Right. When can we use it?

## Forcing Immutability with `!important`

The idea of immutability is one that really fascinates and resonates with me. The idea that something can never be changed after it’s been created sounds amazing! How much more confidence would we have if we knew that something always looked and behaved the same no matter where we put it? I like that idea a lot!

This is typically quite hard to achieve in CSS because it’s designed around an inheritance-based model which makes heavy use of mutations. But, there is a specific type of rule that can actually make great use of immutability, and do so very safely: utility classes.

Utility classes are tiny little classes that carry out very specific, very explicit jobs. Classes like:

```
.u-text-center { text-align: center; }

.u-float-left { float: left; }

.u-text-large { font-size: 48px; }
```

They all begin with a `u-` in order to tell the next developer [what their purpose is](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/), and they all carry out just one simple piece of styling.

All of the declarations in the rulesets above are defined without an `!important` on them, but they really, really ought to be. Here’s why:

By using a class like `u-text-center` in our HTML, we are making a definite, clear, unambiguous decision that we want some text to be centrally aligned. There is absolutely no question about that. However, the selector `.u-text-center {}` has a relatively low specificity, so there’s a chance that another selector could accidentally override it. Take the following HTML and CSS:

```
.sub-content h2 {
  ...
  text-align: left;
}

.u-text-center {
  text-align: center;
}
```

```
<div class="sub-content">
  <h2 class="u-text-center">...</h2>
</div>
```

Unfortunately, we have a specificity mismatch here: `.sub-content h2 {}` has a higher specificity than `.u-text-center {}`, so the `h2` ends up being aligned left despite us explicitly telling it to be `text-align: center;`. This is also a mutation: `u-text-center` no longer aligns something centrally.

This, in a nutshell, is why we should put `!important` on our utility styles. We want utilities to be immutable; there is no chance ever that we would apply a class of `u-text-center` and expect something **not** to end up with centred text.

**Force utility classes to be immutable by applying `!important` to their declarations.**

Of course, in a perfect world (whatever that is), we wouldn’t have a selector like `.sub-content h2 {}` even present in our CSS, but it’s inevitable that.

-   someone comes along and ends up writing a selector like that;
-   there was already a selector like that in some legacy part of the project.

Resilient and defensive systems are not designed for the perfect world, they’re designed for the real world, and in the real world, people write sloppy CSS. Using `!important` to force immutability will safeguard us from collisions and conflicts that others may introduce.

## A Note on Utility Classes

I suppose it would be wise to have a brief aside about the general use of utility classes in here.

If we are _not_ adhering to the [Tachyons](http://tachyons.io/)/[Basscss](http://www.basscss.com/)/[Atomic CSS](http://acss.io/) style of functional CSS (which is a different topic entirely), we probably don’t want to be seeing too many utility classes in our HTML.

If, instead, we’re taking a more modular and componentised approach to our CSS (which we _probably_ are), most of our classes will be very topical, e.g.:

```
.c-carousel {}

.o-media__body {}

.c-nav-primary {}

.c-btn--large {}
```

They will have a scope (a Block, in [BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)), and will be well encapsulated. The beauty of classes like this is that we can easily spot relationships in our HTML (something that’s much harder (nigh on impossible) with functional CSS), e.g.:

```
<blockquote class="o-media  c-testimonial">
  <img class="o-media__img c-testimonial__photo" ... />
  <p class="o-media__body c-testimonial__text">...</p>
</blockquote>
```

Here we can clearly see a relationship between two distinct and separate strands of styling.

Let’s say, however, that one specific testimonial needs to have a much larger `margin-bottom` applied to it. It’s not a treatment that all testimonials need, and it only needs the larger `margin-bottom` when it’s in this exact part of the page. This is a very implementation-specific design change.

Here we’d reach for a utility class:

```
<blockquote class="o-media
                   c-testimonial
                   u-margin-bottom-large">
```

We use a utility here because the extra `margin-bottom` doesn’t have anything to do with the testimonial specifically; it’s a very context-sensitive and temporary treatment, so we didn’t ought to hard code that change into our testimonial’s CSS.

On the flip side. If we have a style of testimonial that has a larger font size, and any testimonial anywhere on the site could adopt this variation, we would not use a utility. This is a non-temporary treatment that belongs specifically to the testimonial, so we should codify and encapsulate it using a BEM Modifier:

```
<blockquote class="o-media
                   c-testimonial  c-testimonial--large">
```

So, as a general rule:

**If it’s permanent styling, formalise it and code it right into your CSS. If it’s short-term or one-off styling, use a utility class.**

Utility classes are probably my ‘least favourite’ type of class because they are really only one step away from inline styles. Use them sparingly, and to target very temporary or implementation-specific changes.

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