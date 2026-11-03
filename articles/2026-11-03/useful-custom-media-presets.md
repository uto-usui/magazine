---
title: "Useful @custom-media Presets"
source: "https://blog.master.dev/useful-custom-media-presets/"
publishedDate: "2026-10-29"
category: "css"
feedName: "Frontend Masters Blog"
author: "Daniel Schwarz"
---

Back in February of 2026, Firefox 148 shipped the `@custom-media` at-rule (requires the `layout.css.custom-media.enabled` flag to be set to `true`, for now), which can be used to create custom media queries. As you might’ve guessed, custom media queries are like custom properties (or “CSS variables”) but for [media queries](https://blog.master.dev/learn-media-queries/). They let us reuse media queries by referencing the name we’ve given them.

Here are a few examples to give you an idea of how they work:

`/* Basic definition */ @custom-media --no-hover (hover: none); @custom-media --landscape (orientation: landscape);  /* Combined definition */ @custom-media --no-hover-landscape (hover: none) and (orientation: landscape); @custom-media --no-hover-landscape (--no-hover) and (--landscape); @custom-media --no-hover-landscape (hover: none) and (--landscape);  /* Basic usage */ @media (--no-hover) { /* ... */ } @media (--landscape) { /* ... */ } @media (--no-hover-landscape) { /* ... */ }  /* Combined usage */ @media (--no-hover) and (--landscape) { /* ... */ } @media (--no-hover) and (orientation: landscape) { /* ... */ } @media (hover: none) and (--landscape) { /* ... */ }`Code language: CSS (css)

Media query types (such as `all`, `screen`, and `print`), logical operators (`not`, `and`, `only`, and the comma-separated ‘or’ syntax), and all other media query syntaxes can be used with custom media queries.

In this article, I’ll share some useful `@custom-media` presets that you can drop into any project without them being too opinionated, but you do need to understand browser support and your options there.

## Browser Support

-   Firefox has a flag: `layout.css.custom-media.enabled`
-   Chrome has an [Intent to Prototype](https://www.mail-archive.com/blink-dev@chromium.org/msg14281.html), but no movement.
-   Safari [has nothing](https://github.com/WebKit/standards-positions/issues/330) yet.

So it’s early days.

Because `@custom-media` isn’t supported in all major web browsers yet, I’ll also share the presets in an alternate syntax that is supported — container style query syntax.

The syntax is also “processable,” and there is [a PostCSS plugin](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media) that can [do the job](https://codepen.io/editor/chriscoyier/pen/01a17d52-21f4-7bdf-8cd4-0a2a9916d09e) if you want to be ready for the future.

## `@custom-media` queries for device capabilities

Screen size no longer indicates device capability, if it ever did. Sure, back in the day we only needed three breakpoints to determine whether the device was a mobile, tablet, or desktop, but today, I’m not even sure what those terms mean. Some “mobiles” and “tablets” can have mice and keyboards hooked up, while some “desktops” have touch and even stylus support.

Breakpoints are still useful, but they don’t tell us anything about the device’s capabilities. What we need to determine is the primary input mechanism so we can cater to what the user is probably using. This requires a combination of media queries, which `@custom-media` is perfect for:

`/* Primary input mechanism is mouse/emulated mouse */ @custom-media --mouse (hover: hover) and (pointer: fine);  /* Primary mechanism is touch */ @custom-media --touch (hover: none) and (pointer: coarse);  /* Stylus */ @custom-media --stylus (hover: none) and (pointer: fine);  /* Air mouse, air stylus, or air remote */ @custom-media --air (hover: hover) and (pointer: coarse);  /* Gamepad or remote with directional buttons */ @custom-media --dpad (hover: none) and (pointer: none);`Code language: CSS (css)

However, to create good user experiences across the board, we must also account for secondary input mechanisms. Sadly, there’s no definitive way to know which input mechanism the user is actually using when many are available. Here are a couple of examples:

-   A mouse intentionally hooked up to a tablet (the user is probably using the secondary mouse, but there’s no way to confirm that)
-   A desktop with touchscreen capability (users probably use the primary mouse, but both are built-in, so who knows?)

So, you can see how this might get complicated, right? Even if we use the `any-` family of media query features (e.g., `any-hover`), these tell us whether any of the input mechanisms have that capability, not whether the secondary input mechanism has it specifically. But that’s cool, right? Nope. Consider this:

`@custom-media --mouse (any-hover: hover) and (any-pointer: fine);`Code language: CSS (css)

This doesn’t query whether any of the input mechanisms are mice; it queries whether one input mechanism is a mouse or air pointer (using `any-hover: hover`) and whether one input mechanism (perhaps the same one) is a mouse or stylus (using `any-pointer: fine`).

The following combination isn’t much better. It means that the primary input mechanism is a mouse or air pointer while any input mechanism is a mouse or stylus.

`@custom-media --mouse (hover: hover) and (any-pointer: fine);`Code language: CSS (css)

The only way to know for sure is to be ultra specific, but do we really want to manage a buttload of custom media queries? Probably not, so it’s better to focus on the primary input mechanism while ensuring that the website works reasonably well for other input mechanisms right out of the box.

This doesn’t mean that edge cases won’t arise, just that we might want to treat `any-` media queries as additives. This helps us to target secondary input mechanisms as needed without creating too many custom media queries:

`@media (--touch) and (any-hover: hover) {   /* Touch device + hover capability (e.g., iPad with mouse) */ }  @media (--touch) and (any-pointer: fine) {   /* Touch device + fine pointer (e.g., iPad with mouse or stylus) */ }  @media (--mouse) and (any-pointer: coarse) {   /* Mouse device + touch capability (e.g., Microsoft Surface) */ }  @media (--stylus) and (any-pointer: coarse) {   /* Stylus device + touch capability (e.g., drawing tablet) */ }`Code language: CSS (css)

Remember: custom media queries aren’t supported in all web browsers yet, so here they are in container-style query syntax, which is supported in all browsers:

`/* Definition */ :root {   @media (hover: hover) and (pointer: fine) {     --mouse: any-valid-ident;   }    @media (hover: none) and (pointer: coarse) {     --touch: true;   }    @media (hover: none) and (pointer: fine) {     --stylus: true;   }    @media (hover: hover) and (pointer: coarse) {     --air: true;   }    @media (hover: none) and (pointer: none) {     --dpad: true;   } }  /* Usage */ @container style(--mouse) { /* ... */ } @container style(--touch) { /* ... */ } @container style(--stylus) { /* ... */ } @container style(--air) { /* ... */ } @container style(--dpad) { /* ... */ }`Code language: CSS (css)

Small caveat: container style queries can’t be used to style the `:root` because it’s the top-level element. It doesn’t have any containers.

An even smaller caveat: container queries can’t be combined with media queries in a single condition, so we’d have to abstract all of them into custom properties, like this:

`:root {   @media (hover: none) and (pointer: coarse) {     --touch: true;   }    @media (any-hover: hover) {     --any-hover-hover: true;   } }  @container style(--touch) and style(--any-hover-hover) {   /* Touch device + hover capability (e.g., iPad with mouse) */ }`Code language: CSS (css)

I don’t like this at all. Again, that’s way too many custom properties to manage, especially when we can just nest them:

`@container style(--touch) {   @media (any-hover: hover) {     /* Touch device + hover capability (e.g., iPad with mouse) */   } }`Code language: CSS (css)

## `@custom-media` queries for breakpoints

Screen sizes vary quite a bit these days, so again, it’s not as simple as having breakpoints for mobile, tablet, and desktop. My strategy is “more than or equal to \[this\] size” in increments of `100px`. Using [these screen resolution statistics](https://gs.statcounter.com/screen-resolution-stats) as a guide, my current range is from `360px` to `1560px`. The custom media queries for that look like this:

`/* Definition */ @custom-media --from-360 (width >= 360px); @custom-media --from-460 (width >= 460px); @custom-media --from-560 (width >= 560px); @custom-media --from-660 (width >= 660px); @custom-media --from-760 (width >= 760px); @custom-media --from-860 (width >= 860px); @custom-media --from-960 (width >= 960px); @custom-media --from-1060 (width >= 1060px); @custom-media --from-1160 (width >= 1160px); @custom-media --from-1260 (width >= 1260px); @custom-media --from-1360 (width >= 1360px); @custom-media --from-1460 (width >= 1460px); @custom-media --from-1560 (width >= 1560px);  /* Usage */ @media (--from-360) { /* ... */ } @media (--from-460) { /* ... */ } @media (--from-560) { /* ... */ } @media (--from-660) { /* ... */ } @media (--from-760) { /* ... */ } @media (--from-860) { /* ... */ } @media (--from-960) { /* ... */ } @media (--from-1060) { /* ... */ } @media (--from-1160) { /* ... */ } @media (--from-1260) { /* ... */ } @media (--from-1360) { /* ... */ } @media (--from-1460) { /* ... */ } @media (--from-1560) { /* ... */ }`Code language: CSS (css)

Here they are in container style query syntax:

`/* Definition */ :root {   @media (width >= 360px) {     --from-360: true;   }    @media (width >= 460px) {     --from-460: true;   }    @media (width >= 560px) {     --from-560: true;   }    @media (width >= 660px) {     --from-660: true;   }    @media (width >= 760px) {     --from-760: true;   }    @media (width >= 860px) {     --from-860: true;   }    @media (width >= 960px) {     --from-960: true;   }    @media (width >= 1060px) {     --from-1060: true;   }    @media (width >= 1160px) {     --from-1160: true;   }    @media (width >= 1260px) {     --from-1260: true;   }    @media (width >= 1360px) {     --from-1360: true;   }    @media (width >= 1460px) {     --from-1460: true;   }    @media (width >= 1560px) {     --from-1560: true;   } }  /* Usage */ @container style(--from-360) { /* ... */ } @container style(--from-460) { /* ... */ } @container style(--from-560) { /* ... */ } @container style(--from-660) { /* ... */ } @container style(--from-760) { /* ... */ } @container style(--from-860) { /* ... */ } @container style(--from-960) { /* ... */ } @container style(--from-1060) { /* ... */ } @container style(--from-1160) { /* ... */ } @container style(--from-1260) { /* ... */ } @container style(--from-1360) { /* ... */ } @container style(--from-1460) { /* ... */ } @container style(--from-1560) { /* ... */ }`Code language: CSS (css)

I rarely use less-than breakpoints, but they’re easy to use alongside more-than breakpoints if needed:

`/* Definition */ @custom-media --from-360 (width >= 360px); @custom-media --to-659 (width <= 659px);  /* Usage (flexible) */ @media (--from-360) { /* More than or equal to */ } @media (--to-659) { /* Less than or equal to */ } @media (--from-360) and (--to-659) { /* In between */ }`Code language: CSS (css)

For brevity, we can also express intermediate breakpoints as a single media query condition, but at the cost of flexibility. I mean, imagine how many variations of this we’d need:

`/* Definition */ @custom-media --from-360-to-659 (360px <= width <= 659px);  /* Usage (rigid) */ @media (--from-360-to-659) { /* ... */ }`Code language: CSS (css)

This section is a bit more subjective than the others, so feel free to throw in `height` or `orientation` or something else if you use it enough to justify the additional custom media queries. Also, you might want to use a naming convention (e.g., `--xsm`/`--sm`/`--md`/`--lg`/`--xlg`/etc.), but I’ll leave that to you.

## A `@custom-media` query for detecting true HDR

True HDR requires a display with a high dynamic range and wide color gamut. If it doesn’t have those, HDR images and videos can look pretty rough. We end up with either high brightness that looks unusually unsaturated, vibrant colors that look unusually dark, or both.

So, to determine whether or not we can use true HDR images and videos, keep this custom media query handy:

`/* Definition */ @custom-media --true-hdr (dynamic-range: high) and (color-gamut: p3);  /* Usage */ @media (--true-hdr) { /* ... */ }`Code language: CSS (css)

And here it is in container style query syntax:

`/* Definition */ :root {   @media (dynamic-range: high) and (color-gamut: p3) {     --true-hdr: true;   } }  /* Usage */ @container style(--true-hdr) { /* ... */ }`Code language: CSS (css)

## All in All

I can’t wait to use custom media queries, but I’m also happy using container style queries as a fallback in the meantime.

A huge upside to playing around with them now, though, is learning how they aren’t so different from custom properties when it comes to balancing brevity and flexibility. It does take a bit of time to figure out how to organize them well.

Once all web browsers support `@custom-media`, I’ll certainly add these presets to my CSS reset. I’m also curious to see if anybody else has some ideas, or even some thoughts about how `@custom-media` works. [Open Props has its own presets](https://github.com/argyleink/open-props/blob/main/src/props.media.css). Is it a good idea? Will you be using it?