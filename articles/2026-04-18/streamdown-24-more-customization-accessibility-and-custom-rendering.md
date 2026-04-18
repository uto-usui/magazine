---
title: "Streamdown 2.4: More customization, accessibility and custom rendering"
source: "https://vercel.com/changelog/streamdown-2-4"
publishedDate: "2026-03-05"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Mar 5, 2026

Streamdown v2.4 introduces customization hooks, accessibility features, and user experience improvements for developers rendering markdown.

Teams can now customize the appearance of their markdown output using several new properties. You can override the built-in icons by passing a specific component map to the `icons` prop.

```
import { Streamdown, type IconMap } from "streamdown"<Streamdown  icons={{ CheckIcon: MyCheckIcon }}>  {content}</Streamdown>
```

The `createCodePlugin` now accepts a `themes` option for light and dark Shiki themes, a `startLine` meta option for custom starting line numbers, and an `inlineCode` virtual component for styling inline code independently from blocks.

```
import { createCodePlugin } from "streamdown"const codePlugin = createCodePlugin({  themes: {    light: "github-light",    dark: "github-dark",  },})
```

Streamdown now supports internationalization and text direction. The `dir` prop automatically applies left-to-right or right-to-left formatting based on the first strong Unicode character, and the `translations` prop supports custom languages.

```
<Streamdown  dir="auto"  translations={{ copy: "نسخ", copied: "تم النسخ" }}>  {content}</Streamdown>
```

Tables include a fullscreen overlay controlled via the `controls` prop, complete with scroll locking and Escape key support. Developers can hook into streaming events using the `onAnimationStart` and `onAnimationEnd` callbacks.

This release fixes empty lines collapsing in syntax-highlighted blocks and prevents ordered lists from retriggering animations during streaming.

For projects using Tailwind v4, the new `prefix` prop namespaces utility classes to avoid collisions.

```
<Streamdown prefix="sd-">{content}</Streamdown>
```

To get started, [learn more](https://streamdown.ai/docs).