---
title: "November 2025 Baseline monthly digest"
source: "https://web.dev/blog/baseline-digest-nov-2025?hl=en"
publishedDate: "2025-12-09"
category: "web-standards"
feedName: "web.dev"
---

![Jeremy Wagner](https://web.dev/images/authors/jlwagner-v6.jpg)

Published: December 9, 2025

While everything tends to slow down as the year begins to wrap up, there's still plenty of Baseline news in this edition of this monthly digest to cover, so let's get started.

## Next.js adopts current `baseline widely available` browsers

[Next.js](https://nextjs.org/) is a widely-used React framework It carries considerable influence not just in how developers might choose to develop for the web, but also the browsers developers might choose to develop _for_.

Recently, [Next.js updated its default browser support criteria](https://github.com/vercel/next.js/pull/84401) to a current evaluation of the `baseline widely available` Browserslist query. As time goes on, Next.js instances that update to include this change stand to benefit from fewer polyfills and transforms, and a larger number of web features that developers will be able to use safely in their applications.

## Baseline in action

[Baseline in action](https://web.dev/series/baseline-in-action) is a series of articles with accompanying demos that show you how to use a mix of Baseline web features to build common user interface elements. We've started the series with concepts such as [container queries](https://web.dev/articles/baseline-in-action-container-queries), [Baseline features you could use to build an image gallery](https://web.dev/articles/baseline-in-action-image-gallery), and [`<dialog>` and `popover`](https://web.dev/articles/baseline-in-action-dialog-popover). More articles and demos will be added throughout the end of this year and 2026. For more information, read [the Baseline in action announcement](https://web.dev/blog/announcing-baseline-in-action).

## New Baseline case studies

We're happy to announce that two Baseline case studies were published in November:

-   [How Cybozu eliminated browser compatibility overhead with Baseline](https://web.dev/case-studies/cybozu-baseline)
-   [How Target.com used Baseline to modernize features](https://web.dev/case-studies/target-baseline)

Both of these case studies offer a look into the process of redefining browser support criteria inside of professional developer teams. This has never been an easy problem to solve. Large and consequential decisions such as which browsers to support during development require buy-in from project stakeholders. Baseline helps to make this decision easier—and these case studies show you how others have adopted it.

## Features that became Baseline in November

Features become Baseline Newly or Widely available regularly. In November, the following features became Baseline Newly available:

-   [`Atomics.waitAsync`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Atomics/waitAsync)

The features that became Baseline Widely available in November was more considerable:

-   [`color()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/color)
-   [`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/color-mix)
-   Compression streams
-   [Lab and LCH](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/lab)
-   [`nth-child() of <selector>`](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:nth-child#the_of_selector_syntax)
-   [`oklab()` and `oklch()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/oklab)
-   [WebRTC SCTP information](https://developer.mozilla.org/docs/Web/API/RTCPeerConnection/sctp)

## That's a wrap

With November in the books, we're closing in on the end of 2025! As usual, [let us know](https://issuetracker.google.com/issues/new?component=1400680&template=1857359) if we missed anything Baseline-related, and we'll make sure it gets captured in a future edition!