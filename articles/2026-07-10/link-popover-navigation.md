---
title: "Link + Popover Navigation"
source: "https://adrianroselli.com/2026/07/link-popover-navigation.html"
publishedDate: "2026-07-09"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

This is a [redress](https://en.wikipedia.org/wiki/Set_redress) of my 2019 post [Link + Disclosure Widget Navigation](https://adrianroselli.com/2019/06/link-disclosure-widget-navigation.html), except (as the title implies), I’ve modified it to use native HTML popovers instead of ARIA or HTML disclosure widgets.

Popover has the benefit of using appropriate HTML structure and semantics while removing the need for scripting and ARIA. I use some ARIA here regardless.

## `popover` vs. Disclosure Widgets

ARIA-based disclosure widgets (`<button aria-expanded>`) require script to work. HTML-based disclosure widgets (`<details>` / `<summary>`) expand when there is a hit for in-page searches (in two engines), have inconsistent exposure to accessibility APIs (across browsers and over time), and in my experience confuddle teams with styling overrides. I have a [2020 post going into some detail](https://adrianroselli.com/2020/05/disclosure-widgets.html) on each.

The [`popover`](https://html.spec.whatwg.org/multipage/popover.html#the-popover-attribute) feature requires CSS for positioning. Cross-browser [anchor positioning support](https://caniuse.com/?search=anchor+positioning) only came about recently. Because `popover`s appear on the top layer, you have to be careful with anything that uses z-index. Only use this pattern if all the dialogs on your site are already using the native HTML `<dialog>` element, [otherwise overlapping issues](https://adrianroselli.com/2023/05/brief-note-on-popovers-with-dialogs.html) happen.

## The Pattern

Embedded below or [visit it directly at Codepen](https://codepen.io/aardrian/pen/dPNJgKQ). There’s also a [debug version](https://cdpn.io/aardrian/debug/dPNJgKQ/).

See the Pen [Link + Popover Nav](https://codepen.io/aardrian/pen/dPNJgKQ) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

### The Container

The navigation lives in a `<nav>` as a list with nested lists.

```
<header>
  <nav id="Nav">
    <ul>
    […]
    </ul>
  </nav>
</header>
```

### The Links

The links are links. They work with a keyboard, assistive technology knows what to do with them, and links are generally well understood by users.

I identify that the current parent page is the _About_ page and the current page is _Job Postings_ by using `aria-current="page"`. I also use that as my CSS selector and [you should too](https://adrianroselli.com/2021/06/using-css-to-enforce-accessibility.html).

```
<li>
  <a href="[…]" id="Item02" aria-current="page">About</a>
  […]
  <ul id="SubItem02" popover>
    […]
    <li><a href="[…]" aria-current="page">Job Postings</a></li>
  </ul>
</li>
```

### The Button Trigger

As my older pattern, the `<button>` element is the trigger. Unlike my older pattern, it doesn’t use `aria-expanded` (nor `aria-controls`, which was unnecessary then anyway).

Instead it uses [`popovertarget`](https://html.spec.whatwg.org/multipage/popover.html#the-popover-target-attributes), which brings the programmatic state `aria-expanded` for free. The value of `popovertarget` must be the `id` of the content whose appearance you want to control (the popover content). The popover content needs the `popover` attribute for this to work.

No CSS or JavaScript is needed to make this content appear or disappear.

```
<button type="button" id="btnItem02" aria-labelledby="Item02" popovertarget="SubItem02">
  <svg […]>[…]</svg>
</button>
<ul id="SubItem02" popover>
 […]
</ul>
```

### Naming the Button

This is the second place I still use ARIA. To [avoid text duplication and auto-translation issues](https://adrianroselli.com/2020/01/my-priority-of-methods-for-labeling-a-control.html), I use `aria-labelledby` to reference the text of the preceding link. Screen reader users hear / feel a different control type and that it’s expandable, which has proven to be sufficient context. For voice users, saying the visible text presents them with the option to choose the link or the button.

```
<a href="[…]" id="Item02" aria-current="page">About</a>
<button type="button" id="btnItem02" aria-labelledby="Item02" popovertarget="SubItem02">
  <svg […]>[…]</svg>
</button>
```

### Focus Order Support

You must [place the popover content immediately after the popover trigger](https://html.spec.whatwg.org/multipage/popover.html#the-popover-attribute:~:text=Whenever%20possible%20ensure%20the%20popover%20element%20is%20placed%20immediately%20after%20its%20triggering%20element%20in%20the%20DOM), otherwise you risk reading order and focus order problems for users. The popover feature does not automatically do any focus management.

### Esc Support

It comes for free with popover.

### Click-to-Close Support

It comes for free with popover.

### Focusout-to-Close Support

You’ll have to write your own.

### Styles

Not all of these styles will work for you, but these may matter:

-   I use [logical properties](https://adrianroselli.com/2019/11/css-logical-properties.html) throughout. The demo has buttons to let you cycle between four writing directions. They are not a perfect test since neither the rest of the page nor the text change.
-   There are no classes. IDs only exist as hooks for popover and naming references.
-   the links are [block links](https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html) (using CSS generated content) to fill the container. The buttons have a `z-index` to sit in front of them.
-   The layout uses flexbox with no width media queries. If you don’t like the wrap or the layout, write your own.
-   Supports forced-colors / Windows High Contrast Mode out of the box with no custom CSS. That’s partly because the focus styles use outlines.
-   Uses `color-scheme: light dark` just so I could more easily see styling gaps, but I don’t recommend that for real-life use.
-   The buttons use an arrow SVG that rotates via [`:popover-open`](https://drafts.csswg.org/selectors/#selectordef-popover-open) when the popover appears / disappears. It honors user motion preferences.
-   The button and arrow position shift based on typeface, as with any layout mixing icons and type.
-   The popover triggers conform to [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), but you can always make them bigger. Make sure yours at least conform.

There is a button on the demo to remove all styles from the page, making it easier to see how this will perform as raw HTML, for easy testing, or for [CSS Naked Day](https://css-naked-day.org/).

#### Popover Positioning

I haven’t played with popovers much. Positioning it to work across Firefox, Chromium, and Safari while also not overflowing the window or falling apart with text direction changes proved to be a challenge. I welcome suggestions on improvements.

My goal was to have the popover appear to the right edge of the parent list item and just below the button — for left-to-right languages — and in a corresponding location for other language text directions.

```
[popover] {
  inset: auto;
  position-anchor: auto;
  inset-block-start: anchor(self-end);
  inset-inline-end: calc(anchor(self-end) - 1em);
}
```

I flailed about trying different values from the spec and struggled to understand logical properties with anchor positioning. As it is, the popover positioning falls apart with the vertical writing modes, but I can’t be sure if that’s my code or browser bugs (¿Por qué no los dos?).

## Pattern History

There are reasons I built this pattern.

Early in 2017 I [filed an issue against ARIA Authoring Practices](https://github.com/w3c/aria-practices/issues/353) (APG) requesting a change to the menu navigation pattern. Despite a great deal of feedback in agreement, it continues to languish. In late 2017 I wrote [Don’t Use ARIA Menu Roles for Site Nav](https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html) and started actively campaigning against the APG pattern. In [2019, Sarah Higley proposed](https://github.com/w3c/aria-practices/pull/1036) a [disclosure-only APG pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) and [then a disclosure and link](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/) pattern [proposal in 2020](https://github.com/w3c/aria-practices/pull/1614).

![A plate full of slightly under-baked mini popovers, or tiny Yorkshire puddings, with a web site navigation over the top and a similar vertical navigation down the left.](https://adrianroselli.com/wp-content/uploads/2026/07/link-popover-nav_thumb.jpg)

An under-baked batch of mini popovers I made for my solo Easter during the first year of the pandemic. I still ate them all.

HTML (via Open-UI) has since stepped in to fill some gaps, so here we are.

## Wrap Up

Standard disclaimers apply: may not work for your audience, likely has bugs, support can change, new features may moot this, my design sense is poor, yes you have to write script to get whatever custom interactions you think are nifty but which probably annoy users, who even writes code anymore, using \[insert random element here\] in a way that’s not mentioned in this post is your problem not mine, etc.

And if you have more experience with multilingual popover anchor positioning, please share!

## Update: Same Day

Ana Tudor, [possibly offended by my middling layout skills and crap SVG knowledge](https://bsky.app/profile/anatudor.bsky.social/post/3mq7stovxy22u), forked my demo to replace the block link with good old-fashioned grid, make a better SVG, adjust the popovers to stay in the viewport for vertical RtL layouts, and address the rotation differently (you’ll need to add language code selectors for your use cases).

I plan to test and integrate them into mine, but until then I’ve embedded [Ana’s fork](https://codepen.io/thebabydino/pen/gbgvZEz) or you can visit the [debug view of Ana’s fork](https://cdpn.io/thebabydino/debug/gbgvZEz) directly.

See the Pen [Link + Popover Nav](https://codepen.io/thebabydino/pen/gbgvZEz) by Ana Tudor ([@thebabydino](https://codepen.io/thebabydino)) on [CodePen](https://codepen.io/).

Curtis Wilcox made a [fork with the anchor positioning polyfill](https://codepen.io/ccwilcox/pen/rajJPdy). I intentionally ignored the polyfill because I didn’t want to field tech support questions for a thing I haven’t used, but Curtis is a better than man than I. I’m still not tech support for the polyfill ([James Stuckey Weber might be](https://bsky.app/profile/jamessw.com/post/3mqasamhqvc2l), but probably don’t pester him).

[Nathan Knowler reminded me](https://sunny.garden/@knowler/116893002975078967) that `:not(:open)::details-content` can be used to prevent a `<details>` from expanding on a hit from in-page search but since I was too lazy to test it for this post, [go check out his demo](https://knowler.dev/demos/wYUnfPQ?codepen).