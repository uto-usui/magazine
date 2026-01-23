---
title: "Toon Title Text Generator"
source: "https://css-tricks.com/toon-title-text-generator/"
publishedDate: "2025-12-15"
category: "css"
feedName: "css-tricks"
author: "Geoff Graham"
---

Andy Clarke with a brand-new resource. It generates the sort of fun typography that Andy commonly uses in his own work that’s geared towards cartoon headings.

There are a number of configurable options for font, color, stroke, letter spacing, and shadows.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/Screenshot-2025-12-15-at-10.37.00-AM.png?resize=2394%2C1228&ssl=1)

And it spits out the CSS for you to copy-paste.

What if you want to individually style each letter? Well, there’s no such thing as `:nth-letter` in CSS at the moment. There are, however, tools that will wrap each character in a separate `<span>`, the most tradition one being [SplitText.js](https://github.com/s0wcy/split-text-js/). But Andy decided to make a tool for that — called [Splinter.js](https://stuffandnonsense.co.uk/blog/splinter-js-i-made-a-more-accessible-text-splitting-tool) — as well because he saw opportunities to enhance the accessibility of the generated markup to help prevent some assistive tech from choking on the spans. ([GSAP’s version](https://gsap.com/docs/v3/Plugins/SplitText/) also does a good job of this.)

Som instead of:

```
<h2>
  <span>H</span>
  <span>u</span>
  <span>m</span>
  <!-- etc. -->
</h2>
```

…we get ARIA-spiced markup:

```
<h2 data-split="toon" aria-label="Hum Sweet Hum">
  <span class="toon-char" aria-hidden="true">H</span>
  <span class="toon-char" aria-hidden="true">u</span>
  <span class="toon-char" aria-hidden="true">m</span>
</h2>
```

And it supports line breaks!

[Direct Link →](https://stuffandnonsense.co.uk/toon-text/tool.html)