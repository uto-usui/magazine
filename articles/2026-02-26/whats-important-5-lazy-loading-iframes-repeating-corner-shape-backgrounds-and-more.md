---
title: "What’s !important #5: Lazy-loading iframes, Repeating corner-shape Backgrounds, and More"
source: "https://css-tricks.com/whats-important-5/"
publishedDate: "2026-02-14"
category: "css"
feedName: "css-tricks"
author: "Daniel Schwarz"
---

This issue of What’s !important is dedicated to our friends in the UK (aka me), who are currently experiencing a very miserable 43-day rain streak. Presenting: the five most interesting things to read about CSS from the last couple of weeks. _Plus_, the latest features from Chrome 145, and anything else you might’ve missed. TL;DR: lots of content, but also lots of rain.

### Why you can only code for 4 hours/day

Don’t worry, you’re only coding for 52 minutes/day anyway.

Dr. Milan Milanović talks about the devastating impact of meetings, emails, Slack, and interruptions, and what you/your manager can do about it. [This article](https://newsletter.techworld-with-milan.com/p/you-can-code-only-4-hours-per-day) is a real eye-opener with a ton of shocking (but not surprising) statistics about the average developer’s flow state.

### Why you shouldn’t switch to smaller breakpoints too early

Ahmad Shadeed explains [why you shouldn’t switch to smaller responsive breakpoints too early](https://ishadeed.com/article/too-early-breakpoint/), with examples of websites that’ve done so and scenarios in which users might hit those breakpoints.

Source: [Ahmad Shadeed](https://ishadeed.com/article/too-early-breakpoint/).

### How to lazy-load above-the-fold iframes

`loading=lazy` only works for off-screen elements, so Stefan Bauer demonstrates a neat trick for [lazy-loading above-the-fold `<iframe>`s using `<details>`](https://frontendmasters.com/blog/performance-optimized-video-embeds-with-zero-javascript/).

### How to create repeating `corner-shape` backgrounds

Preethi Sam shows us [how to use `corner-shape` in `<svg>`s, which are then used as repeating `background`s](https://frontendmasters.com/blog/background-patterns-with-css-corner-radius/). I’ve done [my own experiments with `corner-shape`](https://css-tricks.com/what-can-we-actually-do-with-corner-shape/), but this is wonderful and certainly something that I hadn’t considered.

### The CSS Selection (2026 edition)

What do web developers actually do with CSS? While other research studies look at features, [The CSS Selection](https://www.projectwallace.com/the-css-selection/2026) (2026 edition) focuses on CSS patterns and techniques. It’s a very interesting read, and you’ll definitely laugh once or twice, especially as you discover the different typos for `!important`.

Here are some of my favorites:

-   `!IMPORTANT`: too shouty
-   `!impotant`: too much information
-   `!i`: that’s just lazy
-   `!imPORTANT`: excellent annunciation
-   `!importantl`: ah, so close…

### Chrome features and Quick Hits you might’ve missed

[Chrome 145](https://developer.chrome.com/release-notes/145) shipped a few days ago, and as always, we’ve been sharing some [Quick Hits](https://css-tricks.com/category/quick-hits/) throughout the week. You can catch these in the sidebar of the homepage, so feel free to drop by if you’re ever in the ‘hood.

Coincidentally, most of the Quick Hits were related to the Chrome update in some way, so I’ll recap everything together:

-   `text-justify`, which you can combine with `text-align: justify` to specify whether you want the word spacing (`text-justify: inter-word`) or letter spacing (`text-justify: inter-character`) to be adjusted to make the text justified. [Geoff wrote about this](https://css-tricks.com/almanac/properties/t/text-justify/) way back in 2017 when only Firefox supported it (sort of…), so by my calculation, Safari should support it by 2035. So not this decade, but before GTA 6. Just kidding… (I think).
-   Speaking of word and letter spacing, `word-spacing` and `letter-spacing` now accept `%` units, as they do in Safari and Firefox.
-   Similarly, [`overscroll-behavior`](https://css-tricks.com/almanac/properties/o/overscroll-behavior/) now works for non-root scroll containers, like in Safari and Firefox. WebDev RedFox’s [warning about `overscroll-behavior`](https://webdevredfox.org/post/lets-stop-misusing-overscroll-behavior) couldn’t have come at a better time.
-   `column-wrap` and `column-height` for better multicolumn layouts are also here now, but only in Chrome, unfortunately.
-   That also applies to customizable `<select>`, arguably the most exciting feature on this list. As I shared earlier in the week, Adam Argyle wonderfully boiled down this surprisingly complex feature to [a simple outline](https://nerdy.dev/nice-select) that’s extremely easy to understand.
-   Looking a little more to the future now, it seems that we’ll eventually be able to have [multiple borders and outlines on a single element](https://bsky.app/profile/lea.verou.me/post/3mdjbojsf6s2h) as well as [`border-shape`](https://x.com/Una/status/2019502817216503824), as demonstrated by Dr. Lea Verou and Una Kravets respectively.

Until next time!