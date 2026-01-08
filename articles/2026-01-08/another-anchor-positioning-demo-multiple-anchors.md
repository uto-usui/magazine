---
title: "Another Anchor Positioning Demo: Multiple Anchors"
source: "https://css-irl.info/another-anchor-positioning-demo-multiple-anchors/"
publishedDate: "2024-06-12"
category: "css"
feedName: "CSS IRL"
---

Here’s a new demo where we’re positioning article references for a body of text relative to two different anchors for the block and inline axes. Each reference is positioned so that it aligns vertically with the position it’s referred to in the text, but appears adjacent to the main content wrapper on the horizontal axis.

The content area has its own anchor name:

```
.content {
  anchor-name: --content;
}
```

We reference this anchor to alternately position our references to the left or right of the text using the `anchor()` function:

```
.ref {
  position: absolute;
  inset-inline-start: anchor(--content right);

  &:nth-of-type(even) {
    inset-inline-end: anchor(--content left);
    inset-inline-start: auto;
  }
}
```

Additionally we’ll set a named anchor on each of the anchor links in our body of text, using the `href` attribute as a selector:

```
[href='#ref_1'] {
  anchor-name: --anchor_1;
}

[href='#ref_2'] {
  anchor-name: --anchor_2;
}

/* etc. */
```

We then refer to these in order to position our references vertically. I’m using ID selectors, as there should only be one of each of these on the page:

```
#ref_1 {
  inset-block-start: anchor(--anchor_1 top);
}

#ref_2 {
  inset-block-start: anchor(--anchor_2 top);
}
/* etc. */
```

This demo uses logical properties, but we could just as easily use physical properties (`top`, `right`, `bottom`, `left`) if we prefer:

```
#ref_1 {
  top: anchor(--anchor_1 top);
}

#ref_2 {
  top: anchor(--anchor_2 top);
}
/* etc. */
```

Here’s the full demo (view in a supporting browser!):

See the Pen [Anchor positioning with multiple anchors](https://codepen.io/michellebarker/pen/pomWryN) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

I’ll be speaking about CSS layout and anchor positioning at [Pixel Pioneers](https://pixelpioneers.co/events/bristol-2024) conference in Bristol, UK this Friday! There’s still time to grab a ticket!