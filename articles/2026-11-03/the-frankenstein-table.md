---
title: "The Frankenstein Table"
source: "https://css-tricks.com/the-frankenstein-table/"
publishedDate: "2026-10-29"
category: "css"
feedName: "css-tricks"
author: "Preethi"
---

_“Something wicked this way comes.”_

It was naivety, but when I first came across [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), and then [CSS Grid](https://css-tricks.com/complete-guide-css-grid-layout/), I had this feeling all those positioning properties ([`align-self`](https://css-tricks.com/almanac/properties/a/align-self/), [`justify-content`](https://css-tricks.com/almanac/properties/j/justify-content/)…) would be available to use on block and inline elements; things like tables, lists, fixed elements, everything. The workings might be different under the hood, depending on the reference boxes, but the syntax and expected outcomes would be same: push to one edge, keep at the center, spread around evenly, etc.

Although that didn’t happen, what if I made something of that sort?

For example, I could take out the soul of an HTML table and stitch it back together with CSS Grid. In other words, **it reads like a table, but acts like a grid**, allowing me to use grid properties. Believe it or not, [some form of this was used in the past to make tables responsive](https://www.freecodecamp.org/news/https-medium-com-nakayama-shingo-creating-responsive-tables-with-pure-css-using-the-grid-layout-module-8e0ea8f03e83/).

Before I kill off a table in this article though: [there are a lot of advantages to straight-up tables](https://css-tricks.com/in-defense-of-tables-and-floats-in-modern-day-development/). They provide a clean semantic layout that browsers perfectly understand and translate for assistive technology when needed. There’s even a `<caption>` element.

On the CSS side of things, there are indeed circumstances where CSS Grid is necessary for its intrinsic responsiveness, source order independence, and positioning. That’s why it’s an indispensable tool for layouts. Use that and let HTML tables to do the work of actually displaying tabular data!

But there’s the presentational benefit of table we should consider. Technically, `<table>` is not a presentational element like a `<div>`. It’s semantic: the browser and I share a common meaning for it. But whether the browser understands it as such or not, if I read `<th>` I believe it’s a heading followed by data. Let’s say that’s pseudo-semantic to me, if presentation is not the right term.

That pseudo-semanticism is still useful. It’s the difference between me having to read this:

```
<div class="product-title">Wall Calendar</div>
```

…and this:

```
<th>Wall Calendar</th>
```

Despite there being semantic elements for titles, like `<h1>` and `<strong>`, they don’t bring in the connection that `<th>` and `<td>` have, and it’s better to reserve `<dt>` and `<dd>` for textual structuring like glossaries rather than layouts.

So, is it okay if I use `<th>` this way? I mean, the table itself merely used as pseudo-semantic markup skin:

```
/* 🧟 */
table {
  display: grid;
}
```

What if this HTML:

```
<article class="card">
  <div class="card-number">
    <strong>CARD NUMBER</strong>
    <span>1234 5678 9123 4567</span>
  </div>
  <div class="card-bank">
    <strong>CROWN <br>ATLANTIC <br>BANK</strong>
  </div>
  <div class="card-name">
    <strong>CARD HOLDER</strong>
    <span>JANE DOE</span>
  </div>
  <!-- more -->
</article>
```

…becomes this:

```
<table class="card">
  <tr class="card-number">
    <th>CARD NUMBER</th>
    <td>1234 5678 9123 4567</td>
  </tr>
  <tr class="card-bank">
    <th>CROWN <br>ATLANTIC <br>BANK</th>
  </tr>
  <tr class="card-name">
    <th>CARD HOLDER</th>
    <td>JANE DOE</td>
  </tr>
  <!-- more -->
</table>
```

Then, this CSS and its outcome (for the first markup):

```
.card {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 2lh;
}
```

…changes to this (for the table markup):

```
.card {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 2lh;

  /* Soul stripping */
  tbody { 
    /* Bypass tbody in the layout */
    display: contents; 
  }
  tr, tr > * { 
    /* Avoid table-row and table-cell styles */
    display: block; 
  }
}
```

To me, the latter markup example — a pseudo-semantic table — is easier to scan than a handful of generic `div`s. I get the pseudo-semantics of table, and the ease of using CSS Grid for the layout. As for browsers, none of them have shunned this sort of Frankenstein creation, at least yet. The VoiceOver and keyboard navigation works as if it’s a real table.

But it’s understandable why it looks more than a little gross and against the grain of what we should be able to. We’re encouraged to maintain a separation of concerns between content and presentation and this does exactly that without affecting the tables semantics, such as its role. But maybe it should? [There are plenty of other HTML elements that CSS is capable of busting.](https://css-tricks.com/the-other-c-in-css/)