---
title: "Pure CSS Content Filter"
source: "https://csswizardry.com/2016/10/pure-css-content-filter/"
publishedDate: "2016-10-16"
category: "css"
feedName: "CSS Wizardry"
---

15 October, 2016

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [The HTML](#the-html)
2.  [The CSS](#the-css)
    1.  [Highlighting the Current Filter Link](#highlighting-the-current-filter-link)
    2.  [Awkward Page Jumps](#awkward-page-jumps)
3.  [Drawbacks](#drawbacks)

What started off as [a drunken excitable, 2am experiment](https://twitter.com/csswizardry/status/786720304437534720) in ‘I wonder if…’ has actually turned out to be quite a compelling and interesting bit of functionality: filtering content using only CSS.

By using CSS’ `:target` pseudo-selector, we can work out what a user has clicked on, and by using the adjacent sibling selector, we can use that user’s action to style subsequent parts of the DOM.

Take a look at the [demo](https://codepen.io/csswizardry/pen/ooqZVX).

## The HTML

We start off by simply defining our filter context, `.c-filter`. Everything is going to happen inside of this `section`.

```
<section class="c-filter">
  ...
</section>
```

Next, we list a collection of targets. We have one target per filter subject, and they’re defined with a class each for styling, and a unique ID pertaining to the topic. The IDs are what the `:target` selector will be looking out for later on: these are the backbone to the whole technique.

They’re defined as (empty) anchor elements, because that’s precisely what they are: anchors for us to link to.

```
<a class="c-filter__target" id="tag:css"></a>
<a class="c-filter__target" id="tag:html"></a>
<a class="c-filter__target" id="tag:accessibility"></a>
<a class="c-filter__target" id="tag:performance"></a>
<a class="c-filter__target" id="tag:vim"></a>
```

After this, we have our filtering links that the user will click on:

```
<nav class="c-filter__links">
  <a href="#tag:all" class="c-filter__link  c-filter__link--reset">Reset</a>
  <a href="#tag:html" class="c-filter__link">HTML</a>
  <a href="#tag:css" class="c-filter__link">CSS</a>
  <a href="#tag:accessibility" class="c-filter__link">Accessibility</a>
  <a href="#tag:performance" class="c-filter__link">Performance</a>
  <a href="#tag:vim" class="c-filter__link">Vim</a>
</nav>
```

Each link has a class, and an `href` pointing to its respective anchor. When a user clicks one of these links, our `:target` selector will intercept and behave accordingly.

Following this, we have our list of items we’d like to filter. In this case, they’re blog posts:

```
<article class="c-article c-filter__item" data-tag="vim">
  <h2>Using Macros</h2>
  <p>Pellentesque habitant morbi tristique senectus et netus et malesuada
  fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies
  eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
  Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
</article>
```

The `article` elements have a number of noteworthy things on them. Firstly, they all have a class of `c-article` that is completely separate to the filtering: this class just carries styles specific to the articles and is not actually required for the filtering to work.

Secondly, they all have a class of `c-filter__item`: this simply lays the items out in the filtering context and, again, isn’t actually required for the filtering to take place.

Finally, we see a `data-tags` attribute which is filled with one or more tags pertaining to the content. These data attributes are necessary for the filtering to work, because we use the values of them to decide what we need to show the user.

The process will go a little like this:

1.  The page loads showing all items.
2.  The user clicks a filtering link which jumps to the correspoinding `#tags:*` anchor, appending a fragment identifier onto the URL.
3.  We’ll grab the value of the fragment identifier by using the `:target` pseudo selector.
4.  We’ll use this knowledge to show/hide the relevant content.

## The CSS

The majority of the work happens in the CSS. The first chunk isn’t really aything exciting: it’s just cosmetic styling and laying out our items.

```
/**
 * 1. Clearfix our filter context.
 */
.c-filter {
  overflow: hidden; /* [1] */
}

  .c-filter__links {
    padding: 1em;
    margin-bottom: 1em;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
  }

    .c-filter__link {
      display: inline-block;
      padding: 0.5em 1em;
      border-radius: 100px;
      background-color: rgba(0, 0, 0, 0);
      transition: 0.333s;
    }

    .c-filter__link--reset {
      border-right: 1px solid;
      border-radius: 0;
    }

  .c-filter__item {
    float: left;
    width: calc(33.333333333% - 1em);
    margin-right: 0.5em;
    margin-bottom: 1em;
    margin-left: 0.5em;
    transition: 0.333s;
  }
```

Now things start to get a little more interesting:

```
.c-filter__target:not(:target) ~ .c-filter__item {
  opacity: 1;
}
```

This selector is doing a few things. Let’s break it down:

-   `.c-filter__target` refers to all of our empty `a` elements at once.
-   `:not(:target)` checks that none of the anchors are currently targeted.
-   `~` is the adjacent sibling selector, and that looks for things later in the DOM but that are on the same level of the DOM tree.
-   `.c-filter__item` is simply looking for all of our filterable items.

So basically, if we aren’t currently targeting any anchors, look ahead in the DOM to find filter subjects and make sure they’re all turned on.

‘Turned on’ in this case is `opacity: 1;`. This could be anything else (e.g. it actually started off as `display: block;` in my first version of this).

The next bit of CSS looks quite similar:

```
.c-filter__target:target ~ .c-filter__item {
  opacity: 0.25;
}
```

We’re doing almost the exact same lookup as before, only this time we’re missing the `:not()` selector. What this means that we’re checking if any anchors _are_ targeted, and if so, turn all of our filterable items off (`opacity: 0.25;`).

So two things here: if no anchors are targetted, turn everything on; if any anchors are targetted, turn everything off.

After we’ve turned everything off, we want to turn the specific items back _on_. We have to get a little more involved here, because we’re looking out for specific DOM nodes: we can’t use a blanket rule.

I’m using Sass to help me out here, and that looks like this:

```
@each $tag in html, css, accessibility, performance, vim {

  [id="tag:#{$tag}"]:target ~ [data-tag~="#{$tag}"] {
    opacity: 1;
  }

  ...

}
```

Here we have a loop that contains every one of my tags, and goes through them all making selectors that look like this:

```
[id="tag:css"]:target ~ [data-tag~="css"] { ... }
```

What’s happening here?

-   `[id="tag:css"]:target` sees if the anchor with an ID exactly equal to `tag:css` is currently targeted. **N.B.** I could have written this selector as `#tag\:css:target` but there are two reasons why I didn’t: firstly, as you can see, we have to escape that colon, and secondly, we don’t use IDs in CSS. Writing this as an attribute selectors means I don’t need to put any other CSS-specific hooks in my HTML, and it has the added advantage of being able to select an ID using a class worth of specificity.
-   `~`, as before, looks ahead in the DOM and finds certain elements on the same level in the DOM tree.
-   `[data-tag~="css"]` is the element later on, on the same level of the DOM tree, that the `~` is looking for. What I’m doing here is using a substring selector to interrogate the contents of the `data-tags` attribute. The `~=` specifically means check that the attribute contains a list of space-separated values, and that one of the values is exactly equal to (in this case) `css`.

So if we’re targeting the `css` anchor, please go ahead and find all elements tagged with `css` later in the DOM tree. Once you’ve found them, please turn them on:

```
opacity: 1;
```

This is all that is really necessary to make the filtering work—it’s actually a very small amount of code.

### Highlighting the Current Filter Link

What I thought would be a nice touch would be to somehow style the currently filtered link, so that the user has a visual cue as to what content they’re looking at. This proved a little trickier than I was expecting, but was certainly not insurmountable.

Inside of the same Sass loop as before, I’m generating a new suite of selectors that each look like this:

```
[id="tag:css"]:target ~ .c-filter__links [href="#tag:css"] { ... }
```

Stepping through this one bit at a time:

-   `[id="tag:css"]:target` checks to see if the `css` anchor is currently targeted.
-   `~` looks ahead in the DOM.
-   `.c-filter__links` is the thing we’re looking for.
-   `[href="#tag:css"]` looks for an element whose `href` attribute is exactly equal to `#tag:css`.

One thing I found interesting here was actually getting at the links. Because they live inside of a `nav` element (`.c-filter__links`)—therefore are not on the same level of the DOM tree, as required by the `~` selector—I couldn’t target them directly with the `~` selector. I almost abandoned this whole highlighting exercise because of that very fact, but then I realised a workaround.

Instead of trying to target the links themselves, I can target their `nav` element wrapper because that _is_ on the same level of the DOM tree. The next step was just a case of looking for the correct link inside of that. This is why I had to nest the last bit of the selector.

### Awkward Page Jumps

There was another problem I was having that I managed to solve pretty painlessly. Because we’re linking to fragment identifiers, the page would awkwardly jump around if the content was long enough to cause the page to scroll. The solution was a one-line fix.

Because we’re linking to empty anchor elements, they’re not actually visible at all in the page (but they do still exist at a point in the DOM, which is why we have the page jumps). By simply applying `position: fixed;` to all of the anchors, they will always be positioned at the very top-left of the viewport. The practical upshot of this is that the anchors will always be exactly where the user has scrolled to, so the page didn’t actually have to jump anywhere.

```
.c-filter__target {
  position: fixed;
}
```

Problem solved.

## Drawbacks

There are a few drawbacks to this technique. In no particular order:

-   Adding new tags means writing and recompiling new CSS. We could get around this by having our CMS drop a `style` block into the page and looping over our tags there, so it’s not completely the end of the world.
-   Filtering adds new history states. It could certainly get very annoying clicking your back button a dozen times through filters. This does, however, mean that we can link people directly to filtered results.
-   Accessibility. Honestly, I’m not sure how good or bad this is for accessibility. I have no doubt that there will be some improvements we could make. At least it isn’t using the checkbox hack, eh?
-   Should I have done this at all? It feels like it’s blurring the lines between what CSS should be doing, and what we should defer to JavaScript.
-   Ugly CSS. Nested selectors, substring selectors, heavily location dependent. It’s not the best, is it?

Still, it’s been quite a long time since I played around with CSS like this. and it was a lot of fun. I need to make sure I do things like this more often.

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