---
title: "Hide and Debug Empty Elements with CSS"
source: "https://css-irl.info/hide-and-debug-empty-elements-with-css/"
publishedDate: "2023-11-29"
category: "css"
feedName: "CSS IRL"
---

A tiny tip today, but a good one: use the `:empty` pseudo-class to hide pesky empty elements (commonly found in user-generated content).

```
p:empty {
  display: none;
}
```

This will hide paragraph elements that have **no children**, or contain **no text nodes**. Text nodes include whitespace, so a paragraph containing a whitespace character **won’t** be hidden in this case. On the other hand, if a content editor has pressed Enter a bunch of times, this’ll do a great job of hiding those extra generated paragraphs.

`:empty` is also pretty handy for debugging. We can add a red outline to any empty element and see what might be causing us layout issues:

```
:empty {
	outline: 1px solid red:
}
```

Grid layout are one place this can be useful. Sometimes it’s hard to understand why an element is placed on a particular grid column or row. It’s worth remembering that it could be down to empty elements!

See the Pen [Grid with empty cells](https://codepen.io/michellebarker/pen/qBgMmMb) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

Be aware, elements that only have content determined by the CSS `content` property will still be considered empty. It’s not good practice to use CSS for most content anyway — always put important content in your HTML.