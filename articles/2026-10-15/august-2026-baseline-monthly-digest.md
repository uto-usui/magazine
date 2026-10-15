---
title: "August 2026 Baseline monthly digest"
source: "https://web.dev/blog/baseline-digest-aug-2026?hl=en"
publishedDate: "2026-09-28"
category: "web-standards"
feedName: "web.dev"
---

![Jeremy Wagner](https://web.dev/images/authors/jlwagner-v7.jpg)

Published: September 28, 2026

Welcome to the monthly Baseline digest. In this edition, explore web platform features that reached Baseline Newly available and Baseline Widely available status during August 2026, alongside articles and resources shared by the web developer community.

## Modern Web Guidance as a starting point for token skills

Brecht De Ruyte examined how Google's Modern Web Guidance skill set helps AI coding agents write current, Baseline-aware CSS and HTML instead of relying on outdated patterns. The post walks through pairing Modern Web Guidance with custom design token skills to maintain design system consistency while respecting modern platform standards. For more information, see [Modern Web Guidance as a starting point for my own token skills: getting agents to write better CSS](https://utilitybend.com/blog/modern-web-guidance-antigravity-and-my-own-design-token-skills/).

## Baseline Newly available features

The following features became supported across all core browser engines in August 2026 and are now Baseline Newly available.

### `:paused` CSS pseudo-class

The `:paused` pseudo-class matches playable media elements, such as `<audio>` and `<video>`, whenever playback is paused. It also matches media elements that have loaded but have not yet begun playing. This distinguishes paused playback from transitional states such as buffering or seeking, allowing media player controls and surrounding UI to reflect playback states directly in CSS. For more information, see the [MDN documentation for `:paused`](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:paused).

### `sibling-count()` CSS function

The `sibling-count()` function returns an integer representing the total number of sibling elements that share a parent element, including the element itself. Unlike `counter()`, which returns a string formatted for generated content, `sibling-count()` resolves to an integer that can be used directly in math calculations with `calc()`. This allows child elements to calculate proportional layout dimensions, such as column widths, based on their total sibling count without requiring JavaScript or fixed styles. For more information, see the [MDN documentation for `sibling-count()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/sibling-count).

## Baseline Widely available features

The following feature reached Baseline Widely available status in August 2026, meaning it has been supported across all core browser engines for 30 months and is safe to use without polyfills.

### Declarative Shadow DOM

Declarative Shadow DOM lets you define shadow roots directly in HTML markup using the `<template>` element with the `shadowrootmode` attribute set to `open` or `closed`. This removes the need to attach shadow roots with JavaScript through `Element.attachShadow()`. It enables server-rendered web components to render with their encapsulated styles on initial load without flashes of unstyled content (FOUC), while remaining parseable by search engines and clients without JavaScript. For more information, see the [MDN documentation for `shadowrootmode`](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/template#shadowrootmode).

## Wrap-up

If a Baseline update or community post was missed, let the team know so it can be included in an upcoming edition. If you have questions or feedback about Baseline, file an issue on the [issue tracker](https://github.com/web-platform-dx/web-features/issues).