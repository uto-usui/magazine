---
title: "Open Props @custom-media Recipes"
source: "https://css-tricks.com/open-props-custom-media-recipes/"
publishedDate: "2026-01-23"
category: "css"
feedName: "css-tricks"
author: "Geoff Graham"
---

The `@custom-media` at-rule has landed in Firefox Nightly! I couldn’t find it in the [release notes](https://www.firefox.com/en-US/firefox/149.0a1/releasenotes/) but [Adam Argyle’s on the beat](https://nerdy.dev/custom-media) noting that it’s behind a flag for now.

![The Firefox Nightly configuration screen searching for custom-media and with layout.css.custom-media.enabled.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/custom-media-queries-firefox-nightly-flag.png?resize=1808%2C1334)

Look for `layout.css.custom-media.enabled`

I often forget the exact name of an `@media` query or simply get tired writing something like `@media screen and (prefers-reduced-motion: no-preference)` over and over again. `@custom-media` will be a nice bit of relief to the ol’ muscle memory because it allows us to create aliases for queries.

In fact, Adam’s Open Props project has [more than 45 of them](https://github.com/argyleink/open-props/blob/main/src/props.media.css) that make for excellent recipes:

```
@custom-media --motionOK (prefers-reduced-motion: no-preference);

@media (--motionOK) {
  /* animations and transitions */
}
```

[Direct Link →](https://github.com/argyleink/open-props/blob/main/src/props.media.css)