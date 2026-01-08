---
title: "Hacks for dealing with specificity"
source: "https://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/"
publishedDate: "2014-07-17"
category: "css"
feedName: "CSS Wizardry"
---

17 July, 2014

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Low specificity IDs](#low-specificity-ids)
    1.  [Featured case study: NHS](#)
2.  [Safely increasing specificity](#safely-increasing-specificity)

As we’re all probably well aware by now, specificity is one of the quickest ways to get yourself in a tangle when trying to scale a CSS project: even if you have the most considered source order, and your rulesets cascade and inherit to and from each other perfectly, an overly-specific selector can completely undo all of it. Specificity throws a real curve-ball at a language which is entirely dependent upon source order. To make things worse, you can’t opt out of it, and the only way to deal with it is by getting more and _more_ specific.

On larger projects, this is something we can really do without.

Like I said, we can’t opt out of specificity, but there are a number of things we can do to mitigate its effects:

-   **[Never use IDs in CSS](https://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/)**, ever. They have no advantage over classes (anything you can do with an ID, you can do with a class), they cannot be reused, and their specificity is way, way too high. Even an infinite number of chained classes will not trump the specificity of one ID.
-   **Do not nest selectors** unnecessarily. If `.header-nav {}` will work, never use `.header .header-nav {}`; to do so will literally double the specificity of the selector without any benefit.
-   **Do not qualify selectors** unless you have a compelling reason to do so. If `.nav {}` will work, do not use `ul.nav {}`; to do so would not only limit the places you can use the `.nav` class, but it also increases the specificity of the selector, again, with no real gain.
-   **Make heavy use of classes** because they are the ideal selector: low specificity (or rather, all classes have the same specificity, so you have a level playing field), great portability, and high reusability.

**tl;dr** never use a selector more specific than the one you need.

These are all very simple rules—and are very easy to follow if you’re starting a new project—but what happens when you need to hack specificity? We all know about `!important`, which I won’t go into here, but how can we trick specificity into being lowered or increased with no drastic side effects?

## Low specificity IDs

> Rules are the children of principles.
> 
> **[Jamie Mason](https://twitter.com/fold_left)**

If you’ve ever been on any of my workshops, you will know that—right up front—I like to stress that **no rules are unbreakable**. There will always be exceptions, there will always be a situation which requires a rule to be bent, there will always be anomalies. Whenever someone says always do x, apply some [critical thinking](https://csswizardry.com/2013/01/you-know-your-context-on-critical-thinking-and-thinking-for-yourself/) to work out the principles behind that rule, and take and break the bits you need to.

One exception to this exception, however, is the use of IDs. There is _never_ a time when using an ID in CSS makes sense; there is never a good reason to use one; this rule is not breakable. Even if you were working with third-party markup that you can’t edit, and all that is in that markup is an ID, you can still avoid using that ID in your CSS.

### Featured case study: NHS

How I helped the NHS rapidly build a brand new product.

[Read case study…](https://csswizardry.com/case-studies/nhs-nhsx-elearning-platform/)

**N.B.** Using IDs in your HTML, as fragment identifiers, or in your JS, as hooks, is totally fine—it’s in CSS that IDs are troublesome.

Let’s imagine you have this third-party widget embedded on your page, and you want to style it:

```
<div id="widget">
    ...
</div>
```

Naturally, given that we can’t edit this HTML to use a class instead of (or alongside) the ID, we’d opt for something like this:

```
#widget {
    ...
}
```

Now we have an ID in our CSS, and that is not a good precedent to set. Instead, we should do something like this:

```
[id="widget"] {
    ...
}
```

This is an attribute selector. This is not selecting on an ID _per se_, but on an element with an attribute of `id` which also has a certain value. This particular selector is basically saying Hey, find me an element with an attribute called `id` which has a value of `widget`.

The beauty of this selector is that [it has the exact same specificity as a class](http://jsfiddle.net/csswizardry/V4JX6/), so we’re selecting a chunk of the DOM based on an ID, but never actually increasing our specificity beyond that of our classes that we’re making [liberal use of elsewhere](https://csswizardry.com/2012/10/a-classless-class-on-using-more-classes-in-your-html/).

But **this is a hack.**

Just because we know a way of using IDs without introducing their heightened specificity, it does not mean we should go back to using IDs in our CSS; they still have the problem of not being reusable. Only use this technique when you have no other option, and you cannot replace an ID in some markup with a class.

## Safely increasing specificity

I was recently reminded of this little trick after seeing it in [Mathias Bynens](https://twitter.com/mathias)’ slidedeck [3.14 Things I Didn’t Know About CSS](https://speakerdeck.com/mathiasbynens/3-dot-14-things-i-didnt-know-about-css-at-css-day-2014): **you can chain a selector with itself to increase its specificity**.

That is to say:

```
.btn.btn {
}
```

…will select based on only one class (`.btn`) but with double the specificity. We can take this as far as we need to:

```
.btn.btn.btn.btn {
}
```

…but hopefully we’ll never get that far.

Let me illustrate this with an example: [jsfiddle.net/csswizardry/3N53n](http://jsfiddle.net/csswizardry/3N53n/).

Here we can see that the `.box a {}` (line 17) selector’s `color` declaration (line 18) overrides the `.btn {}` (line 22) selector’s `color` declaration (line 26), causing the button to use a totally unsuitable color which is the same as its background.

We could fix this with an `!important` (line 26): [jsfiddle.net/csswizardry/3N53n/1](http://jsfiddle.net/csswizardry/3N53n/1/), but _ewww_, no thanks.

We could also add another selector to the `.btn {}` ruleset (line 23): [jsfiddle.net/csswizardry/3N53n/2](http://jsfiddle.net/csswizardry/3N53n/2/), but this isn’t a very maintainable solution at all: what happens when it’s not just boxes that are the problem? We can’t really keep on adding a new selector every time we need to bump up specificity.

But what we _could_ do is double the specificity of `.btn {}` against _itself_ (line 28): [jsfiddle.net/csswizardry/3N53n/3](http://jsfiddle.net/csswizardry/3N53n/3/)

This still isn’t great, but it does heighten the specificity of the `color` declaration (and any other declarations we choose to place in the `.btn.btn {}` ruleset) without having to depend on a context (e.g. when in a `.box`, when in the `.nav`, etc.) and without having to keep a growing list of selectors maintained. This is a really nice way of increasing specificity in isolation.

Again, this is something of a hack, but it’s the best of a bad bunch when it comes to increasing specificity. At least this way there’s very little maintenance overhead, and no reliance on a location or context.

So there we have it; two ways of safely hacking (and remember, these are hacks) your specificity up or down.

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