---
title: "Preventing Scroll “Bounce” with CSS"
source: "https://css-irl.info/preventing-overscroll-bounce-with-css/"
publishedDate: "2023-11-25"
category: "css"
feedName: "CSS IRL"
---

When you scroll rapidly to the top or bottom of a webpage you might notice a “bounce” effect, where the browser momentarily allows you to scroll beyond the uppermost or lowermost point, before bouncing you to correct position.

A typical layout pattern I’ve built a few times uses grid to position a sidebar menu next to a scrollable content area. I use `position: sticky` so that the menu stays in view, while the main content area scrolls. Using `position: sticky` is handy for this, as it means the sidebar width can still be determined by the content, unlike with `position: fixed`.

Unfortunately this can result in an undesirable effect in some browsers when the user scrolls to the bottom — particularly if the sidebar has a different coloured background to the rest of the page, as the user will see a brief flash of the colour below below.

There’s a simple way to prevent this with css, using the `overscroll-behavior` property on the document root:

```
:root {
  overscroll-behavior: none;
}
```

By setting the value to `none`, the browser will no longer scroll beyond the top (or bottom) of the page, and your sidebar will remain fixed in place.

See the Pen [overscroll-behaviour](https://codepen.io/michellebarker/pen/vYbrpbX) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).