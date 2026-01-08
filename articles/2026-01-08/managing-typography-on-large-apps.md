---
title: "Managing Typography on Large Apps"
source: "https://csswizardry.com/2016/02/managing-typography-on-large-apps/"
publishedDate: "2016-02-21"
category: "css"
feedName: "CSS Wizardry"
---

21 February, 2016

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Proposal](#proposal)

I’ve [written before](https://csswizardry.com/2012/02/pragmatic-practical-font-sizing-in-css/) about managing typographical styles across larger projects, but an issue that I still see clients continually coming up against is that of specifically managing their headings across larger and more complex apps.

The problem stems from the styling of the default `h1` through `h6` elements, and how this hierarchy seldom carries through the actual design and build of app-like UIs. The `h1`–`h6` pattern pretty nicely mirrors traditional print documents—where we are much more likely to have more newspaper-style heading structures both semantically and visually—however, where more app-like UIs definitely _do_ have the semantic need for `h1`–`h6`, they rarely need quite the same visual hierarchy.

Think of sites like GMail, Facebook, YouTube—you can’t really see a tiered heading structure like you could envisage on, say, this site right here. I think that for blog-style sites the `h1`–`h6` pattern does still have semantic and visual merit, but for app-like sites—the kind I’m referring to in this post—I think we need a new approach.

The problem presents itself when we begin designing UIs. Because we know we have six levels of heading to play with, we’ll go right ahead and design one of each, regardless of

-   whether we actually need them yet;
-   how they might actually look when we do need them.

We design a suite of hierarchical headings, usually before we’ve designed anything else, and then when it comes to building a page, we might semantically choose an `h3`, only to find it has an appearance which is completely unsuitable in its location. We chose our look and feel for a level of heading out of the context in which it might actually be used—we’ve very tightly coupled our semantic and stylistic decisions here, and we shouldn’t have done.

Think back to almost any project you’ve worked on. How many times has, say, an `h3` been the semantically correct element to use, only to find its appearance is either too opinionated or too inappropriate?

This then leads to one of two possible issues:

1.  We have to begin writing more CSS to undo or override very specific styles applied to a very non-specific selector (e.g. `h3 {}`).
2.  We use (or abuse) the incorrect semantic element in order to achieve the desired cosmetic output.

Neither are great options, and I can almost guarantee you’ve had to do one of them at least once in your career.

It’s now my opinion that headings should be a purely semantic decision, and have no stylistic information applied to them at all. Complete decoupling of the semantic and the stylistic—your level of heading should have no influence on how that heading looks.

## Proposal

Something I’ve been implementing is a much more simplified default set of headings which cover our semantic use cases, and all other font sizes and styles are introduced through a suite of classes.

This means that there are now only two default font-sizes in our project: our body copy, and our six headings (which are all identical):

```
html {
  font-size: 1em;
}

/**
 * Headings are always ‘just a bit bigger’ than body copy.
 */
h1, h2, h3, h4, h5, h6 {
  font-size: 1.25rem;
}
```

Notice how there are no colours, no font styles, no font families, no nothing. In fact, you could even get rid of the `font-size` declaration completely if you want—my thinking is just to have all headings default to being at least slightly offset from their surroundings.

This approach now gives us great semantic freedom: none of our headings’ look and feel will guide our choice of element, nor will we misuse an element for the correct look and feel.

To provide our actual styled suite of headings, we need to move away from the semantic `h1`–`h6` model, and toward a more purpose-driven model. Instead of making the decision early on that any `h1` will look like this, and any `h3` will look like this, we need to be thinking more along the lines of the biggest style of heading will have a class of x; all section titles will have a class of y.

These classes will be largely down to the design you’re working with, but they usually end up looking something like this:

```
.c-heading-page {}

.c-heading-main {}
.c-heading-sub {}

.c-heading-banner {}

.c-heading-section {}
```

This now leaves us with purpose-driven rather than semantics-driven heading styles that can be applied to any element we choose (it doesn’t even have to be a heading element).

The upshot of this is that nearly all of your HTML will look more like this:

```
<main>

  <h1 class="c-heading-main">...</h1>
  <h2 class="c-heading-sub">...</h2>

  ...

  <article class="c-tile">
    <h3 class="c-tile__title">...</h3>
    <p>...</p>
  </article>

  ...

</main>
```

It would be very unlikely that we see a bare `h1`–`h6` element in our HTML, because we should no longer be leaning on our semantic decision to give us a cosmetic output: instead of making the decision early on that we’re going to have semantics lead a visual decision, we’re deciding to treat them as two totally separate things.

The key takeaway I’d like to leave you with is the importance of divorcing semantics and style: our choice of `h1`–`h6` is a purely semantic decision, and should not carry or impact cosmetics.

Just give all heading elements the exact same cosmetics as each other, and create your visual heading styles against a series of classes that are completely separated from the semantics of any element whatsoever.

**N.B.** It’s probably worth reiterating that if you are designing a blog, a news site, documentation, or anything that does mirror the traditional headline format found in print, you can probably still carry on attaching more cosmetic opinions to your `h1`–`h6` element selectors.

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