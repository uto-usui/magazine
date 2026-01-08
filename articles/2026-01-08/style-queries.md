---
title: "Style Queries"
source: "https://una.im/style-queries/"
publishedDate: "2022-06-27"
category: "css"
feedName: "Una Kravets"
---

![](https://una.im/posts/photo-1583316174775-bd6dc0e9f298.avif)

Published on June 27, 2022

You may have heard of [container queries](https://css-tricks.com/next-gen-css-container/) and the new [contain-level-3 spec](https://drafts.csswg.org/css-contain-3/) which is currently in [experimental browsers](https://caniuse.com/css-container-queries), but have you heard of style container queries, which are also a part of this (very exciting) spec?

**⚠️ Important Note:** While a part of the contain-level-3 spec, style queries are _not_ landing in the initial implementations of container queries in Chromium and Webkit. [Both browser engines](https://webkit.org/blog/12522/release-notes-for-safari-technology-preview-142/) currently [plan to ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/gwzxnTJDLJ8) with size query and container query unit support [1](https://twitter.com/jensimmons/status/1506969133509980163).

Style queries let you query the _style_ of any parent element within a page and apply styles to its children based on the styles of its parent. This sounds really cool, but in practice, why would you use this over something like a class or data attribute to apply the styles (both of which are much more performant than a container query)?. I want to investigate _why_ and _when_ style queries really make sense to use, and provide a capability previously unavailable to us.

## Container Queries: a quick summary

TLDR; container queries let you query a parent selector for its size and styling information, and enable a child to own its intrinsic responsive logic no matter where it lives on a web page.

![diagram of a media query vs. a container query](https://una.im/posts/style-queries/cq-illi.png)

Instead of relying on the viewport for styling input (a blunt hammer), users now have the ability to query in-page elements (a much finer tool) that are more relevant and specific to the target element to apply UI styles to it. This capability enables a new entry-point to query and inject responsive styles, and empowers a component to own its responsive styling logic. This makes the component much more resilient, as the styling logic is intrinsically attached to it, no matter where it appears on the page. (Did I say “styles” enough in this paragraph?)

> I recorded a [few videos](https://www.youtube.com/watch?v=gCNMyYr7F6w) on container queries if you want to learn more.

You write container queries like so:

**One.** Define a container on the parent element you want to query

```
.parent {
  /* query the inline-direction size of this parent */
  container-type: inline-size;
}
```

**Two.** Write the container styles on the element you want to target

```
@container (min-width: 420px) {
  .card {
    /* styles to apply when the card container is >= 420px */
    /* I.e. shift from 1-column to 2-column layout: */
    grid-template-columns: 1fr 1fr;
  }
}
```

## Style Queries

Much like size-based container queries, you can query the computed style of a parent element using [style queries](https://drafts.csswg.org/css-contain-3/#style-container). These must be wrapped in `style()` to differentiate style queries from size queries.

Why? If you’re querying `@container (min-width: 420px)`, you want to apply styles if the _rendered size_ is greater than or equal to 420px at any given time. If you’re querying `@container style(min-width: 420px)`, you’re looking for a _computed value_ of `min-width` to equal `420px`. The style query looks at the computed _style_ value — not the value of the element when it’s rendered on the page. Style and size are different types of [CSS containment](https://developer.mozilla.org/en-US/docs/Web/CSS/contain).

```
@container style(color: hotpink) {
  .card {
    /* styles to apply when the card container has a color of hotpink */
    /* I.e. change the background to white: */
    background: white;
  }
}
```

Okay, but where does this actually become useful? There are a few situations in which style queries provide unique capabilities.

As of this week’s CSSWG resolution (June 22,2022), unlike with size queries, where you need to set `container-type`, all elements are [style containers by default](https://github.com/w3c/csswg-drafts/issues/7066#issuecomment-1163348533). This means you can query an immediate parent to apply styles to a child. One example of where you would want to use an immediate parent style query is with inline text styling.

Say you want to make something stand out inline, _like an italicised quote in a paragraph_. The previous sentence is italic, and wrapped in an `<i>` tag.

> This is a blockquote that has italic text as a part of the block quote styling.

If I have an element within it that I want to stand out using the `<i>` tag, it will not stand out because they’ll look the same. This is such an element. But maybe I want to give it a pink background to stand out.

> This can be achieved with style queries.

Regardless of the type of element (`span`, `i`, `p`, etc.), style queries let you look at the specific style of any parent element to make styling decisions. This enables “chained styles”. _If style X, then apply style Y._ The code might look like:

```
@container style(font-style: italic) {
  span,
  i,
  .etc {
    background: var(--peach);
  }
}
```

## 2\. Styling non-inheritable properties

This example shows color selection based on a parent’s styles (including non-inherited styles). `border-color` is an example of a property that doesn’t inherit. With style queries, we can query a parent’s non-inheritable styles to apply to its children. For example, we can query `border-color` to apply styles to the button:

```
@container style(border-color: lightblue) {
  button {
    border-color: lightblue;
  }
}
```

FPO

This is some text within the card.

We’ve now “inherited” the `lightblue` border-color and passed it on to button.

## 3\. Chained styles

This is neat, but you could do the above example with a custom property in both places:

```
.card {
  border-color: var(--colorBorder);
}

.card button {
  border-color: var(--colorBorder);
}
```

So let’s take it a step further and do something we can’t do with a shared custom property: apply unique values. instead of using the same value, adjust the value to `royalblue`.

```
@container style(border-color: lightblue) {
  button {
    border-color: royalblue;
  }
}
```

FPO

This is some text within the card.

Now, when the card has a `lightblue` border color, we want to set the button within the card’s border color to `royalblue`. This kind of chaining is something you couldn’t do with custom properties, since they’re two distinct values.

## 4\. Grouping styles with higher-order variables

Taking that a step further, we can abstract these values to [higher-order variables](https://github.com/w3c/csswg-drafts/issues/5624) like `—theme: light` or `—theme: dark`, and apply the styles throughout the card:

FPO

This card has `--theme: dark` applied to the parent. We can now style its children.

```
@container style(--theme: dark) {
  .card {
    background: royalblue;
    border-color: navy;
    color: white;
  }

  .card button {
    border-color: navy;
    background-color: dodgerblue;
    color: white;
  }
}
```

You could take this further to apply states that might have to do with card interactions or types such as `—highlight: true` for a card that should be highlighted to stand out from the rest, or `—type: post` if you have content cards and want to style blog posts differently from videos or other types of content.

If you write your styles using primarily custom properties, you can be even more succinct with higher-order variables by using them to update a series of other custom properties.

## 5\. Interactions in CSS

One more way style queries can be really useful is integrating them with behaviors we already use CSS to style, such as `:hover` and `:focus` states. You can quickly and easily update a CSS custom property with a CSS state, and using the above technique, update a grouping of values in one place.

```
/* update the theme on hover */
.card:hover,
.card:focus {
  --theme: darkHover;
}

/* apply darkHover theme styles */
@container style(--theme: darkHover) {
  .card {
    background: dodgerblue;
    border-color: navy;
  }

  .card button {
    border-color: lightblue;
    background-color: royalblue;
  }
}
```

FPO

This card has `--theme: dark` applied to the parent. We can now style its children.

## 6\. Combinator queries

If you want to get really crazy, you can even combine size queries with style queries to apply some really specific styling logic.

For example, you can use the approach of higher-order variables to group styles (in this example a “highlight” card), with logic based on its intrinsic size:

```
@container (min-width: 420px) and style(--highlight: true) {
  /* styles for only highlight components at a minmimum width of 420px */
}
```

## Conclusion

These are just some ideas on how to use style queries in ways that enable a better developer experience and more flexible component-owned styles. They really shine when integrated within a larger system where these components are reused in multiple places. For more, check out:

-   [MDN Docs on Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
-   [Designing in the Browser: Container Queries](https://web.dev/shows/designing-in-the-browser/gCNMyYr7F6w/)
-   [Designing in the Browser: Macro & Micro Layouts](https://web.dev/shows/designing-in-the-browser/sdjT0K4sR4k/)
-   [Container Queries & the future of CSS](https://www.miriamsuzanne.com/speaking/responsive-components/)
-   [Next Gen CSS: @container](https://css-tricks.com/next-gen-css-container/)