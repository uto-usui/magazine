---
title: "When CSS could run JavaScript"
source: "https://frontendfoc.us/issues/758"
publishedDate: "2026-09-16"
category: "frontend"
feedName: "Frontend Focus"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/k6lzihdml7pitxrpadxq.jpg)](https://vale.rocks/posts/css-relics)

[CSS Curiosities of the Past](https://vale.rocks/posts/css-relics "vale.rocks") — A wonderful tour of the non-standard CSS quirks developers used to make browsers behave, especially _Internet Explorer_. Covers the 'star hack', CSS expressions (JavaScript in your CSS!), IE's DirectX filters, the famous [box model hack](https://tantek.com/CSS/Examples/boxmodelhack.html), and more.

Declan Chidlow

✅ [The Front-End Checklist](https://frontendchecklist.io/ "frontendchecklist.io") — We've shared this before, but it's kept improving and now has [almost 400 frontend quality rules](https://frontendchecklist.io/rules) covering accessibility, performance, security, SEO, and more. You can also now connect it to Claude, Cursor, and other AI tools over MCP so they review against the same standards.

David Dias

⚡️ IN BRIEF

-   🧭 [Safari 27 has shipped](https://developer.apple.com/documentation/safari-release-notes/safari-27-release-notes) (alongside iOS, iPadOS, and macOS 27), bringing customizable `<select>` elements, `sizes="auto"` on images, the `:heading` pseudo-class, `alpha()`, multi-color `color-mix()`, and more.
    
-   🤖 Apple has also shared details on [how you can hook up an AI agent to Safari](https://developer.apple.com/documentation/safari-developer-tools/connecting-an-ai-agent-to-safari), as of Safari 27, for testing, debugging, etc.
    
-   🌐 [Chrome 153](https://developer.chrome.com/blog/new-in-chrome-153) is out, adding single-axis scroll containers (in non-stable channels only) and the `<camera>` and `<microphone>` elements. [Chrome 154 is now in beta](https://developer.chrome.com/blog/chrome-154-beta), too.
    
-   🤔 Last week, Automattic's board forced CEO Matt Mullenweg into a [leave of absence](https://techcrunch.com/2026/09/09/automattics-board-forces-ceo-matt-mullenweg-into-leave-of-absence/), before Mullenweg [declared](https://techcrunch.com/2026/09/11/matt-mullenweg-tells-automattic-staff-in-slack-hes-back-in-control-after-ceo-ouster/) that he was "_back in control_".
    
-   ✳️ We often share links to the helpful articles on [_CSS-Tricks_](https://css-tricks.com/), but it's gone quiet recently. Editor Geoff Graham [sheds some light on why](https://geoffgraham.me/why-css-tricks-has-been-quiet/).
    

📙 Articles, Opinions & Tutorials

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1789556645/ysdrc8x57rihe9bm6mct.png)](https://ishadeed.com/article/aligning-list-icons/)

[Better Icon and Label Alignment](https://ishadeed.com/article/aligning-list-icons/ "ishadeed.com") — When text is just one line, an accompanying icon is nicely vertically centered, but when the text has multiple lines, the icon is still 'centered' but can look oddly misplaced… Ahmad explores a fix using CSS's `lh` unit.

Ahmad Shadeed

[The Case Against JPEG XL (in the Browser)](https://giannirosato.com/blog/post/case-against-jxl/ "giannirosato.com") — With JPEG XL decoding making its way into Chrome and Firefox, an AV1 encoder developer who once backed the format argues it offers little advantage over AVIF for the web.

Gianni Rosato

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1789558018/zb4lmhosri2i8f9dh05c.png)](https://vincent.bernat.ch/en/blog/2026-css-sidenotes)

[Sidenotes with CSS Anchor Positioning](https://vincent.bernat.ch/en/blog/2026-css-sidenotes "vincent.bernat.ch") — A walkthrough of building Tufte-style sidenotes (margin notes instead of footnotes - _as above_) with anchor positioning. It's JavaScript-free, multi-block, and degrades gracefully on narrow viewports and older browsers.

Vincent Bernat

[Animating CSS `border-image`](https://css-tricks.com/animating-css-border-image/ "css-tricks.com") — How to animate border styles (using an image or gradient) to create some interesting user interface effects.

Preethi Sam

[A Deep Dive into StyleX](https://flaviocopes.com/stylex/ "flaviocopes.com") — Here's a hands-on tour of Meta’s [StyleX](https://stylexjs.com/), a library which turns JavaScript style objects into plain atomic CSS at build time. Flavio also looks at why it can be a good fit for coding agents in particular.

Flavio Copes

🧰 Tools, Code & Resources

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1789557313/crpjqoc9ssmdanb1ijub.png)](https://neat-annotations.syabro.com/)

[SnapDOM 3.0: Turn DOM Elements Into Images](https://snapdom.dev/ "snapdom.dev") — A no-dependency [html2canvas](https://github.com/niklasvh/html2canvas) alternative with support for web fonts, pseudo-elements and Shadow DOM. [v3.0](https://github.com/zumerlab/snapdom/releases/tag/v3.0.0) adds ‘incremental recapture’ for faster repeat captures, automatic web font embedding, and `fromString()` for turning raw HTML markup into images.

Zumerlab

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1789557625/ezqu6mnliczls05h80ie.png)](https://github.com/spiritov/ds.css)

📰 Classifieds

📄 No more regex hacks for PDF data. [Foxit's Extraction API](https://developer-api.foxit.com/developer-blogs/api-guides-tutorials/pdf-data-extraction-api-structured-json/?utm_source=draftdev&utm_medium=newsletter&utm_campaign=frontendfocus_20260916-) reads tables, fields, and layout, then returns clean JSON.

* * *

⚡️ Add lightning-fast 1D/2D barcode scanning to your web app with [STRICH](https://strich.io/?ref=frontend-focus), a lean JS SDK. Simple, predictable pricing. [Free trial and demo!](https://strich.io/?ref=frontend-focus)

😡 ...and finally

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/srntkimv1sggaljt2cej.jpg)](https://page-rage.com/)

[Page Rage: Take Out Your Stress on a Web Page](https://page-rage.com/ "page-rage.com") — Ever get a bit flustered when building a site? Work out some of that stress by destroying several pre-made pages here, or install the browser extension to smash up _any_ web page to your heart’s content.

Alex Reardon