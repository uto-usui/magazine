---
title: "Sidenotes with CSS anchor positioning"
source: "https://vincent.bernat.ch/en/blog/2026-css-sidenotes"
publishedDate: "2026-09-30"
category: "design"
feedName: "Sidebar"
---

I am a heavy user of sidenotes:[1](#sidenote-phd) they keep optional content next to the text instead of sending the reader to the bottom of the page and back. [Tufte CSS](https://edwardtufte.github.io/tufte-css/ "Tufte CSS") renders them without JavaScript but only accepts inline content. [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning "CSS anchor positioning"), now supported by recent browsers,[2](#sidenote-anchor-support) is an elegant alternative. Sidenotes can hold several blocks, still without JavaScript, and fall back below the paragraph referencing them on narrow viewports and older browsers.

In 2023, Eric Meyer demonstrated this technique in “[Nuclear Anchored Sidenotes](https://meyerweb.com/eric/thoughts/2023/09/12/nuclear-anchored-sidenotes/ "Nuclear Anchored Sidenotes").” The main improvement over other solutions is that the notes can sit anywhere in the HTML document. You can place them after the paragraph referencing them, as regular block elements for text browsers, screen readers, feed readers, and reader mode to render them properly:

![Sidenotes rendered in Lynx appear after the paragraph they are called
from.](https://d2pzklc15kok91.cloudfront.net/images/css-sidenotes/lynx@1x.62cb4bfb14577a.png)

Rendering in Lynx, a text browser

When the viewport is too narrow or the browser does not support CSS anchor positioning, you can style them so the reader can skip them or glance at them without losing their position in the text:

![Sidenotes rendered on a narrow viewport appear with a distinctive typography
after the paragraph they are called
from.](https://d2pzklc15kok91.cloudfront.net/images/css-sidenotes/narrow@1x.9afbc67e0bd4e9.png)

Rendering below the paragraph on a narrow viewport

Once the viewport is large enough, they appear in the margin, at the same vertical position as the matching reference mark, unless they would collide with a previous sidenote, as in the example below:[3](#sidenote-runt)

![Sidenotes rendered on a large viewport appear in the margin. There are two of
them. The first one is vertically aligned with the matching reference mark,
while the second is rendered below as it would collide with the first
otherwise.](https://d2pzklc15kok91.cloudfront.net/images/css-sidenotes/large@1x.b9822706e29afa.png)

Rendering in the margin on a large viewport

The gist of CSS anchoring is to position an element relative to another element—the anchor. For the sidenotes, the anchor is the reference mark. I use the following markup, with a data attribute to specify the anchor name:

`<sup id="fnref:YYY" data-anchor="--lf-sn-YYY">   <a href="#sidenote-YYY">1</a> </sup>`

The matching note is an `<aside>` element carrying the same data attribute for the anchor name. We put it after the paragraph holding the reference mark:

`<aside role="note" id="sidenote-YYY" data-anchor="--lf-sn-YYY">   <sup>1</sup>   <p>A first paragraph.</p>   <p>A second paragraph.</p> </aside>`

On a narrow viewport or when the browser is too old for CSS anchoring, we style the sidenote, which stays below its paragraph, with a muted color:

`aside[role="note"] {   margin-block: 1rlh;   color: #444; }`

On a wide viewport and when the browser is recent enough, we move the sidenote to the right margin:

`@supports (anchor-name: attr(data-anchor type(<custom-ident>))) {   @media (min-width: 72rem) {     main {       position: relative;       sup[data-anchor] {         anchor-name: attr(data-anchor type(<custom-ident>));        /* → anchor-name: --lf-sn-YYY */       }       aside[role="note"][data-anchor] {         anchor-name: --lf-sidenote;        position: absolute;         position-anchor: attr(data-anchor type(<custom-ident>));        /* → position-anchor: --lf-sn-YYY */         top: max(anchor(top), anchor(--lf-sidenote bottom, -1rlh) + 1rlh);        left: 100%;         margin: 0 2rem;         width: 18rem;         color: inherit;       }     }   } }`

`attr()` extracts the anchor name for the reference mark from the `data-anchor` attribute. It returns a string, unless we specify a CSS unit or a type, like here: the browser parses the data attribute as a [custom identifier](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/custom-ident "<custom-ident> on MDN"), which `anchor-name` validates as a [dashed identifier](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/dashed-ident "<dashed-ident> on MDN"), a custom identifier starting with two dashes.[4](#sidenote-attr-support)

The note itself is absolutely positioned past the right edge of the main block. It selects the matching reference mark as its anchor with `position-anchor` set to the value of the `data-anchor` attribute. Each note is also an anchor named `--lf-sidenote`. We use it to keep the next note from colliding with this one.

The [`anchor()` CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor "anchor() CSS function on MDN") lets us position the note’s top edge relative to its anchor: `anchor(top)` aligns the top edge of the note with the top edge of the reference mark. It can also take another anchor as a parameter: `anchor(--lf-sidenote bottom)` would align the top edge of the note with the bottom edge of the closest preceding anchor named `--lf-sidenote`—so the previous note.[5](#sidenote-reference) Like `attr()`, `anchor()` accepts a fallback value as its second parameter and use it when the named anchor does not exist.

The `top` property handles three cases, illustrated in the following diagram:

![Diagram of three sidenotes anchored to their reference marks. The first one is
aligned with the top of its own reference mark, as no note comes before it. The
second one would overlap the first, so it takes the bottom of the first note as
anchor and sits one line below it. The third one comes far enough down the page
to align with its own reference mark
again.](https://d2pzklc15kok91.cloudfront.net/images/css-sidenotes/anchors.7ed3294df30cae.svg)

The three cases for the vertical position of a note

1.  The first note’s top edge aligns with the top edge of its reference mark: as there is no previous note, `anchor(--lf-sidenote bottom, -1rlh) + 1rlh` resolves to 0 and `max()` returns `anchor(top)`.
2.  When the reference mark of a later note sits above the bottom of the previous note, plus some vertical space, the note goes below the previous one to avoid a collision. `max()` returns `anchor(--lf-sidenote bottom) + 1rlh`.
3.  Otherwise, the note’s top edge aligns with the reference mark’s top edge, as `max()` returns `anchor(top)`.

* * *

Have a look at the [complete stylesheet](https://github.com/vincentbernat/vincent.bernat.ch/blob/latest/content/media/css/luffy1.sidenotes.css "Stylesheet for the sidenotes of this blog"), which also adapts the reference mark to the location of the note: a “↓” arrow when the note sits below the paragraph, a “→” arrow when it moves to the margin. Gwern’s “[Sidenotes In Web Design](https://gwern.net/sidenote "Sidenotes In Web Design")” lists more implementations and their trade-offs.

[Some bloggers](https://danluu.com/bug-blind/ "Bug blindness") aim to write a post in 30 minutes. I planned to publish three web-related articles this weekend. Instead, I spent an inordinate amount of time elsewhere: about 15 commits on the build system, a pull request to [update CSS highlighting for nested selectors in Pygments](https://github.com/pygments/pygments/pull/3294 "CSS: support nested rule"), and a small correction to MDN’s article on the [`anchor()` CSS function](https://github.com/mdn/content/pull/45532 "Fix wording for return value of anchor() function"). The SVG illustration took a bit less than an hour and the article itself a handful of hours. The `attr()` function came in after I thought “inline style looks ugly, isn’t there a better way?” But, hey, I still think this is worth it! 🎨